import type { CSSProperties } from "react";
import { GameArtwork } from "./game-artwork";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Game } from "@/lib/catalog";
export function FeaturedGame({ game }: { game: Game }) {
  return (
    <article
      className="featured-game"
      style={{ "--game-accent": game.color } as CSSProperties}
      data-reveal
    >
      <GameArtwork game={game} hero />
      <div className="featured-content">
        <span className="eyebrow">
          <span className="status-dot lime" /> THE BROADCAST PICK / 001
        </span>
        <h2>
          SE PERDER TAMBÉM
          <br />É UM BOM COMEÇO.
        </h2>
        <p>
          {game.title}. Um horizonte que não cabe no mapa. E uma aventura que só
          pode ser sua.
        </p>
        <Link className="text-link" href={`/games/${game.slug}`}>
          Descubra esse universo <ArrowUpRight size={18} />
        </Link>
        <Link className="featured-trailer" href={`/games/${game.slug}#media`}>
          <Play size={15} fill="currentColor" /> Assistir trailer
        </Link>
      </div>
      <span className="featured-stamp">
        CURADORIA ORIGINAL <span className="lime">↗</span>
      </span>
    </article>
  );
}
