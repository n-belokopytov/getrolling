const enterprisePoints = [
  'Fix delivery drag across teams and functions',
  'Introduce AI where it saves real time, not theater',
  'Stabilize platform ownership, quality, and release flow',
];

const startupPoints = [
  'Set up product and engineering from zero to motion',
  'Define lean process, architecture, and hiring priorities',
  'Give founders senior technical leverage without full-time exec cost',
];

const outcomes = [
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

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <div className="brand">GetRolling<span className="muted">.tech</span></div>
          <div className="subbrand">Engineering systems that actually move</div>
        </div>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#tracks">Who it’s for</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero two-col">
        <div>
          <div className="pill">For startups, scaleups, and larger engineering orgs under pressure</div>
          <h1>
            Get the engineering machine <span className="muted">rolling.</span>
          </h1>
          <p className="lead">
            I help companies remove delivery drag, install better operating systems, and apply AI where it creates measurable leverage.
            For bigger teams, that means execution under complexity. For early companies, that means setting the foundation before entropy takes over.
          </p>
          <div className="actions">
            <a className="button primary" href="#contact">Book an intro call</a>
            <a className="button secondary" href="#tracks">See engagement options</a>
          </div>
          <div className="tag-grid">
            {['AI in SDLC', 'Platform cleanup', 'Delivery redesign', 'Fractional leadership'].map((item) => (
              <div className="tag-card" key={item}>{item}</div>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Positioning</div>
              <h2>Two tracks. One operator.</h2>
            </div>
            <div className="mini-pill">Operator-led</div>
          </div>

          <div className="stack">
            <div className="inner-card">
              <div className="eyebrow">Track 1</div>
              <h3>Execution for mid-size and large companies</h3>
              <p>Fix delivery, ownership, platform friction, release flow, and AI adoption across teams that already exist but do not move cleanly.</p>
            </div>
            <div className="inner-card">
              <div className="eyebrow">Track 2</div>
              <h3>Setup for smaller and seed-stage companies</h3>
              <p>Put the first real system in place: architecture, process, hiring direction, delivery basics, and founder support.</p>
            </div>
          </div>
        </aside>
      </section>

      <section id="services" className="section">
        <div className="section-head">
          <div className="eyebrow">What changes</div>
          <h2>Less drag. More motion. Better systems.</h2>
        </div>
        <div className="cards three">
          {outcomes.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tracks" className="cards two section">
        <div className="card large-card">
          <div className="eyebrow">For mid-size to large companies</div>
          <h2>Get shit done inside complexity</h2>
          <p>
            When delivery slows down, ownership gets muddy, and every fix creates another layer of process,
            I come in and rework the system so teams can move again.
          </p>
          <ul className="list">
            {enterprisePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>

        <div className="card large-card">
          <div className="eyebrow">For smaller and seed-stage companies</div>
          <h2>Set it up right before chaos scales</h2>
          <p>
            Early-stage teams do not need ceremony. They need a senior operator who can install enough structure,
            technical direction, and momentum to keep growth from turning into waste.
          </p>
          <ul className="list">
            {startupPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
      </section>

      <section id="approach" className="section feature-panel">
        <div className="feature-grid">
          <div>
            <div className="eyebrow">Approach</div>
            <h2>Senior technical leverage without corporate theater.</h2>
          </div>
          <div className="cards two">
            {[
              ['1. Diagnose', 'Map where time, trust, and ownership are being lost.'],
              ['2. Redesign', 'Simplify operating model, interfaces, and decision flow.'],
              ['3. Roll out', 'Introduce AI, process, and technical changes with actual adoption.'],
              ['4. Stabilize', 'Hand back a system that can keep moving without babysitting.'],
            ].map(([title, text]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta section">
        <div>
          <div className="eyebrow dark">Start with a concrete problem</div>
          <h2>Delivery stalled? Team scaling too fast? AI rollout going nowhere?</h2>
          <p>Bring me the mess. I’ll help you turn it into a working system.</p>
        </div>
        <div className="cta-side">
          <a className="button dark" href="mailto:hello@getrolling.tech">Book an intro call</a>
          <div className="cta-note">Berlin-based. Works remotely across Europe.</div>
        </div>
      </section>
    </main>
  );
}
