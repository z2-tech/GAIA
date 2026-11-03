# GAIA — Harness-Agnostic Agent Layer

GAIA follows the ia-lab standard: workflow skills in `.claude/skills/` write their results to `docs/`, and `/start` proposes the next one. Routing lives in the root `AGENTS.md`.

```
.claude/skills/                ← workflow skills + links to .agents/skills/
.agents/skills/                ← project tools (single copy)
.opencode/agents/              ← sustainability-specialist (until /sync route)
.claude/agents/                ← its wrapper, plus scout and researcher
.cursor/rules/                 ← 1 rule → AGENTS.md
.github/copilot-instructions.md ← project instructions
```

## Supported Harnesses

| Harness | Mechanism | Location |
|---------|-----------|----------|
| OpenCode | Skills + agents + MCP | loads `.claude/skills/` and `.agents/skills/`; `.opencode/agents/*.md` |
| Claude Code | Skills + agents + CLAUDE.md | `.claude/skills/`, `.claude/agents/` |
| Cursor | Project rules | `.cursor/rules/gaia-agents.mdc` |
| GitHub Copilot | Instructions | `.github/copilot-instructions.md` |

## Workflow skills (`.claude/skills/`)

`start` · `transcribe` · `discovery` · `design` · `penpot` · `scope` · `audit` · `architect` · `develop` · `check` · `test` · `document` · `sync` · `debug`. Sources live in the ia-lab repo; edit there, then copy.

## Stack skills (per code repo)

```
gaia-django (gaia-api/.agents/skills/)  ← model · service · selector · serializer · migration · test · lint
gaia-nextjs (gaia-web/.agents/skills/)  ← form · table · api-layer · design · i18n-key-validator · new-feature · webperf
shadcn      (gaia-web/.agents/skills/)  ← shadcn/ui components and registries
```

## Project tools (`.agents/skills/`)

| Skill | Purpose |
|-------|---------|
| plane-task, plane-doc, plane-doc-to-tasks | Create cards and pages in Plane |
| plane-develop-task, plane-fix-task | Plane card → `/architect` / `/develop`, or `/debug` |
| penpot-design | GAIA Penpot procedure and scripts (helpers, files, closing screens) |
| business-product-strategist | Product/UX heuristic evaluation |
| xlsx | Spreadsheet reading (openpyxl) |
| resolving-merge-conflicts | Guide an ongoing merge or rebase conflict |
| wizard | Interactive bash wizard for steps only a person can do |

## MCP Servers

| Server | Tool | Status |
|--------|------|--------|
| codegraph-gaia-api, codegraph-gaia-web | `codegraph_*` (context, search, trace, etc.) | One index per child repo, kept current by the file watcher |
| postgres | `postgres_query` | Read-only DB via `./.opencode/bin/postgres-mcp-readonly.sh` |
| plane | `mcp__plane__*` | Via `./.opencode/bin/plane-mcp.sh` |

## Commands (`.opencode/commands/`)

| Command | Purpose |
|---------|---------|
