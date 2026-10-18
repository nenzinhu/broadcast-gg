import { test, expect } from "@playwright/test";
import { games } from "../../src/lib/catalog";

test("novo jogo pode ser descoberto, aberto e adicionado ao radar", async ({
  page,
}) => {
  await page.goto("/discover");
  await page
    .getByRole("searchbox", { name: "Buscar jogo" })
    .fill("Clair Obscur");
  const card = page.locator(".deal-card");
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Clair Obscur: Expedition 33");
  await card
    .getByRole("link", { name: "Clair Obscur: Expedition 33", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Clair Obscur: Expedition 33",
  );
  await page
    .getByRole("button", {
      name: "Adicionar Clair Obscur: Expedition 33 ao radar",
    })
    .click();
  await page.goto("/radar");
  await expect(page.locator(".tracked-row")).toContainText(
    "Clair Obscur: Expedition 33",
  );
});
test("signals combines filters and recovers from empty results", async ({
  page,
}) => {
  const response = await page.goto("/signals");
  expect(response?.status()).toBe(200);
  await page.getByRole("searchbox", { name: "Buscar jogo" }).fill("ELDEN");
  await expect(page.locator(".signal-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Preço", exact: true }).click();
  await expect(page.getByText("Nenhum sinal por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".signal-card")).toHaveCount(8);
});
test("deals sorts and filters real results", async ({ page }) => {
  await page.goto("/deals");
  await page.getByLabel("Ordenar por").selectOption("price-asc");
  const cheapest = [...games].sort((a, b) => a.price - b.price)[0];
  await expect(page.locator(".deal-card").first()).toContainText(
    cheapest.title,
  );
  await page.getByRole("searchbox", { name: "Buscar jogo" }).fill("hades");
  await expect(page.locator(".deal-card")).toHaveCount(1);
  await page
    .locator(".deal-card")
    .getByRole("link", { name: "Hades II", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hades II");
});
test("discover genre filter and empty state work", async ({ page }) => {
  await page.goto("/discover");
  const totalGames = games.length;
  const indieGames = games.filter((game) => game.genres.includes("Indie"));
  await page.getByLabel("Gênero").selectOption("Indie");
  await expect(page.locator(".deal-card")).toHaveCount(indieGames.length);
  await page.getByRole("searchbox", { name: "Buscar jogo" }).fill("cyberpunk");
  await expect(page.getByText("Nenhum jogo por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".deal-card")).toHaveCount(totalGames);
});
