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
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{game.title}</strong>
          <small>{game.platforms.join(" · ")}</small>
          <em>{statusLabels[game.informationStatus]}</em>
        </button>
      ))}
    </div>
  );
}
