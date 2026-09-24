import { describe, expect, it } from "vitest";
import type { KnowledgeItem } from "@father/agent-context-core";
import {
  attachSkillEvidence,
  classifyFeedback,
  createHandoff,
  proposeSkillPromotion,
  provisionTask,
  type AgentPassport,
  type ProjectOverlay,
  type RepositoryContract,
  type SkillRecord,
  type TaskDefinition,
} from "../src";

const agent: AgentPassport = {
  agentId: "makar",
  name: "Makar",
  role: "Senior Frontend / Creative / Interactive Engineer",
  mission: "Build reusable interfaces",
  skills: { ui: "K4", motion: "K2" },
  currentProjects: ["alina"],
  maxKnowledgeItems: 2,
};

const project: ProjectOverlay = {
  projectId: "alina",
  goal: "Build ALINA Control Center",
  decisions: ["screen-is-composition"],
  constraints: ["mock-data-must-be-labelled"],
  activeArtifacts: ["README.md"],
};

const repository: RepositoryContract = {
  repository: "VictorKVS/Makar-Frontend-Factory",
  defaultBranch: "main",
  packageManager: "pnpm",
  installCommand: "pnpm install",
  buildCommand: "pnpm build",
  typecheckCommand: "pnpm typecheck",
  testCommand: "pnpm test",
  visualEvidenceRequired: true,
};

const task: TaskDefinition = {
  taskId: "M1",
  projectId: "alina",
  title: "Build Agent Factory UI",
  goal: "Render provisioned task packs",
  why: "Make ALINA agent provisioning visible",
  priority: "high",
  domains: ["ui"],
  explicitKnowledgeRefs: ["hard-constraint"],
  constraints: ["generic-core"],
  deliverables: ["UI"],
  acceptanceCriteria: ["trace visible"],
  testContract: ["typecheck"],
};

const knowledge: KnowledgeItem[] = [
  {
    id: "hard-constraint",
    title: "Do not dump full libraries",
    domain: "delivery",
    type: "constraint",
    importance: 1,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina"],
  },
  {
    id: "ui-pattern",
    title: "Task pack view",
    domain: "ui",
    type: "pattern",
    importance: 0.8,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina"],
  },
  {
    id: "unrelated",
    title: "Unrelated",
    domain: "audio",
    type: "pattern",
    importance: 0.1,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: [],
  },
];

describe("agent factory", () => {
  it("provisions a bounded, traceable task pack", () => {
    const pack = provisionTask({
      agent,
      task,
      project,
      repository,
      knowledgeCatalog: knowledge,
    });

    expect(pack.knowledge).toHaveLength(2);
    expect(pack.trace.knowledge[0].id).toBe("hard-constraint");
    expect(pack.artifacts.contextMd).toContain("pnpm build");
    expect(pack.artifacts.contextPackage.knowledge_refs).toEqual(
      pack.trace.knowledge.map((item) => item.id)
    );
  });

  it("routes repository gaps separately from professional knowledge", () => {
    expect(
      classifyFeedback({ repositoryContextMissing: true }).route
    ).toBe("repository-contract");

    expect(
      classifyFeedback({ professionalKnowledgeMissing: true }).route
    ).toBe("kb1-professional");
  });

  it("attaches evidence without silently promoting a skill", () => {
    const record: SkillRecord = {
      skillId: "ui",
      level: "K4",
      evidence: [],
    };

    const updated = attachSkillEvidence(record, {
      skillId: "ui",
      evidenceId: "pr-24",
      kind: "pull-request",
      description: "QA UI",
    });

    expect(updated.level).toBe("K4");
    expect(updated.evidence).toHaveLength(1);

    const proposal = proposeSkillPromotion(updated, "K5");
    expect(proposal.requiresReview).toBe(true);
    expect(proposal.currentLevel).toBe("K4");
  });

  it("creates traceable agent-to-agent handoffs", () => {
    const handoff = createHandoff({
      from: "backend",
      to: "makar",
      artifact: "ProjectContext API",
      contract: { schema: "context.v2" },
      expectation: "Render without blocking primary workspace",
      sourceRefs: ["api.md", "api.md"],
    });

    expect(handoff.sourceRefs).toEqual(["api.md"]);
  });
});
