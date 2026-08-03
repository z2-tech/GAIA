# GAIA Agent Graph

## Ecosystem

| Repository | Technology | Responsibility |
|---|---|---|
| `GAIA` | Orchestration only | Tasks, workflow, cross-stack handoff, agents, vault |
| `gaia-api` | Django DRF + PostgreSQL | Backend, sustainability metrics engine, OpenAPI contract |
| `gaia-web` | Next.js + React + TypeScript | Frontend, generated SDK, shadcn/ui, TanStack Query |

## Authority

- `.opencode/agents/` is the single source of agent behavior and invocation.
- `docs/vault/` owns GAIA domain knowledge and system decisions.
- `docs/tasks/` owns scope and acceptance criteria.
- OpenAPI and the generated TypeScript SDK own the executable cross-stack contract.
- Code and tests in each child repository own implemented behavior.

## Routing

```
Domain or sustainability methodology?
  └── .opencode/agents/sustainability-specialist.md

API work?  (Backend — Django)
  ├── .opencode/agents/senior-backend.md   (orchestrator)
  └── Django layer sub-agents:
       ├── model-agent.md
       ├── service-agent.md
       ├── selector-agent.md
       ├── serializer-agent.md
       ├── migration-agent.md
       ├── test-agent.md
       └── lint-agent.md

Web or Next.js work?  (Frontend — Next.js)
  ├── .opencode/agents/senior-nextjs.md    (orchestrator)
  ├── Next.js layer sub-agents:
  │    ├── form-agent.md        (RHF + Zod forms)
  │    ├── table-agent.md       (TanStack Table)
  │    ├── api-layer-agent.md   (TanStack Query service layer)
  │    ├── design-agent.md      (shadcn/ui + Tailwind UI/UX)
  │    └── i18n-key-validator.md (locale key check)
  └── docs/agents/web/  (playbook: principles, architecture, standards)

Cross-stack contract?
  ├── .opencode/agents/cross-stack.md
  └── docs/workflow/CROSS_STACK_PR.md

Architecture review?
  └── .opencode/agents/software-architecture.md

Repository knowledge?
  ├── docs/vault/00-INDEX.md
  ├── docs/references/README.md
  └── docs/workflow/CODE_GRAPH_SYNC.md
```

## Agent Tree

```
.opencode/agents/                 17 canonical agents
├── shared/
│   ├── sustainability-specialist.md
│   ├── cross-stack.md
│   └── software-architecture.md
├── backend/  (Django)
│   ├── senior-backend.md         (orchestrator)
│   ├── model-agent.md
│   ├── service-agent.md
│   ├── selector-agent.md
│   ├── serializer-agent.md
│   ├── migration-agent.md
│   ├── test-agent.md
│   └── lint-agent.md
└── frontend/  (Next.js)
    ├── senior-nextjs.md          (orchestrator)
    ├── form-agent.md
    ├── table-agent.md
    ├── api-layer-agent.md
    ├── design-agent.md
    └── i18n-key-validator.md

(files live flat in .opencode/agents/; grouping above is logical, by domain)

.claude/agents/                   17 wrappers to .opencode/agents/
.cursor/rules/gaia-agents.mdc     Cursor project routing
.github/copilot-instructions.md   Copilot project routing
.agents/skills/                   Project skills
```

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
11. **Self-documenting code**: tickets and agent names stay out of production comments and symbols.

## Key Conventions

- API schema: drf-spectacular, explicit schema for every 2xx response.
- SDK: `@hey-api/openapi-ts` generates `gaia-web/src/client/`; never edit generated files.
- Web access: features consume generated functions through `src/services/`, never directly from `src/client/`.
- Null: absent or uncomputed values remain null and render as a placeholder, never synthetic zero.
- Django: Views → Services → Selectors → Models.
- Next.js: app → features → services → generated client.
- Soft-delete: use the implemented cancellation fields; do not invent hard DELETE behavior.

## Tools

| Tool | Usage |
|---|---|
| CodeGraph API | Per-repo index at `<GAIA_ROOT>/gaia-api` |
| CodeGraph Web | Per-repo index at `<GAIA_ROOT>/gaia-web` |
| CodeGraph shadow | Cross-repo source graph at `/tmp/opencode/shadow-codegraph-gaia` |
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
