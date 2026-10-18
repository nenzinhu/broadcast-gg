import type { CSSProperties } from "react";
import Link from "next/link";
import { GameArtwork } from "./game-artwork";
import { discount, formatPrice, type Game } from "@/lib/catalog";
import { TrackButton } from "./track-button";
export function GameCard({ game }: { game: Game }) {
  return (
    <article
      className="deal-card interactive-card"
      style={{ "--game-accent": game.color } as CSSProperties}
    >
      <div className="deal-art">
        <GameArtwork game={game} />
        <span className="discount">−{discount(game)}%</span>
        <TrackButton id={game.id} title={game.title} compact />
      </div>
      <div className="deal-content">
        <span className="eyebrow">{game.genre}</span>
        <h3>
          <Link href={`/games/${game.slug}`}>{game.title}</Link>
        </h3>
        <div className="price-line">
          <div>
            <del>{formatPrice(game.originalPrice)}</del>
            <strong>{formatPrice(game.price)}</strong>
          </div>
          <span className="platform">PC</span>
        </div>
        <div
          className={`price-status ${game.price <= game.historicalLow ? "lime" : ""}`}
        >
          <span className="status-dot" />
          {game.price <= game.historicalLow
            ? "MENOR PREÇO DO CENÁRIO"
            : "NO RADAR DE PREÇOS"}
        </div>
      </div>
    </article>
  );
}
