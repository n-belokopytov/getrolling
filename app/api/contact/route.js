import { NextResponse } from 'next/server';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = sanitizeText(body?.fullName);
    const workEmail = sanitizeText(body?.workEmail);
    const company = sanitizeText(body?.company);
    const challenge = sanitizeText(body?.challenge);

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

    const fitCheck = body?.fitCheck || {};

    // TODO: wire this payload to CRM or email provider.
    console.info('Contact request received', {
      fullName,
      workEmail,
      company,
      challenge,
      fitCheck,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message:
        'Thanks. Request received. You should get a direct reply with next steps shortly.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to process request right now. Please try again.',
        details: error?.message || 'unknown',
      },
      { status: 500 },
    );
  }
}
