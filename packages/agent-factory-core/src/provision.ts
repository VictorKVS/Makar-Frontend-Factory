import {
  selectKnowledge,
  type AgentState,
  type KnowledgeItem,
} from "@father/agent-context-core";
import type {
  AgentPassport,
  DeliveryTrace,
  ProjectOverlay,
  RepositoryContract,
  TaskDefinition,
  TaskPack,
} from "./types";

function bullets(items: string[]): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- none";
}

function deliveryId(agentId: string, taskId: string): string {
  return `delivery:${agentId}:${taskId}:v1`;
}

export function provisionTask(input: {
  agent: AgentPassport;
  task: TaskDefinition;
  project: ProjectOverlay;
  repository: RepositoryContract;
  knowledgeCatalog: KnowledgeItem[];
}): TaskPack {
  const { agent, task, project, repository, knowledgeCatalog } = input;

  const agentState: AgentState = {
    agentId: agent.agentId,
    skills: agent.skills,
    currentProjects: agent.currentProjects,
    maxKnowledgeItems: agent.maxKnowledgeItems,
  };

  const ranked = selectKnowledge(knowledgeCatalog, task, agentState);
  const knowledge = ranked.map((entry) => entry.item);

  const trace: DeliveryTrace = {
    deliveryId: deliveryId(agent.agentId, task.taskId),
    agentId: agent.agentId,
    taskId: task.taskId,
    knowledge: ranked.map((entry) => ({
      id: entry.item.id,
      title: entry.item.title,
      score: entry.score,
      reasons: entry.reasons,
    })),
    projectId: project.projectId,
    repository: repository.repository,
  };

  const taskMd = `# ${task.taskId} — ${task.title}

**Agent:** ${agent.name}  
**Role:** ${agent.role}  
**Priority:** ${task.priority}

## Goal

${task.goal}

## Why

${task.why}

## Deliverables

${bullets(task.deliverables)}
`;

  const contextMd = `# Context

## Project

${project.goal}

## Decisions

${bullets(project.decisions)}

## Project constraints

${bullets(project.constraints)}

## Repository contract

- repository: ${repository.repository}
- default branch: ${repository.defaultBranch}
- package manager: ${repository.packageManager}
- install: ${repository.installCommand}
- build: ${repository.buildCommand}
- typecheck: ${repository.typecheckCommand}
- test: ${repository.testCommand}
- visual evidence required: ${String(repository.visualEvidenceRequired)}
`;

  const knowledgePackMd = `# Knowledge Pack

Selected ${knowledge.length} item(s) for ${agent.name}.

${ranked
    .map(
      (entry) =>
        `## ${entry.item.title}\n\n- id: ${entry.item.id}\n- domain: ${entry.item.domain}\n- score: ${entry.score.toFixed(3)}\n- reasons: ${entry.reasons.join(", ")}`
    )
    .join("\n\n")}
`;

  const acceptanceMd = `# Acceptance

## Criteria

${bullets(task.acceptanceCriteria)}

## Test contract

${bullets(task.testContract)}
`;

  const resultTemplateMd = `# Result

Status: **not started**

## Evidence

- commits:
- pull request:
- tests:
- visual evidence:

## Context feedback

- useful:
- missing:
- redundant:
- clarification cycles:
- rework cycles:

## Classification

- KB-1:
- KB-2:
- Repository Contract:
- Project Overlay:
- Execution:
`;

  const contextPackage = {
    task_id: task.taskId,
    agent_id: agent.agentId,
    project_id: project.projectId,
    delivery_id: trace.deliveryId,
    knowledge_refs: trace.knowledge.map((item) => item.id),
    repository_contract: repository,
    project_decisions: project.decisions,
    constraints: [...project.constraints, ...task.constraints],
    deliverables: task.deliverables,
    acceptance_criteria: task.acceptanceCriteria,
    test_contract: task.testContract,
  };

  return {
    agent,
    task,
    project,
    repository,
    knowledge,
    trace,
    artifacts: {
      taskMd,
      contextMd,
      knowledgePackMd,
      acceptanceMd,
      resultTemplateMd,
      contextPackage,
    },
  };
}
