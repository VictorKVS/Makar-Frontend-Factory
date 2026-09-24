import { describe, expect, it } from "vitest";
import {
  applyMasteryReview,
  buildAdaptiveLearningPath,
  calculateGraduateReadiness,
  prerequisiteClosure,
  proposeMasteryUpdate,
  validateSchoolGraph,
  type EvidenceRecord,
  type GraduateStandard,
  type MasteryRecord,
  type SchoolGraph,
} from "../src";

const graph: SchoolGraph = {
  id: "makar-school-seed",
  version: "0.1.0",
  nodes: [
    {
      id: "knowledge.ts",
      kind: "knowledge",
      title: "TypeScript fundamentals",
      domain: "frontend",
      status: "active",
      targetLevel: "K3",
    },
    {
      id: "skill.component-api",
      kind: "skill",
      title: "Design typed component APIs",
      domain: "frontend",
      status: "active",
      targetLevel: "K4",
    },
    {
      id: "competency.design-system",
      kind: "competency",
      title: "Build reusable design systems",
      domain: "design-system",
      status: "active",
      targetLevel: "K4",
    },
  ],
  edges: [
    {
      id: "edge.ts.component",
      kind: "prerequisite-of",
      source: "knowledge.ts",
      target: "skill.component-api",
      targetLevel: "K3",
      weights: { prerequisite: 0.9 },
    },
    {
      id: "edge.component.design-system",
      kind: "prerequisite-of",
      source: "skill.component-api",
      target: "competency.design-system",
      targetLevel: "K4",
      weights: { prerequisite: 0.85, skill: 0.9 },
    },
  ],
};

const standard: GraduateStandard = {
  id: "graduate.makar.v0",
  title: "Makar Frontend Graduate",
  profession: "Senior Frontend / Creative / Interactive Engineer",
  version: "0.1.0",
  requirements: [
    {
      nodeId: "competency.design-system",
      targetLevel: "K4",
      weight: 1,
      critical: true,
      minimumConfidence: 0.8,
    },
  ],
  graduationPolicy: {
    weightedReadiness: 0.85,
    criticalRequirementsMustPass: true,
    missingEvidenceBlocksCritical: true,
  },
};

describe("ALINA School model", () => {
  it("validates and traverses prerequisite chains", () => {
    expect(validateSchoolGraph(graph)).toEqual([]);
    expect(prerequisiteClosure(graph, "competency.design-system")).toEqual([
      expect.objectContaining({ nodeId: "knowledge.ts", depth: 2 }),
      expect.objectContaining({ nodeId: "skill.component-api", depth: 1 }),
    ]);
  });

  it("builds an adaptive path that skips mastered prerequisites", () => {
    const mastery: MasteryRecord[] = [
      {
        studentId: "makar",
        nodeId: "knowledge.ts",
        level: "K4",
        confidence: 0.92,
        evidenceRefs: ["ev-ts"],
      },
      {
        studentId: "makar",
        nodeId: "skill.component-api",
        level: "K2",
        confidence: 0.65,
        evidenceRefs: ["ev-components"],
      },
    ];

    const path = buildAdaptiveLearningPath(
      graph,
      ["competency.design-system"],
      mastery
    );

    expect(path.find((step) => step.nodeId === "knowledge.ts")?.action).toBe(
      "skip"
    );
    expect(
      path.find((step) => step.nodeId === "skill.component-api")?.action
    ).toBe("shortened");
    expect(
      path.find((step) => step.nodeId === "competency.design-system")?.action
    ).toBe("full");
  });

  it("never treats reading alone as applied mastery", () => {
    const current: MasteryRecord = {
      studentId: "makar",
      nodeId: "skill.component-api",
      level: "K1",
      confidence: 0.5,
      evidenceRefs: [],
    };

    const evidence: EvidenceRecord[] = [
      {
        id: "reading-1",
        studentId: "makar",
        nodeId: "skill.component-api",
        kind: "reading",
        capability: "exposure",
        strength: 0.1,
        independent: false,
        verified: true,
        sourceRef: "book:component-architecture",
      },
    ];

    const proposal = proposeMasteryUpdate(current, evidence);
    expect(proposal.proposedLevel).toBe("K1");
    expect(proposal.requiresReview).toBe(true);
  });

  it("changes mastery only after an accepted review", () => {
    const current: MasteryRecord = {
      studentId: "makar",
      nodeId: "skill.component-api",
      level: "K3",
      confidence: 0.75,
      evidenceRefs: [],
    };

    const evidence: EvidenceRecord[] = [
      {
        id: "project-2",
        studentId: "makar",
        nodeId: "skill.component-api",
        kind: "project",
        capability: "independent-application",
        strength: 0.85,
        independent: true,
        verified: true,
        sourceRef: "pr:ui",
      },
    ];

    const proposal = proposeMasteryUpdate(current, evidence);

    expect(current.level).toBe("K3");
    expect(proposal.proposedLevel).toBe("K4");

    const rejected = applyMasteryReview(current, {
      proposal,
      accepted: false,
      reviewer: "school-review",
      confidence: 0.9,
    });

    expect(rejected.level).toBe("K3");

    const accepted = applyMasteryReview(current, {
      proposal,
      accepted: true,
      reviewer: "school-review",
      confidence: 0.9,
      reviewedAt: "2026-09-24T00:00:00Z",
    });

    expect(accepted.level).toBe("K4");
    expect(accepted.evidenceRefs).toContain("project-2");
  });

  it("keeps graduate readiness blocked without critical evidence", () => {
    const mastery: MasteryRecord[] = [
      {
        studentId: "makar",
        nodeId: "competency.design-system",
        level: "K4",
        confidence: 0.9,
        evidenceRefs: [],
      },
    ];

    const readiness = calculateGraduateReadiness(
      standard,
      mastery,
      []
    );

    expect(readiness.weightedReadiness).toBe(1);
    expect(readiness.criticalPassed).toBe(false);
    expect(readiness.ready).toBe(false);
  });

  it("graduates only when mastery, confidence and evidence satisfy policy", () => {
    const evidence: EvidenceRecord[] = [
      {
        id: "project-1",
        studentId: "makar",
        nodeId: "competency.design-system",
        kind: "project",
        capability: "independent-application",
        strength: 0.8,
        independent: true,
        verified: true,
        sourceRef: "pr:design-system",
      },
    ];

    const mastery: MasteryRecord[] = [
      {
        studentId: "makar",
        nodeId: "competency.design-system",
        level: "K4",
        confidence: 0.9,
        evidenceRefs: ["project-1"],
      },
    ];

    const readiness = calculateGraduateReadiness(
      standard,
      mastery,
      evidence
    );

    expect(readiness.criticalPassed).toBe(true);
    expect(readiness.ready).toBe(true);
  });
});
