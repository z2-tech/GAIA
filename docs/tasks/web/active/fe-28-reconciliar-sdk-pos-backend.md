# FE-28 — Reconciliar SDK após fechamento do backend

> **Prioridade:** Alta | **Assignee:** — | **Status:** Bloqueado por BE-18
> **API:** [BE-18](../../api/active/be-18-fechamento-backend-mvp.md)

## Contexto

Nenhuma mudança Web integra a primeira rodada backend. O patch provisório foi
validado e descartado em 2026-08-09; `gaia-web/develop` ficou limpo em
`4394416`.

Patch descartado:

- quatro arquivos gerados em `src/client/`;
- casts LCA em `src/features/carbon-emission/module/schemas/lca-module-form.ts`;
- unificação provisória dos aliases de uso do solo em `LandUseTypeEnum`;
- schema separado de GET/POST para `userRoles`/`userRoles2`;
- alteração gerada de `baseUrl`, inadequada para reaplicação manual.

Esse patch era fotografia de schema intermediário. Não restaurar stash nem
copiar diff. Regenerar tudo uma vez, após estabilização do BE-18.

## Execução futura

- [ ] Confirmar BE-18 concluído, schema final sem warnings e `gaia-web/develop`
  atualizado antes de criar branch Web.
- [ ] Gerar schema API final com `spectacular --validate --fail-on-warn`.
- [ ] Executar `OPENAPI_SCHEMA_URL=<schema-final> bun run generate-types`.
- [ ] Nunca editar `src/client/` manualmente.
- [ ] Revisar diff gerado: operation IDs, requests, respostas, nulls, enums e
  `ClientOptions`.
- [ ] Preservar runtime em `src/lib/api/hey-api.ts`; ele define
  `NEXT_PUBLIC_API_URL`. Não corrigir `client.gen.ts` à mão.
- [ ] Ajustar código manuscrito só onde TypeScript exigir. Se o schema final
  mantiver enum unificado, trocar os quatro casts LCA pelo tipo gerado vigente;
  não assumir que o nome continuará `LandUseTypeEnum`.
- [ ] Manter SDK calls em `src/services/`; features consomem services/UI models.
- [ ] Seguir zero-comentário por padrão de `gaia-web/AGENTS.md`; nenhum nome de
  card, agente ou modo de execução no código.
- [ ] Rodar `bun lint`, `bun run typecheck` e `bun run build`.
- [ ] Validar fluxo LCA, papéis de usuário e autenticação contra API final.

## Aceite

- [ ] Um único codegen após contrato backend final.
- [ ] Diff gerado explicável; nenhum patch manual em `src/client/`.
- [ ] Sem alteração visual ou regra de domínio no Web.
- [ ] Lint, typecheck, build e fluxos integrados verdes.
