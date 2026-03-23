export function EngagementsSection({ engagements, engagementsSection }) {
  return (
    <section id={engagementsSection.id} className="section">
      <div className="section-head">
        <div className="eyebrow">{engagementsSection.eyebrow}</div>
        <h2>{engagementsSection.title}</h2>
      </div>
      <div className="cards three">
        {engagements.map((eng) => (
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
  );
}
