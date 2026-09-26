# ALINA School — Weight Model

Weights are semantic dimensions. They must not be collapsed into one universal score.

| Weight | Meaning |
| --- | --- |
| importance | contribution of the node/relationship to the profession |
| prerequisite | how strongly A is required before B |
| skill | contribution of knowledge/practice to an executable skill |
| assessment | contribution of an assessment to a competence decision |
| confidence | confidence in the relationship or conclusion |
| evidence | strength/relevance of the evidence |
| recency | sensitivity to knowledge becoming stale |
| transfer | ability to transfer the capability to new tasks/domains |

All normalized relationship weights use 0..1.

A weight is not mastery.

Mastery belongs to the student. Weights belong to the school model.

## Rule

Never infer a student's competence simply because an important node exists in the curriculum.

```text
school importance != student mastery
```
