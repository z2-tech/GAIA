# FE-21 — Reestruturar copy de mutation sob `<domain>.toast`

> **Prioridade:** Média | **Assignee:** — | **Status:** ⬜ Pendente
>
> Sub-card do épico **FE-10**. Depende de FE-20 (chaves já EN/camelCase).

## Problema

`localization.md` manda feedback de mutation sob `<domain>.toast` e hook escopado
a `useTranslations("<domain>.toast")`. Hoje: 0/61 toast calls compliant — strings
flat no root do domínio, hooks escopados ao domínio nu.

Ex: `src/services/farms/farms.mutation.ts:14` → `useTranslations("farm")` +
`t("farm-created-successfully")`.

## Solução

- Mover strings de success/error para sub-namespace `<domain>.toast.*`.
- Rescopar hooks de service: `useTranslations("<domain>.toast")`.

## Checklist

- [ ] Mover copy de toast p/ `<domain>.toast.*` em `messages/{pt,en}.json`
- [ ] Rescopar `useTranslations` nos `*.mutation.ts`
- [ ] Atualizar `t("...")` correspondentes
- [ ] Paridade pt/en mantida
- [ ] `bun run build` limpo

## Refs

- doc: `docs/agents/web/localization.md`
- files: `gaia-web/src/services/**/*.mutation.ts`, `gaia-web/messages/*.json`
- épico: FE-10
