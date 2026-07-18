// POST /api/support-send
// Customer's message from the widget -> your Telegram chat.
// The sessionId is embedded so your reply can be routed back to the right browser.
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const BOT = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT = process.env.TELEGRAM_CHAT_ID!; // your personal chat id

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { sessionId, text, name } = await req.json();
    if (!sessionId || !text) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Send to your Telegram, prefixing the session so you know who it's from.
    const label = name ? `${name} · ${sessionId.slice(0, 6)}` : sessionId.slice(0, 6);
    const message = `💬 [${label}]\n${text}\n\n(Reply to this message to respond)`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text: message }),
    });
    const tgData = await tgRes.json();

    // Map the Telegram message_id -> sessionId, so the webhook can route your reply back.
    if (tgData.ok && tgData.result?.message_id) {
      await redis.set(`tgmsg:${tgData.result.message_id}`, sessionId, { ex: 60 * 60 * 24 });
    }

    // Also store the customer's own message in their thread (so it survives refresh).
    await redis.rpush(`thread:${sessionId}`, JSON.stringify({ from: 'user', text, ts: Date.now() }));
    await redis.expire(`thread:${sessionId}`, 60 * 60 * 24);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
