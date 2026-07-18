// POST /api/support-webhook
// Telegram calls this whenever you send a message in your bot chat.
// If you REPLY to a customer's message, we route your text back to their session.
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET!; // optional shared secret

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('OK');

  // Optional: verify Telegram's secret header (set when registering the webhook)
  if (SECRET) {
    const header = req.headers.get('x-telegram-bot-api-secret-token');
    if (header !== SECRET) return new Response('Unauthorized', { status: 401 });
  }

  try {
    const update = await req.json();
    const msg = update?.message;
    if (!msg || !msg.text) return new Response('OK');

    // Only handle messages that are REPLIES to a customer message we sent.
    const repliedId = msg.reply_to_message?.message_id;
    if (!repliedId) return new Response('OK');

    const sessionId = await redis.get<string>(`tgmsg:${repliedId}`);
    if (!sessionId) return new Response('OK');

    // Push your reply into that customer's thread; the browser will poll for it.
    await redis.rpush(`thread:${sessionId}`, JSON.stringify({ from: 'agent', text: msg.text, ts: Date.now() }));
    await redis.expire(`thread:${sessionId}`, 60 * 60 * 24);

    return new Response('OK');
  } catch (e) {
    return new Response('OK'); // always 200 so Telegram doesn't retry-spam
  }
}
