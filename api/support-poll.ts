// GET /api/support-poll?session=xyz
// The widget calls this every few seconds to fetch the full thread for its session.
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session');
  if (!sessionId) {
    return new Response(JSON.stringify({ messages: [] }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const raw = await redis.lrange(`thread:${sessionId}`, 0, -1);
    const messages = raw.map((r) => (typeof r === 'string' ? JSON.parse(r) : r));
    return new Response(JSON.stringify({ messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ messages: [] }), { status: 200 });
  }
}
