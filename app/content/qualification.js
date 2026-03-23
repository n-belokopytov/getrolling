export const QUALIFICATION_SECTION = {
  id: 'fit-check',
  showCta: 'Optional: quick fit check',
  hideCta: 'Hide fit check',
  minAnswers: 4,
  questions: [
    {
      id: 'team',
      label: 'Current engineering team size',
      options: [
        { label: '1-10', value: '1-10', score: 0 },
        { label: '11-40', value: '11-40', score: 1 },
        { label: '41-120', value: '41-120', score: 2 },
        { label: '120+', value: '120+', score: 2 },
      ],
    },
    {
      id: 'bottleneck',
      label: 'Main delivery bottleneck',
      options: [
        { label: 'Slow release cycle', value: 'slow-release', score: 2 },
        { label: 'Recurring incidents', value: 'incidents', score: 2 },
        { label: 'Cross-team ownership gaps', value: 'ownership-gaps', score: 2 },
        { label: 'General uncertainty', value: 'uncertainty', score: 1 },
      ],
    },
    {
      id: 'urgency',
      label: 'How urgent is change?',
      options: [
        { label: 'This quarter', value: 'this-quarter', score: 2 },
        { label: 'Next 6 months', value: 'next-six-months', score: 1 },
        { label: 'Exploring options', value: 'exploring', score: 0 },
      ],
    },
    {
      id: 'authority',
      label: 'Your role in the decision',
      options: [
        { label: 'Final decision maker', value: 'final', score: 2 },
        { label: 'Strong influencer', value: 'influencer', score: 1 },
        { label: 'Researching for the team', value: 'researching', score: 0 },
      ],
    },
    {
      id: 'engagement',
      label: 'Preferred mode',
      options: [
        { label: 'Hands-on implementation', value: 'hands-on', score: 2 },
        { label: 'Mixed advisory + execution', value: 'mixed', score: 1 },
        { label: 'Advisory only', value: 'advisory', score: 0 },
      ],
    },
  ],
  recommendations: {
    'diagnose-report': {
      title: 'Diagnose and report',
      body: 'Start with a focused diagnostic and clear report. You get a bottleneck map, clear priorities, and a practical next step.',
      ctaLabel: 'Share context for diagnostics',
    },
    'time-framed-intervention': {
      title: 'Time-framed intervention with clear goals',
      body: 'Run a short intervention with clear goals, owners, and success criteria. Goal: stabilize delivery fast.',
      ctaLabel: 'Share context for intervention',
    },
    'fractional-role': {
      title: 'Longer-term fractional role',
      body: 'Use a fractional leadership setup to improve delivery cadence, ownership, and reliability over time.',
      ctaLabel: 'Share context for fractional support',
    },
  },
};
