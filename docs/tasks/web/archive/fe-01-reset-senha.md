# FE-01 — Fluxo de reset de senha no frontend

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** ✅ Concluído
> **API:** BE já implementado (`auth/password-reset/request/` + `confirm/`)
>
> Entregue no `gaia-web` branch `develop`: `src/features/recuperar-senha/`
> (schemas + hooks `use-esqueci-senha`/`use-redefinir-senha` + forms), rotas
> `/esqueci-senha` e `/redefinir-senha`, i18n pt/en.

## Escopo

Implementar as telas de "Esqueci minha senha" e "Redefinir senha" no gaia-web.

## Telas

- `/esqueci-senha` — formulário de email → envia código de 6 dígitos
- `/redefinir-senha?code=XXXXXX` — código + nova senha + confirmação

## API endpoints

- `POST /api/v1/auth/password-reset/request/` → `{ email }`
- `POST /api/v1/auth/password-reset/confirm/` → `{ email, code, new_password }`

## Checklist

- [x] Hook `usePasswordReset` (TanStack Query mutation)
- [x] Páginas com react-hook-form + zod
- [x] Feedback visual: código enviado, senha alterada, erro
- [x] Redirecionar para `/login` após sucesso
- [x] i18n (pt.json + en.json)
