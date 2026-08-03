# Design System — GaiaMetrics Web

Padrões extraídos do código real. Seguir antes de criar qualquer componente visual.

---

## Layout de Página

```
PageTemplate (sidebar + SidebarInset bg-gray-900)
└── div.flex-1.flex.flex-col.overflow-hidden.rounded-2xl
    ├── Header (bg-white h-16 px-6 border-b)
    └── ContentTemplate (flex-1 p-6 bg-gray-100 flex flex-col gap-6 overflow-hidden)
        └── [feature content]
```

**ContentTemplate** — sempre usar como wrapper do conteúdo da feature:
```tsx
<ContentTemplate>
  {/* gap-6 entre seções já está incluso */}
</ContentTemplate>
```

---

## Cards

### Card padrão (shadcn)
Base: `bg-card text-card-foreground flex gap-6 rounded-2xl border p-6`

```tsx
// Card simples com conteúdo
<Card>...</Card>

// Card vertical com título com ícone
<Card className="flex-col gap-6">
  <CardTitleIcon Icon={Leaf} title="Título" />
  ...
</Card>

// Card compacto
<Card className="p-4">...</Card>

// Card de formulário em grid
<Card className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
  <FormSelect ... />
</Card>
```

### Card de lista (CardLista)
Usado em listagens de projetos, fazendas — barra lateral colorida à esquerda.
```tsx
<CardLista
  id={id}
  name={name}
  nameLabel="Label do nome"
  link="/rota"
  buttonText="Ver item"
  progresso={50}
  colunas={[
    { title: "Campo", content: valor },
  ]}
/>
```
Internamente: `min-h-[160px] rounded-2xl p-0 flex gap-4 overflow-hidden` + barra `w-2 h-full bg-primary`

### Card de conteúdo inline (sem componente)
Para cards em dashboards/listagens sem usar `<Card>`:
```tsx
<div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm lg:flex-row lg:items-start lg:gap-10">
```
> `shadow-sm` apenas em cards de listagem standalone. Cards internos usam `border` sem sombra.

### Seção com título + Card (padrão mais comum)
```tsx
<div className="space-y-2">
  <p className="text-base font-semibold">{título}</p>
  <Card className="...">
    ...
  </Card>
</div>
```

---

## Tipografia

| Uso | Classes |
|---|---|
| Título de página (H1 no Header) | `text-xl font-semibold text-nowrap text-gray-900` |
| Título de card/seção | `text-base font-semibold text-foreground` |
| Título de seção simples | `text-base font-semibold` |
| Título de estado vazio | `text-2xl font-semibold text-center` |
| Nome em CardLista | `font-semibold text-lg` |
| Corpo padrão | `text-sm` |
| Corpo com cor secundária | `text-sm text-muted-foreground` |
| Label de campo (acima de input) | `text-sm font-medium` |
| Sub-label / rótulo de coluna | `text-xs text-muted-foreground` ou `text-xs text-gray-400` |
| Rótulo do nome no CardLista | `text-xs text-gray-500` |
| Descrição de estado vazio | `text-base text-center` |
| Texto de loading | `text-muted-foreground` |

---

## Espaçamento

| Contexto | Classe |
|---|---|
| Entre seções no ContentTemplate | `gap-6` (já no ContentTemplate) |
| Entre título e card de seção | `space-y-2` |
| Entre itens dentro de card | `gap-6` |
| Entre campos de formulário inline | `gap-6` |
| Entre label e conteúdo em coluna | `gap-2` |
| Agrupamento compacto | `space-y-3` |

---

## Botões

Tamanho padrão é `lg` (h-10, rounded-full, px-6). **Não especificar `size` a menos que seja diferente do padrão.**

| Variante | Quando usar |
|---|---|
| `default` (omitir) | Ação primária, submit de form |
| `outline` | Ação secundária, filtros, anos não ativos |
| `primaryOutline` | Ação secundária com cor primária |
| `destructive` | Deletar, ação irreversível |
| `link` | Cancelar, voltar em dialogs |
| `ghost` | Ícones de navegação (back button no Header) |
| `input` | Trigger de selects/comboboxes |

```tsx
// Ação primária
<Button>Salvar</Button>

// Ação secundária
<Button variant="outline">Cancelar</Button>

// Tamanho pequeno (ex: chips de ano)
<Button size="sm" variant="outline">2023</Button>

// Com loading
<Button loading={isPending}>Salvar</Button>

// Ícone
<Button variant="ghost" size="icon"><ChevronLeft /></Button>
```

---

## Badges

### BadgePorcentagem
Exibe progresso com cor automática baseada no valor:
```tsx
<BadgePorcentagem valor={projeto.completion_percentage} />
```
Escala de cores: `0%` = cinza · `<30%` = vermelho · `≤70%` = amarelo · `>70%` = verde

### BadgeProjetoStatus
```tsx
<BadgeProjetoStatus status={projeto.status} />
```
Cores por status: `under-audit` = amarelo · `completed` = verde · `in-progress` = azul · `pending` = vermelho

### Badge customizado
```tsx
// Sempre usar variant="secondary" + override de cor
<Badge variant="secondary" className="border w-fit px-4 text-green-500 border-green-500 bg-green-50">
  Texto
</Badge>
```

---

## Cores Semânticas

| Significado | Texto | Border | Background |
|---|---|---|---|
| Sucesso / Concluído | `text-green-500` ou `text-green-600` | `border-green-500` | `bg-green-50` ou `bg-green-200` |
| Atenção / Em auditoria | `text-yellow-500` ou `text-yellow-600` | `border-yellow-500` | `bg-yellow-50` ou `bg-yellow-200` |
| Info / Em andamento | `text-blue-500` | `border-blue-500` | `bg-blue-50` |
| Erro / Pendente | `text-red-500` ou `text-red-600` | `border-red-500` | `bg-red-50` ou `bg-red-200` |
| Desabilitado / Neutro | `text-muted-foreground` | — | `bg-muted/70` |
| Destructive (sistema) | `text-destructive` | — | — |

> Preferir `text-*-500`/`bg-*-50` em badges com border. Usar `text-*-600`/`bg-*-200` em badges sólidos (BadgePorcentagem).

---

## Dialogs

Sempre usar `FormDialog` para dialogs com formulário:
```tsx
<FormDialog
  title="Título do dialog"
  buttonText="Abrir"
  formId="meu-form"
  onSubmit={handleSubmit}
  submitText="Salvar"
  loading={isPending}
>
  {/* campos do form */}
</FormDialog>
```

Regras:
- Dialog não fecha ao clicar fora (`onInteractOutside` bloqueado)
- Botão cancelar/voltar = `variant="link"`
- Botão submit = `default`, com `loading` prop

---

## Estados de Loading e Vazio

### Loading de texto
```tsx
<div className="text-muted-foreground">{t("loading")}</div>
```

### Loading de imagem com skeleton
```tsx
<div className="relative w-[100px] h-full rounded-xl overflow-hidden">
  {isLoading && <Skeleton className="absolute inset-0 rounded-xl" />}
  <Image ... onLoad={() => setIsLoading(false)} />
</div>
```

### Estado vazio
```tsx
<EmptyPage
  animationLink="/animations/check-list.lottie"
  title={t("empty-title")}
  description={t("empty-description")}
/>
```

---

## Ícones em Card Title

```tsx
// CardTitleIcon: ícone pequeno (size-2) em círculo (size-6) com cor blue-400
<CardTitleIcon Icon={Leaf} title="Título do Card" />
```

Internamente usa `size-6 rounded-full bg-blue-0` + `Icon size-2 text-blue-400`.  
Não criar variações — usar `CardTitleIcon` sempre que card precisar de ícone no título.

---

## Border Radius

| Elemento | Radius |
|---|---|
| Card / container principal | `rounded-2xl` |
| Botão padrão (`lg`, `sm`) | `rounded-full` |
| Botão `default` size | `rounded-md` |
| Imagem em card | `rounded-xl` |
| Área de anos/muted | `rounded-xl` |
| Badge | `rounded-full` |
| Avatar | `rounded-full` |
| Chip de ano (inline) | `rounded-md` |

---

## Padrões Proibidos

- ❌ `shadow-lg` em cards internos (só `shadow-sm` em cards standalone de listagem)
- ❌ Importar de `src/client/` diretamente em páginas ou features
- ❌ Criar badge de status com cor hardcoded fora dos componentes `Badge*`
- ❌ Usar `p-6` em Card e adicionar `p-6` no `CardContent` — um ou outro
- ❌ `text-gray-*` para texto semântico — usar `text-muted-foreground`, `text-foreground`, `text-destructive`
- ❌ Omitir `"use client"` em qualquer arquivo de feature/service que use hooks
