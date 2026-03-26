import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { CONTACT_LIMITS, sanitizeContactText } from './contact-contract';

const ipRateLimitStore = new Map();
const emailRateLimitStore = new Map();
let sharedIpRateLimit;
let sharedEmailRateLimit;

function pruneExpiredRateLimitEntries(store, nowMs) {
  for (const [key, entry] of store.entries()) {
    if (nowMs - entry.windowStartedAt > CONTACT_LIMITS.rateLimitWindowMs) {
      store.delete(key);
    }
  }
}

function assertRateLimit(store, key, maxAllowed, nowMs) {
  if (!key) return true;

  const existing = store.get(key);
  if (!existing || nowMs - existing.windowStartedAt > CONTACT_LIMITS.rateLimitWindowMs) {
    store.set(key, { count: 1, windowStartedAt: nowMs });
    return true;
  }
  if (existing.count >= maxAllowed) {
    return false;
  }
  existing.count += 1;
  store.set(key, existing);
  return true;
}

async function assertSharedRateLimit(rateLimit, identifier) {
  if (!rateLimit || !identifier) return true;
  const { success } = await rateLimit.limit(identifier);
  return success;
}

function getSharedRateLimiters() {
  if (sharedIpRateLimit && sharedEmailRateLimit) {
    return {
      ipRateLimit: sharedIpRateLimit,
      emailRateLimit: sharedEmailRateLimit,
    };
  }

  const url = sanitizeContactText(process.env.UPSTASH_REDIS_REST_URL);
  const token = sanitizeContactText(process.env.UPSTASH_REDIS_REST_TOKEN);
  if (!url || !token) {
    return null;
  }

  const redis = Redis.fromEnv();
  sharedIpRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(CONTACT_LIMITS.maxSubmissionsPerIpWindow, '24 h'),
    prefix: 'contact_ip',
  });
  sharedEmailRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(CONTACT_LIMITS.maxSubmissionsPerEmailWindow, '24 h'),
    prefix: 'contact_email',
  });
  return {
    ipRateLimit: sharedIpRateLimit,
    emailRateLimit: sharedEmailRateLimit,
  };
}

export async function assertContactRateLimit({ ipHash, emailHash, logAbuseEvent }) {
  const nowMs = Date.now();
  let isIpAllowed = true;
  let isEmailAllowed = true;
  let source = 'in_memory';
  const sharedLimiters = getSharedRateLimiters();

  if (sharedLimiters) {
    try {
      const [ipAllowedShared, emailAllowedShared] = await Promise.all([
        assertSharedRateLimit(sharedLimiters.ipRateLimit, ipHash),
        assertSharedRateLimit(sharedLimiters.emailRateLimit, emailHash),
      ]);
      isIpAllowed = ipAllowedShared;
      isEmailAllowed = emailAllowedShared;
      source = 'upstash';
    } catch (error) {
      logAbuseEvent('shared_rate_limit_error_fallback', {
        message: error?.message || 'unknown',
      });
    }
  }

  if (source === 'in_memory') {
    pruneExpiredRateLimitEntries(ipRateLimitStore, nowMs);
    pruneExpiredRateLimitEntries(emailRateLimitStore, nowMs);
    isIpAllowed = assertRateLimit(
      ipRateLimitStore,
      ipHash,
      CONTACT_LIMITS.maxSubmissionsPerIpWindow,
      nowMs,
    );
    isEmailAllowed = assertRateLimit(
      emailRateLimitStore,
      emailHash,
      CONTACT_LIMITS.maxSubmissionsPerEmailWindow,
      nowMs,
    );
  }

  return { isIpAllowed, isEmailAllowed, source };
}
