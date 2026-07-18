// POST /api/support-send
// Customer's message from the widget -> your Telegram chat.
import { redis, redisConfigured } from './redis-client';

const BOT = process.env.TELEGRAM_BOT_TOKEN || '';
const CHAT = process.env.TELEGRAM_CHAT_ID || '';

export const config = { runtime: 'edge' };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Report config problems instead of hiding them
  if (!BOT || !CHAT) {
    return json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' }, 500);
  }
  if (!redisConfigured) {
    return json({ error: 'Redis env vars not found (KV_REST_API_URL / KV_REST_API_TOKEN)' }, 500);
  }

  let sessionId = '';
  let text = '';
  let name = '';
  try {
    const body = await req.json();
    sessionId = body.sessionId;
    text = body.text;
    name = body.name || '';
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  if (!sessionId || !text) return json({ error: 'Missing sessionId or text' }, 400);

  // 1) Send to Telegram
  let tgData: any;
  try {
    const label = name ? `${name} · ${sessionId.slice(0, 6)}` : sessionId.slice(0, 6);
    const message = `💬 [${label}]\n${text}\n\n(Reply to this message to respond)`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text: message }),
    });
    tgData = await tgRes.json();

    if (!tgData.ok) {
      return json({ error: 'Telegram rejected the message', telegram: tgData }, 502);
    }
  } catch (e: any) {
    return json({ error: 'Failed to reach Telegram', detail: String(e?.message || e) }, 502);
  }

  // 2) Store mapping + the customer's own message
  try {
    if (tgData.result?.message_id) {
      await redis.set(`tgmsg:${tgData.result.message_id}`, sessionId, { ex: 60 * 60 * 24 });
    }
    await redis.rpush(`thread:${sessionId}`, JSON.stringify({ from: 'user', text, ts: Date.now() }));
    await redis.expire(`thread:${sessionId}`, 60 * 60 * 24);
  } catch (e: any) {
    return json({ error: 'Redis write failed', detail: String(e?.message || e) }, 500);
  }

  return json({ ok: true });
}
