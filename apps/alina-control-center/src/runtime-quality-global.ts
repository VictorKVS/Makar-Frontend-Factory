import {
  createRuntimeQualityCollector,
  type RuntimeQualityCollector,
} from "@father/runtime-quality";

declare global {
  interface Window {
    __ALINA_RUNTIME_QUALITY__?: RuntimeQualityCollector;
  }
}

export function installRuntimeQualityCollector(): RuntimeQualityCollector {
  const collector = createRuntimeQualityCollector();
  window.__ALINA_RUNTIME_QUALITY__ = collector;

  window.addEventListener(
    "pagehide",
    () => {
      collector.dispose();
    },
    { once: true }
  );

  return collector;
}
