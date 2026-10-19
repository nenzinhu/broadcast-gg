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

test("painel apresenta contexto e fatos ligados às fontes", async ({ page }) => {
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  const panel = page.getByRole("article", {
    name: "Preview de Grand Theft Auto VI",
  });

  await expect(panel).toContainText("Lucia e Jason");
  await expect(panel).toContainText("POR QUE IMPORTA");
  await expect(panel).toContainText("PlayStation 5");
  await expect(panel).toContainText("19 de novembro de 2026");
  await expect(
    panel.getByRole("heading", { name: "O que está confirmado" }),
  ).toBeVisible();
  await expect(
    panel.getByRole("link", { name: /Canal oficial de Rockstar Games/ }),
  ).toHaveAttribute("target", "_blank");
});

test("rumor nunca aparece como confirmado", async ({ page }) => {
  await page.goto("/preview?jogo=wolf-among-us-remastered");
  const panel = page.getByRole("article", {
    name: "Preview de The Wolf Among Us Remastered",
  });

  await expect(panel.getByText("RUMOR NÃO CONFIRMADO", { exact: true })).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "O que ainda é rumor" }),
  ).toBeVisible();
  await expect(panel).toContainText("CONFIANÇA BAIXA");
  await expect(panel.getByText("CONFIRMADO", { exact: true })).toHaveCount(0);
});

test("jogo sem rumores informa ausência de sinais", async ({ page }) => {
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  await expect(
    page.getByText("Nenhum rumor com evidência suficiente no radar."),
  ).toBeVisible();
});

test("trailer carrega somente após o clique e devolve o foco", async ({ page }) => {
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html><body>Player controlado</body></html>",
    }),
  );
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  await expect(page.locator("iframe")).toHaveCount(0);

  const play = page.getByRole("button", {
    name: "Assistir trailer de Grand Theft Auto VI",
  });
  await play.click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/QdBZY2fkU-0/,
  );
  await page.getByRole("button", { name: "Fechar trailer" }).click();

  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(play).toBeFocused();
});

test("galeria abre imagem e devolve o foco", async ({ page }) => {
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  const opener = page.getByRole("button", {
    name: "Ampliar foto 1 de Grand Theft Auto VI",
  });
  await opener.click();

  const dialog = page.getByRole("dialog", {
    name: "Galeria de Grand Theft Auto VI",
  });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Fechar galeria" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("falha de imagem preserva conteúdo e mostra fallback", async ({ page }) => {
  await page.route("https://i.ytimg.com/**", (route) => route.abort());
  await page.goto("/preview?jogo=grand-theft-auto-vi");

  await expect(page.getByText("ARTE INDISPONÍVEL").first()).toBeVisible();
  const panel = page.getByRole("article", {
    name: "Preview de Grand Theft Auto VI",
  });
  await expect(panel).toContainText("Lucia e Jason");
  await expect(
    panel.getByRole("heading", { name: "O que está confirmado" }),
  ).toBeVisible();
});

test("jogo sem vídeo não cria player quebrado", async ({ page }) => {
  await page.goto("/preview?jogo=next-mass-effect");

  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.getByText("Vídeo oficial indisponível")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Assistir trailer de Próximo Mass Effect/ }),
  ).toHaveCount(0);
});

for (const width of [375, 768, 1440]) {
  test(`Preview permanece contido em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/preview?jogo=grand-theft-auto-vi");
    const browser = page.getByTestId("preview-browser");
    await expect(browser).toBeVisible();

    const layout = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(layout.content).toBeLessThanOrEqual(layout.viewport);

    const paragraphSizes = await browser.locator("p:visible").evaluateAll((nodes) =>
      nodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    );
    expect(paragraphSizes.every((size) => size >= 14)).toBe(true);

    if (width === 375) {
      const listLayout = await browser.locator(".preview-game-list").evaluate((node) => ({
        display: getComputedStyle(node).display,
        overflowX: getComputedStyle(node).overflowX,
        tops: Array.from(node.children).map((child) => (child as HTMLElement).offsetTop),
      }));
      expect(listLayout.display).toBe("flex");
      expect(["auto", "scroll"]).toContain(listLayout.overflowX);
      expect(new Set(listLayout.tops).size).toBe(1);
    }
  });
}

test("troca de jogo anima no movimento normal", async ({ page }) => {
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  const panel = page.locator("[data-preview-motion]");
  await page.getByRole("option", { name: /The Witcher IV/ }).click();

  const during = await panel.evaluate((node) => ({
    opacity: getComputedStyle(node).opacity,
    transform: getComputedStyle(node).transform,
  }));
  expect(during.opacity === "1" && during.transform === "none").toBe(false);
  await expect(panel).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("heading", { level: 2, name: "The Witcher IV" }),
  ).toBeVisible();
});

test("movimento reduzido mantém conteúdo estável", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/preview?jogo=grand-theft-auto-vi");
  await page.getByRole("option", { name: /The Witcher IV/ }).click();
  const panel = page.locator("[data-preview-motion]");
  const initial = await panel.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(450);

  expect(await panel.evaluate((node) => getComputedStyle(node).transform)).toBe(initial);
  await expect(panel).toHaveCSS("opacity", "1");
});

test("lista funciona por teclado e trocas repetidas não geram erros", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/preview");
  const options = page.getByTestId("preview-game-option");

  await options.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(options.nth(1)).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/jogo=phantom-blade-zero/);

  for (const title of ["The Witcher IV", "Fable", "Grand Theft Auto VI"]) {
    await page.getByRole("option", { name: new RegExp(title) }).click();
  }
  expect(errors).toEqual([]);
});
