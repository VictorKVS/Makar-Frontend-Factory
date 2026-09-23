# M0.3 — ALINA Context Package

**Agent:** Makar  
**Task:** Build Workspace Engine v0  
**Status:** READY after Repository Contract validation

## Goal

Create the first reusable workspace model for FATHER interfaces: registered panels, regions, visibility, focus, docking intent, responsive transformations and serializable layouts.

## Why

ALINA must not be a fixed dashboard. The same information modules need to rearrange for research, coding, security, presentation and future game/simulation interfaces.

## Required knowledge

- screen = composition, not page;
- domain state must remain separate from presentation state;
- workspace layout must be serializable;
- responsive transformations are first-class;
- shared engine must remain ALINA-agnostic.

## Scope v0

Include:
- panel registry;
- panel identity and metadata;
- regions;
- visible/hidden/minimized state;
- focused panel;
- basic dock positions;
- immutable layout operations;
- serialization/deserialization;
- responsive transform hooks.

Exclude for now:
- freeform drag physics;
- complex collision solving;
- persistence backend;
- 3D workspace;
- multi-user synchronization.

## Repository execution contract

Use `repository-contract.json`.

## Acceptance

- package: `packages/workspace-engine`;
- typed public API;
- deterministic state transitions;
- layout serialization;
- unit tests;
- no ALINA-specific imports;
- example integration in ALINA demo;
- RESULT.md records context quality and rework.
