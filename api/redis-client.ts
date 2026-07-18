// Shared Redis client that works with BOTH naming schemes:
// Upstash Marketplace on Vercel creates KV_REST_API_URL / KV_REST_API_TOKEN,
// while Redis.fromEnv() expects UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.
import { Redis } from '@upstash/redis';

const url =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  '';

const token =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  '';

export const redis = new Redis({ url, token });
export const redisConfigured = Boolean(url && token);
