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

Clone the repo, then run the bootstrap installer for your OS. It resolves whichever
JS runtime you have (`node` → `bun` → `deno`) and copies the plugin payload
(`agents/`, `commands/`, `skills/`, `src/`, `.claude-plugin/`) into your Claude
Code plugins directory. Re-running is idempotent.

```bash
git clone https://github.com/mikejoubert/okr-core.git
cd okr-core
```

**Global — available in every project:**

```bash
./install.sh --global        # macOS / Linux / WSL / Git Bash
./install.ps1 --global       # Windows PowerShell
```

**Local — this project only:**

```bash
./install.sh --local
```

**Custom target:**

```bash
node bin/okr-install.mjs --dest /path/to/.claude/plugins
```

You can also pipe the bootstrap straight from GitHub without cloning first:

```bash
curl -fsSL https://raw.githubusercontent.com/mikejoubert/okr-core/main/install.sh | sh -s -- --global
```

### Via the plugin marketplace

This repo ships a `.claude-plugin/marketplace.json`, so it can also be added as a
Claude Code plugin marketplace directly from GitHub — no clone required:

```
/plugin marketplace add mikejoubert/okr-core
/plugin install okr-core@okr-core-marketplace
```

### Via npm (once published)

The package is set up to publish as `okr-core`. Once it's on npm, the installer is
available with no clone:

```bash
npx okr-core --global
npx okr-core --local
```

---

## Set up on another computer

npm publishing is **not** required — everything below works from GitHub alone.
Pick one of the two paths. Both have been validated end-to-end (manifests,
payload integrity, and idempotent re-install).

**Prerequisites**
- Path A: just [Claude Code](https://claude.com/claude-code) — no runtime needed.
- Path B: [Claude Code](https://claude.com/claude-code) **and** a JS runtime on
  `PATH` — Node ≥18 (recommended), Bun, or Deno. Plus `git`.

### Path A — Plugin marketplace (simplest, zero dependencies)

Inside Claude Code, run:

```
/plugin marketplace add mikejoubert/okr-core
/plugin install okr-core@okr-core-marketplace
```

Then start the loop:

```
/okr-discuss
```

### Path B — Clone + bootstrap installer

**macOS / Linux / WSL / Git Bash:**

```bash
git clone https://github.com/mikejoubert/okr-core.git
cd okr-core
./install.sh --global        # every project   (use --local for this project only)
```

**Windows (PowerShell):**

```powershell
git clone https://github.com/mikejoubert/okr-core.git
cd okr-core
./install.ps1 --global       # every project   (use --local for this project only)
```

**No git?** Pipe the bootstrap straight from GitHub instead:

```bash
curl -fsSL https://raw.githubusercontent.com/mikejoubert/okr-core/main/install.sh | sh -s -- --global
```

### Verify the install worked

The installer prints `✔ Installed OKR Core → <path>` and drops a
`.okr-install.json` manifest in the target. Confirm the plugin landed:

```bash
# global install location:
ls ~/.claude/plugins/okr-core        # macOS / Linux / WSL
ls $env:USERPROFILE\.claude\plugins\okr-core   # Windows PowerShell
```

You should see `agents/`, `commands/`, `skills/`, `src/`, and `.claude-plugin/`.
Then open Claude Code and run `/okr-discuss` to begin the first cycle.
Re-running any installer command later is safe — it refreshes the copy in place.

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
