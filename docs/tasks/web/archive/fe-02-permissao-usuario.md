# FE-02 — Definir permissão do usuário após cadastro

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente
> **API:** `auth/authz/users/{user_id}/roles/` já implementado

## Escopo

Após criar um novo usuário, permitir que o admin defina suas roles na tela de gerenciamento de usuários.

## Tela

- `/usuarios` — listagem (já existe)
- Adicionar coluna "Roles" na tabela
- Dialog/bottom sheet para atribuir/remover roles
- Roles disponíveis: admin, manager, technician, auditor

## Checklist

- [ ] Hook `useUserRoles` (query + mutation)
- [ ] Componente de seleção de roles (multi-select chips)
- [ ] Atualizar tabela de usuários
- [ ] i18n
