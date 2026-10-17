import { test, expect } from "@playwright/test";

test("header navigation reaches routes with active state and search", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await nav.getByRole("link", { name: "Signals" }).click();
  await expect(page).toHaveURL("/signals");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "O jogo muda. A gente sinaliza.",
  );
  await expect(
    page.locator('#primary-nav a[aria-current="page"]'),
  ).toHaveText("Signals");
  await expect(page.locator(".signal-card")).toHaveCount(3);
  const search = page.getByLabel("Buscar sinal por jogo");
  await search.fill("elden");
  await expect(page.locator(".signal-card")).toHaveCount(1);
  await expect(page.locator(".signal-card .card-meta span").first()).toHaveText(
    "Elden Ring",
  );
  await search.fill("zzz sem sinal");
  await expect(page.locator(".empty-state")).toBeVisible();
  await expect(page.locator(".filter-group button").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("deals page searches and sorts the catalog", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/deals");
  await expect(page.locator(".deal-card")).toHaveCount(5);
  const sort = page.getByLabel("Ordenar catálogo");
  await sort.selectOption("price");
  await expect(page.locator(".deal-card h3").first()).toHaveText(
    "Hollow Knight",
  );
  await sort.selectOption("discount");
  await expect(page.locator(".deal-card h3").first()).toHaveText(
    "Cyberpunk 2077",
  );
  const search = page.getByLabel("Buscar jogo no catálogo");
  await search.fill("roguelike");
  await expect(page.locator(".deal-card")).toHaveCount(1);
  await expect(page.locator(".deal-card h3")).toHaveText("Hades II");
  await search.fill("zzz nada");
  await expect(page.locator(".empty-state")).toBeVisible();
  expect(errors).toEqual([]);
});

test("discover filters by genre and opens individual game pages", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/discover");
  await expect(page.locator(".discover-card")).toHaveCount(5);
  await page.getByRole("button", { name: "RPG", exact: true }).click();
  await expect(page.locator(".discover-card")).toHaveCount(2);
  await page.locator(".discover-card h3 a").first().click();
  await expect(page).toHaveURL("/games/cyberpunk-2077");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cyberpunk 2077",
  );
  await expect(page.locator(".verdict strong")).toHaveText("BUY");
  await page.getByRole("link", { name: "Voltar ao catálogo" }).click();
  await expect(page).toHaveURL("/deals");
  expect(errors).toEqual([]);
});

test("unknown game slug returns a 404 with real navigation", async ({
  page,
}) => {
  const response = await page.goto("/games/jogo-que-nao-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "saiu do radar",
  );
  await page.getByRole("link", { name: "Explorar catálogo" }).click();
  await expect(page).toHaveURL("/deals");
});

test("favorites follow the user across routes and survive reloads", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/deals");
  await page
    .getByRole("button", { name: "Adicionar Hollow Knight ao radar" })
    .first()
    .click();
  await page.locator('.header-radar[href="/radar"]').click();
  await expect(page).toHaveURL("/radar");
  await expect(page.locator(".tracked-row")).toContainText("Hollow Knight");
  await page.reload();
  await expect(page.locator(".tracked-row")).toContainText("Hollow Knight");
  await page
    .getByRole("button", { name: "Remover Hollow Knight do radar" })
    .click();
  await expect(page.locator(".radar-empty")).toBeVisible();
  await page.getByRole("link", { name: /Encontrar meu próximo jogo/ }).click();
  await expect(page).toHaveURL("/deals");
  expect(errors).toEqual([]);
});

test("mobile menu opens with the keyboard and routes without overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/discover");
  const toggle = page.getByRole("button", {
    name: "Abrir menu de navegação",
  });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.focus();
  await page.keyboard.press("Enter");
  const firstLink = page.locator("#primary-nav a").first();
  await expect(firstLink).toBeFocused();
  await page.getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Signals" })
    .click();
  await expect(page).toHaveURL("/signals");
  await expect(
    page.locator('#primary-nav a[aria-current="page"]'),
  ).toHaveText("Signals");
  await expect(page.getByRole("button", { name: "Abrir menu de navegação" })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("reduced motion keeps subpage content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/deals");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.locator(".deal-card").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".deal-card").first()).toHaveCSS("opacity", "1");
});