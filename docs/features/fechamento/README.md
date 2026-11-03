# Fechamento (closing a cut)

Status: settled · Depth: full · Round: 3
Updated: 2026-10-22

The project admin or manager closes one cut (recorte: project × crop × crop year, for example milho 2025) by picking, on the comparison selection screen, the real calculation per plot (talhão) and module. Closing locks a snapshot. Export, PDF, QR code and auditor read from the closing.

## Sources

- Meeting: [2026-09-29 Peterson strategy and next features](../../meetings/2026-09-29-peterson-strategy-next-features/minutes.md) (topic 8)
- Round 1: written answers of Paulo Rocha and Ruan Carlos Oliveira, 2026-09-30
- Meeting: [2026-10-02 closing by cut](../../meetings/2026-10-02-closing-by-cut/minutes.md) (round 2, topics 1 and 3 to 16)
- Round 3: Henrique (Z2) in chat, 2026-10-22, took every v2 provisional rule

## Files

| File | What |
|---|---|
| [understanding.md](understanding.md) | the request, what exists in the code, dependencies, risks, questions |
| [research.md](research.md) | ISO 14067, GHG Protocol LSR, VM0042, MRV platforms, with sources |
| [product-analysis.md](product-analysis.md) | today's flow, what breaks, proposed flow, hypotheses H-1 to H-8 |
| [rounds/1/questionnaire.md](rounds/1/questionnaire.md) | questions for Paulo and Ruan (Portuguese); Artifact: https://claude.ai/artifact/WsKJzRgjMiHHUwa6bvtDpB |
| [rounds/1/questionnaire.html](rounds/1/questionnaire.html) | the same questionnaire as an interactive page |
| [rounds/1/answers.raw.md](rounds/1/answers.raw.md) | Paulo and Ruan answers of 2026-09-30, verbatim |
| [rounds/1/analysis.md](rounds/1/analysis.md) | hypotheses confirmed or rejected, consensus, open points |
| [business-rules/v1.md](business-rules/v1.md) | rules after round 1 (RN-01 to RN-32, P-1 to P-13), replaced by v2 |
| [rounds/2/answers.raw.md](rounds/2/answers.raw.md) | the 2026-10-02 meeting turns routed here, verbatim |
| [rounds/2/analysis.md](rounds/2/analysis.md) | open points the meeting settled, rules changed or dropped |
| [business-rules/v2.md](business-rules/v2.md) | rules after round 2 (RN-01 to RN-45, P-3 and P-13 to P-17 open), replaced by v3 |
| [rounds/3/answers.raw.md](rounds/3/answers.raw.md) | Henrique's answer of 2026-10-22, verbatim |
| [rounds/3/analysis.md](rounds/3/analysis.md) | the six open points settled as proposed, what to confirm with Paulo and Ruan |
| [business-rules/v3.md](business-rules/v3.md) | **current version**: rules RN-01 to RN-49, no open point |
| [screens.md](screens.md) | screens inventory (validate, round 1), adopted from the Penpot file `GAIA · Fechamento`; status waiting-validation |

## In one page

- No calculation is "official" while the work goes on; the real one is picked per plot and module at closing time, with an explicit click.
- What closes is a cut: project × crop × crop year. The project has no year and goes on after a closing.
- Emissão gets a start and end month and year, and that period cuts the Remoção. Regenerativo gets a crop year.
- The project number is the area weighted mean, plot → farm → project.
- Closing locks, with or without audit. A returned closing is fixed on the same calculation; a verified one never reopens.
- A new emission factor never changes a locked closing; it shows an alert.

## To confirm

Round 3 settled every open point with the team's proposal, without Paulo and Ruan. In the design walkthrough, confirm P-3 (Paulo said in round 1 that only GAIA reopens), P-13 (fallow months go to the next crop) and P-15 (Biodiversidade out of the closing's numbers).
