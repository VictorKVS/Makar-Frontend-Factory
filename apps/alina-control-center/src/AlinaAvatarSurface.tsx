import { useEffect, useMemo, useState } from "react";
import type {
  AvatarActivity,
  AvatarPresenceMode,
} from "@father/avatar-engine";
import { Badge } from "@father/ui";
import {
  createAlinaAvatarPlan,
  type AlinaPerformanceTier,
} from "./alina-avatar-runtime";
import "./alina-avatar-surface.css";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function AlinaAvatarSurface({
  requestedMode,
  tier,
  activity,
  taskId,
  contextRef,
  attentionLabel,
  message,
}: {
  requestedMode: AvatarPresenceMode;
  tier: AlinaPerformanceTier;
  activity: AvatarActivity;
  taskId: string;
  contextRef: string;
  attentionLabel: string;
  message: string;
}) {
  const reducedMotion = useReducedMotion();

  const plan = useMemo(
    () =>
      createAlinaAvatarPlan({
        requestedMode,
        tier,
        reducedMotion,
        activity,
        taskId,
        contextRef,
        attentionLabel,
      }),
    [
      requestedMode,
      tier,
      reducedMotion,
      activity,
      taskId,
      contextRef,
      attentionLabel,
    ]
  );

  if (plan.resolvedMode === "hidden") {
    return (
      <div
        className="alina-avatar-surface alina-avatar-surface--hidden"
        data-avatar-requested={plan.requestedMode}
        data-avatar-resolved={plan.resolvedMode}
        data-avatar-activity={plan.activity}
        data-avatar-renderer={plan.rendererId}
        data-avatar-degraded={String(plan.degraded)}
      >
        <div className="alina-avatar-hidden">
          <span className="eyebrow">ALINA PRESENCE</span>
          <strong>hidden</strong>
          <small>state retained</small>
          <small>{plan.currentTaskId} · {plan.contextRef}</small>
        </div>
      </div>
    );
  }

  if (plan.resolvedMode === "voice-only") {
    return (
      <div
        className="alina-avatar-surface alina-avatar-surface--voice"
        data-avatar-requested={plan.requestedMode}
        data-avatar-resolved={plan.resolvedMode}
        data-avatar-activity={plan.activity}
        data-avatar-renderer={plan.rendererId}
        data-avatar-degraded={String(plan.degraded)}
      >
        <div className="alina-voice-mark" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <strong>ALINA · VOICE</strong>
        <span>{plan.activity}</span>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div
      className={"alina-avatar-surface avatar-" + plan.resolvedMode}
      data-avatar-requested={plan.requestedMode}
      data-avatar-resolved={plan.resolvedMode}
      data-avatar-activity={plan.activity}
      data-avatar-renderer={plan.rendererId}
      data-avatar-asset={plan.assetId ?? ""}
      data-avatar-degraded={String(plan.degraded)}
      data-avatar-motion={String(plan.motionEnabled)}
    >
      <div className="alina-avatar-rings" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="alina-avatar-figure" data-expression={plan.expression}>
        <div className="alina-avatar-head">
          <span className="alina-avatar-eye left" />
          <span className="alina-avatar-eye right" />
        </div>
        <div className="alina-avatar-body">
          <span className="alina-avatar-core" />
        </div>
        <strong>{plan.identityName}</strong>
        <span>{plan.resolvedMode} · {plan.activity}</span>
      </div>

      <div className="alina-avatar-message">
        <div className="alina-avatar-state-row">
          <span className="eyebrow">PRESENCE</span>
          <Badge tone={plan.degraded ? "warning" : "success"}>
            {plan.degraded ? "DEGRADED" : "NATIVE"}
          </Badge>
        </div>
        <p>{message}</p>
        <div className="alina-avatar-trace">
          <code>{plan.rendererId}</code>
          <code>{plan.assetId ?? "no-asset"}</code>
          <code>gesture:{plan.gesture}</code>
          <code>attention:{plan.attention.id ?? "none"}</code>
          {plan.missingCapabilities.map((capability) => (
            <code key={capability}>missing:{capability}</code>
          ))}
        </div>
      </div>
    </div>
  );
}
