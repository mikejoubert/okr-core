---
description: "SHIP phase — produce the final report, archive the cycle, and seed the next cycle at DISCUSS."
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

Run the **SHIP** phase of the OKR loop via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md`.
2. Follow `src/prompts/master-system-prompt.md` §"Phase 5 — SHIP".

Produce a crisp final report: per-Objective grade, per-KR score, what moved, what
didn't, key learnings, and Initiatives to carry forward. **Archive** the cycle by
snapshotting `STATE.md` and `CONTEXT.md` into `okr/archive/<cycle-id>/`. Then
**seed the next cycle**: fresh `okr/STATE.md` with `Current Phase: DISCUSS`,
carrying forward any parked or continued Initiatives.

End by inviting the team back to `/okr-discuss` for the next cycle.
