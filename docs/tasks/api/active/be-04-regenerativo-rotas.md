# BE-04 — Rotas de exclusão e clone do Regenerativo

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** GAIA-4 (pré-Plane)

## Escopo

- `DELETE /api/v1/regenerative/assessments/{id}/` — soft-delete ✅
- `POST /api/v1/regenerative/assessments/{id}/clone/` — clonar assessment ✅

## Entregue

- Cancel: `RegenerativeService.soft_delete_assessment` com downgrade + reassign primary
- Clone: `RegenerativeService.clone_assessment` — copia assessment + todas as `RegenerativeAssessmentAnswer`, `is_primary=False`
- Endpoint: `POST /api/v1/regenerative/assessments/{id}/clone/` → `assessment_clone` view

## Checklist

- [x] Soft-delete (cancel)
- [x] Clone com cópia de respostas
- [x] Testes de cancel existentes
- [x] `regenerative/urls.py`
