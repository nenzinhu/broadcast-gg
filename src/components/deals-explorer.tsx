"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { games } from "@/lib/catalog";
import {
  searchGames,
  sortGames,
  type SortKey,
} from "@/lib/catalog-query";
import { GameCard } from "./game-card";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Destaques" },
  { value: "price", label: "Menor preço" },
  { value: "discount", label: "Maior desconto" },
  { value: "score", label: "Melhor avaliação" },
];

export function DealsExplorer() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const results = sortGames(searchGames(games, query), sort);
  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <label className="search-field">
          <Search size={14} aria-hidden="true" />
          <span className="sr-only">Buscar jogo no catálogo</span>
          <input
            type="search"
            value={query}
            placeholder="Buscar por título, gênero ou descrição"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="toolbar-select">
          <span className="sr-only">Ordenar catálogo</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count" role="status">
        {String(results.length).padStart(2, "0")} JOGOS ENCONTRADOS ·
        DEMONSTRAÇÃO
      </p>
      {results.length ? (
        <div className="deals-grid">
          {results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          Nenhum jogo encontrado para esta combinação de busca e ordenação.{" "}
          <Link className="text-link" href="/discover">
            Ver a seleção editorial <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </p>
      )}
      <p className="section-footnote">
        Preços, descontos e avaliações em BRL são demonstrativos. Não há lojas
        vinculadas nem consulta a cotações.
      </p>
    </div>
  );
}