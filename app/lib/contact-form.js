export const INITIAL_CONTACT_FORM = {
  fullName: '',
  workEmail: '',
  company: '',
  challenge: '',
};

export function validateContactForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please share your full name.';
  }

  if (!values.workEmail.trim()) {
    errors.workEmail = 'Please add a work email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail.trim())) {
    errors.workEmail = 'Please enter a valid email.';
  }

  if (!values.challenge.trim()) {
    errors.challenge = 'Please describe your main bottleneck.';
  }

  return errors;
}
