import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className="page-intro" data-reveal>
      <div className="eyebrow">
        <span className="status-dot lime" />
        {eyebrow}
      </div>
      <h1 data-split-title>
        {title}{" "}
        <br />
        <span className="lime">{accent}</span>
      </h1>
      <div className="page-intro-bottom">
        <p>{description}</p>
        <Link className="text-link" href="/radar">
          Seu radar pessoal <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
