# Forms

> React Hook Form drives form state; Zod defines the schema and validates input. The two are joined via `@hookform/resolvers/zod`. Translated error messages come from next-intl.

## Schema file pattern

Schemas live in `<feature>/modulo/schemas/<feature>-modulo.ts`. Always use the factory pattern so validation messages are translatable:

```ts
// src/features/carbono-remocao/modulo/schemas/routh-c-modulo.ts
type Translate = (key: string) => string

export function createRouthCModuloSchema(t: Translate) {
  return z.object({
    name: z.string().min(1, { message: t("nameRequired") }),
    latitude: z.string().min(1, { message: t("latitudeRequired") })
      .refine((v) => !Number.isNaN(parseSignedDecimal(v)), { message: t("latitudeInvalid") }),
    // ...
  })
}

export type RouthCModuloFormValues = z.infer<ReturnType<typeof createRouthCModuloSchema>>
```

The `Translate = (key: string) => string` type alias keeps the schema file free of next-intl imports — the caller passes `useTranslations(...)`.

### Enum constants

Use `as const` arrays, not TypeScript enums:

```ts
export const monthlyInputModeValues = ["biomass", "productivity_crop"] as const
export type MonthlyInputMode = (typeof monthlyInputModeValues)[number]

// in schema:
monthly_input_mode: z.enum(monthlyInputModeValues, { message: t("monthlyInputModeRequired") })
```

### Mapper functions

Each schema file exports mapper helpers that convert between form values and API payloads:

```ts
export function emptyRouthCModuloFormValues(): RouthCModuloFormValues { ... }
export function detailToFormValues(data: ApiType): RouthCModuloFormValues { ... }
export function valuesToCreateBody(values: RouthCModuloFormValues): CreateBody { ... }
```

Never pass form values directly to a mutation — always map through these helpers.

## Form setup

Form logic lives in a dedicated hook: `src/features/<domain>/modulo/hooks/use-<domain>-modulo.ts`.

```ts
const t = useTranslations("routhC")
const validationT = useTranslations("routhC.validation")
const schema = createRouthCModuloSchema(validationT)

const form = useForm<RouthCModuloFormValues>({
  resolver: zodResolver(schema),
  defaultValues: defaultValues(),
})
```

### Edit mode (loading existing data)

For forms that load from the server (edit screens), use `queryClient.ensureQueryData` in `defaultValues` to reuse the existing cache:

```ts
const form = useForm<FormValues>({
  defaultValues: async () => {
    const data = await queryClient.ensureQueryData(getMyThingOptions({ path: { id } }))
    if (!data) return emptyFormValues()
    return detailToFormValues(data)
  },
  resolver: zodResolver(schema),
})
```

### Multi-step form persistence

For long multi-step forms, persist state to `sessionStorage` with a 300ms debounce so the user doesn't lose progress on refresh:

```ts
const storageKey = `<feature>-modulo:${projetoId}:${fazendaId}`

// persist on every watch change
const formValues = useWatch({ control: form.control })
useEffect(() => {
  if (!hydrated) return
  persistTimerRef.current = setTimeout(() => {
    sessionStorage.setItem(storageKey, JSON.stringify({ formValues: form.getValues(), currentStep }))
  }, 300)
}, [formValues, currentStep, hydrated])

// hydrate on mount (SSR-safe — only runs on client)
useEffect(() => {
  try {
    const raw = sessionStorage.getItem(storageKey)
    if (raw) form.reset(JSON.parse(raw).formValues)
  } catch { /* ignore */ }
  setHydrated(true)
}, [storageKey])
```

## Watching and setting values

Watch with `useWatch` for derived UI:

```ts
const monthlyMode = useWatch({ control: form.control, name: "monthly_input_mode" })
```

Set with explicit flags so dirty/touched/validate state stays accurate:

```ts
form.setValue("dados_mensais", merged, {
  shouldDirty: true,
  shouldTouch: true,
})
```

## Submission

`form.handleSubmit` takes a valid handler and an optional invalid handler. For complex multi-step forms, validate only the current step's fields before advancing:

```ts
const isValid = await form.trigger([
  "name",
  "start_year_modeling",
  "parametros_projeto.latitude",
  // ...
])
if (!isValid) return
```

For cross-field or array-level errors not expressible in Zod, use `form.setError`:

```ts
form.setError(`dados_mensais.${index}.dpm_rpm`, { message: t("monthly.dpmRpmRequired") })
```

### Error handling on submit

```ts
const onSubmitFinal = form.handleSubmit(async (values) => {
  const payload = valuesToCreateBody(values)
  await calculateRouthC({ body: payload })
})
```

If the backend returns a `validation-error` response, apply field errors via `applyValidationErrors` from `src/lib/errorHandlers.ts`:

```ts
onError: (error) => {
  const applied = applyValidationErrors(error, form.setError, form.getValues())
  if (!applied) toast.error(handleApiError(error, t("saveError")))
}
```

## Form component pattern

```tsx
// Outer: loading/error guard
export function ModuloForm() {
  const data = useMyFeatureModuloData()
  if (data.isLoading) return <p>{t("common.loading")}</p>
  if (data.isError) return <p>Erro</p>
  return <ModuloFormInner {...data} />
}

// Inner: FormProvider + form content
function ModuloFormInner(props: MyFeatureModuloDataResult) {
  const { form, onSubmit } = useMyFeatureModuloForm(props)
  return (
    <FormProvider {...form}>
      <form id={FORM_ID} onSubmit={onSubmit}>
        <SectionCard />
      </form>
      <Button form={FORM_ID} type="submit">Salvar</Button>
    </FormProvider>
  )
}
```

Sub-components use `useFormContext` — never receive `form` as a prop:

```tsx
function MySectionCard() {
  const { control } = useFormContext<MyFeatureFormValues>()
  return <FormInput control={control} name="field" label={t("field")} />
}
```

## Available form field components (`src/components/form/`)

| Component | Use for |
|---|---|
| `FormInput` | Text input, optional addons |
| `FormNumberInput` | Brazilian locale numbers (`1.234,56`) |
| `FormSelect` | Radix select dropdown |
| `FormCombobox` | Searchable dropdown (cmdk) |
| `FormCheckbox` | Boolean checkbox |
| `FormDatePicker` | Date with DD/MM/YYYY mask + calendar popover |
| `FormTextarea` | Multi-line text |
| `FormDropzone` | File upload (single or multi), with existing-file preview |

All accept `{ control, name, label }` as base props.

## Adding a new form

1. Create Zod schema factory in `<feature>/modulo/schemas/<feature>-modulo.ts`. Export `create<Feature>Schema`, `empty<Feature>FormValues`, `detailToFormValues`, `valuesToCreateBody`.
2. Derive the form values type: `type <Feature>FormValues = z.infer<ReturnType<typeof create<Feature>Schema>>`.
3. Build the form hook in `<feature>/modulo/hooks/use-<feature>-modulo.ts`. It owns `useForm`, `useTranslations`, mutations, and `onSubmit`.
4. Map form values → API payload inside `onSubmit` via the mapper helpers. Never pass raw form values to `mutateAsync`.
5. For edit mode, load defaults via `queryClient.ensureQueryData`.
6. If the form is multi-step or long-lived, add `sessionStorage` persistence.
