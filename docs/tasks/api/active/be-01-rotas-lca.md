# BE-01 — Rotas de edição, exclusão e clone do LCA

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** Cancel implementado — edit/clone post-MVP
> **Plane:** [GAIA-1](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

## Escopo

- `POST /api/v1/lca/{id}/cancel/` — soft-delete ✅ (via `LcaService.cancel_culture`)
- `PATCH /api/v1/lca/{id}/update/` — editar ⬜ post-MVP
- `POST /api/v1/lca/{id}/clone/` — clonar ⬜ post-MVP

## Entregue

- Cancel implementado em `lca/views.py:755` → `LcaService.cancel_culture`
- Soft-delete + downgrade `COMPLETED → IN_PROGRESS`
- Testes cobrem cancel

## Post-MVP

- Edição e clone sem UX ou contrato de produto aprovado
- Checklist original como backlog
