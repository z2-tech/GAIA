# Branching Strategy

Fonte canônica da política de branches do ecossistema GAIA.

| Repositório | Fonte de trabalho | Promoção |
|-------------|-------------------|----------|
| `GAIA` | `main` | documentação e orquestração |
| `gaia-api` | `develop` | `develop → homolog → main` |
| `gaia-web` | `develop` | `develop → homolog → main` |

## Regras

- Features, fixes e refactors das aplicações partem de `develop`.
- `homolog` recebe promoção de `develop`; `main` recebe promoção de `homolog`.
- `origin/HEAD` apontar para `main` não muda a fonte de desenvolvimento.
- Nunca fazer rebase em branches publicadas ou compartilhadas.
- Nunca executar commit, push, merge ou rebase sem autorização explícita.
- Sempre verificar a branch atual antes de editar ou publicar.
