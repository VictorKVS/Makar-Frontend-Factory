import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1920, height: 1080 },
  { name: "ultrawide", width: 2560, height: 1080 },
] as const;

async function openDiagnostics(page: Page) {
  const disclosure = page.locator(".engineering-diagnostics");
  if (!(await disclosure.evaluate((node) => (node as HTMLDetailsElement).open))) {
    await disclosure.locator(":scope > summary").click();
  }
}

for (const viewport of viewports) {
  test("renders ALINA product shell at " + viewport.name, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    const shell = page.locator(".alina-product-shell");
    await expect(page.getByRole("heading", { name: "ALINA", exact: true })).toBeVisible();
    await expect(shell.getByText("DEMO / MOCK", { exact: true })).toBeVisible();
    await expect(shell).toHaveAttribute("data-scenario", "research");
    await expect(shell).toHaveAttribute("data-primary-module", "knowledge-graph");
    await expect(shell).toHaveAttribute("data-performance-tier", "cinematic");

    await page.screenshot({
      path: testInfo.outputPath("alina-product-" + viewport.name + ".png"),
      fullPage: true,
    });
  });
}

test("keyboard navigation exposes visible focus in the product shell", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const firstNav = page.getByRole("button", { name: /Workspace/ }).first();
  await expect(firstNav).toBeFocused();

  const outlineStyle = await firstNav.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outlineStyle).not.toBe("none");
});

test("scenario switching changes primary context and avatar presence", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");

  await shell.getByRole("button", { name: "Security", exact: true }).click();
  await expect(shell).toHaveAttribute("data-scenario", "security");
  await expect(shell).toHaveAttribute("data-primary-module", "security-graph");
  await expect(shell.getByText("Security stream requests interruption", { exact: true })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("alina-security.png"),
    fullPage: true,
  });

  await shell.getByRole("button", { name: "Presentation", exact: true }).click();
  await expect(shell).toHaveAttribute("data-scenario", "presentation");
  await expect(shell).toHaveAttribute("data-primary-module", "visualization");
  await expect(shell).toHaveAttribute("data-avatar-presence", "hologram");
  await page.screenshot({
    path: testInfo.outputPath("alina-presentation.png"),
    fullPage: true,
  });

  await shell.getByRole("button", { name: "Focus", exact: true }).click();
  await expect(shell).toHaveAttribute("data-scenario", "focus");
  await expect(shell).toHaveAttribute("data-primary-module", "document-or-editor");
  await expect(shell).toHaveAttribute("data-avatar-presence", "hidden");
  await expect(shell.getByText("state retained", { exact: true })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("alina-focus.png"),
    fullPage: true,
  });
});

test("Core performance tier preserves the task and degrades avatar presentation", async ({ page }) => {
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  await shell.getByRole("button", { name: "Presentation", exact: true }).click();
  await shell.getByRole("button", { name: "core", exact: true }).click();

  await expect(shell).toHaveAttribute("data-performance-tier", "core");
  await expect(shell).toHaveAttribute("data-primary-module", "visualization");
  await expect(shell).toHaveAttribute("data-avatar-presence", "portrait");
  await expect(shell.getByText("PRIMARY NARRATIVE", { exact: true })).toBeVisible();
});

test("reduced motion disables decorative ALINA orbit animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const orbit = page.locator(".alina-avatar-rings span").first();
  await expect(orbit).toBeVisible();

  const animationName = await orbit.evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
});

test("command plane preserves semantic interaction", async ({ page }) => {
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  const input = shell.getByPlaceholder("Спросите ALINA или поставьте задачу агенту…");

  await input.fill("Проверь контекст проекта");
  await shell.getByRole("button", { name: "Отправить", exact: true }).click();

  await expect(shell.getByText(/Research mode. Проверь контекст проекта/)).toBeVisible();
});

test("engineering diagnostics stay available without becoming the homepage", async ({ page }) => {
  await page.goto("/");

  const diagnostics = page.locator(".engineering-diagnostics");
  await expect(diagnostics).not.toHaveAttribute("open", "");

  await openDiagnostics(page);

  await expect(page.getByRole("heading", { name: "Makar Provisioning" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Composition Engine" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Workspace Engine" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Avatar Engine" })).toBeVisible();
});

test("Agent Factory feedback routing remains inspectable in diagnostics", async ({ page }) => {
  await page.goto("/");
  await openDiagnostics(page);

  const factory = page.locator(".factory-lab");
  await expect(factory).toHaveAttribute("data-selected-knowledge", "3");

  await factory.getByRole("button", { name: "Repository gap", exact: true }).click();

  await expect(factory).toHaveAttribute("data-feedback-route", "repository-contract");
  await expect(factory.getByRole("heading", { name: "repository-contract" })).toBeVisible();
});

test("workspace diagnostics remain operational", async ({ page }) => {
  await page.goto("/");
  await openDiagnostics(page);

  const workspace = page.locator(".workspace-demo");
  await workspace.getByRole("button", { name: "Focus Graph" }).click();

  await expect(workspace.locator('[data-panel-id="graph"]')).toBeVisible();
  await expect(workspace.locator('[data-panel-id="context"]')).toHaveCount(0);
  await expect(workspace.locator('[data-panel-id="activity"]')).toHaveCount(0);
});
