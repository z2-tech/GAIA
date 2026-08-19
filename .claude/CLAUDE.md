# GAIA

The full GAIA standard lives in `AGENTS.md` (auto-read by Claude Code). This file
is a thin pointer and intentionally does not duplicate it.

- Agents: `.opencode/agents/` — single source of truth; `.claude/agents/` are thin wrappers.
- Skills: `.agents/skills/` — single source; `.claude/skills/` are symlinks.
- Commands: `.opencode/commands/`.
- Domain glossary: `CONTEXT.md`; tracker: `docs/agents/issue-tracker.md`.
- Critical: never commit without explicit authorization.
