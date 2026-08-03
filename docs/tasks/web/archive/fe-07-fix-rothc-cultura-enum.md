# FE-07 — Fix: cultura aparecendo como ENUM no resultado do Carbono Remoção

> **Prioridade:** Média | **Assignee:** — | **Status:** Pendente

## Problema

No dashboard de resultado do RothC, o nome da cultura aparece como valor bruto do ENUM (ex: `CORN` ou `SOYBEAN`) em vez do label traduzido.

## Solução

- Frontend: mapear valores do ENUM para labels i18n
- Ou backend: serializar `get_culture_display()` em vez do valor bruto

## Checklist

- [ ] Identificar onde o valor é exibido (resultado, dashboard, tabela)
- [ ] Criar mapa de ENUM → label i18n
- [ ] Se for backend: atualizar serializer para usar `display` field
- [ ] Testar com PT e EN
