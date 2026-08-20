# BE-20 — RothC: persistir cultura e corrigir culturas/numero_culturas

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-36](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/60c59bd6-873d-4e39-9686-3b07b6602811)
> **Depende de:** [BE-19](be-19-rothc-ciclos-cultura.md) — mesma migration se feitos juntos

## Contexto

A tela de comparação BAU × Projeto exibe os cards "Nº de culturas" e a lista de culturas
do cenário.

## Problema

- `RothcMonthlyResult` (`rothc/models.py:51-100`) não tem campo `cultura`.
- `_compute_scenario_summary` faz
  `culturas = sorted(set(r["plant_type"] for r in results if r.get("plant_type")))`
  (`routhc/services.py:754`).
- `plant_type` é o `dpm_rpm` — `AGRICULTURAL_CROPS`, `IMPROVED_GRASSLAND`, `SCRUB`…

Ou seja: os cards mostram **categorias de uso do solo**, não culturas (Soja, Milho,
Trigo). A cultura escolhida pelo usuário é usada só para buscar `INDICE_COLHEITA` em
`calcular_entrada_c` e depois descartada — não é persistida em lugar nenhum.

## O que fazer

- Criar `RothcCrop` como catálogo seedado (`code`, nomes e `harvest_index`). O seed é a
  autoridade dos índices de colheita; remover a tabela hardcoded de `entrada_c.py`.
- Criar relação normalizada `RothcMonthlyResultCrop` com FKs para resultado mensal e
  cultura, `PROTECT` no catálogo e unicidade por resultado/cultura.
- Persistir todas as culturas ativas no mês. Sobreposição de culturas diferentes gera
  múltiplas relações; ciclos sobrepostos da mesma cultura geram uma relação e mantêm a
  soma dos resíduos.
- `culturas` e `numero_culturas` passam a derivar das relações do cenário/período.
- Modo `biomass` retorna lista vazia e `numero_culturas = 0`.

## Aceite

- [x] Assessment com cultura `SOYBEAN` retorna `culturas: ["SOYBEAN"]`, não
      `["AGRICULTURAL_CROPS"]`.
- [x] Assessment com soja + milho sobrepostos retorna as duas culturas e duas FKs no mês.
- [x] Cenário em modo `biomass` não quebra.
- [x] Teste por cenário — `bau` e `project` avaliados separadamente.

## Entregue

- `RothcCrop` seedado com 10 culturas e respectivos `harvest_index` (migration `0003`)
- `RothcMonthlyResultCrop` com FK para `RothcMonthlyResult` + `RothcCrop`
- `_compute_scenario_summary` deriva culturas de `monthly_crops.all()`
- Testes: `TestCropSeed`, cobertura em `TestPerennial`/`TestAnnual`
