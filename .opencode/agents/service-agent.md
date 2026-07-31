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

## Completeness chain (BE-10/BE-11 — 2026-Q3)

- **Module completers** (`farms/services.py::_MODULE_COMPLETERS`): each returns `(ratio_0_1, detail|None)`.
  Regenerative = (4 static NOT NULL fields + answered indicators) / (4 + global active indicators);
  Carbono/RothC = binary `exists()` (intentional — single calculation); LCA = `lca/progress.py::farm_lca_ratio` (avg of assessments over 5 REQUIRED_STEPS, transport optional).
- **Farm** = avg of module ratios; **Project** = avg of farm percentages (`get_farm_completeness` / `get_project_completeness`).
- **Auto-complete**: `ProjectService.maybe_auto_complete(project)` (projects/services.py) — guards: status must be `in_progress`, farm_count > 0; if completion == 100 → `status=completed`, `save(update_fields=["status"])`.
- **Hooks (8)**: `routhc/services.py::RouthcService.calcular` (pós-create), `regenerative/services.py::create_assessment`/`update_assessment` (pós-save), `lca/views.py` 5 mutations (culture/soil/inputs/fuel/calculate via `_maybe_auto_complete`). NO signals — explicit check pós-mutation (HackSoftware).
- **Pending**: BE-16 D1 (PO) — completed + nova farm volta a in_progress?; integração hooks rothc/lca sem teste.

Key files: `lca/calculos/`, `routhc/calculos/`, `farms/services.py`, `projects/services.py`
