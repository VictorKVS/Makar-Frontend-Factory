import { describe, expect, it } from "vitest";
import {
  applyBreakpoint,
  createWorkspace,
  deserializeWorkspace,
  dockPanel,
  floatPanel,
  focusPanel,
  restoreWorkspace,
  serializeWorkspace,
  setPanelCollapsed,
  validateWorkspace,
  type PanelRegistry,
} from "../src";

const registry: PanelRegistry = {
  "knowledge-graph": {
    contentType: "knowledge-graph",
    title: "Knowledge Graph",
    defaultRegion: "center",
    allowedModes: ["docked", "floating"],
  },
  "project-context": {
    contentType: "project-context",
    title: "Project Context",
    defaultRegion: "right",
    allowedModes: ["docked", "floating"],
  },
  "activity-feed": {
    contentType: "activity-feed",
    title: "Activity",
    defaultRegion: "bottom",
    allowedModes: ["docked", "floating"],
  },
};

function sampleWorkspace() {
  return createWorkspace({
    id: "alina-default",
    panels: [
      {
        id: "graph",
        contentType: "knowledge-graph",
        title: "Knowledge Graph",
        region: "center",
        mode: "docked",
        order: 1,
        collapsed: false,
      },
      {
        id: "context",
        contentType: "project-context",
        title: "Project Context",
        region: "right",
        mode: "docked",
        order: 2,
        collapsed: false,
      },
      {
        id: "activity",
        contentType: "activity-feed",
        title: "Activity",
        region: "bottom",
        mode: "docked",
        order: 3,
        collapsed: false,
      },
    ],
  });
}

describe("workspace engine", () => {
  it("creates deterministic sorted state", () => {
    const state = sampleWorkspace();
    expect(state.panels.map((panel) => panel.id)).toEqual(["graph", "context", "activity"]);
    expect(validateWorkspace(state, registry)).toEqual({ valid: true, errors: [] });
  });

  it("docks and floats panels without changing identity", () => {
    const state = sampleWorkspace();
    const floated = floatPanel(state, "context");
    const docked = dockPanel(floated, "context", "left", 0);

    expect(floated.panels.find((panel) => panel.id === "context")?.mode).toBe("floating");
    expect(docked.panels.find((panel) => panel.id === "context")).toMatchObject({
      id: "context",
      mode: "docked",
      region: "left",
      order: 0,
    });
  });

  it("focuses, collapses and restores presentation state", () => {
    const focused = focusPanel(sampleWorkspace(), "graph");
    expect(focused.focusedPanelId).toBe("graph");

    const collapsed = setPanelCollapsed(focused, "graph", true);
    expect(collapsed.focusedPanelId).toBeNull();
    expect(collapsed.panels.find((panel) => panel.id === "graph")?.collapsed).toBe(true);

    const restored = restoreWorkspace(collapsed);
    expect(restored.focusedPanelId).toBeNull();
    expect(restored.panels.every((panel) => !panel.collapsed)).toBe(true);
  });

  it("serializes and restores equivalent workspace state", () => {
    const state = floatPanel(focusPanel(sampleWorkspace(), "context"), "activity");
    const roundTrip = deserializeWorkspace(serializeWorkspace(state));
    expect(roundTrip).toEqual(state);
  });

  it("explicitly transforms layout for mobile while preserving panel ids", () => {
    const state = floatPanel(sampleWorkspace(), "context");
    const mobile = applyBreakpoint(state, "mobile");

    expect(mobile.breakpointMode).toBe("mobile");
    expect(mobile.panels.map((panel) => panel.id)).toEqual(state.panels.map((panel) => panel.id));
    expect(mobile.panels.every((panel) => panel.region === "center" && panel.mode === "docked")).toBe(true);
  });

  it("rejects duplicate panel ids", () => {
    expect(() =>
      createWorkspace({
        id: "bad",
        panels: [
          {
            id: "same",
            contentType: "knowledge-graph",
            title: "One",
            region: "center",
            mode: "docked",
            order: 1,
            collapsed: false,
          },
          {
            id: "same",
            contentType: "project-context",
            title: "Two",
            region: "right",
            mode: "docked",
            order: 2,
            collapsed: false,
          },
        ],
      })
    ).toThrow("Duplicate panel id");
  });
});
