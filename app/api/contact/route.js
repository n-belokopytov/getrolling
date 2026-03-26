import { NextResponse } from 'next/server';
import { CONTACT_LIMITS, sanitizeContactText } from '../../lib/contact-contract';
import {
  forwardContactPayloadToGoogleScript,
  getCanonicalSuccessMessage,
} from '../../lib/contact-forwarding';
import {
  getClientIp,
  getUserAgent,
  hashContactValue,
  logContactAbuseEvent,
  toFitCheckSummary,
} from '../../lib/contact-observability';
import { assertContactRateLimit } from '../../lib/contact-rate-limit';
import {
  extractContactSubmissionBody,
  getContentLengthBytes,
  hasSuspiciousPayload,
  validateFieldLengths,
  validateRequiredFields,
} from '../../lib/contact-validation';

export async function POST(request) {
  try {
    const contentType = sanitizeContactText(request.headers.get('content-type')).toLowerCase();
    if (!contentType.includes('application/json')) {
      logContactAbuseEvent('blocked_invalid_content_type');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 415 },
      );
    }

    const contentLengthBytes = getContentLengthBytes(request);
    if (contentLengthBytes > CONTACT_LIMITS.maxContentLengthBytes) {
      logContactAbuseEvent('blocked_payload_too_large', { contentLengthBytes });
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 413 },
      );
    }

    const body = await request.json();
    const { fullName, workEmail, company, challenge, honeypotValue, formStartedAt } =
      extractContactSubmissionBody(body);

    const requiredFieldError = validateRequiredFields({ fullName, workEmail, challenge });
    if (requiredFieldError) {
      return NextResponse.json({ error: requiredFieldError }, { status: 400 });
    }

    const lengthError = validateFieldLengths({ fullName, workEmail, company, challenge });
    if (lengthError) {
      return NextResponse.json({ error: lengthError }, { status: 400 });
    }

    if (honeypotValue) {
      logContactAbuseEvent('blocked_honeypot');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }

    if (!Number.isFinite(formStartedAt) || formStartedAt <= 0) {
      logContactAbuseEvent('blocked_invalid_form_start');
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }
    const submittedInMs = Date.now() - formStartedAt;
    if (submittedInMs < CONTACT_LIMITS.minHumanSubmitMs) {
      logContactAbuseEvent('blocked_timing', { submittedInMs });
      return NextResponse.json(
        { error: 'Unable to process request right now. Please try again.' },
        { status: 400 },
      );
    }

    if (hasSuspiciousPayload({ fullName, company, challenge })) {
      logContactAbuseEvent('observed_suspicious_payload');
    }

    const fitCheck = body?.fitCheck || {};
    const receivedAt = new Date().toISOString();
    const clientIp = getClientIp(request);
    const userAgent = getUserAgent(request);
    const ipHash = hashContactValue(clientIp);
    const emailHash = hashContactValue(workEmail);

    const { isIpAllowed, isEmailAllowed, source } = await assertContactRateLimit({
      ipHash,
      emailHash,
      logAbuseEvent: logContactAbuseEvent,
    });

    if (!isIpAllowed || !isEmailAllowed) {
      logContactAbuseEvent('blocked_rate_limit', {
        ipAllowed: isIpAllowed,
        emailAllowed: isEmailAllowed,
        source,
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
    await forwardContactPayloadToGoogleScript(scriptPayload);

    return NextResponse.json({
      ok: true,
      message: getCanonicalSuccessMessage(),
    });
  } catch (error) {
    logContactAbuseEvent('apps_script_fail_or_internal', {
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
