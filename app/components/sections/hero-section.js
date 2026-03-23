export function HeroSection({ hero, proofMetrics, proofNote, onPrimaryClick }) {
  return (
    <section id="main-content" className="hero hero-full">
      <h1 className="hero-title">
        <span className="hero-title-line">{hero.titleLine1}</span>{' '}
        <span className="muted">{hero.titleLine2}</span>
      </h1>
      <p className="hero-support">
        Hands-on support for delivery bottlenecks, recurring incidents, and ownership
        gaps.
      </p>
      <div className="actions">
        <a className="button primary" href={hero.primaryCta.href} onClick={onPrimaryClick}>
          {hero.primaryCta.label}
        </a>
      </div>
      <div className="proof-strip" aria-label="Selected results">
        {proofMetrics.map((item) => (
          <div className="proof-item" key={item.stat}>
            <div className="proof-stat">{item.stat}</div>
            <div className="proof-label">{item.label}</div>
            {item.context ? <div className="proof-context">{item.context}</div> : null}
          </div>
        ))}
      </div>
      <p className="proof-note">{proofNote}</p>
    </section>
  );
}
