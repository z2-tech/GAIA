# BE-06 — Módulos preenchidos por talhão

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** 🚧 Em andamento (2026-08-17)
> **Plane:** GAIAPROJEC-47

## Escopo (refinado 17/08 — decisão de produto, reunião 14/08 §1.3)

Migração estrutural fazenda → talhão em modo **additive**: FK opcional, nada
quebra o fluxo atual. Fluxo: Projeto → Fazenda → Lista de Talhões → Módulos.

## Entregas

- `Farm` create aceita `plots` opcionais (wiring do desenho no mapa do FE).
- Model `Plot` (farm FK, name, area_ha, geometry GeoJSON) + **CRUD completo**:
  `GET/POST /api/v1/farms/{farm_id}/plots/`, `PATCH/DELETE .../plots/{id}/`.
- `plot` FK opcional em `LcaProjectCulture`, `RothcCalculation`,
  `RegenerativeAssessment`, `BiodiversityAssessment`; creates aceitam `plot_id`
  (validação: plot pertence à mesma fazenda).
- Listagens de módulo com filtro por plot.
- **Completude ponderada**: por plot = completude dos assessments vinculados;
  assessments sem plot (legado) contam para todos os plots; fazenda sem plots
  mantém regra atual; com plots → média ponderada por `area_ha`.
- CRUD de fazenda existente permanece intacto (create incrementado com plots).

## FE (consumers em FE-34)

- Tela Talhões no menu da fazenda; `plotId` opcional nas rotas de módulo;
  persistir polígonos desenhados na criação da fazenda.

## Checklist

- [ ] Farm create aceita plots
- [ ] Model Plot + migration
- [ ] CRUD de talhões (farms app)
- [ ] FK opcional nos 4 heads + `plot_id` nos creates
- [ ] Filtro por plot nas listagens
- [ ] `_MODULE_COMPLETERS`/`get_farm_completeness` ponderados
- [ ] Testes
