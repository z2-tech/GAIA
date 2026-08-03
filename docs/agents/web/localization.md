# Localization

> next-intl powers translations. The app supports Portuguese (pt-BR, primary) and English (en). `Accept-Language` is injected automatically in every API request via the HTTP client config.

## File layout

```
messages/
├── pt.json    # Portuguese — primary locale and source of truth for key shape
└── en.json    # English — secondary locale

src/i18n/      # next-intl configuration
```

Both files are deeply-nested JSON objects. Top-level keys are domain namespaces; nested keys are camelCase identifiers.

## Key conventions

Top-level keys: camelCase matching the domain.

```json
"routhC": {
  "toast": { "calculateSuccess": "Cálculo realizado!", "calculateError": "Erro ao calcular." },
  "validation": { "nameRequired": "Nome obrigatório.", "latitudeInvalid": "Latitude inválida." },
  "monthly": { "dpmRpmRequired": "Campo obrigatório." }
}
```

Nested keys: camelCase. Add to **both** files — always both.

## Using translations in components

```tsx
"use client"
import { useTranslations } from "next-intl"

export function MyComponent() {
  const t = useTranslations("routhC.toast")
  return <p>{t("calculateSuccess")}</p>
}
```

Scope the hook to the narrowest useful namespace so key paths stay short. Multiple scoped hooks in one component is fine:

```ts
const t = useTranslations("routhC")
const validationT = useTranslations("routhC.validation")
const schema = createRouthCModuloSchema(validationT)
```

## Schema validation messages

Always use the factory pattern so Zod error messages are translatable. Pass `useTranslations("domain.validation")` to the schema factory:

```ts
// schema file — accepts Translate, no next-intl import
type Translate = (key: string) => string
export function createMyFeatureSchema(t: Translate) {
  return z.object({
    name: z.string().min(1, { message: t("nameRequired") }),
  })
}

// hook — passes the scoped translator
const validationT = useTranslations("myFeature.validation")
const schema = createMyFeatureSchema(validationT)
```

## Locale-dependent API requests

`Accept-Language` is set automatically by the fetch wrapper in `src/lib/api/hey-api.ts` — it reads the `locale` cookie managed by next-intl. No action needed per query/mutation hook unless overriding for a specific endpoint.

## Mutation toasts

Mutation feedback strings live under `<domain>.toast`:

```json
"routhC": {
  "toast": {
    "calculateSuccess": "Cálculo realizado com sucesso!",
    "calculateError": "Não foi possível realizar o cálculo."
  }
}
```

In the service hook:

```ts
const t = useTranslations("routhC.toast")
onSuccess: () => toast.success(t("calculateSuccess")),
onError: (error) => toast.error(handleApiError(error, t("calculateError"))),
```

## Farm tab menu

Tab labels live under `"fazendaMenu"`:

```json
"fazendaMenu": {
  "generalData": "Dados Gerais",
  "carbonoRemocao": "Carbono — Remoção",
  "regenerativo": "Regenerativo"
}
```

## Adding a translation

1. Pick the namespace. New phrase scoped to a feature → that feature's namespace. Reusable label → `"common"`.
2. Add the camelCase key + Portuguese value to `messages/pt.json`.
3. Add the same key + English value to `messages/en.json`.
4. If the key is used in a Zod schema, add it under `<domain>.validation` and pass the translator to the schema factory.
5. **Never use AI-generated translations.** Devs commit English copy in `en.json`; a professional translator handles Portuguese for important copy, but dev-written Portuguese is acceptable for internal/admin UI.

## Common patterns

```json
// Reusable labels under "common"
"common": {
  "dialog": { "save": "Salvar", "close": "Fechar", "back": "Voltar" },
  "loading": "Carregando...",
  "error": "Ocorreu um erro."
}

// Feature toast
"<feature>": {
  "toast": { "saveSuccess": "...", "saveError": "..." }
}

// Zod validation messages
"<feature>": {
  "validation": { "<field>Required": "...", "<field>Invalid": "..." }
}
```
