# BE-30 — Correção de solo: matar FSN/FON/ureia, adicionar gesso

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-62

## Contexto

Bloco "Insumos" vira "Correção de solo". Auditoria BE-26 confirmou:

- `fsn_kg_n` = Σ(qtde × %N) onde classificacao == SYNTHETIC
- `fon_kg_n` = Σ(qtde × %N) onde classificacao == ORGANIC
- `ureia_kg` = Σ(qtde) onde tipo == UREA
- Gesso (CaSO₄) não libera CO₂ — IPCC sem EF: **persistência apenas**, não entra em
  `corretivos.py`.

## Escopo

- Remover `ureia_kg`, `fsn_kg_n`, `fon_kg_n` de `LcaProjectSoilAmendments` + serializers.
- Adicionar `gesso_agricola_kg`.
- Derivar fsn/fon/ureia no cálculo a partir dos fertilizantes selecionados
  (`direta.py`/`indireta.py`/`ureia.py`).

## Checklist

- [ ] Model + serializers sem fsn/fon/ureia; com gesso
- [ ] Cálculo deriva fsn/fon/ureia dos fertilizantes
- [ ] Migration + testes + `spectacular --validate`
