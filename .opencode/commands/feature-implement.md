---
description: Implement GAIA tasks from docs/tasks using the correct API or Next.js owner and contract-first workflow.
argument-hint: "[task slug or spec path]"
---

Implement the feature task following GAIA workflow:

1. Read the task spec from `docs/tasks/{api,web,shared}/`
2. API tasks: use `senior-backend` agent (routes to sub-agents by layer)
3. Web tasks: use `senior-nextjs`
4. Follow `docs/workflow/CROSS_STACK_PR.md`: OpenAPI schema before SDK and Web implementation
5. Run checks after each layer: `python test_runner.py --settings=test_settings --keepdb` (API) or `bun lint && bun run build` (Web)
6. Update `CHANGELOG.md` on completion

Cross-stack features: implement API and schema first, regenerate `gaia-web/src/client/` with `bunx @hey-api/openapi-ts`, then implement Web through `src/services/`. Use `cross-stack` for contract review.
