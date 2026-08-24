---
description: Build incrementally, one slice at a time, test-driven and routed through GAIA orchestrators. Approve the plan once, then it runs autonomously.
argument-hint: "[task slug or plan]"
---

Build one slice at a time.

1. Dispatch map first: read the approved plan in this session and enumerate, in one block before any code, which orchestrators and layer sub-agents the task needs (API → `senior-backend`; Web → `senior-nextjs`; contract → `cross-stack`, plus the specific layer agents each will fan out to). If the plan is ambiguous about scope, ask once, then proceed.
2. Worker model check: run `opencode models`. For every `.opencode/agents/*.md` whose `model:` line is absent from that list, pick the listed Zen free model (zero cost) with the largest context window and rewrite those `model:` lines before dispatching. Report each swap in one line.
3. Load skills: `implement` + `tdd` (red→green→refactor loop at pre-agreed seams). Use `prototype` when a design/state question needs a throwaway answer first, and `new-feature` when scaffolding a new gaia-web module.
4. Route implementation through GAIA orchestrators — never freelance:
   - API → `senior-backend` (fan out to model/service/selector/serializer/migration/test/lint agents).
   - Web → `senior-nextjs` (fan out to form/table/api-layer/design/i18n agents).
   - Contract change → `cross-stack` (OpenAPI → SDK regen → services).
5. Enforce GAIA conventions: contract-first, views never query / services never return QuerySets, EN code / PT UX, zero comments by default.
6. Commit each slice individually (only if authorized). Pause on failures or risky steps.
7. After source changes in gaia-api/ or gaia-web/, run `.opencode/bin/codegraph-global-sync.sh`.

One vertical slice at a time.
