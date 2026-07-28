# FE-MIGRATE-GAIA — Migrar workflow Next.js para o orquestrador GAIA

> **Prioridade:** Alta | **Status:** Em andamento | **Target:** `gaia-web` develop

## Objetivo

Migrar todas as configurações locais de IA do desenvolvedor frontend (Claude Code, Cursor, skills, hooks, agentes pessoais) para a estrutura centralizada do repo `GAIA`, eliminando redundâncias entre `gaia-web` e `gaia-api`, e garantindo que qualquer novo dev full-stack tenha o mesmo ponto de partida — com acesso a CodeGraph, agents cross-stack, e ao vault de conhecimento compartilhado.

## Contexto

O repo `GAIA` foi criado como orquestrador harness-agnóstico e plug-and-play do ecossistema. `gaia-api` (Django) e `gaia-web` (Next.js) já residem como subdiretórios dentro de `GAIA/`. O backend já opera 100% integrado. O frontend ainda mantém parte do workflow em configurações locais que devem ser transportadas para o orquestrador.

### Arquitetura atual do GAIA

```
GAIA/
├── gaia-api/                       ← Backend Django (já integrado)
├── gaia-web/                       ← Frontend Next.js (parcialmente integrado)
│
├── .opencode/agents/              ← ★ Single source of truth (12 agentes)
│   ├── senior-backend.md          ← Orchestrator Django
│   ├── senior-nextjs.md           ← Proxy Next.js (22 linhas)
│   ├── sustainability-specialist.md
│   ├── cross-stack.md
│   ├── software-architecture.md
│   ├── model-agent.md             ← Sub-agentes Django:
│   ├── service-agent.md
│   ├── selector-agent.md
│   ├── serializer-agent.md
│   ├── migration-agent.md
│   ├── test-agent.md
│   └── lint-agent.md
│
├── .claude/agents/                ← Claude Code wrappers → .opencode/agents/
├── .cursor/rules/gaia-agents.mdc  ← Cursor auto-inject rules
├── .github/copilot-instructions.md
│
├── .agents/skills/                ← Skills globais (todos os harnesses)
│   ├── codegraph/
│   ├── ui-ux-pro-max/
│   ├── business-product-strategist/
│   ├── docx-converter/
│   ├── pdf/
│   └── xlsx/
│
├── .opencode/bin/
│   └── codegraph-global-sync.sh   ← Shadow workspace indexado
│
├── docs/
│   ├── agents/web/                ← (planejado — canonical Next.js)
│   ├── vault/00-INDEX.md          ← Knowledge graph
│   ├── tasks/web/                 ← Tarefas de frontend
│   └── references/                ← Specs organizadas por categoria
│
└── AGENTS.md                      ← Roteamento central
```

### O que o frontend tem no repo filho

```
gaia-web/
├── AGENT.md                       ← Agent reference — patterns, templates, anti-patterns
├── CLAUDE.md                      ← Project overview, tech stack, architecture
├── README.md
│
├── .claude/
│   ├── settings.json              ← Claude plugins + hooks config
│   ├── settings.local.json        ← Permissions (pessoal — não migrar)
│   ├── agents/
│   │   └── i18n-key-validator.md  ← Validador de i18n scoped ao diff
│   ├── skills/
│   │   └── new-feature.md         ← Scaffold de feature module
│   ├── hooks/
│   │   ├── block-generated.sh     ← Bloqueia edição em src/client/
│   │   ├── eslint-fix.sh          ← ESLint --fix por arquivo
│   │   └── typecheck.sh           ← tsc --noEmit pós-edição
│   └── memory/                    ← (pessoal — não migrar)
│
├── .cursor/
│   └── commands/
│       └── commit.md              ← Comando de commit padronizado
│
├── .mcp.json                      ← CodeGraph MCP config (local ao repo)
├── skills-lock.json               ← shadcn skill lock
├── .codegraph/                    ← CodeGraph local (gitignored)
│
├── .agents/skills/                ← (vazio — pendente de sincronização)
│
├── docs/
│   ├── project-structure.md       ← Arquitetura 3-layer
│   ├── api-layer.md               ← hey-api SDK, services, queries
│   ├── forms.md                   ← RHF + Zod patterns
│   ├── naming-conventions.md      ← File/hook naming
│   ├── localization.md            ← next-intl patterns
│   ├── design-system.md           ← Cards, typography, spacing
│   └── superpowers/plans/         ← Planos de melhoria interna
│
└── src/                           ← Código (zero alteração nesta migração)
    ├── app/       (thin pages)
    ├── features/  (business logic)
    ├── services/  (TanStack Query)
    └── client/    (auto-generated — nunca editar)
```

## Checklist de Migração

### 1. Criar canonical `docs/agents/web/senior-nextjs.md`

O proxy `.opencode/agents/senior-nextjs.md` (22 linhas) referencia o caminho canônico, mas o arquivo canônico ainda não existe. Criá-lo com:

- Stack completa (Next.js 16, React 19, TypeScript 5, Bun, Tailwind v4, shadcn/ui, TanStack Query v5, Jotai, RHF + Zod, next-intl)
- 3-layer rule detalhada (app/ → features/ → services/ → client/)
- Contract-first: OpenAPI → `@hey-api/openapi-ts` → `src/client/`
- State management: TanStack Query (server), Jotai (client), RHF (forms)
- Component system: shadcn/ui New York style + Tailwind v4 CSS vars
- Critical constraints: `"use client"`, `src/client/` intocável, i18n em ambos `pt.json` e `en.json`
- File templates: service query, service mutation, thin page, feature form hook

- [ ] `docs/agents/web/senior-nextjs.md` criado

### 2. Criar skills do frontend em `docs/agents/web/skills/`

```
docs/agents/web/skills/
├── STYLE_GUIDE.md          ← Design system: cards, typography, spacing, buttons, colors
├── INTEGRATION_GUIDE.md    ← API integration: services layer, error handling, invalidation
└── FORMS_GUIDE.md          ← RHF + Zod: schema factories, mappers, multi-step persistence
```

O conteúdo deriva de `gaia-web/docs/design-system.md`, `gaia-web/docs/api-layer.md`, `gaia-web/docs/forms.md` — adaptado para ser agnóstico ao projeto, focado em padrões reutilizáveis.

- [ ] `docs/agents/web/skills/STYLE_GUIDE.md` criado
- [ ] `docs/agents/web/skills/INTEGRATION_GUIDE.md` criado
- [ ] `docs/agents/web/skills/FORMS_GUIDE.md` criado

### 3. Elevar hooks do gaia-web para `.opencode/bin/hooks/`

Os hooks `.claude/hooks/` do gaia-web (block-generated.sh, eslint-fix.sh, typecheck.sh) são valiosos para o ecossistema inteiro. Elevá-los para o orquestrador, com paths parametrizáveis:

```
.opencode/bin/hooks/
├── block-generated.sh      ← Bloqueia edição em diretórios auto-gerados
├── eslint-fix.sh           ← ESLint --fix escopo por arquivo
└── typecheck.sh            ← Type-check pós-edição (tsc --noEmit ou mypy)
```

Manter uma cópia em `gaia-web/.claude/hooks/` como wrapper que referencia os scripts centrais.

- [ ] `.opencode/bin/hooks/block-generated.sh` criado (path parametrizável: `src/client/` para web, migrações Django para api)
- [ ] `.opencode/bin/hooks/eslint-fix.sh` criado
- [ ] `.opencode/bin/hooks/typecheck.sh` criado
- [ ] `gaia-web/.claude/hooks/` atualizado como wrappers → `.opencode/bin/hooks/`

### 4. Elevar agente `i18n-key-validator` para `.opencode/agents/`

O agente `gaia-web/.claude/agents/i18n-key-validator.md` é reutilizável por qualquer frontend do ecossistema. Elevá-lo:

```
.opencode/agents/i18n-key-validator.md   ← Single source of truth
.claude/agents/i18n-key-validator.md     ← Claude wrapper → .opencode/agents/
```

- [ ] `.opencode/agents/i18n-key-validator.md` criado
- [ ] `.claude/agents/i18n-key-validator.md` criado como wrapper

### 5. Sincronizar `skills-lock.json` com skills globais do GAIA

O `gaia-web/skills-lock.json` atualmente só lista `shadcn`. O `GAIA/.agents/skills/` já tem 6 skills. `gaia-web/.agents/skills/` está vazio — precisa ser populado com symlinks ou wrappers.

Ações:
- [ ] Atualizar `gaia-web/skills-lock.json` incluindo as skills globais disponíveis
- [ ] Popular `gaia-web/.agents/skills/` com wrappers → `../../.agents/skills/<name>/`
- [ ] Adicionar `.agents/skills/shadcn-ui-components/` ao GAIA se ainda não existir

### 6. Verificar e limpar configs locais

**gaia-web/.claude/settings.json** — validar que:
- [ ] Hooks referenciam os scripts centralizados (`.opencode/bin/hooks/`)
- [ ] Plugins habilitados são Next.js-specific (manter local)
- [ ] Tempo de vida do `SessionStart` → verificar se `codegraph sync` roda contra o workspace gaia-web ou o shadow do GAIA

**gaia-web/.claude/settings.local.json** — manter como está (permissões pessoais).

**gaia-web/.cursor/commands/commit.md** — manter local; é específico do fluxo de commit do frontend.

**gaia-web/.mcp.json** — avaliar se o CodeGraph deve apontar para o shadow workspace (`/tmp/opencode/shadow-codegraph-gaia`) ou manter o index local.
- [ ] `.mcp.json` atualizado para incluir ambos os workspaces (local + shadow) ou documentar a escolha

### 7. Atualizar routing em `gaia-web/AGENT.md`

Adicionar seção de routing que referencia o orquestrador:

```markdown
## Agent Routing (GAIA Ecosystem)

| Need | Agent file |
|---|---|
| Domain logic, sustainability formulas | `../.opencode/agents/sustainability-specialist.md` |
| Frontend architecture, patterns | `../docs/agents/web/senior-nextjs.md` |
| Cross-stack API↔Frontend contracts | `../.opencode/agents/cross-stack.md` |
| Style guide, design system | `../docs/agents/web/skills/STYLE_GUIDE.md` |
| API integration patterns | `../docs/agents/web/skills/INTEGRATION_GUIDE.md` |
| Form + Zod patterns | `../docs/agents/web/skills/FORMS_GUIDE.md` |
| i18n key validation pre-PR | `../.opencode/agents/i18n-key-validator.md` |
| System architecture, CodeGraph, vault | `../AGENTS.md` |
```

- [ ] `gaia-web/AGENT.md` atualizado com routing section

### 8. Atualizar routing em `gaia-web/CLAUDE.md`

O `CLAUDE.md` atual já referencia `docs/` local. Complementar com:

```markdown
## GAIA Ecosystem

This repo lives inside the GAIA monorepo at `GAIA/gaia-web/`.

**When you need context beyond this codebase:**
- Backend logic: `../gaia-api/`
- Cross-stack contract: OpenAPI schema at `https://api-dev.gaiametrics.com.br/api/schema`
- Domain knowledge: `../docs/vault/00-INDEX.md`
- Global skills: `../.agents/skills/`
- Agent routing: `../AGENTS.md`
```

- [ ] `gaia-web/CLAUDE.md` atualizado com ecosystem section

### 9. Garantir que CodeGraph shadow inclui gaia-web

O script `codegraph-global-sync.sh` varre `gaia-api` e `gaia-web` se existirem `.git/`. Ambos já residem no monorepo — confirmar que o sync está funcionando:

```bash
# Fora do monorepo? Clonar gaia-web para dentro de GAIA/
git clone git@github.com:anomalyco/gaia-web.git gaia-web

# Se já existe como subdiretório com .git/ próprio (sem ser subtree/submodule):
ls gaia-web/.git   # deve existir como diretório
```

**IMPORTANTE:** Se `gaia-web` era um clone independente e foi movido para dentro de `GAIA/`, o `.git/` permanece funcional. Se foi adicionado como `git submodule`, o shadow sync precisa de ajuste. O script atual (`codegraph-global-sync.sh`) verifica `[ -d "$nested/.git" ]` — funciona para ambos os casos.

- [ ] `gaia-web/.git/` existe dentro de GAIA
- [ ] `./.opencode/bin/codegraph-global-sync.sh` executado e funcionando
- [ ] `codegraph_context(projectPath="/tmp/opencode/shadow-codegraph-gaia", ...)` retorna símbolos de ambos gaia-api e gaia-web

### 10. Notas pós-deploy

- [ ] Commit das alterações nesta branch de migração
- [ ] Push para `origin develop`
- [ ] Rodar `./.opencode/bin/codegraph-global-sync.sh` para reconstruir índice shadow
- [ ] Rodar `bun install` no gaia-web (se skills-lock.json mudou)
- [ ] Rodar `python test_runner.py --settings=test_settings --keepdb` no gaia-api (se hooks afetaram)
- [ ] Informar ao time sobre a nova estrutura (usar `AGENTS.md` como referência)
- [ ] Remover `.claude/settings.local.json` do tracking se ainda não estiver no `.gitignore`

## O que NÃO muda

- Código Next.js (`gaia-web/src/`) — zero alteração
- `package.json`, dependências, `bun.lock` — zero alteração
- `next.config.ts`, `tsconfig.json`, `openapi-ts.config.ts`, `components.json` — zero alteração
- Workflow de branch (`develop → homolog → master`) — inalterado
- `bun dev`, `bun build`, `bun lint`, `bunx tsc --noEmit` — inalterado
- O `new-feature` skill continua funcionando exatamente igual (permanece local)

## O que GANHA

| Antes | Depois |
|---|---|
| `gaia-web` isolado — sem acesso a agentes compartilhados | Acesso cross-stack: `sustainability-specialist`, `cross-stack`, `software-architecture` |
| CodeGraph local apenas do frontend | CodeGraph shadow com gaia-api + gaia-web + docs do GAIA no mesmo índice |
| Hooks (block-generated, lint, typecheck) só no frontend | Hooks centralizados em `.opencode/bin/hooks/` — backend também se beneficia |
| `i18n-key-validator` escondido no `.claude/` do frontend | Agente disponível para todo o ecossistema |
| Skills duplicadas ou não sincronizadas | `skills-lock.json` apontando para skills globais + shadcn local |
| AGENT.md sem routing para o ecossistema | Routing table cross-repo completo |
| Dev frontend sem contexto do backend | CodeGraph shadow entrega contexto de ambas as stacks em uma chamada |
| Vault de conhecimento inacessível | `docs/vault/00-INDEX.md` acessível do frontend |
| Planilhas de referência (EIQ, STIR, BAT) invisíveis | `docs/references/domain/` disponível para agentes frontend |

## Verificação Final

```bash
# No raiz do GAIA após merge:
ls .opencode/agents/senior-nextjs.md                # Deve existir (proxy)
ls .opencode/agents/i18n-key-validator.md           # Deve existir
ls .opencode/bin/hooks/block-generated.sh           # Deve existir
ls .opencode/bin/hooks/eslint-fix.sh                # Deve existir
ls .opencode/bin/hooks/typecheck.sh                 # Deve existir
ls docs/agents/web/senior-nextjs.md                 # Deve existir (canonical)
ls docs/agents/web/skills/STYLE_GUIDE.md            # Deve existir
ls docs/agents/web/skills/INTEGRATION_GUIDE.md      # Deve existir
ls docs/agents/web/skills/FORMS_GUIDE.md            # Deve existir
ls .claude/agents/i18n-key-validator.md             # Deve existir (wrapper)
ls .claude/agents/senior-nextjs.md                  # Deve existir (wrapper)
ls .cursor/rules/gaia-agents.mdc                    # Deve existir
ls .github/copilot-instructions.md                  # Deve existir
ls docs/vault/00-INDEX.md                           # Deve existir
ls gaia-web/.git                                    # Deve existir (repo filho)
ls gaia-web/.agents/skills/                         # Deve estar populado

# Agentes do gaia-web com routing para o orquestrador:
grep -q "\.\.\/\.opencode" gaia-web/AGENT.md        # Deve ter routing section
grep -q "GAIA Ecosystem" gaia-web/CLAUDE.md          # Deve ter ecosystem section

# CodeGraph shadow com ambas as stacks:
codegraph status /tmp/opencode/shadow-codegraph-gaia 2>&1
# Deve mostrar files/nodes/edges > 0, e conter símbolos de gaia-web/

# Lint e build do frontend intactos:
cd gaia-web && bun lint && bun run build
```

## Referências

- Arquitetura harness-agnóstico: `AGENTS.md`
- Knowledge graph: `docs/vault/00-INDEX.md`
- Agent routing: `AGENTS.md` (seção Routing)
- Shadow sync: `.opencode/bin/codegraph-global-sync.sh`
- Canonical Next.js: `docs/agents/web/senior-nextjs.md`
- Referência ATYHA (análoga): `../ATYHA/docs/tasks/web/fe-migrate-atyha-workflow.md`
- Backend agent tree: `gaia-api/AGENTS.md`
- Hooks centralizados: `.opencode/bin/hooks/`
- Skills globais: `.agents/skills/`
