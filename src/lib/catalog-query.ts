import { discount, games, type Game, type Signal } from "./catalog";

export type SortKey = "featured" | "price" | "discount" | "score";
export type SignalType = Signal["type"] | "all";

export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

export function getGame(id: string): Game | undefined {
  return games.find((game) => game.id === id);
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function gameOfSignal(signal: Signal): Game | undefined {
  return getGame(signal.gameId);
}

export function searchGames(list: Game[], query: string): Game[] {
  const term = normalize(query);
  if (!term) return [...list];
  return list.filter((game) =>
    normalize(`${game.title} ${game.genre} ${game.kicker} ${game.description}`).includes(
      term,
    ),
  );
}

export function sortGames(list: Game[], sort: SortKey): Game[] {
  const copy = [...list];
  switch (sort) {
    case "price":
      return copy.sort((a, b) => a.price - b.price);
    case "discount":
      return copy.sort((a, b) => discount(b) - discount(a) || a.price - b.price);
    case "score":
      return copy.sort((a, b) => b.score - a.score);
    default:
      return copy;
  }
}

export const genreOf = (game: Game): string =>
  game.genre.split("·")[0].trim().toUpperCase();

export function genreOptions(list: Game[]): string[] {
  const options: string[] = [];
  for (const game of list) {
    const genre = genreOf(game);
    if (!options.includes(genre)) options.push(genre);
  }
  return options;
}

export function filterByGenre(list: Game[], genre: string): Game[] {
  if (genre === "all") return [...list];
  return list.filter((game) => genreOf(game) === genre);
}

export function filterSignals(
  list: Signal[],
  options: { type?: SignalType; query?: string } = {},
): Signal[] {
  const type = options.type ?? "all";
  const term = normalize(options.query ?? "");
  return list.filter((signal) => {
    if (type !== "all" && signal.type !== type) return false;
    if (!term) return true;
    const game = gameOfSignal(signal);
    return normalize(
      `${game?.title ?? ""} ${signal.title} ${signal.description}`,
    ).includes(term);
  });
}