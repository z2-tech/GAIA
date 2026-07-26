# FE-08 — Tela de comparação de módulos/fazendas/projetos

> **Prioridade:** Baixa (Backlog) | **Assignee:** — | **Status:** Pendente
> **API:** BE-12 (comparação)

## Escopo

Tela que permite selecionar 2-4 entidades (fazendas, projetos ou assessments) e compará-las lado a lado.

## Layout

- Selector de escopo: fazendas | projetos | módulos
- Multi-select das entidades (2-4)
- Gráfico radar com indicadores normalizados
- Tabela comparativa lado a lado
- Veredito: qual entidade se destaca em cada indicador

## API

- `POST /api/v1/compare/` — a ser implementado (BE-12)

## Checklist

- [ ] Hook `useCompare`
- [ ] Página `/comparar`
- [ ] Componente `CompareRadarChart`
- [ ] Tabela comparativa
- [ ] i18n
