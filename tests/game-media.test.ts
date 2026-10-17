import { describe, it, expect } from "vitest";
import { parseSteamScreenshots } from "../src/lib/game-media";
const sample = {
  id: 0,
  path_thumbnail:
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/test-thumb.jpg",
  path_full:
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/test-full.jpg",
};
describe("official gameplay media", () => {
  it("extracts screenshots from the requested successful Steam app", () =>
    expect(
      parseSteamScreenshots(
        { "1245620": { success: true, data: { screenshots: [sample] } } },
        1245620,
      ),
    ).toEqual([
      { id: 0, thumbnail: sample.path_thumbnail, full: sample.path_full },
    ]));
  it.each([
    null,
    {},
    { "1245620": { success: false } },
    { "1245620": { success: true, data: { screenshots: {} } } },
  ])("handles unavailable or malformed response %j", (payload) =>
    expect(parseSteamScreenshots(payload, 1245620)).toEqual([]),
  );
  it("rejects unsafe or unrelated hosts and non-HTTPS images", () =>
    expect(
      parseSteamScreenshots(
        {
          "1245620": {
            success: true,
            data: {
              screenshots: [
                { ...sample, path_full: "https://evil.example/game.jpg" },
                {
                  ...sample,
                  path_thumbnail:
                    "http://shared.fastly.steamstatic.com/test.jpg",
                },
              ],
            },
          },
        },
        1245620,
      ),
    ).toEqual([]));
  it("ignores another game response", () =>
    expect(
      parseSteamScreenshots(
        { "1091500": { success: true, data: { screenshots: [sample] } } },
        1245620,
      ),
    ).toEqual([]));
  it("caps the gallery at six unique screenshots", () => {
    const screenshots = Array.from({ length: 9 }, (_, id) => ({
      ...sample,
      id,
    }));
    expect(
      parseSteamScreenshots(
        { "1245620": { success: true, data: { screenshots } } },
        1245620,
      ),
    ).toHaveLength(6);
  });
});
