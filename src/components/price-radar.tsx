import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
        <div className="heading-aside">
          <a className="text-link" href="#decision">
            Comprar agora? <ArrowDownRight size={17} aria-hidden="true" />
          </a>
          <Link className="text-link" href="/deals">
            Ver todo o catálogo <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
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