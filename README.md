# OKR Core

A downloadable, GitHub-managed **Business OKR project-manager** for
[Claude Code](https://claude.com/claude-code), modeled on the architecture and
distribution mechanism of `gsd-core` — but adapted for facilitating *business
outcomes* instead of writing and deploying code.

OKR Core is a **facilitator and documenter**, not a doer. It runs a human team
through a disciplined 5-phase OKR loop, enforces OKR best practices, and keeps a
durable record of your Objectives, Key Results, and Initiatives in structured
`STATE.md` / `CONTEXT.md` artifacts so context survives across sessions.

---

## The loop

```
  Discuss ──▶ Plan ──▶ Execute ──▶ Verify ──▶ Ship ──┐
     ▲                                                │
     └────────────────── next cycle ◀────────────────┘
```

| Phase       | Command          | What happens                                                                 |
| ----------- | ---------------- | ---------------------------------------------------------------------------- |
| **Discuss** | `/okr-discuss`   | Capture 2–4 Objectives + outcome Key Results. Commit vs Aspirational.        |
| **Plan**    | `/okr-plan`      | Brainstorm Initiatives, research, map dependencies, verify the plan.         |
| **Execute** | `/okr-execute`   | Wave-sequenced task list (Wave 1 / Wave 2+) + RACI matrix for the team.      |
| **Verify**  | `/okr-verify`    | Measure KR progress, gate waves on met outcomes, replan/swap Initiatives.    |
| **Ship**    | `/okr-ship`      | Final report, archive the cycle, seed the next one.                          |
| _(status)_  | `/okr-status`    | Read-only snapshot — phase, grades, scores, wave board. Writes nothing.      |

Run **one phase at a time.** Each phase reads the state files, does its work,
writes them back, and tells you the next command.

---

## OKR discipline it enforces

- **Outcomes, never activities, as Key Results.** A KR must be a quantitative
  outcome with a **start value and a target value** (e.g. `trial→paid 4% → 9%`).
  If you hand it an activity ("launch a feedback program"), it is reclassified as
  an **Initiative** and you're asked what *outcome* it should drive.
- **Ruthless focus:** 2–4 Objectives, each with 2–4 Key Results. Overflow goes to
  a Parking Lot.
- **Committed vs Aspirational:** every Objective is graded against 100% or ~70%.
- **One Accountable per Initiative** in the RACI matrix — enforced.
- **Outcome-gated waves:** a dependent task unlocks only when the prerequisite
  *outcome* is verified, not merely when an upstream task is marked done.

---

## Install

Cross-runtime installer (Node ≥18, Bun, or Deno). No dependencies.

**Global — available in every project:**

```bash
npx @okr-core/cli --global
# or, from a checkout:
./install.sh --global        # macOS / Linux / WSL / Git Bash
./install.ps1 --global       # Windows PowerShell
```

**Local — this project only:**

```bash
npx @okr-core/cli --local
```

**Custom target:**

```bash
node bin/okr-install.mjs --dest /path/to/.claude/plugins
```

The installer copies the plugin payload (`agents/`, `commands/`, `skills/`,
`src/`, `.claude-plugin/`) into your Claude Code plugins directory. Re-running is
idempotent.

### Via the plugin marketplace

This repo ships a `.claude-plugin/marketplace.json`, so it can also be added as a
Claude Code plugin marketplace directly from GitHub:

```
/plugin marketplace add your-org/okr-core
/plugin install okr-core@okr-core-marketplace
```

---

## Repository structure

```
okr-core/
├── .claude-plugin/
│   ├── plugin.json              # Claude Code plugin manifest
│   └── marketplace.json         # Marketplace manifest (installable from GitHub)
├── agents/                      # Subagent instruction sets
│   ├── okr-facilitator.md       #   DISCUSS: draw out Objectives + KRs
│   ├── okr-planner.md           #   PLAN/EXECUTE: Initiatives, waves, RACI
│   └── okr-verifier.md          #   VERIFY: measure, gate, replan
├── commands/                    # Slash commands, one per phase
│   ├── okr-discuss.md
│   ├── okr-plan.md
│   ├── okr-execute.md
│   ├── okr-verify.md
│   ├── okr-ship.md
│   └── okr-status.md
├── skills/
│   └── okr-loop/
│       └── SKILL.md             # Binds the loop into Claude Code
├── src/
│   ├── prompts/
│   │   └── master-system-prompt.md   # The core PM behavior (the brain)
│   └── templates/
│       ├── STATE.template.md    # Structured cycle state (source of truth)
│       └── CONTEXT.template.md  # Narrative memory (rationale, decisions)
├── bin/
│   └── okr-install.mjs          # Cross-runtime installer (node/bun/deno)
├── install.sh                   # POSIX bootstrap
├── install.ps1                  # Windows bootstrap
├── package.json                 # npm/npx entry point
├── LICENSE
└── README.md
```

Your working OKR data lives in **your** project under `okr/` — `okr/STATE.md`,
`okr/CONTEXT.md`, and `okr/archive/<cycle-id>/` — created on first `/okr-discuss`.

---

## State management (context engineering)

Two artifacts are the shared memory that defeats context rot between sessions:

- **`STATE.md`** — the structured record: Current Phase, Objectives (with
  Committed/Aspirational), Key Results (start / current / target / score), and
  Initiatives (with RACI matrix, wave, and status).
- **`CONTEXT.md`** — the narrative: assumptions, research, decisions, rationale,
  reclassification audit trail, and per-session handoffs.

OKR Core reads both at the start of every session and rewrites them at the end of
every phase.

---

## License

MIT © Michael Joubert
