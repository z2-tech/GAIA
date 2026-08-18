# BE-40 — Clima automático do município da fazenda (LCA)

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** 🚧 Em andamento
> **Plane:** GAIAPROJEC-77

## Contexto

Reunião 14/08 §1.2: clima obtido automaticamente do município da fazenda —
pré-computado no backend, usuário não preenche. Hoje `clima` é input obrigatório
do usuário no soil create do LCA. `Farm` já tem `city_name` + `state`.

## Decisões

- Fonte: aba `Clima` de `docs/references/domain/LCA_Annual_Crops_Tool.xlsx`
  (5.571 municípios). Buckets já mapeados pelo specialist: DRY="Tropical Seco",
  demais classes → HUMID.
- `clima` vira opcional no soil create: ausente → resolvido de `Farm.city_name`+`state`;
  explícito continua aceito (compatibilidade, não quebra o FE atual).
- Tabela de estoque de carbono (BE-38) já é keyed por HUMID/DRY — sem mudança downstream.

## Checklist

- [ ] Seed município+UF → clima (migration nova)
- [ ] Selector `resolve_climate` (farms/lca)
- [ ] Soil create: clima opcional com resolução server-side
- [ ] Testes (resolução, fallback, município desconhecido)
- [ ] Vault atualizado (fonte da tabela Clima)
