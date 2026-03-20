export const CONTACT_EMAIL = 'hello@getrolling.tech';

export const BRAND = {
  name: 'GetRolling',
  domainSuffix: '.tech',
  tagline: 'Throughput for engineering systems under real-world constraints',
};

export const SITE_METADATA = {
  title: `${BRAND.name}${BRAND.domainSuffix}`,
  description:
    'CTO-adjacent operator: fix slow delivery, recurring incidents, and fragmented ownership. Measurable deltas fast.',
};

export const NAV_LINKS = [
  { href: '#who', label: 'Who it’s for' },
  { href: '#outcomes', label: 'Outcomes' },
  { href: '#case-studies', label: 'Case studies' },
  { href: '#engagements', label: 'Engagements' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const diagnosticSubject = encodeURIComponent('30-minute system diagnostic');
const bottleneckSubject = encodeURIComponent('Biggest delivery bottleneck');
const bottleneckBody = encodeURIComponent(
  'My biggest delivery bottleneck right now:\n\n',
);

export const HERO = {
  pill: 'For CTOs and product leaders when delivery is under pressure',
  titleLine1: 'Engineering systems that deliver.',
  titleLine2: 'Even under pressure.',
  lead:
    'I help CTOs and product leaders fix slow delivery, cut operational overhead, and turn fragmented teams into predictable, high-output systems. ' +
    'You get throughput of engineering systems under real-world constraints—not generic consulting.',
  primaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${diagnosticSubject}`,
    label: 'Book a 30-minute system diagnostic',
  },
  secondaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${bottleneckSubject}&body=${bottleneckBody}`,
    label: 'Send your biggest delivery bottleneck',
  },
};

export const PROOF_METRICS = [
  { stat: '24h → <1h', label: 'incident response' },
  { stat: '2–3×', label: 'release frequency' },
  { stat: '−50%', label: 'test cycle time' },
  { stat: '100×', label: 'cost reduction (data systems)' },
];

export const WHO_SECTION = {
  id: 'who',
  eyebrow: 'Who this is for',
  title: 'Filter first. Better leads beat more leads.',
  forTitle: 'This is for you if',
  forItems: [
    'Teams ship slower than expected despite strong individual contributors',
    'Incidents keep recurring and no one clearly owns the system',
    'Delivery depends on heroics instead of a repeatable system',
    'Headcount scaled but output did not',
    'Tech-debt conversations stall while the roadmap slips',
  ],
  notTitle: 'Not for you if',
  notItems: [
    'You want coaching sessions, not concrete outcomes',
    'You are optimizing at the margins, not fixing the system',
    'You are looking for the cheapest hands on keyboard',
  ],
  startupEyebrow: 'Secondary fit',
  startupTitle: 'Startups and seed-stage teams',
  startupBody:
    'No delivery discipline yet, structure missing, scaling feels chaotic. Same operator mindset—lighter footprint, faster baseline.',
  startupPoints: [
    'Lean operating model and delivery basics before entropy hardens',
    'Architecture and hiring direction without a full-time exec',
    'Founder leverage on technical decisions',
  ],
};

export const OUTCOMES_SECTION = {
  id: 'outcomes',
  eyebrow: 'What changes after working with me',
  title: 'System-level outcomes—not activity labels',
};

export const OUTCOMES = [
  {
    title: 'Delivery becomes predictable',
    text: 'Releases and commitments line up with reality instead of hope.',
  },
  {
    title: 'Incidents get rare—and fast to resolve',
    text: 'Clear ownership, tighter feedback loops, less firefighting.',
  },
  {
    title: 'Teams run with clear ownership',
    text: 'Interfaces and decisions are explicit; fewer coordination dead zones.',
  },
  {
    title: 'CI/CD stops being the bottleneck',
    text: 'Pipeline, quality gates, and release flow match the speed you need.',
  },
  {
    title: 'Engineers regain productive time',
    text: 'Roughly 1–2 hours per day back when manual overhead and thrash come down.',
  },
];

export const CASE_STUDIES_SECTION = {
  id: 'case-studies',
  eyebrow: 'Case studies',
  title: 'Problems, moves, numbers',
};

export const CASE_STUDIES = [
  {
    company: 'Playrix',
    problem: 'Reactive firefighting and slow incident response.',
    action: 'Restructured into five mission-based units with clearer ownership.',
    results: [
      'Incident response: 24h → <1h',
      'PR cycle: −3h',
      'Test cycle: −50%',
    ],
  },
  {
    company: 'AutoScout24',
    problem: 'Fragmented mobile org and unpredictable delivery.',
    action: 'Aligned execution across platforms and delivery mechanics.',
    results: [
      '2–3× release frequency',
      'Platforms synchronized; fewer delivery shocks',
    ],
  },
  {
    company: 'Quandoo',
    problem: 'Expensive data pipeline at scale.',
    action: 'Reworked data path and cost structure.',
    results: ['100× cost reduction on the data systems involved'],
  },
];

export const ENGAGEMENTS_SECTION = {
  id: 'engagements',
  eyebrow: 'How to engage',
  title: 'Clear entry points',
};

export const ENGAGEMENTS = [
  {
    name: 'Delivery system audit',
    duration: '2–3 weeks',
    focus: [
      'CI/CD, release flow, and quality gates',
      'Org structure, ownership, and decision paths',
      'Incident flow and operational load',
    ],
    output: 'Prioritized intervention plan with quantified bottlenecks.',
  },
  {
    name: 'Fractional leadership',
    duration: '1–3 days / week',
    focus: [
      'Execution systems and delivery metrics',
      'Org and interface design',
      'Stakeholder alignment without theater',
    ],
    output: 'Sustained leverage while you hire or transition.',
  },
  {
    name: 'Intervention / recovery',
    duration: 'Short, high intensity',
    focus: [
      'When delivery or incidents are actively breaking trust',
      'Tight loop: diagnose, fix, stabilize',
    ],
    output: 'Stability first, then hand back a system that keeps moving.',
  },
];

export const ABOUT_SECTION = {
  id: 'about',
  eyebrow: 'About',
  title: 'Operator, not deck writer',
  body:
    'I work CTO-close: delivery systems under pressure, ownership, and measurable deltas—not slideware. ' +
    'When useful, I use automation and AI to remove manual work, cut cognitive load, and speed feedback loops—for example removing on the order of ~20 hours per week of operational overhead where it applied. Concrete leverage only.',
  note: 'Berlin-based. Remote across Europe.',
};

export const CONTACT_SECTION = {
  id: 'contact',
  eyebrow: 'Next step',
  title: 'Pick a concrete entry point',
  body: 'Send a short note with context, or book the diagnostic. I reply with what actually makes sense.',
  primaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${diagnosticSubject}`,
    label: 'Book a 30-minute system diagnostic',
  },
  secondaryCta: {
    href: `mailto:${CONTACT_EMAIL}?subject=${bottleneckSubject}&body=${bottleneckBody}`,
    label: 'Email your biggest bottleneck',
  },
  note: 'Berlin-based. Works remotely across Europe.',
};
