# BE-10 — Status do projeto: concluído automaticamente se 100%

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (BE-18)
> **Plane:** [GAIA-10](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

## Escopo

Implementar `ProjectService.auto_complete_project()` e integrá-lo em todos
os módulos de assessment.

## Entregue

- `ProjectService.auto_complete_project()` em `projects/services.py:85`
- Integrado em **4 módulos**:
  - RothC: `routhc/services.py:655` (calcular), `:688` (cancel), `:1101` (create_assessment)
  - LCA: `lca/services.py:707` (calculate), `:1020` (cancel_culture), `lca/views.py:84-85`
  - Regenerative: `regenerative/services.py:117` (create), `:180` (cancel)
  - Biodiversity: `biodiversity/services.py:109` (cancel)
- Comportamento: projeto atinge 100% → status `COMPLETED`; novo assessment ou cancel → `IN_PROGRESS`
- Testes em `projects/tests/services/test_project_service.py:455`

## Checklist

- [x] `auto_complete_project` implementado
- [x] Integrado em todos os módulos
- [x] Downgrade COMPLETED → IN_PROGRESS no cancel
- [x] Testes
