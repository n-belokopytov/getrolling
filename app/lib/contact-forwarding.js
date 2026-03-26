import {
  CONTACT_LIMITS,
  DEFAULT_CONTACT_SUCCESS_MESSAGE,
  sanitizeContactText,
} from './contact-contract';

export function getCanonicalSuccessMessage() {
  return (
    sanitizeContactText(process.env.CONTACT_SUCCESS_MESSAGE) ||
    DEFAULT_CONTACT_SUCCESS_MESSAGE
  );
}

export async function forwardContactPayloadToGoogleScript(payload) {
  const endpoint = sanitizeContactText(process.env.GOOGLE_SCRIPT_CONTACT_ENDPOINT);
  const sharedSecret = sanitizeContactText(process.env.GOOGLE_SCRIPT_SHARED_SECRET);
  if (!endpoint || !sharedSecret) {
    throw new Error('Google Script integration is not configured.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    CONTACT_LIMITS.appsScriptTimeoutMs,
  );
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
