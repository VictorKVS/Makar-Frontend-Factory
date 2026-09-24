# ALINA v1 — Avatar Placement Matrix

| Scenario | Preferred | Alternate | Core fallback | Placement intent |
|---|---|---|---|---|
| Research | bust | compact | portrait | consultant beside evidence |
| Coding | compact | voice-only | voice-only | do not compete with editor |
| Security | compact | bust | portrait | analyst near alerts/context |
| Presentation | hologram/full | bust | portrait | presenter / narrative anchor |
| Focus | hidden | voice-only | hidden | preserve concentration |

## Rules

- avatar state is independent from renderer;
- avatar placement is selected by scenario, breakpoint and performance tier;
- narrow layouts prefer voice-only/compact;
- Core tier never requires WebGL;
- user may explicitly hide ALINA;
- a hidden avatar may still retain conversation/task state.
