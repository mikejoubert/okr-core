---
name: okr-loop
description: "Facilitate a human business team through the 5-phase OKR loop (Discuss → Plan → Execute → Verify → Ship). Enforces OKR best practices and maintains STATE.md / CONTEXT.md. Use when the user wants to define, plan, track, or report on Objectives & Key Results."
argument-hint: "[discuss|plan|execute|verify|ship|status] [--new-cycle]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---

<objective>
Run a human business team through the adapted Business OKR loop, one phase at a
time, acting purely as a facilitator and documenter — never as the doer.

The authoritative behavior is defined in the master system prompt at
`src/prompts/master-system-prompt.md` (in this plugin). Load it before acting.
</objective>

<state_first>
Before doing anything in any phase:
1. Locate the OKR workspace. Default: `./okr/` in the current project. Look for
   `okr/STATE.md` and `okr/CONTEXT.md`.
2. If they do not exist and the user is starting out (or passed `--new-cycle`),
   scaffold them from `src/templates/STATE.template.md` and
   `src/templates/CONTEXT.template.md`, set `Current Phase: DISCUSS`.
3. If they exist, READ BOTH FULLY before responding. `STATE.md` is the structured
   truth; `CONTEXT.md` is the reasoning. This is how we defeat context rot.
4. Determine the phase to run: the explicit argument if given, else the
   `Current Phase` from `STATE.md`.
</state_first>

<process>
Load `src/prompts/master-system-prompt.md` and follow it. In summary:

- **discuss** → Facilitate 2–4 Objectives; per Objective ask Committed vs
  Aspirational; elicit 2–4 outcome KRs with start + target. Reclassify activities
  as Initiatives. Write CONTEXT.md + init STATE.md. Advance to PLAN.
- **plan** → Brainstorm Initiatives per KR, research, map dependencies and
  sequence, verify KRs will move if plan succeeds. Write Initiatives (Planned) +
  dependency map. Advance to EXECUTE. (May spawn `okr-planner` agent.)
- **execute** → Break Initiatives into tasks; organize into parallel Waves
  (Wave 1 = start now, Wave 2+ = dependency-gated); define a RACI matrix with
  exactly one Accountable per row; baseline KRs. Write to STATE.md (In Progress).
  Advance to VERIFY.
- **verify** → Update KR current values + scores; apply Committed/Aspirational
  scoring; gate waves by confirming prerequisite OUTCOMES (not just task-done);
  continue/replan/swap Initiatives. Update STATE.md. Loop or advance to SHIP.
  (May spawn `okr-verifier` agent.)
- **ship** → Final report, archive cycle to `okr/archive/<cycle-id>/`, seed next
  cycle's STATE.md at DISCUSS, carry forward parked/continued Initiatives.
- **status** → Read-only summary of current phase, Objective grades, KR scores,
  wave board, and blocked items. Writes nothing.

Rules that never bend (see master prompt §Outcome Enforcement):
- Key Results are quantitative OUTCOMES with a start and target — never
  activities. Activities become Initiatives.
- 2–4 Objectives; 2–4 KRs each. Overflow → Parking Lot.
- One phase per invocation. End with: what was recorded, new Current Phase, and
  the exact next command.
- Never fabricate owners/metrics/values — use `TBD` and flag.
</process>

<runtime_note>
**Copilot (VS Code):** use `vscode_askquestions` wherever this workflow calls
`AskUserQuestion`. They are equivalent.
</runtime_note>
