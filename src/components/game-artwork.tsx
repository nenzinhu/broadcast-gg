"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Game } from "@/lib/catalog";

gsap.registerPlugin(ScrollTrigger);

export function GameArtwork({
  game,
  hero = false,
  priority = false,
  reveal = true,
}: {
  game: Game;
  hero?: boolean;
  priority?: boolean;
  reveal?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger reveal: imagem entra com fade + scale ao entrar na viewport.
  useGSAP(
    () => {
      if (!reveal || !wrapRef.current) return undefined;
      gsap.set(wrapRef.current, { opacity: 0, y: 30, scale: 0.95 });
      const tween = gsap.to(wrapRef.current, {
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 88%",
          end: "bottom 60%",
          toggleActions: "play none none reset",
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
      return () => tween.kill();
    },
    [reveal]
  );

  return (
    <div
      ref={wrapRef}
      className={`game-art-wrap relative overflow-hidden rounded-md ${
        failed ? "bg-surface-2" : ""
      }`}
    >
      <Image
        ref={imgRef}
        className="game-artwork block w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
        loading={priority ? "eager" : "lazy"}
      />
      {failed && (
        <span className="art-fallback-note">
          ARTE ALTERNATIVA · MÍDIA INDISPONÍVEL
        </span>
      )}
    </div>
  );
}
