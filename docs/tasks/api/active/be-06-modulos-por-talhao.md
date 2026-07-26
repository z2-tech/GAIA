# BE-06 — Módulos preenchidos por talhão

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Pendente

## Escopo

Permitir que assessments de módulos (LCA, RothC, Regenerativo, BAT) sejam vinculados a talhões específicos dentro da fazenda, não apenas à fazenda inteira.

## Modelo

- `Plot` (talhão): farm FK, name, area_ha, geometry (GeoJSON)
- Assessments ganham `plot` FK opcional (nullable — mantém compatibilidade)
- Completude da fazenda = média ponderada dos talhões

## Endpoints

- `POST /api/v1/farms/{farm_id}/plots/` — criar talhão
- `GET /api/v1/farms/{farm_id}/plots/` — listar talhões
- Assessments: aceitar `plot_id` no payload

## Checklist

- [ ] Model Plot + migration
- [ ] FK opcional nos models de assessment
- [ ] Atualizar selectors/serializers
- [ ] Atualizar `_MODULE_COMPLETERS` para considerar talhões
- [ ] Testes
