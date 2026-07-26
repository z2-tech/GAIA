# GAIA

Repositório de **orquestração** do ecossistema GAIA — plataforma de métricas de sustentabilidade agrícola.

Centraliza agentes de IA, knowledge vault, especificações de tarefas, contratos cross-stack e scripts operacionais. **Não contém código de produção** — a implementação vive nos repositórios filhos.

> **Arquitetura de agentes inspirada em** [rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents) — quebra modular do backend em sub-agents por camada, adaptada ao [HackSoftware Django Styleguide](https://github.com/HackSoftware/Django-Styleguide) (Views → Services → Selectors → Models).

## Ecossistema

| Repositório | Stack | Branch |
|-------------|-------|--------|
| `gaia-api` | Django DRF + PostgreSQL | `develop` |
| `gaia-web` | Next.js + React + TypeScript + shadcn/ui | `develop` |

**Layout local:** clone os 3 repositórios lado a lado (ou `gaia-api/` e `gaia-web/` dentro de `GAIA/`). Os filhos estão no `.gitignore` deste repo.

## Início Rápido

```bash
# 1. Clonar
git clone <GAIA-remote> && cd GAIA
git clone <gaia-api-remote>
git clone <gaia-web-remote>

# 2. Instalar CodeGraph
#    https://github.com/anomalyco/codegraph → codegraph init -i

# 3. Sincronizar índice shadow (cross-repo)
./.opencode/bin/codegraph-global-sync.sh

# 4. Abrir workspace (VSCode)
code GAIA.code-workspace
```

## Para Desenvolvedores

### Fluxo de trabalho

1. **Tarefa nova** → registrar em [`TODO/gaia.md`](TODO/gaia.md)
2. **Especificar** → criar spec em `docs/tasks/{api,web}/`
3. **Implementar** → usar agentes IA para análise e geração de código
4. **Validar** → testes, lint, revisão cross-stack
5. **Documentar** → atualizar vault, changelog

### Agentes IA disponíveis

Todos em `.opencode/agents/`. Compatível com OpenCode, Claude Code, Cursor e GitHub Copilot.

| Tarefa | Agente | Quando usar |
|--------|--------|-------------|
| Domínio (LCA, RothC, regenerativo) | `sustainability-specialist` | Fórmulas, metodologia, validação de domínio |
| Backend Django | `senior-backend` | Orquestrador — roteia para sub-agents por camada |
| └ Schema, models, soft-delete | `model-agent` | `**/models.py`, `**/models/**` |
| └ Business logic, LCA/RothC | `service-agent` | `**/services.py` |
| └ Queries, derivatives, N+1 | `selector-agent` | `**/selectors.py` |
| └ Serializers, schema_fields | `serializer-agent` | `**/serializers.py` |
| └ Migrations, seeds | `migration-agent` | `**/migrations/**` |
| └ Testes | `test-agent` | `tests/**` |
| └ Lint, code style | `lint-agent` | `.pre-commit-config.yaml` |
| Frontend Next.js | `senior-nextjs` | `src/features/**`, `src/services/**`, `src/components/**` |
| Contratos API ↔ Next.js | `cross-stack` | OpenAPI schema, codegen, endpoints |
| Auditoria de arquitetura | `software-architecture` | Code review, produção readiness |

### Comandos úteis

```bash
# Backend
cd gaia-api
source venv/bin/activate
python test_runner.py --settings=test_settings --keepdb  # Testes
pre-commit run --all-files                                # Lint
python manage.py spectacular --validate --fail-on-warn    # Schema

# Frontend
cd gaia-web
bun lint              # Lint
bun run build         # Typecheck + build

# SDD workflow
/feature-plan "descrição da feature"   # Spec → task list
/feature-implement                     # Tasks → code (TDD)
/feature-validate                      # Code → tests + schema

# CodeGraph
./.opencode/bin/codegraph-global-sync.sh   # Rebuild shadow index
codegraph sync /home/fefo/GAIA             # Sync local index
```

## Estrutura

```
GAIA/
├── AGENTS.md                    ← Roteamento de agentes (entrada principal)
├── README.md                    ← Este guia
├── CHANGELOG.md                 ← Histórico de tarefas
├── TODO/gaia.md                 ← Task tracker (GAIA-xxx)
├── GAIA.code-workspace          ← VSCode workspace (3 pastas)
├── opencode.json                ← Config OpenCode (MCP, modelos, comandos)
│
├── .opencode/agents/            ← ★ 11 agentes (single source of truth)
├── .opencode/commands/          ← Slash commands (SDD + vault + codegraph)
├── .opencode/bin/               ← MCP + sync scripts
├── .claude/agents/              ← Claude wrappers → .opencode/agents/
├── .claude/settings.json        ← Lifecycle hooks
├── .cursor/rules/               ← Cursor rules → .opencode/agents/
├── .github/copilot-instructions.md ← GitHub Copilot
│
├── .agents/                     ← Skills globais + council
│   ├── skills/                  ← codegraph, ui-ux-pro-max, business-product-strategist
│   └── council/                 ← Julgamentos multi-juiz
│
├── docs/
│   ├── agents/                  ← Definições canônicas (shared/, api/, web/)
│   ├── vault/                   ← Knowledge graph (00-INDEX.md como entrada)
│   ├── references/              ← Specs, domínio, auth, roadmap
│   │   ├── architecture/        ← FRONTEND_INTEGRATION, contratos
│   │   ├── domain/              ← LCA, RothC, regenerativo specs
│   │   ├── ux/ auth/ planning/ meetings/
│   │   └── _stale/              ← Documentos históricos
│   ├── tasks/{api,web}/         ← Especificações (active/, archive/)
│   ├── runbooks/                ← Procedimentos operacionais
│   └── workflow/                ← BRANCHING, CODE_GRAPH_SYNC
│
└── .codegraph/                  ← Índice CodeGraph versionado (codegraph.db)
```

## Knowledge Sources

| Recurso | Caminho | Conteúdo |
|---------|---------|----------|
| **Vault** | [`docs/vault/00-INDEX.md`](docs/vault/00-INDEX.md) | Knowledge graph: sistemas, conceitos, fluxos |
| **Referências** | [`docs/references/README.md`](docs/references/README.md) | Specs técnicas, domínio, auth, roadmap |
| **Tarefas** | [`docs/tasks/`](docs/tasks/) | Especificações ativas e arquivadas |
| **Skills globais** | [`.agents/skills/`](.agents/skills/) | codegraph, UI/UX, produto |
| **Runbooks** | [`docs/runbooks/`](docs/runbooks/) | Deploy, backup, monitoramento |

## Princípios

1. **Escopo mínimo** — um PR, uma feature
2. **Contrato primeiro** — OpenAPI schema antes da implementação frontend (auto-gen via @hey-api/openapi-ts)
3. **CodeGraph primário** — `codegraph_context`/`codegraph_trace` antes de grep/glob
4. **Null convention** — API `null` → frontend exibe placeholder apropriado, nunca zero para não-computado
5. **Idioma** — PT para UX/domínio, EN para código
6. **Segredos** — nunca commitar `.env`, credenciais, chaves
7. **NEVER commit sem autorização explícita** — sem `git commit/push/rebase/merge` sem confirmação do dev
8. **Branching** — `develop → homolog → master`, rebase apenas em branches locais
9. **Vault mantido** — atualizar `docs/vault/` ao descobrir novas relações
10. **CodeGraph reindex** — após mudanças no vault, rodar `.opencode/bin/codegraph-global-sync.sh`

## Assignees

Cada tarefa em `docs/tasks/` e `TODO/gaia.md` possui assignee mapeado ao desenvolvedor responsável. Padrão:

```markdown
> **Prioridade:** Alta | **Assignee:** @dev_name | **Status:** Pendente
```

Assignees atuais: @Matheus Rodrigues, @léo bola, @fernandocampana. Novos devs devem ser adicionados ao `TODO/gaia.md` ao receberem tasks.

## Dicas para Desenvolvedores

### Enriquecendo a knowledgebase

A cada feature implementada, documente o que descobriu:

```bash
# 1. Novas relações entre sistemas
#    → docs/vault/systems/ ou docs/vault/flows/

# 2. Novos conceitos de domínio (ex: EIQ, STIR)
#    → docs/vault/concepts/Sustainability-Metrics.md

# 3. Planilhas de referência mapeadas para código
#    → docs/references/domain/ + docs/vault/

# 4. Sincronize o CodeGraph
./.opencode/bin/codegraph-global-sync.sh
```

### Gerando tasks com contexto

```
Dev Backend:
  /feature-plan "módulo biodiversidade"
  → agente lê docs/tasks/api/, planilha BAT, codegraph do gaia-api
  → gera spec com modelos, endpoints, checklist

Dev Frontend:
  /feature-implement
  → agente lê spec do back + cross-stack.md + codegraph do gaia-web
  → implementa contra OpenAPI schema (auto-gen via @hey-api/openapi-ts)

Ambos:
  /feature-validate
  → valida contrato, schema coverage, testes
```

### Ponte Back ↔ Front via codebase

| Perspectiva | Ferramenta | Comando |
|-------------|-----------|---------|
| "Como o endpoint X está implementado?" | CodeGraph shadow | `codegraph_context(projectPath="/tmp/opencode/shadow-codegraph-gaia", task="...")` |
| "Essa mudança no model quebra o frontend?" | CodeGraph impact | `codegraph_impact(symbol="ModelName")` no shadow |
| "O contrato OpenAPI está atualizado?" | drf-spectacular | `python manage.py spectacular --validate --fail-on-warn` |
| "O SDK do frontend está sincronizado?" | openapi-ts | `bunx @hey-api/openapi-ts` |
| "Qual o significado de domínio desse campo?" | Vault | `docs/vault/` + sustainability-specialist |

### Exemplo de sessão

```bash
# Backend dev: "Preciso criar o módulo BAT"
1. /feature-plan "biodiversity assessment tool"
   → gera docs/tasks/api/active/be-05-modulo-biodiversidade.md
2. sustainability-specialist lê planilha BAT
   → extrai questões, thresholds, scoring
3. senior-backend → model-agent + service-agent + migration-agent
   → models, cálculos, seeds
4. python test_runner.py && /feature-validate

# Frontend dev: "Vou construir a tela do BAT"
1. Ler spec do back + planilha BAT no vault
2. codegraph_context no shadow → ver endpoints novos
3. bunx @hey-api/openapi-ts → SDK atualizado
4. senior-nextjs implementa → formulário + dashboard
5. bun lint && /feature-validate
```

## Harness-Agnóstico

GAIA funciona com **OpenCode, Claude Code, Cursor e GitHub Copilot** sem configuração adicional:

```
.opencode/agents/          ← single source of truth
     ↑ carregam de
.claude/agents/            ← wrappers 5 linhas cada
.cursor/rules/             ← regras de projeto
.github/copilot-instructions.md  ← instruções Copilot
     ↓ apontam para
docs/agents/               ← definições canônicas
```

Novo harness: criar diretório `.harness/` → apontar wrappers para `.opencode/agents/`.

## CodeGraph

O índice local `codegraph.db` é **versionado** — novos devs começam com contexto pré-construído.

```bash
# Verificar idade do índice
DB_AGE=$(( $(date +%s) - $(stat -c '%Y' .codegraph/codegraph.db) ))
echo "${DB_AGE}s old"

# Shadow global (cross-repo: gaia-api + gaia-web + docs)
./.opencode/bin/codegraph-global-sync.sh

# Query shadow
codegraph_context(projectPath="/tmp/opencode/shadow-codegraph-gaia", task="...")

# Guia completo
cat docs/agents/shared/codegraph-guide.md
```

## Links

| Recurso | Caminho |
|---------|---------|
| Roteamento de agentes | [`AGENTS.md`](AGENTS.md) |
| Task tracker | [`TODO/gaia.md`](TODO/gaia.md) |
| Histórico | [`CHANGELOG.md`](CHANGELOG.md) |
| Agent architecture | [`.agents/README.md`](.agents/README.md) |
| Harness configs | [`.claude/CLAUDE.md`](.claude/CLAUDE.md), [`.claude/settings.json`](.claude/settings.json) |
| VSCode workspace | [`GAIA.code-workspace`](GAIA.code-workspace) |
