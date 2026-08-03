---
tags: [standards, architecture]
scope: gaia-web
status: draft
---

# Arquitetura — gaia-web

Blueprint canônico de camadas, fluxo de dependência e forma de módulo para o
frontend GAIA. Fundado em [`principles.md`](principles.md). Detalhe operacional de
"onde cada arquivo vai" está em [`project-structure.md`](project-structure.md);
este doc governa **as camadas e as fronteiras**, não a listagem de pastas.

## Camadas

```
app  →  features  →  domínio  →  services  →  client
                        │                        (gerado, read-only)
                     platform (seam de infra)
```

| Camada | Papel | Pode importar | NUNCA importa |
|--------|-------|---------------|---------------|
| `app/` | Shell fino: rota, params, um import de feature | features, shared | domínio, services, client |
| `features/` | UI + orquestração de um domínio | domínio, services, shared | client direto, outra feature |
| **domínio** | Regra de negócio pura, testável (schemas, mappers, tipos de UI) | shared | React, services, client |
| `services/` | Wrappers TanStack Query sobre o SDK | client | features, domínio |
| `client/` | SDK hey-api gerado | — | tudo (é folha) |
| `platform/` | Seam de vendor (auth, analytics, logger, config) | shared | features |

Fluxo unidirecional ([princípio 5](principles.md)). Camada de baixo nunca importa
de cima. Sem import cross-feature — sobe pra `shared`. Sem barrel files.

## Camada de domínio — DTO → modelo → mapper

Gap arquitetural nº1 (Relatório de Fundação): hoje tipos gerados crus vazam para
hooks e componentes, e a regra de negócio (LCA, RothC, regenerativo, carbono,
biodiversidade) mora dentro de `.tsx`/hooks. A camada de domínio corrige isso.

**Três peças, por feature, sem React:**

1. **DTO** — o tipo gerado em `client/` (`types.gen.ts`). Read-only, formato do
   backend. Nunca renderizado direto.
2. **Modelo de UI** — tipo próprio da feature, no vocabulário da tela
   (`<Feature>FormValues`, `<Feature>View`). É o que componente e form consomem.
3. **Mapper** — funções puras que traduzem nas duas direções:

   ```ts
   detailToFormValues(dto: FarmDetailDto): FarmFormValues   // API → UI
   valuesToCreateBody(values: FarmFormValues): FarmCreateDto // UI → API
   valuesToUpdateBody(values: FarmFormValues): FarmUpdateDto // UI → API
   ```

**Regras:**

- Mapper e schema vivem em `features/<domínio>/<sub>/schemas/` e `.../lib/` — **sem
  `import` de React**. É onde o teste do domínio ataca ([princípio 4](principles.md)).
- Componente recebe modelo de UI, nunca DTO. Se um `.tsx` referencia um tipo de
  `client/`, é bug de camada.
- Cálculo de sustentabilidade (fórmula LCA/RothC/regen) é domínio puro. Entra com
  teste ao portar — nunca colado do hook antigo.

> Já existe embrião disso em `features/*/modulo/schemas/` (mappers
> `detailToFormValues`, `valuesToCreateBody`). Consolidar, não reinventar.

## Regra de idioma por camada

[Princípio 8](principles.md). A fronteira PT/EN é a **camada**, não o arquivo:

| Onde | Idioma | Exemplo |
|------|--------|---------|
| Rotas de domínio (`app/`) | PT | `carbono-remocao/`, `regenerativo/` |
| Copy, i18n, labels | PT | `messages/pt.json` |
| Nomes de negócio visíveis | PT | "Fazenda", "Talhão" |
| `services/`, tipos, funções, vars | EN | `farms/`, `useGetFarm`, `FarmFormValues` |
| Camada de domínio (mapper, schema) | EN | `valuesToCreateBody` |

**Anti-padrão atual:** `features/fazenda/` (PT) chamando `services/farms/` (EN) é
correto — a fronteira caiu na camada. O que **não** pode: `farm` e `fazenda` como
variáveis no mesmo escopo. Ao portar, normalizar identificadores de código pra EN.

## Forma de módulo de feature

Feature em `src/features/<domínio>/`, **flat** (sem feature aninhada). Só as
subpastas que a feature usa:

```
features/<domínio>/
├── <sub>/                  (ex: modulo/, dashboard/)
│   ├── components/         UI da feature
│   ├── hooks/              use-<domínio>-<sub>.ts — estado, mutations, submit
│   ├── lib/                helpers puros (sem React)
│   ├── schemas/            Zod factory + mappers (camada domínio)
│   └── types/              tipos de UI explícitos
└── <domínio>-page.tsx
```

Detalhe e exemplos reais: [`project-structure.md`](project-structure.md) e
[`projeto-feature-architecture.md`](projeto-feature-architecture.md).

## Platform layer — estreito

Só **auth · analytics · logger · config/env · monitoring**. Feature nunca toca SDK
de vendor direto (ex: nunca `posthog.capture` direto — passa pelo wrapper).
**Rejeitado day-1:** feature-flags, cache, storage — YAGNI ([princípio 1](principles.md)),
entram quando um segundo consumidor real existir.

## Fronteiras a enforçar (Gate 3)

O fluxo unidirecional vira lint (Biome `noRestrictedImports`), espelhando o le-ko:

- `features/**` não importa de `app/`.
- shared (`components/`, `lib/`, `hooks/`, `utils/`, ...) não importa de `features/`
  nem `app/`.
- Nada importa `client/` fora de `services/` (hook `block-generated` cobre a edição;
  o lint cobre o import).

Especificação do tooling: Gate 3 (`libs-tooling.md`).
