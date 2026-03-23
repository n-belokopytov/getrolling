export function WhoSection({ whoSection }) {
  return (
    <section id={whoSection.id} className="section">
      <div className="section-head">
        <div className="eyebrow">{whoSection.eyebrow}</div>
        <h2>{whoSection.title}</h2>
      </div>
      <div className="for-not-grid">
        <div className="card large-card for-card">
          <h3 className="for-not-heading">{whoSection.forTitle}</h3>
          <ul className="list">
            {whoSection.forItems.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="card large-card not-card">
          <h3 className="for-not-heading">{whoSection.notTitle}</h3>
          <ul className="list">
            {whoSection.notItems.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card large-card startup-icp">
        <div className="eyebrow">{whoSection.startupEyebrow}</div>
        <h3>{whoSection.startupTitle}</h3>
        <p>{whoSection.startupBody}</p>
        <ul className="list">
          {whoSection.startupPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
