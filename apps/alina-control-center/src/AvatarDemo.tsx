import { useMemo, useState } from "react";
import {
  createAvatarState,
  negotiateAvatarPresentation,
  setAttentionTarget,
  setAvatarActivity,
  setAvatarTask,
  setPresenceMode,
  type AvatarActivity,
  type AvatarPresenceMode,
  type AvatarRendererProfile,
} from "@father/avatar-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./avatar-demo.css";

const presenceModes: AvatarPresenceMode[] = [
  "compact",
  "portrait",
  "bust",
  "full",
  "hologram",
  "voice-only",
  "hidden",
];

const activities: AvatarActivity[] = [
  "idle",
  "listening",
  "thinking",
  "speaking",
  "working",
];

const renderers: Record<string, AvatarRendererProfile> = {
  cinematic: {
    id: "cinematic",
    supportedModes: [
      "hologram",
      "full",
      "bust",
      "portrait",
      "compact",
      "voice-only",
      "hidden",
    ],
    capabilities: ["audio", "2d", "2.5d", "3d", "motion"],
    reducedMotion: false,
  },
  accessible: {
    id: "accessible-2d",
    supportedModes: ["portrait", "compact", "voice-only", "hidden"],
    capabilities: ["audio", "2d"],
    reducedMotion: true,
  },
};

export function AvatarDemo() {
  const initial = useMemo(() => {
    let state = createAvatarState(
      { id: "alina", name: "ALINA", personaVersion: "1.0" },
      "hologram"
    );

    state = setAvatarTask(state, "M0.6", "project:alina");
    state = setAttentionTarget(state, {
      kind: "panel",
      id: "knowledge-graph",
      label: "Knowledge Graph",
    });

    return state;
  }, []);

  const [state, setState] = useState(initial);
  const [rendererId, setRendererId] = useState<keyof typeof renderers>("cinematic");
  const negotiation = negotiateAvatarPresentation(state, renderers[rendererId]);

  const attentionLabel =
    state.attention.label ?? state.attention.id ?? state.attention.kind;

  return (
    <section className="avatar-lab" aria-labelledby="avatar-title">
      <div className="avatar-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 005</span>
          <h2 id="avatar-title">Avatar Engine</h2>
          <p>
            ALINA сохраняет личность, задачу и внимание независимо от того,
            показана она как голограмма, портрет, компактный ассистент или только голос.
          </p>
        </div>
        <div className="avatar-heading-status">
          <Badge tone="warning">DEMO BEHAVIOR</Badge>
          <StatusIndicator
            tone={negotiation.degraded ? "warning" : "success"}
            label={negotiation.degraded ? "fallback active" : "native presentation"}
          />
        </div>
      </div>

      <div className="avatar-lab-grid">
        <GlassPanel tone="elevated" glow="strong" className="avatar-stage-panel">
          <div
            className={`avatar-stage mode-${negotiation.mode} activity-${state.activity}`}
            data-avatar-mode={negotiation.mode}
            data-avatar-activity={state.activity}
            aria-label={`ALINA avatar stage, ${negotiation.mode}, ${state.activity}`}
          >
            {negotiation.mode === "hidden" ? (
              <div className="avatar-hidden-state">
                <strong>ALINA</strong>
                <span>visual presence hidden · state preserved</span>
              </div>
            ) : negotiation.mode === "voice-only" ? (
              <div className="avatar-voice-state">
                <div className="voice-wave" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </div>
                <strong>ALINA · VOICE</strong>
                <span>{state.activity}</span>
              </div>
            ) : (
              <>
                <div className="avatar-stage-orbit orbit-a" aria-hidden="true" />
                <div className="avatar-stage-orbit orbit-b" aria-hidden="true" />
                <div className="avatar-figure" aria-hidden="true">
                  <div className="avatar-head" />
                  <div className="avatar-neck" />
                  <div className="avatar-body" />
                  <div className="avatar-scanline" />
                </div>
                <div className="avatar-stage-caption">
                  <strong>ALINA</strong>
                  <span>{negotiation.mode} · {state.activity}</span>
                </div>
              </>
            )}
          </div>

          <div className="avatar-state-strip">
            <span><small>task</small><strong>{state.currentTaskId}</strong></span>
            <span><small>attention</small><strong>{attentionLabel}</strong></span>
            <span><small>revision</small><strong>{state.revision}</strong></span>
          </div>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="avatar-controls">
          <div className="avatar-control-group">
            <span className="eyebrow">PRESENCE MODE</span>
            <div className="avatar-button-grid">
              {presenceModes.map((mode) => (
                <Button
                  key={mode}
                  variant={state.presence === mode ? "primary" : "ghost"}
                  onClick={() => setState((current) => setPresenceMode(current, mode))}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>

          <div className="avatar-control-group">
            <span className="eyebrow">ACTIVITY</span>
            <div className="avatar-button-grid">
              {activities.map((activity) => (
                <Button
                  key={activity}
                  variant={state.activity === activity ? "primary" : "ghost"}
                  onClick={() => setState((current) => setAvatarActivity(current, activity))}
                >
                  {activity}
                </Button>
              ))}
            </div>
          </div>

          <div className="avatar-control-group">
            <span className="eyebrow">ATTENTION</span>
            <div className="avatar-button-grid">
              <Button
                variant={state.attention.kind === "user" ? "primary" : "ghost"}
                onClick={() =>
                  setState((current) =>
                    setAttentionTarget(current, { kind: "user", label: "User" })
                  )
                }
              >
                User
              </Button>
              <Button
                variant={state.attention.id === "knowledge-graph" ? "primary" : "ghost"}
                onClick={() =>
                  setState((current) =>
                    setAttentionTarget(current, {
                      kind: "panel",
                      id: "knowledge-graph",
                      label: "Knowledge Graph",
                    })
                  )
                }
              >
                Knowledge Graph
              </Button>
              <Button
                variant={state.attention.kind === "task" ? "primary" : "ghost"}
                onClick={() =>
                  setState((current) =>
                    setAttentionTarget(current, {
                      kind: "task",
                      id: "M0.6",
                      label: "Current Task",
                    })
                  )
                }
              >
                Current Task
              </Button>
            </div>
          </div>

          <div className="avatar-control-group">
            <span className="eyebrow">RENDERER</span>
            <div className="avatar-button-grid">
              <Button
                variant={rendererId === "cinematic" ? "primary" : "ghost"}
                onClick={() => setRendererId("cinematic")}
              >
                Cinematic
              </Button>
              <Button
                variant={rendererId === "accessible" ? "primary" : "ghost"}
                onClick={() => setRendererId("accessible")}
              >
                Accessible 2D
              </Button>
            </div>
          </div>

          <div className="avatar-negotiation" aria-label="Renderer negotiation">
            <span>requested: <strong>{state.presence}</strong></span>
            <span>rendered: <strong>{negotiation.mode}</strong></span>
            <span>state: <strong>{negotiation.degraded ? "DEGRADED" : "NATIVE"}</strong></span>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
