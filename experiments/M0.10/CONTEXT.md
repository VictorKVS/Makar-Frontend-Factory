# M0.10 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 009  
**Task:** Performance & Visual QA

## Goal

Make quality budgets, visual evidence and performance fallback rules explicit before ALINA v1 implementation.

## Inputs

- all M0.2–M0.9 results;
- Repository Contract;
- Scene performance tiers;
- existing Playwright responsive matrix;
- quality-budget.json.

## Hard rules

- budgets are configuration, not hidden constants;
- Core tier must stay usable;
- cinematic features require evidence;
- accessibility checks are quality gates;
- missing measurements are visible, never silently treated as passes;
- visual evidence must be traceable to a run/commit.

## First proof

Evaluate one passing and one failing measurement set and demonstrate performance-tier recommendation.

## Evidence

- typecheck;
- unit tests;
- ALINA QA Lab;
- CI evidence;
- RESULT.md.
