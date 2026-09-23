import { expect, test } from "@playwright/test";

const viewports = [
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1920, height: 1080 },
  { name: "ultrawide", width: 2560, height: 1080 },
] as const;

for (const viewport of viewports) {
  test(`renders ALINA lab at ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "ALINA Visual Token Lab" })).toBeVisible();
    await expect(page.getByText("DEMO / MOCK", { exact: true })).toBeVisible();
    await expect(page.getByText("Glass / Glow / Depth")).toBeVisible();

    await page.screenshot({
      path: testInfo.outputPath(`alina-${viewport.name}.png`),
      fullPage: true,
    });
  });
}

test("keyboard navigation exposes visible focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const firstNav = page.getByRole("button", { name: /Knowledge Base/ });
  await expect(firstNav).toBeFocused();

  const outlineStyle = await firstNav.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outlineStyle).not.toBe("none");
});

test("reduced-motion disables decorative orbit animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const orbit = page.locator(".avatar-orbit").first();
  await expect(orbit).toBeVisible();

  const animationName = await orbit.evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
});
