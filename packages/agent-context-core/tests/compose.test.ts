import { describe, expect, it } from "vitest";
import { selectKnowledge, type AgentState, type KnowledgeItem, type TaskNeed } from "../src";

const items: KnowledgeItem[] = [
  {
    id: "critical",
    title: "Critical",
    domain: "ui",
    type: "constraint",
    importance: 1,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina"]
  },
  {
    id: "motion",
    title: "Motion",
    domain: "motion",
    type: "principle",
    importance: 0.8,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina"]
  }
];

const agent: AgentState = {
  agentId: "makar",
  skills: { ui: "K4", motion: "K1" },
  currentProjects: ["alina"],
  maxKnowledgeItems: 2
};

it("always preserves explicit knowledge references", () => {
  const task: TaskNeed = {
    taskId: "M0.2",
    projectId: "alina",
    domains: ["motion"],
    explicitKnowledgeRefs: ["critical"],
    constraints: []
  };

  const selected = selectKnowledge(items, task, agent);
  expect(selected[0].item.id).toBe("critical");
  expect(selected.map((entry) => entry.item.id)).toContain("motion");
});

it("gives more explanatory weight to weaker skill domains", () => {
  const task: TaskNeed = {
    taskId: "M0.2",
    projectId: "alina",
    domains: ["ui", "motion"],
    explicitKnowledgeRefs: [],
    constraints: []
  };

  const selected = selectKnowledge(items, task, agent);
  expect(selected[0].item.id).toBe("motion");
});
