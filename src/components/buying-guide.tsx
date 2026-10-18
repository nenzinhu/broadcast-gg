import type { CSSProperties } from "react";
import { BadgeCheck, Gauge, Heart, TriangleAlert } from "lucide-react";
import type { Game } from "@/lib/catalog";
import { getBuyingGuide } from "@/lib/buying-guides";

export function BuyingGuide({ game }: { game: Game }) {
  const guide = getBuyingGuide(game.id);
  const cards = [
    {
      label: "VOCÊ VAI CURTIR SE",
      text: guide.enjoy,
      icon: Heart,
      tone: "enjoy",
    },
    {
      label: "PENSE DUAS VEZES SE",
      text: guide.caution,
      icon: TriangleAlert,
      tone: "caution",
    },
    {
      label: "SITUAÇÃO TÉCNICA",
      text: guide.technical,
      icon: Gauge,
      tone: "technical",
    },
    {
      label: "VEREDITO EDITORIAL",
      text: guide.verdict,
      icon: BadgeCheck,
      tone: "verdict",
    },
  ];

  return (
    <section
      className="buying-guide"
      aria-label="Antes de comprar"
      style={{ "--game-accent": game.color } as CSSProperties}
    >
      <div className="buying-guide-heading" data-reveal>
        <span className="eyebrow lime">DECISION SUPPORT / SEM SPOILERS</span>
        <h2>Antes de comprar</h2>
        <p>
          O essencial para entender se {game.title} combina com seu tempo, seu
          gosto e sua forma de jogar.
        </p>
      </div>
      <div className="buying-guide-grid">
        {cards.map(({ label, text, icon: Icon, tone }) => (
          <article
            className={`buying-guide-card buying-guide-${tone} interactive-card`}
            key={label}
            data-reveal
          >
            <div className="buying-guide-icon" aria-hidden="true">
              <Icon size={20} />
            </div>
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="section-footnote" data-reveal>
        Análise editorial e demonstrativa. Desempenho, serviços e conteúdo
        podem mudar após atualizações.
      </p>
    </section>
  );
}
