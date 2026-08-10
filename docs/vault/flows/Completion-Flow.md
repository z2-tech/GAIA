---
tags: [flow]
---

# Completion-Flow

Cadeia de completude e proposta de auto-conclusão de projetos (2026-Q3).

> **Status:** cálculos de completude existem. `auto_complete_project` e os hooks abaixo não estão em `develop`; são alvo histórico não integrado. BE-18 governa eventual reimplementação seletiva.

## Cadeia de cálculo

```
Module completers (_MODULE_COMPLETERS, farms/services.py)
  ├── regenerativo: (4 campos estáticos NOT NULL + respostas) / (4 + indicadores ativos globais)
  ├── carbono/RothC: binário — cálculo existe → 100% (intencional, cálculo único)
  └── lca: média das completudes (ratio atual exclui transporte; política ainda em D0)
        → FarmService.get_farm_completeness (média dos módulos do projeto)
              → ProjectService.get_project_completeness (média das farms)
                    → [alvo não integrado] auto_complete_project (100% → completed)
```

## Auto-complete (alvo não integrado)

- A branch histórica propôs `auto_complete_project(project)` com guards de status e farms.
- Também propôs 8 hooks explícitos, sem signals:
  1. `RouthcService.calcular()` (routhc/services.py)
  2. `RegenerativeService.create_assessment()` / `update_assessment()` (regenerative/services.py)
  3. Views LCA: culture, soil, inputs, fuel, calculate (lca/views.py via `_auto_complete_project`)
- A obrigatoriedade de transporte LCA permanece decisão D0 de BE-18; não assumir etapa opcional nem ausência = zero.

## Completude dos módulos (BE-11)

- `RegenerativeIndicator` é tabela global de config (sem FK por assessment) — contagem global é by design.
- Módulo sem completer registrado → 0% + `logger.warning` (força registro explícito).
- Média de módulos = completude da fazenda; média de fazendas = completude do projeto.

## Contrato

- API retorna `status` traduzido (PT/EN via `ProjectStatus.get_label`); frontend já renderiza badge "Concluído" + barra de progresso (sem mudança de contrato).
- Histórico não integrado: [`BE-16`](../../tasks/api/archive/be-16-gaps-completude-projetos.md).

## Relações

- [[Backend-API]] — sistemas
- [[Sustainability-Metrics]] — conceitos (LCA, RothC)
- [[Frontend-App]] — badges/progresso já integrados
