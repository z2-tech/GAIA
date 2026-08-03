# CodeGraph Sync

CodeGraph indexa estrutura de código. Markdown do vault, tasks e workflow deve
ser consultado por `/vault-search`, Read ou Grep.

## Índices

| Nível | Path | Uso |
|-------|------|-----|
| API | `gaia-api/.codegraph/` | Implementação profunda no backend |
| Web | `gaia-web/.codegraph/` | Implementação profunda no frontend |
| Shadow | `/tmp/opencode/shadow-codegraph-gaia` | Descoberta e impacto cross-repo |

O root não mantém banco versionado porque não possui fonte indexável relevante.

## Inicialização

```bash
codegraph init -i gaia-api
codegraph init -i gaia-web
./.opencode/bin/codegraph-global-sync.sh
```

O script shadow aceita children nested ou sibling, impede syncs concorrentes e
executa rsync + CodeGraph sync incremental em toda chamada normal.

## Quando Sincronizar

| Evento | Ação |
|--------|------|
| Código API alterado | `codegraph sync gaia-api` |
| Código Web alterado | `codegraph sync gaia-web` |
| Análise cross-repo | `./.opencode/bin/codegraph-global-sync.sh` |
| Apenas Markdown alterado | Nenhum reindex; usar busca textual |

## Status

```bash
codegraph status gaia-api
codegraph status gaia-web
./.opencode/bin/codegraph-global-sync.sh --status
```
