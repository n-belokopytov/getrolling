import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const MAX_FULL_NAME_LENGTH = 120;
const MAX_WORK_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 120;
const MAX_CHALLENGE_LENGTH = 4000;
const MIN_HUMAN_SUBMIT_MS = 2500;
const MAX_CONTENT_LENGTH_BYTES = 24 * 1024;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_IP_WINDOW = 6;
const MAX_SUBMISSIONS_PER_EMAIL_WINDOW = 3;
const APPS_SCRIPT_TIMEOUT_MS = 8000;
const DEFAULT_SUCCESS_MESSAGE =
  'Thanks. Request received. You should get a direct reply with next steps shortly.';
const CONTACT_HONEYPOT_FIELD = 'company_referral_code_9f3k2m';

const ipRateLimitStore = new Map();
const emailRateLimitStore = new Map();
let sharedIpRateLimit;
let sharedEmailRateLimit;

function getSharedRateLimiters() {
  if (sharedIpRateLimit && sharedEmailRateLimit) {
    return {
      ipRateLimit: sharedIpRateLimit,
      emailRateLimit: sharedEmailRateLimit,
    };
  }

  const url = sanitizeText(process.env.UPSTASH_REDIS_REST_URL);
  const token = sanitizeText(process.env.UPSTASH_REDIS_REST_TOKEN);
  if (!url || !token) {
    return null;
  }

  const redis = Redis.fromEnv();
  sharedIpRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MAX_SUBMISSIONS_PER_IP_WINDOW, '24 h'),
    prefix: 'contact_ip',
  });
  sharedEmailRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '24 h'),
    prefix: 'contact_email',
  });
  return {
    ipRateLimit: sharedIpRateLimit,
    emailRateLimit: sharedEmailRateLimit,
  };
}

function hashValue(value) {
  if (!value) return '';
  return crypto.createHash('sha256').update(value).digest('hex');
}

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  return request.headers.get('x-real-ip') || '';
}

function getUserAgent(request) {
  return sanitizeText(request.headers.get('user-agent'));
}

function getContentLengthBytes(request) {
  const value = Number(request.headers.get('content-length') || 0);
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

function pruneExpiredRateLimitEntries(store, nowMs) {
  for (const [key, entry] of store.entries()) {
    if (nowMs - entry.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
      store.delete(key);
    }
  }
}

function assertRateLimit(store, key, maxAllowed, nowMs) {
  if (!key) return true;

  const existing = store.get(key);
  if (!existing || nowMs - existing.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
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

function hasSuspiciousPayload({ fullName, company, challenge }) {
  const concatenated = `${fullName} ${company} ${challenge}`.toLowerCase();
  if (/<script|<\/script|javascript:|data:text\/html/i.test(concatenated)) {
    return true;
  }
  const urlCount = (challenge.match(/https?:\/\/|www\./gi) || []).length;
  if (urlCount > 3) {
    return true;
  }
  return false;
}

function validateFieldLengths({ fullName, workEmail, company, challenge }) {
  if (fullName.length > MAX_FULL_NAME_LENGTH) {
    return 'Full name is too long.';
  }
  if (workEmail.length > MAX_WORK_EMAIL_LENGTH) {
    return 'Email is too long.';
  }
  if (company.length > MAX_COMPANY_LENGTH) {
    return 'Company name is too long.';
  }
  if (challenge.length > MAX_CHALLENGE_LENGTH) {
    return 'Please keep your bottleneck description under 4000 characters.';
  }
  return '';
}

function getCanonicalSuccessMessage() {
  return sanitizeText(process.env.CONTACT_SUCCESS_MESSAGE) || DEFAULT_SUCCESS_MESSAGE;
}

function toFitCheckSummary(fitCheck) {
  if (!fitCheck || typeof fitCheck !== 'object') return '';
  const answeredCount = Number.isFinite(fitCheck.answeredCount)
    ? fitCheck.answeredCount
    : 'n/a';
  const score = Number.isFinite(fitCheck.score) ? fitCheck.score : 'n/a';
  const recommendedMode = sanitizeText(fitCheck.recommendedMode) || 'n/a';
  return `submitted=${Boolean(fitCheck.isSubmitted)}; answered=${answeredCount}; score=${score}; recommendedMode=${recommendedMode}`;
}

async function forwardToGoogleScript(payload) {
  const endpoint = sanitizeText(process.env.GOOGLE_SCRIPT_CONTACT_ENDPOINT);
  const sharedSecret = sanitizeText(process.env.GOOGLE_SCRIPT_SHARED_SECRET);
  if (!endpoint || !sharedSecret) {
    throw new Error('Google Script integration is not configured.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APPS_SCRIPT_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        sharedSecret,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    let responsePayload = null;
    try {
      responsePayload = await response.json();
    } catch {
      responsePayload = null;
    }
    if (!response.ok || !responsePayload?.ok) {
      throw new Error('Google Script request failed.');
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function logAbuseEvent(type, context = {}) {
  console.warn('contact_abuse_event', {
    type,
    at: new Date().toISOString(),
    ...context,
  });
}

export async function POST(request) {
  try {
    const contentType = sanitizeText(request.headers.get('content-type')).toLowerCase();
    if (!contentType.includes('application/json')) {
      logAbuseEvent('blocked_invalid_content_type');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 415 },
      );
    }

    const contentLengthBytes = getContentLengthBytes(request);
    if (contentLengthBytes > MAX_CONTENT_LENGTH_BYTES) {
      logAbuseEvent('blocked_payload_too_large', { contentLengthBytes });
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 413 },
      );
    }

    const body = await request.json();
    const fullName = sanitizeText(body?.fullName);
    const workEmail = sanitizeText(body?.workEmail).toLowerCase();
    const company = sanitizeText(body?.company);
    const challenge = sanitizeText(body?.challenge);
    const honeypotValue = sanitizeText(body?.[CONTACT_HONEYPOT_FIELD]);
    const formStartedAt = Number(body?.formStartedAt || 0);

    if (!fullName) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 },
      );
    }
    if (!workEmail || !isValidEmail(workEmail)) {
      return NextResponse.json(
        { error: 'A valid work email is required.' },
        { status: 400 },
      );
    }
    if (!challenge) {
      return NextResponse.json(
        { error: 'Please describe your main bottleneck.' },
        { status: 400 },
      );
    }

    const lengthError = validateFieldLengths({ fullName, workEmail, company, challenge });
    if (lengthError) {
      return NextResponse.json({ error: lengthError }, { status: 400 });
    }

    if (honeypotValue) {
      logAbuseEvent('blocked_honeypot');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }

    if (!Number.isFinite(formStartedAt) || formStartedAt <= 0) {
      logAbuseEvent('blocked_invalid_form_start');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }
    const submittedInMs = Date.now() - formStartedAt;
    if (submittedInMs < MIN_HUMAN_SUBMIT_MS) {
      logAbuseEvent('blocked_timing', { submittedInMs });
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }

    if (hasSuspiciousPayload({ fullName, company, challenge })) {
      logAbuseEvent('observed_suspicious_payload');
    }

    const fitCheck = body?.fitCheck || {};
    const receivedAt = new Date().toISOString();
    const clientIp = getClientIp(request);
    const userAgent = getUserAgent(request);
    const ipHash = hashValue(clientIp);
    const emailHash = hashValue(workEmail);
    const nowMs = Date.now();

    let isIpAllowed = true;
    let isEmailAllowed = true;
    let rateLimitSource = 'in_memory';
    const sharedLimiters = getSharedRateLimiters();

    if (sharedLimiters) {
      try {
        const [ipAllowedShared, emailAllowedShared] = await Promise.all([
          assertSharedRateLimit(sharedLimiters.ipRateLimit, ipHash),
          assertSharedRateLimit(sharedLimiters.emailRateLimit, emailHash),
        ]);
        isIpAllowed = ipAllowedShared;
        isEmailAllowed = emailAllowedShared;
        rateLimitSource = 'upstash';
      } catch (error) {
        logAbuseEvent('shared_rate_limit_error_fallback', {
          message: error?.message || 'unknown',
        });
      }
    }

    if (rateLimitSource === 'in_memory') {
      pruneExpiredRateLimitEntries(ipRateLimitStore, nowMs);
      pruneExpiredRateLimitEntries(emailRateLimitStore, nowMs);
      isIpAllowed = assertRateLimit(
        ipRateLimitStore,
        ipHash,
        MAX_SUBMISSIONS_PER_IP_WINDOW,
        nowMs,
      );
      isEmailAllowed = assertRateLimit(
        emailRateLimitStore,
        emailHash,
        MAX_SUBMISSIONS_PER_EMAIL_WINDOW,
        nowMs,
      );
    }

    if (!isIpAllowed || !isEmailAllowed) {
      logAbuseEvent('blocked_rate_limit', {
        ipAllowed: isIpAllowed,
        emailAllowed: isEmailAllowed,
        source: rateLimitSource,
      });
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 429 },
      );
    }

    const scriptPayload = {
      fullName,
      workEmail,
      company,
      challenge,
      fitCheckSummary: toFitCheckSummary(fitCheck),
      source: 'website-contact',
      status: 'new',
      receivedAt,
      ipHash,
      userAgent,
    };
    await forwardToGoogleScript(scriptPayload);

    return NextResponse.json({
      ok: true,
      message: getCanonicalSuccessMessage(),
    });
  } catch (error) {
    logAbuseEvent('apps_script_fail_or_internal', {
      message: error?.message || 'unknown',
    });
    console.error('contact_route_failure', {
      message: error?.message || 'unknown',
      at: new Date().toISOString(),
    });
    return NextResponse.json(
      {
        error: 'Unable to process request right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
