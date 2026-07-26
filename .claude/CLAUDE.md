# GAIA — Sustainability Metrics Platform

Three repos: `gaia-api` (Django), `gaia-web` (Next.js), `GAIA` (orchestration).

## Agent Routing

All agents in `.opencode/agents/`. Full routing: `AGENTS.md`.

### Backend sub-agents (Django layers)

| Sub-Agent | File pattern | Use |
|-----------|-------------|-----|
| `model-agent` | `**/models.py` | Schema, soft-delete |
| `service-agent` | `**/services.py` | Business logic, LCA/RothC |
| `selector-agent` | `**/selectors.py` | Read-only queries |
| `serializer-agent` | `**/serializers.py` | schema_fields, validation |
| `migration-agent` | `**/migrations/**` | Safe migrations, seeds |
| `test-agent` | `tests/**` | Tests per app |
| `lint-agent` | — | Code style |

### Domain agents

| Agent | Use |
|-------|-----|
| `sustainability-specialist` | LCA, RothC, regenerative domain |
| `senior-backend` | Backend orchestrator (routes to sub-agents) |
| `senior-nextjs` | Next.js frontend |
| `cross-stack` | API↔Next.js contracts (OpenAPI) |
| `software-architecture` | Architecture audit |

## Critical Conventions

1. CodeGraph primary — `codegraph_context` before grep. Sync: `.opencode/bin/codegraph-global-sync.sh`
2. Contract-first — OpenAPI schema before frontend impl
3. PT (UX/domain), EN (code)
4. NEVER commit without authorization
5. Views never query, services never return QuerySets

## Knowledge

- Vault: `docs/vault/00-INDEX.md`
- References: `docs/references/README.md`
- Skills: `.agents/skills/`
- SDD commands: `/feature-plan`, `/feature-implement`, `/feature-validate`

## Test Commands

**API:** `source venv/bin/activate && python test_runner.py --settings=test_settings --keepdb`
**Web:** `bun lint` · `bun run build`
**Lint:** `pre-commit run --all-files`
**Schema:** `python manage.py spectacular --validate --fail-on-warn`
