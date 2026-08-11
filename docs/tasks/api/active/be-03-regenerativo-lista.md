# BE-03 — Suporte a múltiplos preenchimentos no módulo Regenerativo

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (migration 0006)
> **Plane:** [GAIA-4](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

## Escopo

Possibilitar múltiplos assessments regenerativos por ProjectFarm, removendo
a restrição `unique_together`.

## Entregue

- Migration `0006_multi_assessment.py`: substitui `unique_together` por partial unique constraint
  (`uniq_primary_assessment_per_project_farm`) que permite múltiplos assessments mas garante
  no máximo 1 primário ativo (`is_primary=True & canceled_at__isnull=True`)
- Campo `is_primary` adicionado ao `RegenerativeAssessment`
- Assessments existentes migrados: o mais recente não-cancelado marcado como primário

## Checklist

- [x] Migration sem `unique_together` global
- [x] Partial unique constraint para primary
- [x] Data migration para assessments existentes
- [x] Selectors + serializers ajustados
- [x] Testes
