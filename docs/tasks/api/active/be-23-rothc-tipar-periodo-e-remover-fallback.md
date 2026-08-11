# BE-23 — RothC: tipar periodo_inicio/fim e remover fallback silencioso projeto=BAU

> **Prioridade:** Média | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-39](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/b9e281ad-f31f-47bd-a758-4256ce638546)

## Problema 1 — `periodo_inicio` / `periodo_fim` sem tipo

- `RouthcAssessmentDetailSerializer` (`routhc/serializers.py:343-344`) declara os dois
  como `serializers.DictField()` cru.
- O SDK gerado vira `{[key: string]: unknown}`, e o frontend não consegue consumir de
  forma tipada — `resolveYearPeriod()` espera `PeriodoBound`.
- `RouthcCalculationDetailV2Serializer` (`routhc/serializers.py:241-242`) já faz certo,
  com `PeriodoBoundSerializer(allow_null=True)`. É só aplicar o mesmo.

## Problema 2 — fallback silencioso projeto = BAU

Em `_build_assessment_detail` (`routhc/services.py`):

```python
if bau_summary["total_oc_mensal"] and not project_summary["total_oc_mensal"]:
    project_summary = bau_summary
```

Se o cenário projeto não produziu resultado, a API devolve o BAU duplicado sem sinalizar
nada. O frontend calcula delta 0% acreditando que é número real. É exatamente o vício de
dado falso que o FE-28 está removendo do frontend (`PROJECT_FACTOR = 0.8`) — só que aqui
está no backend, onde é mais difícil de detectar.

## O que fazer

- Trocar os dois `DictField` por `PeriodoBoundSerializer(allow_null=True)`.
- Remover o fallback. Assessment sem os dois cenários completos é conflito de estado e
  retorna `409`, nunca dados sintéticos.
- Registros legados `productivity_crop` sem relações de culturas são incompletos, pois não
  existe backfill cientificamente seguro.
- Investigar por que o caminho existe. Se houver assessment legado com um único cenário,
  tratar via migração de dados ou flag explícita no payload — nunca por cópia silenciosa.

## Aceite

- [x] `periodo_inicio` e `periodo_fim` tipados no schema; SDK regenerado expõe `PeriodoBound`.
- [x] Assessment incompleto não retorna 200 com dados duplicados; retorna 409.
- [x] Teste cobrindo o caso.

## Entregue

- `RouthcAssessmentDetailSerializer` e `RouthcAssessmentPeriodDetailSerializer` usam `PeriodoBoundSerializer`
- Fallback `projeto=BAU` removido; `_validate_assessment_integrity` retorna 409 em cenário incompleto
- Testes em `TestAssessmentAccess` e `TestAssessmentPeriod` cobrem 404/409
