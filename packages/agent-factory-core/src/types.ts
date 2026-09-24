import type {
  KnowledgeItem,
  SkillLevel,
  TaskNeed,
} from "@father/agent-context-core";

export type AgentPassport = {
  agentId: string;
  name: string;
  role: string;
  mission: string;
  skills: Record<string, SkillLevel>;
  currentProjects: string[];
  maxKnowledgeItems: number;
};

export type RepositoryContract = {
  repository: string;
  defaultBranch: string;
  packageManager: string;
  installCommand: string;
  buildCommand: string;
  typecheckCommand: string;
  testCommand: string;
  visualEvidenceRequired: boolean;
};

export type ProjectOverlay = {
  projectId: string;
  goal: string;
  decisions: string[];
  constraints: string[];
  activeArtifacts: string[];
};

export type TaskDefinition = TaskNeed & {
  title: string;
  goal: string;
  why: string;
  priority: "low" | "normal" | "high" | "critical";
  deliverables: string[];
  acceptanceCriteria: string[];
  testContract: string[];
};

export type DeliveryKnowledge = {
  id: string;
  title: string;
  score: number;
  reasons: string[];
};

export type DeliveryTrace = {
  deliveryId: string;
  agentId: string;
  taskId: string;
  knowledge: DeliveryKnowledge[];
  projectId: string;
  repository: string;
};

export type TaskPack = {
  agent: AgentPassport;
  task: TaskDefinition;
  project: ProjectOverlay;
  repository: RepositoryContract;
  knowledge: KnowledgeItem[];
  trace: DeliveryTrace;
  artifacts: {
    taskMd: string;
    contextMd: string;
    knowledgePackMd: string;
    acceptanceMd: string;
    resultTemplateMd: string;
    contextPackage: Record<string, unknown>;
  };
};

export type FeedbackSignal = {
  professionalKnowledgeMissing?: boolean;
  briefingMissingOrWrong?: boolean;
  repositoryContextMissing?: boolean;
  requirementChanged?: boolean;
  implementationFailedDespiteContext?: boolean;
  notes?: string[];
};

export type FeedbackRoute =
  | "kb1-professional"
  | "kb2-delivery"
  | "repository-contract"
  | "project-overlay"
  | "execution"
  | "unclassified";

export type FeedbackClassification = {
  route: FeedbackRoute;
  reasons: string[];
};

export type SkillEvidence = {
  skillId: string;
  evidenceId: string;
  kind: "commit" | "pull-request" | "test" | "benchmark" | "review" | "release";
  description: string;
};

export type SkillRecord = {
  skillId: string;
  level: SkillLevel;
  evidence: SkillEvidence[];
};

export type AgentHandoff = {
  from: string;
  to: string;
  artifact: string;
  contract: Record<string, unknown>;
  expectation: string;
  sourceRefs: string[];
};
