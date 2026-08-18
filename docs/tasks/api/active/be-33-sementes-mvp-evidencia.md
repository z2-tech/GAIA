# BE-33 — Sementes: MVP trigo e milho + evidência

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-65

## Contexto

Sementes ganham evidência (anexo); escopo do MVP limitado a trigo e milho (alinhado ao
que já existe no `LcaCultureType`/seed). Contrato-alvo: `TargetLcaSeedInput`.

## Escopo

- Adicionar `evidencia_file` em `LcaProjectSemente` + serializers (create/response/detail).
- Revisar seed `0010_seed_lca_seed.py`: restringir a trigo e milho.

## Checklist

- [ ] Model + serializers com evidência
- [ ] Seed restrita ao MVP
- [ ] Migration + testes + `spectacular --validate`
