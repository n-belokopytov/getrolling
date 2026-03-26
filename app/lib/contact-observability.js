import crypto from 'node:crypto';
import { sanitizeContactText } from './contact-contract';

export function logContactAbuseEvent(type, context = {}) {
  console.warn('contact_abuse_event', {
    type,
    at: new Date().toISOString(),
    ...context,
  });
}

export function hashContactValue(value) {
  if (!value) return '';
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  return request.headers.get('x-real-ip') || '';
}

export function getUserAgent(request) {
  return sanitizeContactText(request.headers.get('user-agent'));
}

export function toFitCheckSummary(fitCheck) {
  if (!fitCheck || typeof fitCheck !== 'object') return '';
  const answeredCount = Number.isFinite(fitCheck.answeredCount)
    ? fitCheck.answeredCount
    : 'n/a';
  const score = Number.isFinite(fitCheck.score) ? fitCheck.score : 'n/a';
  const recommendedMode = sanitizeContactText(fitCheck.recommendedMode) || 'n/a';
  return `submitted=${Boolean(fitCheck.isSubmitted)}; answered=${answeredCount}; score=${score}; recommendedMode=${recommendedMode}`;
}
