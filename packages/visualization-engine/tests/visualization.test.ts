import { describe, expect, it } from "vitest";
import {
  createVisualizationState,
  deserializeVisualizationState,
  recommendVisualization,
  selectVisualizationForm,
  serializeVisualizationState
} from "../src";

describe("visualization recommendation", () => {
  it("prefers a map for geospatial locate tasks", () => {
    const result = recommendVisualization({
      id: "assets",
      intent: "locate",
      shape: "geo",
      itemCount: 40,
      hasGeo: true
    });

    expect(result.primary).toBe("map");
    expect(result.fallback).toBe("table");
    expect(result.accessibleSummaryRequired).toBe(true);
  });

  it("prefers exact-value table when requested", () => {
    const result = recommendVisualization({
      id: "requirements",
      intent: "compare",
      shape: "records",
      itemCount: 120,
      requiresExactValues: true
    });

    expect(result.primary).toBe("table");
  });

  it("keeps semantic intent ahead of visual novelty", () => {
    const result = recommendVisualization({
      id: "timeline",
      intent: "sequence",
      shape: "events",
      itemCount: 25,
      hasTime: true,
      preferredForms: ["canvas"]
    });

    expect(result.primary).toBe("canvas");
    expect(result.alternates).toContain("timeline");
  });

  it("serializes and restores selected representation", () => {
    const initial = createVisualizationState({
      id: "relations",
      intent: "relate",
      shape: "graph",
      itemCount: 70
    });

    const changed = selectVisualizationForm(initial, "network");
    const restored = deserializeVisualizationState(
      serializeVisualizationState(changed)
    );

    expect(restored.selectedForm).toBe("network");
    expect(restored.request.id).toBe("relations");
  });

  it("rejects forms outside the recommendation set", () => {
    const state = createVisualizationState({
      id: "monitor",
      intent: "monitor",
      shape: "scalar",
      itemCount: 1
    });

    expect(() => selectVisualizationForm(state, "map")).toThrow();
  });
});
