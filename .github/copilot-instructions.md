# GAIA — Sustainability Metrics Platform

Three repos: `gaia-api` (Django), `gaia-web` (Next.js), `GAIA` (orchestration).

## Agents

Workflow skills in `.claude/skills/` (`/start` proposes the next one); Django and Next.js rules in the `gaia-django` and `gaia-nextjs` skills under each code repo's `.agents/skills/`. See `AGENTS.md` for routing.

## Knowledge

- Domain, product, sources: `docs/domain/`, `docs/product/`, `docs/sources/`
- References: `docs/references/README.md`
- Skills: `.claude/skills/` (workflow) and `.agents/skills/` (plane-*, penpot-design, xlsx, business-product-strategist, resolving-merge-conflicts, wizard)

## Critical Conventions

1. CodeGraph first — `codegraph_context` before grep/glob
2. Contract-first — OpenAPI schema before frontend (auto-gen via @hey-api/openapi-ts)
3. PT (UX/domain), EN (code)
4. NEVER commit without authorization

## Test Commands

**gaia-api:** `python test_runner.py --settings=test_settings --keepdb`
**gaia-web:** `bun lint` · `bun run build`
**Lint:** `pre-commit run --all-files`
