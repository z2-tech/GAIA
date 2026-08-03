# CodeGraph Sync — Como o grafo é montado e mantido

O CodeGraph do GAIA cobre os **dois repositórios filho** (`gaia-api` e `gaia-web`)
em um único grafo. Não é um índice do orquestrador — é o mapa estrutural da API
e do frontend combinados.

## Como foi indexado

```
GAIA (pai) ──┬── gaia-api/   ──► índice local (275 arquivos .py)
             └── gaia-web/   ──► índice local (331 arquivos .ts/.tsx)
                                │
                   rsync ───────┘
                                │
             shadow /tmp/opencode/shadow-codegraph-gaia
                                │
                   publish ─────┘
                                │
             .codegraph/codegraph.db  (607 arquivos, versionado no Git)
```

1. Cada child tem seu próprio `.codegraph/` local — índices autoritativos para
   trabalho profundo (`codegraph_context`, `codegraph_trace`, etc.).
2. Um workspace shadow em `/tmp/opencode/` recebe via `rsync` a cópia limpa de
   cada child (sem `.git`, `node_modules`, `venv`, `__pycache__`, etc.).
3. O shadow é indexado como um projeto único → grafo cross-repo com ~7.6k nós
   e ~14k arestas.
4. O banco pronto é copiado atomicamente para `.codegraph/codegraph.db` no root
   e versionado. É o snapshot de partida para qualquer dev que clonar o GAIA.

Consultas cross-stack (ex: "esse endpoint de LCA é consumido por qual feature
no frontend?") usam o shadow — o MCP de cada harness é configurado para apontar
pra ele via `.opencode/bin/codegraph-mcp.sh`.

## Atualização contínua

### Para o dev (raro — os agents fazem isso)

```bash
# De qualquer diretório dentro do GAIA
./.opencode/bin/codegraph-global-sync.sh
```

Fluxo: sync local de cada child → rsync no shadow → sync do grafo conjunto →
publica `.codegraph/codegraph.db`.

Variações:

```bash
# Rebuild completo (após merge grande, rename de módulo, etc.)
./.opencode/bin/codegraph-global-sync.sh --force

# Health check dos 4 índices
./.opencode/bin/codegraph-global-sync.sh --status
```

### Para o agent (automático)

Os agents recebem a instrução em `AGENTS.md` (princípio 12), `CLAUDE.md`,
`.cursor/rules/gaia-agents.mdc` e `.github/copilot-instructions.md`.
No Claude Code, o hook `SessionEnd` em `.claude/settings.json` executa o sync
automaticamente ao encerrar a sessão. O dev não precisa lembrar.

### O que NÃO precisa de sync

Markdown (vault, tasks, workflow) **não é indexado** pelo CodeGraph. Use
`/vault-search`, Read ou Grep. Alterações só nesses arquivos não exigem
reindexação.

## Comando rápido: `/codegraph-sync`

Se você não quiser decorar o path do script, use o comando SDD:

```
/codegraph-sync
```

O OpenCode executa `./.opencode/bin/codegraph-global-sync.sh` e mostra o status
final. Se o shadow estiver desatualizado ou ausente, ele é reconstruído.
Funciona em qualquer harness configurado com os comandos SDD.

## Nunca faça

```bash
# ❌ Isso varre o .gitignore e remove API/Web do banco raiz
codegraph sync .

# ❌ Isso também — os children são ignorados pelo Git do orquestrador
codegraph init -i .
```

O único caminho para o snapshot cross-repo é o script de sync.
