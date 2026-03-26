export function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
    </div>
  );
}
