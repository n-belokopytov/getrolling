export function DifferentiatorSection({ differentiatorSection }) {
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
    </section>
  );
}
