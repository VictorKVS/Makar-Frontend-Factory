# Context Composer v0

## Objective

Select the smallest useful knowledge set for an agent task without dumping the full knowledge base.

## Inputs

- Agent Passport
- skill state
- project overlay
- task domains
- explicit knowledge references
- constraints
- knowledge-item catalog

## Ranking v0

Each item receives weight from:

1. explicit task reference — dominant;
2. domain match;
3. importance;
4. confidence;
5. project match;
6. agent skill gap.

A weaker skill raises the explanatory value of relevant knowledge. A stronger skill reduces routine explanation, but explicit constraints still remain.

## Hard rule

Explicit knowledge references are preserved before general ranking.

## Output

A ranked list with reasons, capped by the agent's attention budget.

## Why deterministic first

The first version is intentionally simple and inspectable. We need evidence about:
- missed context;
- redundant context;
- rework;
- clarification cycles.

Only after this baseline should semantic retrieval, embeddings or LLM reranking be added.

## Future v1

- prerequisite expansion;
- recency;
- authority;
- cost-of-missing;
- contradiction detection;
- semantic retrieval;
- project decision precedence;
- context compression;
- delivery format adaptation by skill level.
