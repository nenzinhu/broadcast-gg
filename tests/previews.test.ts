import { describe, expect, it } from "vitest";
import {
  filterPreviewGames,
  getPreviewBySlug,
  previewGames,
} from "../src/lib/previews";

describe("preview editorial catalog", () => {
  it("contains the approved 18-game roster", () => {
    expect(previewGames).toHaveLength(18);
    expect(new Set(previewGames.map((game) => game.slug))).toHaveProperty(
      "size",
      18,
    );
    expect(previewGames.map((game) => game.slug)).toEqual(
      expect.arrayContaining([
        "grand-theft-auto-vi",
        "phantom-blade-zero",
        "the-witcher-iv",
        "next-mass-effect",
        "wolf-among-us-remastered",
      ]),
    );
  });

  it("keeps every editorial claim linked to a source", () => {
    for (const game of previewGames) {
      const sourceIds = new Set(game.sources.map((source) => source.id));
      expect(game.officialFacts.every((fact) => sourceIds.has(fact.sourceId))).toBe(
        true,
      );
      expect(game.rumors.every((rumor) => sourceIds.has(rumor.sourceId))).toBe(
        true,
      );
      expect(
        game.rumors.every((rumor) => ["alto", "medio", "baixo"].includes(rumor.confidence)),
      ).toBe(true);
    }
  });

  it("falls back safely for missing or unknown slugs", () => {
    expect(getPreviewBySlug(null)).toBe(previewGames[0]);
    expect(getPreviewBySlug("nao-existe")).toBe(previewGames[0]);
  });

  it("filters case and accent insensitively", () => {
    const filters = { platform: "", genre: "", status: "all" as const };
    const accented = filterPreviewGames(previewGames, {
      ...filters,
      query: "  PRÓXIMO mass effect ",
    });
    const plain = filterPreviewGames(previewGames, {
      ...filters,
      query: "proximo mass effect",
    });

    expect(accented.map((game) => game.slug)).toEqual(["next-mass-effect"]);
    expect(plain).toEqual(accented);
  });

  it("combines platform genre and status filters", () => {
    const result = filterPreviewGames(previewGames, {
      query: "",
      platform: "PlayStation 5",
      genre: "Ação",
      status: "confirmed",
    });

    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (game) =>
          game.platforms.includes("PlayStation 5") &&
          game.genre.includes("Ação") &&
          game.informationStatus === "confirmed",
      ),
    ).toBe(true);
  });
});
