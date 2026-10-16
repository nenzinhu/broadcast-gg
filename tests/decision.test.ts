import { describe, expect, it } from "vitest";
import { getDecision } from "../src/lib/decision";
import { games } from "../src/lib/catalog";
describe("recommendations", () => {
  it("prioritizes low score over a discount", () =>
    expect(getDecision({ ...games[0], score: 69, price: 1 }).verdict).toBe(
      "SKIP",
    ));
  it("buys at the historical low including score boundary", () =>
    expect(getDecision({ ...games[0], score: 70 }).verdict).toBe("BUY"));
  it("buys below the historical low", () =>
    expect(getDecision({ ...games[0], price: 1 }).verdict).toBe("BUY"));
  it("waits when above the historical low", () =>
    expect(getDecision({ ...games[0], price: 100 }).verdict).toBe("WAIT"));
});
