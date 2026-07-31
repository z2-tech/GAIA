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
4. Lean code: no redundant comments; no orchestrator artifacts in code — no ticket/gap labels (G11.x, BE-xx), no skill names (ponytail), no agent names. Comments only for non-obvious domain invariants.

Key files: `.pre-commit-config.yaml`, `pyproject.toml`
