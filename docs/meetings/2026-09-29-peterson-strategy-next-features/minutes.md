# Meeting 2026-09-29: Peterson strategy and next features

## Files

| File | Content |
|---|---|
| this file | minutes |
| [transcript.md](transcript.md) | transcript with speakers (Portuguese) |
| `captions.srt` | raw Google Meet captions, unedited |

## Sources and confidence

| Source | Covers |
|---|---|
| Google Meet captions (`captions.srt`) | 00:00 to 58:49, with speaker names. Text is lost when two people talk at once, and many sentences start in the middle |
| Wispr Flow note "Platform Design Review and Strategy" ([link](https://notes.wisprflow.ai/shared/Q4njMucOFZ3BcIlYGgDC6Yi7VIDxmfG5BJVcGgKn_DE)) | 00:00 to about 27:30, no reliable speaker names. Used only to fill words the captions cut |

The original recording (`~/Downloads/crb-yspc-hnb (2026-09-29 16_05 GMT-3).mp4`) is no longer on disk, so there was no Whisper (speech to text) pass. After about 27:30 the captions are the only source. Captions with no name, and the "Z2 Tech" account, are Henrique. Paulo's and Henrique's connections dropped between about 28:00 and 30:52; that stretch is side talk only.

## Participants

- Paulo Rocha: Peterson
- Ruan Carlos Oliveira: Peterson
- Henrique (account "Z2 Tech"): Z2, led the meeting and the demo
- Felipe Gonçalves: Z2
- Leonardo Paiva: Z2

## Why the meeting

Weekly review: how to place GAIA inside Peterson, a demo of the redesigned platform (design system, comparison, mobile), and the next features.

## Summary by topic

### 1. Placing GAIA inside Peterson [00:00 to 08:52]

Paulo showed the platform to a senior Peterson director so nobody would hear about it second hand; the director liked it. His worry is a new director who could see it as an employee building a competing platform. The plan now is to present it in Brazil, starting with Danilo. Ruan suggested framing GAIA as adding value to Peterson projects, not competing [06:56]. Paulo proposed a contract with a purchase option [07:12]. Paulo said Peterson lost a 300,000 € two year proposal to Mars because it had no MRV (measurement, reporting and verification) tool of its own [07:12]. Henrique asked whether GAIA could be an extra charge inside each consulting project [04:00]; Paulo agreed that data processing and MRV is GAIA's part [04:08].

### 2. Demo: design system and comparison [09:00 to 15:56]

Henrique showed the platform on dev. The design moved from Figma to Penpot, now a design system with every component, typography and color. New modules go to design first, checked field by field, then to development; Biodiversidade is next [09:00]. Comparison now works for Emissão, Remoção and Regenerativo, from 1 to 4 items, by line and total; the API already accepts 20 [11:52]. A new API will return only valid options on the selection screen [11:52]. Paulo asked for more than 4, since projects often have 10 farms, maybe as charts only [14:32, 14:56]. Henrique raised a consolidated view per farm [15:04]. The design was approved [15:44].

### 3. Expert testers [11:20 to 11:52, 55:36 to 56:36]

Paulo and Ruan plan to pay day rates to two specialists, João (soil carbon) and Day (emissions), to test the calculations [11:20]. Henrique asked for this to happen soon, before more is built on a mistake [55:36]. Paulo will talk to them this week and have them test with real data [56:24].

### 4. Mobile app [15:56 to 18:36]

The mobile app focuses on data collection, offline first, with sync and a conflict screen when web and mobile edit the same data [18:16, 18:36]. Testing is through an APK (Android package file) sent over WhatsApp; an iPhone build needs a paid Apple account [15:56]. Company phones are Android [17:40]. Paulo said mobile is not priority number one now [17:24].

### 5. Design budget [18:36 to 26:28]

There is about 5,000 for design. A designer friend, Beto, has a CNPJ (Brazilian company tax id) and can be the third quote [18:36]. Ruan preferred spending on the platform user experience over a landing page [21:12]; Henrique said Beto does logos and landing pages, and the platform follows the current pattern [22:00]. Ruan said the money must be used by February [23:12]. The Peterson answer is expected by January [23:28]. The quote should be issued close to payment so the date does not raise questions [25:28].

### 6. Raw data export and PDF [26:40 to 27:40, 30:28 to 31:08, 47:08 to 47:36]

Paulo's first priority: download data. Raw input data in Excel (fertilizer, lime and so on, farms as columns, numbers per farm), per project and module [27:12, 30:56]. The dashboard as a PDF [27:12]. Henrique: Excel is raw data, PDF is the dashboard [47:36].

### 7. QR code and public verification [30:56 to 38:08, 43:40 to 48:56]

Paulo wants a QR code on the PDF that opens the GAIA site and proves the result came from the platform [30:56]. Use case: a company prints it on a lot (cotton, corn) for traceability [31:52]. Henrique raised security and access [31:36, 32:32]; Paulo said a code printed on a package is meant to be public [32:56]. Ruan raised mass balance at chain level [34:24]; Paulo said the scope is the farm, not the chain [35:04]. Ruan: the point is proving the data was not altered, like a university document checked on the university site [35:20]. Henrique: a public page per project with an encrypted id, built from the database [37:12, 44:28]. Paulo floated a simple login [45:16]; Ruan said that adds too much for the public [46:28]. What the page shows is still open: maybe the farm map and a simplified dashboard with the main carbon number [37:44 to 37:56], one module or a summary of every module the client hired [48:56]. The market usually does carbon only [48:56].

### 8. Final calculation versus simulation [38:08 to 42:28]

Henrique asked whether the project number aggregates every farm, plot and calculation [38:08]; Paulo said it would be an average of the farm [38:16]. Henrique: calculations are made so users can try things; the platform needs a way to mark which calculation is the real one per plot, farm and project, the others being simulations [38:24, 39:24]. Paulo: a project starts with a baseline, simulations sit on top of it, and a sale ships only the real data, "the photo of that moment": footprint now and carbon stock now, maybe plus 5 years for stock [39:44]. Verification is done on that real data [41:12]. Henrique: users simulate freely and, when they close, select only what they will sell [40:56].

### 9. Auditor [41:12, 42:56 to 53:20]

Paulo described the flow: the farm group closes, Control Union (Peterson's sister company) verifies inside the platform, then the dashboard and QR code are generated [41:12]. Ruan asked how to avoid anyone signing up as an auditor [42:56]. Henrique described a past project: the project owner invites the auditor by email, the auditor creates a user and sees what the owner grants, and audits inside the platform [46:36]. Agreed it works [47:08]. Access: the project, all farms, plots, and the calculations marked as final, with all inputs and evidence [50:16]; primary data [50:52]; emission factors used [50:52]; the backend calculations [51:28]; Excel and PDF downloads [48:56]. Charging: the client asks for verification, Control Union quotes, GAIA passes it on with a margin [51:52]. Ruan mentioned Verra's certified verification bodies as a future model [52:44].

### 10. Priority [53:20 to 54:56]

Henrique: three features (export with PDF, QR code, auditor) come before new calculators [53:20]. Paulo agreed; Biodiversidade waits [53:56]. Henrique estimated about a month of development and will sketch designs from the recording, with input needed on what the QR page shows [54:16].

### 11. Market references [55:24 to 55:48]

Paulo named platforms that already have a QR code: "Puma" [?], "CR" [?], Regrow, and another "Farm" platform [?] [55:24].

### 12. Cadence [56:56 to 58:28]

Weekly meeting, Tuesday at 16:00 [57:48]. Felipe will plan the development and asked Paulo and Ruan to follow it in Plane [57:24].

## Decisions

- New modules go through design in Penpot before development; Biodiversidade is next in design [09:00]
- The redesigned comparison is approved [15:44]
- Mobile goes on with Android APK only; iPhone waits [17:36 to 17:48]
- Mobile focuses on offline data collection; charts are a plus [18:04]
- The design budget waits for the Peterson outcome; the quote is issued close to payment [23:28, 25:28]
- Next three features, before new calculators: raw data Excel with dashboard PDF, QR code verification, auditor [47:08, 53:20]
- The platform will distinguish the real calculation from simulations; only the real one is used when closing [40:56]
- The QR code verifies at farm level, not supply chain level [35:04]
- The QR page is public by link, with no login [44:28, 46:28]
- The auditor is invited by the project owner and audits inside the platform [46:36, 47:08]
- The auditor sees the final calculations with all inputs, evidence and emission factors, and downloads Excel and PDF [48:56, 50:16, 50:52]
- Weekly meeting, Tuesdays at 16:00 [57:48]

## Open points

- Compare more than 4 items, maybe as charts only [14:32, 14:56]
- A consolidated view per farm [15:04]
- What the QR page shows: farm map, simplified dashboard, carbon only or every hired module [37:44, 48:56]
- How the project number is formed from farms and plots (an average was mentioned) [38:08, 38:16]
- How the user marks the real calculation per plot, farm and project [38:24]
- Auditor charging model and accredited verification bodies [51:28, 52:44]
- Who the auditor is beyond Control Union [44:28]

## Owners

- Paulo · present GAIA to Danilo at Peterson · soon
- Paulo and Ruan · hire João and Day to test with real data · this week
- Paulo · send the names of platforms with QR codes [55:24]
- Paulo and Ruan · say what the QR page must show [37:12, 54:16]
- Henrique · sketch the new features from the recording [54:16]
- Henrique · send the mobile APK over WhatsApp [17:48]
- Z2 (Rosa) · API that returns only valid options on the comparison selection screen [11:52]
- Felipe · plan the development and share it in Plane [57:24]

## Routing
<!-- routing: /discovery -->
| Topic | Goes to | Status |
|---|---|---|
| 1. Placing GAIA inside Peterson | not a feature | — |
| 2. Demo: design system and comparison | `comparacao-ampliada` · `consolidado` | pending · pending |
| 3. Expert testers | not a feature | — |
| 4. Mobile app | `mobile-app` (new) | pending |
| 5. Design budget | not a feature | — |
| 6. Raw data export and PDF | `export-excel` · `pdf-fechamento` | pending · pending |
| 7. QR code and public verification | `qr-verificacao` | pending |
| 8. Final calculation versus simulation | `fechamento` | done: fechamento business rules v1 |
| 9. Auditor | `auditor` | pending |
| 10. Priority | not a feature | — |
| 11. Market references | `qr-verificacao` | pending |
| 12. Cadence | not a feature | — |
