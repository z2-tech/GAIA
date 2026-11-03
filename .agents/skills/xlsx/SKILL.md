---
name: xlsx
description: "Run /xlsx <file> to read a GAIA spreadsheet (XLSX, XLSM, CSV, TSV): sheets, formulas, reference values, scoring tables, seed data. Maps what it finds to its home in the standard: the sources inventory in docs/sources/, rules through /discovery, seed data for the gaia-api migration layer. Use for sustainability methodology sheets (BAT, EIQ, STIR, emission factors)."
argument-hint: <spreadsheet path> [sheet]
---

<!-- HOUSE-RULES:START -->
## House rules

- **Language:** code, identifiers, comments, and commit messages are always in English. Every generated document, headings included, is in the project's docs language: the `Docs language:` line in the root `AGENTS.md` (or `CLAUDE.md`). When the line is missing, ask once (the language the user writes in, recommended; English) and add it there. Exceptions: `AGENTS.md` files are instructions for agents, always in English; a transcript stays in the meeting's language (it records what was said); a questionnaire is in the language of the people who answer it. Translate only when asked, into a sibling file (`<name>.<lang>.md`).
- **Style:** plain, simple words in everything a skill produces, files and messages alike. Talk to the reader as `you`, warm and direct like a colleague, and present every step as a recommendation they may run or skip, never an order. Keep technical terms that carry real meaning and explain each in plain words. Never use a dash as punctuation (no em dash, no en dash) and no hyphenated compounds: write `read only`, not `read-only`, or reword. A word the language itself spells with a hyphen keeps it; so do code, file paths, command flags, and values other skills match on (`open-points`, `RN-3`, frame names). Short sentences, commas, or parentheses.
- **Abbreviations:** spell out every abbreviation the first time it appears in a reply or file.
- **Questions:** 2 to 4 concrete options, exactly one marked recommended with a one line why. Use the agent's option picker when it has one (`AskUserQuestion` on Claude Code), else the same options as plain text.
- **State lives in files,** never only in the chat. Read a file again right before editing it; edit surgically.
- **Code repos:** the project `AGENTS.md` lists them under `## Code repos`; a feature's scope row names the ones it touches. Run git, Grep, and Glob once per code repo, with the code repo as the path (from the project root they see only `docs/`, since its `.gitignore` lists the code repos), and take stack and commands from that repo's `AGENTS.md`. Cite code as `<code repo>/<path>:<line>`. A single repo project is its own one code repo.
- **Exploring code:** when `codegraph_*` tools are loaded (one CodeGraph server per code repo, listed on the `MCP servers:` line of `AGENTS.md`), use them first and inline (this replaces the `scout` offload a skill describes); Read only the lines you will cite or edit and the files an answer flags as stale. Without them, use a read only `scout` subagent or Grep and Read. A call that says no CodeGraph project is loaded means that code repo has no index on this machine: use the fallback for the session and tell the engineer to run `codegraph init -i <code repo>` (or `/audit`), then restart.
<!-- HOUSE-RULES:END -->

## What it does

Reads a spreadsheet and reports what it holds: each sheet, its formulas (not only the values), the reference tables, and the thresholds. Then it says where each finding belongs. A client or methodology spreadsheet is a source: it is listed in `docs/sources/README.md` with what it is worth, and the rules taken from it are written by `/discovery` as `RD-n` (area), `RP-n` (product), or `RN-n` (feature), each citing the sheet. This skill never writes a rule itself.

## Reads / Writes

| | Path |
|---|---|
| Reads | the spreadsheet; `docs/sources/README.md` when it exists; the gaia-api code that already implements it (`lca/calculations/`, `rothc/calculations/`, seed migrations) |
| Writes | a row in `docs/sources/README.md` (after asking); nothing else |

## Reading

Use `openpyxl` (not in gaia-api's requirements; when `import openpyxl` fails, run `python3 -m pip install --user openpyxl` after asking). Read twice: once for formulas, once for computed values.

```python
import openpyxl

formulas = openpyxl.load_workbook(path)                  # cell.value holds "=..." formulas
values = openpyxl.load_workbook(path, data_only=True)    # cached results from the last save
for ws in formulas.worksheets:
    for row in ws.iter_rows():
        for cell in row:
            if cell.value is not None:
                print(ws.title, cell.coordinate, cell.value, values[ws.title][cell.coordinate].value)
```

CSV or TSV: the `csv` module. A value with no cached result (`None` in `data_only`) means the file was never recalculated; say so instead of computing it yourself. Never save a workbook loaded with `openpyxl`: it drops what it does not support (data validation, charts), so the source would lose content.

## Steps

1. **Read** the file (or the sheet asked for). List the sheets, then for each: what it computes, its inputs, its formulas, and its tables.
2. **Compare with the code.** Find where gaia-api already implements it (`gaia-api/lca/calculations/`, `gaia-api/rothc/calculations/`, seed migrations) and cite `gaia-api/<path>:<line>`. Report each difference (a factor, a threshold, a formula) without fixing it.
3. **Place each finding:**
   - the file itself → a row in `docs/sources/README.md` (`Source`, `What it is`, `Worth`, `Where`, `Cited by`); a client spreadsheet is worth `functional reference`, an official table `normative`. Ask before adding; create the file with that header when missing.
   - a rule or a formula → recommend `/discovery` for the feature or area it belongs to, quoting the cells.
   - seed data → name the table and the rows, for the migration layer of the `gaia-django` skill (`gaia-api/.agents/skills/gaia-django/references/migration.md`).
4. **Report** in the docs language: the sheets, the differences with the code, and the recommended next skill.

## Known spreadsheets

They live in `docs/references/domain/` until `/sync route` moves them to `docs/sources/`.

| Spreadsheet | Module | File |
|---|---|---|
| Biodiversity Assessment Tool | BAT | `Biodiversity Assessment Tool Prototype_Final.xlsx` |
| EIQ values (631 names) | EIQ | `EIQ_Final.xlsx` |
| STIR calculator (PT-BR) | STIR | `STIR_calculadora_metric_v4.xlsx` |
| LCA tool for annual crops | LCA | `LCA_Annual_Crops_Tool.xlsx` |
| RothC model with collected data | RothC | `RothC_Model_short (com dados coletados).xlsx` |
