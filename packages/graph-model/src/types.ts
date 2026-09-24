export type GraphNodeKind =
  | "fact"
  | "source"
  | "entity"
  | "hypothesis"
  | "control"
  | "task";

export type GraphEdgeKind =
  | "supports"
  | "contradicts"
  | "derived-from"
  | "relates-to"
  | "controls"
  | "depends-on";

export type GraphNode = {
  id: string;
  label: string;
  kind: GraphNodeKind;
  summary?: string;
  confidence?: number;
  evidenceRefs?: string[];
  provenanceRefs?: string[];
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  kind: GraphEdgeKind;
  summary?: string;
  confidence?: number;
  evidenceRefs?: string[];
};

export type GraphDocument = {
  id: string;
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export type GraphWorkspaceState = {
  selectedNodeId: string | null;
  focusedNodeId: string | null;
  visibleKinds: GraphNodeKind[];
  neighborhoodDepth: number;
  fallbackMode: "graph" | "list";
};

export type GraphView = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
