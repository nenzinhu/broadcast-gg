import { ArrowDownRight } from "lucide-react";
import { games } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";
import { GameCard } from "./game-card";
export function PriceRadar() {
  return (
    <section className="section" id="deals">
      <SectionHeading
        number="02"
        eyebrow="PRICE RADAR"
        title="Jogo bom. Preço melhor."
      >
        <a className="text-link" href="#decision">
          Comprar agora? <ArrowDownRight size={17} aria-hidden="true" />
        </a>
      </SectionHeading>
      <div className="deals-grid">
        {games.slice(0, 4).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <p className="section-footnote">
        Preços e descontos demonstrativos em BRL. Sem ofertas ou lojas
        vinculadas.
      </p>
    </section>
  );
}
