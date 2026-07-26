# FE-01 — Fluxo de reset de senha no frontend

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente
> **API:** BE já implementado (`auth/password-reset/request/` + `confirm/`)

## Escopo

Implementar as telas de "Esqueci minha senha" e "Redefinir senha" no gaia-web.

## Telas

- `/esqueci-senha` — formulário de email → envia código de 6 dígitos
- `/redefinir-senha?code=XXXXXX` — código + nova senha + confirmação

## API endpoints

- `POST /api/v1/auth/password-reset/request/` → `{ email }`
- `POST /api/v1/auth/password-reset/confirm/` → `{ email, code, new_password }`

## Checklist

- [ ] Hook `usePasswordReset` (TanStack Query mutation)
- [ ] Páginas com react-hook-form + zod
- [ ] Feedback visual: código enviado, senha alterada, erro
- [ ] Redirecionar para `/login` após sucesso
- [ ] i18n (pt.json + en.json)
