import { expect, test } from "@playwright/test";

test("abre a Central pelo menu com o Radar de Catálogo ativo", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Central", exact: true })
    .click();

  await expect(page).toHaveURL(/\/central#catalogo$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Central de inteligência",
  );
  await expect(page.getByRole("tab", { name: "Radar de Catálogo" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel", { name: "Radar de Catálogo" })).toBeVisible();
});

test("aceita links diretos e normaliza hash desconhecido", async ({ page }) => {
  await page.goto("/central#voltar");
  await expect(page.getByRole("tab", { name: "Vale a pena voltar?" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await page.goto("/central#ordem");
  await expect(page.getByRole("tabpanel", { name: "Ordem para jogar" })).toBeVisible();

  await page.goto("/central#desconhecido");
  await expect(page).toHaveURL(/\/central#catalogo$/);
  await expect(page.getByRole("tab", { name: "Radar de Catálogo" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("abas respondem ao teclado e mantêm somente o painel ativo disponível", async ({
  page,
}) => {
  await page.goto("/central#catalogo");
  const catalogo = page.getByRole("tab", { name: "Radar de Catálogo" });
  const voltar = page.getByRole("tab", { name: "Vale a pena voltar?" });
  const ordem = page.getByRole("tab", { name: "Ordem para jogar" });

  await catalogo.focus();
  await page.keyboard.press("ArrowRight");
  await expect(voltar).toBeFocused();
  await expect(page).toHaveURL(/#voltar$/);
  await expect(page.getByRole("tabpanel", { name: "Vale a pena voltar?" })).toBeVisible();

  await page.keyboard.press("End");
  await expect(ordem).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(voltar).toBeFocused();
  await page.keyboard.press("Home");
  await expect(catalogo).toBeFocused();

  await expect(page.locator('[role="tabpanel"]:visible')).toHaveCount(1);
  await expect(page.locator('[role="tabpanel"][hidden]')).toHaveCount(2);
});

test("Radar de Catálogo filtra serviços e apresenta movimentos acionáveis", async ({
  page,
}) => {
  await page.goto("/central#catalogo");
  const radar = page.getByTestId("catalog-radar");

  await expect(radar.getByTestId("catalog-card")).toHaveCount(9);
  await expect(radar.getByText("ENTROU", { exact: true })).toHaveCount(3);
  await expect(radar.getByText("SAINDO", { exact: true })).toHaveCount(3);
  await expect(radar.getByText("DISPONÍVEL", { exact: true })).toHaveCount(3);

  await radar.getByRole("button", { name: "Game Pass" }).click();
  await expect(radar.getByTestId("catalog-card")).toHaveCount(3);
  await expect(radar.getByRole("heading", { name: "Starfield" })).toBeVisible();

  await radar.getByRole("button", { name: "PlayStation Plus" }).click();
  await expect(radar.getByTestId("catalog-card")).toHaveCount(3);
  await expect(radar.getByRole("heading", { name: "Resident Evil 4" })).toBeVisible();

  await radar.getByRole("button", { name: "EA Play" }).click();
  await expect(radar.getByTestId("catalog-card")).toHaveCount(3);
  await expect(radar.getByRole("heading", { name: "It Takes Two" })).toBeVisible();

  await radar.getByRole("button", { name: "Todos" }).click();
  const residentEvil = radar.getByTestId("catalog-card").filter({
    has: page.getByRole("heading", { name: "Resident Evil 4" }),
  });
  await expect(residentEvil.getByRole("link", { name: "Resident Evil 4" })).toHaveAttribute(
    "href",
    "/games/resident-evil-4",
  );
  await expect(
    residentEvil.getByRole("button", { name: "Adicionar Resident Evil 4 ao radar" }),
  ).toBeVisible();

  const gta = radar.getByTestId("catalog-card").filter({
    has: page.getByRole("heading", { name: "Grand Theft Auto V" }),
  });
  await expect(gta.getByRole("link")).toHaveCount(0);
  await expect(gta.getByRole("button")).toHaveCount(0);
});

test("Vale a pena voltar compara mudanças, público e veredicto", async ({ page }) => {
  await page.goto("/central#voltar");
  const radar = page.getByTestId("return-radar");

  await expect(radar.getByTestId("return-card")).toHaveCount(6);
  const cyberpunk = radar.getByTestId("return-card").filter({
    has: page.getByRole("heading", { name: "Cyberpunk 2077" }),
  });
  await expect(cyberpunk).toContainText("O QUE MUDOU");
  await expect(cyberpunk).toContainText("progressão e combate");
  await expect(cyberpunk).toContainText("VOLTE AGORA");

  const starfield = radar.getByTestId("return-card").filter({
    has: page.getByRole("heading", { name: "Starfield" }),
  });
  await expect(starfield).toContainText("ESPERE MAIS");
  await expect(starfield).toContainText("Fãs de ficção científica");
  await expect(starfield).toContainText("Ainda vale esperar");
});

test("jogo recomendado no retorno permanece salvo no radar pessoal", async ({ page }) => {
  await page.goto("/central#voltar");
  const button = page.getByRole("button", {
    name: "Adicionar Cyberpunk 2077 ao radar",
  });
  await button.click();
  await expect(
    page.getByRole("button", { name: "Remover Cyberpunk 2077 do radar" }),
  ).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(
    page.getByRole("button", { name: "Remover Cyberpunk 2077 do radar" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("Ordem para jogar destaca o melhor começo e links internos", async ({ page }) => {
  await page.goto("/central#ordem");
  const guide = page.getByTestId("play-order");

  await expect(
    guide.getByRole("heading", { level: 3, name: "Resident Evil" }),
  ).toBeVisible();
  await expect(guide.getByTestId("order-entry")).toHaveCount(6);
  const start = guide.getByTestId("order-entry").filter({
    has: page.getByRole("heading", { name: "Resident Evil", exact: true }),
  });
  await expect(start).toContainText("COMECE AQUI");

  const residentFour = guide.getByTestId("order-entry").filter({
    has: page.getByRole("heading", { name: "Resident Evil 4" }),
  });
  await expect(residentFour.getByRole("link", { name: "Resident Evil 4" })).toHaveAttribute(
    "href",
    "/games/resident-evil-4",
  );
  await expect(
    residentFour.getByRole("button", {
      name: "Adicionar Resident Evil 4 ao radar",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("tabpanel", { name: "Ordem para jogar" }),
  ).toContainText("CURADORIA DEMONSTRATIVA");
});

test("seletor troca entre as quatro franquias e suas linhas do tempo", async ({ page }) => {
  await page.goto("/central#ordem");
  const guide = page.getByTestId("play-order");

  await guide.getByRole("button", { name: "God of War", exact: true }).click();
  await expect(
    guide.getByRole("heading", { level: 3, name: "God of War" }),
  ).toBeVisible();
  await expect(guide.getByTestId("order-entry")).toHaveCount(5);
  await expect(
    guide.getByTestId("order-entry").filter({
      has: page.getByRole("heading", { name: "God of War (2018)" }),
    }),
  ).toContainText("COMECE AQUI");

  await guide.getByRole("button", { name: "Grand Theft Auto", exact: true }).click();
  await expect(guide.getByTestId("order-entry")).toHaveCount(6);
  await expect(guide.getByText("Grand Theft Auto V", { exact: true })).toBeVisible();

  await guide.getByRole("button", { name: "The Witcher", exact: true }).click();
  await expect(guide.getByTestId("order-entry")).toHaveCount(3);
  await expect(
    guide.getByTestId("order-entry").filter({
      has: page.getByRole("heading", { name: "The Witcher 3: Wild Hunt" }),
    }),
  ).toContainText("COMECE AQUI");
});

for (const width of [375, 768, 1440]) {
  test(`Central permanece legível e sem rolagem lateral em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/central#catalogo");
    await expect(page.getByTestId("catalog-radar")).toBeVisible();

    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(layout.content).toBeLessThanOrEqual(layout.viewport);
    await expect
      .poll(() =>
        page.evaluate(() =>
          Array.from(document.querySelectorAll<HTMLElement>('[data-testid="catalog-card"]'))
            .every((card) => Number.parseFloat(getComputedStyle(card).opacity) > 0),
        ),
      )
      .toBe(true);
  });
}

test("scanner anima e troca repetida de abas não gera erros", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/central#catalogo");
  const scanner = page.locator(".intelligence-scanner span");
  const initial = await scanner.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(450);
  const moved = await scanner.evaluate((node) => getComputedStyle(node).transform);
  expect(moved).not.toBe(initial);

  for (let index = 0; index < 4; index += 1) {
    await page.getByRole("tab", { name: "Vale a pena voltar?" }).click();
    await page.getByRole("tab", { name: "Ordem para jogar" }).click();
    await page.getByRole("tab", { name: "Radar de Catálogo" }).click();
  }
  expect(errors).toEqual([]);
});

test("movimento reduzido mantém o scanner estável", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/central#catalogo");
  const scanner = page.locator(".intelligence-scanner span");
  const initial = await scanner.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(450);
  const after = await scanner.evaluate((node) => getComputedStyle(node).transform);
  expect(after).toBe(initial);
  await expect(page.getByTestId("catalog-card").first()).toBeVisible();

  await page.getByRole("tab", { name: "Ordem para jogar" }).click();
  const line = page.locator(".order-timeline-line");
  const lineTransform = await line.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(450);
  await expect(line).toBeVisible();
  expect(await line.evaluate((node) => getComputedStyle(node).transform)).toBe(
    lineTransform,
  );
});

test("linha da ordem é desenhada com GSAP no movimento normal", async ({ page }) => {
  await page.goto("/central#ordem");
  const line = page.locator(".order-timeline-line");
  const initial = await line.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(350);
  const after = await line.evaluate((node) => getComputedStyle(node).transform);
  expect(after).not.toBe(initial);
});

test("textos editoriais dos cards mantêm pelo menos 14px", async ({ page }) => {
  await page.goto("/central#catalogo");
  for (const selector of [
    ".catalog-card-content > p",
    ".return-insight p",
    ".order-entry p",
  ]) {
    if (selector.includes("return")) {
      await page.getByRole("tab", { name: "Vale a pena voltar?" }).click();
    }
    if (selector.includes("order")) {
      await page.getByRole("tab", { name: "Ordem para jogar" }).click();
    }
    const size = await page.locator(selector).first().evaluate((node) =>
      Number.parseFloat(getComputedStyle(node).fontSize),
    );
    expect(size).toBeGreaterThanOrEqual(14);
  }
});

test("abas móveis permanecem horizontais e contidas", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/central#catalogo");
  const layout = await page.locator(".intelligence-tabs").evaluate((node) => {
    const tabs = Array.from(node.children) as HTMLElement[];
    return {
      topPositions: tabs.map((tab) => tab.offsetTop),
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    };
  });
  expect(new Set(layout.topPositions).size).toBe(1);
  expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
});
