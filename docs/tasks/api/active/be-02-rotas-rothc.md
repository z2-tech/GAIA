# BE-02 — Rotas de edição, exclusão e clone do RothC

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** GAIA-2 (pré-Plane)

## Escopo

- `POST /api/v2/rothc/assessments/{id}/cancel/` — soft-delete V2 ✅
- `PATCH /api/v2/rothc/assessments/{id}/update/` — editar ⬜ post-MVP

## Entregue

- Cancel V2 → `RothcService.cancel_assessment` com soft-delete + downgrade
- Clone → `RothcService.clone_assessment`: copia `RothcCalculation` + `RothcMonthlyResult`, mantém mesmo `project_farm` e parâmetros, nome `"(clone)"`
- Edit: sem UX correspondente — post-MVP

## Checklist

- [x] Cancel (V2)
- [x] Clone com cópia de resultados mensais
- [x] Testes: `test_access_control.py` (cancel)
- [ ] Edit (post-MVP)
- [x] `rothc/urls.py`
