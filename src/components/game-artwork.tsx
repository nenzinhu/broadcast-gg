"use client";
import Image from "next/image";
import { useState } from "react";
import type { Game } from "@/lib/catalog";
export function GameArtwork({
  game,
  hero = false,
  priority = false,
}: {
  game: Game;
  hero?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <Image
        className="game-artwork"
        src={failed ? game.fallbackImage : hero ? game.heroImage : game.image}
        alt={
          failed
            ? `Arte conceitual alternativa para ${game.title}`
            : `Imagem oficial de ${game.title}, via Steam`
        }
        width={900}
        height={560}
        priority={priority}
        unoptimized
        onError={() => setFailed(true)}
      />
      {failed && (
        <span className="art-fallback-note">
          ARTE ALTERNATIVA · MÍDIA INDISPONÍVEL
        </span>
      )}
    </>
  );
}
