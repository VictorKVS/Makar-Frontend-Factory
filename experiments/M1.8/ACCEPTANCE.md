# M1.8 — Acceptance

- runtime report has browser/environment provenance;
- LCP and CLS use browser PerformanceObserver when supported;
- responsiveness uses Event Timing or an explicitly labeled interaction proxy;
- long-task and frame-time measurements are real browser observations;
- live config cannot silently become DEMO;
- app has an error boundary;
- release evaluator reads actual reports;
- frontend RC and live-backend readiness are separate statuses;
- CI uploads runtime-quality and release-manifest reports.
