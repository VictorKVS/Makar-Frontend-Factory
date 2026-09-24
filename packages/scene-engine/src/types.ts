export type AssetType =
  | "model"
  | "texture"
  | "image"
  | "audio"
  | "environment"
  | "font"
  | "data";

export type LoadPolicy = "preload" | "lazy" | "on-demand";
export type PerformanceTier = "core" | "enhanced" | "cinematic";
export type LodTier = "low" | "medium" | "high";

export type AssetRecord = {
  id: string;
  type: AssetType;
  source: string;
  version: string;
  checksum?: string;
  license?: string;
  attribution?: string;
  loadPolicy: LoadPolicy;
  sizeBytes?: number;
  required: boolean;
  fallbackAssetId?: string;
  tags?: string[];
};

export type SceneNode = {
  id: string;
  kind: "group" | "avatar" | "prop" | "visualization" | "environment" | "light";
  assetId?: string;
  parentId?: string;
  visible: boolean;
  minTier: PerformanceTier;
  lod?: Partial<Record<LodTier, string>>;
};

export type CameraContract = {
  mode: "perspective" | "orthographic" | "ui";
  fov?: number;
  near: number;
  far: number;
  target?: [number, number, number];
};

export type LightContract = {
  id: string;
  kind: "ambient" | "directional" | "point" | "spot" | "environment";
  intensity: number;
  minTier: PerformanceTier;
};

export type SceneManifest = {
  id: string;
  version: string;
  assets: AssetRecord[];
  nodes: SceneNode[];
  camera: CameraContract;
  lights: LightContract[];
  defaultTier: PerformanceTier;
};

export type RendererCapabilities = {
  webgl: boolean;
  webgpu?: boolean;
  maxTier: PerformanceTier;
  reducedMotion: boolean;
};

export type ResolvedScene = {
  manifestId: string;
  tier: PerformanceTier;
  activeNodes: SceneNode[];
  requestedAssets: AssetRecord[];
  degraded: boolean;
  reasons: string[];
};
