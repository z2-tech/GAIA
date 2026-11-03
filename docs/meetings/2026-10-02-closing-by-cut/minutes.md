# Meeting 2026-10-02: closing by cut

## Files

| File | Content |
|---|---|
| this file | minutes |
| [transcript.md](transcript.md) | transcript with speakers (Portuguese) |
| [captions.srt](captions.srt) | raw Google Meet captions, unedited |
| [whisper.srt](whisper.srt) | raw Whisper (speech to text) output, unedited |

## Sources and confidence

| Source | Covers |
|---|---|
| Google Meet captions (`captions.srt`) | 00:00 to 01:10:08, with speaker names; sentences get mixed when two people talk at once |
| Whisper (`whisper.srt`) | 00:00 to 01:10:08, no speaker names; checked against the captions where they were cut, and it matched them |
| Recording `~/Downloads/sct-expc-ros (2026-10-02 12_01 GMT-3).mp4` | no longer on disk; both raw files were taken from it earlier |

## Participants

- Henrique (Z2, through the "Z2 Tech" account): leads the meeting and the demo
- Paulo Rocha (Peterson)
- Ruan Carlos Oliveira

## Why the meeting

Henrique sent questionnaires on the final calculation, export Excel, QR code, PDF and auditor. The answers raised doubts about how the product should work, so this meeting was to clear them, starting with the final calculation, the one the other features depend on [00:00].

## Summary by topic

### 1. Using the comparison selection screen as the source of official data [01:00–02:32]

Paulo proposes reusing the screen where you filter farms and plots (talhões) in the comparison as the place where you pick the data that goes out as official, to generate the certificate, ask for verification and get the QR code. The certificate comes out at project level: a weighted mean of the farms, for emission, emission factor, sequestration and biodiversity.

### 2. Demo: an Emissão calculation for milho 2025 [02:32–12:44]

Henrique registers a test project ("projeto Henrique"), a farm and plots, and fills an Emissão (LCA, life cycle assessment) calculation for milho 2025 with values Paulo and Ruan dictate. Comments on the form as they go:
- Ruan: the harvested amount unit reads as total for the whole area [05:48].
- Urea shows up twice; it should be one only. Ruan: the 0,46 field (nitrogen percentage) can be removed [08:00–08:04].
- Seed: Henrique asks whether it should be pulled from the crop already chosen, since a calculation has only one crop [09:28].
- Fuel: the field is total. Paulo thinks it should be per hectare; Ruan agrees it makes it easier [11:16–11:32].
- Energy: Ruan and Paulo say electric energy stays total, taken for the whole property [12:20–12:28].
- Transport: total, 20 km [12:36–12:44].

### 3. Crops per crop year and verification per crop [12:36–17:00]

Paulo: within one crop year (ano safra) a plot can have up to three crops [05:08]. The certificate is issued for one crop. Emissão (LCA) is already done per crop, so there is no problem there; Remoção (carbon removal) needs an allocation criterion to split the carbon among crops in a rotation (soy, corn, cotton, cattle). Perennial crops like coffee do not have this problem [13:20]. The client asks for a verification for one crop and one year [15:24]. Usually the current year, because grain does not stay stored long and the buyer asks for it, but an earlier year is possible with evidence (for example 2022) [15:44–16:04].

### 4. Per plot or per farm [16:40–21:44]

Remoção and Emissão can be calculated per plot or for the whole farm [17:12–17:40]. Ruan suggests drawing the property first and then optionally splitting into plots [18:16]. Paulo thinks the flow is fine as it is: a homogeneous farm is registered as a single plot the size of the farm [19:56]. Henrique agrees to keep it and revisit if it causes problems [20:28].

### 5. Weighted mean plot → farm → project [21:44–23:24]

Paulo: verification is at project level. With plots inside farms, first a weighted mean gives the farm value, then a second weighted mean gives the project value. Example: a 100 ha farm at 0.1 t per t of corn and a 1000 ha farm at 0.2 t. The weight is the farm size [22:24–23:12]. Paulo offers to send an Excel file showing the calculation [23:12].

### 6. Does the project have a year? [23:24–31:12]

Henrique asks whether the project should carry a year at creation. Ruan: work can be done for earlier years, retroactively [24:12]. Paulo: no year on the project; the year comes in inside the farm, and you choose the year when closing [24:32]. For Remoção you enter all the management of every year, and the platform cuts out the gain within the chosen crop [25:32]. Henrique worries the modules are not linked (as many Emissão and Remoção as you want, only one Regenerativo) and proposes fixing the scope on the project instead [27:04]. Paulo: Regenerativo looks at the whole farm for a given year, Emissão looks at the crop, Remoção at a period; closing by year on the project gets complicated. Keep the structure and choose the period at the filter; only add a year to the Regenerativo score [27:24]. Regenerativo: as many as you want, with a closed crop year [28:44–29:52]. Before asking for verification the user selects, on that filter screen, which calculation is the real one (for example "milho 2025 model 1" was a test, "milho 2025 real" for farm 1) [30:16]. Henrique describes it as a "finalize project" screen where you select the calculations per module [30:48].

### 7. When it locks, and reopening [31:12–35:16]

Henrique asks whether it locks when the project is finalized or when it is sent to verification. Paulo: when it is sent for verification the project locks and goes to the auditor; only the auditor acts. If the auditor finds issues it goes back and unlocks; if the auditor approves, it stays locked with no way back [31:48]. Since a project may have many calculations, the automatic completion at 100% goes away and there is a finalize button [32:56]. Ruan: for footprints done for PepsiCo or Nestlé there is no audit; the work can be finalized and still opened and edited later, and the claim reported without audit [33:28]. Paulo: that depends on the contract (yearly fee, baseline only, multi year with a verification each year) [34:40]. Henrique: audit can be a package of the platform [35:16].

### 8. Claim, and Remoção for the year [35:16–41:56]

Paulo explains claim: the company communicates a calculated result to the market, for example in a sustainability report [35:56]. In offsetting (Verra), the claim is made in year zero on a 5 year modelling and checked in year 5. In insetting the rule is not clear; what they do is model for each year. Selling this year's corn, the claim is the footprint for 2025 and the sequestration modelled for 2025, for that crop and year, while the full modelling is kept to understand the carbon curve [37:20–38:20]. Henrique: then the Emissão defines the cut. A crop "milho 25" is not January to December, so Emissão should carry a start month and year and an end month and year (for example January to August 2025), and the Remoção is cut by that period [39:20–40:28]. Paulo agrees: with planting and harvest months the Remoção cut is more accurate [40:44]. Henrique adds the same logic to the Emissão form [41:40].

### 9. Updated emission factor [41:40–47:12]

Paulo hesitates: in a 5 year project you can correct course, but if the corn was sold with one factor, changing it later is not fair [43:12]. Henrique: lock what is past (years 1 and 2 when you are in year 3) [43:36]. Paulo: correct the factor for new ones, but what was locked stays [44:08]; example of urea factor changing from 0.1 to 0.08 [44:36]. Ruan agrees [44:48]. Henrique: keep the locked snapshot ("a photo of that screen") and show an alert that it was calculated with an older factor, without updating it [45:12]. Paulo: the problem appears once the platform starts being updated, which is needed as it evolves [45:48]. Paulo and Ruan: what is locked does not change, unless it was a calculation error [46:48–46:56]. Locking means finalized or audited and approved [47:00–47:04].

### 10. Audit decided when closing, and the auditor [47:12–49:48]

Paulo: some clients know at the start that they want verification, others decide halfway, so it does not need to be set at project creation; it can be at the end [47:32]. Henrique: at finalize time the state becomes waiting for audit or finalized [47:44]. Control Union is the auditor used today, but it can be any audit firm [48:40]. Paulo: the auditor gets a login by email, enters an area where he cannot change data, sees the spreadsheet, PDFs and evidence, downloads them, and comments [49:04]. Henrique: closing is built first; PDF, QR code and auditor come after, because closing is more complex than expected [49:12]. Paulo: the structure does not change; the work is the weighted mean rules at closing [49:48].

### 11. Weight of the mean: area or production [50:12–53:08]

Henrique asks what the weight is; area in hectares [50:12]. Paulo hesitates: for soil it is area, but for emissions area weighting penalizes a small farm with high productivity [51:04]. Henrique: it is among farms of the same project [51:40]. Paulo: the company has a project with many farms; in the end, weighted mean by area always [52:44].

### 12. Who closes [53:28–54:24]

Henrique proposes the project admin. Paulo: admin and manager; if they do not close, GAIA closes because the contract ended [53:44]. Henrique: GAIA does not touch anything; the owner sends to audit, finalizes, or not [54:08]. Paulo: GAIA closes when the contract ends [54:24].

### 13. Data from the mobile app [54:08–55:56]

Henrique: data filled on the phone counts as if filled on the web; offline in the field, with a conflict screen when syncing [54:08]. Paulo: the data is official; the phone is for collection, processing happens later [55:20]. Ruan had answered "draft" because the data sits in an outbox until it is sent; it must be sent to enter the calculation. Paulo: it is only naming [55:32–55:44].

### 14. Auditor sends back [56:00–57:40]

If the auditor rejects, the user fixes the same calculation that was sent, not a new "milho 2025 V2" [56:00–56:28]. Ruan: keep this practical; with Regenagri it is slow [56:32]. Henrique: projects in audit with an issue show in red, and the click goes straight to the wrong field with the auditor's comment [56:56].

### 15. Closing dashboard and the project afterwards [56:56–60:20]

Henrique: a project tab with the dashboard of the finalized cut, summing plots and farms with the weighted mean [58:08]. Paulo: a multi year project continues; the closed one stays locked inside it, and past years feed charts [59:20]. Henrique: the project gets consolidated dashboards per closed year [59:48].

### 16. Closing from the selection screen [59:48–64:56]

Henrique asks whether a plot with a single calculation goes in automatically or the user must click each one [59:48]. Paulo: do not finalize per farm; always use the selection screen, where you either close (with or without audit) or compare [60:56–61:24]. Henrique: the user must click to confirm each one [61:44]. Paulo: one project, select the farms, then the plots, then in each plot the calculation that is real; behind that sit the weighted means, and the result is for the total area of that project and that crop [62:20]. Henrique: then the selection needs more than four items [62:36]. Paulo: comparing farms, comparing plots within a farm, and the data sent for verification are three different things. The verification shows single numbers: footprint and emission per hectare; Remoção within that period for that crop, in t C and t CO2; the Regenerativo score for that year. This dashboard is simpler than the comparison [63:48].

### 17. What is needed from Paulo and Ruan, and the export Excel [64:56–68:00]

Henrique asks for the content of an interesting dashboard, of the PDF and of the QR code page; a simple hand drawn model is fine [64:56]. On the Excel export: Paulo says variables in rows and farms in columns, raw data only (urea, fuel, litres, kilos per farm). For the auditor, a separate standard Excel with the emission factors and their source [66:52]. Ruan: clean raw data, no calculation behind it [67:04]; the auditor needs the source of the factor and the origin of the data [67:40].

### 18. Next steps [67:56–70:08]

Henrique will go over the meeting and go straight to design, then present it to Paulo and Ruan as a walkthrough to check the data and fields; once approved, development [67:56]. Closing chat: Paulo says João agreed to test [69:24].

## Decisions

- D1 The closing happens on the comparison selection screen: project, farms, plots, then the real calculation in each plot [01:00, 30:16, 60:56, 62:20]
- D2 The certified number is at project level, a weighted mean plot → farm → project [02:00, 21:44]
- D3 Verification is asked per crop and per year; any past year is allowed with evidence [15:24, 15:44]
- D4 Calculations stay possible per plot or per whole farm; a homogeneous farm is one plot the size of the farm; the structure does not change [19:56, 21:28, 49:48]
- D5 The project has no year; the year is chosen when closing [24:32, 27:24]
- D6 Regenerativo gets a closed crop year, and a farm can have more than one [28:44, 29:52]
- D7 Emissão gets a start month and year and an end month and year; that period cuts the Remoção [40:28, 40:44, 41:40]
- D8 For insetting, the Remoção claimed is the modelled sequestration for that year and crop [38:20]
- D9 Sending to verification locks; the auditor returning unlocks; approval locks for good [31:48]
- D10 There is a finalize button; automatic completion at 100% goes away [32:56]
- D11 What is locked does not change with a new emission factor, unless it was a calculation error; an alert shows the older factor; new ones use the new factor [44:08, 45:12, 46:48]
- D12 Whether there is an audit is chosen at closing time, not at project creation [47:32, 47:44]
- D13 The auditor can be any audit firm; gets a login, read only, with access to spreadsheet, PDFs and evidence, download and comments [48:40, 49:04]
- D14 Closing is built first; PDF, QR code and auditor after [49:12]
- D15 The weighted mean uses area, always [52:44]
- D16 Project admin and manager close; GAIA closes only when the contract ends [53:44, 54:24]
- D17 Data sent from the mobile app is official; "draft" or outbox is only naming [55:20, 55:44]
- D18 After an auditor return, the same calculation is fixed, not replaced [56:28]
- D19 The project continues after a closing; the closed cut stays locked inside it [59:20]
- D20 Each calculation is selected with an explicit click [61:44, 62:20]
- D21 The closing shows single numbers per module: footprint and emission per hectare, Remoção in t C and t CO2 for the crop period, Regenerativo score for the year [63:48]
- D22 Export Excel: variables in rows, farms in columns, raw data only; emission factors and sources in a separate standard Excel [66:52, 67:04]
- D23 Next validation is a design walkthrough with Paulo and Ruan, not another questionnaire [67:56]

## Open points

- Can a closing without audit be reopened and edited? Ruan wants it (PepsiCo, Nestlé work); Paulo says it depends on the contract [33:28, 34:40]
- Which criterion splits the Remoção among the crops of a rotation [13:20, 17:12]
- Deadlines for the auditor and for answers, and how many rounds back and forth [50:12]
- Content of the dashboard, the PDF and the QR code page [64:56]
- Fuel per hectare instead of total; energy stays total [11:20, 12:20]
- The audit return flow must stay fast (Ruan, Regenagri experience) [56:32]

## Owners

- Paulo · Excel example of the weighted mean [23:12]
- Paulo and Ruan · model of the dashboard, PDF and QR code page [64:56]
- Henrique · design of the closing, then a walkthrough with Paulo and Ruan [67:56]
- Henrique · notes on the Emissão form from the demo (urea twice, 0,46 field, seed, fuel, energy) [11:16, 12:36]

## Routing
<!-- routing: /discovery -->
| Topic | Goes to | Status |
|---|---|---|
| 1. Using the comparison selection screen as the source of official data | `fechamento` | done: fechamento business rules v2 |
| 2. Demo: an Emissão calculation for milho 2025 | `emissao-lca` (existing, scope row 6) | pending |
| 3. Crops per crop year and verification per crop | `fechamento` | done: fechamento business rules v2 |
| 4. Per plot or per farm | `fechamento` | done: fechamento business rules v2 |
| 5. Weighted mean plot → farm → project | `fechamento` · `consolidado` | done: fechamento business rules v2 · pending |
| 6. Does the project have a year? | `fechamento` | done: fechamento business rules v2 |
| 7. When it locks, and reopening | `fechamento` | done: fechamento business rules v2 |
| 8. Claim, and Remoção for the year | `fechamento` | done: fechamento business rules v2 |
| 9. Updated emission factor | `fechamento` | done: fechamento business rules v2 |
| 10. Audit decided when closing, and the auditor | `fechamento` · `auditor` | done: fechamento business rules v2 · pending |
| 11. Weight of the mean: area or production | `fechamento` | done: fechamento business rules v2 |
| 12. Who closes | `fechamento` | done: fechamento business rules v2 |
| 13. Data from the mobile app | `fechamento` · `mobile-app` | done: fechamento business rules v2 · pending |
| 14. Auditor sends back | `auditor` · `fechamento` | pending · done: fechamento business rules v2 |
| 15. Closing dashboard and the project afterwards | `fechamento` · `consolidado` | done: fechamento business rules v2 · pending |
| 16. Closing from the selection screen | `fechamento` · `comparacao-ampliada` | done: fechamento business rules v2 · pending |
| 17. What is needed from Paulo and Ruan, and the export Excel | `pdf-fechamento` · `qr-verificacao` · `export-excel` | pending · pending · pending |
| 18. Next steps | not a feature | — |
