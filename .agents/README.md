# GAIA — Harness-Agnostic Agent Architecture

`.opencode/agents/` is the single source of truth for all 11 agents.

```
.opencode/agents/         ← 11 thin stubs
     ↑ load from
.claude/agents/           ← 11 wrappers
.cursor/rules/            ← 1 rule → .opencode/agents/
.github/copilot-instructions.md
     ↓ point to
docs/agents/              ← canonical full definitions
```

## Supported Harnesses

| Harness | Mechanism |
|---------|-----------|
| OpenCode | `.opencode/agents/` |
| Claude Code | `.claude/agents/` → `.opencode/agents/` |
| Cursor | `.cursor/rules/gaia-agents.mdc` |
| GitHub Copilot | `.github/copilot-instructions.md` |

## Agent Hierarchy

```
senior-backend (orchestrator)
  ├── model-agent       ← schema, soft-delete
  ├── service-agent     ← business logic, LCA/RothC
  ├── selector-agent    ← read-only queries
  ├── serializer-agent  ← schema_fields, validation
  ├── migration-agent   ← safe migrations, seeds
  ├── test-agent        ← tests per app
  └── lint-agent        ← pre-commit, ruff

sustainability-specialist  ← LCA, RothC, regenerative domain
senior-nextjs              ← Next.js frontend
cross-stack                ← API↔Next.js contracts (OpenAPI)
software-architecture      ← code-quality audit
```

## Skills

```
.agents/skills/
  ├── codegraph/
  ├── ui-ux-pro-max/
  ├── business-product-strategist/
  ├── shadcn-ui-components/    ← shadcn/ui component rules
  ├── xlsx/                    ← Spreadsheet read/map (openpyxl)
  └── docx-converter/
```

## SDD Commands

```
/feature-plan       ← spec → task list
/feature-implement  ← tasks → code
/feature-validate   ← tests + lint + schema
```

## Lifecycle Hooks (`.claude/settings.json`)

- SessionStart → inject branch
- PreToolUse → block destructive commands
- PostToolUse → auto-format .py (ruff) + .tsx (eslint)
- TaskCompleted → QA gate reminder
