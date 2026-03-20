import {
  ABOUT_SECTION,
  BRAND,
  CASE_STUDIES,
  CASE_STUDIES_SECTION,
  CONTACT_SECTION,
  ENGAGEMENTS,
  ENGAGEMENTS_SECTION,
  HERO,
  NAV_LINKS,
  OUTCOMES,
  OUTCOMES_SECTION,
  PROOF_METRICS,
  WHO_SECTION,
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

      <section className="hero hero-full">
        <div className="pill">{HERO.pill}</div>
        <h1 className="hero-title">
          <span className="hero-title-line">{HERO.titleLine1}</span>{' '}
          <span className="muted">{HERO.titleLine2}</span>
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
        <div className="proof-strip" aria-label="Selected results">
          {PROOF_METRICS.map((item) => (
            <div className="proof-item" key={item.stat}>
              <div className="proof-stat">{item.stat}</div>
              <div className="proof-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id={WHO_SECTION.id} className="section">
        <div className="section-head">
          <div className="eyebrow">{WHO_SECTION.eyebrow}</div>
          <h2>{WHO_SECTION.title}</h2>
        </div>
        <div className="for-not-grid">
          <div className="card large-card for-card">
            <h3 className="for-not-heading">{WHO_SECTION.forTitle}</h3>
            <ul className="list">
              {WHO_SECTION.forItems.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="card large-card not-card">
            <h3 className="for-not-heading">{WHO_SECTION.notTitle}</h3>
            <ul className="list">
              {WHO_SECTION.notItems.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card large-card startup-icp">
          <div className="eyebrow">{WHO_SECTION.startupEyebrow}</div>
          <h3>{WHO_SECTION.startupTitle}</h3>
          <p>{WHO_SECTION.startupBody}</p>
          <ul className="list">
            {WHO_SECTION.startupPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id={OUTCOMES_SECTION.id} className="section">
        <div className="section-head">
          <div className="eyebrow">{OUTCOMES_SECTION.eyebrow}</div>
          <h2>{OUTCOMES_SECTION.title}</h2>
        </div>
        <div className="cards outcomes-grid">
          {OUTCOMES.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id={CASE_STUDIES_SECTION.id} className="section">
        <div className="section-head">
          <div className="eyebrow">{CASE_STUDIES_SECTION.eyebrow}</div>
          <h2>{CASE_STUDIES_SECTION.title}</h2>
        </div>
        <div className="case-studies">
          {CASE_STUDIES.map((cs) => (
            <article className="card large-card case-study" key={cs.company}>
              <h3>{cs.company}</h3>
              <p>
                <span className="case-kicker">Problem: </span>
                {cs.problem}
              </p>
              {cs.action ? (
                <p>
                  <span className="case-kicker">Action: </span>
                  {cs.action}
                </p>
              ) : null}
              <div className="case-results">
                <div className="case-kicker">Result</div>
                <ul className="list metric-list">
                  {cs.results.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id={ENGAGEMENTS_SECTION.id} className="section">
        <div className="section-head">
          <div className="eyebrow">{ENGAGEMENTS_SECTION.eyebrow}</div>
          <h2>{ENGAGEMENTS_SECTION.title}</h2>
        </div>
        <div className="cards three">
          {ENGAGEMENTS.map((eng) => (
            <div className="card" key={eng.name}>
              <h3>{eng.name}</h3>
              <p className="engagement-duration">{eng.duration}</p>
              <ul className="list">
                {eng.focus.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="engagement-output">
                <span className="case-kicker">Output: </span>
                {eng.output}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id={ABOUT_SECTION.id} className="section about-section">
        <div className="section-head">
          <div className="eyebrow">{ABOUT_SECTION.eyebrow}</div>
          <h2>{ABOUT_SECTION.title}</h2>
        </div>
        <p className="about-body">{ABOUT_SECTION.body}</p>
        <p className="muted about-note">{ABOUT_SECTION.note}</p>
      </section>

      <section id={CONTACT_SECTION.id} className="cta section">
        <div>
          <div className="eyebrow dark">{CONTACT_SECTION.eyebrow}</div>
          <h2>{CONTACT_SECTION.title}</h2>
          <p>{CONTACT_SECTION.body}</p>
        </div>
        <div className="cta-side">
          <div className="cta-buttons">
            <a className="button dark" href={CONTACT_SECTION.primaryCta.href}>
              {CONTACT_SECTION.primaryCta.label}
            </a>
            <a
              className="button dark secondary-on-light"
              href={CONTACT_SECTION.secondaryCta.href}
            >
              {CONTACT_SECTION.secondaryCta.label}
            </a>
          </div>
          <div className="cta-note">{CONTACT_SECTION.note}</div>
        </div>
      </section>
    </main>
  );
}
