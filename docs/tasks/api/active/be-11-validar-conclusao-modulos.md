# BE-11 — Corrigir completude dos módulos (audit + testes)

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** Auditoria concluída — pendente comentários + testes
> **Plane:** [GAIA-11](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues)

**Auditoria concluída em `gaia-api/farms/services.py` (dispatcher `_MODULE_COMPLETERS`).**
Mecanismo está majoritariamente correto; restam documentação + testes.

## Resultado do audit (já está correto — NÃO alterar lógica)

- [x] LCA: `lca/progress.py::farm_lca_progress()` — steps obrigatórios conferem
- [x] RothC: cálculo feito = 100% (binário, intencional — ver G11.4)
- [x] Média dos módulos = média da fazenda — conferida
- [x] `total_fields == 0` → 0.0: cenário impossível (sem indicadores ativos), manter (G11.3)

## Pendente (executável pré-deploy, zero risco)

- [ ] **G11.2**: `ponytail:` comment documentando que indicadores são globais (by design)
- [ ] **G11.1**: `ponytail:` comment nos 4 campos not-null fixos
- [ ] **G11.4**: `ponytail:` comment no cálculo binário do RothC
- [ ] **G11.6**: `logging.warning` no branch de módulo sem completer
- [ ] Teste de unidade para `ModuleCompleter` (`_complete_regenerativo`, `_complete_carbono`)
- [ ] Rodar `pre-commit` + `spectacular --validate` + suíte `--keepdb`
