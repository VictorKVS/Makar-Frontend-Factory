import { useMemo, useState } from "react";
import {
  allNodeKinds,
  createGraphWorkspaceState,
  deriveGraphView,
  focusNode,
  nodeById,
  selectNode,
  setFallbackMode,
  setVisibleKinds,
  type GraphDocument,
  type GraphNodeKind,
} from "@father/graph-model";
import { Badge, Button, GlassPanel } from "@father/ui";
import "./knowledge-graph-workspace.css";

const positions: Record<string, { x: number; y: number }> = {
  "fact-1": { x: 48, y: 48 },
  "source-1": { x: 20, y: 24 },
  "entity-1": { x: 75, y: 28 },
  "hypothesis-1": { x: 22, y: 74 },
  "control-1": { x: 76, y: 74 },
};

const kindTone: Record<GraphNodeKind, "info" | "success" | "warning" | "danger" | "neutral"> = {
  fact: "success",
  source: "info",
  entity: "neutral",
  hypothesis: "warning",
  control: "info",
  task: "neutral",
};

export function KnowledgeGraphWorkspace({
  graph,
  provenance,
}: {
  graph: GraphDocument;
  provenance: string;
}) {
  const [state, setState] = useState(() => createGraphWorkspaceState());
  const view = useMemo(() => deriveGraphView(graph, state), [graph, state]);
  const selected = nodeById(graph, state.selectedNodeId);
  const contradictionIds = new Set(
    graph.edges
      .filter((edge) => edge.kind === "contradicts")
      .flatMap((edge) => [edge.source, edge.target])
  );

  const toggleKind = (kind: GraphNodeKind) => {
    const exists = state.visibleKinds.includes(kind);
    const next = exists
      ? state.visibleKinds.filter((item) => item !== kind)
      : [...state.visibleKinds, kind];

    setState(setVisibleKinds(state, next.length ? next : [kind]));
  };

  return (
    <section
      className="knowledge-graph-workspace"
      data-graph-mode={state.fallbackMode}
      data-focused-node={state.focusedNodeId ?? ""}
      data-selected-node={state.selectedNodeId ?? ""}
      aria-label="Knowledge Graph Workspace"
    >
      <div className="kg-toolbar">
        <div className="kg-kinds" aria-label="Node filters">
          {allNodeKinds.map((kind) => (
            <Button
              key={kind}
              variant={state.visibleKinds.includes(kind) ? "primary" : "ghost"}
              onClick={() => toggleKind(kind)}
              aria-pressed={state.visibleKinds.includes(kind)}
            >
              {kind}
            </Button>
          ))}
        </div>

        <div className="kg-view-switch">
          <Button
            variant={state.fallbackMode === "graph" ? "primary" : "ghost"}
            onClick={() => setState(setFallbackMode(state, "graph"))}
          >
            Graph
          </Button>
          <Button
            variant={state.fallbackMode === "list" ? "primary" : "ghost"}
            onClick={() => setState(setFallbackMode(state, "list"))}
          >
            Accessible list
          </Button>
          {state.focusedNodeId ? (
            <Button variant="ghost" onClick={() => setState(focusNode(state, null))}>
              Clear focus
            </Button>
          ) : null}
        </div>
      </div>

      <div className="kg-layout">
        <GlassPanel className="kg-canvas-panel" tone="base" glow="soft">
          <div className="kg-heading">
            <div>
              <span className="eyebrow">KNOWLEDGE GRAPH · {provenance.toUpperCase()}</span>
              <h3>{graph.title}</h3>
            </div>
            <Badge tone="warning">DEMO GRAPH</Badge>
          </div>

          {state.fallbackMode === "graph" ? (
            <div className="kg-canvas" role="group" aria-label="Interactive graph">
              <svg className="kg-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {view.edges.map((edge) => {
                  const from = positions[edge.source];
                  const to = positions[edge.target];
                  if (!from || !to) return null;
                  return (
                    <line
                      key={edge.id}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      data-edge-kind={edge.kind}
                    />
                  );
                })}
              </svg>

              {view.nodes.map((node) => {
                const pos = positions[node.id] ?? { x: 50, y: 50 };
                const selectedNode = state.selectedNodeId === node.id;
                const contradictory = contradictionIds.has(node.id);

                return (
                  <button
                    type="button"
                    key={node.id}
                    className="kg-node"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    data-kind={node.kind}
                    data-contradiction={String(contradictory)}
                    data-selected={String(selectedNode)}
                    onClick={() => setState(selectNode(state, node.id))}
                    onDoubleClick={() => setState(focusNode(selectNode(state, node.id), node.id))}
                    aria-label={`${node.kind}: ${node.label}`}
                  >
                    <span>{node.label}</span>
                    <small>{node.kind}</small>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="kg-accessible-list" role="list">
              {view.nodes.map((node) => (
                <button
                  type="button"
                  role="listitem"
                  key={node.id}
                  onClick={() => setState(selectNode(state, node.id))}
                  className="kg-list-row"
                >
                  <Badge tone={kindTone[node.kind]}>{node.kind}</Badge>
                  <strong>{node.label}</strong>
                  <span>{node.summary ?? "No summary"}</span>
                  <small>confidence {Math.round((node.confidence ?? 0) * 100)}%</small>
                </button>
              ))}
            </div>
          )}

          <div className="kg-edge-legend" aria-label="Relationship legend">
            <span>supports</span>
            <span>contradicts</span>
            <span>derived-from</span>
            <span>relates-to</span>
            <span>controls</span>
          </div>
        </GlassPanel>

        <GlassPanel className="kg-inspector" tone="elevated" glow="none">
          <div className="kg-heading compact">
            <div>
              <span className="eyebrow">NODE INSPECTOR</span>
              <h3>{selected?.label ?? "Select a node"}</h3>
            </div>
            {selected ? <Badge tone={kindTone[selected.kind]}>{selected.kind}</Badge> : null}
          </div>

          {selected ? (
            <>
              <p>{selected.summary}</p>
              <dl className="kg-details">
                <div><dt>ID</dt><dd>{selected.id}</dd></div>
                <div><dt>Confidence</dt><dd>{Math.round((selected.confidence ?? 0) * 100)}%</dd></div>
                <div><dt>Evidence</dt><dd>{selected.evidenceRefs?.join(", ") || "none"}</dd></div>
                <div><dt>Provenance</dt><dd>{selected.provenanceRefs?.join(", ") || provenance}</dd></div>
              </dl>

              <Button
                variant="primary"
                onClick={() => setState(focusNode(state, selected.id))}
              >
                Focus neighborhood
              </Button>

              {contradictionIds.has(selected.id) ? (
                <div className="kg-contradiction" role="status">
                  <Badge tone="danger">CONTRADICTION</Badge>
                  <span>
                    This node participates in an explicit contradicts relation.
                    Meaning remains available in text, not color alone.
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <p className="kg-empty">
              Выберите узел. Инспектор покажет доказательства, уверенность и происхождение.
            </p>
          )}
        </GlassPanel>
      </div>
    </section>
  );
}
