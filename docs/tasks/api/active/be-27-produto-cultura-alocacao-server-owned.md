# BE-27 — Produto & Cultura: produto opcional e alocação server-owned

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-59

## Contexto

Reunião 14/08: produto passa a ser opcional (Select da planilha LCA); todos os demais
campos de produto saem do input e viram resultado calculado no backend. Unidades do
cultura migram para toneladas. Contrato-alvo do Web: `lca-api-contract.ts`
(`TargetLcaCultureCreateRequest` / `TargetLcaProductInput`).

## Decisões

- `produtos` opcional no create; cada item aceita só `product_id` (FK na tabela de
  referência de produtos — ver be-36).
- Fatores de alocação/processo/rendimento saem do input e entram na resposta de cálculo,
  populados a partir da tabela de produtos.
- `montante_colhido_kg` → `montante_colhido_t` (toneladas); `residue_qty_kg_ha` →
  `residue_qty_t_ha` (t/ha). Migração converte valores legados (÷1000) ou campos novos;
  decidir na implementação e registrar no vault.

## Checklist

- [ ] Tabela de referência de produtos + seed (planilha LCA)
- [ ] Create: `produtos` opcional com `product_id`
- [ ] Resposta de cálculo expõe alocação server-owned
- [ ] Unidades em toneladas no contrato
- [ ] Migration + testes + `spectacular --validate`
