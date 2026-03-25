import { OWNER_PROFILE } from './owner';

export const HERO = {
  titleLine1: 'Ship faster with control,',
  titleLine2: 'without exhausting your team.',
  support: `I am ${OWNER_PROFILE.fullName}, ${OWNER_PROFILE.role} with executive capabilities. I lead hands-on interventions to resolve delivery bottlenecks, recurring incidents, and ownership gaps.`,
  primaryCta: {
    href: '#contact-form',
    label: 'Get your delivery recommendation',
  },
};

export const PROOF_NOTE =
  'These are outcomes from real projects. They are examples, not guarantees.';

export const PROOF_METRICS = [
  {
    stat: '24h -> <1h',
    label: 'incident response time',
    context: 'Playrix org redesign',
  },
  {
    stat: '2-3x',
    label: 'release frequency',
    context: 'AutoScout24 mobile delivery',
  },
  {
    stat: '-50%',
    label: 'test cycle time',
    context: 'Playrix CI and QA flow',
  },
  {
    stat: '100x',
    label: 'cost reduction in scoped data systems',
    context: 'Quandoo data pipeline scope',
  },
];
