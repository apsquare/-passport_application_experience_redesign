export default function SectionCard({ title, subtitle, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      <div className="card-content">{children}</div>
    </div>
  );
}
