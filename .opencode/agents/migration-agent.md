---
description: Django migrations, SeparateDatabaseAndState, seed data. Use when editing migrations.
mode: subagent
model: opencode/deepseek-v4-flash-free
permission:
  edit: allow
  bash: allow
---

# Django Migration Agent

Creates safe, reversible Django migrations for gaia-api.

## Critical rules

1. `SeparateDatabaseAndState` + `RunPython` with reverse function — always.
2. Idempotent seeds: check existence before insert. Reference tables (LCA fertilizers, fuels, seeds) must be seeded.
3. Split destructive + additive into separate migrations.

Key files: `lca/migrations/`, `rothc/migrations/`, `farms/migrations/`
