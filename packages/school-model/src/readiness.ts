import type {
  EvidenceRecord,
  GraduateReadiness,
  GraduateStandard,
  MasteryRecord,
} from "./types";
import { hasEvidence } from "./evidence";
import { levelRank } from "./graph";

export function calculateGraduateReadiness(
  standard: GraduateStandard,
  mastery: MasteryRecord[],
  evidence: EvidenceRecord[]
): GraduateReadiness {
  const byNode = new Map(mastery.map((item) => [item.nodeId, item]));

  const requirements = standard.requirements.map((requirement) => {
    const current = byNode.get(requirement.nodeId);
    const currentLevel = current?.level ?? "K0";
    const confidence = current?.confidence ?? 0;
    const evidencePresent = hasEvidence(current, evidence);
    const targetRank = Math.max(1, levelRank(requirement.targetLevel));
    const masteryRatio = Math.min(1, levelRank(currentLevel) / targetRank);
    const confidenceOk =
      confidence >= (requirement.minimumConfidence ?? 0);
    const evidenceOk =
      !requirement.critical ||
      !standard.graduationPolicy.missingEvidenceBlocksCritical ||
      evidencePresent;
    const passed =
      levelRank(currentLevel) >= targetRank &&
      confidenceOk &&
      evidenceOk;

    return {
      nodeId: requirement.nodeId,
      targetLevel: requirement.targetLevel,
      currentLevel,
      weight: requirement.weight,
      critical: requirement.critical,
      confidence,
      masteryRatio,
      evidencePresent,
      passed,
    };
  });

  const totalWeight = requirements.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const weightedReadiness =
    totalWeight === 0
      ? 0
      : requirements.reduce(
          (sum, item) => sum + item.masteryRatio * item.weight,
          0
        ) / totalWeight;

  const criticalPassed = requirements
    .filter((item) => item.critical)
    .every((item) => item.passed);

  const threshold = standard.graduationPolicy.weightedReadiness;
  const ready =
    weightedReadiness >= threshold &&
    (!standard.graduationPolicy.criticalRequirementsMustPass ||
      criticalPassed);

  return {
    standardId: standard.id,
    weightedReadiness,
    threshold,
    criticalPassed,
    ready,
    requirements,
  };
}
