# BE-15 — Corrigir visibilidade global do role admin

> **Prioridade:** Alta (urgente) | **Assignee:** — | **Status:** Pendente
> **Origem:** [áudios de produto de 21/08/2026](../../../references/meetings/21-08-26-comparacao-permissoes-pousio/21-08-26-audios-whatsapp-transcricao-e-encaminhamentos.md)

## Incidente

Duas contas com role `admin` não conseguiam ver os projetos uma da outra em dev ou
homolog. O comportamento atual diferencia incorretamente o role de negócio das flags
Django:

- `HasRole("admin")` reconhece `Membership.role=admin` e libera o endpoint.
- `ProjectSelectors._user_accessible_project_qs` concede escopo global somente quando
  `is_admin_user` encontra `is_staff` ou `is_superuser`.
- Os testes atuais exigem que o role `admin` veja apenas seus vínculos, apesar da regra
  de produto abaixo.

## Regras confirmadas

- Role global `admin`: vê todos os projetos e fazendas.
- `Project.admin`: administra somente o projeto atribuído, salvo se o usuário também
  possuir role global `admin`.
- `manager`, `technician` e `auditor`: preservar o escopo vigente até existir uma
  decisão específica e implementável de tenant.
- `staff` e `superuser`: preservam o bypass administrativo atual.

## Implementação

- Unificar a decisão de escopo global para que o role ativo `admin` seja reconhecido
  pelos selectors de projetos e fazendas, não somente pela permission class da view.
- Manter a distinção entre role global e o campo `Project.admin`.
- Ajustar os testes de listagem e detalhe que hoje codificam o comportamento divergente.
- Verificar `Membership`, `is_staff`, `is_superuser` e versão implantada das contas do
  incidente em dev/homolog.

## Checklist

- [ ] Duas contas com role `admin` listam e abrem os projetos/fazendas uma da outra
- [ ] Administrador apenas do projeto não ganha visibilidade global
- [ ] Escopos existentes de manager, technician e auditor não sofrem regressão
- [ ] Staff e superuser continuam com acesso global
- [ ] Testes de selectors, listagem e detalhe atualizados
- [ ] Dados e versão implantada verificados no ambiente que reproduziu o incidente
