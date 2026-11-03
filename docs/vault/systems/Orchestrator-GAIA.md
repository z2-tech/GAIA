---
tags: [system]
---

# Orchestrator-GAIA

## Stack

| Layer | Technology |
|-------|-----------|
| Repo | GAIA (this repo) |
| Branch | main |
| CodeGraph | Per-repo indexes, one MCP server each (`codegraph-gaia-api`, `codegraph-gaia-web`) |

## Responsibility

Centralizes 17 AI agents, SDD commands, lifecycle hooks, cross-stack handoff and the knowledge vault. Does **not** contain production application code.

## Features

- **Stack skills**: `gaia-django` (7 layer references) and `gaia-nextjs` (5) — inspired by [rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents), adapted for [HackSoftware Django Styleguide](https://github.com/HackSoftware/Django-Styleguide)
- **Harness-agnostic**: `.opencode/agents/` → `.claude/` + `.cursor/` + `.github/`
- **SDD pipeline**: `/feature-plan`, `/feature-implement`, `/feature-validate`
- **Lifecycle hooks**: SessionStart, PreToolUse, PostToolUse, TaskCompleted
- **CodeGraph**: `.codegraph/codegraph.db` versioned from the live cross-repo shadow; per-repo indexes remain authoritative for deep implementation

## Links

- Agent architecture: `.agents/README.md`
- Agent routing: `AGENTS.md`
- Harness config: `.claude/CLAUDE.md`, `.claude/settings.json`
- Vault index: [[00-INDEX]]
