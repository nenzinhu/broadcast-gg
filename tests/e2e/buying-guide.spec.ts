import { expect, test } from "@playwright/test";

test("cada jogo apresenta um guia editorial antes da compra", async ({
  page,
}) => {
  await page.goto("/games/cyberpunk-2077");
  const guide = page.getByRole("region", { name: "Antes de comprar" });
  await expect(guide).toBeVisible();
  await expect(
    guide.getByRole("heading", { name: "Antes de comprar" }),
  ).toBeVisible();
  await expect(guide.getByText("VOCÊ VAI CURTIR SE")).toBeVisible();
  await expect(guide.getByText("PENSE DUAS VEZES SE")).toBeVisible();
  await expect(guide.getByText("SITUAÇÃO TÉCNICA")).toBeVisible();
  await expect(guide.getByText("VEREDITO EDITORIAL")).toBeVisible();
  await expect(guide).toContainText("Night City");

  await page.goto("/games/starfield");
  const secondGuide = page.getByRole("region", { name: "Antes de comprar" });
  await expect(secondGuide).toBeVisible();
  await expect(secondGuide).toContainText("exploração espacial");
  await expect(secondGuide).not.toContainText("Night City");
});

test("guia permanece legível no celular", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/games/clair-obscur-expedition-33");
  const guide = page.getByRole("region", { name: "Antes de comprar" });
  await guide.scrollIntoViewIfNeeded();
  await expect(guide).toBeVisible();
  await expect(guide.locator(".buying-guide-card")).toHaveCount(4);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
