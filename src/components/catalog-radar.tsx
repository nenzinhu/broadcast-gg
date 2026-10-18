"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, Layers3 } from "lucide-react";
import { GameArtwork } from "@/components/game-artwork";
import { TrackButton } from "@/components/track-button";
import { getGameById } from "@/lib/catalog";
import {
  catalogMovements,
  filterCatalogMovements,
  type CatalogMovement,
  type CatalogService,
  type CatalogStatus,
} from "@/lib/catalog-services";

const services: Array<{ id: "all" | CatalogService; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "game-pass", label: "Game Pass" },
  { id: "playstation-plus", label: "PlayStation Plus" },
  { id: "ea-play", label: "EA Play" },
];

const serviceLabels: Record<CatalogService, string> = {
  "game-pass": "GAME PASS",
  "playstation-plus": "PLAYSTATION PLUS",
  "ea-play": "EA PLAY",
};

const statusLabels: Record<CatalogStatus, string> = {
  entrou: "ENTROU",
  saindo: "SAINDO",
  disponivel: "DISPONÍVEL",
};

function CatalogCard({ movement }: { movement: CatalogMovement }) {
  const game = movement.gameId ? getGameById(movement.gameId) : undefined;
  const accent = game?.color ?? (movement.status === "saindo" ? "#ff8a5c" : "#6fe6ff");

  return (
    <article
      className="catalog-card interactive-card"
      data-testid="catalog-card"
      style={{ "--catalog-accent": accent } as CSSProperties}
    >
      <div className="catalog-card-art">
        {game ? (
          <GameArtwork game={game} />
        ) : (
          <div className="catalog-card-fallback" aria-hidden="true">
            <Layers3 />
            <span>{serviceLabels[movement.service]}</span>
          </div>
        )}
        <span className={`catalog-status is-${movement.status}`}>
          {statusLabels[movement.status]}
        </span>
        {game && <TrackButton id={game.id} title={game.title} compact />}
      </div>
      <div className="catalog-card-content">
        <div className="catalog-service-line">
          <span>{serviceLabels[movement.service]}</span>
          <span>{movement.platforms}</span>
        </div>
        <h3>
          {game ? (
            <Link href={`/games/${game.slug}`}>
              {movement.title} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            movement.title
          )}
        </h3>
        <p>{movement.summary}</p>
        <div className="catalog-date">
          <Clock3 size={14} aria-hidden="true" /> {movement.date}
        </div>
      </div>
    </article>
  );
}

export function CatalogRadar({
  movements = catalogMovements,
}: {
  movements?: CatalogMovement[];
}) {
  const [service, setService] = useState<"all" | CatalogService>("all");
  const visible = filterCatalogMovements(movements, service);

  return (
    <div className="catalog-radar" data-testid="catalog-radar">
      <div className="catalog-filters" aria-label="Filtrar por serviço">
        {services.map((item) => (
          <button
            key={item.id}
            type="button"
            className={service === item.id ? "is-active" : ""}
            aria-pressed={service === item.id}
            onClick={() => setService(item.id)}
          >
            {item.label}
            <span>
              {filterCatalogMovements(movements, item.id).length
                .toString()
                .padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      {visible.length > 0 ? (
        <div className="catalog-grid">
          {visible.map((movement) => (
            <CatalogCard key={movement.id} movement={movement} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty" role="status">
          Nenhum movimento detectado neste serviço.
        </div>
      )}
      <p className="editorial-disclaimer">
        Dados editoriais demonstrativos para apresentar a experiência da Central.
      </p>
    </div>
  );
}
