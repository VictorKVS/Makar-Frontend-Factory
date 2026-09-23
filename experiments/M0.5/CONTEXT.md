# M0.5 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 004  
**Task:** Visualization Engine v0

## Goal

Build a renderer-independent system that recommends appropriate visual representations from semantic data intent and shape.

## Why

M0.4 decides **what deserves attention**. M0.5 decides **how that information should be represented**.

## Inputs

- current Makar Agent Passport and skills;
- Repository Contract;
- M0.4 Result;
- Issue #13;
- existing ALINA laboratory UI.

## Hard constraints

1. Core logic must not depend on D3, React Flow, Three.js, chart libraries or ALINA.
2. Semantic intent outranks novelty.
3. Exact-value requirements must preserve a table-capable path.
4. Non-tabular visualizations require an accessible summary/fallback.
5. 3D is optional and must never be required to understand the data.
6. Recommendations and current selected representation must be serializable.

## First intents

- compare
- trend
- inspect
- relate
- locate
- sequence
- monitor

## First visual forms

- metric
- table
- chart
- timeline
- graph
- map
- network
- canvas

## Evidence

- typecheck;
- unit tests;
- ALINA demo integration;
- responsive screenshots;
- Experiment 004 RESULT.md.
