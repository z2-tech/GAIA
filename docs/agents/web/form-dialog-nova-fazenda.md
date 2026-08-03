# Formulário em Dialog (padrão `nova-fazenda`)

Este guia documenta o padrão de formulário em modal/dialog usado em `src/features/projeto/components/nova-fazenda`.

## Objetivo

Padronizar formulários com:

- abertura/fechamento via `Dialog`;
- estado do formulário compartilhado com `FormProvider`;
- validação com Zod (`zodResolver`);
- submit assíncrono com mutation;
- reset seguro ao fechar.

---

## Arquivos envolvidos

```txt
src/features/projeto/components/nova-fazenda/
├── nova-fazenda.tsx        # Container do dialog + provider + integração do hook
├── nova-fazenda-form.tsx   # Composição das seções do formulário
├── dados-gerais.tsx        # Campos gerais
├── dados-tecnicos.tsx      # Campos técnicos
└── responsaveis-form.tsx   # Exemplo de lista dinâmica com useFieldArray
```

Suporte da feature:

```txt
src/features/projeto/hooks/use-nova-fazenda.ts
src/features/projeto/schemas/nova-fazenda.ts
src/features/projeto/types/nova-fazenda.ts
```

---

## Arquitetura do fluxo

1. `useNovaFazenda` cria `form` e retorna handlers (`onSubmit`, `resetForm`, `nextStep`, etc.).
2. `NovaFazenda` envolve o conteúdo com `FormProvider`.
3. `NovaFazenda` renderiza `FormDialog` e injeta props de controle (`open`, `onOpenChange`, `loading`, `formId`).
4. `NovaFazendaForm` compõe as seções de campos.
5. Seções (`DadosGerais`, `DadosTecnicos`) usam `useFormContext` para acessar `control`, `watch`, `setValue`.

---

## Exemplo base (container com Dialog)

```tsx
"use client"

import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { FormDialog } from "@/components/dialog/form-dialog"
import { useNovaFazenda } from "@/features/projeto/hooks/use-nova-fazenda"
import { NovaFazendaForm } from "./nova-fazenda-form"

export function NovaFazenda() {
  const [open, setOpen] = useState(false)

  const { form, onSubmit, resetForm, isPending } = useNovaFazenda({
    onSuccess: () => {
      setOpen(false)
      resetForm()
    },
  })

  const handleClose = () => {
    resetForm()
  }

  return (
    <FormProvider {...form}>
      <FormDialog
        title="Nova fazenda"
        buttonText="Nova fazenda"
        onSubmit={onSubmit}
        formId="nova-fazenda"
        onClose={handleClose}
        loading={isPending}
        open={open}
        onOpenChange={setOpen}
      >
        <NovaFazendaForm currentStep={1} />
      </FormDialog>
    </FormProvider>
  )
}
```

## Pontos importantes do padrão

- `FormProvider` no container evita passar `control` por props entre seções.
- `onSuccess` da mutation deve fechar o dialog e resetar o form.
- ao fechar manualmente, também executar reset para não reaproveitar estado antigo.
- `loading={isPending}` sincroniza estado visual do botão de submit.

---

## Exemplo de hook do formulário

```ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateFarm } from "@/services/farms/farms.mutation"
import { novaFazendaSchema, type NovaFazendaFormValues } from "../schemas/nova-fazenda"

export function useNovaFazenda(options?: { onSuccess?: () => void }) {
  const { mutateAsync: createFarm, isPending } = useCreateFarm()

  const form = useForm<NovaFazendaFormValues>({
    resolver: zodResolver(novaFazendaSchema),
    defaultValues: {
      nomeFazenda: "",
      cep: "",
      cidade: "",
      estado: "",
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
      areaTotal: "",
      areaAgricolaProdutiva: "",
      areaPreservacao: "",
      qtdTalhoes: "",
      qtdCulturasPorAno: "",
      usoEnergiaRenovavel: "",
      texturaSolo: "",
      responsaveis: [],
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await createFarm({
      body: {
        name: data.nomeFazenda,
        // ...mapeamento de payload
      },
    })

    options?.onSuccess?.()
  })

  return { form, onSubmit, isPending }
}
```

---

## Exemplo de seção com `useFormContext`

`DadosGerais` mostra um padrão importante: campo dependente entre `estado` e `cidade`.

```tsx
import { useFormContext } from "react-hook-form"
import { FormSelect } from "@/components/form/form-select"

export function DadosGerais() {
  const { control, setValue, watch } = useFormContext()
  const selectedStateId = watch("estado")

  return (
    <>
      <FormSelect
        control={control}
        name="estado"
        label="Estado"
        options={[]}
        onChange={() => setValue("cidade", "")}
      />
      <FormSelect
        control={control}
        name="cidade"
        label="Cidade"
        disabled={!selectedStateId}
        options={[]}
      />
    </>
  )
}
```

---

## Exemplo de lista dinâmica (`useFieldArray`)

No passo de responsáveis, o padrão permite adicionar itens dinamicamente:

```tsx
const { control } = useFormContext<NovaFazendaFormValues>()
const { fields, append } = useFieldArray({ control, name: "responsaveis" })

const handleAddResponsavel = () => {
  append(createEmptyResponsavel())
}
```

Use esse padrão quando o formulário precisar de listas de contatos, documentos, parcelas, etc.

---

## Boas práticas para novos formulários em Dialog

- manter `schema` separado em `schemas/*`;
- tipar o `useForm` com `z.infer` do schema;
- concentrar submit e mapeamento de payload no hook;
- usar `useFormContext` nas seções visuais;
- resetar o form ao fechar o dialog e após sucesso;
- expor apenas a API necessária do hook para a UI.
