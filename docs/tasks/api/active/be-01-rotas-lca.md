# BE-01 — Rotas de edição, exclusão e clone do LCA

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Pendente

## Escopo

Implementar endpoints REST para gerenciamento de assessments LCA já criados:

- `PATCH /api/v1/lca/{project_culture_id}/update/` — editar cultura LCA
- `DELETE /api/v1/lca/{project_culture_id}/delete/` — soft-delete LCA
- `POST /api/v1/lca/{project_culture_id}/clone/` — clonar assessment LCA para nova cultura/ano

## Regras

- Soft-delete via `canceled_at` (BaseModel)
- Clone deve copiar: culture info, soil, inputs (fertilizers, defensives, seeds), fuel, transport
- Clone NÃO copia o resultado calculado — novo cálculo necessário
- Tenant scoping: apenas membros do projeto podem editar/deletar/clonar

## Checklist

- [ ] Serializers com @extend_schema (drf-spectacular)
- [ ] Services com @transaction.atomic
- [ ] Testes: test_services, test_views
- [ ] Atualizar `lca/urls.py`

## Relacionado

- `docs/references/domain/` — planilhas EIQ, LCA
- `docs/vault/concepts/Sustainability-Metrics.md`
