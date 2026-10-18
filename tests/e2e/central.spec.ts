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
