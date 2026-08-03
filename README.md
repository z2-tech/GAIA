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

# Inicializa children, shadow cross-repo e snapshot versionado
./.opencode/bin/codegraph-global-sync.sh

code GAIA.code-workspace
```

Os children também podem ficar como siblings; o script de shadow resolve ambos
os layouts. `GAIA.code-workspace` usa o layout nested mostrado acima.

## Workflow

1. Registrar trabalho acionável em [`TODO/gaia.md`](TODO/gaia.md).
2. Criar spec em `docs/tasks/api/active/`, `docs/tasks/web/active/` ou `docs/tasks/shared/`.
3. Definir OpenAPI antes da implementação Web.
4. Implementar no child correto, a partir de `develop`.
5. Executar testes, schema, lint/build e o checklist cross-stack.
6. Atualizar changelog e mover itens encerrados para `TODO/archive.md`.

Comandos SDD:

```text
/feature-plan
/feature-implement
/feature-validate
/codegraph-sync
/vault-search
```

## Agents

`.opencode/agents/` é a única fonte de comportamento dos 12 agents.

| Necessidade | Agent |
|-------------|-------|
| Domínio LCA, RothC e regenerativo | `sustainability-specialist` |
| Backend Django | `senior-backend` |
| Models | `model-agent` |
| Services | `service-agent` |
| Selectors | `selector-agent` |
| Serializers e OpenAPI | `serializer-agent` |
| Migrations e seeds | `migration-agent` |
| Testes | `test-agent` |
| Lint | `lint-agent` |
| Frontend Next.js | `senior-nextjs` |
| Contrato API e Web | `cross-stack` |
| Auditoria arquitetural | `software-architecture` |

Wrappers de Claude, Cursor e Copilot apontam para essa mesma fonte.

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
│   ├── agents/                 12 agents canônicos
│   ├── commands/               comandos SDD, vault e CodeGraph
│   └── bin/                    validator, sync e MCP read-only
├── .agents/skills/             skills mantidas pelo projeto
├── .claude/agents/             wrappers
├── .cursor/rules/
├── .codegraph/                 snapshot cross-repo versionado
├── docs/
│   ├── tasks/                  specs por stack
│   ├── workflow/               branching, cross-stack e CodeGraph
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

- `.codegraph/codegraph.db` é o snapshot versionado conjunto de API + Web.
- Use os índices per-repo para implementação profunda.
- O MCP usa `/tmp/opencode/shadow-codegraph-gaia` como grafo vivo cross-repo.
- Use `/vault-search`, Read ou Grep para vault, tasks e workflow.
- Agents executam `.opencode/bin/codegraph-global-sync.sh` após mudar código;
  o developer não precisa manter os índices manualmente.
- Nunca rode `codegraph sync .` no root; o script publica o snapshot correto.

Procedimento: [`docs/workflow/CODE_GRAPH_SYNC.md`](docs/workflow/CODE_GRAPH_SYNC.md).

## Regras Essenciais

- Uma feature por PR.
- Nenhum commit, push, merge ou rebase sem autorização explícita.
- Nenhuma credencial em Git.
- Nenhuma regra de negócio importada de outro produto.
- Código e testes prevalecem sobre documentação desatualizada.
- Reindexação após mudanças de código é responsabilidade do agent.
