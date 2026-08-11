# BE-13 — Adicionar mais opções de cultura no RothC

> **Prioridade:** Baixa (Backlog) | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)

## Escopo

Expandir o catálogo de culturas do RothC com opções adicionais.

## Entregue

7 novas culturas adicionadas ao enum `Cultura` e seedadas via migration `0004`:

| Código | Nome PT | Harvest Index |
|--------|---------|---------------|
| SUNFLOWER | Girassol | 0.35 |
| SORGHUM | Sorgo | 0.45 |
| BARLEY | Cevada | 0.48 |
| BEANS | Feijão | 0.45 |
| CASSAVA | Mandioca | 0.65 |
| COFFEE | Café | 0.50 |
| OATS | Aveia | 0.45 |

Total: 17 culturas (eram 10).

## Checklist

- [x] Enum `Cultura` expandido
- [x] Migration `0004_seed_additional_crops`
- [x] Traduções PT/EN para todas as novas culturas
- [x] Testes atualizados (`TestCropSeed` → 17 culturas)
