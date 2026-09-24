# M1.3 — Acceptance

- ProductShell business payload comes through a Data Gateway rather than local scenario business-data constants.
- DEMO adapter is visibly tagged as DEMO/MOCK.
- Data envelope supports loading, ready, empty, stale, error and offline.
- Provenance supports live, cached, demo, synthetic and unavailable.
- HTTP transport is injected and replaceable.
- Realtime source is an adapter boundary, not hard-coded WebSocket/EventSource logic.
- Command request has request identity and command response has correlation identity.
- Backend handoff is machine-readable.
- Transport does not override Stream Engine semantic priority.
- Offline/unavailable state can be rendered without pretending data is live.
- Unit tests and ProductShell tests pass.
- Existing visual/performance budgets remain green.
