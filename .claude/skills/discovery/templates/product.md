# Template: docs/product/

What holds for this product in every feature: what it is and for whom, its roles, its modules, the rules every feature obeys, its own words. One folder per project, one layer between `docs/domain/` (the area) and `docs/features/` (each feature). Every feature reads it; a feature's `RN-n` cites the `RP-n` it comes from, and an `RP-n` cites the `RD-n` it comes from.

What goes in: a constraint every feature obeys with no code of its own ("an absent value is `null`, never zero"), with its source. What stays out: a mechanism someone has to build (permissions, a recompute pipeline), which is a feature with a spec (`README.md` only lists its roles or links it); what only one feature does (an `RN-n`); what the code or git answers; commercial studies beyond two or three lines of why. `RP-n` numbers never change; a rule that stops holding stays as `RP-n dropped (<why>, <YYYY-MM-DD>)`.

Write a product rule only with a source: a named person from product with the date, a meeting time, or the feature whose `RN-n` turned out to hold for every feature.

## README.md

```markdown
# <Product>: product

<1 or 2 lines: what it is and for whom.> Owner: <name, role>: who confirms a new rule. Last review: <YYYY-MM-DD>.

| File | What |
|---|---|
| [rules.md](rules.md) | product rules `RP-n` |
| [terms.md](terms.md) | the product's own words |

## Roles

| Role | Who | What they do |
|---|---|---|

## Modules

| Module | Feature | Status |
|---|---|---|
| <name> | [`<slug>`](../features/<slug>/README.md) | <the feature README status> |
```

## rules.md

```markdown
# <Product>: product rules

RP-n (Regra de Produto). Each rule: what holds in every feature, why, source.

## <Theme>

- RP-1 <rule, one sentence>. Why: <one line>. [RD-n · <person, YYYY-MM-DD> · <feature> RN-n]
```

## terms.md

```markdown
# <Product>: terms

The product's own words; the area's words are in `docs/domain/terms.md`.

| Term | Meaning | Not to confuse with |
|---|---|---|
```
