import type {
  CommandRequest,
  CommandResult,
  DataEnvelope,
  DataGateway,
  GatewayScenarioId,
  ScenarioSnapshot,
  StreamRecord,
} from "./types";

const createdAt = "2026-09-24T00:00:00.000Z";

function background(id: string, title: string, summary: string): StreamRecord {
  return {
    id,
    class: "background",
    title,
    summary,
    urgency: 0.2,
    costOfMissing: 0.2,
    createdAt,
  };
}

const scenarios: Record<GatewayScenarioId, ScenarioSnapshot> = {
  research: {
    scenarioId: "research",
    projectTitle: "Makar Frontend Factory",
    primary: {
      module: "knowledge-graph",
      title: "Исследование связей и доказательств",
      description: "Факты, документы, сущности и гипотезы в одной причинно-связной модели.",
      visualization: {
        intent: "relate",
        formHint: "graph",
        data: [
          { label: "Факт", value: 92 },
          { label: "Источник", value: 84 },
          { label: "Сущность", value: 76 },
          { label: "Гипотеза", value: 61 },
          { label: "Контроль", value: 48 },
        ],
      },
    },
    secondary: [
      { id: "sources", title: "Источники", summary: "12 материалов", kind: "source" },
      { id: "hypotheses", title: "Гипотезы", summary: "3 активных", kind: "hypothesis" },
      { id: "entities", title: "Сущности", summary: "28 связанных", kind: "entity" },
    ],
    background: [
      background("indexing", "Индексация", "Фоновая обработка документов"),
      background("rag", "RAG", "Обновление retrieval-контекста"),
      background("osint", "OSINT", "Сбор новых источников"),
    ],
    alerts: [
      { id: "contradiction", severity: "warning", title: "Противоречие", summary: "Требует проверки", acknowledged: false },
    ],
    agentActivity: [
      { id: "makar", agentId: "makar", title: "Frontend task", status: "completed", summary: "M1.2 product shell" },
    ],
  },
  coding: {
    scenarioId: "coding",
    projectTitle: "Makar Frontend Factory",
    primary: {
      module: "editor",
      title: "Разработка и проверка изменений",
      description: "Код, контекст задачи и результаты проверок в одном рабочем контуре.",
      content: "ProductShell.tsx",
    },
    secondary: [
      { id: "terminal", title: "Terminal", summary: "pnpm test", kind: "task" },
      { id: "tests", title: "Tests", summary: "48 checks · DEMO", kind: "metric" },
      { id: "architecture", title: "Architecture", summary: "contracts available", kind: "document" },
    ],
    background: [
      background("build", "Build", "Build pipeline"),
      background("indexing", "Indexing", "Code index refresh"),
    ],
    alerts: [],
    agentActivity: [
      { id: "makar-code", agentId: "makar", title: "Implementation", status: "working", summary: "Data Gateway integration" },
    ],
  },
  security: {
    scenarioId: "security",
    projectTitle: "Makar Frontend Factory",
    primary: {
      module: "security-graph",
      title: "Оперативная картина безопасности",
      description: "Активы, угрозы, события и критические связи с приоритетом внимания.",
      visualization: {
        intent: "relate",
        formHint: "network",
        data: [
          { label: "Asset", value: 84 },
          { label: "Threat", value: 95 },
          { label: "Control", value: 71 },
          { label: "Alert", value: 100 },
        ],
      },
    },
    secondary: [
      { id: "alerts", title: "Alerts", summary: "1 critical · DEMO", kind: "task" },
      { id: "assets", title: "Assets", summary: "24 tracked", kind: "entity" },
      { id: "timeline", title: "Timeline", summary: "12 events", kind: "task" },
      { id: "controls", title: "Controls", summary: "8 active", kind: "metric" },
    ],
    background: [
      background("scan", "Scans", "Background scan"),
      background("enrichment", "Enrichment", "Context enrichment"),
      background("correlation", "Correlation", "Event correlation"),
    ],
    alerts: [
      { id: "critical-security", severity: "critical", title: "Security stream requests interruption", summary: "Only qualifying alerts may cross the primary attention boundary.", acknowledged: false },
    ],
    agentActivity: [
      { id: "soc", agentId: "security-agent", title: "Correlation", status: "working", summary: "Investigating DEMO alert" },
    ],
  },
  presentation: {
    scenarioId: "presentation",
    projectTitle: "Makar Frontend Factory",
    primary: {
      module: "visualization",
      title: "Подача выводов и визуальная история",
      description: "Один крупный визуальный тезис с минимальным интерфейсным шумом.",
      visualization: {
        intent: "monitor",
        formHint: "metric",
        data: [{ label: "confidence", value: 92 }],
      },
    },
    secondary: [
      { id: "presenter-notes", title: "Presenter notes", summary: "available", kind: "document" },
    ],
    background: [],
    alerts: [],
    agentActivity: [],
  },
  focus: {
    scenarioId: "focus",
    projectTitle: "Makar Frontend Factory",
    primary: {
      module: "document-or-editor",
      title: "Один объект. Никакого лишнего шума.",
      description: "Сфокусированная работа с одним документом или задачей.",
      content: "Primary context remains stable while background work continues silently.",
    },
    secondary: [],
    background: [],
    alerts: [],
    agentActivity: [],
  },
};

export function createDemoScenarioEnvelope(
  id: GatewayScenarioId,
  now = new Date().toISOString()
): DataEnvelope<ScenarioSnapshot> {
  return {
    state: "ready",
    data: scenarios[id],
    provenance: {
      origin: "demo",
      sourceId: "alina-demo-adapter",
      observedAt: now,
      receivedAt: now,
      staleAfterMs: 60_000,
    },
  };
}

export function createDemoGateway(): DataGateway {
  return {
    id: "demo",
    async loadScenario(id) {
      return createDemoScenarioEnvelope(id);
    },
    async submitCommand(request: CommandRequest): Promise<DataEnvelope<CommandResult>> {
      const now = new Date().toISOString();
      const correlationId = "demo:" + request.requestId;
      return {
        state: "ready",
        data: {
          requestId: request.requestId,
          correlationId,
          accepted: true,
          message: "DEMO command accepted",
          targetAgentId: request.targetAgentId,
        },
        provenance: {
          origin: "demo",
          sourceId: "alina-demo-command-adapter",
          observedAt: now,
          receivedAt: now,
          correlationId,
        },
      };
    },
  };
}
