// Project Roam — Phase 8 Practical Server-Side Rate Limiter
// File: lib/security/rate-limit.ts

export interface RateLimitConfig {
  maxRequests: number;
  windowSeconds?: number;
  windowMs?: number;
  prefix?: string;
}

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window cache
const rateLimitStore = new Map<string, RateLimitRecord>();

// Maximum records to keep in memory to prevent unbounded memory growth
const MAX_STORE_SIZE = 10000;

/**
 * Extracts a client identifier from Request headers (X-Forwarded-For, X-Real-IP, etc.)
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // First IP in chain is client IP
    const clientIp = forwarded.split(",")[0].trim();
    if (clientIp) return clientIp;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp && realIp.trim()) {
    return realIp.trim();
  }

  // Fallback to User-Agent hash or generic client token
  const ua = request.headers.get("user-agent") || "unknown_agent";
  return `ua_${ua.slice(0, 32)}`;
}

/**
 * Checks sliding window rate limit for an identifier or Request object.
 */
export function checkRateLimit(
  target: Request | string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const rawId = typeof target === "string" ? target : getClientIdentifier(target);
  const identifier = config.prefix ? `${config.prefix}:${rawId}` : rawId;

  const now = Date.now();
  const windowMs = config.windowMs || (config.windowSeconds ? config.windowSeconds * 1000 : 60000);
  const cutoff = now - windowMs;

  // Prune overall store if it exceeds maximum size
  if (rateLimitStore.size > MAX_STORE_SIZE) {
    for (const [key, record] of rateLimitStore.entries()) {
      const valid = record.timestamps.filter((ts) => ts > cutoff);
      if (valid.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, { timestamps: valid });
      }
    }
  }

  const record = rateLimitStore.get(identifier) || { timestamps: [] };
  // Keep only timestamps within sliding window
  const activeTimestamps = record.timestamps.filter((ts) => ts > cutoff);

  if (activeTimestamps.length >= config.maxRequests) {
    const oldestInWindow = activeTimestamps[0];
    const retryAfterMs = oldestInWindow + windowMs - now;
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: activeTimestamps });

  return {
    allowed: true,
    remaining: config.maxRequests - activeTimestamps.length,
    retryAfterSeconds: 0,
  };
}

/**
 * Resets the rate limit store (used in testing).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
