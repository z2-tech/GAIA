# Product analysis: fechamento

## Today's flow

1. The consultant creates a project, its farms and plots.
2. In each plot they create as many Emissão (LCA) and Remoção (RothC) calculations as they want; Regenerativo has one primary per farm, picked by the platform (the first one), and the web gives no way to change it.
3. When completeness reaches 100%, the project turns `completed` by itself, and back to `in_progress` if anything changes.
4. Comparison and benchmark take every calculation the user can see.
5. To report a number, the consultant picks a calculation by memory and copies the result out of the platform.

## What breaks

- Nothing says which calculation is real; a test and the real one look the same · consultant, buyer · understanding (no flag outside Regenerativo)
- A published number can change: recalculating overwrites it, a factor update changes it, the Regenerativo score moves when weights change · buyer, auditor · understanding, code
- There is no period on most modules, so "corn 2025" cannot be told apart from "corn 2024" outside Emissão · consultant, auditor · code
- No project number exists; the client needs one per project and the platform has no farm or project mean · client, buyer · understanding 38:16, code
- "Completed" is automatic and reversible, so it cannot mean "declared" · client · code
- Benchmarks mix tests and real calculations · everyone reading a benchmark · code

## Opportunities

- One explicit moment where the user says "this is real" and the platform freezes inputs, results and factor versions: the "foto daquele momento" Paulo asked for [2026-09-29 39:44]
- Export, PDF, QR code and auditor all read the same frozen record, so they always agree
- The frozen record lets the platform show that newer factors exist without changing what was declared (research: LSR requirement 29)
- Reusing the comparison selection screen (project, farm, plot, calculation) for the choice, instead of a new place

## Proposed flow

1. While the project runs, every calculation is free: create, change, delete, mark and unmark the official one.
2. The consultant marks the official calculation per plot and module (name to confirm).
3. Finalizing the project is an explicit action with a review step: per plot and module, confirm the official calculation.
4. On confirmation the official calculations lock, and the platform stores the snapshot: inputs, results, factor versions.
5. The PDF, QR code, export and auditor read from that snapshot.
6. Control Union verifies; the project may become "verified".

## Hypotheses

The round 1 questionnaire confirms or rejects each one ([rounds/1/questionnaire.md](rounds/1/questionnaire.md)).

- **H-1 · Lock at finalize:** official calculations stay free while the project runs and lock only when the project is finalized. Tested by questions 12, 13, 16.
- **H-2 · Journey:** Peterson closes a project with a client (several farms), the field collects data, the consultant fills the baseline and simulations, picks the official ones, someone finalizes, Control Union verifies, and the PDF with QR code goes to the client and buyer. Tested by questions J1 to J9.
- **H-3 · One official per plot, module and season:** without a period no product footprint can be declared or compared year to year. Tested by questions 5, 6, 7, 8.
- **H-4 · Name "Oficial":** "linha de base" and "cenário" already mean something else in Remoção (the BAU and project scenarios). Tested by question 3.
- **H-5 · Finalizing is explicit:** 100% becomes "ready to finalize", not "completed". Tested by question 13.
- **H-6 · Factors do not restate finalized numbers.** Tested by question 19.
- **H-7 · Dashboards, comparison and benchmarks use only official calculations by default.** Tested by questions 24, 25, 26.
- **H-8 · Convenience defaults:** a single calculation becomes official by itself; deleting the official one asks the user to choose; existing projects get the newest calculation as official, for review. Tested by questions 27, 28, 29.

## Out of this feature

- The content of the PDF and of the QR page · `pdf-fechamento`, `qr-verificacao`
- Auditor invitation, access and the return flow · `auditor`
- The Excel layout · `export-excel`
- More than 4 items on the selection screen · `comparacao-ampliada`
