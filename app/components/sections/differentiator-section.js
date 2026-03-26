import { SectionHeader } from '../section-header';

export function DifferentiatorSection({ differentiatorSection }) {
  return (
    <section id={differentiatorSection.id} className="section">
      <SectionHeader
        eyebrow={differentiatorSection.eyebrow}
        title={differentiatorSection.title}
      />
      <p className="about-body">{differentiatorSection.aboutBody}</p>
      <div className="cards three">
        {differentiatorSection.points.map((point) => (
          <div className="card" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
