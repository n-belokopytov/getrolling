export const CONTACT_HONEYPOT_FIELD = 'company_referral_code_9f3k2m';

export const DEFAULT_CONTACT_SUCCESS_MESSAGE =
  'Thanks. Request received. You should get a direct reply with next steps shortly.';

export const CONTACT_LIMITS = {
  maxFullNameLength: 120,
  maxWorkEmailLength: 254,
  maxCompanyLength: 120,
  maxChallengeLength: 4000,
  minHumanSubmitMs: 2500,
  maxContentLengthBytes: 24 * 1024,
  rateLimitWindowMs: 24 * 60 * 60 * 1000,
  maxSubmissionsPerIpWindow: 6,
  maxSubmissionsPerEmailWindow: 3,
  appsScriptTimeoutMs: 8000,
};

export function sanitizeContactText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidContactEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
