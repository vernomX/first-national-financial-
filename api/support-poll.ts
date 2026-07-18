// GET /api/support-poll?session=xyz
// The widget calls this to fetch the thread for its session.
import { redis, redisConfigured } from './redis-client';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session');

  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

  if (!sessionId) return new Response(JSON.stringify({ messages: [] }), { status: 200, headers });

  if (!redisConfigured) {
    return new Response(
      JSON.stringify({ messages: [], error: 'Redis env vars not found' }),
      { status: 500, headers }
    );
  }

  try {
    const raw = await redis.lrange(`thread:${sessionId}`, 0, -1);
    const messages = raw.map((r: any) => (typeof r === 'string' ? JSON.parse(r) : r));
    return new Response(JSON.stringify({ messages }), { status: 200, headers });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ messages: [], error: String(e?.message || e) }),
      { status: 500, headers }
    );
  }
}
