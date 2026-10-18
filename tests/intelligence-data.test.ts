import { describe, expect, it } from "vitest";
import { games, getGameById } from "../src/lib/catalog";
import {
  catalogMovements,
  filterCatalogMovements,
} from "../src/lib/catalog-services";
import { returningGames } from "../src/lib/returning-games";
import { franchiseGuides } from "../src/lib/franchise-guides";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("central intelligence data", () => {
  it("mantém identificadores únicos em cada coleção", () => {
    expect(unique(catalogMovements.map((item) => item.id))).toBe(true);
    expect(unique(returningGames.map((item) => item.id))).toBe(true);
    expect(unique(franchiseGuides.map((item) => item.id))).toBe(true);
  });

  it("resolve todas as referências internas no catálogo", () => {
    const references = [
      ...catalogMovements.map((item) => item.gameId),
      ...returningGames.map((item) => item.gameId),
      ...franchiseGuides.flatMap((guide) =>
        guide.entries.map((entry) => entry.gameId),
      ),
    ].filter((id): id is string => Boolean(id));

    expect(references.every((id) => getGameById(id))).toBe(true);
    expect(games.length).toBeGreaterThan(0);
  });

  it("restringe serviços, estados e vereditos aos valores editoriais", () => {
    expect(new Set(catalogMovements.map((item) => item.service))).toEqual(
      new Set(["game-pass", "playstation-plus", "ea-play"]),
    );
    expect(new Set(catalogMovements.map((item) => item.status))).toEqual(
      new Set(["entrou", "saindo", "disponivel"]),
    );
    expect(new Set(returningGames.map((item) => item.verdict))).toEqual(
      new Set(["volte-agora", "espere-mais"]),
    );
    expect(
      returningGames.every((item) => item.verdictReason.trim().length > 0),
    ).toBe(true);
  });

  it("filtra movimentos sem mutar a coleção e aceita resultado vazio", () => {
    const original = [...catalogMovements];
    expect(filterCatalogMovements([], "game-pass")).toEqual([]);
    expect(
      filterCatalogMovements(catalogMovements, "game-pass").every(
        (item) => item.service === "game-pass",
      ),
    ).toBe(true);
    expect(filterCatalogMovements(catalogMovements, "all")).toEqual(
      catalogMovements,
    );
    expect(catalogMovements).toEqual(original);
  });

  it("define as quatro franquias com um ponto de início válido", () => {
    expect(franchiseGuides.map((guide) => guide.id).sort()).toEqual([
      "god-of-war",
      "grand-theft-auto",
      "resident-evil",
      "the-witcher",
    ]);
    for (const guide of franchiseGuides) {
      expect(guide.entries.length).toBeGreaterThanOrEqual(2);
      expect(
        guide.entries.filter((entry) => entry.id === guide.startEntryId),
      ).toHaveLength(1);
    }
  });
});
