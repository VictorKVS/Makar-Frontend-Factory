import type {
  LearningPathStep,
  MasteryLevel,
  MasteryRecord,
  SchoolGraph,
} from "./types";
import {
  levelRank,
  nodeById,
  prerequisiteClosure,
  targetLevelForNode,
} from "./graph";

function classifyAction(
  current: MasteryLevel,
  required: MasteryLevel,
  confidence: number
): LearningPathStep["action"] {
  const currentRank = levelRank(current);
  const requiredRank = levelRank(required);

  if (currentRank >= requiredRank && confidence >= 0.8) {
    return "skip";
  }

  if (currentRank >= Math.max(1, requiredRank - 2) && confidence >= 0.55) {
    return "shortened";
  }

  return "full";
}

export function buildAdaptiveLearningPath(
  graph: SchoolGraph,
  targetNodeIds: string[],
  mastery: MasteryRecord[]
): LearningPathStep[] {
  const masteryByNode = new Map(mastery.map((item) => [item.nodeId, item]));
  const planned = new Map<string, LearningPathStep>();

  const addStep = (
    nodeId: string,
    depth: number,
    explicitRequiredLevel?: MasteryLevel
  ) => {
    const node = nodeById(graph, nodeId);
    if (!node) return;

    const current = masteryByNode.get(nodeId);
    const currentLevel = current?.level ?? "K0";
    const confidence = current?.confidence ?? 0;
    const requiredLevel =
      explicitRequiredLevel ?? targetLevelForNode(node);

    const step: LearningPathStep = {
      nodeId,
      action: classifyAction(currentLevel, requiredLevel, confidence),
      reason:
        currentLevel === "K0"
          ? "no-confirmed-mastery"
          : `current=${currentLevel};confidence=${confidence.toFixed(2)}`,
      requiredLevel,
      currentLevel,
      prerequisiteDepth: depth,
    };

    const previous = planned.get(nodeId);
    if (
      !previous ||
      levelRank(step.requiredLevel) > levelRank(previous.requiredLevel) ||
      step.prerequisiteDepth > previous.prerequisiteDepth
    ) {
      planned.set(nodeId, step);
    }
  };

  for (const targetId of targetNodeIds) {
    const target = nodeById(graph, targetId);
    if (!target) continue;

    for (const prerequisite of prerequisiteClosure(graph, targetId)) {
      addStep(
        prerequisite.nodeId,
        prerequisite.depth,
        prerequisite.edge.targetLevel
      );
    }

    addStep(targetId, 0, target.targetLevel);
  }

  return [...planned.values()].sort(
    (a, b) =>
      b.prerequisiteDepth - a.prerequisiteDepth ||
      a.nodeId.localeCompare(b.nodeId)
  );
}
