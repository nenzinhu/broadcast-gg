import { test, expect } from "@playwright/test";
const shot = {
  id: 1,
  thumbnail: "https://shared.fastly.steamstatic.com/test-media.svg",
  full: "https://shared.fastly.steamstatic.com/test-media.svg",
};
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="338"><rect width="600" height="338" fill="#264766"/></svg>';
test("trailer loads only after click and can be closed", async ({ page }) => {
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html><body>Controlled player fixture</body></html>",
    }),
  );
  await page.goto("/games/elden-ring");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Assistir trailer de Elden Ring" })
    .click();
  await expect(
    page.getByTitle("Trailer de Elden Ring no YouTube"),
  ).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/E3Huy2cdih0?autoplay=1&rel=0",
  );
  await page.getByRole("button", { name: "Fechar trailer" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Assistir trailer de Elden Ring" }),
  ).toBeFocused();
});
test("gameplay gallery recovers from error and opens an accessible lightbox with a controlled fixture", async ({
  page,
}) => {
  let requests = 0;
  await page.route("**/api/games/elden-ring/media", (route) => {
    requests++;
    return requests === 1
      ? route.fulfill({ status: 502, json: { error: "unavailable" } })
      : route.fulfill({ json: { screenshots: [shot] } });
  });
  await page.route(
    "https://shared.fastly.steamstatic.com/test-media.svg",
    (route) => route.fulfill({ contentType: "image/svg+xml", body: svg }),
  );
  await page.goto("/games/elden-ring");
  await expect(
    page.getByText("As capturas de gameplay não puderam ser carregadas agora."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tentar novamente" }).click();
  const screenshot = page.getByRole("button", {
    name: "Ampliar gameplay 1 de Elden Ring",
  });
  await screenshot.click();
  await expect(
    page.getByRole("dialog", { name: "Gameplay de Elden Ring" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(screenshot).toBeFocused();
  expect(requests).toBe(2);
});
test("unavailable official artwork has an identified local fallback", async ({
  page,
}) => {
  await page.route("**/art/*.{png,jpg}", (route) => route.abort());
  await page.goto("/deals");
  await expect(
    page
      .locator(".deal-card")
      .first()
      .getByAltText("Arte conceitual alternativa para Cyberpunk 2077"),
  ).toBeVisible();
  await expect(page.locator(".deal-card").first()).toContainText(
    "ARTE ALTERNATIVA",
  );
});
test("GSAP lifts interactive cards and reduced motion disables the effect", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/deals");
  const card = page.locator(".deal-card").first();
  await card.hover();
  const translation = () =>
    card.evaluate((el) => {
      const transform = getComputedStyle(el).transform;
      return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
    });
  await expect.poll(translation).toBeLessThan(-2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(translation).toBe(0);
});

test("gameplay CDN failure offers recovery even after a successful API response", async ({
  page,
}) => {
  await page.route("**/api/games/elden-ring/media", (route) =>
    route.fulfill({ json: { screenshots: [shot] } }),
  );
  await page.route(shot.thumbnail, (route) => route.abort());
  await page.goto("/games/elden-ring");
  await page.locator(".gameplay-heading").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Tentar novamente" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Ver gameplay na Steam" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Ampliar gameplay/ }),
  ).toHaveCount(0);
});
