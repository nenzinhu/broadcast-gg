"use client";

import { useEffect, useMemo, useState } from "react";
import {
  filterPreviewGames,
  type PreviewFilters,
  type PreviewGame,
} from "@/lib/previews";
import { PreviewFiltersBar } from "@/components/preview-filters";
import { PreviewGameList } from "@/components/preview-game-list";
import { PreviewPanel } from "@/components/preview-panel";

const emptyFilters: PreviewFilters = {
  query: "",
  platform: "",
  genre: "",
  status: "all",
};

type PreviewBrowserProps = {
  games: PreviewGame[];
  initialSlug: string;
  normalizeInitialQuery: boolean;
};

export function PreviewBrowser({
  games,
  initialSlug,
  normalizeInitialQuery,
}: PreviewBrowserProps) {
  const [filters, setFilters] = useState<PreviewFilters>(emptyFilters);
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const filteredGames = useMemo(
    () => filterPreviewGames(games, filters),
    [filters, games],
  );
  const selected =
    games.find((game) => game.slug === selectedSlug) ?? games[0];

  function replaceGameQuery(slug: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("jogo", slug);
    window.history.replaceState(window.history.state, "", url);
  }

  useEffect(() => {
    if (normalizeInitialQuery) replaceGameQuery(initialSlug);
  }, [initialSlug, normalizeInitialQuery]);

  function selectGame(slug: string) {
    setSelectedSlug(slug);
    replaceGameQuery(slug);
  }

  function changeFilters(nextFilters: PreviewFilters) {
    const nextGames = filterPreviewGames(games, nextFilters);
    setFilters(nextFilters);
    if (nextGames.length > 0 && !nextGames.some((game) => game.slug === selectedSlug)) {
      selectGame(nextGames[0].slug);
    }
  }

  return (
    <section className="preview-browser" data-testid="preview-browser">
      <PreviewFiltersBar
        filters={filters}
        games={games}
        resultCount={filteredGames.length}
        onChange={changeFilters}
        onClear={() => changeFilters(emptyFilters)}
      />
      {filteredGames.length === 0 ? (
        <div className="preview-empty" role="status">
          <strong>Nenhum jogo encontrado.</strong>
          <p>Tente outra busca ou volte para todos os sinais.</p>
          <button type="button" onClick={() => changeFilters(emptyFilters)}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <PreviewGameList
            games={filteredGames}
            selectedSlug={selectedSlug}
            onSelect={selectGame}
          />
          <PreviewPanel game={selected} />
        </>
      )}
    </section>
  );
}
