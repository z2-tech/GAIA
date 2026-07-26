---
tags: [system]
---

# Orchestrator-GAIA

## Stack

| Layer | Technology |
|-------|-----------|
| Repo | GAIA (this repo) |
| Branch | main |
| CodeGraph | Versioned DB (`codegraph.db`) |

## Responsibility

Centralizes 11 AI agents (5 domain + 7 sub-agents), SDD commands, lifecycle hooks, cross-stack contracts, knowledge vault. Does **not** contain production application code.

## Features

- **Agent hierarchy**: `senior-backend` → 7 layer sub-agents — inspired by [rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents), adapted for [HackSoftware Django Styleguide](https://github.com/HackSoftware/Django-Styleguide)
- **Harness-agnostic**: `.opencode/agents/` → `.claude/` + `.cursor/` + `.github/`
- **SDD pipeline**: `/feature-plan`, `/feature-implement`, `/feature-validate`
- **Lifecycle hooks**: SessionStart, PreToolUse, PostToolUse, TaskCompleted
- **CodeGraph**: versioned local DB + shadow global index

## Links

- Agent architecture: `.agents/README.md`
- Agent routing: `AGENTS.md`
- Harness config: `.claude/CLAUDE.md`, `.claude/settings.json`
- Vault index: [[00-INDEX]]
