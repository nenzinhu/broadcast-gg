import { useRef } from "react";
import type { PreviewGame } from "@/lib/previews";

type PreviewGameListProps = {
  games: PreviewGame[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
};

const statusLabels = {
  confirmed: "Confirmado",
  undated: "Sem data",
  "strong-rumor": "Rumor forte",
  "unconfirmed-rumor": "Rumor não confirmado",
} as const;

export function PreviewGameList({
  games,
  selectedSlug,
  onSelect,
}: PreviewGameListProps) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % games.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + games.length) % games.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = games.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(games[index].slug);
      return;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div className="preview-game-list" role="listbox" aria-label="Jogos em preview">
      {games.map((game, index) => (
        <button
          key={game.slug}
          type="button"
          role="option"
          aria-selected={game.slug === selectedSlug}
          data-testid="preview-game-option"
          onClick={() => onSelect(game.slug)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(element) => {
            optionRefs.current[index] = element;
          }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{game.title}</strong>
          <small>{game.platforms.join(" · ")}</small>
          <em>
            {statusLabels[game.informationStatus]} · HYPE {game.hype.score}
          </em>
        </button>
      ))}
    </div>
  );
}
