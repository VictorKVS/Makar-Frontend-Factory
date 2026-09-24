import { useEffect, useMemo, useRef, useState } from "react";
import {
  createWebGLHologramScene,
  selectSceneAdapter,
  type SceneAdapterDecision,
  type ScenePerformanceTier,
} from "@father/cinematic-scene-adapter";
import "./cinematic-scene-layer.css";

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

export function CinematicSceneLayer({
  tier,
  scenarioId,
  onThreeDimensionalCapabilityChange,
}: {
  tier: ScenePerformanceTier;
  scenarioId: string;
  onThreeDimensionalCapabilityChange?: (available: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  const fallbackDecision = useMemo(
    () =>
      selectSceneAdapter({
        desiredTier: tier,
        webglSupported: false,
        reducedMotion,
      }),
    [tier, reducedMotion]
  );

  const [decision, setDecision] =
    useState<SceneAdapterDecision>(fallbackDecision);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (tier !== "cinematic" || !canvas) {
      const next = selectSceneAdapter({
        desiredTier: tier,
        webglSupported: false,
        reducedMotion,
      });
      setDecision(next);
      onThreeDimensionalCapabilityChange?.(false);
      return;
    }

    let controller: ReturnType<typeof createWebGLHologramScene> | null = null;
    let active = true;

    try {
      controller = createWebGLHologramScene(canvas);

      const next = selectSceneAdapter({
        desiredTier: tier,
        webglSupported: true,
        reducedMotion,
      });

      if (active) {
        setDecision(next);
        onThreeDimensionalCapabilityChange?.(next.threeDimensional);
      }

      if (next.animated) controller.start();
      else controller.renderOnce(0);

      const resize = () => controller?.resize();
      window.addEventListener("resize", resize);

      return () => {
        active = false;
        window.removeEventListener("resize", resize);
        controller?.dispose();
        onThreeDimensionalCapabilityChange?.(false);
      };
    } catch {
      const next = selectSceneAdapter({
        desiredTier: tier,
        webglSupported: false,
        reducedMotion,
      });

      if (active) {
        setDecision(next);
        onThreeDimensionalCapabilityChange?.(false);
      }

      controller?.dispose();
    }

    return () => {
      active = false;
      controller?.dispose();
      onThreeDimensionalCapabilityChange?.(false);
    };
  }, [tier, reducedMotion, onThreeDimensionalCapabilityChange]);

  return (
    <div
      className={"alina-cinematic-scene scene-" + decision.adapter}
      data-scene-adapter={decision.adapter}
      data-scene-tier={decision.resolvedTier}
      data-scene-webgl={String(decision.webglActive)}
      data-scene-3d={String(decision.threeDimensional)}
      data-scene-animated={String(decision.animated)}
      data-scene-scenario={scenarioId}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="alina-cinematic-canvas" />
      <div className="alina-scene-depth depth-a" />
      <div className="alina-scene-depth depth-b" />
      <div className="alina-scene-horizon" />
    </div>
  );
}
