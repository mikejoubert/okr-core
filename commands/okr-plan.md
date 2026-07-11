---
description: "PLAN phase — brainstorm Initiatives, research, map dependencies, and verify the plan will move the Key Results."
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
  - WebSearch
---

Run the **PLAN** phase of the OKR loop via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md`. Objectives and KRs are locked from
   DISCUSS — do not redefine them here.
2. Follow `src/prompts/master-system-prompt.md` §"Phase 2 — PLAN". You may spawn
   the `okr-planner` agent.

For each KR, brainstorm candidate **Initiatives**, research context, **map
dependencies** and the logical sequence, and **verify** that if the Initiatives
succeed the KRs reach target. Record findings in CONTEXT.md and write Initiatives
(status `Planned`) plus the dependency map into STATE.md. Set
`Current Phase: EXECUTE`.

End with a summary and instruct the team to run `/okr-execute`.
