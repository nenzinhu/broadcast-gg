import { describe, expect, it } from "vitest";
import {
  filterPreviewGames,
  getCommunitySearchUrl,
  getHypeLabel,
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

  it("keeps official editorial sources separate from distinct trailer frames", () => {
    const gta = getPreviewBySlug("grand-theft-auto-vi");

    expect(gta.sources.find((source) => source.id === "grand-theft-auto-vi-official")?.url).toBe(
      "https://www.rockstargames.com/VI",
    );
    expect(gta.gallery.map((image) => image.src)).toEqual([
      "https://i.ytimg.com/vi/VQRLujxTm3c/hq1.jpg",
      "https://i.ytimg.com/vi/VQRLujxTm3c/hq2.jpg",
    ]);
    expect(new Set([gta.heroImage, ...gta.gallery.map((image) => image.src)])).toHaveProperty(
      "size",
      3,
    );
  });

  it("does not present an unsupported remaster rumor as evidence", () => {
    const wolf = getPreviewBySlug("wolf-among-us-remastered");

    expect(wolf.informationStatus).toBe("unconfirmed-rumor");
    expect(wolf.rumors).toEqual([]);
    expect(wolf.summary).toContain("Não existe anúncio oficial verificável");
  });

  it("gives every game a hype index, a detailed dossier and community videos", () => {
    for (const game of previewGames) {
      expect(game.hype.score).toBeGreaterThanOrEqual(0);
      expect(game.hype.score).toBeLessThanOrEqual(100);
      expect(game.hype.drivers.length).toBeGreaterThanOrEqual(2);
      expect(game.deepDive.length).toBeGreaterThanOrEqual(2);
      expect(
        game.deepDive.every((paragraph) => paragraph.length >= 140),
      ).toBe(true);
      expect(new Set(game.communityVideos.map((video) => video.youtubeId))).toHaveProperty(
        "size",
        game.communityVideos.length,
      );
      for (const video of game.communityVideos) {
        expect(video.youtubeId).toMatch(/^[A-Za-z0-9_-]{11}$/);
        expect(video.channel.length).toBeGreaterThan(0);
        expect(video.title.length).toBeGreaterThan(10);
      }
    }
  });

  it("only leaves the unsupported remaster without community videos", () => {
    const withoutCommunity = previewGames
      .filter((game) => game.communityVideos.length === 0)
      .map((game) => game.slug);

    expect(withoutCommunity).toEqual(["wolf-among-us-remastered"]);
    expect(getPreviewBySlug("wolf-among-us-remastered").communityVideos).toEqual(
      [],
    );
  });

  it("orders by hype while preserving active filters", () => {
    const base = { query: "", platform: "", genre: "", status: "all" as const };
    const ranked = filterPreviewGames(previewGames, { ...base, order: "hype" });
    const scores = ranked.map((game) => game.hype.score);

    expect(ranked).toHaveLength(18);
    expect(ranked[0].slug).toBe("grand-theft-auto-vi");
    expect(scores).toEqual([...scores].sort((first, second) => second - first));

    const filtered = filterPreviewGames(previewGames, {
      ...base,
      platform: "PlayStation 5",
      order: "hype",
    });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((game) => game.platforms.includes("PlayStation 5"))).toBe(
      true,
    );
  });

  it("labels hype levels and builds an encoded YouTube search", () => {
    expect(getHypeLabel(98)).toBe("HYPE MÁXIMO");
    expect(getHypeLabel(84)).toBe("HYPE ALTO");
    expect(getHypeLabel(70)).toBe("HYPE MODERADO");
    expect(getHypeLabel(41)).toBe("EM OBSERVAÇÃO");
    expect(getCommunitySearchUrl({ title: "The Witcher IV" })).toBe(
      "https://www.youtube.com/results?search_query=The%20Witcher%20IV%20an%C3%A1lise",
    );
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
