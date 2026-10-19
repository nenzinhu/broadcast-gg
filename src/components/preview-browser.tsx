"use client";

import type { PreviewGame } from "@/lib/previews";

export function PreviewBrowser({ games }: { games: PreviewGame[] }) {
  const selected = games[0];

  return (
    <section className="preview-browser" data-testid="preview-browser">
      <div className="preview-game-list" role="listbox" aria-label="Jogos em preview">
        {games.map((game, index) => (
          <button
            key={game.slug}
            type="button"
            role="option"
            aria-selected={index === 0}
            data-testid="preview-game-option"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{game.title}</strong>
          </button>
        ))}
      </div>
      <article className="preview-panel" aria-label={`Preview de ${selected.title}`}>
        <span>PREVIEW SIGNAL</span>
        <h2>{selected.title}</h2>
        <p>{selected.summary}</p>
      </article>
    </section>
  );
}
