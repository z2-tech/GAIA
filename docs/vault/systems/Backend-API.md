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

Os cálculos de completude existem, mas `ProjectService.auto_complete_project` e os 8 hooks descritos em documentos antigos **não estão em `develop`**. O fluxo permanece desenho histórico/alvo; reimplementar seletivamente via BE-18, sem portar a branch antiga inteira. Detalhes: [[../flows/Completion-Flow|Completion-Flow]].

## Testes (full suite)

Ambiente: container PostgreSQL de teste `gaia_postgres_test` na porta **5433** via `docker-compose.db.yml` (diretório `gaia-api/`).

```bash
# Full suite clean (verificação final de entrega — destrutivo: down -v + prune + up --build)
# Padrão oficial documentado em .opencode/agents/test-agent.md
source venv/bin/activate && sleep 1 && docker compose -f docker-compose.db.yml down -v && sleep 2 && docker system prune -a -f && sleep 2 && docker compose -f docker-compose.db.yml up --build -d && sleep 2 && python test_runner.py

# Modo iteração (dev) — preserva DB entre rodadas
source venv/bin/activate && docker compose -f docker-compose.db.yml up -d && python test_runner.py --settings=test_settings --keepdb
```

- Em `fix/backend-mvp-hardening`, `test_runner.py` usa discovery padrão do Django; novos testes não exigem lista manual. Baseline: 171 testes.
- Pré-requisitos lint/schema: `pre-commit run --all-files` · `python manage.py spectacular --validate --fail-on-warn`
