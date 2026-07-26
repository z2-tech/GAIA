# BE-12 — Feature de comparação de módulos/fazendas/projetos

> **Prioridade:** Média (Backlog) | **Assignee:** — | **Status:** Pendente

## Escopo

Endpoint de comparação que recebe uma lista de entidades (fazendas, projetos ou assessments de módulo) e retorna dados normalizados lado a lado.

## API

- `POST /api/v1/compare/` — `{ scope: "farms"|"projects"|"modules", ids: [1,2,3], module?: "lca"|"routhc" }`
- Resposta: `{ entities: [...], radar: { series: {...} }, verdict: "..." }`

## Checklist

- [ ] Serializer + service
- [ ] Testes
