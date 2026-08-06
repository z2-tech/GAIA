# FE-22 — Rotear chamadas SDK via services (remover leaks `@/client`)

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído (2026-08-06)
>
> Implementado em `gaia-web` branch `develop` (não commitado).

## Problema

Features e uma page importam factories/SDK de `@/client` direto, furando a regra
de 3 camadas (`architecture.md`: só `services/` toca `client/`).

Os caminhos abaixo são os reais na `develop` — o card original citava os nomes
pré-FE-17/18 (`regenerativo/modulo`, `usuarios/`), renomeados para EN desde então.

| Local | Leak |
|-------|------|
| `features/users/hooks/use-create-user.ts:7` | `userRoles2Mutation` inline (dup de `services/auth/authz.mutation.ts`) |
| `features/login/hooks/use-login.ts:6` | `loginUserMutation` — não existia hook de service |
| `features/regenerative/module/hooks/use-regenerative-module-form.ts:10-13` | `getRegenerativeAssessmentByFarmQueryKey` + `getRegenerativeAssessmentDetailQueryKey` |
| `app/(private)/users/page.tsx:13` | `listUsersQueryKey` (o `import type { UserList }` é type-only, ficou) |

## Solução

- Criar/usar hooks de service (`useAssignRole` parametrizando `user_id`, etc).
- Page invalida via hook/service, não importando `*QueryKey` de `@/client`.
- `import type` de `types.gen` continua OK (type-only).

### O que foi implementado

**Services (novos hooks):**

- `services/auth/auth.mutation.ts` → `useLoginUser(options?)`. Os callbacks continuam
  **hook-level** via passthrough tipado a partir da factory gerada
  (`Omit<ReturnType<typeof loginUserMutation>, "mutationFn">`). Isso importa: o TanStack
  Query **não** dispara callbacks passados no `mutate()` se o componente desmontar antes
  da resposta — no login, isso significaria pular o `setTokens`.
- `services/auth/authz.mutation.ts` → `useAssignRoles({ userId, roleNames })` — atribui N
  perfis com `Promise.allSettled`, sem toast por perfil, para o fluxo de cadastro (o
  `user_id` só existe depois do registro). `useAssignRole(userId)` / `useRemoveRole(userId)`
  ficaram intactos.
  Usa `throwOnError: true`: o `userRoles2` gerado tem `ThrowOnError = false` por padrão e
  resolveria com objeto de resultado, fazendo todo promise cumprir e o check de falha
  parcial nunca disparar. O caminho antigo (`userRoles2Mutation`) já setava `throwOnError`
  internamente, então a semântica anterior foi preservada exatamente.
- `services/regenerative/regenerative.query.ts` → `useInvalidateRegenerativeAssessment()`.
- `services/users/users.query.ts` → `useInvalidateUsers()`.

Os dois invalidadores usam `useQueryClient()`, que resolve para o mesmo singleton que
`src/lib/api/query-client.tsx` injeta no `QueryClientProvider` — idêntico em runtime ao
`queryClient.invalidateQueries` direto que existia antes.

**Guard estático (dívida do FE-16, item 3, que nunca tinha sido escrito):**

`biome.jsonc` ganhou `noRestrictedImports` bloqueando `@/client/@tanstack/*` e
`@/client/sdk.gen` em `src/features/**` (override existente) e `src/app/**` (override
novo). `@/client`, `@/client/types.gen` e `@/client/client` seguem liberados de propósito
— o Biome não distingue `import type` de import de valor, e uma regra ampla pegaria
justamente os type imports que este card permite.

**Lacuna residual conhecida:** o barrel `@/client` reexporta as funções do sdk, então um
import de *valor* via barrel ainda passa pelo guard. Fechar isso exigiria normalizar todos
os type imports para `types.gen`, descartado nesta task.

## Checklist

- [x] `use-create-user` usa `services/auth` (remover `userRoles2Mutation` inline)
- [x] `use-login` via service
- [x] `use-regenerative-module-form` via service
- [x] `users/page.tsx` sem import de valor de `@/client` (usa `useInvalidateUsers`)
- [x] Guard do FE-16 passa limpo — e agora existe de fato

## Verificação

`bun lint` exit 0 · `bunx tsc --noEmit` exit 0 · `bun run build` exit 0 ·
`bunx biome check src/app src/features` com 0 `noRestrictedImports` ·
guard validado com arquivo-sonda (3 diagnósticos nas 3 formas de leak; sondas removidas) ·
grep de leaks retorna só `import type` · `src/client/` intocado.

Sem chaves i18n novas — `use-create-user` reusa `usersToastT("errorAssigningRole")`.

## Refs

- doc: `docs/agents/web/api-layer.md` (exemplo de "Complex mutation" reescrito — ensinava
  o próprio leak; seção "Static guard" adicionada), `architecture.md` (camadas),
  `principles.md` (P3/P5)
- relacionado: FE-16 (guard estático — item 3 fechado aqui)

## Nota de processo

O trabalho foi feito primeiro no clone errado (`/Dev/z2t/gaia/gaia-web`, branch
`feat/fe-18`, defasado em relação à `develop`) e refeito no clone correto
(`GAIA/gaia-web`, que é o que o `GAIA.code-workspace` abre). As edições descartadas
seguem não-commitadas no clone defasado, por decisão do usuário.
