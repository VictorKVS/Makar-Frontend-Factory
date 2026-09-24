export type MasteryLevel = "K0" | "K1" | "K2" | "K3" | "K4" | "K5" | "K6";

export type SchoolNodeKind =
  | "graduate-standard"
  | "competency"
  | "skill"
  | "knowledge"
  | "tool"
  | "pattern"
  | "anti-pattern"
  | "lesson"
  | "exercise"
  | "lab"
  | "project"
  | "assessment"
  | "evidence"
  | "source";

export type SchoolEdgeKind =
  | "requires"
  | "prerequisite-of"
  | "consists-of"
  | "teaches"
  | "practices"
  | "verifies"
  | "evidenced-by"
  | "contributes-to"
  | "related-to"
  | "supersedes";

export type WeightVector = {
  importance?: number;
  prerequisite?: number;
  skill?: number;
  assessment?: number;
  confidence?: number;
  evidence?: number;
  recency?: number;
  transfer?: number;
};

export type SchoolNode = {
  id: string;
  kind: SchoolNodeKind;
  title: string;
  domain: string;
  status: "draft" | "active" | "deprecated" | "superseded";
  required?: boolean;
  targetLevel?: MasteryLevel;
  difficulty?: number;
  tags?: string[];
  metadata?: Record<string, unknown>;
};

export type SchoolEdge = {
  id: string;
  kind: SchoolEdgeKind;
  source: string;
  target: string;
  weights?: WeightVector;
  required?: boolean;
  targetLevel?: MasteryLevel;
  critical?: boolean;
  metadata?: Record<string, unknown>;
};

export type SchoolGraph = {
  id: string;
  version: string;
  nodes: SchoolNode[];
  edges: SchoolEdge[];
};

export type EvidenceKind =
  | "reading"
  | "quiz"
  | "exercise"
  | "lab"
  | "project"
  | "production"
  | "exam"
  | "review"
  | "benchmark"
  | "release";

export type EvidenceCapability =
  | "exposure"
  | "understanding"
  | "guided-application"
  | "independent-application"
  | "pattern-creation"
  | "review-improvement";

export type EvidenceRecord = {
  id: string;
  studentId: string;
  nodeId: string;
  kind: EvidenceKind;
  capability: EvidenceCapability;
  strength: number;
  independent: boolean;
  verified: boolean;
  sourceRef: string;
  createdAt?: string;
  expiresAt?: string;
};

export type MasteryRecord = {
  studentId: string;
  nodeId: string;
  level: MasteryLevel;
  confidence: number;
  evidenceRefs: string[];
  lastAssessedAt?: string;
};

export type GraduateRequirement = {
  nodeId: string;
  targetLevel: MasteryLevel;
  weight: number;
  critical: boolean;
  minimumConfidence?: number;
};

export type GraduateStandard = {
  id: string;
  title: string;
  profession: string;
  version: string;
  requirements: GraduateRequirement[];
  graduationPolicy: {
    weightedReadiness: number;
    criticalRequirementsMustPass: boolean;
    missingEvidenceBlocksCritical: boolean;
  };
};

export type RequirementResult = {
  nodeId: string;
  targetLevel: MasteryLevel;
  currentLevel: MasteryLevel;
  weight: number;
  critical: boolean;
  confidence: number;
  masteryRatio: number;
  evidencePresent: boolean;
  passed: boolean;
};

export type GraduateReadiness = {
  standardId: string;
  weightedReadiness: number;
  threshold: number;
  criticalPassed: boolean;
  ready: boolean;
  requirements: RequirementResult[];
};

export type LearningPathStep = {
  nodeId: string;
  action: "skip" | "shortened" | "full";
  reason: string;
  requiredLevel: MasteryLevel;
  currentLevel: MasteryLevel;
  prerequisiteDepth: number;
};

export type MasteryProposal = {
  studentId: string;
  nodeId: string;
  currentLevel: MasteryLevel;
  proposedLevel: MasteryLevel;
  evidenceRefs: string[];
  requiresReview: true;
  blockedReason?: string;
};
