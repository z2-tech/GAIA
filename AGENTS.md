# GAIA Agent Graph

> This file is the single, harness-agnostic standard. opencode, Claude Code,
> Cursor and Copilot all auto-read it. Per-harness files (`.claude/CLAUDE.md`,
> `.cursor/rules/gaia-agents.mdc`, `.github/copilot-instructions.md`) are thin
> pointers here and must not duplicate these rules.

## Ecosystem

| Repository | Technology | Responsibility |
|---|---|---|
| `GAIA` | Orchestration only | Tasks, workflow, cross-stack handoff, agents, vault |
| `gaia-api` | Django DRF + PostgreSQL | Backend, sustainability metrics engine, OpenAPI contract |
| `gaia-web` | Next.js + React + TypeScript | Frontend, generated SDK, shadcn/ui, TanStack Query |

## Authority

- `.opencode/agents/` is the single source of agent behavior and invocation.
- `.agents/skills/` is the single source of skills (all harnesses point here).
- `.opencode/commands/` is the single source of slash commands.
- `CONTEXT.md` owns the domain glossary (read by skills; GAIA has no `docs/adr/`).
- `docs/vault/` owns GAIA domain knowledge and system decisions.
- `docs/tasks/` owns scope and acceptance criteria.
- `docs/agents/issue-tracker.md` owns the tracker config (Plane).
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
.cursor/rules/gaia-agents.mdc     Cursor pointer → this file
.github/copilot-instructions.md   Copilot pointer → this file
.agents/skills/                   44 skills (single source)
.claude/skills/                   symlinks → .agents/skills/
.opencode/commands/               13 slash commands (single source)
```

## Development Lifecycle

8 slash commands map the development lifecycle. Each activates the right skills.

| What you're doing | Command | Key principle |
|---|---|---|
| Define what to build | `/spec` | Spec before code |
| Plan how to build | `/plan` | Small, atomic tasks |
| Build incrementally | `/build` | One slice at a time |
| Prove it works | `/test` | Tests are proof |
| Review before merge | `/review` | Improve code health |
| Audit web performance | `/webperf` | Measure before optimizing |
| Simplify the code | `/code-simplify` | Clarity over cleverness |
| Ship to production | `/ship` | Faster is safer |

Support commands: `/feature-plan`, `/feature-implement`, `/feature-validate`
(docs/tasks SDD workflow), `/codegraph-sync`, `/vault-search`.

`/gaia-feature-dev` (or `plane-develop-task` / `plane-fix-task`) is the umbrella
entry point: it chains spec → plan → approval → build → test → review → ship,
delegating each phase to its command/skill and routing implementation through the
orchestrators. Once the plan is approved, `/build` runs each task test-driven and
commits individually, pausing on failures.

## Skills

Skills live in `.agents/skills/` (single source). opencode reads this directory
natively; Claude Code reads it via `.claude/skills/` symlinks; Cursor and Copilot
follow the routing in this file. Every lifecycle skill reads `CONTEXT.md` for
domain vocabulary and `docs/agents/issue-tracker.md` for the tracker.

- **Define**: `to-spec`, `grilling`, `grill-me`, `wayfinder`, `domain-modeling`
- **Plan**: `to-tickets`, `tdd` (seams)
- **Build**: `implement`, `tdd`, `prototype`, `new-feature`
- **Review**: `code-review`, `triage`, `i18n-key-validator`
- **Simplify**: `improve-codebase-architecture`, `codebase-design`
- **Debug**: `diagnosing-bugs`
- **Ship**: `handoff`, `claude-handoff`
- **GAIA workflow/tracker**: `gaia-feature-dev`, `plane-task`, `plane-doc`,
  `plane-doc-to-tasks`, `plane-develop-task`, `plane-fix-task`
- **GAIA domain**: `codegraph`, `xlsx`, `ui-ux-pro-max`, `business-product-strategist`

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
