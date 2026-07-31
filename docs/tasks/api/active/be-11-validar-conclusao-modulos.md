# BE-11 — Corrigir completude dos módulos (audit + testes)

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente

**Executar NESTA sessão.** Audit concluído em `gaia-api/farms/services.py` (dispatcher `_MODULE_COMPLETERS`). Resultado: mecanismo está majoritariamente correto; restam 2 bugs/ajustes menores + testes.

## Escopo

`gaia-api/farms/services.py` — dispatcher `_MODULE_COMPLETERS` (linhas 27–155 aprox.), funções `_complete_regenerativo`, `_complete_carbono` e o loop de completude de fazenda.

## Resultado do audit (já está correto — NÃO alterar)

- [ ] LCA: `lca/progress.py::farm_lca_progress()` — steps obrigatórios conferem
- [ ] RothC: cálculo feito = 100% (binário, intencional — ver G11.4)
- [ ] Média dos módulos = média da fazenda — conferida
- [ ] `total_fields == 0` → 0.0: cenário impossível (sem indicadores ativos), manter (G11.3)

## Mudanças de código

- [ ] **G11.2 (único bug real)**: `_complete_regenerativo` usa `RegenerativeIndicator.objects.filter(is_active=True).count()` GLOBALMENTE — não filtra por assessment/escopo. **Decidir com PO**: indicadores são globais (by design, correto atual) ou por escopo (precisa join). Se global → só `ponytail:` comment documentando; se por escopo → fix no queryset.
- [ ] **G11.1**: `static_filled = 4` hardcoded (linha 40) — os 4 campos (management, climate_and_soil, precipitation, irrigation) são not-null no model, então correto por acidente → trocar por comment `# ponytail: 4 campos not-null no model, fixos por design`
- [ ] **G11.4**: `_complete_carbono` binário (existe cálculo → 1.0, senão 0.0) é intencional (RothC é cálculo único) → `# ponytail:` comment documentando
- [ ] **G11.6**: módulos sem completer no dispatcher → completude 0.0 + adicionar `logging.warning` no branch (linha ~149, `_MODULE_COMPLETERS.get(module.name)` retornando None)

## Testes

- [ ] Teste de unidade para cada `ModuleCompleter` (`_complete_regenerativo`, `_complete_carbono`) em `farms/tests/test_services.py` (basear nos já existentes, ex. `test_carbono_complete_regenerativo_empty_gives_50`)
- [ ] Teste de integração: farm com 2/3 módulos = 66%
- [ ] Rodar `python test_runner.py --settings=test_settings --keepdb` + `pre-commit run --all-files` + `python manage.py spectacular --validate --fail-on-warn`
