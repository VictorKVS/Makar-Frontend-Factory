import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("ALINA Control Center v1 shell", () => {
  it("renders the product shell as the default experience", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("FATHER · CONTROL CENTER");
    expect(html).toContain(">ALINA<");
    expect(html).toContain("DEMO / MOCK");
    expect(html).toContain('data-scenario="research"');
    expect(html).toContain('data-primary-module="knowledge-graph"');
    expect(html).toContain('data-provenance-origin="demo"');
    expect(html).toContain('data-data-state="ready"');
  });

  it("renders semantic product planes and the command surface", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("PRIMARY WORK PLANE");
    expect(html).toContain("SECONDARY CONTEXT");
    expect(html).toContain("INFORMATION STREAMS");
    expect(html).toContain("COMPOSITION TRACE");
    expect(html).toContain("Спросите ALINA или поставьте задачу агенту");
  });

  it("keeps engineering labs behind diagnostics", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Engineering diagnostics · M0/M1 labs");
    expect(html).toContain("Makar Provisioning");
    expect(html).toContain("Composition Engine");
    expect(html).toContain("Workspace Engine");
    expect(html).toContain("Avatar Engine");
  });
});
