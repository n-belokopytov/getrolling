# Landing Release Checklist

## Build And Runtime
- Run `npm run lint` and resolve all new issues.
- Run `npm run build` and confirm production build completes.
- Validate there are no visible dev-only indicators in the production run.

## Conversion Funnel Events
- Confirm `hero_primary_click` fires on hero primary CTA.
- Confirm `hero_secondary_click` fires on case-proof CTA.
- Confirm `fitcheck_start` and `fitcheck_submit` fire with expected payload fields.
- Confirm `fitcheck_recommendation_click` and `fitcheck_skip_to_contact_click` fire.
- Confirm `contact_submit_attempt`, `contact_submit_success`, and `contact_submit_failure` paths.
- Confirm `booking_calendar_click` and `email_fallback_click` where applicable.

## Viewport Smoke Tests
- Verify at widths: `390`, `430`, `768`, `1024`, `1440`.
- Ensure no horizontal overflow and no clipped text in hero, fit-check, case studies, or CTA.
- Confirm navigation toggle, close, and outside-click behavior on narrow viewports.

## Accessibility And Keyboard
- Navigate page with keyboard only.
- Verify focus order in fit-check and contact forms.
- Trigger validation errors and confirm inline guidance is announced and visible.
- Confirm CTA links/buttons are reachable and actionable via keyboard.

## Contact Submission
- Submit valid form and confirm success message.
- Submit invalid form and confirm field-level and form-level errors.
- Verify API route returns expected validation errors for malformed payloads.
