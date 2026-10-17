import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
        <div className="heading-aside">
          <span className="eyebrow muted">DISCOVER / CURADORIA</span>
          <Link className="text-link" href="/discover">
            Explorar descobertas <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </SectionHeading>
      <div className="discover-grid">
        {[games[3], games[2]].map((game) => (
          <article
            className="discover-card interactive-card"
            key={game.id}
            data-reveal
          >
            <div className="discover-image">
              <Image
                src={game.image}
                alt={`Arte promocional de ${game.title}`}
                width={900}
                height={560}
              />
            </div>
            <div className="discover-content">
              <span className="eyebrow lime">{game.kicker}</span>
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