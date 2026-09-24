import { describe, expect, it } from "vitest";
import {
  createRuntimeGateway,
  parseRuntimeConfig,
} from "./runtime-config";

describe("runtime config", () => {
  it("defaults explicitly to DEMO mode", () => {
    const config = parseRuntimeConfig({});
    expect(config.dataMode).toBe("demo");
    expect(createRuntimeGateway(config).id).toBe("demo");
  });

  it("never silently falls back to DEMO when LIVE config is incomplete", async () => {
    const config = parseRuntimeConfig({
      VITE_ALINA_DATA_MODE: "live",
    });
    const gateway = createRuntimeGateway(config);

    expect(gateway.id).toBe("live-unavailable");

    const result = await gateway.loadScenario("research");
    expect(result.state).toBe("offline");
    expect(result.provenance.origin).toBe("unavailable");
    expect(result.provenance.origin).not.toBe("demo");
  });

  it("rejects an invalid runtime data mode", () => {
    expect(() =>
      parseRuntimeConfig({
        VITE_ALINA_DATA_MODE: "automatic",
      })
    ).toThrow(/Invalid VITE_ALINA_DATA_MODE/);
  });
});
