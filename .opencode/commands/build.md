---
description: Build incrementally, one slice at a time, test-driven and routed through GAIA orchestrators. Approve the plan once, then it runs autonomously.
argument-hint: "[task slug or plan]"
---

Build one slice at a time.

1. Load skills: `implement` + `tdd` (red→green→refactor loop at pre-agreed seams). Use `prototype` when a design/state question needs a throwaway answer first, and `new-feature` when scaffolding a new gaia-web module.
2. Route implementation through GAIA orchestrators — never freelance:
   - API → `senior-backend` (fan out to model/service/selector/serializer/migration/test/lint agents).
   - Web → `senior-nextjs` (fan out to form/table/api-layer/design/i18n agents).
   - Contract change → `cross-stack` (OpenAPI → SDK regen → services).
3. Enforce GAIA conventions: contract-first, views never query / services never return QuerySets, EN code / PT UX, zero comments by default.
4. Commit each slice individually (only if authorized). Pause on failures or risky steps.
5. After source changes in gaia-api/ or gaia-web/, run `.opencode/bin/codegraph-global-sync.sh`.

One vertical slice at a time.
