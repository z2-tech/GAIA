# FE-02 — Definir permissão do usuário após cadastro

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** ✅ Concluído
> **API:** `auth/authz/users/{user_id}/roles/` já implementado
>
> Entregue no `gaia-web` branch `develop`: `gerenciar-permissoes-cell.tsx`,
> `services/auth/authz.query.ts` (`useUserRoles` query+mutation), coluna de roles
> em `lista-usuarios-columns.tsx`, i18n.

## Escopo

Após criar um novo usuário, permitir que o admin defina suas roles na tela de gerenciamento de usuários.

## Tela

- `/usuarios` — listagem (já existe)
- Adicionar coluna "Roles" na tabela
- Dialog/bottom sheet para atribuir/remover roles
- Roles disponíveis: admin, manager, technician, auditor

## Checklist

- [x] Hook `useUserRoles` (query + mutation)
- [x] Componente de seleção de roles (multi-select chips)
- [x] Atualizar tabela de usuários
- [x] i18n
