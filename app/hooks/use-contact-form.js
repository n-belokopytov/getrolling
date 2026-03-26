import { useState } from 'react';
import {
  CONTACT_HONEYPOT_FIELD,
  DEFAULT_CONTACT_SUCCESS_MESSAGE,
} from '../lib/contact-contract';
import { trackEvent } from '../lib/analytics';
import { INITIAL_CONTACT_FORM, validateContactForm } from '../lib/contact-form';

export function useContactForm({
  answeredCount,
  hasMinimumAnswers,
  isSubmitted,
  minAnswers,
  recommendedMode,
  score,
}) {
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);
  const [contactHoneypotValue, setContactHoneypotValue] = useState('');
  const [contactFormStartedAt, setContactFormStartedAt] = useState(() => Date.now());
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState({
    type: 'idle',
    message: '',
  });

  function onContactFieldChange(field, value) {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function onContactSubmit(event) {
    event.preventDefault();

    const nextErrors = validateContactForm(contactForm);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidFieldName = Object.keys(nextErrors)[0];
      const firstInvalidField = event.currentTarget.querySelector(
        `[name="${firstInvalidFieldName}"]`,
      );

      setContactErrors(nextErrors);
      setContactStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.',
      });
      trackEvent('contact_submit_validation_error', {
        missingFields: Object.keys(nextErrors),
      });
      firstInvalidField?.focus();
      return;
    }

    setContactStatus({ type: 'submitting', message: '' });
    trackEvent('contact_submit_attempt');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          [CONTACT_HONEYPOT_FIELD]: contactHoneypotValue,
          formStartedAt: contactFormStartedAt,
          fitCheck: {
            isSubmitted,
            answeredCount,
            minAnswers,
            score,
            recommendedMode: isSubmitted && hasMinimumAnswers ? recommendedMode : null,
          },
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to submit contact request.');
      }

      setContactStatus({
        type: 'success',
        message: payload?.message || DEFAULT_CONTACT_SUCCESS_MESSAGE,
      });
      setContactErrors({});
      setContactForm(INITIAL_CONTACT_FORM);
      setContactHoneypotValue('');
      setContactFormStartedAt(Date.now());
      trackEvent('contact_submit_success');
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
      trackEvent('contact_submit_failure', {
        reason: error.message || 'unknown',
      });
    }
  }

  return {
    contactErrors,
    contactForm,
    contactFormStartedAt,
    contactHoneypotFieldName: CONTACT_HONEYPOT_FIELD,
    contactHoneypotValue,
    contactStatus,
    onContactFieldChange,
    onContactHoneypotChange: setContactHoneypotValue,
    onContactSubmit,
  };
}
