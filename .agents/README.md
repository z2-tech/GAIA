# GAIA — Harness-Agnostic Agent Architecture

**OpenCode is the primary harness.** `AGENTS.md` and `.opencode/agents/` are the
single source; every other harness reads them or points to them.

```
AGENTS.md                         ← instructions (OpenCode and Claude Code ≥ 2.1.277)
.opencode/agents/*.md             ← 18 agents (canonical definitions)
.agents/skills/<id>/SKILL.md      ← project skills (canonical)
.opencode/commands/*.md           ← slash commands / lifecycle phases (canonical)

.claude/agents/<id>.md            ← generated wrapper → .opencode/agents/<id>.md
.claude/skills/<id>               ← symlink → ../../.agents/skills/<id>
.claude/commands/<name>.md        ← symlink → ../../.opencode/commands/<name>.md
.claude/settings.json             ← git approvals + Claude Code hooks
.mcp.json                         ← same servers as opencode.json (Claude Code)
.cursor/rules/                    ← Cursor rules
.github/copilot-instructions.md   ← GitHub Copilot instructions
```

Claude Code does not read `.agents/` or `.opencode/commands/` natively, which is
why the adapters above exist. They are generated, never edited by hand:

```bash
python3 .opencode/bin/sync-harness-adapters.py          # regenerate
python3 .opencode/bin/sync-harness-adapters.py --check  # fail on drift
```

`validate-structure.py` runs the `--check` automatically.

## Supported Harnesses

| Harness | Mechanism | Location |
|---------|-----------|----------|
| OpenCode | Instructions + agents + commands + MCP | `AGENTS.md`, `.opencode/agents/`, `.opencode/commands/`, `.agents/skills/`, `opencode.json` |
| Claude Code | `AGENTS.md` + generated agents/skills/commands + MCP | `.claude/`, `.mcp.json` |
| Cursor | Project rules | `.cursor/rules/gaia-agents.mdc` |
| GitHub Copilot | Instructions | `.github/copilot-instructions.md` |

## Agent Hierarchy

```
senior-backend (orchestrator — delegates to sub-agents in parallel)
  ├── model-agent        ← schema, soft-delete
  ├── service-agent      ← business logic, LCA/RothC
  ├── selector-agent     ← read-only queries
  ├── serializer-agent   ← schema_fields, validation, OpenAPI
  ├── migration-agent    ← safe migrations, seeds
  ├── test-agent         ← tests per app
  └── lint-agent         ← code style, pre-commit

sustainability-specialist  ← domain authority (LCA, RothC, regenerative)
senior-nextjs             ← Next.js frontend code owner
  ├── form-agent
  ├── table-agent
  ├── api-layer-agent
  ├── design-agent
  ├── i18n-key-validator
  └── penpot-designer     ← design system in Penpot (skill penpot-design)
cross-stack               ← API↔Next.js contracts (OpenAPI → SDK)
software-architecture     ← architecture audit, code quality
```

## Skills

Canonical source: `.agents/skills/` (46 skills). OpenCode reads it natively;
Claude Code reads the same directories through `.claude/skills/` symlinks.

Project skills include the lifecycle set (`to-spec`, `grilling`, `to-tickets`,
`tdd`, `implement`, `code-review`, `diagnose`, `handoff`), the GAIA workflow
(`gaia-feature-dev` + `plane-*`), the design system (`penpot-design`,
`ui-ux-pro-max`, `shadcn`) and the domain helpers (`codegraph`, `xlsx`,
`business-product-strategist`, `docx-converter`).

User-level (`~/.agents/skills/`): caveman, council, find-skills.

## MCP Servers

| Server | Tool | Status |
|--------|------|--------|
| codegraph | `codegraph_*` (context, search, trace, etc.) | Live shadow via `./.opencode/bin/codegraph-mcp.sh` |
| postgres | `postgres_*` | Read-only DB via `./.opencode/bin/postgres-mcp-readonly.sh` |
| plane | Plane issues/projects | Canonical tracker, workspace `gaia` |

## Commands (`.opencode/commands/`)

| Command | Purpose |
|---------|---------|
| `/spec` | Turn a request into a reviewed spec |
| `/plan` | Break the spec into ordered vertical slices |
| `/build` | Build one slice at a time through the orchestrators |
| `/test` | Run the test-driven loop and the task gates |
| `/review` | Two-axis review (standards + spec) |
| `/ship` | Release gate: CodeGraph re-sync, QA, changelog, handoff |
| `/feature-plan`, `/feature-implement`, `/feature-validate` | Task-spec workflow |
| `/codegraph-sync` | Refresh child/shadow indexes and the root snapshot |
| `/vault-search` | Search the knowledge vault |
| `/code-simplify`, `/webperf` | Architecture and performance passes |

After changing source in `gaia-api/` or `gaia-web/`, agents run
`./.opencode/bin/codegraph-global-sync.sh` before their final response. The
developer is not responsible for reindexing.
