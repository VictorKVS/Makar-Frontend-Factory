# M1.6 — Acceptance

- WebGL adapter initializes only when available;
- 3D capability is never claimed before successful adapter initialization;
- scene lifecycle exposes start / stop / resize / dispose;
- reduced-motion path avoids continuous scene animation;
- Core tier never requires WebGL;
- avatar state remains renderer-independent;
- ProductShell remains usable on adapter failure;
- quality budget and visual QA pass.
