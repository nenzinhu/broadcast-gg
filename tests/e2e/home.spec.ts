import { test, expect } from "@playwright/test";
test("homepage, filters, decisions, favorites and accessible details", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "O QUE MUDOU.O QUE IMPORTA.O QUE JOGAR.",
  );
  await expect(page.locator(".signal-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Atualizações", exact: true }).click();
  await expect(page.locator(".signal-card")).toHaveCount(1);
  await expect(page.locator(".signal-type")).toHaveText("UPDATE SIGNAL");
  await page.getByRole("button", { name: "Todos os sinais" }).click();
  await expect(page.locator(".signal-card")).toHaveCount(3);
  const selector = page.getByLabel("ESCOLHA SEU PRÓXIMO JOGO");
  await expect(page.locator(".verdict strong")).toHaveText("BUY");
  await selector.selectOption("elden-ring");
  await expect(page.locator(".verdict strong")).toHaveText("WAIT");
  await selector.selectOption("starfield");
  await expect(page.locator(".verdict strong")).toHaveText("SKIP");
  expect(errors).toEqual([]);
});
test("favorites persist and game details restore keyboard focus", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Adicionar Cyberpunk 2077 ao radar",
      exact: true,
    })
    .first()
    .click();
  await expect(page.locator("#radar .tracked-row")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("#radar .tracked-row")).toContainText(
    "Cyberpunk 2077",
  );
  await page
    .locator("#radar")
    .getByRole("button", { name: "Remover Cyberpunk 2077 do radar" })
    .click();
  await expect(page.locator(".radar-empty")).toBeVisible();
  const details = page.getByRole("button", { name: "Conhecer Hollow Knight" });
  await details.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(details).toBeFocused();
  expect(errors).toEqual([]);
});
test("invalid and blocked storage remain usable", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("broadcast-gg:radar:v1", "{bad json"),
  );
  await page.goto("/");
  await expect(page.locator(".radar-empty")).toBeVisible();
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.reload();
  await expect(page.getByRole("status")).toContainText("apenas nesta sessão");
  await page
    .getByRole("button", {
      name: "Adicionar Cyberpunk 2077 ao radar",
      exact: true,
    })
    .first()
    .click();
  await expect(page.locator("#radar .tracked-row")).toHaveCount(1);
});
test("mobile and reduced motion preserve content and valid navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')].every((link) =>
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ),
    ),
  ).toBe(true);
  await page.locator("#discover").scrollIntoViewIfNeeded();
  await expect(page.locator(".discover-card").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.screenshot({ path: "/tmp/broadcast-mobile.png", fullPage: true });
});
test("desktop visual capture", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/broadcast-desktop.png", fullPage: true });
});
test("normal-motion mobile reveals follow filter layout changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: "Atualizações", exact: true }).click();
  await page.locator("#deals").scrollIntoViewIfNeeded();
  await expect(page.locator("#deals .section-heading")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".deal-card").first()).toHaveCSS("opacity", "1");
  await page.locator("#decision").scrollIntoViewIfNeeded();
  await expect(page.locator("#decision")).toHaveCSS("opacity", "1");
});
