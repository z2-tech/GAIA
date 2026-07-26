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

## Links

- Repo: `gaia-api/` (branch: develop)
- OpenAPI schema → frontend codegen: `@hey-api/openapi-ts`
- Agent architecture: `.agents/README.md`
