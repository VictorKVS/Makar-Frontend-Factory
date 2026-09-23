import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("ALINA Visual Token Lab", () => {
  it("renders the experiment identity and explicit mock-data label", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("ALINA Visual Token Lab");
    expect(html).toContain("DEMO / MOCK");
    expect(html).toContain("EXPERIMENT 001");
  });

  it("renders the first reusable information surfaces", () => {
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
});
