export function ContactSection({
  contactErrors,
  contactForm,
  contactHoneypot,
  contactFormStartedAt,
  contactSection,
  contactStatus,
  hasBookingCalendar,
  onContactFieldChange,
  onContactHoneypotChange,
  onContactSubmit,
  trackEvent,
}) {
  return (
    <section id={contactSection.id} className="cta section cta-ready">
      <div>
        <div className="eyebrow dark">{contactSection.eyebrow}</div>
        <h2>{contactSection.title}</h2>
        <p>{contactSection.body}</p>
      </div>
      <div className="cta-side">
        <form id="contact-form" className="contact-form" onSubmit={onContactSubmit} noValidate>
          <input
            type="text"
            name="website"
            value={contactHoneypot}
            onChange={(event) => onContactHoneypotChange(event.target.value)}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input type="hidden" name="formStartedAt" value={contactFormStartedAt} />

          <label className="contact-field">
            <span>Full name</span>
            <input
              name="fullName"
              type="text"
              value={contactForm.fullName}
              onChange={(event) => onContactFieldChange('fullName', event.target.value)}
              aria-invalid={Boolean(contactErrors.fullName)}
              aria-describedby={contactErrors.fullName ? 'contact-fullName-error' : undefined}
              autoComplete="name"
            />
            {contactErrors.fullName ? (
              <span id="contact-fullName-error" className="contact-error-text">
                {contactErrors.fullName}
              </span>
            ) : null}
          </label>

          <label className="contact-field">
            <span>Work email</span>
            <input
              name="workEmail"
              type="email"
              value={contactForm.workEmail}
              onChange={(event) => onContactFieldChange('workEmail', event.target.value)}
              aria-invalid={Boolean(contactErrors.workEmail)}
              aria-describedby={
                contactErrors.workEmail ? 'contact-workEmail-error' : undefined
              }
              autoComplete="email"
            />
            {contactErrors.workEmail ? (
              <span id="contact-workEmail-error" className="contact-error-text">
                {contactErrors.workEmail}
              </span>
            ) : null}
          </label>

          <label className="contact-field">
            <span>Company (optional)</span>
            <input
              name="company"
              type="text"
              value={contactForm.company}
              onChange={(event) => onContactFieldChange('company', event.target.value)}
              autoComplete="organization"
            />
          </label>

          <label className="contact-field">
            <span>Main delivery bottleneck</span>
            <textarea
              name="challenge"
              rows={4}
              value={contactForm.challenge}
              onChange={(event) => onContactFieldChange('challenge', event.target.value)}
              aria-invalid={Boolean(contactErrors.challenge)}
              aria-describedby={
                contactErrors.challenge ? 'contact-challenge-error' : undefined
              }
            />
            {contactErrors.challenge ? (
              <span id="contact-challenge-error" className="contact-error-text">
                {contactErrors.challenge}
              </span>
            ) : null}
          </label>

          <button
            type="submit"
            className="button dark"
            disabled={contactStatus.type === 'submitting'}
          >
            {contactStatus.type === 'submitting'
              ? 'Sending...'
              : 'Get your delivery recommendation'}
          </button>

          {contactStatus.type === 'error' ? (
            <p className="contact-status contact-status-error" role="alert">
              {contactStatus.message}
            </p>
          ) : null}

          {contactStatus.type === 'success' ? (
            <p className="contact-status contact-status-success" role="status">
              {contactStatus.message}
            </p>
          ) : null}
        </form>
        <div className="cta-buttons">
          {hasBookingCalendar ? (
            <a
              className="button secondary-on-light"
              href={contactSection.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('booking_calendar_click')}
            >
              {contactSection.primaryCta.label}
            </a>
          ) : null}
          <a
            className="cta-secondary-link"
            href={contactSection.secondaryCta.href}
            onClick={() => trackEvent('email_fallback_click')}
          >
            {contactSection.secondaryCta.label}
          </a>
        </div>
        <div className="cta-note">{contactSection.note}</div>
        <a
          className="owner-profile-link"
          href={contactSection.profileCta.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('owner_profile_click', { source: 'contact' })}
        >
          {contactSection.profileCta.label}
        </a>
      </div>
    </section>
  );
}
