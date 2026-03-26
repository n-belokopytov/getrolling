import { CONTACT_LIMITS, isValidContactEmail } from './contact-contract';

export const INITIAL_CONTACT_FORM = {
  fullName: '',
  workEmail: '',
  company: '',
  challenge: '',
};

export function validateContactForm(values) {
  const errors = {};
  const fullName = values.fullName.trim();
  const workEmail = values.workEmail.trim();
  const challenge = values.challenge.trim();
  const company = values.company.trim();

  if (!fullName) {
    errors.fullName = 'Please share your full name.';
  } else if (fullName.length > CONTACT_LIMITS.maxFullNameLength) {
    errors.fullName = 'Please keep your full name under 120 characters.';
  }

  if (!workEmail) {
    errors.workEmail = 'Please add a work email.';
  } else if (!isValidContactEmail(workEmail)) {
    errors.workEmail = 'Please enter a valid email.';
  } else if (workEmail.length > CONTACT_LIMITS.maxWorkEmailLength) {
    errors.workEmail = 'Please keep your email under 254 characters.';
  }

  if (!challenge) {
    errors.challenge = 'Please describe your main bottleneck.';
  } else if (challenge.length > CONTACT_LIMITS.maxChallengeLength) {
    errors.challenge = 'Please keep your bottleneck description under 4000 characters.';
  }

  if (company.length > CONTACT_LIMITS.maxCompanyLength) {
    errors.company = 'Please keep company name under 120 characters.';
  }

  return errors;
}
