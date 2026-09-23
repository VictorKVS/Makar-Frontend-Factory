import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Badge, Button, GlassPanel, StatusIndicator } from "../src";

describe("@father/ui", () => {
  it("renders button variants without theme-specific inline colors", () => {
    const html = renderToStaticMarkup(<Button variant="primary">Run</Button>);
    expect(html).toContain("ff-button-primary");
    expect(html).not.toMatch(/#[0-9a-f]{3,8}/i);
  });

  it("renders panel material and glow roles", () => {
    const html = renderToStaticMarkup(
      <GlassPanel tone="elevated" glow="strong">Panel</GlassPanel>
    );
    expect(html).toContain("ff-surface-elevated");
    expect(html).toContain("ff-glow-strong");
  });

  it("renders accessible status text", () => {
    const html = renderToStaticMarkup(<StatusIndicator tone="success" label="Online" />);
    expect(html).toContain("Online");
  });

  it("renders semantic badge state", () => {
    const html = renderToStaticMarkup(<Badge tone="warning">Demo</Badge>);
    expect(html).toContain("ff-status-warning");
  });
});
