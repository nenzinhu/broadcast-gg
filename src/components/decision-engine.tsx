"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Cpu, Crosshair } from "lucide-react";
import { games, formatPrice } from "@/lib/catalog";
import { getDecision } from "@/lib/decision";
import { TrackButton } from "./track-button";
export function DecisionEngine() {
  const [id, setId] = useState(games[0].id);
  const game = games.find((game) => game.id === id)!;
  const decision = getDecision(game);
  return (
    <section id="decision" className="decision-section" data-reveal>
      <div className="decision-intro">
        <div className="eyebrow">
          <Cpu size={15} aria-hidden="true" /> DECISION ENGINE
        </div>
        <h2>
          Vale a pena
          <br />
          comprar <em>agora?</em>
        </h2>
        <p>
          O hype passa. Uma boa decisão fica.
          <br />
          Preço, avaliação e contexto no mesmo lugar.
        </p>
        <label htmlFor="game-select">ESCOLHA SEU PRÓXIMO JOGO</label>
        <div className="select-wrap">
          <Crosshair size={18} aria-hidden="true" />
          <select
            id="game-select"
            value={id}
            onChange={(event) => setId(event.target.value)}
          >
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
        <span className="decision-disclaimer">
          ANÁLISE DEMONSTRATIVA · SEM DADOS AO VIVO
        </span>
      </div>
      <div className="decision-result" aria-live="polite">
        <div className="decision-result-top">
          <span className="eyebrow">VEREDITO DO RADAR</span>
          <span className="analysis-id">BGG / 00{games.indexOf(game) + 1}</span>
        </div>
        <div className={`verdict verdict-${decision.verdict.toLowerCase()}`}>
          <strong>{decision.verdict}</strong>
          <ArrowUpRight aria-hidden="true" />
        </div>
        <h3>
          {decision.verdict === "BUY"
            ? "O sinal está verde."
            : decision.verdict === "WAIT"
              ? "O melhor momento ainda vem."
              : "Seu tempo merece mais."}
        </h3>
        <p>{decision.reason}</p>
        <div className="decision-metrics">
          <div>
            <span>PREÇO NO CENÁRIO</span>
            <strong>{formatPrice(game.price)}</strong>
          </div>
          <div>
            <span>AVALIAÇÃO EXEMPLO</span>
            <strong>
              {game.score}
              <small>/100</small>
            </strong>
          </div>
        </div>
        <div className="decision-result-bottom">
          <span>
            <Check size={14} aria-hidden="true" /> Critérios transparentes
          </span>
          <TrackButton id={game.id} title={game.title} />
        </div>
      </div>
    </section>
  );
}
