import { useMemo, useState } from "react";
import {
  composeInterface,
  type CompositionScenario,
  type PerformanceTier,
} from "@father/composition-engine";
import type { BreakpointMode, WorkspaceRegion } from "@father/workspace-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./composition-demo.css";

const scenarios: CompositionScenario[] = [
  "research",
  "coding",
  "security",
  "presentation",
  "focus",
];

const breakpoints: BreakpointMode[] = [
  "mobile",
  "laptop",
  "desktop",
  "ultrawide",
];

const modules = [
  "sources",
  "knowledge-graph",
  "context",
  "agent-activity",
  "editor",
  "project-tree",
  "terminal",
  "visualization",
  "alerts",
  "timeline",
  "document",
];

const regionOrder: WorkspaceRegion[] = [
  "left",
  "center",
  "right",
  "bottom",
  "overlay",
];

export function CompositionDemo() {
  const [scenario, setScenario] = useState<CompositionScenario>("research");
  const [breakpoint, setBreakpoint] = useState<BreakpointMode>("desktop");
  const [performanceTier, setPerformanceTier] =
    useState<PerformanceTier>("cinematic");
  const [interruptingAlert, setInterruptingAlert] = useState(false);

  const plan = useMemo(
    () =>
      composeInterface({
        scenario,
        breakpoint,
        performanceTier,
        reducedMotion: false,
        primaryStreamClass: "primary",
        interruptingAlert,
        availableModules: modules,
      }),
    [scenario, breakpoint, performanceTier, interruptingAlert]
  );

  return (
    <section className="composition-lab" aria-labelledby="composition-title">
      <div className="composition-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 006</span>
          <h2 id="composition-title">Composition Engine</h2>
          <p>
            Один набор модулей перестраивается под задачу, экран и режим
            производительности. ALINA объясняет каждое автоматическое решение.
          </p>
        </div>
        <div className="composition-heading-status">
          <Badge tone="warning">DEMO COMPOSITION</Badge>
          <StatusIndicator tone="success" label="reason trace active" />
        </div>
      </div>

      <GlassPanel tone="elevated" glow="medium" className="composition-control-panel">
        <div className="composition-control-group">
          <span className="eyebrow">SCENARIO</span>
          <div className="composition-buttons">
            {scenarios.map((value) => (
              <Button
                key={value}
                variant={scenario === value ? "primary" : "ghost"}
                onClick={() => setScenario(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="composition-control-group">
          <span className="eyebrow">BREAKPOINT</span>
          <div className="composition-buttons">
            {breakpoints.map((value) => (
              <Button
                key={value}
                variant={breakpoint === value ? "primary" : "ghost"}
                onClick={() => setBreakpoint(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="composition-control-group">
          <span className="eyebrow">PERFORMANCE</span>
          <div className="composition-buttons">
            {(["core", "enhanced", "cinematic"] as PerformanceTier[]).map((value) => (
              <Button
                key={value}
                variant={performanceTier === value ? "primary" : "ghost"}
                onClick={() => setPerformanceTier(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="composition-control-group">
          <span className="eyebrow">ALERT POLICY</span>
          <Button
            variant={interruptingAlert ? "primary" : "ghost"}
            onClick={() => setInterruptingAlert((value) => !value)}
          >
            {interruptingAlert ? "Interrupting alert ON" : "Interrupting alert OFF"}
          </Button>
        </div>
      </GlassPanel>

      <div
        className={`composition-canvas scenario-${scenario} breakpoint-${breakpoint}`}
        data-scenario={scenario}
        data-breakpoint={breakpoint}
        data-primary-module={plan.primaryModuleId}
        data-avatar-presence={plan.avatar.presence}
      >
        {regionOrder.map((region) => {
          const regionModules = plan.modules.filter(
            (module) => module.region === region && module.visible
          );

          if (regionModules.length === 0 && region !== "overlay") return null;

          return (
            <div
              key={region}
              className={`composition-region region-${region}`}
              data-region={region}
            >
              <span className="composition-region-label">{region}</span>

              {regionModules.map((module) => (
                <article
                  key={module.id}
                  className={`composition-module role-${module.role} ${
                    module.id === plan.primaryModuleId ? "is-primary" : ""
                  } ${module.collapsed ? "is-collapsed" : ""}`}
                  data-composition-module={module.id}
                  data-module-role={module.role}
                  data-collapsed={String(module.collapsed)}
                >
                  <div className="composition-module-topline">
                    <strong>{module.id}</strong>
                    <Badge tone={module.role === "primary" ? "info" : "neutral"}>
                      {module.role}
                    </Badge>
                  </div>
                  <span>
                    {module.visualization
                      ? `visualization: ${module.visualization}`
                      : module.collapsed
                        ? "collapsed"
                        : "active module"}
                  </span>
                </article>
              ))}

              {region === plan.avatar.region && plan.avatar.visible ? (
                <div
                  className={`composition-avatar avatar-${plan.avatar.presence}`}
                  data-composition-avatar={plan.avatar.presence}
                >
                  <span>ALINA</span>
                  <strong>{plan.avatar.presence}</strong>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="composition-summary">
        <GlassPanel tone="base" glow="soft">
          <span className="eyebrow">PLAN</span>
          <dl>
            <div><dt>scenario</dt><dd>{plan.scenario}</dd></div>
            <div><dt>primary</dt><dd>{plan.primaryModuleId}</dd></div>
            <div><dt>density</dt><dd>{plan.density}</dd></div>
            <div><dt>avatar</dt><dd>{plan.avatar.visible ? plan.avatar.presence : "hidden"}</dd></div>
          </dl>
        </GlassPanel>

        <GlassPanel tone="base" glow="none">
          <span className="eyebrow">WHY</span>
          <ul className="composition-reasons">
            {plan.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </section>
  );
}
