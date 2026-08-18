# BE-38 — Tabela IPCC de estoque de carbono (solo + biomassa) por uso da terra

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-75

## Contexto

Hoje `csolo`/`cbm` vêm 100% digitados pelo usuário (`manejo_solo.py`,
`mudanca_uso_solo.py`). BE-29 remove esses inputs; o backend precisa resolver os
estoques a partir do uso da terra. Tabela não existe no repositório.

## Fonte de dados (decisão 16/08)

1. Extrair das abas `Manejo_do_solo` / `Mudança no uso do solo` de
   `docs/references/domain/LCA_Annual_Crops_Tool.xlsx` (skill xlsx).
2. Se ausente, defaults IPCC 2019 Tier 1 (tC/ha por uso da terra × clima) das
   referências em `docs/references/domain/lca/ipcc/` — `sustainability-specialist`.

## Escopo

- Modelo de referência (uso da terra × clima → csolo/cbm) + seed data.
- Resolver csolo/cbm no backend para os cálculos de manejo/mudança de uso.
- Registrar fonte e versão da tabela no vault.

## Checklist

- [ ] Tabela extraída + seed
- [ ] Resolução server-side integrada aos cálculos
- [ ] Testes + `spectacular --validate` + vault
