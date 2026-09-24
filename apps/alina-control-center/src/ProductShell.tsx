import { useEffect, useMemo, useRef, useState } from "react";
import type { AvatarActivity, AvatarPresenceMode } from "@father/avatar-engine";
import {
  createDemoGateway,
  createDemoScenarioEnvelope,
  type DataEnvelope,
  type DataGateway,
  type GatewayScenarioId,
  type ScenarioSnapshot,
} from "@father/data-gateway";
import {
  Badge,
  Button,
  CommandBar,
  GlassPanel,
  StatusIndicator,
} from "@father/ui";
import shellContract from "../../../configs/alina-v1/product-shell.contract.json";
import { KnowledgeGraphWorkspace } from "./KnowledgeGraphWorkspace";
import { AlinaAvatarSurface } from "./AlinaAvatarSurface";
import { resolveProductAvatarMode } from "./alina-avatar-runtime";
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

const graphPositions = [
  { x: 18, y: 47 },
  { x: 42, y: 25 },
  { x: 64, y: 48 },
  { x: 45, y: 72 },
  { x: 79, y: 73 },
];

const defaultGateway = createDemoGateway();

function provenanceLabel(origin: DataEnvelope<unknown>["provenance"]["origin"]): string {
  if (origin === "demo") return "DEMO / MOCK";
  return origin.toUpperCase();
}

function loadingEnvelope(): DataEnvelope<ScenarioSnapshot> {
  const now = new Date().toISOString();
  return {
    state: "loading",
    data: null,
    provenance: {
      origin: "unavailable",
      sourceId: "pending-gateway",
      observedAt: null,
      receivedAt: now,
    },
  };
}

function PrimarySurface({
  scenarioId,
  snapshot,
  provenance,
}: {
  scenarioId: ScenarioId;
  snapshot: ScenarioSnapshot;
  provenance: string;
}) {
  const primary = snapshot.primary;

  if (scenarioId === "coding") {
    return (
      <div className="alina-code-surface">
        <div className="alina-code-tabs">
          <span className="is-active">{primary.content ?? "editor"}</span>
          <span>tests</span>
          <span>terminal</span>
        </div>
        <pre>{"const composition = alina.compose({\n  scenario: \"coding\",\n  primary: \"editor\",\n  attention: \"focused\",\n  avatar: \"compact\"\n});"}</pre>
        <div className="alina-terminal">
          <span>$ pnpm test</span>
          <strong>{snapshot.secondary.find((item) => item.id === "tests")?.summary ?? "tests pending"}</strong>
        </div>
      </div>
    );
  }

  if (scenarioId === "security") {
    const labels = primary.visualization?.data.map((item) => item.label) ?? [];
    return (
      <div className="alina-security-surface">
        <div className="alina-threat-orbit">
          <span className="threat-core">PRIMARY</span>
          <span className="threat-node threat-node-a">{labels[0] ?? "Asset"}</span>
          <span className="threat-node threat-node-b">{labels[1] ?? "Threat"}</span>
          <span className="threat-node threat-node-c">{labels[2] ?? "Control"}</span>
          <span className="threat-node threat-node-d">{labels[3] ?? "Alert"}</span>
        </div>
        <div className="alina-security-strip">
          <Badge tone="danger">CRITICAL · DEMO</Badge>
          <span>{snapshot.alerts[0]?.summary ?? "Нет критических событий"}</span>
        </div>
      </div>
    );
  }

  if (scenarioId === "presentation") {
    const confidence = primary.visualization?.data[0]?.value ?? 0;
    return (
      <div className="alina-presentation-surface">
        <div className="presentation-ring">
          <strong>{confidence}%</strong>
          <span>confidence · DEMO</span>
        </div>
        <div>
          <span className="eyebrow">PRIMARY NARRATIVE</span>
          <h3>{primary.title}</h3>
          <p>{primary.description}</p>
        </div>
      </div>
    );
  }

  if (scenarioId === "focus") {
    return (
      <article className="alina-focus-document">
        <span className="eyebrow">FOCUS DOCUMENT · DEMO</span>
        <h3>{primary.title}</h3>
        <p>{primary.description}</p>
        <blockquote>{primary.content ?? "Primary context remains stable."}</blockquote>
      </article>
    );
  }

  if (scenarioId === "research" && primary.graph) {
    return (
      <KnowledgeGraphWorkspace
        graph={primary.graph}
        provenance={provenance}
      />
    );
  }

  const nodes = primary.visualization?.data ?? [];
  return (
    <div className="alina-graph-surface" aria-label="DEMO knowledge graph">
      <svg className="alina-graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="18" y1="47" x2="42" y2="25" />
        <line x1="42" y1="25" x2="64" y2="48" />
        <line x1="18" y1="47" x2="45" y2="72" />
        <line x1="45" y1="72" x2="64" y2="48" />
        <line x1="64" y1="48" x2="79" y2="73" />
      </svg>
      {nodes.slice(0, graphPositions.length).map((node, index) => (
        <span
          key={node.label}
          className={"alina-graph-node alina-graph-node--node-" + index}
          style={{
            left: graphPositions[index].x + "%",
            top: graphPositions[index].y + "%",
          }}
        >
          {node.label}
        </span>
      ))}
      <span className="alina-graph-caption">{primary.description}</span>
    </div>
  );
}

export type ProductShellProps = {
  gateway?: DataGateway;
  initialEnvelope?: DataEnvelope<ScenarioSnapshot>;
};

export function ProductShell({
  gateway = defaultGateway,
  initialEnvelope,
}: ProductShellProps = {}) {
  const scenarioIds = Object.keys(shellContract.scenarios) as ScenarioId[];
  const tierIds = Object.keys(shellContract.performance) as PerformanceTier[];

  const [scenarioId, setScenarioId] = useState<ScenarioId>("research");
  const [tier, setTier] = useState<PerformanceTier>("cinematic");
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("Готова к работе");
  const [avatarActivity, setAvatarActivity] = useState<AvatarActivity>("idle");
  const [envelope, setEnvelope] = useState<DataEnvelope<ScenarioSnapshot>>(
    () =>
      initialEnvelope ??
      (gateway.id === "demo"
        ? createDemoScenarioEnvelope("research")
        : loadingEnvelope())
  );
  const requestSequence = useRef(0);

  const scenario = shellContract.scenarios[scenarioId];
  const snapshot = envelope.data;
  const avatarMode = useMemo(
    () =>
      resolveProductAvatarMode(
        scenario.avatar as AvatarPresenceMode,
        tier
      ),
    [scenario.avatar, tier]
  );

  useEffect(() => {
    let active = true;

    if (gateway.id !== "demo") {
      setEnvelope((current) => ({
        ...current,
        state: "loading",
      }));
    }

    void gateway.loadScenario(scenarioId as GatewayScenarioId).then((next) => {
      if (active) setEnvelope(next);
    });

    return () => {
      active = false;
    };
  }, [gateway, scenarioId]);

  const chooseScenario = (id: ScenarioId) => {
    setScenarioId(id);
    setAvatarActivity("idle");
    if (gateway.id === "demo") {
      setEnvelope(createDemoScenarioEnvelope(id as GatewayScenarioId));
    }
  };

  const primaryModule = snapshot?.primary.module ?? scenario.primary;
  const projectTitle = snapshot?.projectTitle ?? "ALINA Control Center";

  return (
    <main
      className="alina-product-shell"
      data-scenario={scenarioId}
      data-primary-module={primaryModule}
      data-avatar-presence={avatarMode}
      data-avatar-activity={avatarActivity}
      data-performance-tier={tier}
      data-provenance-origin={envelope.provenance.origin}
      data-data-state={envelope.state}
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
          <span className="alina-project-name">{projectTitle}</span>
          <Badge tone={envelope.provenance.origin === "live" ? "success" : "warning"}>
            {provenanceLabel(envelope.provenance.origin)}
          </Badge>
          <Badge tone={envelope.state === "ready" ? "success" : envelope.state === "stale" ? "warning" : "neutral"}>
            {envelope.state.toUpperCase()}
          </Badge>
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
              onClick={() => chooseScenario(id)}
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
                <h2>{snapshot?.primary.title ?? "Загрузка контекста…"}</h2>
                <p>{snapshot?.primary.description ?? "Ожидание источника данных."}</p>
              </div>
              <Badge tone="info">{primaryModule}</Badge>
            </div>

            {snapshot ? (
              <PrimarySurface
                scenarioId={scenarioId}
                snapshot={snapshot}
                provenance={envelope.provenance.origin}
              />
            ) : (
              <div className="alina-data-state">
                <strong>{envelope.state}</strong>
                <span>{envelope.error?.message ?? "Источник пока не предоставил данные."}</span>
              </div>
            )}

            <div className="alina-reason-trace">
              <span className="eyebrow">COMPOSITION TRACE</span>
              <code>{scenario.reason}</code>
              <code>{"primary:" + primaryModule}</code>
              <code>{"tier:" + tier}</code>
              <code>{"avatar:" + avatarMode}</code>
              <code>{"source:" + envelope.provenance.origin}</code>
              <code>{"state:" + envelope.state}</code>
            </div>
          </GlassPanel>

          <aside className="alina-secondary-plane">
            <GlassPanel tone="base" glow="soft" className="alina-context-panel">
              <div className="alina-plane-heading compact">
                <div>
                  <span className="eyebrow">SECONDARY CONTEXT</span>
                  <h3>Контекст задачи</h3>
                </div>
                <Badge tone="neutral">{snapshot?.secondary.length ?? 0}</Badge>
              </div>
              <div className="alina-context-list">
                {snapshot?.secondary.length ? snapshot.secondary.map((item) => (
                  <div key={item.id}>
                    <span className="context-dot" aria-hidden="true" />
                    <strong>{item.title}</strong>
                    <small>{item.summary ?? item.kind} · {envelope.provenance.origin.toUpperCase()}</small>
                  </div>
                )) : (
                  <p className="alina-empty-context">
                    {envelope.state === "loading" ? "Загрузка…" : "Нет вторичного контекста"}
                  </p>
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
              <div className="alina-stream-row"><Badge tone="info">PRIMARY</Badge><span>{primaryModule}</span></div>
              <div className="alina-stream-row"><Badge tone="neutral">BACKGROUND</Badge><span>{snapshot?.background.map((item) => item.title).join(" · ") || "suppressed"}</span></div>
              <div className="alina-stream-row">
                <Badge tone={snapshot?.alerts.some((item) => item.severity === "critical") ? "danger" : "warning"}>ALERT</Badge>
                <span>{snapshot?.alerts.map((item) => item.title).join(" · ") || "none"}</span>
              </div>
              <div className="alina-stream-row"><Badge tone="success">AGENT</Badge><span>{snapshot?.agentActivity.map((item) => item.agentId + ":" + item.status).join(" · ") || "hidden"}</span></div>
            </GlassPanel>
          </aside>

          <aside
            className={"alina-avatar-plane avatar-" + avatarMode}
            aria-label={avatarMode === "hidden" ? "ALINA hidden" : "ALINA " + avatarMode}
          >
            <AlinaAvatarSurface
              requestedMode={scenario.avatar as AvatarPresenceMode}
              tier={tier}
              activity={avatarActivity}
              taskId={scenarioId}
              contextRef={primaryModule}
              attentionLabel={snapshot?.primary.title ?? primaryModule}
              message={scenarioLabels[scenarioId] + " mode. " + lastCommand}
            />
          </aside>
        </section>

        {snapshot?.alerts.some((item) => item.severity === "critical") ? (
          <div className="alina-alert-overlay" role="status">
            <Badge tone="danger">CRITICAL · {envelope.provenance.origin.toUpperCase()}</Badge>
            <strong>{snapshot.alerts.find((item) => item.severity === "critical")?.title}</strong>
            <span>{snapshot.alerts.find((item) => item.severity === "critical")?.summary}</span>
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
            inputProps={{
              onFocus: () => setAvatarActivity("listening"),
              onBlur: () =>
                setAvatarActivity((current) =>
                  current === "listening" ? "idle" : current
                ),
            }}
            onSubmitCommand={(value) => {
              const trimmed = value.trim();
              if (!trimmed) return;

              requestSequence.current += 1;
              const requestId = "ui-" + requestSequence.current;
              setLastCommand("Отправка " + requestId + "…");
              setAvatarActivity("thinking");
              setCommand("");

              void gateway.submitCommand({
                text: trimmed,
                scenarioId: scenarioId as GatewayScenarioId,
                requestId,
              }).then((result) => {
                if (result.data) {
                  setLastCommand(result.data.message + " · " + result.data.correlationId);
                  setAvatarActivity("speaking");
                } else {
                  setLastCommand(result.error?.message ?? "Команда не принята");
                  setAvatarActivity("speaking");
                }
              });
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
