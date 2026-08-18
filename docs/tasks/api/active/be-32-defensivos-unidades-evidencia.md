# BE-32 — Defensivos: concentração do ingrediente ativo + unidades + evidência

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-64

## Contexto

"Concentração" vira "concentração do ingrediente ativo"; unidades kg/ha, g/ha, ml/ha,
l/ha; campo "categoria" morto; nota fiscal vira evidência. Contrato-alvo:
`TargetLcaDefensiveInput`.

## Escopo

- Remover `categoria` de `LcaProjectDefensivo` + serializers.
- Adicionar `unidade_quantidade` (KG_HA | G_HA | ML_HA | L_HA); `processar_defensivos`
  converte para kg/ha respeitando a unidade.
- Renomear semântica de `concentracao` → `concentracao_ingrediente_ativo` (avaliar
  renome de campo vs só apresentação; decidir e registrar).
- `nota_fiscal_file` → `evidencia_file`.

## Checklist

- [ ] Model + serializers sem categoria; com unidade e evidência
- [ ] Cálculo respeita unidade
- [ ] Migration + testes + `spectacular --validate`
