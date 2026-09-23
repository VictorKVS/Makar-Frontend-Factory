# Contributing

## Rule 1 — reusable before spectacular

A cinematic effect is accepted only when its ownership, performance cost and fallback are clear.

## Rule 2 — packages must have boundaries

Application-specific code stays in `apps/*`. Reusable logic belongs in `packages/*`.

## Rule 3 — no fake production data

DEMO, mock and synthetic data must be visibly marked.

## Rule 4 — every visual feature has states

At minimum: loading, empty, error, reduced-motion and narrow-screen behavior.

## Rule 5 — measure

For heavyweight UI features record:
- bundle impact;
- runtime FPS where relevant;
- interaction latency;
- memory/GPU concerns;
- accessibility implications.

## Branches

Use short task branches such as:

`feat/design-tokens`
`feat/workspace-docking`
`feat/alina-avatar-stage`

Prefer small pull requests with screenshots or short recordings for visual changes.
