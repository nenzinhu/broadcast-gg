"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { signals, type Signal } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";
import { SignalCard } from "./signal-card";
import { signalFilters } from "./signal-browser";
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
        <Link className="text-link" href="/signals">
          Todos os sinais <ArrowUpRight size={18} />
        </Link>
      </SectionHeading>
      <div className="signals-toolbar">
        <div className="filter-group" aria-label="Filtrar sinais">
          {signalFilters.map((item) => (
            <button
              key={item.value}
              aria-pressed={filter === item.value}
              className={filter === item.value ? "active" : ""}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="live-label">
          <span className="status-dot" /> SIGNAL LIVE
        </span>
      </div>
      <div className="signal-grid" aria-live="polite" data-reveal>
        {visible.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
      <p className="section-footnote">
        Sinais e horários ilustrativos. Seu próximo achado pode começar por
        aqui.
      </p>
    </section>
  );
}
