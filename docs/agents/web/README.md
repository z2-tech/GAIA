---
tags: [standards, moc]
scope: gaia-web
---

# Frontend Playbook — gaia-web

Fonte canônica dos padrões do frontend GAIA (Next.js). Vive no orquestrador
(modelo ATYHA): o filho `gaia-web/` só carrega um `AGENTS.md` fino que aponta
para cá. Ao codar no `gaia-web`, carregue o doc relevante **antes** de escrever.

## Fundação (ler nesta ordem)

| # | Doc | Governa |
|---|-----|---------|
| 1 | [`principles.md`](principles.md) | ≤8 princípios imutáveis — precedem tudo |
| 2 | [`architecture.md`](architecture.md) | Camadas, domínio DTO→model→mapper, regra idioma, platform |
| 3 | [`project-structure.md`](project-structure.md) | Onde cada arquivo/pasta vai |
| 4 | [`naming-conventions.md`](naming-conventions.md) | Nomes: arquivos, hooks, constantes, schemas |

## Padrões por área

| Tarefa | Doc |
|--------|-----|
| Service hooks (query/mutation), erro | [`api-layer.md`](api-layer.md) |
| Forms: RHF + Zod, schema factory, mapper | [`forms.md`](forms.md) · [`form-template.md`](form-template.md) |
| Feature `projeto` (referência de arquitetura) | [`projeto-feature-architecture.md`](projeto-feature-architecture.md) |
| Dialog de nova fazenda | [`form-dialog-nova-fazenda.md`](form-dialog-nova-fazenda.md) |
| Cards, tipografia, spacing, empty states | [`design-system.md`](design-system.md) |
| Tabelas (TanStack Table) | [`table.md`](table.md) |
| i18n, next-intl, toast copy | [`localization.md`](localization.md) |

## Agent

Entry point de código frontend: `.opencode/agents/senior-nextjs.md`.

## Roadmap de padronização (gates)

| Gate | Estado | Entrega |
|------|--------|---------|
| 2 — Princípios + Fundação | 🟡 em revisão | `principles.md` + `architecture.md` |
| 3 — Libs & tooling | 🟢 landed | [`libs-tooling.md`](libs-tooling.md) — Biome, Vitest, husky, commitlint, `.claude/hooks` |
| 4 — Padrões de código | ⬜ | `code-standards.md` (no-enum, safePromise, erro-valor, ref-as-prop) |
| 8 — IA-first | 🟢 parcial | agents (`i18n-key-validator`) + skills (`new-feature`) movidos p/ GAIA; hooks no gaia-web |
