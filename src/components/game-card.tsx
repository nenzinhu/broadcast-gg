"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Play, Maximize } from "lucide-react";
import { GameArtwork } from "./game-artwork";
import { discount, formatPrice, type Game } from "@/lib/catalog";
import { TrackButton } from "./track-button";

interface GameCardProps {
  game: Game;
  variant?: "default" | "featured";
}

export function GameCard({ game, variant = "default" }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleVideo = useCallback(() => setVideoOpen((v) => !v), []);

  return (
    <article
      ref={cardRef}
      data-card-reveal
      className={`deal-card interactive-card group relative overflow-hidden ${
        videoOpen ? "z-video" : ""
      }`}
      style={{ "--game-accent": game.color } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="deal-art relative">
        <GameArtwork game={game} reveal={variant !== "featured"} />
        <span className="discount">−{discount(game)}%</span>

        {/* Overlay de vídeo quando houver trailer */}
        {game.youtubeId && (
          <>
            <button
              type="button"
              onClick={handleVideo}
              className={`video-trigger absolute inset-0 ${
                hovered || videoOpen ? "opacity-100" : "opacity-0 transition-opacity duration-300"
              }`}
              aria-label="Assistir trailer de {game.title}"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`relative z-10 p-3 rounded-full bg-black/80 text-white ${
                    hovered || videoOpen
                      ? "scale-110 ring-2 ring-white/50"
                      : "scale-100"
                  } transition-transform duration-300`}
                >
                  <Play size={28} strokeWidth={2.5} />
                </div>
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-mono text-white/80 uppercase tracking-wider"
                >
                  ASSISTIR TRAILER
                </div>
              </div>
            </button>

            {/* Modal simples do vídeo */}
            {videoOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-label="Trailer de {game.title}"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setVideoOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setVideoOpen(false);
                }}
              >
                <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <button
                    type="button"
                    onClick={() => setVideoOpen(false)}
                    className="absolute top-2 right-2 z-10 text-white/60 hover:text-white"
                    aria-label="Fechar trailer"
                  >
                    <Maximize size={20} strokeWidth={2} />
                  </button>
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${game.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                    title={`Trailer de ${game.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-4 text-center text-muted text-sm font-mono uppercase tracking-wider">
                  {game.title} — Trailer oficial
                </p>
              </div>
            )}
          </>
        )}

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
