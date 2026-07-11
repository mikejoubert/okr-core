# STATE.md — OKR Cycle State

> Structured, machine-and-human-readable source of truth for the current OKR
> cycle. OKR Core reads this at the start of every session and rewrites it at the
> end of every phase. Do not hand-edit values you want the loop to trust without
> telling the facilitator. Values that are unknown are recorded as `TBD`.

---

## Cycle Meta

| Field           | Value                                   |
| --------------- | --------------------------------------- |
| Cycle ID        | `<e.g. 2026-Q3>`                        |
| Current Phase   | `DISCUSS`  <!-- DISCUSS \| PLAN \| EXECUTE \| VERIFY \| SHIP --> |
| Cycle Start     | `<YYYY-MM-DD>`                          |
| Cycle End       | `<YYYY-MM-DD>`                          |
| Last Updated    | `<YYYY-MM-DD>`                          |
| Facilitator Log | `CONTEXT.md`                            |

---

## Objectives

> 2–4 Objectives only. Each is qualitative and inspirational. `Type` is
> **Committed** (must hit 100%) or **Aspirational** (~70% = success).

### O1 — `<Objective statement>`
- **Type:** `Aspirational`  <!-- Committed | Aspirational -->
- **Owner (Accountable):** `<name / TBD>`
- **Confidence:** `<0.0–1.0 / TBD>`
- **Grade (Verify+):** `<0.0–1.0 / —>`

### O2 — `<Objective statement>`
- **Type:** `Committed`
- **Owner (Accountable):** `<name / TBD>`
- **Confidence:** `<0.0–1.0 / TBD>`
- **Grade (Verify+):** `<0.0–1.0 / —>`

<!-- add O3, O4 only if truly needed. Hard cap: 4. -->

---

## Key Results

> 2–4 per Objective. Every KR is a **quantitative outcome** with a start and a
> target. Score = (Current − Start) / (Target − Start), clamped 0.0–1.0.
> If a row has no Start or Target, it is not a valid KR yet — resolve the `TBD`.

| ID    | Obj | Key Result (metric)              | Unit | Start | Current | Target | Score | Notes         |
| ----- | --- | -------------------------------- | ---- | ----- | ------- | ------ | ----- | ------------- |
| KR1.1 | O1  | `<e.g. Trial→paid conversion>`   | %    | 4.0   | TBD     | 9.0    | —     |               |
| KR1.2 | O1  | `<metric>`                       | `<>` | TBD   | TBD     | TBD    | —     |               |
| KR2.1 | O2  | `<metric>`                       | `<>` | TBD   | TBD     | TBD    | —     |               |

---

## Initiatives

> Activities and bets the human team runs to move the Key Results. Initiatives
> are the levers, **not** the measures. This is where reclassified "activities"
> land. Each Initiative carries a RACI matrix and a status.
>
> Status: `Planned` → `In Progress` → `Done` | `Blocked` | `Dropped (reason)`
> Wave: `1` = start now; `2+` = blocked until a prerequisite outcome is met.

### INIT-01 — `<Initiative name>`
- **Moves:** `KR1.1` `<+ other KRs>`
- **Status:** `Planned`
- **Wave:** `1`
- **Depends on:** `<none / INIT-xx outcome: "…">`
- **Unlock condition:** `<none / the prerequisite outcome that must be verified>`

| Role            | People                    |
| --------------- | ------------------------- |
| **R**esponsible | `<name(s)>`               |
| **A**ccountable | `<exactly one name>`      |
| **C**onsulted   | `<name(s) / —>`           |
| **I**nformed    | `<name(s) / —>`           |

**Tasks**
- [ ] `<task>` — Wave 1
- [ ] `<task>` — Wave 2 (unlock: `<condition>`)

### INIT-02 — `<Initiative name>`
- **Moves:** `KR2.1`
- **Status:** `Planned`
- **Wave:** `2`
- **Depends on:** `INIT-01 outcome: "<prerequisite outcome>"`
- **Unlock condition:** `<the specific outcome Verify must confirm before this starts>`

| Role            | People               |
| --------------- | -------------------- |
| **R**esponsible | `<name(s)>`          |
| **A**ccountable | `<exactly one name>` |
| **C**onsulted   | `<name(s) / —>`      |
| **I**nformed    | `<name(s) / —>`      |

**Tasks**
- [ ] `<task>` — Wave 2 (unlock: `<condition>`)

---

## Wave Board

> Snapshot of execution sequencing, derived from Initiative dependencies.

| Wave | Initiatives / Tasks       | Gate (prerequisite outcome) | Status        |
| ---- | ------------------------- | --------------------------- | ------------- |
| 1    | `INIT-01`                 | none — start now            | `In Progress` |
| 2    | `INIT-02`                 | `<INIT-01 outcome met>`     | `Locked`      |

---

## Parking Lot

> Overflow Objectives/KRs/ideas cut to preserve focus. Not part of this cycle.

- `<item>` — reason parked

---

## Change Log

> Appended each phase. Never rewrite history here.

- `<YYYY-MM-DD>` — `DISCUSS` — initialized cycle with O1, O2.
