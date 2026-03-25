import { OWNER_PROFILE } from './owner';

export const CONTACT_EMAIL = 'hello@getrolling.tech';
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

const bottleneckSubject = encodeURIComponent('Biggest delivery bottleneck');
const bottleneckBody = encodeURIComponent(
  'My biggest delivery bottleneck right now:\n\n',
);

export const CONTACT_SECTION = {
  id: 'contact',
  eyebrow: 'Next step',
  title: 'Share context. Get a clear next step.',
  body: 'Share your bottleneck in a short form, and I will send you a free, practical recommendation within one business day. If you complete the Fit check, I include that signal in the same review.',
  primaryCta: {
    href: BOOKING_URL,
    label: 'Optional: book a 30-min call',
  },
  secondaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${bottleneckSubject}&body=${bottleneckBody}`,
    label: 'Prefer email? Send context directly',
  },
  profileCta: {
    href: OWNER_PROFILE.linkedinUrl,
    label: `View ${OWNER_PROFILE.fullName} on LinkedIn`,
  },
  note: `No delegated intake. Replies come from ${OWNER_PROFILE.fullName}.`,
};
