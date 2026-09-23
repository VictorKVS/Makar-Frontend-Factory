import { useMemo, useState } from "react";
import {
  applyBreakpoint,
  createWorkspace,
  dockPanel,
  floatPanel,
  focusPanel,
  restoreWorkspace,
  setPanelCollapsed,
  type WorkspacePanel,
  type WorkspaceState,
} from "@father/workspace-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./workspace-demo.css";

const initialWorkspace = createWorkspace({
  id: "alina-workspace-demo",
  breakpointMode: "desktop",
  panels: [
    {
      id: "graph",
      contentType: "knowledge-graph",
      title: "Knowledge Graph",
      region: "center",
      mode: "docked",
      order: 1,
      collapsed: false,
    },
    {
      id: "context",
      contentType: "project-context",
      title: "Project Context",
      region: "right",
      mode: "docked",
      order: 2,
      collapsed: false,
    },
    {
      id: "activity",
      contentType: "activity-feed",
      title: "Agent Activity",
      region: "bottom",
      mode: "docked",
      order: 3,
      collapsed: false,
    },
  ],
});

function PanelBody({ panel }: { panel: WorkspacePanel }) {
  if (panel.contentType === "knowledge-graph") {
    return (
      <div className="workspace-graph-preview" aria-label="Knowledge graph demo">
        <span className="node node-a">152-ФЗ</span>
        <span className="node node-b">ПДн</span>
        <span className="node node-c">Система</span>
        <span className="node node-d">Риск</span>
      </div>
    );
  }

  if (panel.contentType === "project-context") {
    return (
      <dl className="workspace-context-list">
        <div><dt>Проект</dt><dd>ALINA Frontend</dd></div>
        <div><dt>Этап</dt><dd>M0.3 Workspace</dd></div>
        <div><dt>Режим</dt><dd>{panel.mode}</dd></div>
        <div><dt>Регион</dt><dd>{panel.region}</dd></div>
      </dl>
    );
  }

  return (
    <ol className="workspace-activity-list">
      <li>Context package v1.0 loaded</li>
      <li>Repository Contract attached</li>
      <li>Workspace state is serializable</li>
    </ol>
  );
}

export function WorkspaceDemo() {
  const [workspace, setWorkspace] = useState<WorkspaceState>(initialWorkspace);

  const visiblePanels = useMemo(() => {
    if (!workspace.focusedPanelId) return workspace.panels;
    return workspace.panels.filter((panel) => panel.id === workspace.focusedPanelId);
  }, [workspace]);

  return (
    <GlassPanel className="workspace-demo" tone="elevated" glow="medium">
      <div className="workspace-demo-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 002</span>
          <h3>Workspace Engine</h3>
          <p>
            Один и тот же набор модулей меняет расположение и режим, не теряя идентичность.
          </p>
        </div>
        <div className="workspace-demo-meta">
          <Badge tone="warning">DEMO / MOCK</Badge>
          <StatusIndicator tone="success" label={`mode: ${workspace.breakpointMode}`} />
        </div>
      </div>

      <div className="workspace-controls" aria-label="Workspace controls">
        <Button
          variant="secondary"
          onClick={() => setWorkspace((state) => focusPanel(state, "graph"))}
        >
          Focus Graph
        </Button>
        <Button
          variant="secondary"
          onClick={() => setWorkspace((state) => floatPanel(state, "context"))}
        >
          Float Context
        </Button>
        <Button
          variant="secondary"
          onClick={() => setWorkspace((state) => dockPanel(state, "context", "left", 0))}
        >
          Dock Context Left
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            setWorkspace((state) =>
              setPanelCollapsed(
                state,
                "activity",
                !state.panels.find((panel) => panel.id === "activity")?.collapsed
              )
            )
          }
        >
          Toggle Activity
        </Button>
        <Button
          variant="secondary"
          onClick={() => setWorkspace((state) => applyBreakpoint(state, "mobile"))}
        >
          Mobile Transform
        </Button>
        <Button variant="ghost" onClick={() => setWorkspace(initialWorkspace)}>
          Reset
        </Button>
        <Button variant="ghost" onClick={() => setWorkspace((state) => restoreWorkspace(state))}>
          Restore
        </Button>
      </div>

      <div
        className={`workspace-grid ${workspace.focusedPanelId ? "is-focused" : ""}`}
        data-breakpoint={workspace.breakpointMode}
      >
        {visiblePanels.map((panel) => {
          if (panel.collapsed) {
            return (
              <button
                key={panel.id}
                type="button"
                className={`workspace-collapsed region-${panel.region}`}
                onClick={() => setWorkspace((state) => setPanelCollapsed(state, panel.id, false))}
              >
                <span>{panel.title}</span>
                <Badge tone="neutral">collapsed</Badge>
              </button>
            );
          }

          return (
            <GlassPanel
              key={panel.id}
              className={`workspace-module region-${panel.region} mode-${panel.mode}`}
              tone={panel.mode === "floating" ? "interactive" : "base"}
              glow={panel.mode === "floating" ? "strong" : "soft"}
              tabIndex={0}
              data-panel-id={panel.id}
            >
              <header className="workspace-module-header">
                <div>
                  <span className="workspace-module-id">{panel.id}</span>
                  <h4>{panel.title}</h4>
                </div>
                <div>
                  <Badge tone={panel.mode === "floating" ? "info" : "neutral"}>{panel.mode}</Badge>
                  {workspace.focusedPanelId === panel.id ? (
                    <Button variant="ghost" onClick={() => setWorkspace((state) => focusPanel(state, null))}>
                      Exit focus
                    </Button>
                  ) : null}
                </div>
              </header>
              <PanelBody panel={panel} />
            </GlassPanel>
          );
        })}
      </div>

      <details className="workspace-state-preview">
        <summary>Serializable workspace state</summary>
        <pre>{JSON.stringify(workspace, null, 2)}</pre>
      </details>
    </GlassPanel>
  );
}
