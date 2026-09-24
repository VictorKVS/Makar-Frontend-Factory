import type {
  GraphDocument,
  GraphEdge,
  GraphNode,
  GraphNodeKind,
  GraphView,
  GraphWorkspaceState,
} from "./types";

export const allNodeKinds: GraphNodeKind[] = [
  "fact",
  "source",
  "entity",
  "hypothesis",
  "control",
  "task",
];

export function validateGraph(graph: GraphDocument): string[] {
  const errors: string[] = [];
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) errors.push(`duplicate-node:${node.id}`);
    nodeIds.add(node.id);

    if (node.confidence !== undefined && (node.confidence < 0 || node.confidence > 1)) {
      errors.push(`invalid-node-confidence:${node.id}`);
    }
  }

  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) errors.push(`duplicate-edge:${edge.id}`);
    edgeIds.add(edge.id);

    if (!nodeIds.has(edge.source)) errors.push(`unknown-source:${edge.id}:${edge.source}`);
    if (!nodeIds.has(edge.target)) errors.push(`unknown-target:${edge.id}:${edge.target}`);

    if (edge.confidence !== undefined && (edge.confidence < 0 || edge.confidence > 1)) {
      errors.push(`invalid-edge-confidence:${edge.id}`);
    }
  }

  return errors;
}

export function createGraphWorkspaceState(): GraphWorkspaceState {
  return {
    selectedNodeId: null,
    focusedNodeId: null,
    visibleKinds: [...allNodeKinds],
    neighborhoodDepth: 1,
    fallbackMode: "graph",
  };
}

export function selectNode(
  state: GraphWorkspaceState,
  nodeId: string | null
): GraphWorkspaceState {
  return { ...state, selectedNodeId: nodeId };
}

export function focusNode(
  state: GraphWorkspaceState,
  nodeId: string | null
): GraphWorkspaceState {
  return { ...state, focusedNodeId: nodeId };
}

export function setVisibleKinds(
  state: GraphWorkspaceState,
  kinds: GraphNodeKind[]
): GraphWorkspaceState {
  return { ...state, visibleKinds: [...new Set(kinds)] };
}

export function setFallbackMode(
  state: GraphWorkspaceState,
  mode: GraphWorkspaceState["fallbackMode"]
): GraphWorkspaceState {
  return { ...state, fallbackMode: mode };
}

function incidentEdges(edges: GraphEdge[], nodeIds: Set<string>): GraphEdge[] {
  return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
}

export function neighborhood(
  graph: GraphDocument,
  centerId: string,
  depth = 1
): GraphView {
  const seen = new Set<string>([centerId]);

  for (let step = 0; step < Math.max(0, depth); step += 1) {
    const edges = incidentEdges(graph.edges, seen);
    for (const edge of edges) {
      seen.add(edge.source);
      seen.add(edge.target);
    }
  }

  const nodes = graph.nodes.filter((node) => seen.has(node.id));
  const edges = graph.edges.filter(
    (edge) => seen.has(edge.source) && seen.has(edge.target)
  );

  return { nodes, edges };
}

export function deriveGraphView(
  graph: GraphDocument,
  state: GraphWorkspaceState
): GraphView {
  const allowed = new Set(state.visibleKinds);
  let nodes = graph.nodes.filter((node) => allowed.has(node.kind));
  let edges = graph.edges.filter((edge) =>
    nodes.some((node) => node.id === edge.source) &&
    nodes.some((node) => node.id === edge.target)
  );

  if (state.focusedNodeId) {
    const focused = neighborhood(
      { ...graph, nodes, edges },
      state.focusedNodeId,
      state.neighborhoodDepth
    );
    nodes = focused.nodes;
    edges = focused.edges;
  }

  return { nodes, edges };
}

export function contradictionEdges(graph: GraphDocument): GraphEdge[] {
  return graph.edges.filter((edge) => edge.kind === "contradicts");
}

export function serializeGraphState(state: GraphWorkspaceState): string {
  return JSON.stringify(state);
}

export function deserializeGraphState(serialized: string): GraphWorkspaceState {
  const value = JSON.parse(serialized) as GraphWorkspaceState;

  if (
    !Array.isArray(value.visibleKinds) ||
    typeof value.neighborhoodDepth !== "number" ||
    !["graph", "list"].includes(value.fallbackMode)
  ) {
    throw new Error("Invalid graph workspace state");
  }

  return value;
}

export function nodeById(
  graph: GraphDocument,
  nodeId: string | null
): GraphNode | null {
  if (!nodeId) return null;
  return graph.nodes.find((node) => node.id === nodeId) ?? null;
}
