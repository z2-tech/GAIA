---
tags: [system]
---

# Orchestrator-GAIA

## Stack

| Layer | Technology |
|-------|-----------|
| Repo | GAIA (this repo) |
| Branch | main |
| CodeGraph | Per-repo source indexes + local shadow; Markdown uses text search |

## Responsibility

Centralizes 12 AI agents, SDD commands, lifecycle hooks, cross-stack handoff and the knowledge vault. Does **not** contain production application code.

## Features

- **Agent hierarchy**: `senior-backend` → 7 layer sub-agents — inspired by [rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents), adapted for [HackSoftware Django Styleguide](https://github.com/HackSoftware/Django-Styleguide)
- **Harness-agnostic**: `.opencode/agents/` → `.claude/` + `.cursor/` + `.github/`
- **SDD pipeline**: `/feature-plan`, `/feature-implement`, `/feature-validate`
- **Lifecycle hooks**: SessionStart, PreToolUse, PostToolUse, TaskCompleted
- **CodeGraph**: per-repo indexes + shadow source graph

## Links

- Agent architecture: `.agents/README.md`
- Agent routing: `AGENTS.md`
- Harness config: `.claude/CLAUDE.md`, `.claude/settings.json`
- Vault index: [[00-INDEX]]
