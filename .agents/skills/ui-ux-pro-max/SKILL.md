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

1. **Layout**: conteudo de feature em `ContentTemplate` (`gap-6` incluso). Shell =
   `PageTemplate` → header (`bg-white h-16`) + `ContentTemplate`.
2. **Cards**: base `rounded-2xl border p-6 bg-card`. Listagem standalone → `shadow-sm`;
   card interno → `border` so, sem shadow. Nunca `p-6` em `Card` E `CardContent`.
   Titulo com icone → sempre `CardTitleIcon`. Listagens → `CardLista`.
3. **Tipografia**: H1 pagina `text-xl font-semibold text-gray-900`; titulo card/secao
   `text-base font-semibold text-foreground`; corpo `text-sm`; secundario
   `text-sm text-muted-foreground`. Sem `text-gray-*` para texto semantico — usar
   `text-foreground`/`text-muted-foreground`/`text-destructive`.
4. **Botoes**: size default = `lg` — **nao setar `size` salvo se diferente**.
   `default`=primario/submit, `outline`=secundario, `destructive`=irreversivel,
   `link`=cancelar/voltar em dialog, `ghost`=icone de nav. Loading via prop `loading`.
5. **Badges**: status → `BadgeProjetoStatus`; progresso → `BadgePorcentagem` (cor auto).
   Nunca hardcode cor de status-badge fora dos componentes `Badge*`.
6. **Cores semanticas**: success=green, warning=yellow, info=blue, error=red;
   `text-*-500`/`bg-*-50` para badge bordado, `text-*-600`/`bg-*-200` para solido.
7. **Dialog com form → sempre `FormDialog`** (sem fechar por clique fora; cancel =
   `variant="link"`; submit = `default` + `loading`).
8. **Loading/empty**: texto loading `text-muted-foreground`; imagens → `Skeleton`;
   estado vazio → `EmptyPage` (lottie + titulo + descricao).
9. **Radius**: cards/containers `rounded-2xl`, botoes `rounded-full`, imagens
   `rounded-xl`, badges/avatars `rounded-full`.
10. **`"use client"`** obrigatorio em qualquer arquivo de feature/service que usa hooks.

### Proibido (design-system.md)

`shadow-lg` em card interno · importar `src/client/` em page/feature · cor de
status-badge hardcoded · `p-6` duplo (Card + CardContent) · `text-gray-*` para texto
semantico · faltar `"use client"`.

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
cd gaia-web && bun lint && bun run build
```

## Entrega

- decisoes de design aplicadas (curtas)
- componentes alterados/criados
- riscos/pendencias
- checklist final marcada

## Refs externas

- shadcn/ui (New York, CSS vars) — https://ui.shadcn.com/docs
- Tailwind CSS v4 — https://tailwindcss.com/docs
