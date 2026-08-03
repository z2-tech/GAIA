# FE-12 — Rebuild do form BAT (biodiversidade) para arquitetura padrão

> **Prioridade:** Alta | **Assignee:** — | **Status:** ⬜ Pendente

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

- [ ] `schemas/bat-modulo.ts` com factory + mappers
- [ ] `hooks/use-bat-modulo.ts` com `useForm` + `zodResolver`
- [ ] Labels → i18n (`messages/pt.json` + `en.json`)
- [ ] Componente split FormProvider + `useFormContext`
- [ ] Service mutation real (persiste)
- [ ] `bunx tsc --noEmit` + `bun lint` limpos

## Refs

- doc: `docs/agents/web/forms.md`, `form-template.md`
- files: `gaia-web/src/features/biodiversidade/modulo/bat/`
