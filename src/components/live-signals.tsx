"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { games, signals, type Signal } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";
import { TrackButton } from "./track-button";
const filters = [
  { value: "all", label: "Todos os sinais" },
  { value: "price", label: "Preço" },
  { value: "update", label: "Updates" },
  { value: "trend", label: "Tendências" },
] as const;
export function LiveSignals() {
  const [filter, setFilter] = useState<"all" | Signal["type"]>("all");
  const visible = signals.filter(
    (signal) => filter === "all" || signal.type === filter,
  );
  return (
    <section className="section" id="signals">
      <SectionHeading
        number="01"
        eyebrow="FIQUE UM PASSO À FRENTE"
        title="O jogo muda. A gente sinaliza."
      >
        <span className="live-label">
          <span className="status-dot" /> LIVE SIGNALS
        </span>
      </SectionHeading>
      <div className="signals-toolbar">
        <div className="filter-group" aria-label="Filtrar sinais">
          {filters.map((item) => (
            <button
              key={item.value}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
              className={filter === item.value ? "active" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="toolbar-note">
          <SlidersHorizontal size={13} aria-hidden="true" /> SÓ O QUE IMPORTA
        </span>
      </div>
      <div className="signal-grid" aria-live="polite" data-reveal>
        {visible.map((signal) => {
          const game = games.find((g) => g.id === signal.gameId)!;
          return (
            <article key={signal.id} className="signal-card interactive-card">
              <div className="signal-art">
                <Image
                  src={game.image}
                  alt={`Arte conceitual para ${game.title}`}
                  width={900}
                  height={560}
                />
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
                <a href={signal.type === "price" ? "#deals" : "#discover"}>
                  Explorar {signal.type === "price" ? "preços" : "jogos"}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
        {visible.length === 0 && (
          <p className="empty-state">
            Nenhum sinal nesta categoria. Explore os outros filtros.
          </p>
        )}
      </div>
      <p className="section-footnote">
        Sinais e horários ilustrativos. Seu próximo achado pode começar por
        aqui.
      </p>
    </section>
  );
}
