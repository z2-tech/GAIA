# FE-20 — i18n keys → camelCase English

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
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

- [x] Namespaces top-level → camelCase EN
- [x] Chaves nested → camelCase EN
- [x] Chaves PT → EN
- [x] `enums.*` snake_case preservadas
- [x] Todos `t("...")` atualizados
- [x] Paridade pt/en mantida (script de check)
- [x] `bun run build` limpo

> **Notas de execução (`feat/fe-20-i18n-keys-camelcase-en` em gaia-web):**
> - Top NS: `passwordReset`, `carbonRemoval`, `carbonEmissions`.
> - `enums` groups → camelCase EN (`crop`, `dpmRpm`, …); leaf API codes untouched.
> - API-mirrored leaves kept/aligned: regenerative sections/flags/options, role/relationship options.
> - PT section dupes deleted; `SECTION_ORDER` → API codes; months → EN abbr.
> - Scripts: `migrate-i18n-to-camelcase-en.mjs`, `check-i18n-parity.mjs`, mapping JSON;
>   old PT migrator hard-disabled.
> - Parity 811/811 ✅. `tsc --noEmit` ✅. `bun lint` ✅ (warnings only). `bun run build` ✅.
> - Long EN slug keys camelCased mechanically (no shorten pass).

## Refs

- doc: `docs/agents/web/naming-conventions.md` (i18n), `localization.md`
- épico: FE-10
