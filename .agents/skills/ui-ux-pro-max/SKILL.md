---
name: ui-ux-pro-max
description: Guia de design e implementacao UI/UX para gaia-web (shadcn/ui New York + Tailwind v4). Use quando o usuario pedir criar, melhorar, revisar ou corrigir interfaces. Espelha o design-agent — regras GAIA vencem qualquer padrao generico.
---

# UI UX Pro Max — gaia-web

Skill de UI/UX ancorada no design-system GAIA. Espelha o `design-agent`.

**Fonte canonica (ler PRIMEIRO, vence refs externas):**
`docs/agents/web/design-system.md` + `docs/agents/web/principles.md`.
Padroes sao extraidos de codigo real — **reusar antes de criar**. Cada regra
abaixo ja tem componente ou classe no codebase.

## Quando ativar

- criar/restilizar tela, card, dialog, dashboard ou fluxo em `gaia-web/`
- revisar qualidade visual/UX
- ajustar layout, tipografia, estados, responsividade

## Regras GAIA-hard (design-agent)

1. **Penpot manda** (`docs/agents/design/`). Componente que falta nasce no Penpot e
   entra em `src/components/<grupo>/` com o mesmo nome. Reusar antes de criar.
2. **Shell**: `PageTemplate` (sidebar escura + `SidebarInset bg-muted rounded-l-xl`) →
   `AppHeader` (`title`, `linkTo`, `score`, `actions`) + `ContentTemplate` (`bg-muted p-6
   gap-6`).
3. **Tokens**: so classes semanticas. Status em texto = `*-subtle` +
   `*-subtle-foreground`. Grafico/mapa = `"var(--color-chart-N)"` com as constantes de
   serie existentes. Sem paleta crua, hex ou cor arbitraria (`bun lint:tokens`).
4. **Tipografia**: `Typography variant=display…mono` ou a classe `text-<variant>`.
   Nunca `text-xs/sm/base/lg/xl`.
5. **Botoes**: size padrao = `default` (h-9), nao declarar. `sm` em card/toolbar, `lg`
   so em CTA de largura total. `outline` = secundario com texto; `ghost` so icone,
   nunca com texto. Loading via prop `loading`.
6. **Radius**: `rounded-md` botao/input/badge, `rounded-lg` dialog, `rounded-xl` card.
   `rounded-full` so em avatar, ponto e barra de progresso.
7. **Componentes GAIA**: `BadgeStatus`, `BadgeScore`, `BadgeTrend`, `TopicFlag`,
   `IconChip`, `RadialProgress`, `ProgressRow`, `ChartLegend`, `KpiCard`,
   `SectionHeader`, `CardList`, `EmptyState`, `ModuleShell` + `ModuleStepper`.
8. **Dialog com form → sempre `FormDialog`** (nao fecha por clique fora; cancelar =
   `outline`; submit = `default` + `loading`). Campos via `Form*`.
9. **Estados**: loading = `Skeleton` na forma do conteudo; erro = mensagem + "Tentar
   novamente"; vazio = `EmptyState`. Tabela: `DataTable` (`loading`, `error`,
   `onRetry`).
10. **`"use client"`** obrigatorio em qualquer arquivo de feature/service que usa hooks.

### Proibido (design-system.md)

Cor crua/hex/arbitraria · tamanho de fonte cru · botao `ghost` com texto ·
`shadow-lg` fora de dialog/sheet · padding em `Card` E `CardContent` · importar
`src/client/` em page/feature · faltar `"use client"`.

## Qualidade visual (universal — fallback)

- Sem emojis como icone em UI de producao.
- Todo clicavel com feedback visual + `cursor-pointer` quando aplicavel.
- Transicoes suaves 150-300ms; sem animacao agressiva; sem shift de layout em hover/focus.
- Consistencia de espacamento e hierarquia tipografica.

## Acessibilidade (universal)

- Contraste texto normal ≥ 4.5:1. Foco sempre visivel.
- Nao depender so de cor para estado. Respeitar `prefers-reduced-motion`.
- Forms com labels claros e erros objetivos.

## Responsividade minima

Validar em 375px · 768px · 1024px · 1440px.

## Verificar

```bash
cd gaia-web && bun lint && bun lint:tokens && bun lint:boundaries && bun run build
```

## Entrega

- decisoes de design aplicadas (curtas)
- componentes alterados/criados
- riscos/pendencias
- checklist final marcada

## Refs externas

- shadcn/ui (New York, CSS vars) — https://ui.shadcn.com/docs
- Tailwind CSS v4 — https://tailwindcss.com/docs
