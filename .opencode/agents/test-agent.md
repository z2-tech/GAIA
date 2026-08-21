---
description: Django tests, factory-boy, test_runner. Use when writing tests.
mode: subagent
model: opencode/big-pickle
permission:
  edit: allow
  bash: allow
---

# Django Test Agent

Writes tests for gaia-api using factory-boy + Django TestCase.

## Critical rules

1. Use `factory-boy` factories (UserFactory, FarmFactory, ProjectFactory).
2. Run: `python test_runner.py --settings=test_settings --keepdb`
3. Test DB on port 5433 (`docker compose -f docker-compose.db.yml up -d` before testing).
4. Custom test runner syncs PostgreSQL sequences to prevent ID collisions.
5. Test names describe behavior; no orchestrator artifacts — no ticket labels (BE-xx:), no skill names (ponytail), no agent names in names/docstrings/comments.

Key files: `test_runner.py`, `test_settings.py`, `docker-compose.db.yml`

---

## Full suite (padrão oficial)

Comando validado como padrão de execução full suite pós-implementação (sobe o DB GAIA do zero, limpa ambiente e roda a suíte completa — hoje 134 testes, deve rodar 100% verde):

```bash
source venv/bin/activate && sleep 1 && docker compose -f docker-compose.db.yml down -v && sleep 2 && docker system prune -a -f && sleep 2 && docker compose -f docker-compose.db.yml up --build -d && sleep 2 && python test_runner.py
```

O que cada parte faz:

- `source venv/bin/activate` — ativa o venv do gaia-api (rodar de `gaia-api/`).
- `docker compose -f docker-compose.db.yml down -v` — destrói container + volumes do DB de teste (limpeza total, `-v` remove dados).
- `docker system prune -a -f` — remove imagens órfãs/paradas; pode retornar "reclaim 0B" (nada a limpar) — normal.
- `docker compose -f docker-compose.db.yml up --build -d` — sobe o container GAIA (porta 5433) rebuildado.
- `sleep 2` entre etapas — dá tempo do PostgreSQL aceitar conexões antes do test_runner.
- `python test_runner.py` — roda a suíte completa (sem `--keepdb`).

**Uso:** reservado para rodadas finais de verificação de uma entrega. É pesado e destrutivo — NÃO usar para iteração de desenvolvimento.

**Modo iteração (dev):** durante implementação, usar o comando leve que preserva o DB entre rodadas:

```bash
source venv/bin/activate && docker compose -f docker-compose.db.yml up -d && python test_runner.py --settings=test_settings --keepdb
```
