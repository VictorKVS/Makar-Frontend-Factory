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
    await expect(page.getByText("DEMO / MOCK", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Glass / Glow / Depth")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Workspace Engine" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Information Stream Engine" })).toBeVisible();

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

test("workspace focus preserves panel identity and isolates the focused module", async ({ page }) => {
  await page.goto("/");

  const workspace = page.locator(".workspace-demo");
  await expect(workspace.locator('[data-panel-id="graph"]')).toBeVisible();
  await expect(workspace.locator('[data-panel-id="context"]')).toBeVisible();
  await expect(workspace.locator('[data-panel-id="activity"]')).toBeVisible();

  await workspace.getByRole("button", { name: "Focus Graph" }).click();

  await expect(workspace.locator('[data-panel-id="graph"]')).toBeVisible();
  await expect(workspace.locator('[data-panel-id="context"]')).toHaveCount(0);
  await expect(workspace.locator('[data-panel-id="activity"]')).toHaveCount(0);

  const state = workspace.locator(".workspace-state-preview");
  await state.getByText("Serializable workspace state").click();
  await expect(state.locator("pre")).toContainText('"focusedPanelId": "graph"');
});

test("workspace mode changes are explicit and serializable", async ({ page }) => {
  await page.goto("/");

  const workspace = page.locator(".workspace-demo");
  const context = workspace.locator('[data-panel-id="context"]');

  await workspace.getByRole("button", { name: "Float Context" }).click();
  await expect(context).toHaveClass(/mode-floating/);
  await expect(context).toContainText("floating");

  await workspace.getByRole("button", { name: "Dock Context Left" }).click();
  await expect(context).toHaveClass(/region-left/);
  await expect(context).toContainText("docked");

  await workspace.getByRole("button", { name: "Mobile Transform" }).click();

  for (const id of ["graph", "context", "activity"]) {
    await expect(workspace.locator(`[data-panel-id="${id}"]`)).toBeVisible();
  }

  const state = workspace.locator(".workspace-state-preview");
  await state.getByText("Serializable workspace state").click();
  await expect(state.locator("pre")).toContainText('"breakpointMode": "mobile"');
});

test("stream engine keeps primary attention separate from background noise", async ({ page }) => {
  await page.goto("/");

  const stream = page.locator(".stream-demo");
  const primaryZone = stream.locator(".stream-primary-zone");

  await expect(primaryZone.locator('[data-stream-id="primary-analysis"]')).toBeVisible();
  await expect(primaryZone.locator('[data-stream-id="background-index"]')).toHaveCount(0);

  const rankedFeed = stream.locator(".stream-feed");
  await expect(rankedFeed.locator('[data-stream-id="background-index"]')).toBeVisible();
  await expect(rankedFeed.locator('[data-stream-id="agent-makar"]')).toBeVisible();
});

test("acknowledging an alert stops its interruption state", async ({ page }) => {
  await page.goto("/");

  const stream = page.locator(".stream-demo");
  const alert = stream.locator('.stream-feed [data-stream-id="alert-security"]');

  await expect(stream.getByText("alert may interrupt", { exact: true })).toBeVisible();
  await expect(alert).toHaveAttribute("data-acknowledged", "false");

  await alert.getByRole("button", { name: "Acknowledge alert" }).click();

  await expect(alert).toHaveAttribute("data-acknowledged", "true");
  await expect(alert.getByText("ACKNOWLEDGED", { exact: true })).toBeVisible();
  await expect(stream.getByText("attention stable", { exact: true })).toBeVisible();
});
