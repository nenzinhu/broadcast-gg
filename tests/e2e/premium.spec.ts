import { test, expect } from "@playwright/test";
for (const width of [375, 768, 1440]) {
  test(`premium layouts stay readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of [
      "/",
      "/signals",
      "/deals",
      "/discover",
      "/radar",
      "/games/elden-ring",
    ]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("p")
          .evaluateAll((elements) =>
            elements
              .filter(
                (e) =>
                  e.getClientRects().length &&
                  !e.classList.contains("section-footnote") &&
                  !e.classList.contains("disclaimer"),
              )
              .every((e) => parseFloat(getComputedStyle(e).fontSize) >= 14),
          ),
      ).toBe(true);
      expect(
        await page
          .locator(".eyebrow")
          .evaluateAll((elements) =>
            elements
              .filter((e) => e.getClientRects().length)
              .every((e) => parseFloat(getComputedStyle(e).fontSize) >= 11),
          ),
      ).toBe(true);
      const images = page.locator("img");
      for (let i = 0; i < (await images.count()); i++) {
        await images.nth(i).scrollIntoViewIfNeeded();
        await expect(images.nth(i)).toHaveJSProperty("complete", true);
        await expect(images.nth(i)).not.toHaveJSProperty("naturalWidth", 0);
      }
      if (route === "/") {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: `/tmp/premium-home-${width}.png`,
          fullPage: true,
        });
      }
    }
    expect(errors).toEqual([]);
  });
}
test("normal motion survives repeated route and filter changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Updates", exact: true }).click();
  await page.locator("#deals").scrollIntoViewIfNeeded();
  await expect(page.locator("#deals .section-heading")).toHaveCSS(
    "opacity",
    "1",
  );
  await page
    .getByRole("link", { name: "Explorar preços", exact: true })
    .click();
  await page.getByRole("searchbox").fill("hades");
  await expect(page.locator(".deal-card")).toHaveCount(1);
  await page
    .locator(".deal-card")
    .getByRole("link", { name: "Hades II", exact: true })
    .click();
  await page.locator(".game-purchase").scrollIntoViewIfNeeded();
  await expect(page.locator(".game-purchase")).toHaveCSS("opacity", "1");
  await page.getByRole("link", { name: "BROADCAST.GG início" }).click();
  await page.locator("#discover").scrollIntoViewIfNeeded();
  await expect(page.locator(".discover-card").last()).toHaveCSS("opacity", "1");
});
