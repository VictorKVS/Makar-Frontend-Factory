import { describe, expect, it } from "vitest";
import {
  composeInterface,
  deserializeCompositionPlan,
  serializeCompositionPlan
} from "../src";

const allModules = [
  "sources",
  "knowledge-graph",
  "context",
  "agent-activity",
  "editor",
  "project-tree",
  "terminal",
  "visualization",
  "alerts",
  "timeline",
  "document"
];

describe("composition engine", () => {
  it("builds research around knowledge graph without promoting background activity", () => {
    const plan = composeInterface({
      scenario: "research",
      breakpoint: "desktop",
      performanceTier: "enhanced",
      reducedMotion: false,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules
    });

    expect(plan.primaryModuleId).toBe("knowledge-graph");
    expect(plan.avatar.presence).toBe("compact");
    expect(plan.modules.find((item) => item.id === "agent-activity")?.collapsed).toBe(true);
  });

  it("uses cinematic hologram for presentation on capable layout", () => {
    const plan = composeInterface({
      scenario: "presentation",
      breakpoint: "ultrawide",
      performanceTier: "cinematic",
      reducedMotion: false,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules
    });

    expect(plan.primaryModuleId).toBe("visualization");
    expect(plan.avatar.presence).toBe("hologram");
    expect(plan.density).toBe("spacious");
  });

  it("downgrades presentation on reduced-motion while preserving task composition", () => {
    const plan = composeInterface({
      scenario: "presentation",
      breakpoint: "desktop",
      performanceTier: "cinematic",
      reducedMotion: true,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules
    });

    expect(plan.primaryModuleId).toBe("visualization");
    expect(plan.avatar.presence).toBe("portrait");
    expect(plan.reasons).toContain("avatar:reduced-motion:hologram->portrait");
  });

  it("collapses non-primary modules on mobile", () => {
    const plan = composeInterface({
      scenario: "research",
      breakpoint: "mobile",
      performanceTier: "core",
      reducedMotion: true,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules
    });

    const primary = plan.modules.find((item) => item.id === "knowledge-graph");
    const context = plan.modules.find((item) => item.id === "context");

    expect(primary?.region).toBe("center");
    expect(primary?.collapsed).toBe(false);
    expect(context?.region).toBe("bottom");
    expect(context?.collapsed).toBe(true);
  });

  it("surfaces qualifying alert as overlay without replacing primary task", () => {
    const plan = composeInterface({
      scenario: "security",
      breakpoint: "desktop",
      performanceTier: "enhanced",
      reducedMotion: false,
      primaryStreamClass: "primary",
      interruptingAlert: true,
      availableModules: allModules
    });

    const alert = plan.modules.find((item) => item.id === "alerts");

    expect(plan.primaryModuleId).toBe("visualization");
    expect(alert?.region).toBe("overlay");
    expect(alert?.visible).toBe(true);
  });

  it("keeps interrupting alerts in overlay on mobile", () => {
    const plan = composeInterface({
      scenario: "security",
      breakpoint: "mobile",
      performanceTier: "core",
      reducedMotion: true,
      primaryStreamClass: "primary",
      interruptingAlert: true,
      availableModules: allModules
    });

    const alert = plan.modules.find((item) => item.id === "alerts");

    expect(alert?.region).toBe("overlay");
    expect(alert?.collapsed).toBe(false);
  });

  it("honors human primary and region overrides", () => {
    const plan = composeInterface({
      scenario: "research",
      breakpoint: "desktop",
      performanceTier: "enhanced",
      reducedMotion: false,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules,
      overrides: {
        primaryModuleId: "context",
        moduleRegions: { context: "center" },
        avatarPresence: "voice-only"
      }
    });

    expect(plan.primaryModuleId).toBe("context");
    expect(plan.modules.find((item) => item.id === "context")?.locked).toBe(true);
    expect(plan.avatar.presence).toBe("voice-only");
    expect(plan.avatar.locked).toBe(true);
  });

  it("preserves locked human overrides during responsive transforms", () => {
    const plan = composeInterface({
      scenario: "research",
      breakpoint: "mobile",
      performanceTier: "core",
      reducedMotion: true,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules,
      overrides: {
        primaryModuleId: "context",
        moduleRegions: { context: "right" },
        avatarPresence: "hologram"
      }
    });

    const context = plan.modules.find((item) => item.id === "context");

    expect(context?.region).toBe("right");
    expect(context?.locked).toBe(true);
    expect(plan.avatar.presence).toBe("hologram");
    expect(plan.avatar.locked).toBe(true);
  });

  it("serializes and restores the plan", () => {
    const plan = composeInterface({
      scenario: "focus",
      breakpoint: "laptop",
      performanceTier: "core",
      reducedMotion: false,
      primaryStreamClass: "primary",
      interruptingAlert: false,
      availableModules: allModules
    });

    const restored = deserializeCompositionPlan(serializeCompositionPlan(plan));
    expect(restored).toEqual(plan);
  });
});
