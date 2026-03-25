import { OWNER_PROFILE } from './owner';

export const HERO = {
  titleLine1: 'Ship faster and better,',
  titleLine2: 'without burning through people.',
  support: `I am ${OWNER_PROFILE.fullName}, an ${OWNER_PROFILE.role} with executive capabilities. I help teams fix delivery bottlenecks, recurring incidents, and ownership gaps.`,
  primaryCta: {
    href: '#contact-form',
    label: 'Get your delivery recommendation',
  },
};

export const PROOF_NOTE =
  'Tangible outcomes from real projects, not slideware.';

export const PROOF_METRICS = [
  {
    stat: '24h -> <1h',
    label: 'incident response time',
    context: 'On-call process design at Playrix',
  },
  {
    stat: '2-3x',
    label: 'release frequency',
    context: 'AutoScout24 mobile delivery',
  },
  {
    stat: '20min -> 1 sec',
    label: 'pre-commit code checks',
    context: 'Hands-on deep dive at Playrix',
  },
  {
    stat: '100x',
    label: 'cost reduction',
    context: 'Lead generation pipeline rework at Quandoo',
  },
];
