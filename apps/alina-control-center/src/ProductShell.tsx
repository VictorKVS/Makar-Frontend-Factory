import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  CommandBar,
  GlassPanel,
  StatusIndicator,
} from "@father/ui";
import shellContract from "../../../configs/alina-v1/product-shell.contract.json";
import "./product-shell.css";

type ScenarioId = keyof typeof shellContract.scenarios;
type PerformanceTier = keyof typeof shellContract.performance;

const scenarioLabels: Record<ScenarioId, string> = {
  research: "Research",
  coding: "Coding",
  security: "Security",
  presentation: "Presentation",
  focus: "Focus",
};

const scenarioTitles: Record<ScenarioId, string> = {
  research: "Исследование связей и доказательств",
  coding: "Разработка и проверка изменений",
  security: "Оперативная картина безопасности",
  presentation: "Подача выводов и визуальная история",
  focus: "Один объект. Никакого лишнего шума.",
};

const primaryDescriptions: Record<string, string> = {
  "knowledge-graph": "Факты, документы, сущности и гипотезы в одной причинно-связной модели.",
  editor: "Код, контекст задачи и результат проверок в одном рабочем контуре.",
  "security-graph": "Активы, угрозы, события и критические связи с приоритетом внимания.",
  visualization: "Один крупный визуальный тезис с минимальным интерфейсным шумом.",
  "document-or-editor": "Сфокусированная работа с одним документом или задачей.",
};

const demoNodes = [
  { id: "fact", label: "Факт", x: 18, y: 47 },
  { id: "source", label: "Источник", x: 42, y: 25 },
  { id: "entity", label: "Сущность", x: 64, y: 48 },
  { id: "hypothesis", label: "Гипотеза", x: 45, y: 72 },
  { id: "control", label: "Контроль", x: 79, y: 73 },
];

function resolveAvatar(requested: string, tier: PerformanceTier): string {
  if (requested === "hidden") return "hidden";
  if (tier === "core") return requested === "voice-only" ? "voice-only" : "portrait";
  if (tier === "enhanced" && (requested === "hologram" || requested === "full")) {
    return "bust";
  }
  return requested;
}

function PrimarySurface({
  scenarioId,
  primary,
}: {
  scenarioId: ScenarioId;
  primary: string;
}) {
  if (scenarioId === "coding") {
    return (
      <div className="alina-code-surface">
        <div className="alina-code-tabs">
          <span className="is-active">ProductShell.tsx</span>
          <span>tests</span>
          <span>terminal</span>
        </div>
        <pre>{"const composition = alina.compose({\n  scenario: \"coding\",\n  primary: \"editor\",\n  attention: \"focused\",\n  avatar: \"compact\"\n});"}</pre>
        <div className="alina-terminal">
          <span>$ pnpm test</span>
          <strong>✓ 48 checks passed · DEMO</strong>
        </div>
      </div>
    );
  }

  if (scenarioId === "security") {
    return (
      <div className="alina-security-surface">
        <div className="alina-threat-orbit">
          <span className="threat-core">PRIMARY</span>
          <span className="threat-node threat-node-a">Asset</span>
          <span className="threat-node threat-node-b">Threat</span>
          <span className="threat-node threat-node-c">Control</span>
          <span className="threat-node threat-node-d">Alert</span>
        </div>
        <div className="alina-security-strip">
          <Badge tone="danger">CRITICAL · DEMO</Badge>
          <span>Контекст корреляции готов к анализу</span>
        </div>
      </div>
    );
  }

  if (scenarioId === "presentation") {
    return (
      <div className="alina-presentation-surface">
        <div className="presentation-ring">
          <strong>92%</strong>
          <span>confidence · DEMO</span>
        </div>
        <div>
          <span className="eyebrow">PRIMARY NARRATIVE</span>
          <h3>Связь подтверждена несколькими независимыми источниками</h3>
          <p>Сцена очищена от вторичных потоков и оставляет только тезис, доказательство и ALINA.</p>
        </div>
      </div>
    );
  }

  if (scenarioId === "focus") {
    return (
      <article className="alina-focus-document">
        <span className="eyebrow">FOCUS DOCUMENT · DEMO</span>
        <h3>Рабочая гипотеза</h3>
        <p>
          Интерфейс удерживает один активный объект. Вторичные панели не исчезают из состояния,
          но не конкурируют за внимание.
        </p>
        <blockquote>
          Primary context remains stable while background work continues silently.
        </blockquote>
      </article>
    );
  }

  return (
    <div className="alina-graph-surface" aria-label="DEMO knowledge graph">
      <svg className="alina-graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="18" y1="47" x2="42" y2="25" />
        <line x1="42" y1="25" x2="64" y2="48" />
        <line x1="18" y1="47" x2="45" y2="72" />
        <line x1="45" y1="72" x2="64" y2="48" />
        <line x1="64" y1="48" x2="79" y2="73" />
      </svg>
      {demoNodes.map((node) => (
        <span
          key={node.id}
          className={"alina-graph-node alina-graph-node--" + node.id}
          style={{ left: node.x + "%", top: node.y + "%" }}
        >
          {node.label}
        </span>
      ))}
      <span className="alina-graph-caption">{primaryDescriptions[primary]}</span>
    </div>
  );
}

export function ProductShell() {
  const scenarioIds = Object.keys(shellContract.scenarios) as ScenarioId[];
  const tierIds = Object.keys(shellContract.performance) as PerformanceTier[];

  const [scenarioId, setScenarioId] = useState<ScenarioId>("research");
  const [tier, setTier] = useState<PerformanceTier>("cinematic");
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("Готова к работе");

  const scenario = shellContract.scenarios[scenarioId];
  const avatarMode = useMemo(
    () => resolveAvatar(scenario.avatar, tier),
    [scenario.avatar, tier]
  );

  return (
    <main
      className="alina-product-shell"
      data-scenario={scenarioId}
      data-primary-module={scenario.primary}
      data-avatar-presence={avatarMode}
      data-performance-tier={tier}
    >
      <div className="alina-ambient" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-orb ambient-orb-a" />
        <div className="ambient-orb ambient-orb-b" />
      </div>

      <header className="alina-product-topbar">
        <div className="alina-product-brand">
          <span className="alina-symbol" aria-hidden="true">△</span>
          <div>
            <span className="eyebrow">FATHER · CONTROL CENTER</span>
            <h1>ALINA</h1>
          </div>
        </div>

        <div className="alina-topbar-center">
          <span className="alina-project-name">Makar Frontend Factory</span>
          <Badge tone="warning">DEMO / MOCK</Badge>
        </div>

        <div className="alina-system-status">
          <StatusIndicator tone="success" label="Agent Factory online" />
          <span className="alina-tier-label">{tier}</span>
        </div>
      </header>

      <aside className="alina-product-nav" aria-label="ALINA product navigation">
        <nav>
          <button className="alina-nav-action is-active" type="button"><span>01</span><strong>Workspace</strong></button>
          <button className="alina-nav-action" type="button"><span>02</span><strong>Knowledge</strong></button>
          <button className="alina-nav-action" type="button"><span>03</span><strong>Agents</strong></button>
          <button className="alina-nav-action" type="button"><span>04</span><strong>Projects</strong></button>
          <button className="alina-nav-action" type="button"><span>05</span><strong>Signals</strong></button>
        </nav>

        <div className="alina-nav-foot">
          <span className="eyebrow">MODE</span>
          <strong>{scenarioLabels[scenarioId]}</strong>
          <small>{scenario.reason}</small>
        </div>
      </aside>

      <section className="alina-product-stage">
        <div className="alina-scenario-strip" aria-label="Scenario">
          {scenarioIds.map((id) => (
            <Button
              key={id}
              variant={scenarioId === id ? "primary" : "ghost"}
              onClick={() => setScenarioId(id)}
              aria-pressed={scenarioId === id}
            >
              {scenarioLabels[id]}
            </Button>
          ))}
        </div>

        <section className="alina-work-grid">
          <GlassPanel className="alina-primary-plane" tone="elevated" glow="medium">
            <div className="alina-plane-heading">
              <div>
                <span className="eyebrow">PRIMARY WORK PLANE</span>
                <h2>{scenarioTitles[scenarioId]}</h2>
                <p>{primaryDescriptions[scenario.primary]}</p>
              </div>
              <Badge tone="info">{scenario.primary}</Badge>
            </div>

            <PrimarySurface scenarioId={scenarioId} primary={scenario.primary} />

            <div className="alina-reason-trace">
              <span className="eyebrow">COMPOSITION TRACE</span>
              <code>{scenario.reason}</code>
              <code>{"primary:" + scenario.primary}</code>
              <code>{"tier:" + tier}</code>
              <code>{"avatar:" + avatarMode}</code>
            </div>
          </GlassPanel>

          <aside className="alina-secondary-plane">
            <GlassPanel tone="base" glow="soft" className="alina-context-panel">
              <div className="alina-plane-heading compact">
                <div>
                  <span className="eyebrow">SECONDARY CONTEXT</span>
                  <h3>Контекст задачи</h3>
                </div>
                <Badge tone="neutral">{scenario.secondary.length}</Badge>
              </div>
              <div className="alina-context-list">
                {scenario.secondary.length ? scenario.secondary.map((item) => (
                  <div key={item}>
                    <span className="context-dot" aria-hidden="true" />
                    <strong>{item}</strong>
                    <small>available · DEMO</small>
                  </div>
                )) : (
                  <p className="alina-empty-context">Скрыто режимом фокуса</p>
                )}
              </div>
            </GlassPanel>

            <GlassPanel tone="base" glow="none" className="alina-stream-panel">
              <div className="alina-plane-heading compact">
                <div>
                  <span className="eyebrow">INFORMATION STREAMS</span>
                  <h3>Attention budget</h3>
                </div>
              </div>
              <div className="alina-stream-row"><Badge tone="info">PRIMARY</Badge><span>{scenario.primary}</span></div>
              <div className="alina-stream-row"><Badge tone="neutral">BACKGROUND</Badge><span>{scenario.background.join(" · ") || "suppressed"}</span></div>
              <div className="alina-stream-row">
                <Badge tone={scenario.alerts.some((item) => item.includes("critical")) ? "danger" : "warning"}>ALERT</Badge>
                <span>{scenario.alerts.join(" · ")}</span>
              </div>
              <div className="alina-stream-row"><Badge tone="success">AGENT</Badge><span>{scenario.agent_activity}</span></div>
            </GlassPanel>
          </aside>

          <aside
            className={"alina-avatar-plane avatar-" + avatarMode}
            aria-label={avatarMode === "hidden" ? "ALINA hidden" : "ALINA " + avatarMode}
          >
            {avatarMode === "hidden" ? (
              <div className="alina-avatar-hidden">
                <span className="eyebrow">ALINA PRESENCE</span>
                <strong>hidden</strong>
                <small>state retained</small>
              </div>
            ) : (
              <>
                <div className="alina-avatar-rings" aria-hidden="true"><span /><span /><span /></div>
                <div className="alina-avatar-figure">
                  <div className="alina-avatar-head" />
                  <div className="alina-avatar-body" />
                  <strong>ALINA</strong>
                  <span>{avatarMode}</span>
                </div>
                <div className="alina-avatar-message">
                  <span className="eyebrow">PRESENCE</span>
                  <p>{scenarioLabels[scenarioId]} mode. {lastCommand}</p>
                </div>
              </>
            )}
          </aside>
        </section>

        {scenarioId === "security" ? (
          <div className="alina-alert-overlay" role="status">
            <Badge tone="danger">CRITICAL · DEMO</Badge>
            <strong>Security stream requests interruption</strong>
            <span>Only qualifying alerts may cross the primary attention boundary.</span>
          </div>
        ) : null}

        <footer className="alina-command-plane">
          <div className="alina-tier-switch" aria-label="Performance tier">
            {tierIds.map((id) => (
              <Button
                key={id}
                variant={tier === id ? "primary" : "ghost"}
                onClick={() => setTier(id)}
                aria-pressed={tier === id}
              >
                {id}
              </Button>
            ))}
          </div>

          <CommandBar
            value={command}
            onValueChange={setCommand}
            onSubmitCommand={(value) => {
              const trimmed = value.trim();
              if (!trimmed) return;
              setLastCommand(trimmed);
              setCommand("");
            }}
            placeholder="Спросите ALINA или поставьте задачу агенту…"
            startSlot={<span aria-hidden="true">✦</span>}
            endSlot={<Button type="submit" variant="primary">Отправить</Button>}
          />
        </footer>
      </section>
    </main>
  );
}
