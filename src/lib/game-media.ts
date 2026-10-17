export type GameplayScreenshot = {
  id: number;
  thumbnail: string;
  full: string;
};
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
function trustedImage(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".steamstatic.com") &&
      !url.username &&
      !url.password &&
      !url.port
    );
  } catch {
    return false;
  }
}
export function parseSteamScreenshots(
  payload: unknown,
  appId: number,
): GameplayScreenshot[] {
  if (!record(payload)) return [];
  const app = payload[String(appId)];
  if (
    !record(app) ||
    app.success !== true ||
    !record(app.data) ||
    !Array.isArray(app.data.screenshots)
  )
    return [];
  const result: GameplayScreenshot[] = [];
  const seen = new Set<number>();
  for (const item of app.data.screenshots) {
    if (
      !record(item) ||
      typeof item.id !== "number" ||
      !Number.isInteger(item.id) ||
      item.id < 0 ||
      seen.has(item.id) ||
      !trustedImage(item.path_thumbnail) ||
      !trustedImage(item.path_full)
    )
      continue;
    seen.add(item.id);
    result.push({
      id: item.id,
      thumbnail: item.path_thumbnail,
      full: item.path_full,
    });
    if (result.length === 6) break;
  }
  return result;
}
