# M1.3 — Context

M1.2 moved ALINA from Engineering Lab to a real product-first shell.

M1.3 separates frontend product state from data transport.

## Responsibility boundary

Makar owns:
- frontend data contracts;
- normalized envelopes;
- provenance UI;
- source adapters;
- runtime states;
- transport-independent product integration.

Backend agent owns:
- real endpoints;
- persistence;
- authorization;
- server-side aggregation;
- event production.

The handoff between them must be machine-readable.

## Critical rule

Transport and arrival time do not decide information priority. Existing Stream Engine semantics remain authoritative.
