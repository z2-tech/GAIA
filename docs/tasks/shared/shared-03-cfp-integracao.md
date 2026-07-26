# SHARED-03 — Integração Cool Farm Tool (CFP)

> **Prioridade:** Baixa (Fora do MVP) | **Assignee:** — | **Status:** Pendente

## Escopo

Integrar o módulo CFP existente (payload-only) com a API externa do Cool Farm Tool para cálculo de carbon footprint.

## Estado atual

- Modelo `CfpAssessment` com `input_payload` (JSONB) e `output_payload` (nullable)
- CRUD endpoints implementados
- API externa NÃO conectada

## Checklist

- [ ] Estudar API do Cool Farm Tool (auth, endpoints, formato)
- [ ] Implementar fetcher em `core/` ou app dedicado
- [ ] Celery task para envio assíncrono (evitar timeout)
- [ ] Callback/webhook para receber resultado
- [ ] Preencher `output_payload` com resposta da API
