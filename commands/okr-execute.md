---
description: "EXECUTE phase — break Initiatives into a wave-sequenced task list and define the RACI matrix for the human team."
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---

Run the **EXECUTE** phase of the OKR loop via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md`.
2. Follow `src/prompts/master-system-prompt.md` §"Phase 3 — EXECUTE". You may
   spawn the `okr-planner` agent.

Break Initiatives into concrete tasks and organize them into **parallel Waves**
(Wave 1 = start now; Wave 2+ = dependency-gated, with the exact unlock condition).
Define a **RACI matrix** per Initiative with **exactly one Accountable** each.
Baseline the KRs. Write waves, tasks, and RACI into STATE.md (status
`In Progress`) and the Wave Board. Set `Current Phase: VERIFY`.

Then stop — the humans execute in the real world. Instruct them to return via
`/okr-verify` when there is progress to review.
