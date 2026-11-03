# GAIA Agent Graph

Docs language: English

## Stack

- **gaia-api**: Python 3.11, Django 5.2 + Django REST Framework, PostgreSQL
- **gaia-web**: TypeScript, Next.js 16 + React 19, bun

## Build approach

<TBD, set by /scope>

## Code repos

- [gaia-api/](gaia-api/AGENTS.md): Django DRF backend, the sustainability metrics engine (LCA, RothC, CFP, regenerative, biodiversity) and the OpenAPI contract
- [gaia-web/](gaia-web/AGENTS.md): Next.js frontend, consumes the API through the hey-api SDK generated into `src/client/`
- Connections: gaia-web calls gaia-api over REST with JWT Bearer auth; drf-spectacular serves `/api/schema/`, and `@hey-api/openapi-ts` generates the web SDK from it

## Ecosystem

| Repository | Technology | Responsibility |
|---|---|---|
| `GAIA` | Orchestration only | Tasks, workflow, cross-stack handoff, agents, vault |
| `gaia-api` | Django DRF + PostgreSQL | Backend, sustainability metrics engine, OpenAPI contract |
| `gaia-web` | Next.js + React + TypeScript | Frontend, generated SDK, shadcn/ui, TanStack Query |

## Authority

- `.claude/skills/` (the ia-lab standard workflow skills) owns how work moves from meeting to shipped code; each code repo's stack skill owns its layer rules.
- `docs/vault/` owns GAIA domain knowledge and system decisions.
- `docs/tasks/` owns scope and acceptance criteria.
- OpenAPI and the generated TypeScript SDK own the executable cross-stack contract.
- Code and tests in each child repository own implemented behavior.

## Routing

```
Feature, bug, or "what is next"?
  └── /start  (reads docs/ status and proposes the next skill:
       /discovery → /design → /architect → /develop → /check → /test → /document → /sync;
       a bug goes to /debug)

Plane card?
  └── /plane-develop-task (feature) · /plane-fix-task (bug)

Domain or sustainability methodology?
  └── .opencode/agents/sustainability-specialist.md  (moves to docs/domain/ via /sync route)

API work?  (Backend — Django)
  ├── gaia-api/AGENTS.md
  └── gaia-api/.agents/skills/gaia-django/  (rules per layer: model, service,
       selector, serializer, migration, test, lint)

Web or Next.js work?  (Frontend — Next.js)
  ├── gaia-web/AGENTS.md
  ├── gaia-web/.agents/skills/gaia-nextjs/  (rules per layer: form, table,
  │    api-layer, design, i18n key check, new module, performance)
  ├── gaia-web/.agents/skills/shadcn/
  └── docs/agents/web/  (playbook: principles, architecture, standards)

Cross-stack contract?
  ├── the API surface in docs/features/<slug>/specs/ (/architect)
  └── docs/workflow/CROSS_STACK_PR.md

Design in Penpot (screens, components, tokens)?
  ├── /design + /penpot
  ├── .agents/skills/penpot-design/ (GAIA procedure + scripts/helpers.js)
  └── docs/agents/design/ (reference: tokens, components, screens)

Repository knowledge?
  ├── docs/vault/00-INDEX.md
  └── docs/references/README.md
```

## Agent Tree

```
.claude/skills/                   workflow skills (ia-lab standard) + links to .agents/skills/
.agents/skills/                   project tools: plane-*, penpot-design, xlsx,
                                  business-product-strategist, resolving-merge-conflicts, wizard
.opencode/agents/                 sustainability-specialist (until /sync route)
.claude/agents/                   its wrapper, plus scout and researcher

gaia-api/.agents/skills/gaia-django/   Django stack skill
gaia-web/.agents/skills/gaia-nextjs/   Next.js stack skill
gaia-web/.agents/skills/shadcn/        shadcn/ui skill

.cursor/rules/gaia-agents.mdc     Cursor project routing
.github/copilot-instructions.md   Copilot project routing
```

## Model Dispatch (opencode)

Agents carry no `model:`; they inherit the session model. When the user asks for "with subagents" or the task spans 3+ independent domains, follow [docs/agents/model-dispatch.md](docs/agents/model-dispatch.md) before any `task` call.

## Principles

1. **Minimal scope**: one PR, one feature.
2. **Contract-first**: OpenAPI before SDK generation and Web implementation.
3. **Language**: PT for UX/domain, EN for code.
4. **Secrets**: local env files only; never commit credentials.
5. **CodeGraph-first for source code**: use graph tools for symbols and call flow; use `/vault-search`, Read or Grep for Markdown.
6. **Vault maintained**: update only when a new relationship, decision or domain rule is discovered.
7. **No commits without explicit authorization**.
8. **Branching**: follow `docs/workflow/BRANCHING.md`; application work starts from `develop`.
9. **No rebase on shared branches**: never rebase `develop`, `homolog`, `main` or another published branch.
10. **No cross-product business logic**: external repos may inspire structure, never GAIA formulas or contracts.
11. **Self-documenting code**: zero comments by default — names and types carry the meaning. A comment only earns its place for a WHY the code cannot carry (complex algorithm, deliberate deviation, hidden invariant), max 1–2 lines, in EN. Tickets and agent names stay out of production comments and symbols. Web detail: `docs/agents/web/code-standards.md` §4.

## Key Conventions

- API schema: drf-spectacular, explicit schema for every 2xx response.
- SDK: `@hey-api/openapi-ts` generates `gaia-web/src/client/`; never edit generated files.
- Web access: features consume generated functions through `src/services/`, never directly from `src/client/`.
- Null: absent or uncomputed values remain null and render as a placeholder, never synthetic zero.
- Django: Views → Services → Selectors → Models.
- Django layering: views never query the ORM; services never return QuerySets (selectors do).
- Next.js: app → features → services → generated client.
- Soft-delete: use the implemented cancellation fields; do not invent hard DELETE behavior.

## Tools

| Tool | Usage |
|---|---|
| CodeGraph API | Per-repo index at `<GAIA_ROOT>/gaia-api` |
| CodeGraph Web | Per-repo index at `<GAIA_ROOT>/gaia-web` |
| Vault search | `/vault-search <term>` or text search under `docs/vault/` |
| DB read-only MCP | `.opencode/bin/postgres-mcp-readonly.sh` |
| Structural validation | `python3 .opencode/bin/validate-structure.py` |

## Test And Lint Commands

### Orchestrator

```bash
python3 .opencode/bin/validate-structure.py
bash -n .opencode/bin/*.sh
```

### gaia-api

```bash
source venv/bin/activate
python test_runner.py --settings=test_settings --keepdb
python manage.py spectacular --validate --fail-on-warn
pre-commit run --all-files
```

### gaia-web

```bash
bun lint
bun run build
```

## Cross-Stack Workflow

Use `docs/workflow/CROSS_STACK_PR.md` whenever a feature spans API and Web.
Markdown records intent and acceptance criteria; OpenAPI and the generated SDK
remain the executable contract. Do not copy competing contract documents into
the child repositories.

## Agent skills

MCP servers: codegraph-gaia-api (gaia-api/, connected), codegraph-gaia-web (gaia-web/, connected), plane (connected), postgres-readonly (connected)

## Context files

- [gaia-api/AGENTS.md](gaia-api/AGENTS.md): Django backend stack, commands, layer conventions, test gotchas
- [gaia-web/AGENTS.md](gaia-web/AGENTS.md): Next.js frontend commands and repo local constraints
