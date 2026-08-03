---
tags: [standards, principles]
scope: gaia-web
status: draft
---

# Princípios — gaia-web

Fonte canônica dos princípios imutáveis do frontend GAIA. São ≤8, estáveis, e
precedem qualquer decisão de arquitetura, lib ou padrão de código. Quando uma
escolha entra em conflito, o princípio de número menor vence.

> Origem: Relatório de Fundação `gaia_v2` (rev 2) + disciplina de camadas do
> `atyha` + infra AI-first do `le-ko`. Escopo: frontend puro; o backend é
> projeto separado, consumido via hey-api.

## Os princípios

1. **Simplicidade primeiro.** Evitar abstração até um segundo consumidor real
   existir. Pasta vazia "para o futuro" é YAGNI — não entra. Menos código,
   menos camadas, menos config do que parece necessário.

2. **Convenção > configuração; explícito > implícito.** Seguir o padrão do
   arquivo vizinho vence a preferência pessoal. Consistência local vence
   consistência global. Nada de mágica escondida.

3. **Código gerado é read-only.** `src/client/` (hey-api/openapi-ts) nunca é
   editado à mão — regenera com `bunx @hey-api/openapi-ts`. Um hook bloqueia a
   edição. Features/páginas nunca importam `src/client/` direto: só via
   `services/`.

4. **Lógica de negócio nunca dentro de componente.** Regra de domínio (carbono,
   LCA, RothC, regenerativo, biodiversidade) vive em camada de domínio testável
   (`schemas/`, `lib/`, mappers) — não em `.tsx`, não em hook de UI. Componente
   renderiza; domínio decide.

5. **Fluxo unidirecional de dependência.** `shared → services → features → app`.
   Camada de baixo nunca importa de cima. Sem import cross-feature — se dois
   features precisam da mesma coisa, sobe para `shared`. Sem barrel files.

6. **Server-state ≠ client-state.** TanStack Query só para estado de servidor
   (cache, fetch, mutation). Jotai só para estado de cliente global. Forms em
   RHF. Nunca duplicar estado que o RQ já rastreia.

7. **Erro é valor, não exceção.** Dentro do React Query, usar callbacks
   (`onError`/`onSuccess`/`error`), nunca `try/catch` em `mutateAsync`. Fora do
   RQ, usar `safePromise` → `[value, null] | [null, Error]`. `try/catch` cru só
   para `finally` ou recuperação compartilhada.

8. **Inglês em tudo estrutural.** Todo identificador é inglês — arquivo, pasta,
   feature, segmento de rota, componente, hook, tipo, variável, constante, chave
   i18n. Português aparece **só** nos valores renderizados de `messages/pt.json`
   (locale pt-BR). Rota e URL também em inglês. Nada de `fazenda` misturado com
   `farms`.

## Fora deste doc (mas imutável)

- **Token de sessão nunca acessível ao JS** — princípio de segurança P0 do
  Relatório de Fundação. Tratado na trilha de segurança (BFF httpOnly), fora do
  escopo atual de padronização. Registrado aqui para não ser perdido.

## Como usar

- Toda decisão de arquitetura (`architecture.md`) e padrão (`code-standards.md`)
  cita o princípio que a fundamenta.
- Uma exceção a um princípio exige registro explícito (ADR-leve) com
  alternativa + consequência. Sem cerimônia para decisões óbvias.
