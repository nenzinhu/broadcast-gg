import { ArrowUpRight, BadgeCheck, CalendarDays, Gamepad2, Radio } from "lucide-react";
import type { PreviewGame } from "@/lib/previews";

const statusLabels = {
  confirmed: "CONFIRMADO",
  undated: "PROJETO CONFIRMADO · SEM DATA",
  "strong-rumor": "RUMOR FORTE",
  "unconfirmed-rumor": "RUMOR NÃO CONFIRMADO",
} as const;

const confidenceLabels = {
  alto: "ALTA",
  medio: "MÉDIA",
  baixo: "BAIXA",
} as const;

export function PreviewPanel({ game }: { game: PreviewGame }) {
  const sourceById = new Map(game.sources.map((source) => [source.id, source]));

  return (
    <article className="preview-panel" aria-label={`Preview de ${game.title}`}>
      <header className="preview-panel-header">
        <span
          className={`preview-information-status is-${game.informationStatus}`}
        >
          <Radio size={14} aria-hidden="true" />
          {statusLabels[game.informationStatus]}
        </span>
        <p className="preview-release-window">
          <CalendarDays size={15} aria-hidden="true" />
          {game.releaseWindow}
        </p>
        <h2>{game.title}</h2>
        <p className="preview-summary">{game.summary}</p>
        <div className="preview-platforms" aria-label="Plataformas">
          <Gamepad2 size={16} aria-hidden="true" />
          {game.platforms.map((platform) => (
            <span key={platform}>{platform}</span>
          ))}
        </div>
      </header>

      <section className="preview-why">
        <span>POR QUE IMPORTA</span>
        <p>{game.whyItMatters}</p>
      </section>

      <div className="preview-editorial-grid">
        <section className="preview-facts" aria-labelledby={`${game.slug}-facts`}>
          <span className="preview-section-kicker">OFFICIAL INTEL</span>
          <h3 id={`${game.slug}-facts`}>O que está confirmado</h3>
          {game.officialFacts.length > 0 ? (
            <ul>
              {game.officialFacts.map((fact) => (
                <li key={`${fact.sourceId}-${fact.text}`}>
                  <BadgeCheck aria-hidden="true" />
                  <div>
                    <p>{fact.text}</p>
                    <small>{sourceById.get(fact.sourceId)?.label}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum fato novo além da existência da série foi confirmado.</p>
          )}
        </section>

        <section className="preview-rumors" aria-labelledby={`${game.slug}-rumors`}>
          <span className="preview-section-kicker">RUMOR WATCH</span>
          <h3 id={`${game.slug}-rumors`}>O que ainda é rumor</h3>
          {game.rumors.length > 0 ? (
            <ul>
              {game.rumors.map((rumor) => (
                <li key={`${rumor.sourceId}-${rumor.text}`}>
                  <strong>CONFIANÇA {confidenceLabels[rumor.confidence]}</strong>
                  <p>{rumor.text}</p>
                  <small>{sourceById.get(rumor.sourceId)?.label}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum rumor com evidência suficiente no radar.</p>
          )}
        </section>
      </div>

      <footer className="preview-sources">
        <div>
          <span className="preview-section-kicker">FONTES VERIFICADAS</span>
          <p>Última revisão editorial: {game.sources[0]?.checkedAt}</p>
        </div>
        <ul>
          {game.sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
