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
    await expect(shell).toHaveAttribute("data-provenance-origin", "demo");
    await expect(shell).toHaveAttribute("data-data-state", "ready");

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
  await expect(shell.locator(".alina-alert-overlay").getByText("Security stream requests interruption", { exact: true })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("alina-security.png"),
    fullPage: true,
  });

  await shell.getByRole("button", { name: "Presentation", exact: true }).click();
  await expect(shell).toHaveAttribute("data-scenario", "presentation");
  await expect(shell).toHaveAttribute("data-primary-module", "visualization");
  await expect(shell).toHaveAttribute("data-avatar-presence", "hologram");
  const presentationAvatar = shell.locator(".alina-avatar-surface");
  const cinematicScene = shell.locator(".alina-cinematic-scene");
  await expect(presentationAvatar).toHaveAttribute("data-avatar-requested", "hologram");
  await expect(presentationAvatar).toHaveAttribute("data-avatar-resolved", "hologram");

  const webgl3d = await cinematicScene.getAttribute("data-scene-3d");
  if (webgl3d === "true") {
    await expect(presentationAvatar).toHaveAttribute("data-avatar-renderer", "alina-webgl-cinematic");
    await expect(presentationAvatar).toHaveAttribute("data-avatar-3d", "true");
    await expect(presentationAvatar.getByText("missing:3d", { exact: true })).toHaveCount(0);
  } else {
    await expect(presentationAvatar).toHaveAttribute("data-avatar-renderer", "alina-dom-cinematic-proxy");
    await expect(presentationAvatar).toHaveAttribute("data-avatar-degraded", "true");
    await expect(presentationAvatar.getByText("missing:3d", { exact: true })).toBeVisible();
  }
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
  const avatar = shell.locator(".alina-avatar-surface");
  await expect(avatar).toHaveAttribute("data-avatar-resolved", "portrait");
  await expect(avatar).toHaveAttribute("data-avatar-renderer", "alina-dom-core");
  await expect(avatar).toHaveAttribute("data-avatar-degraded", "true");
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

  await input.focus();
  await expect(shell).toHaveAttribute("data-avatar-activity", "listening");

  await input.fill("Проверь контекст проекта");
  await shell.getByRole("button", { name: "Отправить", exact: true }).click();

  await expect(shell.getByText(/Research mode. DEMO command accepted · demo:ui-1/)).toBeVisible();
  await expect(shell).toHaveAttribute("data-avatar-activity", "speaking");
  await expect(shell.locator(".alina-avatar-surface")).toHaveAttribute("data-avatar-activity", "speaking");
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


test("Research Knowledge Graph supports inspect, focus and accessible fallback", async ({ page }) => {
  await page.goto("/");

  const workspace = page.getByRole("region", { name: "Knowledge Graph Workspace" });
  await expect(workspace).toBeVisible();
  await expect(workspace).toHaveAttribute("data-graph-mode", "graph");

  const fact = workspace.getByRole("button", { name: "fact: Факт" });
  await fact.click();
  await expect(workspace).toHaveAttribute("data-selected-node", "fact-1");
  await expect(workspace.getByText("92%", { exact: true })).toBeVisible();

  await workspace.getByRole("button", { name: "Focus neighborhood", exact: true }).click();
  await expect(workspace).toHaveAttribute("data-focused-node", "fact-1");

  await workspace.getByRole("button", { name: "hypothesis", exact: true }).click();
  await expect(workspace.getByRole("button", { name: "hypothesis: Гипотеза" })).toHaveCount(0);

  await workspace.getByRole("button", { name: "Accessible list", exact: true }).click();
  await expect(workspace).toHaveAttribute("data-graph-mode", "list");
  await expect(workspace.getByText("supports", { exact: true })).toBeVisible();
});


test("avatar renderer adapter preserves scenario intent and stable asset identity", async ({ page }) => {
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  const avatar = shell.locator(".alina-avatar-surface");

  await expect(avatar).toHaveAttribute("data-avatar-requested", "bust");
  await expect(avatar).toHaveAttribute("data-avatar-resolved", "bust");
  await expect(avatar).toHaveAttribute("data-avatar-asset", "asset:alina:bust:v1");

  await shell.getByRole("button", { name: "Coding", exact: true }).click();
  await expect(avatar).toHaveAttribute("data-avatar-requested", "compact");
  await expect(avatar).toHaveAttribute("data-avatar-resolved", "compact");
  await expect(avatar).toHaveAttribute("data-avatar-asset", "asset:alina:portrait:v1");

  await shell.getByRole("button", { name: "Focus", exact: true }).click();
  await expect(avatar).toHaveAttribute("data-avatar-resolved", "hidden");
  await expect(avatar.getByText("state retained", { exact: true })).toBeVisible();
});


test("cinematic scene capability is truthful and Core disposes WebGL ownership", async ({ page }) => {
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  const scene = shell.locator(".alina-cinematic-scene");

  await expect(scene).toHaveAttribute("data-scene-tier", /cinematic|enhanced/);

  const initial3d = await scene.getAttribute("data-scene-3d");
  if (initial3d === "true") {
    await expect(scene).toHaveAttribute("data-scene-adapter", "webgl-cinematic");
    await expect(shell).toHaveAttribute("data-cinematic-3d", "true");
  } else {
    await expect(scene).toHaveAttribute("data-scene-adapter", "dom-enhanced");
    await expect(shell).toHaveAttribute("data-cinematic-3d", "false");
  }

  await shell.getByRole("button", { name: "core", exact: true }).click();

  await expect(scene).toHaveAttribute("data-scene-adapter", "dom-core");
  await expect(scene).toHaveAttribute("data-scene-3d", "false");
  await expect(shell).toHaveAttribute("data-cinematic-3d", "false");
});


test("M1.7 acceptance matrix keeps every scenario usable across all performance tiers", async ({ page }) => {
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  const scenarios = [
    ["Research", "research", "knowledge-graph"],
    ["Coding", "coding", "editor"],
    ["Security", "security", "security-graph"],
    ["Presentation", "presentation", "visualization"],
    ["Focus", "focus", "document-or-editor"],
  ] as const;

  const tiers = ["core", "enhanced", "cinematic"] as const;

  for (const tier of tiers) {
    await shell.getByRole("button", { name: tier, exact: true }).click();
    await expect(shell).toHaveAttribute("data-performance-tier", tier);

    for (const [label, scenarioId, primary] of scenarios) {
      await shell.getByRole("button", { name: label, exact: true }).click();

      await expect(shell).toHaveAttribute("data-scenario", scenarioId);
      await expect(shell).toHaveAttribute("data-primary-module", primary);
      await expect(shell).toHaveAttribute("data-provenance-origin", "demo");
      await expect(shell.locator(".alina-primary-plane")).toBeVisible();
      await expect(
        shell.getByPlaceholder("Спросите ALINA или поставьте задачу агенту…")
      ).toBeVisible();

      if (tier === "core") {
        await expect(shell.locator(".alina-cinematic-scene")).toHaveAttribute(
          "data-scene-3d",
          "false"
        );
      }
    }
  }
});

test("narrow acceptance keeps primary task and command plane usable", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  await expect(shell).toHaveAttribute("data-scenario", "research");
  await expect(shell.locator(".alina-primary-plane")).toBeVisible();
  await expect(
    shell.getByPlaceholder("Спросите ALINA или поставьте задачу агенту…")
  ).toBeVisible();

  const graph = page.getByRole("region", { name: "Knowledge Graph Workspace" });
  await expect(graph).toBeVisible();

  await graph.getByRole("button", { name: "Accessible list", exact: true }).click();
  await expect(graph).toHaveAttribute("data-graph-mode", "list");

  await page.screenshot({
    path: testInfo.outputPath("alina-product-narrow.png"),
    fullPage: true,
  });
});

test("reduced-motion acceptance preserves semantic state while stopping cinematic animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const shell = page.locator(".alina-product-shell");
  const scene = shell.locator(".alina-cinematic-scene");

  await shell.getByRole("button", { name: "Presentation", exact: true }).click();
  await expect(shell).toHaveAttribute("data-primary-module", "visualization");

  const webgl = await scene.getAttribute("data-scene-webgl");
  if (webgl === "true") {
    await expect(scene).toHaveAttribute("data-scene-animated", "false");
  }

  await expect(shell.locator(".alina-avatar-surface")).toHaveAttribute(
    "data-avatar-requested",
    "hologram"
  );
});
