---
tags: [system]
---

# Integration-Service (futuro)

## Status: Planejado

GAIA atualmente não possui pipeline central de ingestão de dados externos. Módulos futuros que poderiam exigir integração:

| Fonte | Dado | Módulo |
|-------|------|--------|
| Open-Meteo | Temperatura, precipitação | RothC (já implementado via `openmeteo/`) |
| NYS IPM | EIQ values (1636 ativos) | EIQ — carga inicial seed |
| USDA-NRCS | STIR reference values | STIR — carga inicial seed |
| IBGE/EMBRAPA | Tipos de solo, biomas | LCA, BAT |
| Cool Farm Tool API | Carbon footprint externo | CFP — pendente |

## Padrão de ingestão (proposto)

Definir o pipeline somente quando houver requisitos concretos de dados dinâmicos:
- Tabelas de referência → seed migrations (idempotentes)
- APIs externas → Celery tasks com cache TTL
- Fallback → hardcoded constants das planilhas de referência

## Links

- Planilhas de referência: `docs/references/domain/`
- Módulos planejados: [[Sustainability-Metrics]]
