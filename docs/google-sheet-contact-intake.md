# Google Sheet Contact Intake Setup

This project now forwards contact form submissions from `app/api/contact/route.js` to a Google Apps Script Web App.

## 1) Prepare the Sheet

Create a private Google Sheet with a tab named `Requests` and this header row:

`receivedAt, fullName, workEmail, company, challenge, fitCheckSummary, source, ipHash, userAgent, status`

Copy the Sheet ID from the URL.

## 2) Create Apps Script Web App

1. Open [script.new](https://script.new).
2. Replace default code with `docs/contact-intake-apps-script.gs`.
3. In **Project Settings -> Script properties**, set:
   - `CONTACT_SHARED_SECRET`
   - `CONTACT_NOTIFICATION_TO`
   - `CONTACT_SHEET_ID`
   - `CONTACT_SHEET_NAME` (optional, default: `Requests`)
4. Deploy as **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL.

## 3) Configure Next.js env vars

Set these server env vars for your deployment and local `.env.local`:

- `GOOGLE_SCRIPT_CONTACT_ENDPOINT`
- `GOOGLE_SCRIPT_SHARED_SECRET`
- `UPSTASH_REDIS_REST_URL` (recommended for shared serverless rate limits)
- `UPSTASH_REDIS_REST_TOKEN` (recommended for shared serverless rate limits)
- `CONTACT_SUCCESS_MESSAGE` (optional)

The secret must match `CONTACT_SHARED_SECRET` in Apps Script.

## 4) Verify flow

1. Submit the website contact form.
2. Confirm:
   - one row is appended to `Requests`,
   - notification email arrives at `CONTACT_NOTIFICATION_TO`,
   - UI shows success message.

## 5) Abuse prevention in this project

The API route already enforces:

- honeypot trap (`website` must be empty),
- minimum completion time (`formStartedAt`),
- per-IP and per-email rate limits,
- payload/content-type quick-reject checks.

If Upstash env vars are configured, rate limits are shared across Vercel serverless instances. If not configured, fallback in-memory limits still apply.

Keep your Apps Script URL private; only your Next.js server should call it.

## 6) Vercel monitoring and incident response

- In Vercel Observability, monitor `/api/contact` for:
  - sharp spikes in request count,
  - elevated `429` responses,
  - elevated `500` responses.
- Suggested alert thresholds to start:
  - `429` ratio > 20% for 5 minutes,
  - `500` ratio > 5% for 5 minutes,
  - requests > 10/min sustained for 5 minutes.

If an attack is in progress:

1. Temporarily tighten rate limits in `app/api/contact/route.js`.
2. Redeploy with stricter thresholds.
3. Rotate `GOOGLE_SCRIPT_SHARED_SECRET`.
4. Verify Apps Script endpoint is still reachable only via server-side calls.
