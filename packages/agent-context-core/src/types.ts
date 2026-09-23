export type SkillLevel = "K0" | "K1" | "K2" | "K3" | "K4" | "K5" | "K6";

export type KnowledgeItem = {
  id: string;
  title: string;
  domain: string;
  type: string;
  importance: number;
  confidence: number;
  prerequisites: string[];
  related: string[];
  projects_used_in: string[];
};

export type AgentState = {
  agentId: string;
  skills: Record<string, SkillLevel>;
  currentProjects: string[];
  maxKnowledgeItems: number;
};

export type TaskNeed = {
  taskId: string;
  projectId: string;
  domains: string[];
  explicitKnowledgeRefs: string[];
  constraints: string[];
};

export type RankedKnowledge = {
  item: KnowledgeItem;
  score: number;
  reasons: string[];
};
