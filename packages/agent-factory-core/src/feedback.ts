import type {
  FeedbackClassification,
  FeedbackSignal,
  SkillEvidence,
  SkillRecord,
} from "./types";

export function classifyFeedback(
  signal: FeedbackSignal
): FeedbackClassification {
  const reasons = signal.notes ? [...signal.notes] : [];

  if (signal.professionalKnowledgeMissing) {
    reasons.push("professional-knowledge-gap");
    return { route: "kb1-professional", reasons };
  }

  if (signal.briefingMissingOrWrong) {
    reasons.push("briefing-gap");
    return { route: "kb2-delivery", reasons };
  }

  if (signal.repositoryContextMissing) {
    reasons.push("repository-context-gap");
    return { route: "repository-contract", reasons };
  }

  if (signal.requirementChanged) {
    reasons.push("requirement-changed");
    return { route: "project-overlay", reasons };
  }

  if (signal.implementationFailedDespiteContext) {
    reasons.push("execution-error");
    return { route: "execution", reasons };
  }

  return { route: "unclassified", reasons };
}

export function attachSkillEvidence(
  record: SkillRecord,
  evidence: SkillEvidence
): SkillRecord {
  if (record.skillId !== evidence.skillId) {
    throw new Error("Evidence skill does not match skill record");
  }

  if (record.evidence.some((item) => item.evidenceId === evidence.evidenceId)) {
    return record;
  }

  return {
    ...record,
    evidence: [...record.evidence, evidence],
  };
}

export function proposeSkillPromotion(
  record: SkillRecord,
  targetLevel: SkillRecord["level"]
) {
  return {
    skillId: record.skillId,
    currentLevel: record.level,
    targetLevel,
    evidenceIds: record.evidence.map((item) => item.evidenceId),
    requiresReview: true,
  };
}
