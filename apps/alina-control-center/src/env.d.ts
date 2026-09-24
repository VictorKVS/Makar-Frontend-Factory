interface ImportMetaEnv {
  readonly VITE_ALINA_DATA_MODE?: "demo" | "live";
  readonly VITE_ALINA_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
