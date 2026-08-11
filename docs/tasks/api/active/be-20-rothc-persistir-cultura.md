# BE-20 — RothC: persistir cultura e corrigir culturas/numero_culturas

> **Prioridade:** Alta | **Assignee:** — | **Status:** Priorizado
> **Plane:** [GAIA-36](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/60c59bd6-873d-4e39-9686-3b07b6602811)
> **Depende de:** [BE-19](be-19-rothc-ciclos-cultura.md) — mesma migration se feitos juntos

## Contexto

A tela de comparação BAU × Projeto exibe os cards "Nº de culturas" e a lista de culturas
do cenário.

## Problema

- `RothcMonthlyResult` (`routhc/models.py:51-100`) não tem campo `cultura`.
- `_compute_scenario_summary` faz
  `culturas = sorted(set(r["plant_type"] for r in results if r.get("plant_type")))`
  (`routhc/services.py:754`).
- `plant_type` é o `dpm_rpm` — `AGRICULTURAL_CROPS`, `IMPROVED_GRASSLAND`, `SCRUB`…

Ou seja: os cards mostram **categorias de uso do solo**, não culturas (Soja, Milho,
Trigo). A cultura escolhida pelo usuário é usada só para buscar `INDICE_COLHEITA` em
`calcular_entrada_c` e depois descartada — não é persistida em lugar nenhum.

## O que fazer

- Campo `cultura` (nullable, choices do enum `Cultura`) em `RothcMonthlyResult` + migration.
- Gravar o valor em `_run_monthly_simulation`.
- `culturas` e `numero_culturas` passam a derivar de `cultura`.
- **Decidir e documentar** o comportamento no modo `biomass`, onde não há cultura: lista
  vazia com `numero_culturas = 0`, ou manter o `dpm_rpm` como hoje. A tela precisa saber
  o que esperar.

## Aceite

- [ ] Assessment com cultura `SOYBEAN` retorna `culturas: ["SOYBEAN"]`, não
      `["AGRICULTURAL_CROPS"]`.
- [ ] Cenário em modo `biomass` não quebra.
- [ ] Teste por cenário — `bau` e `project` avaliados separadamente.
