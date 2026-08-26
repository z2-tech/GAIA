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

## Model Dispatch — Free Dispatcher (dinâmico, obrigatório em build)

Plan → build é orquestrado pelo **model que o usuário escolhe na sessão** (opencode → escolho model, planejo). Nada hardcoda model. No `build`, o primary DEVE buscar base de agents + ranking free antes de qualquer `task`.

```bash
# 1. Descoberta — identificar agents disponíveis
cat .opencode/agents/*.md | grep -E "^name:|^description:|^model:"
# ou dinâmico:
.opencode/bin/free-dispatcher.sh        # lista agents + ranking free + audit
.opencode/bin/free-dispatcher.sh --json # machine-readable

# 2. Ranking free dinâmico — maior ctx, custo zero
opencode models opencode --verbose  # filtra cost.input==0, ordena por context
```

| Layer | Model | Rule |
|---|---|---|
| Session / plan / orchestrators (`senior-backend`, `senior-nextjs`) | **user's pick** | Sem `model:` no frontmatter — herda model da sessão |
| Worker sub-agents | **pinned free dinâmico** (atualmente `opencode/muse-spark-1.2-contributor-free`) | `model:` explícito no frontmatter; valor é o free top do ranking acima (ctx máx, `cost.input==0`, `toolcall==true`). Não é escolha permanente |
| Self-heal em `build` / `feature-implement` | **largest-context free Zen** | Step 2 do dispatcher: compara pins contra `opencode models`; pins defasados são reescritos para `BEST_FREE` via `.opencode/bin/free-dispatcher.sh --fix` antes de qualquer dispatch — deixa diff revisável |

**Ranking atual (gerado dinamicamente, `cost.input==0`):**

| # | model | ctx | out | attach | toolcall |
|---|---|---|---|---|---|
| 1 | `opencode/muse-spark-1.2-contributor-free` | 1.048.576 | 131.072 | yes | yes | **BEST — default** |
| 2 | `opencode/nemotron-3-ultra-free` | 1.000.000 | 128.000 | no | yes | fallback |
| 3 | `opencode/nemotron-3.5-lightning-free` | 262.144 | 262.144 | no | yes |
| 4 | `opencode/mimo-v2.5-free` | 200.000 | 32.000 | yes | yes |
| 5 | `opencode/big-pickle` | 200.000 | 32.000 | no | yes |
| 6 | `opencode/hy3-free` | 190.000 | 64.000 | no | yes |

> Nota: `task` não expõe `model` por chamada — o model vem do `model:` do arquivo do agent. Trocar free↔pago exige editar `.opencode/agents/<name>.md` (o `--fix` faz isso). Opencode mergeia agents após plugins, então plugin não re-aponta; o heal em build mantém frontmatter como source of truth.

**Protocolo build (copiar):**

1. **Descoberta:** `.opencode/bin/free-dispatcher.sh` → lista agents + `BEST_FREE`
2. **Raciocínio:** mapear cada domínio da task para 1 agent (evitar duplicar `model-agent` 3×; 1 call por domínio com prompt disjunto)
3. **Divisão:** máx 4 subagentes paralelos por rodada; prompt `Research only, do not edit files. In <repo/path>, analyze <scoped topic>… Trace <symbols/files>. Return file:line, callers, plano mínimo. Do not duplicate <other scopes>.` (400–500 chars)
4. **Seleção:** usar `BEST_FREE` acima; fallback `nemotron-3-ultra-free` se `muse-spark` indisponível
5. **Execução:** `task` paralelos → consolidar → primary implementa; validar com `validate-structure` + tests focados

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
12. **Agent-owned reindex**: after changing source in `gaia-api/` or `gaia-web/`, the agent must run `.opencode/bin/codegraph-global-sync.sh` before its final response. Never delegate this step to the developer; skip it for Markdown-only changes.

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
| CodeGraph root snapshot | Versioned cross-repo graph at `<GAIA_ROOT>/.codegraph/codegraph.db` |
| CodeGraph live shadow | Cross-repo working graph at `/tmp/opencode/shadow-codegraph-gaia` |
| CodeGraph MCP | Harness-agnostic launcher at `.opencode/bin/codegraph-mcp.sh` |
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
