# M0.8 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 007  
**Task:** Input & Interaction Engine

## Goal

Normalize keyboard, pointer, touch, voice and future gamepad inputs into semantic actions that can be reused by ALINA and future games.

## Hard rules

- actions are semantic, not device-specific;
- browser text editing is protected;
- focus context is part of dispatch;
- bindings are serializable and remappable;
- gamepad is a source adapter, not a separate architecture;
- shared core stays ALINA-agnostic.

## First proof

Demonstrate that the same semantic action can be triggered from more than one source without application code depending on the physical device.

## Repository Contract

Use `repository-contract.json`.

## Evidence

- typecheck;
- unit tests;
- ALINA Interaction Lab;
- keyboard accessibility;
- future gamepad contract;
- RESULT.md.
