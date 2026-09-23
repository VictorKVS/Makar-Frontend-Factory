import { describe, expect, it } from "vitest";
import {
  acknowledgeStream,
  rankStreams,
  selectAttention,
  shouldInterrupt,
  validateStreams,
  type StreamItem,
} from "../src";

const baseTime = "2026-09-24T00:00:00.000Z";

function item(overrides: Partial<StreamItem> & Pick<StreamItem, "id" | "class" | "title">): StreamItem {
  return {
    id: overrides.id,
    class: overrides.class,
    title: overrides.title,
    source: "test",
    createdAt: baseTime,
    urgency: "normal",
    confidence: 1,
    costOfMissing: 0.5,
    lifecycle: "active",
    acknowledged: false,
    ...overrides,
  };
}

describe("information stream engine", () => {
  it("semantic class outranks arrival order", () => {
    const streams = [
      item({
        id: "background-new",
        class: "background",
        title: "New background event",
        createdAt: "2026-09-24T00:10:00.000Z",
        urgency: "critical",
        costOfMissing: 1,
      }),
      item({
        id: "primary-old",
        class: "primary",
        title: "User task",
        createdAt: "2026-09-23T23:00:00.000Z",
        urgency: "normal",
      }),
    ];

    expect(rankStreams(streams)[0].item.id).toBe("primary-old");
  });

  it("alert can outrank primary when it qualifies semantically", () => {
    const streams = [
      item({ id: "primary", class: "primary", title: "Primary" }),
      item({
        id: "alert",
        class: "alert",
        title: "Critical alert",
        urgency: "critical",
        costOfMissing: 0.95,
      }),
    ];

    expect(rankStreams(streams)[0].item.id).toBe("alert");
    expect(shouldInterrupt(streams[1])).toBe(true);
  });

  it("background and agent streams never interrupt by themselves", () => {
    expect(
      shouldInterrupt(
        item({
          id: "background",
          class: "background",
          title: "Background",
          urgency: "critical",
          costOfMissing: 1,
        })
      )
    ).toBe(false);

    expect(
      shouldInterrupt(
        item({
          id: "agent",
          class: "agent",
          title: "Agent",
          urgency: "critical",
          costOfMissing: 1,
        })
      )
    ).toBe(false);
  });

  it("acknowledged alert no longer interrupts", () => {
    const streams = [
      item({
        id: "alert",
        class: "alert",
        title: "Alert",
        urgency: "high",
        costOfMissing: 0.9,
      }),
    ];

    const acknowledged = acknowledgeStream(
      streams,
      "alert",
      "2026-09-24T00:11:00.000Z"
    );

    expect(shouldInterrupt(acknowledged[0])).toBe(false);
  });

  it("attention budget caps each class and total selection", () => {
    const streams = [
      item({ id: "p1", class: "primary", title: "P1" }),
      item({ id: "p2", class: "primary", title: "P2" }),
      item({ id: "s1", class: "secondary", title: "S1" }),
      item({ id: "s2", class: "secondary", title: "S2" }),
      item({ id: "s3", class: "secondary", title: "S3" }),
      item({ id: "a1", class: "agent", title: "A1" }),
      item({ id: "b1", class: "background", title: "B1" }),
    ];

    const result = selectAttention(streams, {
      total: 4,
      primary: 1,
      secondary: 1,
      background: 1,
      alert: 1,
      agent: 1,
    });

    expect(result.selected).toHaveLength(4);
    expect(result.selected.filter((entry) => entry.item.class === "primary")).toHaveLength(1);
    expect(result.selected.filter((entry) => entry.item.class === "secondary")).toHaveLength(1);
    expect(result.suppressed.length).toBeGreaterThan(0);
  });

  it("validates serializable stream constraints", () => {
    const streams = [item({ id: "primary", class: "primary", title: "Primary" })];
    expect(validateStreams(streams)).toEqual({ valid: true, errors: [] });
    expect(JSON.parse(JSON.stringify(streams))).toEqual(streams);
  });
});
