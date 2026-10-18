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
