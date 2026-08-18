# BE-37 — Unificar catálogo de culturas LCA ↔ RothC

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-74

## Contexto

O Web já consome o catálogo RothC (`useListRothCCrops`) para o select de cultura do LCA.
O backend do LCA ainda usa `LcaCultureType` com 2 valores (SOYBEAN, WHEAT) e
`IPCC_PARAMS` em `direta.py` só cobre essas duas — culturas fora da tabela zeram o FCR
em silêncio (resultado errado sem erro).

## Decisões

- LCA aceita o código de cultura do catálogo RothC (17 culturas, rota única de
  referência para o select).
- `IPCC_PARAMS` (RAG, DRY, NAG, Cf, RS, NBG, FracRenew) expandido para todas as culturas
  do catálogo com dados IPCC 2019 Tier 1 (fonte: `sustainability-specialist` +
  referências em `docs/references/domain/lca/ipcc/`).
- Cultura sem params passa a ser **erro explícito** (nunca zero silencioso).

## Checklist

- [ ] `cultura` aceita código RothC no create
- [ ] `IPCC_PARAMS` completo para as 17 culturas
- [ ] Erro explícito p/ cultura sem params
- [ ] Testes + `spectacular --validate` + vault atualizado
