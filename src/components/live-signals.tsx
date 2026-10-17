"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { signals, type Signal } from "@/lib/catalog";
import { filterSignals, gameOfSignal } from "@/lib/catalog-query";
import { SectionHeading } from "./section-heading";
import { TrackButton } from "./track-button";

const filters = [
  { value: "all", label: "Todos os sinais" },
  { value: "price", label: "Preço" },
  { value: "update", label: "Updates" },
  { value: "trend", label: "Tendências" },
] as const;

export function LiveSignals({ withSearch = false }: { withSearch?: boolean }) {
  const [filter, setFilter] = useState<"all" | Signal["type"]>("all");
  const [query, setQuery] = useState("");
  const visible = filterSignals(signals, { type: filter, query });
  const filtered = filter !== "all" || query.trim() !== "";
  return (
    <section className="section" id="signals">
      {withSearch ? (
        <h2 className="sr-only">Feed completo de sinais</h2>
      ) : (
        <SectionHeading
          number="01"
          eyebrow="FIQUE UM PASSO À FRENTE"
          title="O jogo muda. A gente sinaliza."
        >
          <div className="heading-aside">
            <span className="live-label">
              <span className="status-dot" /> LIVE SIGNALS
            </span>
            <Link className="text-link" href="/signals">
              Ver todos os sinais{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </SectionHeading>
      )}
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
        <div className="toolbar-right">
          {withSearch ? (
            <label className="search-field">
              <Search size={14} aria-hidden="true" />
              <span className="sr-only">Buscar sinal por jogo</span>
              <input
                type="search"
                value={query}
                placeholder="Buscar por jogo"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          ) : (
            <span className="toolbar-note">
              <SlidersHorizontal size={13} aria-hidden="true" /> SÓ O QUE
              IMPORTA
            </span>
          )}
        </div>
      </div>
      <div className="signal-grid" aria-live="polite" data-reveal>
        {visible.map((signal) => {
          const game = gameOfSignal(signal)!;
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
                <Link
                  href={
                    signal.type === "price"
                      ? "/deals"
                      : `/games/${game.slug}`
                  }
                >
                  {signal.type === "price"
                    ? "Explorar preços"
                    : `Conhecer ${game.title}`}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
        {visible.length === 0 && (
          <p className="empty-state">
            {filtered
              ? "Nenhum sinal corresponde a este filtro. Ajuste a busca ou explore os outros tipos."
              : "Nenhum sinal nesta categoria. Explore os outros filtros."}{" "}
            <Link className="text-link" href="/deals">
              Ver o catálogo de jogos <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
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