# GAIA

Repositório de orquestração do ecossistema GAIA, uma plataforma de métricas de
sustentabilidade agrícola. Código de produção vive em `gaia-api` e `gaia-web`.

## Ecossistema

| Repositório | Stack | Branch de trabalho |
|-------------|-------|--------------------|
| `GAIA` | Orquestração, tasks, workflow e vault | `main` |
| `gaia-api` | Django DRF + PostgreSQL | `develop` |
| `gaia-web` | Next.js + React + TypeScript | `develop` |

## Início Rápido

```bash
git clone <GAIA-remote> GAIA
cd GAIA
git clone <gaia-api-remote> gaia-api
git clone <gaia-web-remote> gaia-web

# Índice CodeGraph por child (uma vez por máquina)
codegraph init -i gaia-api && codegraph init -i gaia-web

code GAIA.code-workspace
```

`GAIA.code-workspace` usa o layout nested mostrado acima.

## Workflow

1. Registrar trabalho acionável em [`TODO/gaia.md`](TODO/gaia.md).
2. Criar spec em `docs/tasks/api/active/`, `docs/tasks/web/active/` ou `docs/tasks/shared/`.
3. Definir OpenAPI antes da implementação Web.
4. Implementar no child correto, a partir de `develop`.
5. Executar testes, schema, lint/build e o checklist cross-stack.
6. Atualizar changelog e mover itens encerrados para `TODO/archive.md`.

Skills do fluxo (padrão ia-lab, em `.claude/skills/`): `/start` mostra onde cada feature está e propõe o próximo passo
(`/discovery` → `/design` → `/architect` → `/develop` → `/check` → `/test` → `/document` → `/sync`; bug vai para `/debug`).

## Agents

| Necessidade | Agent ou skill |
|-------------|-------|
| Domínio LCA, RothC e regenerativo | `sustainability-specialist` (vai para `docs/domain/` no `/sync route`) |
| Backend Django (models, services, selectors, serializers, migrations, testes, lint) | skill `gaia-django` em `gaia-api/.agents/skills/` |
| Frontend Next.js (forms, tabelas, services, design, i18n) | skill `gaia-nextjs` em `gaia-web/.agents/skills/` |
| Contrato API e Web | seção de API da spec (`/architect`) |
| Revisão de código | `/check review` |

Routing completo em [`AGENTS.md`](AGENTS.md).

## Estrutura

```text
GAIA/
├── AGENTS.md
├── README.md
├── CHANGELOG.md
├── TODO/
│   ├── gaia.md                 fila ativa
│   └── archive.md              tarefas encerradas
├── .opencode/
│   ├── agents/                 sustainability-specialist
│   ├── commands/               vault-search
│   └── bin/                    validator e MCP (postgres read-only, plane)
├── .claude/skills/             skills do fluxo (padrão ia-lab)
├── .agents/skills/             ferramentas do projeto (plane, penpot, xlsx…)
├── .claude/agents/             wrapper, scout e researcher
├── .cursor/rules/
├── docs/
│   ├── tasks/                  specs por stack
│   ├── workflow/               branching e cross-stack
│   ├── vault/                  domínio, decisões e relações
│   └── references/             planilhas e referências técnicas
├── gaia-api/                   repo Git independente e ignorado
└── gaia-web/                   repo Git independente e ignorado
```

## Fontes De Verdade

| Assunto | Fonte |
|---------|-------|
| Routing de agents | [`AGENTS.md`](AGENTS.md) |
| Trabalho ativo | [`TODO/gaia.md`](TODO/gaia.md) |
| Contrato executável | OpenAPI da API + SDK em `gaia-web/src/client/` |
| Regras de domínio | [`docs/vault/00-INDEX.md`](docs/vault/00-INDEX.md) |
| Specs | [`docs/tasks/`](docs/tasks/) |
| Branches | [`docs/workflow/BRANCHING.md`](docs/workflow/BRANCHING.md) |
| Checklist cross-stack | [`docs/workflow/CROSS_STACK_PR.md`](docs/workflow/CROSS_STACK_PR.md) |

## Validação

```bash
# Orquestrador
python3 .opencode/bin/validate-structure.py
bash -n .opencode/bin/*.sh

# API
cd gaia-api
source venv/bin/activate
python test_runner.py --settings=test_settings --keepdb
python manage.py spectacular --validate --fail-on-warn
pre-commit run --all-files

# Web
cd ../gaia-web
bun lint
bun run build
```

## CodeGraph

CodeGraph indexa estrutura de código, não o conteúdo semântico do Markdown.

- Um índice por child (`gaia-api/.codegraph/`, `gaia-web/.codegraph/`), local e fora do git.
- Um MCP server por child (`codegraph-gaia-api`, `codegraph-gaia-web`); o file watcher mantém o índice atualizado.
- Use `/vault-search`, Read ou Grep para vault, tasks e workflow.
- Nunca rode `codegraph init` no root; ele não enxerga os children.

## Regras Essenciais

- Uma feature por PR.
- Nenhum commit, push, merge ou rebase sem autorização explícita.
- Nenhuma credencial em Git.
- Nenhuma regra de negócio importada de outro produto.
- Código e testes prevalecem sobre documentação desatualizada.
- Reindexação após mudanças de código é responsabilidade do agent.
