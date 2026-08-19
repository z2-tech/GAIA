# GAIA — Harness-Agnostic Agent Architecture

**`AGENTS.md`** is the single, harness-agnostic standard. opencode, Claude Code,
Cursor and Copilot all auto-read it. The per-harness files are thin pointers to it.

```
AGENTS.md                       ← single standard (auto-read by every harness)
.opencode/agents/               ← 17 agents (single source of truth)
.agents/skills/                 ← 44 skills (single source of truth)
.opencode/commands/             ← 13 slash commands (single source of truth)

.claude/agents/                 ← 17 wrappers → .opencode/agents/
.claude/skills/                 ← symlinks → .agents/skills/
.cursor/rules/gaia-agents.mdc   ← pointer → AGENTS.md
.github/copilot-instructions.md ← pointer → AGENTS.md
```

## Supported Harnesses

| Harness | Mechanism | Location |
|---------|-----------|----------|
| OpenCode | Agents + commands + MCP | `.opencode/agents/`, `.opencode/commands/`, `opencode.json` |
| Claude Code | Custom agents + CLAUDE.md | `.claude/agents/` (wrappers) + `.claude/skills/` (symlinks) |
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
  └── i18n-key-validator
cross-stack               ← API↔Next.js contracts (OpenAPI → SDK)
software-architecture     ← architecture audit, code quality
```

## Skills

Skills live in `.agents/skills/` (single source). opencode reads it natively;
Claude Code reads it via `.claude/skills/` symlinks; Cursor/Copilot follow
`AGENTS.md`. Every lifecycle skill reads `CONTEXT.md` for domain vocabulary and
`docs/agents/issue-tracker.md` for the tracker.

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

**User-level** (`~/.agents/skills/`): caveman, council, find-skills
**Global Claude-compatible** (`~/.claude/skills/`): pdf

## MCP Servers

| Server | Tool | Status |
|--------|------|--------|
| codegraph | `codegraph_*` (context, search, trace, etc.) | Live shadow via `./.opencode/bin/codegraph-mcp.sh` |
| postgres | `postgres_query` | Read-only DB via `./.opencode/bin/postgres-mcp-readonly.sh` |
| plane | `plane_*` | Tracker via `./.opencode/bin/plane-mcp.sh` |

## Commands (`.opencode/commands/`)

| Command | Purpose |
|---------|---------|
| `/spec` | Define what to build — spec before code |
| `/plan` | Break into small, atomic, dependency-ordered tasks |
| `/build` | Build one slice at a time, test-driven |
| `/test` | Run the test-driven loop + gate commands |
| `/review` | Two-axis review (standards + spec) before merge |
| `/webperf` | Audit gaia-web performance |
| `/code-simplify` | Surface deep-module opportunities |
| `/ship` | Release gate: CodeGraph re-sync + QA + changelog |
| `/feature-plan` | Generate task spec from domain requirements |
| `/feature-implement` | Execute task spec via agent dispatch |
| `/feature-validate` | Run tests + schema + lint gates |
| `/codegraph-sync` | Refresh child/shadow indexes and publish the root snapshot |
| `/vault-search` | Search knowledge vault |

After changing source in `gaia-api/` or `gaia-web/`, agents run
`./.opencode/bin/codegraph-global-sync.sh` before their final response. The
developer is not responsible for reindexing.
