# BE-36 — Expor tabela de referência de produtos via GET /lca/products/

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-73

## Contexto

BE-27 cria a tabela de produtos (seed da planilha LCA) mas não expõe rota de leitura;
o Web monta o Select com catálogo hardcoded (`product-catalog.ts`) até esta rota
existir.

## Escopo

- `GET /lca/products/` em `lca/urls.py`, padrão das rotas de referência existentes
  (`list_seeds`, `list_defensives`, `list_fuel_types`, `list_fertilizers`).
- Selector read-only em `lca/selectors.py`; view sem query direta.
- Serializer de resposta com o shape que `alocado.py` consome (fatores de alocação,
  rendimento global, processo, is_refino, crush, refino).

## Checklist

- [ ] Rota + selector + serializer + schema explícito
- [ ] Testes + `spectacular --validate`
