import { expect, test } from "@playwright/test";

test("lançamentos mostra os três jogos e distingue informação não confirmada", async ({
  page,
}) => {
  await page.goto("/releases");

  await expect(
    page.getByRole("heading", { level: 1, name: /Próximos sinais/ }),
  ).toBeVisible();
  await expect(page.locator(".release-card")).toHaveCount(3);
  await page.locator(".release-card").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".release-card").first()).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("heading", { name: "Phantom Blade Zero" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "The Wolf Among Us Remastered" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Grand Theft Auto VI" }),
  ).toBeVisible();
  await expect(
    page.getByText("INFORMAÇÃO A CONFIRMAR", { exact: true }),
  ).toHaveCount(2);
});

test("trailer carrega somente após o clique e devolve o foco ao fechar", async ({
  page,
}) => {
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html><body>Player controlado</body></html>",
    }),
  );
  await page.goto("/releases");
  await expect(page.locator("iframe")).toHaveCount(0);

  const play = page.getByRole("button", {
    name: "Assistir trailer de Grand Theft Auto VI",
  });
  await play.click();
  const dialog = page.getByRole("dialog", {
    name: "Trailer de Grand Theft Auto VI",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/QdBZY2fkU-0/,
  );
  await dialog.getByRole("button", { name: "Fechar trailer" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(play).toBeFocused();
});

test("navegação oferece a página de lançamentos", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Lançamentos" })
    .click();
  await expect(page).toHaveURL(/\/releases$/);
});
