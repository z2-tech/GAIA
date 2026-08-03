---
name: xlsx
description: Read and map GAIA XLSX, XLSM, CSV, and TSV reference models. Use for sustainability formulas, scoring tables, seed data, and sheet-to-code mapping.
---

# xlsx Spreadsheet Skill

Read, analyze, and map Excel spreadsheets (.xlsx, .xlsm, .csv, .tsv) that serve as domain reference material for sustainability metrics.

## When to use

- Reading domain reference spreadsheets (BAT, EIQ, STIR, emission factor tables)
- Extracting formulas, reference values, scoring thresholds
- Mapping spreadsheet structure to backend models and seed data
- Documenting spreadsheet specs in vault

## How to read

```python
import openpyxl

wb = openpyxl.load_workbook('path/to/file.xlsx', data_only=True)
print(wb.sheetnames)

ws = wb['SheetName']
for row in ws.iter_rows(min_row=1, values_only=True):
    print(row)
```

## Mapping to vault

After reading a spreadsheet:
1. Extract reference values → document in `docs/vault/concepts/Sustainability-Metrics.md`
2. Map to backend models (e.g., LCA reference tables, BAT scoring, STIR implement library)
3. Identify seed data candidates → document for migration-agent

## Reference spreadsheets

| Spreadsheet | Module | Location |
|-------------|--------|----------|
| Biodiversity Assessment Tool | BAT | `docs/references/domain/Biodiversity Assessment Tool Prototype_Final.xlsx` |
| EIQ values (1636 actives) | EIQ | `docs/references/domain/EIQ_Final.xlsx` |
| STIR calculator (PT-BR) | STIR | `docs/references/domain/STIR_calculadora_metric_v4.xlsx` |
