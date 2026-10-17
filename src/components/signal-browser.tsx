"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { games, signals, type Signal } from "@/lib/catalog";
import { querySignals } from "@/lib/catalog-query";
import { SignalCard } from "./signal-card";
import { EmptyState } from "./empty-state";
export const signalFilters = [
  { value: "all", label: "Todos os sinais" },
  { value: "price", label: "Preço" },
  { value: "update", label: "Atualizações" },
  { value: "trend", label: "Tendências" },
] as const;
export function SignalBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | Signal["type"]>("all");
  const result = querySignals(signals, games, { query, type });
  return (
    <section className="exploration">
      <div className="exploration-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Buscar jogo</span>
          <input
            type="search"
            placeholder="Encontre um sinal pelo jogo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-group" aria-label="Filtrar sinais">
          {signalFilters.map((filter) => (
            <button
              key={filter.value}
              aria-pressed={type === filter.value}
              className={type === filter.value ? "active" : ""}
              onClick={() => setType(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="results-summary">
        <span>{String(result.length).padStart(2, "0")} SINAIS ENCONTRADOS</span>
        <span>SIGNAL DETECTED / DEMONSTRAÇÃO</span>
      </div>
      <div className="signal-grid" aria-live="polite">
        {result.map((signal) => (
          <SignalCard signal={signal} key={signal.id} />
        ))}
      </div>
      {!result.length && (
        <EmptyState
          kind="sinal"
          onReset={() => {
            setQuery("");
            setType("all");
          }}
        />
      )}
      <p className="section-footnote">
        Sinais e horários ilustrativos. Sem atualização em tempo real.
      </p>
    </section>
  );
}
