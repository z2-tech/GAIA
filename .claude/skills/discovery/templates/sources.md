# Template: docs/sources/README.md

The files behind the rules: spreadsheets, PDFs, standards, laws. One inventory per project. Small files live in `docs/sources/`; a file too large for git stays outside and the row links it. A rule cites its source by name (`[<source>]`); this inventory says what each one is worth.

Worth, from strongest to weakest: an official text (law, standard) is normative; a published study is scientific; a spreadsheet from the client is a functional reference (how they compute today, not proof it is right); a meeting is product context, never a scientific source; the code is implemented behavior, never an independent validation.

```markdown
# <Product>: sources

| Source | What it is | Worth | Where | Cited by |
|---|---|---|---|---|
| <short name> | <one line> | normative · scientific · functional reference · product context | [<file or link>](<path or url>) | RD-n, RP-n, <feature> RN-n |
```
