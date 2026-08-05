# FE-17 — EN migration: rotas + params dinâmicos

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Sub-card do épico **FE-10** (PT→EN). Fazer como **1 PR mecânico dedicado** —
> toca URLs e call sites globais; misturar com lógica = inferno de merge.

## Escopo

Renomear todos os segmentos de rota e params dinâmicos em `src/app/(private)/`
para inglês (principle 8). ~22 segmentos + 3 params.

| PT atual | EN alvo |
|----------|---------|
| `projetos/[projetoId]` | `projects/[projectId]` |
| `.../fazenda/[fazendaId]` | `.../farm/[farmId]` |
| `carbono-remocao` | `carbon-removal` |
| `carbono-emissao` | `carbon-emission` |
| `regenerativo` | `regenerative` |
| `biodiversidade` | `biodiversity` |
| `recuperar-senha` | `recover-password` |
| `[calculoId]` | `[calculationId]` |
| `modulo` / `resultado` / `calculo` | `module` / `result` / `calculation` |

> **Decisão:** manter `projetos` (lista) e `projeto` (single) como features
> **separadas** — não criar rota `projects/project/[id]`. Só renomear cada uma.

## Checklist

- [x] Renomear pastas de rota + `[param]` para EN (kebab segments, camelCase params) — `git mv`, `(private)` + `(auth)`, `carbono/` vazio removido
- [x] Atualizar todo `useParams<{...}>()` (nomes dos params) — `projetoId→projectId`, `fazendaId→farmId`, `calculoId→calculationId` (0 residual)
- [x] Atualizar todo `Link href` / `router.push` / `basePath` string — incl. `proxy.ts`, sidebar, `menu.ts` slugs (0 residual)
- [x] Grep por strings de rota PT residuais (`fazenda`, `carbono`, `projeto`) — limpo
- [x] `bun run build` (checa rotas + tipos) — ✅ passa

> **Notas de execução:**
> - Corrigido `use-lca-modulo.ts`: rename colidiu com shim PT→EN existente (`const projectId = Number(projetoId)`); params crus renomeados p/ `*Param`.
> - **Fora do escopo original, corrigido a pedido:** WIP não-commitado de `src/features/regenerative/` (sub-card de rename de feature FE-10) tinha ~14 imports relativos PT quebrados (`./topicos`, `../types/regenerativo-modulo-form`, etc.) que travavam o build. Paths corrigidos p/ os arquivos EN reais; símbolos exportados seguem PT (fora do escopo deste card).

## Refs

- doc: `docs/agents/web/naming-conventions.md` (Routes), `principles.md` (P8)
- épico: FE-10
