"use client";

import type { CSSProperties } from "react";
import { GameArtwork } from "./game-artwork";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { games, type Signal } from "@/lib/catalog";
import { TrackButton } from "./track-button";

export function SignalCard({ signal }: { signal: Signal }) {
  const game = games.find((game) => game.id === signal.gameId);
  if (!game) return null;

  const cardRef = useRef<HTMLElement>(null);
  const [dismissed, setDismissed] = useState(false);

  // Drag-to-dismiss via GSAP Draggable
  useGSAP(() => {
    if (!cardRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const el = cardRef.current;
    const draggable = Draggable.create(el, {
      type: "x",
      restrictX: true,
      lockAxis: true,
      throwProps: true,
      onDrag: function () {
        const progress = Math.abs(this.x) / (el.offsetWidth / 2);
        gsap.set(el, { opacity: 1 - progress * 0.5, scale: 1 - progress * 0.1 });
      },
      onThrowUpdate: function () {
        const progress = Math.abs(this.x) / (el.offsetWidth / 2);
        gsap.set(el, { opacity: 1 - progress * 0.5, scale: 1 - progress * 0.1 });
      },
      onDragEnd: function () {
        if (Math.abs(this.x) > el.offsetWidth * 0.4) {
          const direction = this.x > 0 ? 1 : -1;
          gsap.to(el, {
            x: direction * window.innerWidth * 2,
            rotation: direction * 15,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setDismissed(true);
              el.dispatchEvent(
                new CustomEvent("signdismissed", {
                  detail: { signalId: signal.id },
                }),
              );
            },
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "bouncyOut",
          });
        }
      },
    });

    return () => draggable.forEach((d) => d.kill());
  }, []);

  if (dismissed) return null;

  return (
    <article
      ref={cardRef}
      className="signal-card interactive-card relative"
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
      <div className="drag-hint" aria-hidden="true">
        <span>Arraste para arquivar</span>
      </div>
    </article>
  );
}
