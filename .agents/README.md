# GAIA — Harness-Agnostic Agent Architecture

**`.opencode/agents/`** is the single source of truth. All harnesses point to it.

```
.opencode/agents/              ← 12 agents (single source of truth)
     ↑ load from
.claude/agents/                ← 12 wrappers → .opencode/agents/
.cursor/rules/                 ← 1 rule → .opencode/agents/
.github/copilot-instructions.md ← project instructions
```

## Supported Harnesses

| Harness | Mechanism | Location |
|---------|-----------|----------|
| OpenCode | Agents + commands + MCP | `.opencode/agents/*.md` (12 agents), `.opencode/commands/*.md` (5 commands) |
| Claude Code | Custom agents + CLAUDE.md | `.claude/agents/*.md` (12 wrappers) → `.opencode/agents/` |
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
cross-stack               ← API↔Next.js contracts (OpenAPI → SDK)
software-architecture     ← architecture audit, code quality
```

## Skills

**Project-level** (`.agents/skills/`):
| Skill | Purpose |
|-------|---------|
| codegraph | Semantic code search over indexed graph |
| ui-ux-pro-max | UI/UX design & implementation guide |
| business-product-strategist | Product/UX heuristic evaluation |
| xlsx | Spreadsheet reading (openpyxl) |

**User-level** (`~/.agents/skills/`): caveman, council, find-skills
**Global Claude-compatible** (`~/.claude/skills/`): pdf
**Packages** (`~/.cache/opencode/packages/`): ponytail suite

## MCP Servers

| Server | Tool | Status |
|--------|------|--------|
| codegraph | `codegraph_*` (context, search, trace, etc.) | Live shadow via `./.opencode/bin/codegraph-mcp.sh` |
| postgres | `postgres_query` | Read-only DB via `./.opencode/bin/postgres-mcp-readonly.sh` |

## Commands (`.opencode/commands/`)

| Command | Purpose |
|---------|---------|
| `/feature-plan` | Generate task spec from domain requirements |
| `/feature-implement` | Execute task spec via agent dispatch |
| `/feature-validate` | Run tests + schema + lint gates |
| `/codegraph-sync` | Refresh child/shadow indexes and publish the root snapshot |
| `/vault-search` | Search knowledge vault |

After changing source in `gaia-api/` or `gaia-web/`, agents run
`./.opencode/bin/codegraph-global-sync.sh` before their final response. The
developer is not responsible for reindexing.
