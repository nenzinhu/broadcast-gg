import { discount, type Game, type Signal } from "./catalog";
export type GameSort = "featured" | "price-asc" | "discount-desc";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
export function queryGames(
  items: Game[],
  options: { query: string; genre: string; sort: GameSort },
): Game[] {
  const query = normalize(options.query);
  const genre = normalize(options.genre);
  const result = items.filter(
    (game) =>
      normalize(game.title).includes(query) &&
      (!genre || game.genres.some((item) => normalize(item) === genre)),
  );
  if (options.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (options.sort === "discount-desc")
    result.sort((a, b) => discount(b) - discount(a));
  return result;
}
export function querySignals(
  items: Signal[],
  catalog: Game[],
  options: { query: string; type: "all" | Signal["type"] },
): Signal[] {
  return items.filter((signal) => {
    const game = catalog.find((game) => game.id === signal.gameId);
    return (
      game &&
      (options.type === "all" || signal.type === options.type) &&
      normalize(game.title).includes(normalize(options.query))
    );
  });
}
