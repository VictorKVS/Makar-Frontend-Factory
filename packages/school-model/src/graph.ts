import type {
  MasteryLevel,
  SchoolEdge,
  SchoolGraph,
  SchoolNode,
} from "./types";

const masteryRank: Record<MasteryLevel, number> = {
  K0: 0,
  K1: 1,
  K2: 2,
  K3: 3,
  K4: 4,
  K5: 5,
  K6: 6,
};

export function levelRank(level: MasteryLevel): number {
  return masteryRank[level];
}

export function validateSchoolGraph(graph: SchoolGraph): string[] {
  const errors: string[] = [];
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) errors.push(`duplicate-node:${node.id}`);
    nodeIds.add(node.id);

    if (node.difficulty !== undefined && (node.difficulty < 0 || node.difficulty > 1)) {
      errors.push(`invalid-difficulty:${node.id}`);
    }
  }

  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) errors.push(`duplicate-edge:${edge.id}`);
    edgeIds.add(edge.id);

    if (!nodeIds.has(edge.source)) errors.push(`unknown-source:${edge.id}:${edge.source}`);
    if (!nodeIds.has(edge.target)) errors.push(`unknown-target:${edge.id}:${edge.target}`);

    for (const [name, value] of Object.entries(edge.weights ?? {})) {
      if (value !== undefined && (value < 0 || value > 1)) {
        errors.push(`invalid-weight:${edge.id}:${name}`);
      }
    }
  }

  return errors;
}

export function nodeById(graph: SchoolGraph, nodeId: string): SchoolNode | null {
  return graph.nodes.find((node) => node.id === nodeId) ?? null;
}

function directPrerequisites(graph: SchoolGraph, nodeId: string): SchoolEdge[] {
  return graph.edges.filter(
    (edge) =>
      (edge.kind === "prerequisite-of" && edge.target === nodeId) ||
      (edge.kind === "requires" && edge.source === nodeId)
  );
}

export function prerequisiteClosure(
  graph: SchoolGraph,
  targetNodeId: string
): Array<{ nodeId: string; depth: number; edge: SchoolEdge }> {
  const result: Array<{ nodeId: string; depth: number; edge: SchoolEdge }> = [];
  const bestDepth = new Map<string, number>();
  const queue: Array<{ nodeId: string; depth: number }> = [
    { nodeId: targetNodeId, depth: 0 },
  ];

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;

    for (const edge of directPrerequisites(graph, current.nodeId)) {
      const prerequisiteId =
        edge.kind === "prerequisite-of" ? edge.source : edge.target;
      const depth = current.depth + 1;
      const known = bestDepth.get(prerequisiteId);

      if (known !== undefined && known <= depth) continue;

      bestDepth.set(prerequisiteId, depth);
      result.push({ nodeId: prerequisiteId, depth, edge });
      queue.push({ nodeId: prerequisiteId, depth });
    }
  }

  return result.sort(
    (a, b) => b.depth - a.depth || a.nodeId.localeCompare(b.nodeId)
  );
}

export function targetLevelForNode(
  node: SchoolNode,
  fallback: MasteryLevel = "K3"
): MasteryLevel {
  return node.targetLevel ?? fallback;
}
