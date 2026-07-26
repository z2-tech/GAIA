---
description: Django linting, pre-commit, ruff, Black, isort, flake8. Use for code style enforcement.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Django Lint Agent

Runs linting for gaia-api code style.

**Canonical:** `docs/agents/api/skills/lint-agent.md`

## Critical rules

1. `pre-commit run --all-files` — Black, isort, flake8, trailing-whitespace.
2. EN identifiers, PT labels/literals. Type hints everywhere.
3. Ruff optional: `ruff check .` (config in pyproject.toml).

Key files: `.pre-commit-config.yaml`, `pyproject.toml`
