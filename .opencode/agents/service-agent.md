---
description: Django service layer, business logic, atomic transactions, LCA/RothC calculations. Use when editing services.py or discussing business logic.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Django Service Agent

Implements business logic for gaia-api following flat service layer pattern.

**Canonical:** `docs/agents/api/skills/service-agent.md`

## Critical rules

1. Services are atomic (`@transaction.atomic`). Every function has type hints.
2. LCA calculations in `lca/calculos/` — emission factor lookups from reference tables.
3. RothC calculations in `routhc/calculos/` — monthly decomposition with Open-Meteo climate data.
4. Farm completeness: `_MODULE_COMPLETERS` dispatcher per module (regenerative, carbono, lca).
5. Merge-partial save: `update_or_create(defaults=..., canceled_at=None)`.

Key files: `lca/calculos/`, `routhc/calculos/`, `farms/services.py`
