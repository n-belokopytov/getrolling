export const CASE_STUDIES_SECTION = {
  id: 'case-studies',
  eyebrow: 'Case studies',
  title: 'Problem, action, result',
};

export const CASE_STUDIES = [
  {
    company: 'Playrix',
    problem: 'Reactive and unpredictable delivery, recurring incidents, tech debt quicksands.',
    action: 'Organized the tech department into streams for delivery speed, third-party integrations, performance optimization, CI/CD and live ops support. Reworked on-call and incident response processes, modularized project architecture and introduced agentic AI for triage.',
    results: [
      'Incident response: 24h → <1h',
      'PR cycle: −3h',
      'Test cycle: −50%',
      'Devhours freed-up: 80-100 hours weekly',
    ],
  },
  {
    company: 'AutoScout24',
    problem: 'Unpredictable release cycles. Handover bottlenecks. Siloed delivery.',
    action: 'Aligned execution across platforms into domain-based teams + infra team, switched to Trunk-based development and radically simplified the release process, introduced tech design reviews and incident response processes.',
    results: [
      '2–3× release frequency',
      'Platforms synchronized; fewer delivery shocks',
      'Massive decrease in SEV-1 and SEV-2 incidents',
      'Effectively eliminated handover bottlenecks',
    ],
  },
  {
    company: 'Quandoo',
    problem: 'Took over a project of an automated lead generation pipeline - no delivery milestones, no clear ownership, no technical vision.',
    action: 'Interviewed business and engineering stakeholders to identify requirements and scope. Reworked the continous stream processing into a batch data pipeline with incremental processing and a manual trigger for on-demand launches.',
    results: ['100× cost reduction on the data systems involved'],
  },
];
