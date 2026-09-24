import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("ALINA Engineering Lab", () => {
  it("renders the current lab identity and explicit mock-data label", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("ALINA Engineering Lab");
    expect(html).toContain("DEMO / MOCK");
    expect(html).toContain("EXPERIMENT 004");
  });

  it("renders the reusable information surfaces", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Glass / Glow / Depth");
    expect(html).toContain("Stream states");
    expect(html).toContain("Avatar Engine slot");
  });

  it("renders the M0.3 workspace modules from serializable state", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Workspace Engine");
    expect(html).toContain("Knowledge Graph");
    expect(html).toContain("Project Context");
    expect(html).toContain("Agent Activity");
  });

  it("renders all five M0.4 semantic information stream classes", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Information Stream Engine");
    expect(html).toContain("PRIMARY");
    expect(html).toContain("SECONDARY");
    expect(html).toContain("BACKGROUND");
    expect(html).toContain("ALERT");
    expect(html).toContain("AGENT");
  });

  it("renders the M0.5 visualization engine and accessible fallback path", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Visualization Engine");
    expect(html).toContain("RECOMMENDATION");
    expect(html).toContain("ACCESSIBLE FALLBACK");
    expect(html).toContain("DEMO DATA");
  });
});
