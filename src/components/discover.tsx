import Link from "next/link";
import { GameArtwork } from "./game-artwork";
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
        <Link className="text-link" href="/discover">
          Explorar a curadoria ↗
        </Link>
      </SectionHeading>
      <div className="discover-grid">
        {[games[3], games[2]].map((game, index) => (
          <article
            className="discover-card interactive-card"
            key={game.id}
            data-reveal
          >
            <div className="discover-image">
              <GameArtwork game={game} />
            </div>
            <div className="discover-content">
              <span className="eyebrow lime">
                {index === 0
                  ? "PEQUENO ESTÚDIO. UNIVERSO GIGANTE."
                  : "SÓ MAIS UMA TENTATIVA."}
              </span>
              <h3>
                <Link href={`/games/${game.slug}`}>{game.title}</Link>
              </h3>
              <p>{game.description}</p>
              <GameDialog game={game} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
