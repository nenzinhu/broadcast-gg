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
