import type {
  RuntimeMetric,
  RuntimeQualityCollector,
  RuntimeQualitySnapshot,
} from "./types";

type ExtendedEntry = PerformanceEntry & {
  value?: number;
  hadRecentInput?: boolean;
  interactionId?: number;
};

function metric(
  value: number | null,
  source: string,
  supported: boolean
): RuntimeMetric {
  return { value, source, supported };
}

function supports(type: string): boolean {
  return (
    typeof PerformanceObserver !== "undefined" &&
    Array.isArray(PerformanceObserver.supportedEntryTypes) &&
    PerformanceObserver.supportedEntryTypes.includes(type)
  );
}

export function createRuntimeQualityCollector(): RuntimeQualityCollector {
  let lcp: number | null = null;
  let cls = 0;
  let interaction = 0;
  let maxLongTask = 0;
  let frameTime: number | null = null;

  const lcpSupported = supports("largest-contentful-paint");
  const clsSupported = supports("layout-shift");
  const eventSupported = supports("event");
  const longTaskSupported = supports("longtask");

  const observers: PerformanceObserver[] = [];

  const observe = (
    type: string,
    handler: (entries: PerformanceEntry[]) => void,
    options?: PerformanceObserverInit
  ) => {
    try {
      const observer = new PerformanceObserver((list) => {
        handler(list.getEntries());
      });
      observer.observe(
        options ?? ({ type, buffered: true } as PerformanceObserverInit)
      );
      observers.push(observer);
    } catch {
      // Capability remains visible through the supported flag/snapshot.
    }
  };

  if (lcpSupported) {
    observe("largest-contentful-paint", (entries) => {
      const last = entries.at(-1);
      if (last) lcp = last.startTime;
    });
  }

  if (clsSupported) {
    observe("layout-shift", (entries) => {
      for (const entry of entries as ExtendedEntry[]) {
        if (!entry.hadRecentInput && typeof entry.value === "number") {
          cls += entry.value;
        }
      }
    });
  }

  if (eventSupported) {
    observe(
      "event",
      (entries) => {
        for (const entry of entries as ExtendedEntry[]) {
          interaction = Math.max(interaction, entry.duration || 0);
        }
      },
      {
        type: "event",
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit
    );
  }

  if (longTaskSupported) {
    observe("longtask", (entries) => {
      for (const entry of entries) {
        maxLongTask = Math.max(maxLongTask, entry.duration || 0);
      }
    });
  }

  const sampleFrameTime = async (frameCount = 30): Promise<number | null> => {
    if (typeof window === "undefined" || frameCount < 2) return null;

    const samples: number[] = [];

    return await new Promise<number | null>((resolve) => {
      let previous: number | null = null;

      const frame = (time: number) => {
        if (previous !== null) samples.push(time - previous);
        previous = time;

        if (samples.length >= frameCount) {
          frameTime =
            samples.reduce((sum, value) => sum + value, 0) / samples.length;
          resolve(frameTime);
          return;
        }

        window.requestAnimationFrame(frame);
      };

      window.requestAnimationFrame(frame);
    });
  };

  const snapshot = (): RuntimeQualitySnapshot => ({
    collectedAt: new Date().toISOString(),
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "unavailable",
    lcpMs: metric(
      lcp,
      "largest-contentful-paint",
      lcpSupported
    ),
    cls: metric(
      clsSupported ? cls : null,
      "layout-shift",
      clsSupported
    ),
    interactionResponsivenessMs: metric(
      eventSupported ? interaction : null,
      "event-timing-proxy",
      eventSupported
    ),
    maxLongTaskMs: metric(
      longTaskSupported ? maxLongTask : null,
      "longtask",
      longTaskSupported
    ),
    avgFrameTimeMs: metric(
      frameTime,
      "requestAnimationFrame-sample",
      typeof window !== "undefined"
    ),
  });

  const dispose = () => {
    for (const observer of observers) observer.disconnect();
    observers.length = 0;
  };

  return {
    snapshot,
    sampleFrameTime,
    dispose,
  };
}
