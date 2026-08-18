# BE-31 — Fertilizantes: %N como atributo, lista Excel, unidades e evidência

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-63

## Contexto

%N é atributo do fertilizante (`default_nutrient_percentage`, fallback já usado em
`fertilizer.py`). Unidade selecionável kg/ha ou t/ha. Lista alinhada à planilha LCA
(aba `Em_Processo_fertilizantes` de `docs/references/domain/LCA_Annual_Crops_Tool.xlsx`).
Contrato-alvo: `TargetLcaFertilizerInput`.

## Escopo

- Remover do input: `porcentagem_nutriente`, `metodo_aplicacao`, `fabricado_em`,
  `inibidores_emissoes`.
- Adicionar `unidade_quantidade` (KG_HA | T_HA); cálculo converte para kg/ha.
- `nota_fiscal_file` → `evidencia_file` (anexo obrigatório).
- Realinhar seed `0004_seed_lca_fertilizer.py` à aba da planilha (nome + %N).

## Checklist

- [ ] Model + serializers sem os 4 campos; com unidade e evidência
- [ ] Cálculo respeita unidade e %N do catálogo
- [ ] Seed realinhada à planilha
- [ ] Migration + testes + `spectacular --validate`
