export const CONTACT_EMAIL = 'hello@getrolling.tech';
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

const bottleneckSubject = encodeURIComponent('Biggest delivery bottleneck');
const bottleneckBody = encodeURIComponent(
  'My biggest delivery bottleneck right now:\n\n',
);

export const CONTACT_SECTION = {
  id: 'contact',
  eyebrow: 'Primary action',
  title: 'Share context. Get a clear next step.',
  body: 'Share your bottleneck in a short form. I will reply with a practical recommendation.',
  responseWindow: 'You will get a direct response within one business day.',
  nextStep:
    'You will get a recommendation and a clear next-step proposal.',
  primaryCta: {
    href: BOOKING_URL,
    label: 'Optional: open calendar',
  },
  secondaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${bottleneckSubject}&body=${bottleneckBody}`,
    label: 'Or email context directly',
  },
  note: 'No delegated intake. Replies come from me.',
};
