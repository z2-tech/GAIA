# GAIA — Sustainability Metrics Platform

Three repos: `gaia-api` (Django), `gaia-web` (Next.js), `GAIA` (orchestration).

## Agents

All agents in `.opencode/agents/`. See `AGENTS.md` for routing.

## Knowledge

- Vault: `docs/vault/00-INDEX.md`
- References: `docs/references/README.md`
- Skills: `.agents/skills/` (codegraph, ui-ux-pro-max, business-product-strategist, xlsx)

## Critical Conventions

1. CodeGraph first — `codegraph_context` before grep/glob
2. Contract-first — OpenAPI schema before frontend (auto-gen via @hey-api/openapi-ts)
3. PT (UX/domain), EN (code)
4. NEVER commit without authorization
5. After API/Web source changes, run `.opencode/bin/codegraph-global-sync.sh` before the final response; the agent owns reindexing, not the developer

## Test Commands

**gaia-api:** `python test_runner.py --settings=test_settings --keepdb`
**gaia-web:** `bun lint` · `bun run build`
**Lint:** `pre-commit run --all-files`
