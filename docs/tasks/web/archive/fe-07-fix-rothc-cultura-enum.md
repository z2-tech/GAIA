# FE-07 — Fix: cultura aparecendo como ENUM no resultado do Carbono Remoção

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído
>
> Entregue no `gaia-web` branch `develop`: resultado RothC
> (`carbono-remocao/calculo/components/calculo-page-content.tsx:117`) usa
> `enumLabel("cultura", cultura)` via `useEnumLabel`; bloco `cultura` (SOYBEAN→Soja
> etc.) em `messages/pt.json` + `en.json`.

## Problema

No dashboard de resultado do RothC, o nome da cultura aparece como valor bruto do ENUM (ex: `CORN` ou `SOYBEAN`) em vez do label traduzido.

## Solução

- Frontend: mapear valores do ENUM para labels i18n
- Ou backend: serializar `get_culture_display()` em vez do valor bruto

## Checklist

- [x] Identificar onde o valor é exibido (resultado, dashboard, tabela)
- [x] Criar mapa de ENUM → label i18n (`useEnumLabel` + bloco `cultura`)
- [x] Solução frontend (não precisou tocar serializer)
- [x] Testar com PT e EN
