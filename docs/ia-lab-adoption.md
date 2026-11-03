# ia-lab adoption

GAIA is the first project to adopt the ia-lab standard: one folder layout, the documents each stage of the work leaves behind, and the skills that write them (from a recorded meeting to shipped, tested code). This file records what changed, what was decided, and what is still open, so the team can review it before the merge.

- **Standard:** `~/Dev/ia-lab` (README, section "Getting started", lists the 5 steps for an existing project).
- **Decisions behind it:** ia-lab commit `15ee5a3`, file `improvements/existing-project-setup.md` (read it with `git -C ~/Dev/ia-lab show 15ee5a3:improvements/existing-project-setup.md`).
- **Pilot checks:** `~/Dev/ia-lab/testing/existing-project.md` and `testing/repo-of-repos.md`.
- **Branch:** `feature/ia-lab` in all three repos (GAIA, gaia-api, gaia-web). Nothing is committed yet.
- **Last update:** 2026-10-20.

## Progress

| Step | What it means | Status |
|---|---|---|
| 1. Shape | One project repo (GAIA) with the code repos cloned inside and listed in `.gitignore` | Done |
| 2. Skills | Install the standard skills, remove the old ones with a counterpart, move stack knowledge into its code repo, adapt the kept ones | Done |
| 3. `/audit` | `AGENTS.md` per repo, a CodeGraph index per code repo, Ponytail plugin declared | Done |
| 4. `/scope` | Enroll the features that already exist in `docs/scope.md` | Not started |
| 5. `/sync route` | Move the vault and other docs folders into the standard layout | Not started |

## What changed, per repo

### GAIA (project repo)

- **Standard skills installed** in `.claude/skills/`: `start`, `transcribe`, `discovery`, `design`, `penpot`, `scope`, `audit`, `architect`, `develop`, `check`, `test`, `document`, `sync`, `debug`. They are copies of `ia-lab/skills/`; change them in ia-lab first, then copy.
- **Code index:** one CodeGraph server per code repo (`codegraph-gaia-api`, `codegraph-gaia-web`) in `.mcp.json`, `opencode.json`, and the Claude Code permissions. The old setup is gone: the committed root `.codegraph/`, the sync script and its command, and the shadow copy.
- **Hooks:** the gaia-web hooks (`block-generated`, `biome-fix`, `typecheck`) run from `.claude/settings.json`, scoped to `gaia-web/**`. Their scripts stay in `gaia-web/.claude/hooks/`.
- **Context files:** root `AGENTS.md` now has `## Code repos`, the new routing, and a short pointer to [docs/agents/model-dispatch.md](agents/model-dispatch.md) (the opencode dispatch protocol, moved out of `AGENTS.md` and translated to English).
- **Old skills, agents, and commands removed** (list under Decisions).
- **One copy per skill:** project tools live once in `.agents/skills/`; `.claude/skills/` links to them. The `.opencode/skills/` folder (a third copy) is gone, since opencode also reads `.agents/skills/` and `.claude/skills/`.
- **References updated:** `.agents/README.md`, `.cursor/rules/gaia-agents.mdc`, `.github/copilot-instructions.md`, `README.md`, `docs/agents/design/README.md`, `docs/agents/web/README.md`.

### gaia-api (code repo)

Prepared in an earlier session; this round had nothing to change there, because none of the removed skills was about Django (the old backend agents had already become the `gaia-django` skill).

- `AGENTS.md` (stack, commands, conventions, gotchas from a full scan) and its `CLAUDE.md` pointer.
- Stack skill `gaia-django` in `.agents/skills/gaia-django/` (rules per layer: model, service, selector, serializer, migration, test, lint), linked from `.claude/skills/`.
- `.gitignore`: `.codegraph/` added, and `CLAUDE.md` is no longer ignored (it is now a pointer file meant to be committed).
- Not yet: `test-preferences.json` (written by `/test` the first time it runs there).

### gaia-web (code repo)

- `AGENTS.md` translated to English; `lint:next` added to its commands; `CLAUDE.md` pointer.
- Stack skill `gaia-nextjs` in `.agents/skills/gaia-nextjs/`, now with two more references: `new-feature.md` (from the old `new-feature` skill) and `webperf.md` (from the old opencode command).
- `shadcn` skill moved here (`.agents/skills/shadcn/`) with its `skills-lock.json`.
- `.codegraph/.gitignore` untracked (staged removal), since the index is per machine.

## Decisions

Each item was asked on its own. "Counterpart" is the standard skill that does the same job.

### Removed

| Item | Counterpart |
|---|---|
| `grill-me`, `grill-with-docs`, `grilling`, `to-questionnaire`, `loop-me` | `/discovery`, `/architect` |
| `to-spec`, `to-tickets`, opencode `spec`, `plan`, `feature-plan` | `/architect` (spec and build plan) |
| `implement`, `gaia-feature-dev`, opencode `build`, `feature-implement` | `/develop` |
| `code-review`, agent `software-architecture`, opencode `review`, `code-simplify` | `/check review` (and built in `/simplify`) |
| opencode `feature-validate`, `test`, skill `tdd` | `/check verify`, `/test` |
| opencode `ship` | `/check review` + `/document` |
| `wayfinder` | `/start` |
| `codegraph` skill | Shared rules in every standard skill, plus the MCP server instructions |
| `domain-modeling` | `docs/domain/` and `docs/product/` (`/discovery`), decisions in specs (`/architect`) |
| agent `cross-stack` | API surface in the spec (`/architect`), API gap check in `/develop` |
| agent `penpot-designer` | `/design` + `/penpot` |
| `ui-ux-pro-max` | Duplicate of `gaia-nextjs/references/design.md` |
| `handoff`, `claude-handoff` | State lives in `docs/` files |
| `research`, `prototype`, `triage`, `improve-codebase-architecture`, `codebase-design` | `researcher` agent, Penpot first design, Plane, `/check review` |
| `teach`, `wait-what`, `writing-beats` | Personal aids, not project knowledge (can live in `~/.claude/skills/`) |
| `setup-matt-pocock-skills`, `setup-ts-deep-modules`, `setup-pre-commit`, `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises` | One time setups already done, or not related to GAIA |

### Moved

| Item | Where |
|---|---|
| `shadcn` | `gaia-web/.agents/skills/shadcn/` |
| `new-feature` | `gaia-web/.agents/skills/gaia-nextjs/references/new-feature.md` |
| opencode `webperf` | `gaia-web/.agents/skills/gaia-nextjs/references/webperf.md` |
| agent `sustainability-specialist` | `docs/domain/` and `docs/sources/` during `/sync route`; deleted only after its content is there |
| opencode `vault-search` | Deleted at the end of `/sync route docs/vault` |

### Kept

| Item | Why |
|---|---|
| `plane-task`, `plane-doc`, `plane-doc-to-tasks` | Plane is the tracker; the standard has no tracker skill |
| `plane-develop-task`, `plane-fix-task` | Now hand the card to `/architect` / `/develop` and to `/debug` |
| `penpot-design` | GAIA scripts still in use for the closing (fechamento) screens; decide after `/penpot setup` |
| `xlsx` | Reads the methodology spreadsheets |
| `business-product-strategist` | Product and UX critique, which `/design` does not do |
| `resolving-merge-conflicts`, `wizard` | General aids with no counterpart |

## Open

- [x] Adapt the kept project tools (`plane-*`, `xlsx`) to the standard (2026-10-20): shared rules block, current Plane MCP tool names, real labels (`Backend`, `Frontend`, `Produto`) and states, `docs/features/` and `docs/sources/` instead of `docs/tasks/` and the vault. `plane-doc-to-tasks` now reads the spec's build plan and writes each card id back on its task line.
- [ ] `docs/agents/issue-tracker.md` still maps triage roles to states that do not exist in Plane (`Todo`, `Cancelled`); fix or drop it during `/sync route docs/agents`.
- [ ] `penpot-design` has two different copies (`.claude/skills/penpot-design` is a real folder; `.agents/skills/penpot-design` has the scripts). Keep one after `/penpot setup`.
- [ ] `/scope` with no argument: enroll what exists, built features marked `done` with their code path, and record the build approach.
- [ ] `/sync route` for each folder outside the layout: `docs/vault/` (then delete it and `vault-search`), `docs/tasks/`, `docs/plans/`, `docs/references/`, `docs/workflow/`, `docs/agents/`, `TODO/`, and the root `CONTEXT.md`.
- [ ] Move `sustainability-specialist` into `docs/domain/` during the route, then delete the agent.
- [ ] Add the `## Git` block to root `AGENTS.md` (branch prefix, `base: develop` for gaia-api and gaia-web, `main` for GAIA).
- [ ] `.opencode/bin/validate-structure.py` flags the identical `LICENSE` files of the standard skills and `.claude/CLAUDE.md` = `.opencode/CLAUDE.md`; allow or fix those.
- [ ] Tell the team before the merge, then commit in each repo on `feature/ia-lab`.
- [ ] Run the pilot checks in `ia-lab/testing/` and report the results back to ia-lab.

## How to review

Each repo has its own diff on `feature/ia-lab`:

```bash
git status                      # GAIA
git -C gaia-api status
git -C gaia-web status
```

When committing GAIA, stage the `.claude/skills/plane-*` folders too: until then git still lists the old copies, and the structure check reports them as duplicates.
