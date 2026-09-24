# avatar-engine

Reusable digital-character state and presentation-negotiation subsystem.

## Core rule

**Identity and behavioral state are independent from renderer and placement.**

ALINA must remain the same persona while moving between compact assistant, portrait, bust, full body, hologram, voice-only and hidden presentation.

## State

The core models:

- identity;
- presence mode;
- activity: idle / listening / thinking / speaking / working;
- expression;
- gesture;
- attention target;
- task/context references;
- interruption permission;
- requested renderer capabilities;
- revision.

## Renderer negotiation

A renderer declares supported presence modes and capabilities. The engine selects a deterministic fallback when the requested mode cannot be rendered.

Example:

`hologram → full → bust → portrait → compact → voice-only → hidden`

Reduced-motion is handled as a renderer constraint, not by changing ALINA's identity.

## Boundaries

The core package must not depend on:

- React;
- Three.js / WebGL;
- TTS / STT;
- lip-sync;
- a specific 2D/3D avatar asset;
- ALINA application code.

Those attach through future renderer/adapters.

## Why

This allows the same persona state to be reused in:

- ALINA Control Center;
- mobile/compact UI;
- voice-first mode;
- cinematic 2.5D/3D scenes;
- future games and simulations.
