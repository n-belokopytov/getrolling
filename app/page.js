import {
  APPROACH_SECTION,
  BRAND,
  CONTACT_SECTION,
  ENTERPRISE_TRACK,
  HERO,
  NAV_LINKS,
  OUTCOMES,
  POSITIONING_PANEL,
  SERVICES_SECTION,
  STARTUP_TRACK,
} from './constants';

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <div className="brand">
            {BRAND.name}
            <span className="muted">{BRAND.domainSuffix}</span>
          </div>
          <div className="subbrand">{BRAND.tagline}</div>
        </div>
        <nav className="nav">
          {NAV_LINKS.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero two-col">
        <div>
          <div className="pill">{HERO.pill}</div>
          <h1>
            {HERO.titleBeforeMuted}
            <span className="muted">{HERO.titleMuted}</span>
          </h1>
          <p className="lead">{HERO.lead}</p>
          <div className="actions">
            <a className="button primary" href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
            </a>
            <a className="button secondary" href={HERO.secondaryCta.href}>
              {HERO.secondaryCta.label}
            </a>
          </div>
          <div className="tag-grid">
            {HERO.tags.map((item) => (
              <div className="tag-card" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">{POSITIONING_PANEL.eyebrow}</div>
              <h2>{POSITIONING_PANEL.title}</h2>
            </div>
            <div className="mini-pill">{POSITIONING_PANEL.miniPill}</div>
          </div>

          <div className="stack">
            <div className="inner-card">
              <div className="eyebrow">{POSITIONING_PANEL.track1.eyebrow}</div>
              <h3>{POSITIONING_PANEL.track1.title}</h3>
              <p>{POSITIONING_PANEL.track1.body}</p>
            </div>
            <div className="inner-card">
              <div className="eyebrow">{POSITIONING_PANEL.track2.eyebrow}</div>
              <h3>{POSITIONING_PANEL.track2.title}</h3>
              <p>{POSITIONING_PANEL.track2.body}</p>
            </div>
          </div>
        </aside>
      </section>

      <section id="services" className="section">
        <div className="section-head">
          <div className="eyebrow">{SERVICES_SECTION.eyebrow}</div>
          <h2>{SERVICES_SECTION.title}</h2>
        </div>
        <div className="cards three">
          {OUTCOMES.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tracks" className="cards two section">
        <div className="card large-card">
          <div className="eyebrow">{ENTERPRISE_TRACK.eyebrow}</div>
          <h2>{ENTERPRISE_TRACK.title}</h2>
          <p>{ENTERPRISE_TRACK.body}</p>
          <ul className="list">
            {ENTERPRISE_TRACK.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="card large-card">
          <div className="eyebrow">{STARTUP_TRACK.eyebrow}</div>
          <h2>{STARTUP_TRACK.title}</h2>
          <p>{STARTUP_TRACK.body}</p>
          <ul className="list">
            {STARTUP_TRACK.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="approach" className="section feature-panel">
        <div className="feature-grid">
          <div>
            <div className="eyebrow">{APPROACH_SECTION.eyebrow}</div>
            <h2>{APPROACH_SECTION.title}</h2>
          </div>
          <div className="cards two">
            {APPROACH_SECTION.steps.map((step) => (
              <div className="card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta section">
        <div>
          <div className="eyebrow dark">{CONTACT_SECTION.eyebrow}</div>
          <h2>{CONTACT_SECTION.title}</h2>
          <p>{CONTACT_SECTION.body}</p>
        </div>
        <div className="cta-side">
          <a className="button dark" href={CONTACT_SECTION.cta.href}>
            {CONTACT_SECTION.cta.label}
          </a>
          <div className="cta-note">{CONTACT_SECTION.note}</div>
        </div>
      </section>
    </main>
  );
}
