import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type {
  DataEnvelope,
  DataGateway,
  ScenarioSnapshot,
} from "@father/data-gateway";
import { ProductShell } from "./ProductShell";

const offlineEnvelope: DataEnvelope<ScenarioSnapshot> = {
  state: "offline",
  data: null,
  provenance: {
    origin: "unavailable",
    sourceId: "father-api",
    observedAt: null,
    receivedAt: "2026-09-24T10:00:00.000Z",
  },
  error: {
    code: "NETWORK_ERROR",
    message: "Backend unavailable",
    retryable: true,
  },
};

const offlineGateway: DataGateway = {
  id: "http",
  async loadScenario() {
    return offlineEnvelope;
  },
  async submitCommand() {
    return {
      state: "offline",
      data: null,
      provenance: offlineEnvelope.provenance,
      error: offlineEnvelope.error,
    };
  },
};

describe("ProductShell data gateway states", () => {
  it("renders unavailable/offline provenance without pretending data is live", () => {
    const html = renderToStaticMarkup(
      <ProductShell gateway={offlineGateway} initialEnvelope={offlineEnvelope} />
    );

    expect(html).toContain('data-provenance-origin="unavailable"');
    expect(html).toContain('data-data-state="offline"');
    expect(html).toContain("UNAVAILABLE");
    expect(html).toContain("Backend unavailable");
    expect(html).not.toContain("DEMO / MOCK");
  });
});
