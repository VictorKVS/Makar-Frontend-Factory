import type {
  CommandResult,
  DataEnvelope,
  DataGateway,
  ScenarioSnapshot,
} from "./types";

function unavailableEnvelope<T>(
  sourceId: string,
  code: string,
  message: string,
  correlationId?: string
): DataEnvelope<T> {
  return {
    state: "offline",
    data: null,
    provenance: {
      origin: "unavailable",
      sourceId,
      observedAt: null,
      receivedAt: new Date().toISOString(),
      correlationId,
    },
    error: {
      code,
      message,
      retryable: true,
    },
  };
}

export function createUnavailableGateway(input: {
  id?: string;
  sourceId: string;
  code: string;
  message: string;
}): DataGateway {
  return {
    id: input.id ?? "unavailable",
    async loadScenario(): Promise<DataEnvelope<ScenarioSnapshot>> {
      return unavailableEnvelope(
        input.sourceId,
        input.code,
        input.message
      );
    },
    async submitCommand(request): Promise<DataEnvelope<CommandResult>> {
      return unavailableEnvelope(
        input.sourceId,
        input.code,
        input.message,
        request.requestId
      );
    },
  };
}
