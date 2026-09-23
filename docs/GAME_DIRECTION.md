# Game Direction

Makar Frontend Factory will later support games, but game architecture must grow from stable shared primitives instead of contaminating ALINA with game-specific assumptions.

## Shared with product interfaces

- design tokens;
- UI primitives;
- input normalization;
- animation conventions;
- avatar/persona contracts;
- scene and asset pipeline;
- state machines;
- composition/layout;
- audio/voice hooks;
- telemetry and performance tools.

## Game-specific later

- deterministic or tick-based simulation;
- gameplay state;
- entity/component model if needed;
- physics;
- save/load;
- matchmaking/networking if needed;
- gamepad-first navigation;
- game-specific asset streaming.

## Rule

Do not add a game dependency to a shared package unless a non-game product can still use that package cleanly.
