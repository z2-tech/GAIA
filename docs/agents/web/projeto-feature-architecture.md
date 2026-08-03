# Arquitetura da Feature `projeto`

Este documento descreve o padrão de arquitetura usado em `src/features/projeto`, com foco na divisão por responsabilidade entre `components`, `hooks`, `schemas` e `types`.

## Objetivo da arquitetura

A feature é organizada para separar:

- **UI** e composição visual (`components`);
- **estado/fluxo de uso** (`hooks`);
- **regras de validação e contratos de formulário** (`schemas`);
- **tipos de domínio e opções de hooks** (`types`).

Com isso, os componentes ficam mais simples, a lógica de negócio fica reaproveitável e a validação permanece centralizada.

---

## Estrutura de pastas

```txt
src/features/projeto/
├── components/
│   ├── header.tsx
│   ├── lista-fazendas.tsx
│   └── nova-fazenda/
│       ├── nova-fazenda.tsx
│       ├── nova-fazenda-form.tsx
│       ├── dados-gerais.tsx
│       ├── dados-tecnicos.tsx
│       └── responsaveis-form.tsx
├── hooks/
│   ├── use-projeto.ts
│   ├── use-nova-fazenda.ts
│   └── use-search-fazenda.ts
├── schemas/
│   └── nova-fazenda.ts
└── types/
    └── nova-fazenda.ts
```

---

## Responsabilidade por camada

## `components/`

Camada de apresentação e composição:

- Renderiza campos, grids e seções;
- Lê e escreve estado do form via `useFormContext`;
- Não concentra regras de conversão/submit (isso fica no hook).

Exemplo: `nova-fazenda-form.tsx` compõe `DadosGerais` + `DadosTecnicos` e decide quando mostrar `ResponsaveisForm`.

## `hooks/`

Camada de orquestração da feature:

- Inicializa `useForm` com `zodResolver`;
- Controla passo atual, navegação e submit;
- Conecta mutações/queries de serviço;
- Expõe API limpa para os componentes.

No `use-nova-fazenda`, a lógica de form e submit fica centralizada, enquanto `NovaFazenda` só consome `form`, `onSubmit`, `isPending` e handlers de fluxo.

## `schemas/`

Fonte única de verdade para validação:

- Define schema Zod dos blocos (`fazendaSchema`, `responsavelItemSchema`);
- Faz composição de schema (`novaFazendaSchema`);
- Exporta tipos inferidos (`z.infer`);
- Exporta conjuntos de campos para validação parcial por etapa (`fazendaFields`).

## `types/`

Tipos de domínio e contratos complementares:

- Enums/unions do backend (`RenewableEnergyUsage`, `SoilTexture`);
- Tipos de configuração dos hooks (`UseNovaFazendaOptions`).

Esses tipos evitam strings soltas e deixam casts explícitos no momento de mapear payload.

---

## Fluxo padrão na feature

1. `schemas/nova-fazenda.ts` define validação e tipos base do formulário.
2. `hooks/use-nova-fazenda.ts` cria form, valida por etapa e envia payload para `useCreateFarm`.
3. `components/nova-fazenda/*.tsx` renderizam cada seção e usam `useFormContext`.
4. `components/nova-fazenda/nova-fazenda.tsx` integra tudo com `FormProvider` e `FormDialog`.

---

## Exemplos de hooks

## `useProjeto`

Hook simples de leitura de projeto atual, baseado no `id` da rota:

```ts
import { useGetProjectById } from "@/services/projects/projects.query"
import { useParams } from "next/navigation"

export function useProjeto() {
  const { id: projectId } = useParams<{ id: string }>()
  const { data: projeto, isLoading, isError } = useGetProjectById(projectId)

  return { projeto, isLoading, isError }
}
```

Quando usar:

- telas que precisam carregar o projeto corrente;
- componentes que dependem de loading/error padronizados.

## `useNovaFazenda`

Hook de orquestração de formulário:

- cria `useForm` com `novaFazendaSchema`;
- controla etapas (`currentStep`, `nextStep`, `prevStep`);
- valida por etapa com `form.trigger(...)`;
- converte os campos antes de enviar (`onlyNumbers`, `parseDecimal`);
- chama `onSuccess` externo quando a mutação conclui.

Esse padrão concentra regra de negócio no hook e reduz acoplamento da UI.

## `useSearchFazenda` (estado compartilhado)

Na feature existe um estado global local (`Jotai`) para busca:

```ts
import { atom } from "jotai"

export const searchFazendaAtom = atom<string>("")
```

É útil para sincronizar filtros de texto entre componentes sem prop drilling.

---

## Checklist para novas subfeatures

- manter `schemas` como origem da validação;
- exportar tipos via `z.infer` no schema e tipos de domínio em `types`;
- centralizar submit e mapeamento para API em hook;
- usar componentes de seção pequenos e coesos;
- integrar a tela principal com `FormProvider` (quando houver formulário).
