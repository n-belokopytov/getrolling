export function DifferentiatorSection({
  differentiatorSection,
  trustedCompaniesSection,
}) {
  return (
    <section id={differentiatorSection.id} className="section">
      <div className="section-head">
        <div className="eyebrow">{differentiatorSection.eyebrow}</div>
        <h2>{differentiatorSection.title}</h2>
      </div>
      <p className="about-body">{differentiatorSection.aboutBody}</p>
      <div className="cards three">
        {differentiatorSection.points.map((point) => (
          <div className="card" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
      <div className="trusted-proof" aria-label="Trusted companies">
        <div className="eyebrow">{trustedCompaniesSection.eyebrow}</div>
        <ul className="trusted-companies-list">
          {trustedCompaniesSection.companies.map((company) => (
            <li className="trusted-company-item" key={company.name}>
              <div className="trusted-company-head">
                <h4>{company.name}</h4>
                <a
                  className="trusted-company-link"
                  href={company.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>
              <p className="trusted-company-description">{company.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
