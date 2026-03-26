import { SectionHeader } from '../section-header';

export function EngagementsSection({ engagements, engagementsSection }) {
  return (
    <section id={engagementsSection.id} className="section">
      <SectionHeader eyebrow={engagementsSection.eyebrow} title={engagementsSection.title} />
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
