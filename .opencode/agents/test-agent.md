---
description: Django tests, factory-boy, test_runner. Use when writing tests.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Django Test Agent

Writes tests for gaia-api using factory-boy + Django TestCase.

**Canonical:** `docs/agents/api/skills/test-agent.md`

## Critical rules

1. Use `factory-boy` factories (UserFactory, FarmFactory, ProjectFactory).
2. Run: `python test_runner.py --settings=test_settings --keepdb`
3. Test DB on port 5433 (`docker compose -f docker-compose.db.yml up -d` before testing).
4. Custom test runner syncs PostgreSQL sequences to prevent ID collisions.

Key files: `test_runner.py`, `test_settings.py`, `docker-compose.db.yml`
