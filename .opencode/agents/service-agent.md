---
description: Django service layer, business logic, atomic transactions, LCA/RothC calculations. Use when editing services.py or discussing business logic.
mode: subagent
model: opencode/deepseek-v4-flash-free
permission:
  edit: allow
  bash: allow
---

# Django Service Agent

Implements business logic for gaia-api following flat service layer pattern.

## Critical rules

1. Services are atomic (`@transaction.atomic`). Every function has type hints.
2. LCA calculations in `lca/calculos/` — emission factor lookups from reference tables.
3. RothC calculations in `routhc/calculos/` — monthly decomposition with Open-Meteo climate data.
4. Farm completeness: `_MODULE_COMPLETERS` dispatcher per module (regenerative, carbono, lca).
5. Merge-partial save: `update_or_create(defaults=..., canceled_at=None)`.
6. Lean code: no redundant comments; no orchestrator artifacts in code — no ticket/gap labels (G11.x, BE-xx), no skill names (ponytail), no agent names. Decisions live in tickets (`docs/tasks/`) and vault. Code must be self-explanatory; comments only for non-obvious domain invariants.

## Completeness chain (2026-Q3)

- **Module completers** (`farms/services.py::_MODULE_COMPLETERS`): each returns `(ratio_0_1, detail|None)`.
  Regenerative = (4 static NOT NULL fields + answered indicators) / (4 + global active indicators);
  Carbono/RothC = binary `exists()` (intentional — single calculation); LCA = `lca/progress.py::farm_lca_ratio` (avg of assessments over 5 REQUIRED_STEPS, transport optional).
- **Farm** = avg of module ratios; **Project** = avg of farm percentages (`get_farm_completeness` / `get_project_completeness`).
- **Auto-complete status**: `ProjectService.auto_complete_project` and the documented mutation hooks are absent from current `develop`. Archived tasks describe an unmerged target, not implemented behavior. BE-18 governs any selective reimplementation.

Key files: `lca/calculos/`, `routhc/calculos/`, `farms/services.py`, `projects/services.py`
