export default function SectionHeading({
  eyebrow,
  children,
  description,
  className = '',
}) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
