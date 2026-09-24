# M0.9 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 008  
**Task:** Scene & Asset Pipeline

## Goal

Create a reusable scene and asset contract that can serve ALINA cinematic UI and later web/game scenes without hard-coding renderer or file paths into product components.

## Hard rules

- assets use stable IDs;
- provenance/version/license metadata travels with the asset;
- scene state is presentation state, not domain state;
- renderer adapters remain outside the core contract;
- Core mode works with no WebGL;
- cinematic failure degrades instead of breaking the product;
- load policy and LOD are explicit;
- manifests are serializable.

## First proof

Resolve the same ALINA scene manifest under:
- cinematic WebGL capability;
- reduced-motion capability;
- no-WebGL Core fallback.

## Repository Contract

Use `repository-contract.json`.

## Evidence

- typecheck;
- unit tests;
- ALINA Scene Lab;
- fallback proof;
- RESULT.md.
