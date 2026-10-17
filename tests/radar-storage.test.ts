import { describe, expect, it } from "vitest";
import { parseTrackedIds } from "../src/lib/radar-storage";
describe("saved radar", () => {
  it.each([null, "invalid", "{}", "null", "42"])("recovers from %s", (raw) =>
    expect(parseTrackedIds(raw, ["a"])).toEqual([]),
  );
  it("keeps valid IDs, excludes unknown/non-string IDs and deduplicates", () =>
    expect(parseTrackedIds('["a","b","a",3,null]', ["a"])).toEqual(["a"]));
  it("preserves a valid list", () =>
    expect(parseTrackedIds('["b","a"]', ["a", "b"])).toEqual(["b", "a"]));
});
