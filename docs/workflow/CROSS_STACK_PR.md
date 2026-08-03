# Cross-Stack Feature Checklist

Único checklist operacional para mudanças que atravessam API e Web. OpenAPI e
o SDK gerado são o contrato executável; Markdown registra intenção, decisões e
critérios de aceite.

## Planning

- [ ] Criar tasks BE/FE ligadas em `TODO/gaia.md` e specs em `docs/tasks/`.
- [ ] Confirmar branches em `docs/workflow/BRANCHING.md`.
- [ ] Definir método, endpoint, autenticação, request, response, nulls, erros e exemplos.
- [ ] Resolver decisões de domínio antes de implementar fórmulas ou agregações.

## API

- [ ] Implementar comportamento e permissões no `gaia-api`.
- [ ] Declarar schema explícito para toda resposta 2xx.
- [ ] Executar testes, schema validation e pre-commit aplicáveis.

## Web

- [ ] Regenerar `src/client/` com `bunx @hey-api/openapi-ts` após mudança de schema.
- [ ] Consumir o client gerado somente por `src/services/`.
- [ ] Implementar estados loading, empty, error e null conforme o contrato.
- [ ] Executar `bun lint` e `bun run build`.

## Closeout

- [ ] Executar `python3 .opencode/bin/validate-structure.py`.
- [ ] Validar o fluxo integrado e as permissões relevantes.
- [ ] Atualizar `CHANGELOG.md` e o vault somente quando necessário.
- [ ] Manter apenas trabalho restante em `TODO/gaia.md`; mover concluídos para `TODO/archive.md`.
- [ ] Sincronizar índices de código alterados e o shadow cross-repo.

Não criar cópias concorrentes deste checklist ou do contrato nos children.
