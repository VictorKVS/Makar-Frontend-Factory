# M0.2 — Knowledge Pack

Only the knowledge needed for this task is included.

## Required patterns

1. Semantic token consumption instead of raw color literals.
2. Shared primitives contain presentation behavior, not ALINA business logic.
3. Every interactive control needs keyboard focus.
4. Motion requires reduced-motion fallback.
5. Glass/glow/depth are semantic materials with performance cost.
6. Visual components require loading/disabled/focus states where relevant.

## Avoid

- one giant ALINA page component;
- inline random hex colors;
- glow on every element;
- motion without purpose;
- DEMO data that looks like production data;
- coupling primitives to one screen.
