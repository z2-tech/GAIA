# BE-12 — Feature de comparação de fazendas/projetos (sessão futura)

> **Prioridade:** Média (Backlog) | **Assignee:** @fernandocampana | **Status:** Pendente

> ⚠️ **Executar em sessão FUTURA.** Nada existe ainda em `gaia-api` para esta feature. Antes de codar, resolver as decisões PO (D1–D4) listadas no final. Este documento é auto-suficiente — não depende de contexto de sessões anteriores.

## Escopo

Endpoint de comparação que recebe uma lista de entidades (fazendas ou projetos) e retorna métricas normalizadas lado a lado + radar + verdict. Nada existe em `gaia-api` — implementar do zero.

## Fonte do mecanismo (referência obrigatória)

O mecanismo de comparação é ~80% agnóstico de domínio. Copiar o build pattern de:

```
~/ATYHA/atyha-api/project/services/compare_services.py   (475 linhas)
```

Reaproveitar deste arquivo (adaptando tipos/nomes): dispatch por scope, `_METRICS` declarativas `(key, label, group, unit, better)`, `_build_metrics` + `_best_worst`, `_build_radar` (normalização min-max), `_build_verdict`, serializers aninhados p/ OpenAPI.

**CORTAR do ATYHA (NÃO copiar):** `_policy_coherence_reason` (substituir por skip-missing: métricas ausentes = null, não bloqueia), `calculation_status`/`stale`/`scenario`/`policy`, parâmetro `year`, camada `PortfolioSelectors`.

**Reescrever só a coleta (~100 linhas):** leitura dos dados GAIA por entidade.

## Estrutura de arquivos

```
gaia-api/projects/compare/
├── services.py      # CompareService: coleta + build metrics/radar/verdict
├── serializers.py   # request (scope, ids, module?) + response aninhado (drf-spectacular)
└── views.py         # POST /api/v1/compare/
```

Registrar rota em `projects/urls.py` (padrão `api/v1/...`). Testes em `projects/compare/tests/` ou `projects/tests/compare/`.

## Contrato da API

`POST /api/v1/compare/`

Request:
```json
{
  "scope": "farms" | "projects",
  "ids": [1, 2, 3],
  "module": "lca" | "rothc" | "regenerativo"
}
```

Response:
```json
{
  "entities": [
    {
      "id": 1,
      "name": "Fazenda A",
      "metrics": [
        {"key": "lca_footprint", "label": "Pegada LCA", "group": "carbono", "unit": "kgCO2e/kg", "value": 2.3, "better": "low"},
        {"key": "rothc_sequestration", "label": "Sequestro RothC", "group": "solo", "unit": "tC/ha", "value": null, "better": "high"}
      ]
    }
  ],
  "radar": {
    "axes": ["carbono", "solo", "biodiversidade", "regenerativo", "processo"],
    "series": { "1": {"carbono": 0.8, "solo": null, "regenerativo": 0.5, "processo": 0.9}, "2": {...} }
  },
  "verdict": {
    "winner_id": 1,
    "winner_score": 0.73,
    "scores": {"1": 0.73, "2": 0.41}
  }
}
```

## Métricas propostas (unidades + direção)

| key | fonte | unit | better |
|---|---|---|---|
| `lca_footprint` | `lca` (kg CO2e/kg produto × critério) | kgCO2e/kg | low |
| `lca_remocao` | `lca` (remoção) | kgCO2e/kg | high |
| `rothc_sequestration` | `rothc` | tC/ha | high |
| `rothc_soc_stock` | `rothc` | tC/ha | high |
| `rothc_soil_cover` | `rothc` | tC/ha | high |
| `regen_score` | `regenerativo` (completude/pontuação) | pct | high |
| `regen_landscape` | `regenerativo` | pct | high |
| `completion` | `ProjectService.get_project_completeness` / farm equivalente | pct | high |

Eixos radar: `carbono` (lca_footprint, lca_remocao), `solo` (rothc_*), `biodiversidade` (regen_landscape), `regenerativo` (regen_score), `processo` (completion).

## Algoritmo

1. **Coleta**: para cada id, agregar métricas do scope (farms → farm; projects → média das farms ou `get_project_completeness`; `module` opcional filtra subconjunto). Ver R2 (RothC múltiplas calculations) e R1 (agregação LCA).
2. **Normalização radar**: min-max por métrica entre as entidades comparadas (respeita ordens de magnitude heterogêneas — R4). `better=low` → invertido. **Eixo sem nenhuma métrica computada = null, não 0** (null convention GAIA — R5). Média de eixos None: tratar explícito (ignorar eixos null no denominador).
3. **Verdict**: média dos scores normalizados do radar por entidade; `winner` = maior média (GAIA não tem métrica-mestra tipo VPL do ATYHA). Empate → primeiro por id; sem métricas computadas → `winner_id: null`.
4. **Permissões**: listar apenas entidades do usuário autenticado (equivalente ao `list_for_user` do ATYHA) — R6.

## Nuances / decisões pendentes (resolver com PO ANTES de codar)

- [ ] **R1 / D1 — agregação LCA**: spec pede `water_footprint`/`energy_use`/`eutrophication`/`acidification`, mas engine LCA GAIA só tem fossil/bio/remoção (kg CO2e/kg produto × critério). Recomendado: agregar por critério `massa`; confirmar com PO se métricas inexistentes ficam de fora (null) ou são mapeadas
- [ ] **R2 / D2 — RothC múltiplas calculations por farm**: decisão `latest` (recomendado) vs média das calculations
- [ ] **R3 / D3 — semântica scope `modules`**: ambígua. MVP recomendado = alias de `farms` + filtro `module`. Confirmar com PO se vale manter o scope no contrato
- [ ] **R4**: ordens de magnitude heterogêneas (tCO2e vs tC/ha vs pct) → min-max por métrica resolve; média do radar precisa tratar eixos None (ver Algoritmo 2)
- [ ] **R5**: null convention — métrica não computada = null, nunca 0; frontend exibe placeholder
- [ ] **R6**: permissões por usuário — entidades fora do domínio do usuário são ignoradas (não 403)

## Checklist

- [ ] Decisões PO D1–D4 resolvidas e registradas neste arquivo
- [ ] `CompareService` (coleta + metrics + radar + verdict) seguindo o build pattern do ATYHA
- [ ] Serializers aninhados com schema explícito (drf-spectacular, `@extend_schema`)
- [ ] View `POST /api/v1/compare/` — validação: scope válido, ids existentes, ids do usuário
- [ ] Testes: 2 entidades → radar/verdict corretos; métrica ausente → null e skip; perm miss; `better=low` invertido; empate
- [ ] Rodar `python test_runner.py --settings=test_settings --keepdb` + `pre-commit run --all-files` + `python manage.py spectacular --validate --fail-on-warn`
