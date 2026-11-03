# Fechamento · screens

Status: waiting-validation · Mode: validate · Validation round: 1
Business rules: [v3](business-rules/v3.md) · Design file: [GAIA · Fechamento](https://design.penpot.app/#/workspace?team-id=a5ac146a-5787-80fa-8008-b16bcfbb7d56&file-id=7eed092c-bad6-802e-8008-be5e9ed61bc2)
Updated: 2026-11-03

Adopted file: drawn on 2026-10-05 against the older `TODO/00_calculo_final` rules, before v3. The file is not changed here. What clashes with v3 is listed under Differences, and the next drawing fixes it. Frame ids below are Penpot ids; all frames live in `GAIA · Fechamento`.

## Screens

| # | Flow | Screen / frame | Journey step | Rules | Open points | Page · frame |
|---|---|---|---|---|---|---|
| T-1 | 01 Cálculos do talhão | Lista de avaliações do talhão, com avaliação travada | 8 | RN-05, RN-21, RN-24 | | 01 Cálculos do talhão · `4cce18b8-6f98-80b9-8008-be65a6e22f56` |
| T-2 | 01 Cálculos do talhão | Avaliação travada, resultado com alerta de fator antigo | 8 | RN-21, RN-22, RN-23, RN-43, RN-44 | | 01 Cálculos do talhão · `4cce18b8-6f98-80b9-8008-be66a8382001` |
| T-3 | 02 Fechamentos do projeto | Fechamentos (lista do projeto) | 8 | RN-24, RN-28, RN-42 | | 02 Fechamentos do projeto · `4cce18b8-6f98-80b9-8008-be5fd5f13639` |
| T-4 | 02 Fechamentos do projeto | Fechamentos, fechamento criado | 6 | RN-21, RN-42 | | 02 Fechamentos do projeto · `4cce18b8-6f98-80b9-8008-be5ffb4a0f2a` |
| T-5 | 03 Novo fechamento | Recorte (cultura, ano safra, módulos) | 4 | RN-01, RN-03, RN-37 | P-15 | 03 Novo fechamento · `4cce18b8-6f98-80b9-8008-be60bde76d7d` |
| T-6 | 03 Novo fechamento | Cálculos (um por talhão e módulo) | 4 | RN-02, RN-20, RN-35, RN-39, RN-40, RN-49 | P-13 | 03 Novo fechamento · `4cce18b8-6f98-80b9-8008-be617185766b`; período por talhão: 06 Modelo A · `968494f0-2737-8093-8008-bfd6e195896d` |
| T-7 | 03 Novo fechamento | Revisão (resumo e como fechar) | 5, 6 | RN-12, RN-13, RN-14, RN-15, RN-18, RN-19, RN-25, RN-41 | | 03 Novo fechamento · `4cce18b8-6f98-80b9-8008-be6291ee32a6` |
| T-8 | 04 Fechamento | Fechamento fechado | 6 | RN-13, RN-21, RN-22 | | 04 Fechamento · `4cce18b8-6f98-80b9-8008-be63b2bfc5c9` |
| T-9 | 04 Fechamento | Fechamento em verificação | 7 | RN-21, RN-25 | | 04 Fechamento · `4cce18b8-6f98-80b9-8008-be63bf21aee2` |
| T-10 | 04 Fechamento | Fechamento devolvido (cálculos destravados, reenviar) | 7 | RN-26, RN-32 | | no frame |
| T-11 | 04 Fechamento | Fechamento verificado | 7 | RN-27, RN-28 | | 04 Fechamento · `4cce18b8-6f98-80b9-8008-be63dbc4b776` |
| T-12 | 04 Fechamento | Reabrir (dialog com justificativa) | 8 | RN-29, RN-30 | P-3 | no frame |
| T-13 | 05 Período de cultivo | Emissão, etapa Cultura e Produto: início e fim do cultivo | 2 | RN-34, RN-35, RN-48 | P-13 | 05 Período de cultivo · `968494f0-2737-8093-8008-bfd3dc2a294d` |
| T-14 | 05 Período de cultivo | Regenerativo: ano safra da avaliação | 2 | RN-36 | | no frame |
| T-15 | 05 Período de cultivo | Biodiversidade: ano safra da avaliação | 2 | RN-46 | P-15 | no frame |

### Context from other features

| Screen / frame | Owning feature | Page · frame |
|---|---|---|
| Comparison selection screen (project, farms, plots, calculation per module), where RN-39 places the closing | `comparacao-ampliada` (Comparação, existing) | `GAIA · Carbono emissão`, `Comparação ·` pages |
| Auditor asks for corrections or approves (what moves T-9 to T-10 or T-11) | `auditor` | none yet |
| "Baixar PDF verificado" on T-11, and the PDF and QR that RN-30 invalidates | `pdf-fechamento`, `qr-verificacao` | none yet |

## Differences between the design file and the rules

| Where | Difference | What to do |
|---|---|---|
| T-1 `be65a6e22f56`, 01 frame "Ações (definir como principal)" `be65ac8f8a58` | A calculation pinned to the top ("Fixar no topo", "Fixados no topo: são sugeridos… no fechamento") works as an official mark, which RN-04 dropped | Redraw T-1 without the pin and its hint; drop the "Ações" frame |
| T-6, 03 frame "Cálculos (principais aplicados)" `be61789795b5` | "Usar fixados (21)" fills every cell in one click; RN-40 asks for an explicit click per plot and module | Drop the button and the frame |
| T-5 | "21 cálculos fixados" summary line comes from the pin | Drop the line |
| T-6 | The closing runs as its own wizard from the project's Fechamentos tab; RN-39 says it is made on the comparison selection screen | Ask in the meeting (below); redraw once decided |
| T-8 `be63b2bfc5c9`, 04 frame "Enviar para auditoria" `be6a7643c34b`, T-7 hint "Você pode enviar para auditoria depois" | A closed closing can be sent to audit later; RN-25 and the states diagram choose audit only when closing | Ask in the meeting; if RN-25 holds, drop the button, the dialog frame and the hint |
| T-10 | Journey step 7 and RN-26 have no frame | Draw in the next round |
| T-12 | "Reabrir" button exists on T-8, but no dialog with the written reason (RN-29) nor the warning that PDF and QR stop being valid (RN-30) | Draw in the next round |
| T-14, T-15 | Crop year on Regenerativo (RN-36) and Biodiversidade (RN-46) not drawn | Draw in the next round |
| 07 Modelo B `968494f0-2737-8093-8008-bfd6f53dbfea`, 08 Modelo C `968494f0-2737-8093-8008-bfd708b9b551` | Alternatives RN-03 settled against (the cut is crop × crop year, model A) | Drop both pages |
| Frame names in 01 and 03 | Still say "principal", the label before the pin | Rename when redrawn |

## For the validation meeting

- T-6: closing as its own wizard in the Fechamentos tab, or on the comparison selection screen as RN-39 says? The drawn matrix (farm, plot, one cell per module) could become that screen.
- T-8: can a closing made without audit be sent to audit later (drawn), or only at closing time (RN-25)?
- T-7: Remoção is shown per hectare (tCO₂/ha, with tC/ha below); RN-14 and RN-41 talk about t C and t CO2 for the crop period. Per hectare, total, or both?
- T-3: the list card shows state, date and how many farms and plots, no carbon numbers; RN-42 says each closing shows "its summary". Is that enough?
- T-6: the Remoção cell waits for the Emissão choice ("Escolha a emissão primeiro"), since the Emissão period cuts the Remoção (RN-35). Label proposed by the draft.
- T-11: the PDF shows only on a verified closing; RN-30 implies a PDF for a closing without audit too. Content belongs to `pdf-fechamento`.
- P-3: only admin and manager reopen, with a written reason (Paulo said in round 1 that only GAIA reopens). Not drawn yet (T-12).
- P-13: fallow months count in the next crop's cut (RN-48). T-6 shows each plot's counted months; the fallow is not visible yet.
- P-15: Biodiversidade stays out of the closing's numbers; T-5 lists only Emissão, Remoção and Regenerativo.
