# M0.3 — Knowledge Pack

ALINA selected only the knowledge required for this task.

## Required

1. **Presentation state ≠ domain state.**
2. Workspace layout must be JSON-serializable.
3. Persist stable panel IDs and content-type IDs, not React elements/functions.
4. State transitions should be deterministic and testable.
5. Focus/fullscreen is a workspace presentation mode, not a separate page.
6. Responsive transformations must preserve panel identity.
7. Keyboard focus and accessibility remain requirements from M0.2.
8. Repository Contract is authoritative for build/test/visual-QA commands.

## Suggested state shape

```text
Workspace
├── id
├── breakpointMode
├── focusedPanelId
├── panels[]
│   ├── id
│   ├── contentType
│   ├── region
│   ├── mode
│   ├── order
│   └── collapsed
└── version
```

## Avoid

- storing JSX in persisted state;
- mixing task/document payloads into layout;
- CSS-only hidden state that cannot be serialized;
- one-off ALINA-only docking rules;
- nondeterministic panel IDs.
