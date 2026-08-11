# BE-09 — Fix: incluir opção "Perene" em Clima e Solo (LCA)

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (já existente no enum)
> **Plane:** [GAIA-9](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

## Escopo

Adicionar a opção "Perene" nos campos de clima e tipo de solo do módulo LCA.

## Verificação

`PERENNIAL_CROP` já existe em `lca/enum/land_use_type.py:7` e está
disponível nas choices do `LcaProjectSoil` desde a migration `0012`.
Nenhuma alteração necessária.

## Checklist

- [x] Enum `PERENNIAL_CROP` em `land_use_type.py`
- [x] Disponível nas choices do model
- [x] Serializer aceita o valor
