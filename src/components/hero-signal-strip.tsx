import Link from "next/link";
import { ArrowUpRight, Crosshair, Radar, Tag } from "lucide-react";

const signalPaths = [
  {
    href: "/preview",
    kicker: "PRÓXIMOS SINAIS",
    value: "18",
    title: "jogos no radar",
    detail: "GTA VI, Wolverine, Fable e mais",
    icon: Radar,
    tone: "magenta",
  },
  {
    href: "/deals",
    kicker: "Sinais de preço",
    value: "BUY",
    title: "quando o preço faz sentido",
    detail: "Compare descontos antes de decidir",
    icon: Tag,
    tone: "lime",
  },
  {
    href: "/central#catalogo",
    kicker: "INTELIGÊNCIA",
    value: "03",
    title: "Central de inteligência",
    detail: "Catálogo, retorno e ordem para jogar",
    icon: Crosshair,
    tone: "cyan",
  },
] as const;

export function HeroSignalStrip() {
  return (
    <section className="hero-signal-strip" data-testid="hero-signal-strip" aria-label="Caminhos rápidos do radar">
      <div className="hero-signal-intro">
        <span className="eyebrow"><span className="status-dot" /> RADAR EM FOCO</span>
        <strong>Escolha sua próxima leitura.</strong>
      </div>
      <div className="hero-signal-links">
        {signalPaths.map(({ href, kicker, value, title, detail, icon: Icon, tone }) => (
          <Link className={`hero-signal-card hero-signal-card--${tone}`} href={href} key={href} aria-label={href === "/preview" ? "Preview: 18 jogos no radar" : undefined}>
            <span className="hero-signal-card-top">
              <span>{kicker}</span>
              <Icon size={17} aria-hidden="true" />
            </span>
            <span className="hero-signal-card-main">
              <strong>{value}</strong>
              <span>{title}</span>
            </span>
            <span className="hero-signal-card-detail">{detail}</span>
            <ArrowUpRight className="hero-signal-arrow" size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
