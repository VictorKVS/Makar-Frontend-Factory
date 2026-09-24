import type { RealtimeEvent, RealtimeSource } from "./types";

export function createInMemoryRealtimeSource(id = "in-memory"): {
  source: RealtimeSource;
  publish(event: RealtimeEvent): void;
} {
  const handlers = new Set<(event: RealtimeEvent) => void>();

  return {
    source: {
      id,
      subscribe(handler) {
        handlers.add(handler);
        return () => handlers.delete(handler);
      },
    },
    publish(event) {
      for (const handler of handlers) handler(event);
    },
  };
}
