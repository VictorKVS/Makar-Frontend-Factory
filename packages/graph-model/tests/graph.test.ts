import { describe, expect, it } from "vitest";
import {
  contradictionEdges,
  createGraphWorkspaceState,
  deriveGraphView,
  deserializeGraphState,
  focusNode,
  neighborhood,
  serializeGraphState,
  setVisibleKinds,
  type GraphDocument,
} from "../src";

const graph: GraphDocument = {
  id: "research",
  title: "Research",
  nodes: [
    { id: "fact", label: "Fact", kind: "fact", confidence: 0.96 },
    { id: "source", label: "Source", kind: "source", confidence: 1 },
    { id: "entity", label: "Entity", kind: "entity", confidence: 0.9 },
    { id: "hypothesis", label: "Hypothesis", kind: "hypothesis", confidence: 0.62 },
    { id: "control", label: "Control", kind: "control", confidence: 0.8 },
  ],
  edges: [
    { id: "e1", source: "source", target: "fact", kind: "supports" },
    { id: "e2", source: "fact", target: "entity", kind: "relates-to" },
    { id: "e3", source: "hypothesis", target: "fact", kind: "contradicts" },
    { id: "e4", source: "control", target: "entity", kind: "controls" },
  ],
};

describe("graph model", () => {
  it("derives focused neighborhoods deterministically", () => {
    const view = neighborhood(graph, "fact", 1);
    expect(view.nodes.map((node) => node.id).sort()).toEqual(
      ["entity", "fact", "hypothesis", "source"].sort()
    );
  });

  it("filters by semantic node kind", () => {
    const state = setVisibleKinds(createGraphWorkspaceState(), ["fact", "source"]);
    const view = deriveGraphView(graph, state);
    expect(view.nodes.map((node) => node.id).sort()).toEqual(["fact", "source"]);
    expect(view.edges.map((edge) => edge.id)).toEqual(["e1"]);
  });

  it("combines filter and focus without mutating graph data", () => {
    const initial = setVisibleKinds(createGraphWorkspaceState(), [
      "fact",
      "source",
      "entity",
    ]);
    const focused = focusNode(initial, "fact");
    const view = deriveGraphView(graph, focused);

    expect(view.nodes.map((node) => node.id).sort()).toEqual(
      ["entity", "fact", "source"].sort()
    );
    expect(graph.nodes).toHaveLength(5);
  });

  it("exposes contradictions semantically", () => {
    expect(contradictionEdges(graph).map((edge) => edge.id)).toEqual(["e3"]);
  });

  it("serializes graph workspace state", () => {
    const state = focusNode(createGraphWorkspaceState(), "fact");
    expect(deserializeGraphState(serializeGraphState(state))).toEqual(state);
  });
});
