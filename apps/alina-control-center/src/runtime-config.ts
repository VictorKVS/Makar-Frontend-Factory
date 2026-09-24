import {
  createDemoGateway,
  createHttpGateway,
  createUnavailableGateway,
  type DataGateway,
  type HttpFetcher,
} from "@father/data-gateway";

export type RuntimeDataMode = "demo" | "live";

export type AlinaRuntimeConfig = {
  dataMode: RuntimeDataMode;
  apiBaseUrl: string | null;
};

export function parseRuntimeConfig(
  env: Record<string, string | undefined>
): AlinaRuntimeConfig {
  const rawMode = env.VITE_ALINA_DATA_MODE ?? "demo";

  if (rawMode !== "demo" && rawMode !== "live") {
    throw new Error("Invalid VITE_ALINA_DATA_MODE: " + rawMode);
  }

  const apiBaseUrl = env.VITE_ALINA_API_BASE_URL?.trim() || null;

  return {
    dataMode: rawMode,
    apiBaseUrl,
  };
}

function browserFetcher(): HttpFetcher {
  return async (input, init) => {
    const response = await fetch(input, {
      method: init?.method,
      headers: init?.headers,
      body: init?.body,
    });

    return {
      ok: response.ok,
      status: response.status,
      async json() {
        return await response.json();
      },
    };
  };
}

export function createRuntimeGateway(
  config: AlinaRuntimeConfig
): DataGateway {
  if (config.dataMode === "demo") {
    return createDemoGateway();
  }

  if (!config.apiBaseUrl) {
    return createUnavailableGateway({
      id: "live-unavailable",
      sourceId: "father-live-config",
      code: "LIVE_CONFIG_MISSING",
      message: "Live API base URL is missing",
    });
  }

  const base = config.apiBaseUrl.replace(/\/$/, "");

  return createHttpGateway(browserFetcher(), {
    sourceId: "father-live-api",
    scenarioUrl: (id) => base + "/scenarios/" + id,
    commandUrl: base + "/commands",
  });
}

export const runtimeConfig = parseRuntimeConfig(
  import.meta.env as unknown as Record<string, string | undefined>
);

export const runtimeGateway = createRuntimeGateway(runtimeConfig);
