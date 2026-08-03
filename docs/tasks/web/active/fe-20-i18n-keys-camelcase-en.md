# FE-20 — i18n keys → camelCase English

> **Prioridade:** Alta | **Assignee:** — | **Status:** ⬜ Pendente
>
> Sub-card do épico **FE-10**. Alto blast radius (todos features/services).

## Escopo

533 chaves kebab-case + 30+ chaves PT em `messages/{pt,en}.json`. Converter para
camelCase inglês (identificador), manter só os **valores** em PT/EN.

- Top-level namespaces kebab → camelCase: `carbon-emissions` → `carbonEmissions`,
  `carbon-removal` → `carbonRemoval`, `password-reset` → `passwordReset`.
- Nested kebab → camelCase: `password-changed-successfully` → `passwordChangedSuccessfully`.
- Chaves PT → EN: `nome-completo` → `fullName`, `data-inicio` → `startDate`,
  `limpar-filtros` → `clearFilters`, `sem-resultados` → `noResults`, etc.
- Atualizar **todo** `useTranslations`/`t("...")`.
- Manter paridade pt/en (hoje 815/815 keys, 0 faltando).

> **Exceção (decisão):** chaves `enums.*` em snake_case (`AGRICULTURAL_CROPS`,
> `SANDY_LOAM`) espelham códigos do backend — **manter**, não renomear.

## Checklist

- [ ] Namespaces top-level → camelCase EN
- [ ] Chaves nested → camelCase EN
- [ ] Chaves PT → EN
- [ ] `enums.*` snake_case preservadas
- [ ] Todos `t("...")` atualizados
- [ ] Paridade pt/en mantida (script de check)
- [ ] `bun run build` limpo

## Refs

- doc: `docs/agents/web/naming-conventions.md` (i18n), `localization.md`
- épico: FE-10
