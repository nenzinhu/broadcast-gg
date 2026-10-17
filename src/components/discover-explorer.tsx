"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { games } from "@/lib/catalog";
import { filterByGenre, genreOptions } from "@/lib/catalog-query";

const options = [{ value: "all", label: "Todos" }, ...genreOptions(games).map((genre) => ({ value: genre, label: genre }))];

export function DiscoverExplorer() {
  const [genre, setGenre] = useState("all");
  const visible = filterByGenre(games, genre);
  return (
    <div className="explorer">
      <div className="signals-toolbar">
        <div
          className="filter-group"
          role="group"
          aria-label="Filtrar por gênero"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={genre === option.value}
              className={genre === option.value ? "active" : ""}
              onClick={() => setGenre(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <span className="toolbar-note">
          CURADORIA EDITORIAL · {String(visible.length).padStart(2, "0")} JOGOS
        </span>
      </div>
      <div className="discover-grid" aria-live="polite">
        {visible.map((game) => (
          <article
            className="discover-card interactive-card"
            key={game.id}
            data-reveal
          >
            <div className="discover-image">
              <Image
                src={game.image}
                alt={`Arte promocional de ${game.title}`}
                width={900}
                height={560}
              />
            </div>
            <div className="discover-content">
              <span className="eyebrow lime">{game.kicker}</span>
              <h3>
                <Link href={`/games/${game.slug}`}>{game.title}</Link>
              </h3>
              <p>{game.description}</p>
              <Link className="discover-link" href={`/games/${game.slug}`}>
                <span>Ver página do jogo</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="empty-state">
          Nenhum jogo neste gênero.{" "}
          <Link className="text-link" href="/deals">
            Ver o catálogo completo <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </p>
      )}
    </div>
  );
}