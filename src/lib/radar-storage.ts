export const RADAR_KEY = "broadcast-gg:radar:v1";
export function parseTrackedIds(
  raw: string | null,
  validIds: string[],
): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter(
          (id): id is string => typeof id === "string" && validIds.includes(id),
        ),
      ),
    ];
  } catch {
    return [];
  }
}
