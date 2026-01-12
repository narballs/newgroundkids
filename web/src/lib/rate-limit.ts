/**
 * Simple in-memory rate limiter for server actions
 * In production, use Redis or similar for distributed rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

const defaultConfig: RateLimitConfig = {
  limit: 5,
  windowSeconds: 60,
};

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP, email, etc.)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and retry info
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitStore.get(key);

  // Clean up old entry if window has passed
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(key);
  }

  const currentEntry = rateLimitStore.get(key);

  if (!currentEntry) {
    // First request in window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowSeconds * 1000,
    });
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetIn: config.windowSeconds,
    };
  }

  if (currentEntry.count >= config.limit) {
    // Rate limit exceeded
    const resetIn = Math.ceil((currentEntry.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetIn,
    };
  }

  // Increment counter
  currentEntry.count++;
  return {
    allowed: true,
    remaining: config.limit - currentEntry.count,
    resetIn: Math.ceil((currentEntry.resetTime - now) / 1000),
  };
}

/**
 * Rate limit configurations for different forms
 */
export const rateLimitConfigs = {
  contact: { limit: 3, windowSeconds: 300 }, // 3 per 5 minutes
  lead: { limit: 5, windowSeconds: 3600 }, // 5 per hour
  newsletter: { limit: 3, windowSeconds: 86400 }, // 3 per day
} as const;

// Cleanup old entries periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}
