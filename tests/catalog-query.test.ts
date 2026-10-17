import { describe, expect, it } from "vitest";
import { games, signals } from "../src/lib/catalog";
import {
  filterByGenre,
  filterSignals,
  genreOf,
  genreOptions,
  getGameBySlug,
  normalize,
  searchGames,
  sortGames,
} from "../src/lib/catalog-query";

describe("normalize", () => {
  it("lowercases and removes accents", () => {
    expect(normalize("Ação  Roguelike")).toBe("acao roguelike");
  });
});

describe("searchGames", () => {
  it("returns the whole catalog for an empty query", () => {
    expect(searchGames(games, "   ")).toHaveLength(games.length);
  });
  it("matches title ignoring case and accents", () => {
    expect(
      searchGames(games, "HOLLOW").map((g) => g.id),
    ).toEqual(["hollow-knight"]);
    expect(
      searchGames(games, "hollow knight").map((g) => g.id),
    ).toEqual(["hollow-knight"]);
  });
  it("matches accented genre text typed without accents", () => {
    expect(searchGames(games, "acao").map((g) => g.id)).toEqual([
      "hades",
      "starfield",
    ]);
  });
  it("matches genre text", () => {
    const result = searchGames(games, "metroidvania");
    expect(result.map((g) => g.id)).toEqual(["hollow-knight"]);
  });
  it("returns a new array without mutating the catalog", () => {
    const result = searchGames(games, "");
    expect(result).not.toBe(games);
    expect(result).toEqual(games);
  });
  it("returns an empty list when nothing matches", () => {
    expect(searchGames(games, "jogo inexistente xyz")).toEqual([]);
  });
});

describe("sortGames", () => {
  it("sorts by lowest price first", () => {
    expect(sortGames(games, "price").map((g) => g.id)).toEqual([
      "hollow-knight",
      "hades",
      "cyberpunk",
      "elden-ring",
      "starfield",
    ]);
  });
  it("sorts by biggest discount first", () => {
    expect(sortGames(games, "discount").map((g) => g.id)).toEqual([
      "cyberpunk",
      "hollow-knight",
      "elden-ring",
      "starfield",
      "hades",
    ]);
  });
  it("sorts by score descending", () => {
    const first = sortGames(games, "score")[0];
    expect(first.score).toBe(96);
  });
  it("featured keeps catalog order and does not mutate input", () => {
    const before = games.map((g) => g.id);
    expect(sortGames(games, "featured").map((g) => g.id)).toEqual(before);
    expect(games.map((g) => g.id)).toEqual(before);
  });
});

describe("genres", () => {
  it("derives the base genre from the display string", () => {
    expect(genreOf(games[0])).toBe("RPG");
    expect(genreOf(games[3])).toBe("METROIDVANIA");
  });
  it("lists unique genre options in catalog order", () => {
    expect(genreOptions(games)).toEqual([
      "RPG",
      "SOULSLIKE",
      "ROGUELIKE",
      "METROIDVANIA",
    ]);
  });
  it("filters by genre and supports the all option", () => {
    expect(filterByGenre(games, "RPG").map((g) => g.id)).toEqual([
      "cyberpunk",
      "starfield",
    ]);
    expect(filterByGenre(games, "all")).toHaveLength(games.length);
  });
});

describe("filterSignals", () => {
  it("keeps all signals by default", () => {
    expect(filterSignals(signals)).toHaveLength(signals.length);
  });
  it("filters by type", () => {
    expect(filterSignals(signals, { type: "price" }).map((s) => s.id)).toEqual(
      ["s1"],
    );
  });
  it("searches by game title", () => {
    expect(filterSignals(signals, { query: "hades" }).map((s) => s.id)).toEqual(
      ["s3"],
    );
  });
  it("combines type and query into a real empty state", () => {
    expect(filterSignals(signals, { type: "update", query: "hades" })).toEqual(
      [],
    );
  });
  it("does not mutate the source list", () => {
    const before = signals.length;
    filterSignals(signals, { type: "price" });
    expect(signals).toHaveLength(before);
  });
});

describe("getGameBySlug", () => {
  it("resolves known slugs", () => {
    expect(getGameBySlug("hades-ii")?.id).toBe("hades");
    expect(getGameBySlug("cyberpunk-2077")?.id).toBe("cyberpunk");
  });
  it("returns undefined for unknown slugs", () => {
    expect(getGameBySlug("not-a-game")).toBeUndefined();
  });
});