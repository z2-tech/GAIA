# FE-08 — Tela de comparação de fazendas/projetos (módulos)

> **Prioridade:** Baixa (Backlog) | **Assignee:** @fernandocampana | **Status:** Pendente
> **API:** [BE-12](../api/active/be-12-comparacao.md) — sessão FUTURA (backend primeiro)

> **Rebrief obrigatório (21/08/2026):** os [áudios de produto](../../../references/meetings/21-08-26-comparacao-permissoes-pousio/21-08-26-audios-whatsapp-transcricao-e-encaminhamentos.md) pedem comparação de execuções concluídas do mesmo módulo por fazenda/talhão, e não o contrato agregado de 2–4 fazendas/projetos abaixo. **Não implementar antes de SHARED-04 e da revisão de BE-12.**

## Escopo

Tela que permite selecionar 2-4 entidades (fazendas ou projetos; "módulos" = fazendas com filtro de módulo) e compará-las lado a lado com métricas de sustentabilidade.

## Contrato (BE-12 — já definido)

`POST /api/v1/compare/`

```json
// Request
{ "scope": "farms" | "projects", "ids": [1, 2, 3], "module": "lca" | "rothc" | "regenerativo" }
```

```json
// Response
{
  "entities": [
    {
      "id": 1,
      "name": "Fazenda A",
      "metrics": [
        { "key": "lca_footprint", "label": "Pegada LCA", "group": "carbono", "unit": "kgCO2e/kg", "value": 2.3, "better": "low" }
      ]
    }
  ],
  "radar": {
    "axes": ["carbono", "solo", "biodiversidade", "regenerativo", "processo"],
    "series": { "1": {"carbono": 0.8, "solo": null, "processo": 0.9} }
  },
  "verdict": { "winner_id": 1, "winner_score": 0.73, "scores": {"1": 0.73, "2": 0.41} }
}
```

Nuances de produto:
- **8 métricas** possíveis: `lca_footprint`/`lca_remocao` (kgCO2e/kg), `rothc_sequestration`/`rothc_soc_stock`/`rothc_soil_cover` (tC/ha), `regen_score`/`regen_landscape` (%), `completion` (%). `better: "low"` → menor é melhor (ex: pegada)
- **Radar**: 5 eixos fixos, série por entidade; eixo sem dados = `null` (placeholder, NUNCA zero — null convention GAIA)
- **Verdict**: entidade com maior score médio normalizado; `winner_id: null` se sem dados comparáveis
- IDs inexistentes/fora do domínio do usuário: ignorados, não 403

## Layout

- Selector de escopo: fazendas | projetos | (módulos = farms + seletor de módulo)
- Multi-select das entidades (2-4)
- Gráfico radar com 5 eixos (Recharts)
- Tabela comparativa lado a lado (métricas × entidades)
- Card de veredito (winner + score)

## Checklist

- [ ] Regenerar SDK após BE-12: `bunx @hey-api/openapi-ts`
- [ ] Hook `useCompare` (mutation POST /compare/ com TanStack Query)
- [ ] Página `/comparar`
- [ ] Componente `CompareRadarChart` (eixos fixos, valores null → vazio)
- [ ] Tabela comparativa com sort por métrica
- [ ] Veredito com placeholder quando `winner_id: null`
- [ ] i18n pt/en
- [ ] Tipagem contra `src/client/` (nunca hardcode do contrato)
