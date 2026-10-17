import type { CSSProperties } from "react";
import { GameArtwork } from "./game-artwork";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { games, type Signal } from "@/lib/catalog";
import { TrackButton } from "./track-button";
export function SignalCard({ signal }: { signal: Signal }) {
  const game = games.find((game) => game.id === signal.gameId);
  if (!game) return null;
  return (
    <article
      className="signal-card interactive-card"
      style={{ "--game-accent": game.color } as CSSProperties}
    >
      <div className="signal-art">
        <GameArtwork game={game} />
        <span className={`signal-type ${signal.type}`}>
          <span className="status-dot" />
          {signal.type.toUpperCase()} SIGNAL
        </span>
        <TrackButton id={game.id} title={game.title} compact />
      </div>
      <div className="signal-content">
        <div className="card-meta">
          <span>{game.title}</span>
          <span>{signal.time}</span>
        </div>
        <h3>{signal.title}</h3>
        <p>{signal.description}</p>
        <Link href={`/games/${game.slug}`}>
          Explorar o jogo
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
