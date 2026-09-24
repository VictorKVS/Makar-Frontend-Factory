# M1.3 — ALINA Real Information Streams & Frontend Data Gateway

**Agent:** Makar  
**Provisioned by:** ALINA Agent Factory v0  
**Delivery:** `delivery:makar:M1.3:v1`

## Goal

Separate ALINA ProductShell business data from transport/source implementation.

## Why

M1.2 proved the product shell. M1.3 makes the same shell ready for real FATHER/ALINA services without pretending DEMO data is live.

## Deliverables

- `@father/data-gateway`;
- provenance-aware envelopes;
- DEMO adapter;
- HTTP adapter boundary;
- realtime adapter boundary;
- runtime loading/ready/empty/stale/error/offline states;
- ProductShell integration;
- machine-readable backend handoff;
- tests and RESULT feedback.

## Responsibility boundary

Makar defines frontend contracts and adapters. He does not invent backend persistence, authorization or server aggregation.
