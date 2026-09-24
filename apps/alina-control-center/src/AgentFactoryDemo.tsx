import { useMemo, useState } from "react";
import type { KnowledgeItem } from "@father/agent-context-core";
import {
  classifyFeedback,
  provisionTask,
  type AgentPassport,
  type FeedbackSignal,
  type ProjectOverlay,
  type RepositoryContract,
  type TaskDefinition,
} from "@father/agent-factory-core";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./agent-factory-demo.css";

const agent: AgentPassport = {
  agentId: "makar",
  name: "Makar",
  role: "Senior Frontend / Creative / Interactive Engineer",
  mission: "Build reusable high-end interfaces and game-ready interaction systems.",
  skills: {
    "agent-ui": "K3",
    delivery: "K3",
    frontend: "K4",
  },
  currentProjects: ["alina-control-center"],
  maxKnowledgeItems: 3,
};

const project: ProjectOverlay = {
  projectId: "alina-control-center",
  goal: "Build ALINA as an adaptive command center and agent factory.",
  decisions: [
    "screen-is-composition",
    "two-knowledge-bases",
    "agent-context-is-traceable",
  ],
  constraints: [
    "no-full-library-prompt-dumps",
    "skill-promotion-requires-review",
  ],
  activeArtifacts: ["Agent Factory v0", "Makar Frontend Factory"],
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
  taskId: "M1.0.UI",
  projectId: "alina-control-center",
  title: "Agent Factory control surface",
  goal: "Make ALINA provisioning of Makar visible and inspectable.",
  why: "The user must see what ALINA gave the agent and why.",
  priority: "high",
  domains: ["agent-ui", "delivery"],
  explicitKnowledgeRefs: ["makar.agent.traceability"],
  constraints: ["do-not-hide-context-selection"],
  deliverables: ["agent passport view", "knowledge pack view", "delivery trace"],
  acceptanceCriteria: [
    "selected knowledge is bounded",
    "selection reasons are visible",
    "feedback route is inspectable",
  ],
  testContract: ["typecheck", "unit tests", "Playwright interaction proof"],
};

const knowledgeCatalog: KnowledgeItem[] = [
  {
    id: "makar.agent.traceability",
    title: "Every delivered knowledge fragment is traceable",
    domain: "delivery",
    type: "constraint",
    importance: 1,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina-control-center"],
  },
  {
    id: "makar.agent.smallest-context",
    title: "Deliver the smallest sufficient context",
    domain: "delivery",
    type: "principle",
    importance: 0.96,
    confidence: 1,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina-control-center"],
  },
  {
    id: "makar.agent.factory-ui",
    title: "Agent Factory decisions must be inspectable in UI",
    domain: "agent-ui",
    type: "pattern",
    importance: 0.94,
    confidence: 0.95,
    prerequisites: [],
    related: [],
    projects_used_in: ["alina-control-center"],
  },
  {
    id: "makar.unrelated.audio",
    title: "Audio mastering detail",
    domain: "audio",
    type: "pattern",
    importance: 0.2,
    confidence: 0.8,
    prerequisites: [],
    related: [],
    projects_used_in: [],
  },
];

const feedbackOptions: Array<{ label: string; signal: FeedbackSignal }> = [
  { label: "Knowledge gap", signal: { professionalKnowledgeMissing: true } },
  { label: "Briefing gap", signal: { briefingMissingOrWrong: true } },
  { label: "Repository gap", signal: { repositoryContextMissing: true } },
  { label: "Requirement changed", signal: { requirementChanged: true } },
  {
    label: "Execution error",
    signal: { implementationFailedDespiteContext: true },
  },
];

export function AgentFactoryDemo() {
  const pack = useMemo(
    () =>
      provisionTask({
        agent,
        task,
        project,
        repository,
        knowledgeCatalog,
      }),
    []
  );

  const [feedback, setFeedback] = useState<FeedbackSignal>({
    briefingMissingOrWrong: true,
  });

  const classification = classifyFeedback(feedback);

  return (
    <section
      className="factory-lab"
      aria-labelledby="factory-title"
      data-selected-knowledge={pack.knowledge.length}
      data-feedback-route={classification.route}
    >
      <div className="factory-heading">
        <div>
          <span className="eyebrow">ALINA · AGENT FACTORY V0</span>
          <h2 id="factory-title">Makar Provisioning</h2>
          <p>
            ALINA показывает не только задачу, но и какой контекст получила роль,
            почему он выбран и куда уйдёт обратная связь.
          </p>
        </div>
        <StatusIndicator tone="success" label="Traceable delivery" />
      </div>

      <div className="factory-grid">
        <GlassPanel tone="elevated" glow="medium" className="factory-agent">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">AGENT PASSPORT</span>
              <h3>{pack.agent.name}</h3>
            </div>
            <Badge tone="info">KB-1</Badge>
          </div>

          <dl className="factory-dl">
            <div><dt>Role</dt><dd>{pack.agent.role}</dd></div>
            <div><dt>Task</dt><dd>{pack.task.taskId}</dd></div>
            <div><dt>Attention budget</dt><dd>{pack.agent.maxKnowledgeItems} items</dd></div>
            <div><dt>Delivery</dt><dd>{pack.trace.deliveryId}</dd></div>
          </dl>

          <p>{pack.agent.mission}</p>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="factory-knowledge">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">KNOWLEDGE PACK</span>
              <h3>{pack.knowledge.length} selected items</h3>
            </div>
            <Badge tone="success">BOUNDED</Badge>
          </div>

          <div className="factory-knowledge-list">
            {pack.trace.knowledge.map((item) => (
              <article key={item.id} data-knowledge-id={item.id}>
                <strong>{item.title}</strong>
                <span>{item.id}</span>
                <small>{item.reasons.join(" · ")}</small>
              </article>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="factory-artifacts">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">TASK PACK</span>
              <h3>Generated artifacts</h3>
            </div>
            <Badge tone="neutral">KB-2</Badge>
          </div>

          <div className="factory-files">
            {[
              "TASK.md",
              "CONTEXT.md",
              "KNOWLEDGE_PACK.md",
              "ACCEPTANCE.md",
              "RESULT.md",
              "context-package.json",
              "delivery-trace",
            ].map((name) => <span key={name}>{name}</span>)}
          </div>
        </GlassPanel>

        <GlassPanel tone="interactive" glow="medium" className="factory-feedback">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">FEEDBACK ROUTER</span>
              <h3>{classification.route}</h3>
            </div>
            <Badge tone="warning">EXPLAINABLE</Badge>
          </div>

          <div className="factory-feedback-buttons">
            {feedbackOptions.map((option) => (
              <Button
                key={option.label}
                variant="ghost"
                onClick={() => setFeedback(option.signal)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          <p>
            Failure is classified before ALINA changes knowledge or context.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
