# FE-04 — Fix: falsa impressão de login ao acessar URL direta

> **Prioridade:** Alta | **Assignee:** — | **Status:** Pendente

## Problema

Ao acessar qualquer URL do gaia-web diretamente, a tela de loading mostra brevemente o shell da aplicação antes do redirect para `/login`, dando falsa impressão de sessão ativa.

## Solução

- `src/proxy.ts` (middleware): verificar token ANTES de qualquer render
- Mostrar tela de loading neutra (sem sidebar/header) enquanto verifica auth
- Redirecionar para `/login` sem flash do shell autenticado

## Checklist

- [ ] Ajustar middleware de auth
- [ ] Componente de loading neutro
- [ ] Testar fluxo: URL direta → loading → login (sem flash)
