import { test, expect } from "@playwright/test";
test("game pages and radar are real routes with an actual 404", async ({
  page,
}) => {
  const response = await page.goto("/games/cyberpunk-2077");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cyberpunk 2077",
  );
  await page
    .getByRole("button", { name: "Adicionar Cyberpunk 2077 ao radar" })
    .click();
  await page.getByRole("link", { name: "Meu radar" }).click();
  await expect(page).toHaveURL(/\/radar$/);
  await expect(page.locator(".tracked-row")).toContainText("Cyberpunk 2077");
  await page.reload();
  await expect(page.locator(".tracked-row")).toContainText("Cyberpunk 2077");
  const missing = await page.goto("/games/not-a-game");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Fora do radar",
  );
});
test("mobile menu works by keyboard and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Abrir navegação" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Radar", exact: true })
    .click();
  await expect(page).toHaveURL(/\/radar$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("link", { name: "BROADCAST.GG início" }).click();
  await expect(page).toHaveURL("/");
});
test("mobile keyboard enters menu links immediately after toggle", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/deals");
  const menu = page.getByRole("button", { name: "Abrir navegação" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Signals", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/signals$/);
  await expect(
    page.getByRole("button", { name: "Abrir navegação" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("mobile menu remains closed after external navigation and browser back", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/radar");
  await page.getByRole("button", { name: "Abrir navegação" }).click();
  await page.getByRole("link", { name: "Encontrar meu próximo jogo" }).click();
  await expect(page).toHaveURL(/\/deals$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/radar$/);
  await expect(
    page.getByRole("button", { name: "Abrir navegação" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("mobile radar shortcut has a name and keeps blocked-storage favorites between routes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.goto("/games/cyberpunk-2077");
  await page
    .getByRole("button", { name: "Adicionar Cyberpunk 2077 ao radar" })
    .click();
  const shortcut = page.getByRole("link", { name: "Meu radar", exact: true });
  await expect(shortcut).toBeVisible();
  await shortcut.click();
  await expect(page.locator(".tracked-row")).toContainText("Cyberpunk 2077");
  await expect(page.getByRole("status")).toContainText("apenas nesta sessão");
});
