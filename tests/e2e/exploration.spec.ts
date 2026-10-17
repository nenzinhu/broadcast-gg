import { test, expect } from "@playwright/test";
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
  await expect(page.locator(".signal-card")).toHaveCount(3);
});
test("deals sorts and filters real results", async ({ page }) => {
  await page.goto("/deals");
  await page.getByLabel("Ordenar por").selectOption("price-asc");
  await expect(page.locator(".deal-card").first()).toContainText(
    "Hollow Knight",
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
  await page.getByLabel("Gênero").selectOption("Indie");
  await expect(page.locator(".deal-card")).toHaveCount(1);
  await page.getByRole("searchbox", { name: "Buscar jogo" }).fill("cyberpunk");
  await expect(page.getByText("Nenhum jogo por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".deal-card")).toHaveCount(5);
});
