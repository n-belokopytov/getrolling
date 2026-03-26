import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_LIMITS,
  isValidContactEmail,
  sanitizeContactText,
} from './contact-contract';

export function getContentLengthBytes(request) {
  const value = Number(request.headers.get('content-length') || 0);
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function validateFieldLengths({ fullName, workEmail, company, challenge }) {
  if (fullName.length > CONTACT_LIMITS.maxFullNameLength) {
    return 'Full name is too long.';
  }
  if (workEmail.length > CONTACT_LIMITS.maxWorkEmailLength) {
    return 'Email is too long.';
  }
  if (company.length > CONTACT_LIMITS.maxCompanyLength) {
    return 'Company name is too long.';
  }
  if (challenge.length > CONTACT_LIMITS.maxChallengeLength) {
    return 'Please keep your bottleneck description under 4000 characters.';
  }
  return '';
}

export function hasSuspiciousPayload({ fullName, company, challenge }) {
  const concatenated = `${fullName} ${company} ${challenge}`.toLowerCase();
  if (/<script|<\/script|javascript:|data:text\/html/i.test(concatenated)) {
    return true;
  }
  const urlCount = (challenge.match(/https?:\/\/|www\./gi) || []).length;
  return urlCount > 3;
}

export function extractContactSubmissionBody(body) {
  return {
    fullName: sanitizeContactText(body?.fullName),
    workEmail: sanitizeContactText(body?.workEmail).toLowerCase(),
    company: sanitizeContactText(body?.company),
    challenge: sanitizeContactText(body?.challenge),
    honeypotValue: sanitizeContactText(body?.[CONTACT_HONEYPOT_FIELD]),
    formStartedAt: Number(body?.formStartedAt || 0),
  };
}

export function validateRequiredFields({ fullName, workEmail, challenge }) {
  if (!fullName) {
    return 'Full name is required.';
  }
  if (!workEmail || !isValidContactEmail(workEmail)) {
    return 'A valid work email is required.';
  }
  if (!challenge) {
    return 'Please describe your main bottleneck.';
  }
  return '';
}
