import type { PreviewFilters, PreviewGame } from "@/lib/previews";

type PreviewFiltersBarProps = {
  filters: PreviewFilters;
  games: PreviewGame[];
  resultCount: number;
  onChange: (filters: PreviewFilters) => void;
  onClear: () => void;
};

export function PreviewFiltersBar({
  filters,
  games,
  resultCount,
  onChange,
  onClear,
}: PreviewFiltersBarProps) {
  const platforms = [...new Set(games.flatMap((game) => game.platforms))].sort();
  const genres = [...new Set(games.flatMap((game) => game.genre))].sort();

  return (
    <div className="preview-filters" aria-label="Filtros do Preview">
      <label className="preview-search">
        <span>Buscar jogo</span>
        <input
          type="search"
          value={filters.query}
          placeholder="Nome, gênero ou plataforma"
          onChange={(event) =>
            onChange({ ...filters, query: event.currentTarget.value })
          }
        />
      </label>
      <label>
        <span>Plataforma</span>
        <select
          value={filters.platform}
          onChange={(event) =>
            onChange({ ...filters, platform: event.currentTarget.value })
          }
        >
          <option value="">Todas</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Gênero</span>
        <select
          value={filters.genre}
          onChange={(event) =>
            onChange({ ...filters, genre: event.currentTarget.value })
          }
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Situação</span>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.currentTarget.value as PreviewFilters["status"],
            })
          }
        >
          <option value="all">Todas</option>
          <option value="confirmed">Confirmado</option>
          <option value="undated">Sem data</option>
          <option value="strong-rumor">Rumor forte</option>
          <option value="unconfirmed-rumor">Rumor não confirmado</option>
        </select>
      </label>
      <div className="preview-filter-summary">
        <span>{resultCount} jogos no radar</span>
        {resultCount > 0 && (
          <button type="button" onClick={onClear}>
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
