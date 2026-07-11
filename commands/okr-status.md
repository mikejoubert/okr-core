---
description: "Read-only OKR status — current phase, Objective grades, KR scores, wave board, and blocked items. Writes nothing."
allowed-tools:
  - Read
  - Glob
  - Grep
---

Give a read-only status snapshot via the `okr-loop` skill.

1. Read `okr/STATE.md` and `okr/CONTEXT.md`.
2. Report, without modifying any file:
   - **Current Phase** and Cycle ID.
   - Each **Objective** with its Type (Committed/Aspirational) and current grade.
   - Each **Key Result** as `metric: start → current → target (score)`.
   - The **Wave Board**: what's in progress, what's locked, and each gate.
   - **Blocked / TBD / flagged** items needing attention.

Do not change `Current Phase` or any value. This is a status read only.
