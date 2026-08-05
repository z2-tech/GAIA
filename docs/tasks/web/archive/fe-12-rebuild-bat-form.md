# FE-12 — Rebuild do form BAT (biodiversidade) para arquitetura padrão

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído (2026-08-05)
>
> **Nota:** Refactor 100% frontend concluído. Persistência real (item 5 do checklist)
> **adiada** — não existe endpoint BAT no `gaia-api` (nenhum app de biodiversidade,
> zero rotas no SDK). Mapper `valuesToCreateBody` pronto; `onSubmit` mantém toast-stub
> com `TODO(FE-12)`. Backend rastreado em **BE-05** (`api/active/be-05-modulo-biodiversidade.md`) —
> ao entregar, trocar o stub pela mutation real via `services/biodiversity/`.

## Problema

`src/features/biodiversidade/modulo/bat/components/bat-modulo-form.tsx` é um
componente monolítico fora do padrão de `forms.md`:

- `useForm` chamado dentro do componente (sem hook `use-bat-modulo.ts`).
- **Sem schema / sem `zodResolver`** → formulário não valida nada.
- Labels PT hardcoded inline (sem i18n).
- `onSubmit` só dispara um `toast` — **sem mapper e sem mutation, não persiste**.
- Feature não tem pasta `schemas/`.

## Solução (padrão `forms.md`)

- Criar `bat/schemas/bat-modulo.ts`: factory `createBatModuloSchema(t)`,
  `emptyBatFormValues()`, `valuesToCreateBody()`.
- Mover `useForm` para `bat/hooks/use-bat-modulo.ts` com `zodResolver`.
- Extrair labels/perguntas PT para i18n (chaves EN, valores PT/EN).
- Split `FormProvider` externo + section cards via `useFormContext` (sem passar `form` por prop).
- Wire de mutation real no service layer (não toast-stub).

## Checklist

- [x] `schemas/bat-modulo.ts` com factory + mappers
- [x] `hooks/use-bat-modulo.ts` com `useForm` + `zodResolver`
- [x] Labels → i18n (chrome + sr-only `answer-to-question`; 43 perguntas mantidas como
  const tipada por decisão de produto)
- [x] Componente split FormProvider + `useFormContext` (`BatSectionCard`)
- [ ] ~~Service mutation real (persiste)~~ **Adiado — bloqueado por BE-05** (sem endpoint)
- [x] `bunx tsc --noEmit` + `bun lint` limpos

## Refs

- doc: `docs/agents/web/forms.md`, `form-template.md`
- files: `gaia-web/src/features/biodiversidade/modulo/bat/`
