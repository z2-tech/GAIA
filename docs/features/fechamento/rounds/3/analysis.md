# Analysis, round 3: fechamento

Sources: [answers.raw.md](answers.raw.md) (Henrique (Z2), 2026-10-22, in chat). Paulo Rocha and Ruan Carlos Oliveira were not asked in this round: Henrique took every provisional rule of [v2](../../business-rules/v2.md) so the feature can go up for testing. They can still overturn any of them in the design walkthrough.

## What changed in our understanding

1. **Every open point now follows its provisional rule.** Henrique accepted all six together ("façå com suas recomendacoes"). Nothing new was said about the content, so the provisional rules become settled rules as written.
2. **The goal moved to testing.** "preicso colocar isso no ar ara testar": the next steps aim at a build people can try, not another round of questions.

## Hypotheses

No hypothesis was open after [round 2](../2/analysis.md).

## Consensus: becomes a rule

With one respondent, consensus means the answer matches the team's suggestion and no other source contradicts it. That holds for all six, with one tension noted under the table.

| Rule | Base |
|---|---|
| Admin or manager reopen a closing without audit, always with a written reason; the PDF and QR code issued before stop being valid (RN-29, RN-30) | Henrique (P-3); [2026-10-02 33:28] Ruan; [2026-10-02 41:40] Henrique |
| The Remoção months between two crop periods go to the next crop's cut (RN-48) | Henrique (P-13); GHG Protocol Land Sector and Removals Standard ([research](../../research.md)) |
| GAIA corrects a calculation error found in a locked closing, with a written reason, and the closing shows it (RN-45) | Henrique (P-14); [2026-10-02 46:48] Paulo |
| Biodiversidade gets a crop year and stays out of the closing's numbers (RN-01, RN-46) | Henrique (P-15); [2026-10-02 63:48] Paulo |
| A Remoção calculation locked by one closing can be used by a closing of another crop, each with its own period cut (RN-49) | Henrique (P-16); [2026-10-02 25:32] Paulo |
| Benchmarks use only calculations in a closing; the other dashboards use every calculation (RN-17, RN-47) | Henrique (P-17) |

Tension: RN-32 says GAIA never acts on the owner's data, and RN-45 now has GAIA correct a calculation error. v3 writes RN-45 as the one exception to RN-32, always with a written reason shown on the closing.

## Open points

None. Paulo and Ruan never answered P-13 to P-17 themselves, and on P-3 Paulo said in round 1 that only GAIA reopens [R1 Q15]. Worth confirming in the design walkthrough.

## New requirements

None.

## What the code says about the answers

Not checked this round: the answers add no fact about existing code. `/architect fechamento` reads the code.

## Agenda for the next round

No round is planned. In the design walkthrough with Paulo and Ruan, confirm P-3 (Paulo said only GAIA reopens), P-13 and P-15.
