// POST /api/support-webhook
// Telegram calls this when you send a message in your bot chat.
// If you REPLY to a customer's message, your text is routed to their session.
import { redis, redisConfigured } from './redis-client';

const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || '';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('OK');

  if (SECRET) {
    const header = req.headers.get('x-telegram-bot-api-secret-token');
    if (header !== SECRET) return new Response('Unauthorized', { status: 401 });
  }

  try {
    if (!redisConfigured) return new Response('OK');

    const update = await req.json();
    const msg = update?.message;
    if (!msg || !msg.text) return new Response('OK');

    const repliedId = msg.reply_to_message?.message_id;
    if (!repliedId) return new Response('OK');

    const sessionId = await redis.get<string>(`tgmsg:${repliedId}`);
    if (!sessionId) return new Response('OK');

    await redis.rpush(`thread:${sessionId}`, JSON.stringify({ from: 'agent', text: msg.text, ts: Date.now() }));
    await redis.expire(`thread:${sessionId}`, 60 * 60 * 24);

    return new Response('OK');
  } catch {
    return new Response('OK'); // always 200 so Telegram doesn't retry-spam
  }
}
