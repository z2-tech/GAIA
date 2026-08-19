---
name: gaia-feature-dev
description: >-
  GAIA feature/fix workflow, thin orchestrator. Use when the user points at a
  docs/tasks/**/*.md card (e.g. FE-11) or describes a feature/fix. Chains the
  GAIA lifecycle — spec → plan → approval → build → test → review → ship — by
  delegating each phase to its owning command/skill, and routes implementation
  through the senior-nextjs / senior-backend orchestrators. Always syncs the
  shared CodeGraph of BOTH gaia-api and gaia-web before and after, even for
  frontend-only tasks. Triggers: "feature-dev", "implement this task card",
  "trabalhar nessa task", "/gaia-feature-dev".
---

# GAIA Feature Development (thin orchestrator)

You are the conductor. Do NOT re-describe the lifecycle phases here — delegate each
to its owning command/skill and keep only the GAIA-specific glue.

## Non-negotiables (GAIA)

- **CodeGraph first** (convention #1): sync + query both repos before AND after, even frontend-only.
- **Plan before code**: never edit product source before the user approves the plan.
- **Route, don't freelance**: implementation goes through `senior-nextjs` / `senior-backend`.
- **NEVER commit without authorization**.
- **PT for UX/domain, EN for code**.

## Flow

1. **CodeGraph pre-sync**: `.opencode/bin/codegraph-global-sync.sh` + `--status`.
   Warn + continue (grep/Read fallback) if it fails; record it in TodoWrite.
2. **Discovery**: read the card / restate the request. Summarize in one paragraph and confirm.
3. **Spec** — delegate to the `spec` command (activate `to-spec` + `grilling`):
   resolve edge cases, 404/null semantics, i18n pt+en, error/empty/loading states.
4. **Plan** — delegate to the `plan` command (activate `to-tickets` + `tdd` seams):
   vertical slices, dependency-ordered; map `layer → agent → why` per `AGENTS.md`.
5. **Approval gate**: present the plan; WAIT for explicit approval.
6. **Build** — delegate to the `build` command (activate `implement` + `tdd`),
   routed through the chosen orchestrator(s) and their layer sub-agents.
7. **Test** — delegate to the `test` command; run the task's gate commands.
8. **Review** — delegate to the `review` command (activate `code-review` +
   `i18n-key-validator`) before handoff.
9. **CodeGraph post-sync**: `.opencode/bin/codegraph-global-sync.sh` + `--status`.
10. **Summary**: what shipped, agents used, files per repo, verification output,
    checklist status, next steps. Do NOT commit unless the user authorizes it.

Use TodoWrite to track phases 1–10.
