import { describe, expect, it } from "vitest";
import {
  createDemoGateway,
  createDemoScenarioEnvelope,
  createHttpGateway,
  createInMemoryRealtimeSource,
  createUnavailableGateway,
  isStale,
  withDerivedState,
} from "../src";

describe("data gateway", () => {
  it("marks demo scenario payloads explicitly", () => {
    const envelope = createDemoScenarioEnvelope("research", "2026-09-24T10:00:00.000Z");
    expect(envelope.state).toBe("ready");
    expect(envelope.provenance.origin).toBe("demo");
    expect(envelope.data?.scenarioId).toBe("research");
  });

  it("derives stale state without changing payload provenance", () => {
    const envelope = createDemoScenarioEnvelope("research", "2026-09-24T10:00:00.000Z");
    const derived = withDerivedState(envelope, Date.parse("2026-09-24T10:02:00.000Z"));
    expect(isStale(envelope.provenance, Date.parse("2026-09-24T10:02:00.000Z"))).toBe(true);
    expect(derived.state).toBe("stale");
    expect(derived.provenance.origin).toBe("demo");
  });

  it("returns a command correlation identity", async () => {
    const gateway = createDemoGateway();
    const result = await gateway.submitCommand({
      text: "Check project",
      scenarioId: "research",
      requestId: "req-1",
    });
    expect(result.data?.correlationId).toBe("demo:req-1");
    expect(result.provenance.origin).toBe("demo");
  });

  it("keeps HTTP transport behind an injected adapter", async () => {
    const gateway = createHttpGateway(
      async () => ({
        ok: false,
        status: 503,
        async json() { return {}; },
      }),
      {
        sourceId: "father-api",
        scenarioUrl: (id) => "/api/scenarios/" + id,
        commandUrl: "/api/commands",
      }
    );

    const result = await gateway.loadScenario("security");
    expect(result.state).toBe("offline");
    expect(result.error?.retryable).toBe(true);
    expect(result.provenance.origin).toBe("unavailable");
  });

  it("supports realtime adapters without coupling the gateway to WebSocket/EventSource", () => {
    const realtime = createInMemoryRealtimeSource();
    const received: string[] = [];
    const unsubscribe = realtime.source.subscribe((event) => received.push(event.type));

    realtime.publish({
      type: "agent.activity",
      payload: { agentId: "makar" },
      provenance: {
        origin: "live",
        sourceId: "test",
        observedAt: null,
        receivedAt: "2026-09-24T10:00:00.000Z",
      },
    });

    unsubscribe();
    expect(received).toEqual(["agent.activity"]);
  });
});


  it("never converts an unavailable live configuration into DEMO data", async () => {
    const gateway = createUnavailableGateway({
      sourceId: "father-live-config",
      code: "LIVE_CONFIG_MISSING",
      message: "Live API base URL is missing",
    });

    const result = await gateway.loadScenario("research");

    expect(result.state).toBe("offline");
    expect(result.provenance.origin).toBe("unavailable");
    expect(result.provenance.origin).not.toBe("demo");
    expect(result.error?.code).toBe("LIVE_CONFIG_MISSING");
  });
