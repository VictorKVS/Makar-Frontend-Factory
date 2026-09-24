import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("ALINA Engineering Lab", () => {
  it("renders the current lab identity and explicit mock-data label", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("ALINA Engineering Lab");
    expect(html).toContain("DEMO / MOCK");
    expect(html).toContain("EXPERIMENT 006");
  });

  it("renders the adaptive composition as the primary engineering surface", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Composition Engine");
    expect(html).toContain("Research / Coding / Security / Presentation / Focus");
    expect(html).toContain("Composition-aware persona");
    expect(html).toContain("reason trace active");
  });

  it("keeps previous engine laboratories available behind disclosure", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("Workspace Engine");
    expect(html).toContain("Information Stream Engine");
    expect(html).toContain("Visualization Engine");
    expect(html).toContain("Avatar Engine");
    expect(html).toContain("Открыть инженерные лаборатории M0.3–M0.6");
  });
});
