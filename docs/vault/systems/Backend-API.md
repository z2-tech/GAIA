---
tags: [system]
---

# Backend-API

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Django 5.2 + DRF 3.16 |
| Database | PostgreSQL 16 |
| Auth | JWT (simplejwt) + RBAC |
| Schema | drf-spectacular (OpenAPI 3.x) |

## Responsibility

REST API for sustainability metrics: LCA, RothC carbon modeling, regenerative agriculture assessment. Follows HackSoftware Django Styleguide (Views → Services → Selectors → Models).

## Agent Hierarchy

`senior-backend` orchestrates 7 layer-specific sub-agents following [HackSoftware Django Styleguide](https://github.com/HackSoftware/Django-Styleguide) layers:

```
senior-backend (orchestrator)
  ├── model-agent       ← schema, soft-delete
  ├── service-agent     ← LCA/RothC calculations
  ├── selector-agent    ← read-only queries
  ├── serializer-agent  ← schema_fields, validation
  ├── migration-agent   ← safe migrations, seeds
  ├── test-agent        ← tests per app
  └── lint-agent        ← pre-commit, ruff
```

Pattern inspired by [rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents) granular agent decomposition.

## Links

- Repo: `gaia-api/` (branch: develop)
- OpenAPI schema → frontend codegen: `@hey-api/openapi-ts`
- Agent architecture: `.agents/README.md`

## Completeness & auto-status (2026-Q3)

Cadeia: module completers (`farms/services.py::_MODULE_COMPLETERS`) → média por fazenda (`get_farm_completeness`) → média por projeto (`get_project_completeness`) → auto `status=completed` (`ProjectService.maybe_auto_complete`, BE-10). 8 hooks de mutation em routhc/regenerative services + lca views (sem signals). Detalhes: [[../flows/Completion-Flow|Completion-Flow]] · Gaps: BE-16 · Comparação futura: BE-12/FE-08.
