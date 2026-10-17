export function PageHeader({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-header" data-reveal>
      <div className="eyebrow">
        <span className="section-number">{number}</span>
        {eyebrow}
      </div>
      <h1>{title}</h1>
      {description && <p className="page-description">{description}</p>}
      {children && <div className="heading-aside">{children}</div>}
    </header>
  );
}