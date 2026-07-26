# GAIA — Changelog

Histórico de tarefas e status do ecossistema.

## 2026-07-25 — Setup do monorepo

- **GAIA-000**: Criado monorepo GAIA com orquestrador central
- 11 agentes configurados (5 domínio + 7 sub-agents Django)
- Shadow CodeGraph global indexando gaia-api (270 .py) + gaia-web (325 .ts/.tsx)
- 4 harnesses: OpenCode, Claude Code, Cursor, GitHub Copilot
- SDD commands: /feature-plan, /feature-implement, /feature-validate
- Lifecycle hooks: SessionStart, PreToolUse, PostToolUse, TaskCompleted
- Vault inicial: 00-INDEX, 3 system notes
- Estrutura mirrors ATYHA — plug-and-play para qualquer dev clonar
