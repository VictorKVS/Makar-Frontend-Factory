# M0.4 — Knowledge Pack

## Selected knowledge

1. Semantic class outranks simple arrival order.
2. Primary = current user task and normally owns attention.
3. Secondary supports primary without replacing it.
4. Background must not interrupt.
5. Alert may interrupt only when policy qualifies it.
6. Agent activity is a separate stream.
7. Attention budget caps how many prominent items are selected.
8. Cost-of-missing can break ties inside a class.
9. Acknowledgement changes interruption behavior.
10. Stream state must be serializable and renderer-independent.

## Canonical classes

`primary | secondary | background | alert | agent`

## Avoid

- sorting everything by newest first;
- UI-specific CSS state in the stream core;
- embedding React nodes;
- agent logs becoming the primary task;
- repeated acknowledged alert interruptions;
- hidden priority rules that cannot be tested.
