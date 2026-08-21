# GAIA — Sustainability Metrics Platform

Three repos: `gaia-api` (Django), `gaia-web` (Next.js), `GAIA` (orchestration).

## Agent Routing

All agents in `.opencode/agents/`. Full routing: `AGENTS.md`.

### Backend sub-agents (Django layers) — orchestrator: `senior-backend`

| Sub-Agent | File pattern | Use |
|-----------|-------------|-----|
| `model-agent` | `**/models.py` | Schema, soft-delete |
| `service-agent` | `**/services.py` | Business logic, LCA/RothC |
| `selector-agent` | `**/selectors.py` | Read-only queries |
| `serializer-agent` | `**/serializers.py` | schema_fields, validation |
| `migration-agent` | `**/migrations/**` | Safe migrations, seeds |
| `test-agent` | `tests/**` | Tests per app |
| `lint-agent` | — | Code style |

### Frontend sub-agents (Next.js layers) — orchestrator: `senior-nextjs`

| Sub-Agent | File pattern | Use |
|-----------|-------------|-----|
| `form-agent` | `**/schemas/*.ts`, `**/hooks/use-*.ts`, `src/components/form/` | RHF + Zod + next-intl forms |
| `table-agent` | `src/components/table/`, feature tables | TanStack Table |
| `api-layer-agent` | `src/services/**`, `src/client/**` | TanStack Query service layer |
| `design-agent` | `src/components/ui/`, `src/components/` | shadcn/ui + Tailwind UI/UX |
| `i18n-key-validator` | `messages/*.json` | Diff-scoped locale key check |

### Domain agents

| Agent | Use |
|-------|-----|
| `sustainability-specialist` | LCA, RothC, regenerative domain |
| `senior-backend` | Backend orchestrator (routes to Django sub-agents) |
| `senior-nextjs` | Frontend orchestrator (routes to Next.js sub-agents) |
| `cross-stack` | API↔Next.js contracts (OpenAPI) |
| `software-architecture` | Architecture audit |

## Critical Conventions

1. CodeGraph primary — `codegraph_context` before grep. Sync: `.opencode/bin/codegraph-global-sync.sh`
2. Contract-first — OpenAPI schema before frontend impl
3. PT (UX/domain), EN (code)
4. NEVER commit without authorization
5. Views never query, services never return QuerySets
6. After API/Web source changes, run `.opencode/bin/codegraph-global-sync.sh` before the final response; the agent owns reindexing, not the developer
7. Zero comments by default — only a WHY the code can't carry (complex algorithm, deliberate deviation, hidden invariant), 1–2 lines, EN. Detail: `docs/agents/web/code-standards.md` §4

## Knowledge

- Vault: `docs/vault/00-INDEX.md`
- Frontend playbook: `docs/agents/web/README.md` (principles, architecture, standards)
- References: `docs/references/README.md`
- Skills: `.agents/skills/`
- SDD commands: `/feature-plan`, `/feature-implement`, `/feature-validate`

## Test Commands

**API:** `source venv/bin/activate && python test_runner.py --settings=test_settings --keepdb`
**Web:** `bun lint` · `bun run build`
**Lint:** `pre-commit run --all-files`
**Schema:** `python manage.py spectacular --validate --fail-on-warn`
