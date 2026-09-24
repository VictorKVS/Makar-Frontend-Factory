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

    await expect(page.getByRole("heading", { name: "ALINA Engineering Lab" })).toBeVisible();
    await expect(page.getByText("DEMO / MOCK", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Glass / Glow / Depth")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Workspace Engine" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Information Stream Engine" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Visualization Engine" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Avatar Engine" })).toBeVisible();

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

test("reduced-motion disables decorative avatar animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const orbit = page.locator(".avatar-stage-orbit").first();
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

test("visualization engine keeps an exact-value fallback available", async ({ page }) => {
  await page.goto("/");

  const viz = page.locator(".viz-lab");
  await expect(viz.getByRole("heading", { name: "Visualization Engine" })).toBeVisible();
  await expect(viz.getByText("ACCESSIBLE FALLBACK", { exact: true })).toBeVisible();

  await viz.getByRole("button", { name: "table", exact: true }).click();
  await expect(viz.getByRole("table")).toBeVisible();
  await expect(viz.getByRole("cell", { name: "92%" })).toBeVisible();
});

test("avatar mode changes preserve task and attention state", async ({ page }) => {
  await page.goto("/");

  const avatar = page.locator(".avatar-lab");
  const stage = avatar.locator(".avatar-stage");

  await expect(stage).toHaveAttribute("data-avatar-mode", "hologram");
  await expect(avatar.getByText("M0.6", { exact: true })).toBeVisible();
  await expect(avatar.getByText("Knowledge Graph", { exact: true }).first()).toBeVisible();

  await avatar.getByRole("button", { name: "voice-only", exact: true }).click();

  await expect(stage).toHaveAttribute("data-avatar-mode", "voice-only");
  await expect(avatar.getByText("M0.6", { exact: true })).toBeVisible();
  await expect(avatar.getByText("Knowledge Graph", { exact: true }).first()).toBeVisible();
});

test("avatar renderer negotiation falls back without losing persona state", async ({ page }) => {
  await page.goto("/");

  const avatar = page.locator(".avatar-lab");
  const stage = avatar.locator(".avatar-stage");

  await avatar.getByRole("button", { name: "hologram", exact: true }).click();
  await avatar.getByRole("button", { name: "Accessible 2D", exact: true }).click();

  await expect(stage).toHaveAttribute("data-avatar-mode", "portrait");
  await expect(avatar.getByText("DEGRADED", { exact: true })).toBeVisible();
  await expect(avatar.getByText("ALINA", { exact: true }).first()).toBeVisible();
});
