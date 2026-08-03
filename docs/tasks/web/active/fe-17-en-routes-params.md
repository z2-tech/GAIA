# FE-17 — EN migration: rotas + params dinâmicos

> **Prioridade:** Alta | **Assignee:** — | **Status:** ⬜ Pendente
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

- [ ] Renomear pastas de rota + `[param]` para EN (kebab segments, camelCase params)
- [ ] Atualizar todo `useParams<{...}>()` (nomes dos params)
- [ ] Atualizar todo `Link href` / `router.push` / `basePath` string
- [ ] Grep por strings de rota PT residuais (`fazenda`, `carbono`, `projeto`)
- [ ] `bun run build` (checa rotas + tipos)

## Refs

- doc: `docs/agents/web/naming-conventions.md` (Routes), `principles.md` (P8)
- épico: FE-10
