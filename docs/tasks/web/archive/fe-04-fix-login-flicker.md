# FE-04 — Fix: falsa impressão de login ao acessar URL direta

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Entregue no `gaia-web` via `src/proxy.ts` (proxy/middleware do Next.js 16,
> `export function proxy`). O guard de rota roda no servidor e redireciona para
> `/login` ANTES de qualquer render quando não há `access_token`/`refresh_token`
> nos cookies — o shell autenticado (sidebar/header) nunca é montado, eliminando
> o flash. Loading neutro tornou-se desnecessário: o redirect é server-side e
> instantâneo, sem render intermediário do shell.

## Problema

Ao acessar qualquer URL do gaia-web diretamente, a tela de loading mostra brevemente o shell da aplicação antes do redirect para `/login`, dando falsa impressão de sessão ativa.

## Solução

- `src/proxy.ts` (middleware): verificar token ANTES de qualquer render
- Mostrar tela de loading neutra (sem sidebar/header) enquanto verifica auth
- Redirecionar para `/login` sem flash do shell autenticado

## Checklist

- [x] Ajustar middleware de auth (`src/proxy.ts` — redirect server-side antes do render)
- [x] Componente de loading neutro (N/A — redirect server-side dispensa render intermediário)
- [x] Testar fluxo: URL direta → login (sem flash do shell)
