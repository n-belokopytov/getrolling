/**
 * Google Apps Script Web App for contact intake.
 *
 * Deployment:
 * - Deploy as Web App
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Script properties required:
 * - CONTACT_SHARED_SECRET
 * - CONTACT_NOTIFICATION_TO
 * - CONTACT_SHEET_ID
 * - CONTACT_SHEET_NAME (optional, defaults to "Requests")
 */

function doPost(e) {
  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty(
      'CONTACT_SHARED_SECRET',
    );

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Invalid payload' }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const sharedSecret = sanitizeText(payload.sharedSecret);
    if (!expectedSecret || sharedSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
    }
    const fullName = sanitizeText(payload.fullName);
    const workEmail = sanitizeText(payload.workEmail);
    const company = sanitizeText(payload.company);
    const challenge = sanitizeText(payload.challenge);
    const fitCheckSummary = sanitizeText(payload.fitCheckSummary);
    const source = sanitizeText(payload.source) || 'website-contact';
    const status = sanitizeText(payload.status) || 'new';
    const receivedAt = sanitizeText(payload.receivedAt) || new Date().toISOString();
    const ipHash = sanitizeText(payload.ipHash);
    const userAgent = sanitizeText(payload.userAgent);

    if (!fullName || !workEmail || !challenge) {
      return jsonResponse({ ok: false, error: 'Missing required fields' }, 400);
    }

    appendRequestRow({
      receivedAt: receivedAt,
      fullName: fullName,
      workEmail: workEmail,
      company: company,
      challenge: challenge,
      fitCheckSummary: fitCheckSummary,
      source: source,
      ipHash: ipHash,
      userAgent: userAgent,
      status: status,
    });

    sendNotification({
      fullName: fullName,
      workEmail: workEmail,
      company: company,
      challenge: challenge,
      fitCheckSummary: fitCheckSummary,
      receivedAt: receivedAt,
      source: source,
    });

    return jsonResponse({
      ok: true,
      message:
        'Thanks. Request received. You should get a direct reply with next steps shortly.',
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: 'Internal error' }, 500);
  }
}

function appendRequestRow(data) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('CONTACT_SHEET_ID');
  const sheetName = scriptProperties.getProperty('CONTACT_SHEET_NAME') || 'Requests';
  if (!spreadsheetId) {
    throw new Error('Missing CONTACT_SHEET_ID');
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet: ' + sheetName);
  }

  sheet.appendRow([
    data.receivedAt,
    data.fullName,
    data.workEmail,
    data.company,
    data.challenge,
    data.fitCheckSummary,
    data.source,
    data.ipHash,
    data.userAgent,
    data.status,
  ]);
}

function sendNotification(data) {
  const to = PropertiesService.getScriptProperties().getProperty(
    'CONTACT_NOTIFICATION_TO',
  );
  if (!to) {
    throw new Error('Missing CONTACT_NOTIFICATION_TO');
  }

  const subject = '[GetRolling] New contact request';
  const body = [
    'A new contact request was submitted.',
    '',
    'Name: ' + data.fullName,
    'Email: ' + data.workEmail,
    'Company: ' + (data.company || '(not provided)'),
    'Received at: ' + data.receivedAt,
    'Source: ' + data.source,
    '',
    'Main bottleneck:',
    data.challenge,
    '',
    'Fit check:',
    data.fitCheckSummary || '(not provided)',
  ].join('\n');

  GmailApp.sendEmail(to, subject, body, {
    name: 'GetRolling Contact Intake',
    replyTo: data.workEmail,
  });
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
