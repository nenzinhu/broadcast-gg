export function SectionHeading({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <div className="eyebrow">
          <span className="section-number">{number}</span>
          {eyebrow}
        </div>
        <h2 data-3d-text>{title}</h2>
      </div>
      {children}
    </div>
  );
}
