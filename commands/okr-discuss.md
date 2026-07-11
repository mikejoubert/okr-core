---
description: "DISCUSS phase — facilitate 2–4 Objectives and their outcome Key Results before any planning."
argument-hint: "[--new-cycle]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---

Run the **DISCUSS** phase of the OKR loop via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md` (scaffold from
   `src/templates/` if missing or if `--new-cycle` was passed).
2. Follow `src/prompts/master-system-prompt.md` §"Phase 1 — DISCUSS". You may
   spawn the `okr-facilitator` agent.

Capture 2–4 Objectives; for each, ask **Committed vs Aspirational** and elicit
2–4 **outcome** Key Results (metric, unit, start, target). Reclassify any activity
as an Initiative. Confirm with the team, then write CONTEXT.md and initialize
STATE.md with `Current Phase: PLAN`.

End with what was recorded and instruct the team to run `/okr-plan`.
Do **not** plan initiatives, assign owners, or build waves in this phase.
