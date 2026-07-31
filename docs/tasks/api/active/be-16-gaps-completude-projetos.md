# BE-16 — Gaps restantes: completude de projetos (pós BE-10/BE-11)

> **Prioridade:** Média | **Assignee:** @fernandocampana | **Status:** Pendente

Gaps levantados na execução de BE-10/BE-11, ainda em aberto. Nenhum bloqueia a entrega atual — verificar com PO antes de implementar.

## Gaps

### 1. D1 — completed + nova farm → volta a `in_progress`?

- **Prioridade:** Média
- Decisão de PO pendente: hoje `maybe_auto_complete` (projects/services.py) marca o projeto `completed` em 100% e ele nunca reabre ao adicionar nova farm.
- Se confirmado: +3 linhas em `add_farm_to_project` reabrindo status (`in_progress`) + 1 teste.
- Documentado no código via comment `# BE-16 D1` em `projects/services.py:92`.

### 2. Testes de integração hooks rothc + lca

- **Prioridade:** Alta (garantir regressão do BE-10)
- Só o ponto regenerative foi testado (`TestProjectAutoCompleteViaRegenerative`).
- RothC: `RouthcService.calcular()` depende de OpenMeteo (API externa) — mockar serviço externo ou usar mock patcher para testar pós-create sem rede.
- Hooks LCA (5 views: culture/soil/inputs/fuel/calculate) sem teste de integração — cobrir via APITestCase/DRF test client.

### 3. G11.2 — indicadores regenerativos por escopo

- **Prioridade:** Baixa
- Fechado como "by design" (tabela global de config, sem FK por assessment).
- Se PO quiser escopo por assessment → novo ticket (não é BE-16).

### 4. Transport LCA não hookado

- **Prioridade:** Baixa
- Intencional: etapa opcional não afeta ratio. Documentar, sem ação.

### 5. Verificação ambiente

- **Prioridade:** Alta (pré-requisito para rodar testes)
- Test DB GAIA (5433) não estava rodando; usou `atyha_postgres_test` (5432).
- Rodar oficial: subir container GAIA via `docker-compose.db.yml`.

## Critério de conclusão

- [ ] D1 resolvido ou fechado com decisão de PO registrada
- [ ] Testes de integração rothc/lca verdes
- [ ] Verificação ambiente documentada no vault
