import type {
  CommandRequest,
  CommandResult,
  DataEnvelope,
  DataGateway,
  GatewayScenarioId,
  ScenarioSnapshot,
} from "./types";

export type HttpResponseLike = {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
};

export type HttpFetcher = (
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }
) => Promise<HttpResponseLike>;

export type HttpGatewayConfig = {
  scenarioUrl(id: GatewayScenarioId): string;
  commandUrl: string;
  sourceId: string;
};

function assertEnvelope<T>(value: unknown): DataEnvelope<T> {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid gateway envelope");
  }
  const envelope = value as DataEnvelope<T>;
  if (!envelope.state || !envelope.provenance) {
    throw new Error("Invalid gateway envelope");
  }
  return envelope;
}

export function createHttpGateway(
  fetcher: HttpFetcher,
  config: HttpGatewayConfig
): DataGateway {
  return {
    id: "http",
    async loadScenario(id) {
      try {
        const response = await fetcher(config.scenarioUrl(id));
        if (!response.ok) {
          return {
            state: response.status >= 500 ? "offline" : "error",
            data: null,
            provenance: {
              origin: "unavailable",
              sourceId: config.sourceId,
              observedAt: null,
              receivedAt: new Date().toISOString(),
            },
            error: {
              code: "HTTP_" + response.status,
              message: "Scenario request failed",
              retryable: response.status >= 500,
            },
          };
        }
        return assertEnvelope<ScenarioSnapshot>(await response.json());
      } catch (error) {
        return {
          state: "offline",
          data: null,
          provenance: {
            origin: "unavailable",
            sourceId: config.sourceId,
            observedAt: null,
            receivedAt: new Date().toISOString(),
          },
          error: {
            code: "NETWORK_ERROR",
            message: error instanceof Error ? error.message : "Network error",
            retryable: true,
          },
        };
      }
    },

    async submitCommand(request) {
      try {
        const response = await fetcher(config.commandUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          return {
            state: response.status >= 500 ? "offline" : "error",
            data: null,
            provenance: {
              origin: "unavailable",
              sourceId: config.sourceId,
              observedAt: null,
              receivedAt: new Date().toISOString(),
              correlationId: request.requestId,
            },
            error: {
              code: "HTTP_" + response.status,
              message: "Command request failed",
              retryable: response.status >= 500,
            },
          };
        }

        return assertEnvelope<CommandResult>(await response.json());
      } catch (error) {
        return {
          state: "offline",
          data: null,
          provenance: {
            origin: "unavailable",
            sourceId: config.sourceId,
            observedAt: null,
            receivedAt: new Date().toISOString(),
            correlationId: request.requestId,
          },
          error: {
            code: "NETWORK_ERROR",
            message: error instanceof Error ? error.message : "Network error",
            retryable: true,
          },
        };
      }
    },
  };
}
