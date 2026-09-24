import { useMemo, useState } from "react";
import {
  resolveScene,
  type PerformanceTier,
  type RendererCapabilities,
  type SceneManifest,
} from "@father/scene-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./scene-demo.css";

const manifest: SceneManifest = {
  id: "alina-command-stage",
  version: "1.0.0",
  defaultTier: "cinematic",
  assets: [
    {
      id: "alina-portrait",
      type: "image",
      source: "/assets/alina/portrait.webp",
      version: "1",
      loadPolicy: "preload",
      required: true,
      license: "project-owned",
    },
    {
      id: "alina-model",
      type: "model",
      source: "/assets/alina/alina.glb",
      version: "1",
      loadPolicy: "lazy",
      required: false,
      fallbackAssetId: "alina-portrait",
      license: "project-owned",
    },
    {
      id: "command-environment",
      type: "environment",
      source: "/assets/environments/control-room.hdr",
      version: "1",
      loadPolicy: "lazy",
      required: false,
      license: "project-owned",
    },
  ],
  nodes: [
    {
      id: "portrait-avatar",
      kind: "avatar",
      assetId: "alina-portrait",
      visible: true,
      minTier: "core",
    },
    {
      id: "full-avatar",
      kind: "avatar",
      assetId: "alina-model",
      visible: true,
      minTier: "cinematic",
    },
    {
      id: "environment",
      kind: "environment",
      assetId: "command-environment",
      visible: true,
      minTier: "enhanced",
    },
  ],
  camera: {
    mode: "perspective",
    fov: 42,
    near: 0.1,
    far: 120,
    target: [0, 1.4, 0],
  },
  lights: [
    {
      id: "ambient",
      kind: "ambient",
      intensity: 0.55,
      minTier: "core",
    },
    {
      id: "key",
      kind: "directional",
      intensity: 1.1,
      minTier: "enhanced",
    },
  ],
};

const presets: Array<{
  id: string;
  label: string;
  capabilities: RendererCapabilities;
  desired: PerformanceTier;
}> = [
  {
    id: "cinematic",
    label: "Cinematic WebGL",
    capabilities: { webgl: true, maxTier: "cinematic", reducedMotion: false },
    desired: "cinematic",
  },
  {
    id: "reduced",
    label: "Reduced motion",
    capabilities: { webgl: true, maxTier: "cinematic", reducedMotion: true },
    desired: "cinematic",
  },
  {
    id: "core",
    label: "No WebGL / Core",
    capabilities: { webgl: false, maxTier: "cinematic", reducedMotion: false },
    desired: "cinematic",
  },
];

export function SceneDemo() {
  const [presetId, setPresetId] = useState("cinematic");
  const preset = presets.find((item) => item.id === presetId) ?? presets[0];
  const resolved = useMemo(
    () => resolveScene(manifest, preset.capabilities, preset.desired),
    [preset]
  );

  return (
    <section className="scene-lab" aria-labelledby="scene-title">
      <div className="scene-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 008</span>
          <h2 id="scene-title">Scene & Asset Pipeline</h2>
          <p>
            Один scene manifest деградирует от cinematic до core без потери
            работоспособности ALINA.
          </p>
        </div>
        <StatusIndicator
          tone={resolved.degraded ? "warning" : "success"}
          label={resolved.degraded ? "Graceful fallback" : "Full scene"}
        />
      </div>

      <div className="scene-grid">
        <GlassPanel tone="elevated" glow="medium" className="scene-controls">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CAPABILITIES</span>
              <h3>Renderer negotiation</h3>
            </div>
            <Badge tone="warning">DEMO MANIFEST</Badge>
          </div>

          <div className="scene-buttons">
            {presets.map((item) => (
              <Button
                key={item.id}
                variant={presetId === item.id ? "primary" : "ghost"}
                onClick={() => setPresetId(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <dl className="scene-contract">
            <div><dt>Desired</dt><dd>{preset.desired}</dd></div>
            <div><dt>Resolved</dt><dd>{resolved.tier}</dd></div>
            <div><dt>WebGL</dt><dd>{String(preset.capabilities.webgl)}</dd></div>
            <div><dt>Reduced motion</dt><dd>{String(preset.capabilities.reducedMotion)}</dd></div>
          </dl>
        </GlassPanel>

        <GlassPanel
          tone="base"
          glow={resolved.tier === "cinematic" ? "strong" : "soft"}
          className="scene-stage"
          data-scene-tier={resolved.tier}
          data-scene-degraded={String(resolved.degraded)}
        >
          <div className="scene-stage-visual" aria-label="Resolved scene preview">
            <div className="scene-avatar">
              <strong>ALINA</strong>
              <span>
                {resolved.tier === "cinematic"
                  ? "3D avatar slot"
                  : resolved.tier === "enhanced"
                    ? "2.5D avatar slot"
                    : "2D portrait fallback"}
              </span>
            </div>
            <div className="scene-nodes">
              {resolved.activeNodes.map((node) => (
                <Badge key={node.id} tone="info">{node.id}</Badge>
              ))}
            </div>
          </div>

          <div className="scene-assets">
            <span className="eyebrow">REQUESTED ASSETS</span>
            {resolved.requestedAssets.map((asset) => (
              <div key={asset.id}>
                <strong>{asset.id}</strong>
                <span>{asset.type} · {asset.loadPolicy} · v{asset.version}</span>
              </div>
            ))}
          </div>

          <p className="scene-reasons">
            {resolved.reasons.length
              ? `Fallback reasons: ${resolved.reasons.join(", ")}`
              : "No fallback required."}
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
