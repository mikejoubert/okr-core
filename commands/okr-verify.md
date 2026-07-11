---
description: "VERIFY phase — measure Key Result progress, gate dependent waves on met outcomes, diagnose, and replan/swap Initiatives."
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---

Run the **VERIFY** phase of the OKR loop via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md`.
2. Follow `src/prompts/master-system-prompt.md` §"Phase 4 — VERIFY". You may spawn
   the `okr-verifier` agent.

Update each KR's current value and score. Grade Objectives, reading the score
against **Committed (vs 100%)** or **Aspirational (vs ~70%)**. **Gate the waves:**
only unlock a Wave-2+ task when its prerequisite *outcome* is verified — not just
that the upstream task was marked done. Diagnose stalled KRs and decide
**continue / replan / swap** (dropped Initiatives → `Dropped (reason)`).

Update STATE.md and append to the Change Log + CONTEXT.md handoff. Then either
loop back to EXECUTE or advance to SHIP. End with a one-line status per Objective
and the next command.
