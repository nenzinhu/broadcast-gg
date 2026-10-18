"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { catalogMovements } from "@/lib/catalog-services";
import { franchiseGuides } from "@/lib/franchise-guides";
import { returningGames } from "@/lib/returning-games";

const metrics = [
  {
    value: catalogMovements.length,
    label: "movimentos de catálogo",
    detail: "Game Pass, PS Plus e EA Play",
  },
  {
    value: returningGames.length,
    label: "jogos para revisitar",
    detail: "O que mudou desde a última partida",
  },
  {
    value: franchiseGuides.length,
    label: "guias de franquia",
    detail: "Comece pela entrada certa",
  },
];

export function IntelligenceSummary() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".intelligence-scanner span",
          { xPercent: -900 },
          { xPercent: 4400, duration: 4.6, repeat: -1, ease: "none" },
        );
        gsap.from(".intelligence-metric", {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="intelligence-summary" aria-label="Resumo da Central">
      <div className="intelligence-scanner" aria-hidden="true">
        <span />
      </div>
      <div className="intelligence-summary-copy">
        <span className="intelligence-live">
          <i aria-hidden="true" /> CENTRAL ONLINE
        </span>
        <p>
          Três leituras rápidas para decidir <strong>onde jogar</strong>, quando
          voltar e por onde começar.
        </p>
      </div>
      <div className="intelligence-metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="intelligence-metric">
            <strong>{String(metric.value).padStart(2, "0")}</strong>
            <div>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
