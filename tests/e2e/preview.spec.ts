import { expect, test } from "@playwright/test";

test("abre Preview pelo menu e lista os 18 jogos", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Preview", exact: true })
    .click();

  await expect(page).toHaveURL(/\/preview$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Os jogos que vêm aí/ }),
  ).toBeVisible();
  await expect(page.getByTestId("preview-game-option")).toHaveCount(18);
  await expect(page.getByTestId("preview-game-option").first()).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("navegação móvel alcança Preview por teclado", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Abrir navegação" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const preview = page.getByRole("link", { name: "Preview", exact: true });
  await preview.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/preview$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Os jogos que vêm aí",
  );
});

test("seleciona um jogo e atualiza a URL", async ({ page }) => {
  await page.goto("/preview");
  await page.getByRole("option", { name: /The Witcher IV/ }).click();

  await expect(page).toHaveURL(/\/preview\?jogo=the-witcher-iv$/);
  await expect(
    page.getByRole("article", { name: "Preview de The Witcher IV" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "The Witcher IV" }),
  ).toBeVisible();
});

test("abre link direto e normaliza query vazia, repetida ou inválida", async ({
  page,
}) => {
  await page.goto("/preview?jogo=the-witcher-iv");
  await expect(
    page.getByRole("option", { name: /The Witcher IV/ }),
  ).toHaveAttribute("aria-selected", "true");

  for (const query of [
    "?jogo=",
    "?jogo=the-witcher-iv&jogo=grand-theft-auto-vi",
    "?jogo=nao-existe",
  ]) {
    await page.goto(`/preview${query}`);
    await expect(page).toHaveURL(/\/preview\?jogo=grand-theft-auto-vi$/);
    await expect(
      page.getByRole("option", { name: /Grand Theft Auto VI/ }),
    ).toHaveAttribute("aria-selected", "true");
  }
});

test("busca sem diferenciar acentos e combina filtros", async ({ page }) => {
  await page.goto("/preview");
  const browser = page.getByTestId("preview-browser");
  const search = browser.getByRole("searchbox", { name: "Buscar jogo" });

  await search.fill("  proximo MASS EFFECT ");
  await expect(browser.getByTestId("preview-game-option")).toHaveCount(1);
  await expect(
    browser.getByRole("option", { name: /Próximo Mass Effect/ }),
  ).toBeVisible();

  await browser.getByRole("button", { name: "Limpar filtros" }).click();
  await browser.getByLabel("Plataforma").selectOption("PlayStation 5");
  await browser.getByLabel("Gênero").selectOption("Ação");
  await browser.getByLabel("Situação").selectOption("confirmed");

  await expect(browser.getByTestId("preview-game-option")).toHaveCount(1);
  await expect(
    browser.getByRole("option", { name: /Grand Theft Auto VI/ }),
  ).toBeVisible();
});

test("resultado vazio oferece limpeza", async ({ page }) => {
  await page.goto("/preview");
  const browser = page.getByTestId("preview-browser");
  await browser.getByRole("searchbox", { name: "Buscar jogo" }).fill("zzzzzz");

  await expect(browser.getByRole("status")).toContainText(
    "Nenhum jogo encontrado",
  );
  await browser.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(browser.getByTestId("preview-game-option")).toHaveCount(18);
});

test("filtro que remove a seleção escolhe o primeiro resultado", async ({
  page,
}) => {
  await page.goto("/preview");
  const browser = page.getByTestId("preview-browser");
  await browser.getByRole("option", { name: /Fable/ }).click();
  await expect(page).toHaveURL(/jogo=fable/);

  await browser.getByLabel("Plataforma").selectOption("PlayStation 5");

  await expect(
    browser.getByRole("option", { name: /Grand Theft Auto VI/ }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/jogo=grand-theft-auto-vi/);
});
