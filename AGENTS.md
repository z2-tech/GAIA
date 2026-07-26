# GAIA Agent Graph

## Ecosystem

| Repository | Technology | Responsibility |
|---|---|---|
| `GAIA` (this repo) | — | Orchestration, tasks, cross-stack docs, workflow, knowledge vault |
| `gaia-api` | Django DRF + PostgreSQL | Backend, sustainability metrics engine, contracts |
| `gaia-web` | Next.js + React + TypeScript | Frontend, shadcn/ui, TanStack Query |

## Routing

```
Domain/business logic?
  └── docs/agents/shared/sustainability-specialist.md

API work?
  ├── gaia-api/AGENTS.md
  ├── .opencode/agents/senior-backend.md            ← orchestrator (routes to sub-agents)
  └── Sub-agents (Django layers):
       ├── .opencode/agents/model-agent.md           ← schema, soft-delete
       ├── .opencode/agents/service-agent.md         ← business logic, LCA/RothC
       ├── .opencode/agents/selector-agent.md        ← read-only queries
       ├── .opencode/agents/serializer-agent.md      ← schema_fields, validation
       ├── .opencode/agents/migration-agent.md       ← safe migrations, seeds
       ├── .opencode/agents/test-agent.md            ← tests per app
       └── .opencode/agents/lint-agent.md            ← code style

Web/Next.js work?
 ├── docs/agents/web/senior-nextjs.md               ← canonical Next.js code owner
 ├── docs/agents/web/skills/                        ← STYLE_GUIDE, INTEGRATION_GUIDE
 └── .agents/skills/shadcn-ui-components/           ← shadcn/ui component rules

Cross-stack change (API + Next.js)?
  ├── docs/agents/shared/cross-stack.md
  ├── gaia-api/AGENTS.md
  └── docs/agents/web/senior-nextjs.md

Architectural review / code-quality audit?
  └── docs/agents/shared/software-architecture.md

Exploring the ecosystem (vault, CodeGraph, docs)?
  ├── docs/vault/00-INDEX.md
  ├── docs/workflow/CODE_GRAPH_SYNC.md
  └── .opencode/bin/codegraph-global-sync.sh
```

## Agent Tree

```
GAIA/AGENTS.md
│
├── docs/agents/shared/
│   ├── overview.md
│   ├── cross-stack.md                       ← API-Next.js contracts
│   ├── sustainability-specialist.md         ← domain: LCA, RothC, regenerative
│   └── software-architecture.md
│
├── docs/agents/api/
│   ├── senior-backend.md                    ← Django backend orchestrator
│   └── skills/
│       ├── model-agent.md
│       ├── service-agent.md
│       ├── selector-agent.md
│       ├── serializer-agent.md
│       ├── migration-agent.md
│       ├── test-agent.md
│       └── lint-agent.md
│
├── docs/agents/web/
│   ├── senior-nextjs.md                     ← Next.js frontend code owner
│   ├── DART_RULES.md                        ← (não aplicável — adaptar para TS rules)
│   └── skills/
│
├── docs/vault/
│   ├── 00-INDEX.md
│   ├── systems/
│   │   ├── Backend-API.md
│   │   ├── Frontend-App.md
│   │   └── Orchestrator-GAIA.md
│   ├── concepts/
│   ├── flows/
│   ├── decisions/
│   └── templates/
│
├── docs/references/
│   ├── README.md
│   ├── architecture/
│   ├── domain/
│   ├── ux/ auth/ planning/ meetings/
│   └── _stale/
│
├── .opencode/agents/            ← ★ Single source of truth (11 agentes)
├── .claude/agents/              ← Claude wrappers → .opencode/agents/
├── .cursor/rules/               ← Cursor rules → .opencode/agents/
├── .github/copilot-instructions.md
│
├── .agents/skills/              ← Global skills
└── .opencode/bin/               ← MCP + sync scripts
```

## Principles

1. **Minimal scope** — one PR, one feature
2. **Contract-first** — OpenAPI schema before frontend impl (auto-gen via @hey-api/openapi-ts)
3. **Language** — PT for UX/domain, EN for code
4. **Secrets** — never commit credentials; env vars only
5. **CodeGraph-first** — `codegraph_context` before grep/glob
6. **Vault maintained** — update `docs/vault/` on new system relationships
7. **NEVER commit without explicit authorization**
8. **Branching** — `develop → homolog → master`
9. **Rebase forbidden on shared branches**

## Key Conventions (2026-Q3)

- **API→Frontend contract**: OpenAPI 3.x schema (drf-spectacular) → `@hey-api/openapi-ts` auto-generates TypeScript SDK
- **Null convention**: API `null` → frontend displays appropriate placeholder, never zero for uncomputed values
- **App architecture (Django)**: Views → Services → Selectors → Models (HackSoftware Styleguide)
- **Frontend architecture (Next.js)**: app/ → features/ → services/ → client/ (3-layer rule)
- **Soft-delete**: `canceled_at`/`canceled_by`, never `DELETE`

## Tools & Access

| Tool | Usage |
|---|---|
| CodeGraph (shadow) | `codegraph_context(projectPath="/tmp/opencode/shadow-codegraph-gaia", ...)` |
| CodeGraph (gaia-api) | `codegraph_context(projectPath="/home/fefo/GAIA/gaia-api", ...)` |
| CodeGraph (gaia-web) | `codegraph_context(projectPath="/home/fefo/GAIA/gaia-web", ...)` |
| DB read-only MCP | `.opencode/bin/postgres-mcp-readonly.sh` |
| Vault | `docs/vault/00-INDEX.md` |
| References | `docs/references/README.md` |
| Skills | `.agents/skills/` — codegraph, ui-ux-pro-max, business-product-strategist, shadcn-ui-components |

## Test & Lint Commands

### gaia-api
```bash
source venv/bin/activate && python test_runner.py --settings=test_settings --keepdb
pre-commit run --all-files
python manage.py spectacular --validate --fail-on-warn
```

### gaia-web
```bash
bun lint
bun run build   # typecheck implícito
```
