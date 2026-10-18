"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Check, FastForward, MapPinned } from "lucide-react";
import { TrackButton } from "@/components/track-button";
import { getGameById } from "@/lib/catalog";
import { franchiseGuides, type FranchiseGuide } from "@/lib/franchise-guides";

export function PlayOrder() {
  const [activeId, setActiveId] = useState<FranchiseGuide["id"]>("resident-evil");
  const scope = useRef<HTMLDivElement>(null);
  const guide = franchiseGuides.find((item) => item.id === activeId) ?? franchiseGuides[0];

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline();
        timeline.fromTo(
          ".order-timeline-line",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: "power2.out", transformOrigin: "top" },
        );
        timeline.fromTo(
          "[data-order-entry]",
          { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" },
          "<0.12",
        );
        return () => timeline.kill();
      });
      return () => media.revert();
    },
    { scope, dependencies: [activeId], revertOnUpdate: true },
  );

  return (
    <div className="play-order" data-testid="play-order" ref={scope}>
      <div className="franchise-selector" aria-label="Escolha uma franquia">
        {franchiseGuides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeId ? "is-active" : ""}
            aria-pressed={item.id === activeId}
            aria-label={item.name}
            onClick={() => setActiveId(item.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="play-order-header">
        <div>
          <span className="play-order-kicker"><MapPinned aria-hidden="true" /> ROTA RECOMENDADA</span>
          <h3>{guide.name}</h3>
        </div>
        <p>{guide.continuity}</p>
      </div>

      <div className="order-timeline-shell">
        <span className="order-timeline-line" aria-hidden="true" />
        <ol className="order-timeline">
          {guide.entries.map((entry, index) => {
          const start = entry.id === guide.startEntryId;
          const game = entry.gameId ? getGameById(entry.gameId) : undefined;
          return (
            <li
              key={entry.id}
              className={start ? "order-entry is-start" : "order-entry"}
              data-order-entry
              data-testid="order-entry"
            >
              <div className="order-node" aria-hidden="true">
                {start ? <Check /> : String(index + 1).padStart(2, "0")}
              </div>
              <article>
                <div className="order-entry-topline">
                  <div>
                    <span className={`order-class is-${entry.classification}`}>
                      {entry.classification === "essencial" ? "ESSENCIAL" : "OPCIONAL"}
                    </span>
                    {start && <strong>COMECE AQUI</strong>}
                  </div>
                  {game && <TrackButton id={game.id} title={game.title} compact />}
                </div>
                <h4>
                  {game ? (
                    <Link href={`/games/${game.slug}`}>
                      {entry.title} <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  ) : (
                    entry.title
                  )}
                </h4>
                <p>{entry.note}</p>
              </article>
            </li>
          );
          })}
        </ol>
      </div>

      <div className="order-legend">
        <span><Check aria-hidden="true" /> Essencial para acompanhar esta rota</span>
        <span><FastForward aria-hidden="true" /> Opcional para quem quer ir direto ao ponto</span>
      </div>
      <p className="editorial-disclaimer">
        CURADORIA DEMONSTRATIVA · disponibilidade, datas e conteúdo podem mudar.
      </p>
    </div>
  );
}
