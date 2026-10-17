import { describe, it, expect } from "vitest";
import { games, signals } from "../src/lib/catalog";
import { queryGames, querySignals } from "../src/lib/catalog-query";
const base = { query: "", genre: "", sort: "featured" as const };
describe("catalog exploration", () => {
  it("preserves the complete featured catalog", () =>
    expect(queryGames(games, base)).toEqual(games));
  it("normalizes accents, whitespace and case", () =>
    expect(
      queryGames(games, { ...base, query: "  HÁDES  " }).map((g) => g.id),
    ).toEqual(["hades"]));
  it("combines genre and search", () =>
    expect(
      queryGames(games, { ...base, genre: "RPG", query: "Cyberpunk" }).map(
        (g) => g.id,
      ),
    ).toEqual(["cyberpunk"]));
  it("returns empty for an absent query", () =>
    expect(queryGames(games, { ...base, query: "xxxxxxxx" })).toEqual([]));
  it("returns empty when genre excludes the game", () =>
    expect(
      queryGames(games, { ...base, genre: "Indie", query: "Cyberpunk" }),
    ).toEqual([]));
  it("sorts prices without mutating input", () => {
    const original = [...games];
    const result = queryGames(games, { ...base, sort: "price-asc" });
    expect(result[0].id).toBe("hollow-knight");
    expect(result.at(-1)?.id).toBe("starfield");
    expect(games).toEqual(original);
  });
  it("sorts by discount", () =>
    expect(queryGames(games, { ...base, sort: "discount-desc" })[0].id).toBe(
      "cyberpunk",
    ));
  it("combines signal type and game title", () =>
    expect(
      querySignals(signals, games, { query: "ELDEN", type: "update" }).map(
        (s) => s.id,
      ),
    ).toEqual(["s2"]));
  it("allows an empty signal result", () =>
    expect(
      querySignals(signals, games, { query: "ELDEN", type: "price" }),
    ).toEqual([]));
  it("excludes signals with missing games", () =>
    expect(querySignals(signals, [], { query: "", type: "all" })).toEqual([]));
});
