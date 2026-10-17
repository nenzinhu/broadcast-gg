"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { games } from "@/lib/catalog";
import { queryGames, type GameSort } from "@/lib/catalog-query";
import { GameCard } from "./game-card";
import { EmptyState } from "./empty-state";
export function CatalogBrowser({ mode }: { mode: "deals" | "discover" }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState<GameSort>("featured");
  const result = queryGames(games, { query, genre, sort });
  const genres = [...new Set(games.flatMap((game) => game.genres))];
  return (
    <section className="exploration">
      <div className="exploration-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Buscar jogo</span>
          <input
            type="search"
            placeholder="Qual universo você procura?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="filter-select">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>{mode === "deals" ? "Ordenar por" : "Gênero"}</span>
          {mode === "deals" ? (
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as GameSort)}
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor preço</option>
              <option value="discount-desc">Maior desconto</option>
            </select>
          ) : (
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="">Todos os gêneros</option>
              {genres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          )}
        </label>
      </div>
      <div className="results-summary">
        <span>{String(result.length).padStart(2, "0")} JOGOS NO RADAR</span>
        <span>CURADORIA BROADCAST / DADOS DEMONSTRATIVOS</span>
      </div>
      <div className="catalog-grid" aria-live="polite">
        {result.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {result.length === 0 && (
        <EmptyState
          kind="jogo"
          onReset={() => {
            setQuery("");
            setGenre("");
            setSort("featured");
          }}
        />
      )}
      <p className="section-footnote">
        Preços, descontos e avaliações ilustrativos. Sem atualização em tempo
        real.
      </p>
    </section>
  );
}
