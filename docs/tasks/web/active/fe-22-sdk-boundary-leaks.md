# FE-22 — Rotear chamadas SDK via services (remover leaks `@/client`)

> **Prioridade:** Média | **Assignee:** — | **Status:** ⬜ Pendente

## Problema

Features e uma page importam factories/SDK de `@/client` direto, furando a regra
de 3 camadas (`architecture.md`: só `services/` toca `client/`).

| Local | Leak |
|-------|------|
| `features/usuarios/hooks/use-novo-usuario.ts:7,40` | `userRoles2Mutation` inline (dup de `services/auth/authz.mutation.ts:21`) |
| `features/login/hooks/use-login.ts:3` | import de `@/client` |
| `features/regenerativo/modulo/hooks/use-regenerativo-modulo-form.ts:13` | factory de `@/client` |
| `app/(private)/usuarios/page.tsx:11-12` | `listUsersQueryKey` + `UserList` de `@/client` |

## Solução

- Criar/usar hooks de service (`useAssignRole` parametrizando `user_id`, etc).
- Page invalida via hook/service, não importando `*QueryKey` de `@/client`.
- `import type` de `types.gen` continua OK (type-only).

## Checklist

- [ ] `use-novo-usuario` usa `services/auth` (remover `userRoles2Mutation` inline)
- [ ] `use-login` via service
- [ ] `use-regenerativo-modulo-form` via service
- [ ] `usuarios/page.tsx` sem import de `@/client` (usar hook de service)
- [ ] Guard do FE-16 passa limpo

## Refs

- doc: `docs/agents/web/api-layer.md`, `architecture.md` (camadas), `principles.md` (P3/P5)
- relacionado: FE-16 (guard estático)
