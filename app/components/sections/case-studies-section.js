export function CaseStudiesSection({ caseStudies, caseStudiesSection }) {
  return (
    <section id={caseStudiesSection.id} className="section">
      <div className="section-head">
        <div className="eyebrow">{caseStudiesSection.eyebrow}</div>
        <h2>{caseStudiesSection.title}</h2>
      </div>
      <div className="case-studies">
        {caseStudies.map((cs) => (
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
  );
}
