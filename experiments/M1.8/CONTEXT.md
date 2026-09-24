# M1.8 — Context

Current state:
- frontend M1.0–M1.7 hard gates are green;
- Data Gateway runtime is explicitly DEMO unless configured otherwise;
- live backend implementation is external to Makar;
- LCP/CLS/interaction/long-task/frame-time remained unknown in M1.7.

Rules:
- no fake measurements;
- no silent live→DEMO fallback;
- browser/environment provenance is mandatory;
- runtime failures degrade to explicit unavailable/error states;
- release readiness is computed, not declared.
