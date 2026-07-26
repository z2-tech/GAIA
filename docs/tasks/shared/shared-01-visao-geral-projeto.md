# SHARED-01 — Discovery da tela Visão Geral do Projeto

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente

## Escopo

Definir o que a tela de visão geral do projeto deve conter, quais dados já existem na API e o que precisa ser criado.

## API (o que já existe)

- `GET /api/v1/projects/{id}/` — projeto + farms vinculados
- `GET /api/v1/projects/{id}/farms/` — farms com completude por módulo (via `_MODULE_COMPLETERS`)
- LCA: `GET /api/v1/lca/progress/` — progresso por farm

## API (o que precisa)

- Endpoint consolidado de visão geral: `GET /api/v1/projects/{id}/overview/`
  - Resumo por fazenda: área total, módulos preenchidos, % completude
  - Resumo por módulo: quantas fazendas preencheram, média de completude
  - Status geral do projeto

## Frontend

- Página `/projetos/[projetoId]/visao-geral`
- Cards por fazenda com indicadores de módulo
- Gráfico de radar/barras com completude
- Link rápido para cada módulo pendente

## Checklist

- [ ] Definir contrato API (`docs/references/architecture/`)
- [ ] Implementar endpoint overview
- [ ] Implementar tela frontend
- [ ] Atualizar `_MODULE_COMPLETERS` se necessário
