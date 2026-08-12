---
name: gaia-feature-dev
description: >-
  GAIA guided feature development from a task card. Use when the user points at a
  docs/tasks/**/*.md card (e.g. FE-11) or describes a feature/fix and wants the full
  GAIA workflow: analyze the request, pick the right GAIA agents + skills, ask all
  clarifying questions, produce a plan, wait for approval, then implement by routing
  to the senior-nextjs / senior-backend orchestrators. Always syncs and consults the
  shared CodeGraph of BOTH gaia-api and gaia-web before and after implementation,
  even for frontend-only tasks. Triggers: "feature-dev", "implement this task card",
  "trabalhar nessa task", "/gaia-feature-dev".
---

# GAIA Feature Development

Systematic feature/fix workflow for the GAIA ecosystem (`gaia-api` Django · `gaia-web`
Next.js · `GAIA` orchestration). You drive discovery → routing → questions → plan →
**approval gate** → orchestrator-routed implementation → verification → CodeGraph
re-sync → summary.

## Non-negotiables

- **CodeGraph first** (project convention #1). Sync + query the shared graph of **both
  repos before AND after** implementation — even when the task is 100% frontend. A web
  change can break a cross-stack contract; the API graph is how you catch it.
- **Plan before code.** Never edit product source before the user approves the plan.
- **NEVER commit without authorization** (convention #4).
- **Route, don't freelance.** Implementation goes through the GAIA orchestrators
  (`senior-nextjs` / `senior-backend`), which fan out to layer sub-agents. See
  `AGENTS.md`. The main thread coordinates; it does not bypass the routing.
- **PT for UX/domain, EN for code** (convention #3).
- Use TodoWrite to track every phase.

---

## Phase 0 — CodeGraph pre-sync (both repos)

**Goal**: fresh graph of `gaia-api` + `gaia-web` before any analysis.

1. Run the global sync (indexes both child repos + docs into the shadow workspace):

   ```bash
   .opencode/bin/codegraph-global-sync.sh
   ```

2. Confirm freshness:

   ```bash
   .opencode/bin/codegraph-global-sync.sh --status
   ```

3. **Failure policy — warn + continue.** If the script fails (codegraph CLI missing,
   lock held, etc.), print a clear warning, note the fallback, and proceed using
   `grep`/`Read`. Do **not** abort the skill. Record it in the todo list so the user
   knows the graph may be stale.

---

## Phase 1 — Discovery

**Goal**: understand exactly what to build.

Initial request / task card: **$ARGUMENTS**

1. Create the todo list covering every phase below.
2. If the input is a `docs/tasks/**/*.md` card, Read it in full. Extract: Problema,
   Solução, Checklist, Refs, priority, acceptance criteria. Treat the card's Checklist
   as the initial definition of done.
3. If the input is a free-form description, restate the problem, expected behavior, and
   any stated constraints.
4. Summarize your understanding in one tight paragraph and confirm with the user.

---

## Phase 2 — Codebase exploration (CodeGraph-primary)

**Goal**: understand the affected code and its cross-stack blast radius.

1. **Query the graph first** with `codegraph_context` for every symbol/file named in the
   card (e.g. `regenerative.query.ts`, the `*Options` factory, its consumers). Only fall
   back to grep when the graph is unavailable or the symbol isn't indexed.
2. Map the blast radius across **both** repos:
   - Frontend: services / hooks / components / schemas / messages that touch the change.
   - Backend/contract: even for a web task, check the OpenAPI endpoint + DRF serializer
     behind any affected `*Options` factory (404 semantics, nullable fields, enums).
3. Read the key files the graph surfaces — don't operate on names alone.
4. Present a findings summary: what exists, the relevant patterns/docs
   (`docs/agents/web/*.md`, playbook), and the consumers that must keep working.

---

## Phase 3 — Agent + skill selection

**Goal**: decide who does the work, per `AGENTS.md` routing. State this explicitly to
the user before designing.

Decide and name:

- **Orchestrator**: `senior-nextjs` (web) and/or `senior-backend` (api). Cross-stack
  contract change → also `cross-stack`.
- **Layer sub-agents** the orchestrator should fan out to:
  - Web: `form-agent` (RHF+Zod), `table-agent` (TanStack Table),
    `api-layer-agent` (TanStack Query service layer), `design-agent` (shadcn/Tailwind),
    `i18n-key-validator` (locale keys).
  - API: `model-agent`, `service-agent`, `selector-agent`, `serializer-agent`,
    `migration-agent`, `test-agent`, `lint-agent`.
  - Domain question (LCA/RothC/regenerative/CFP) → `sustainability-specialist`.
- **Skills** to invoke during work as relevant: `frontend-design` (new/reshaped UI),
  `verify` (drive the flow end-to-end), `code-review` (pre-handoff diff review).

Produce a short routing table: `layer → agent → why`.

---

## Phase 4 — Clarifying questions (do not skip)

**Goal**: resolve every ambiguity before designing.

1. From the card + findings, list underspecified aspects: edge cases, error/empty/loading
   states, 404/null semantics, affected consumers, scope boundaries, backward
   compatibility, i18n keys (pt + en), design preferences.
2. Present all questions in one organized list (use AskUserQuestion for decisions that
   change the approach).
3. **Wait for answers before designing.** If the user says "you decide", give a concrete
   recommendation and get explicit confirmation.

---

## Phase 5 — Plan (approval gate)

**Goal**: a plan the user signs off on.

1. Write the plan: problem restatement, chosen routing (Phase 3 table), file-by-file
   changes across affected repos, the CodeGraph findings that justify each change,
   test/verification strategy, and the definition of done (map to the card Checklist).
2. Present it and **ask for explicit approval.** Prefer EnterPlanMode/ExitPlanMode if the
   session is in plan mode.
3. **Do not touch product source until approved.**

---

## Phase 6 — Implementation (orchestrator-routed)

**DO NOT START WITHOUT USER APPROVAL.**

1. Dispatch to the chosen orchestrator(s) with the approved plan, the CodeGraph findings,
   and the specific files. Let the orchestrator fan out to layer sub-agents.
2. Enforce GAIA conventions in every change: contract-first, views never query / services
   never return QuerySets (api), documented patterns from `docs/agents/web/*.md` (web),
   EN in code / PT in UX.
3. Keep the card Checklist as the running definition of done; update todos as items land.

---

## Phase 7 — Verification

1. Run the task's own gate commands. Web: `bun lint` · `bun run build` (and any card-
   specific check, e.g. `bunx tsc --noEmit`). API: `test_runner.py` + `spectacular
   --validate --fail-on-warn`.
2. Confirm every card Checklist item is satisfied and named consumers still work.
3. For behavioral changes, invoke the `verify` skill to drive the flow, not just types.
4. Optionally run `code-review` / `i18n-key-validator` on the diff before handoff.

---

## Phase 8 — CodeGraph post-sync (both repos)

**Goal**: the shared graph reflects the shipped change.

```bash
.opencode/bin/codegraph-global-sync.sh
.opencode/bin/codegraph-global-sync.sh --status
```

Same warn+continue policy as Phase 0. This keeps the graph authoritative for the next
task (convention #1).

---

## Phase 9 — Summary

1. Mark all todos complete.
2. Report: what was built, routing/agents used, files changed per repo, verification
   results (real command output — say so if anything failed or was skipped), Checklist
   status, and suggested next steps. Do **not** commit unless the user authorizes it.
