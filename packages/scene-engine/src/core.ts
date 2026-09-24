import type {
  AssetRecord,
  PerformanceTier,
  RendererCapabilities,
  ResolvedScene,
  SceneManifest,
} from "./types";

const tierRank: Record<PerformanceTier, number> = {
  core: 0,
  enhanced: 1,
  cinematic: 2,
};

export function validateSceneManifest(manifest: SceneManifest): string[] {
  const errors: string[] = [];
  const assetIds = new Set<string>();
  const nodeIds = new Set<string>();

  for (const asset of manifest.assets) {
    if (assetIds.has(asset.id)) errors.push(`duplicate-asset:${asset.id}`);
    assetIds.add(asset.id);

    if (!asset.source) errors.push(`asset-source-missing:${asset.id}`);
    if (!asset.version) errors.push(`asset-version-missing:${asset.id}`);
  }

  for (const node of manifest.nodes) {
    if (nodeIds.has(node.id)) errors.push(`duplicate-node:${node.id}`);
    nodeIds.add(node.id);

    if (node.assetId && !assetIds.has(node.assetId)) {
      errors.push(`unknown-asset:${node.id}:${node.assetId}`);
    }

    if (node.parentId && !manifest.nodes.some((candidate) => candidate.id === node.parentId)) {
      errors.push(`unknown-parent:${node.id}:${node.parentId}`);
    }
  }

  return errors;
}

function clampTier(
  desired: PerformanceTier,
  capabilities: RendererCapabilities
): PerformanceTier {
  let rank = Math.min(tierRank[desired], tierRank[capabilities.maxTier]);

  if (!capabilities.webgl) rank = 0;
  if (capabilities.reducedMotion && rank > 1) rank = 1;

  return (Object.keys(tierRank) as PerformanceTier[]).find(
    (tier) => tierRank[tier] === rank
  ) ?? "core";
}

function resolveAsset(
  asset: AssetRecord,
  all: Map<string, AssetRecord>
): AssetRecord {
  if (asset.source) return asset;

  if (asset.fallbackAssetId) {
    const fallback = all.get(asset.fallbackAssetId);
    if (fallback) return fallback;
  }

  return asset;
}

export function resolveScene(
  manifest: SceneManifest,
  capabilities: RendererCapabilities,
  desiredTier: PerformanceTier = manifest.defaultTier
): ResolvedScene {
  const errors = validateSceneManifest(manifest);
  if (errors.length) {
    throw new Error(`Invalid scene manifest: ${errors.join(", ")}`);
  }

  const tier = clampTier(desiredTier, capabilities);
  const assetMap = new Map(manifest.assets.map((asset) => [asset.id, asset]));
  const activeNodes = manifest.nodes.filter(
    (node) => node.visible && tierRank[node.minTier] <= tierRank[tier]
  );

  const requestedIds = new Set(
    activeNodes.map((node) => node.assetId).filter((value): value is string => Boolean(value))
  );

  const requestedAssets = [...requestedIds]
    .map((id) => assetMap.get(id))
    .filter((value): value is AssetRecord => Boolean(value))
    .map((asset) => resolveAsset(asset, assetMap));

  const reasons: string[] = [];
  if (!capabilities.webgl && desiredTier !== "core") reasons.push("no-webgl");
  if (tierRank[capabilities.maxTier] < tierRank[desiredTier]) reasons.push("capability-limit");
  if (capabilities.reducedMotion && desiredTier === "cinematic") reasons.push("reduced-motion");

  return {
    manifestId: manifest.id,
    tier,
    activeNodes,
    requestedAssets,
    degraded: tier !== desiredTier,
    reasons,
  };
}

export function assetsByLoadPolicy(
  manifest: SceneManifest,
  policy: AssetRecord["loadPolicy"]
): AssetRecord[] {
  return manifest.assets.filter((asset) => asset.loadPolicy === policy);
}
