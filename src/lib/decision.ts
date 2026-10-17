import type { Game } from "./catalog";
export function getDecision(game: Game): {
  verdict: "BUY" | "WAIT" | "SKIP";
  reason: string;
} {
  if (game.score < 70)
    return {
      verdict: "SKIP",
      reason:
        "Avaliação abaixo de 70 neste cenário. Mesmo com desconto, vale priorizar outras experiências.",
    };
  if (game.price <= game.historicalLow)
    return {
      verdict: "BUY",
      reason:
        "Preço no menor patamar do cenário e avaliação a partir de 70. Uma boa combinação para a sua próxima partida.",
    };
  return {
    verdict: "WAIT",
    reason:
      "O preço está acima do menor valor do cenário. Adicione ao radar e escolha seu momento com calma.",
  };
}
