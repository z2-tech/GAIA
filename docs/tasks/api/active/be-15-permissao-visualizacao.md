# BE-15 — Permissão de visualização de projetos entre usuários

> **Prioridade:** Baixa (Backlog) | **Assignee:** — | **Status:** Pendente

## Escopo

Definir regras de visibilidade: quem pode ver projetos de outros usuários?

## Regras propostas

- `admin`: vê todos os projetos
- `manager`: vê projetos do seu tenant
- `technician`: vê apenas projetos aos quais está vinculado
- `auditor`: vê projetos aos quais está vinculado (read-only)

## Implementação

- Atualizar `MembershipSelectors` e `HasRole`
- Gate nos selectors de Project (filter por membership)
- Testes de permissão

## Checklist

- [ ] Atualizar selectors
- [ ] Testes de permissão por role
