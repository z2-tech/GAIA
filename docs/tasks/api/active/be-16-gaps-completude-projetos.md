# BE-16 — Gaps restantes: completude de projetos (pós BE-10/BE-11)

> **Prioridade:** Média | **Assignee:** @fernandocampana | **Status:** Pendente

Gaps levantados na execução de BE-10/BE-11, ainda em aberto. Nenhum bloqueia a entrega atual — verificar com PO antes de implementar.

## Gaps

### 1. D1 — completed + nova farm → volta a `in_progress`?

- **Prioridade:** Média
- ✅ **FECHADO (2026-Q3)**: decisão PO = SIM. Implementado em `add_farm_to_project` (projects/services.py) — farm adicionada a projeto `completed` reabre status para `in_progress`. Teste: `test_add_farm_reopens_completed_project`.

### 2. Testes de integração hooks rothc + lca

- **Prioridade:** Alta (garantir regressão do BE-10)
- 🔄 **MOVIDO para BE-17** — sessão fresh, assignee @fernandocampana. Spec completa e estado do working tree no ticket.
- Só o ponto regenerative foi testado (`TestProjectAutoCompleteViaRegenerative`).

### 3. G11.2 — indicadores regenerativos por escopo

- **Prioridade:** Baixa
- Fechado como "by design" (tabela global de config, sem FK por assessment).
- Se PO quiser escopo por assessment → novo ticket (não é BE-16).

### 4. Transport LCA não hookado

- **Prioridade:** Baixa
- Intencional: etapa opcional não afeta ratio. Documentar, sem ação.

### 5. Verificação ambiente

- **Prioridade:** Alta (pré-requisito para rodar testes)
- ✅ **FECHADO (2026-Q3)**: container `gaia_postgres_test` (5433) operacional via `docker-compose.db.yml`; full suite = 139 testes verdes. Instrução de geração de ambiente documentada no vault (`systems/Backend-API.md` → Testes) e no `test-agent.md` (comando oficial full suite).

## Critério de conclusão

- [x] D1 resolvido (PO: volta a in_progress) — implementado + testado
- [x] Testes de integração rothc/lca verdes (BE-17 — 139 testes OK)
- [x] Verificação ambiente documentada no vault (Backend-API.md → Testes)
