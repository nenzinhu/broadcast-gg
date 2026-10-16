import Image from "next/image";
import { games } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";
import { GameDialog } from "./game-dialog";
export function Discover() {
  return (
    <section id="discover" className="section">
      <SectionHeading
        number="04"
        eyebrow="FORA DO ÓBVIO. DENTRO DO RADAR."
        title="Seu próximo favorito está aqui."
      >
        <span className="eyebrow muted">DISCOVER / CURADORIA</span>
      </SectionHeading>
      <div className="discover-grid">
        {[games[3], games[2]].map((game, index) => (
          <article
            className="discover-card interactive-card"
            key={game.id}
            data-reveal
          >
            <div className="discover-image">
              <Image
                src={game.image}
                alt={`Arte conceitual para ${game.title}`}
                width={900}
                height={560}
              />
            </div>
            <div className="discover-content">
              <span className="eyebrow lime">
                {index === 0
                  ? "PEQUENO ESTÚDIO. UNIVERSO GIGANTE."
                  : "SÓ MAIS UMA TENTATIVA."}
              </span>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <GameDialog game={game} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
