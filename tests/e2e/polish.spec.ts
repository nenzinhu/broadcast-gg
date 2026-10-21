import { expect, test } from "@playwright/test";

test("homepage apresenta caminhos rápidos do radar", async ({ page }) => {
  await page.goto("/");

  const strip = page.getByTestId("hero-signal-strip");
  await expect(strip).toBeVisible();
  await expect(strip.getByText("18", { exact: true })).toBeVisible();
  await expect(strip).toContainText("jogos no radar");
  await expect(strip).toContainText("Sinais de preço");
  await expect(strip).toContainText("Central de inteligência");
  await expect(strip.getByRole("link", { name: /Preview/ })).toHaveAttribute(
    "href",
    "/preview",
  );
});

for (const width of [375, 768]) {
  test(`deck do radar permanece contido em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const layout = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(layout.content).toBeLessThanOrEqual(layout.viewport);
    await expect(page.getByTestId("hero-signal-strip")).toBeVisible();
  });
}
