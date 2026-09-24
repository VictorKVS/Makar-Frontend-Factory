# M1.6 — ALINA Cinematic Scene Layer

**Agent:** Makar  
**Delivery:** delivery:makar:M1.6:v1

## Goal

Install a real WebGL-capable scene adapter behind ALINA while preserving Core/Enhanced fallbacks.

## Key proof

When WebGL initializes successfully:
- Scene Layer reports `webgl-cinematic`;
- Avatar renderer receives true 3D capability;
- Presentation hologram no longer reports `missing:3d`.

When WebGL cannot initialize:
- scene falls back;
- avatar capability trace remains degraded;
- the task stays usable.
