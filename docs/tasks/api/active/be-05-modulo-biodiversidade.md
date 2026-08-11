# BE-05 — Desenvolvimento do módulo Biodiversidade (BAT)

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (BE-18, 2026-08-10)
> **Plane:** [GAIA-5](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

## Escopo

Implementar o Biodiversity Assessment Tool baseado na planilha de referência.

## Entregue (via BE-18)

- **Models:** `BiodiversityQuestion` (43 questões seedadas), `BiodiversityAssessment` (BaseModel com soft-delete), `BiodiversityAnswer`
- **Endpoints:**
  - `GET /api/v1/biodiversity/questions/` — listar questões
  - `POST /api/v1/biodiversity/assessments/` — criar assessment
  - `GET /api/v1/biodiversity/assessments/` — listar por project/farm
  - `GET /api/v1/biodiversity/assessments/{id}/` — detalhe
  - `GET /api/v1/biodiversity/assessments/{id}/dashboard/` — score por seção
  - `POST /api/v1/biodiversity/assessments/{id}/cancel/` — soft-delete
- **Scoring:** pesos da planilha de referência, thresholds para classificação
- **Auto-complete:** `ProjectService.auto_complete_project()` integrado
- **Tests:** `biodiversity/tests/test_bat.py`

## Checklist

- [x] Models + migration (seed 43 questões)
- [x] Selectors + services
- [x] Serializers + views + urls
- [x] Testes
- [x] Auto-complete integrado

## Nota FE-28

Frontend (FE-12) já tem o form BAT refatorado no padrão `forms.md`. Falta criar
`src/services/biodiversity/` e trocar o toast-stub pela mutation real — FE-28 Fase 3.
