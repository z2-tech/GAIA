---
tags: [flow]
---

# Completion-Flow

Cadeia de completude e auto-conclusão de projetos (BE-10/BE-11, 2026-Q3).

## Cadeia de cálculo

```
Module completers (_MODULE_COMPLETERS, farms/services.py)
  ├── regenerativo: (4 campos estáticos NOT NULL + respostas) / (4 + indicadores ativos globais)
  ├── carbono/RothC: binário — cálculo existe → 100% (intencional, cálculo único)
  └── lca: média das completudes dos assessments (5 steps obrigatórios, transport opcional)
        → FarmService.get_farm_completeness (média dos módulos do projeto)
              → ProjectService.get_project_completeness (média das farms)
                    → ProjectService.maybe_auto_complete (100% → status=completed)
```

## Auto-complete (BE-10)

- `maybe_auto_complete(project)` em `projects/services.py` — guards: status deve ser `in_progress`; `farm_count > 0`; marca `completed` com `save(update_fields=["status"])`.
- **8 hooks de mutation** (sem signals — padrão HackSoftware, check explícito pós-mutation):
  1. `RouthcService.calcular()` (routhc/services.py)
  2. `RegenerativeService.create_assessment()` / `update_assessment()` (regenerative/services.py)
  3. Views LCA: culture, soil, inputs, fuel, calculate (lca/views.py via `_maybe_auto_complete`)
- `transport` LCA NÃO dispara (etapa opcional, não afeta ratio).

## Completude dos módulos (BE-11)

- `RegenerativeIndicator` é tabela global de config (sem FK por assessment) — contagem global é by design.
- Módulo sem completer registrado → 0% + `logger.warning` (força registro explícito).
- Média de módulos = completude da fazenda; média de fazendas = completude do projeto.

## Contrato

- API retorna `status` traduzido (PT/EN via `ProjectStatus.get_label`); frontend já renderiza badge "Concluído" + barra de progresso (sem mudança de contrato).
- Gaps: [[../tasks/api/active/be-16-gaps-completude-projetos|BE-16]] (D1 PO, testes integração rothc/lca, ambiente 5433).

## Relações

- [[Backend-API]] — sistemas
- [[Sustainability-Metrics]] — conceitos (LCA, RothC)
- [[Frontend-App]] — badges/progresso já integrados
