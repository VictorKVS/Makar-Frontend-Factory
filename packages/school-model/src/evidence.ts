import type {
  EvidenceCapability,
  EvidenceRecord,
  MasteryLevel,
  MasteryProposal,
  MasteryRecord,
} from "./types";
import { levelRank } from "./graph";

const capabilityLevel: Record<EvidenceCapability, MasteryLevel> = {
  exposure: "K1",
  understanding: "K2",
  "guided-application": "K3",
  "independent-application": "K4",
  "pattern-creation": "K5",
  "review-improvement": "K6",
};

export function strongestEvidenceLevel(
  evidence: EvidenceRecord[]
): MasteryLevel {
  let strongest: MasteryLevel = "K0";

  for (const item of evidence) {
    if (!item.verified) continue;

    let candidate = capabilityLevel[item.capability];

    if (levelRank(candidate) >= levelRank("K4") && !item.independent) {
      candidate = "K3";
    }

    if (levelRank(candidate) > levelRank(strongest)) {
      strongest = candidate;
    }
  }

  return strongest;
}

export function proposeMasteryUpdate(
  current: MasteryRecord,
  evidence: EvidenceRecord[]
): MasteryProposal {
  const relevant = evidence.filter(
    (item) =>
      item.studentId === current.studentId &&
      item.nodeId === current.nodeId &&
      item.verified
  );

  const proposedLevel = strongestEvidenceLevel(relevant);

  return {
    studentId: current.studentId,
    nodeId: current.nodeId,
    currentLevel: current.level,
    proposedLevel: relevant.length ? proposedLevel : current.level,
    evidenceRefs: relevant.map((item) => item.id),
    requiresReview: true,
    blockedReason: relevant.length ? undefined : "no-verified-evidence",
  };
}

export function hasEvidence(
  mastery: MasteryRecord | undefined,
  evidence: EvidenceRecord[]
): boolean {
  if (!mastery) return false;

  return evidence.some(
    (item) =>
      item.studentId === mastery.studentId &&
      item.nodeId === mastery.nodeId &&
      item.verified &&
      mastery.evidenceRefs.includes(item.id)
  );
}
