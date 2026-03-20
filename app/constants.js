export const BRAND = {
  name: 'GetRolling',
  domainSuffix: '.tech',
  tagline: 'Engineering systems that actually move',
};

export const SITE_METADATA = {
  title: `${BRAND.name}${BRAND.domainSuffix}`,
  description: `${BRAND.tagline}.`,
};

export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#tracks', label: 'Who it’s for' },
  { href: '#approach', label: 'Approach' },
  { href: '#contact', label: 'Contact' },
];

export const HERO = {
  pill: 'For startups, scaleups, and larger engineering orgs under pressure',
  titleBeforeMuted: 'Get the engineering machine ',
  titleMuted: 'rolling.',
  lead:
    'I help companies remove delivery drag, install better operating systems, and apply AI where it creates measurable leverage. ' +
    'For bigger teams, that means execution under complexity. For early companies, that means setting the foundation before entropy takes over.',
  primaryCta: { href: '#contact', label: 'Book an intro call' },
  secondaryCta: { href: '#tracks', label: 'See engagement options' },
  tags: ['AI in SDLC', 'Platform cleanup', 'Delivery redesign', 'Fractional leadership'],
};

export const POSITIONING_PANEL = {
  eyebrow: 'Positioning',
  title: 'Two tracks. One operator.',
  miniPill: 'Operator-led',
  track1: {
    eyebrow: 'Track 1',
    title: 'Execution for mid-size and large companies',
    body:
      'Fix delivery, ownership, platform friction, release flow, and AI adoption across teams that already exist but do not move cleanly.',
  },
  track2: {
    eyebrow: 'Track 2',
    title: 'Setup for smaller and seed-stage companies',
    body:
      'Put the first real system in place: architecture, process, hiring direction, delivery basics, and founder support.',
  },
};

export const SERVICES_SECTION = {
  eyebrow: 'What changes',
  title: 'Less drag. More motion. Better systems.',
};

export const OUTCOMES = [
  {
    title: 'Ship faster',
    text: 'Reduce coordination drag, broken ownership, and dead time in the delivery system.',
  },
  {
    title: 'Use AI pragmatically',
    text: 'Integrate AI into engineering workflows where it creates measurable leverage.',
  },
  {
    title: 'Get structure early',
    text: 'Install the first real operating model before chaos hardens into culture.',
  },
];

export const ENTERPRISE_TRACK = {
  eyebrow: 'For mid-size to large companies',
  title: 'Get shit done inside complexity',
  body:
    'When delivery slows down, ownership gets muddy, and every fix creates another layer of process, ' +
    'I come in and rework the system so teams can move again.',
  points: [
    'Fix delivery drag across teams and functions',
    'Introduce AI where it saves real time, not theater',
    'Stabilize platform ownership, quality, and release flow',
  ],
};

export const STARTUP_TRACK = {
  eyebrow: 'For smaller and seed-stage companies',
  title: 'Set it up right before chaos scales',
  body:
    'Early-stage teams do not need ceremony. They need a senior operator who can install enough structure, ' +
    'technical direction, and momentum to keep growth from turning into waste.',
  points: [
    'Set up product and engineering from zero to motion',
    'Define lean process, architecture, and hiring priorities',
    'Give founders senior technical leverage without full-time exec cost',
  ],
};

export const APPROACH_SECTION = {
  eyebrow: 'Approach',
  title: 'Senior technical leverage without corporate theater.',
  steps: [
    {
      title: '1. Diagnose',
      text: 'Map where time, trust, and ownership are being lost.',
    },
    {
      title: '2. Redesign',
      text: 'Simplify operating model, interfaces, and decision flow.',
    },
    {
      title: '3. Roll out',
      text: 'Introduce AI, process, and technical changes with actual adoption.',
    },
    {
      title: '4. Stabilize',
      text: 'Hand back a system that can keep moving without babysitting.',
    },
  ],
};

export const CONTACT_SECTION = {
  eyebrow: 'Start with a concrete problem',
  title: 'Delivery stalled? Team scaling too fast? AI rollout going nowhere?',
  body: 'Bring me the mess. I’ll help you turn it into a working system.',
  cta: { href: 'mailto:hello@getrolling.tech', label: 'Book an intro call' },
  note: 'Berlin-based. Works remotely across Europe.',
};
