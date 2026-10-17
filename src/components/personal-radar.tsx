"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { games } from "@/lib/catalog";
import { useRadar } from "./radar-provider";
import { RadarList } from "./radar-list";
import { SectionHeading } from "./section-heading";

export function PersonalRadar() {
  const { trackedIds } = useRadar();
  const tracked = games.filter((game) => trackedIds.includes(game.id));
  return (
    <section id="radar" className="section personal-radar">
      <SectionHeading
        number="03"
        eyebrow="PERSONAL TRACKING"
        title="Seu gosto. Seu radar."
      >
        <div className="heading-aside">
          <span className="radar-count">
            {String(tracked.length).padStart(2, "0")} JOGOS EM TRACKING
          </span>
          <Link className="text-link" href="/radar">
            Abrir meu radar <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </SectionHeading>
      <p className="section-description">
        Acompanhe os jogos que você quer jogar. A próxima boa decisão começa na
        sua lista.
      </p>
      <RadarList />
      <p className="section-footnote">
        Lista salva neste navegador. Sem alertas automáticos ou sincronização
        entre dispositivos.
      </p>
    </section>
  );
}