# BE-02 — Rotas de edição, exclusão e clone do RothC

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** GAIA-2 (pré-Plane)

## Escopo

- `POST /api/v1/routhc/calculations/{id}/cancel/` — soft-delete ✅
- `POST /api/v2/routhc/assessments/{id}/cancel/` — soft-delete V2 ✅
- `POST /api/v1/routhc/calculations/{id}/clone/` — clonar cálculo ✅
- `PATCH /api/v1/routhc/calculations/{id}/update/` — editar ⬜ post-MVP

## Entregue

- Cancel V1 e V2 → `RouthcService.cancel_calculation` com soft-delete + downgrade
- Clone → `RouthcService.clone_calculation`: copia `RothcCalculation` + `RothcMonthlyResult`, mantém mesmo `project_farm` e parâmetros, nome `"(clone)"`
- Edit: sem UX correspondente — post-MVP

## Checklist

- [x] Cancel (V1 + V2)
- [x] Clone com cópia de resultados mensais
- [x] Testes: `test_access_control.py` (cancel)
- [ ] Edit (post-MVP)
- [x] `routhc/urls.py`
