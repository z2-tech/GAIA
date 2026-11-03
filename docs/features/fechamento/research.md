# Research: fechamento

Gathered on 2026-10-20. "(not verified)" = no primary source. Lines marked "reasoning" are our reading of the sources, not something a source says.

## How ISO 14067 treats the time period, the declared unit, and data from several sites

- The primary text is paywalled; the ISO pages returned 403 or 404. Clause titles seen in a third party copy of the table of contents: 6.4.4 (relating data to the unit process and the functional or declared unit) and 6.4.8 (effect of timing of emissions and removals) [third party copy](https://oss.carbonstop.com/website/agent/ISO%2014067-2018%20%E6%B8%A9%E5%AE%A4%E6%B0%94%E4%BD%93.%E4%BA%A7%E5%93%81%E7%9A%84%E7%A2%B3%E6%8E%92%E6%94%BE%E9%87%8F.pdf) (not verified)
- The 2018 edition is under revision [ISO news](https://www.iso.org/news/ref2317.html) (not verified)
- A rule for combining several sites: not found.

**So what:** do not cite ISO 14067 clauses in the PDF until someone checks the paid text. The closing should state its time window and its unit explicitly.

## How the GHG Protocol Land Sector and Removals Standard (LSR) reports removals per period

- Removals are reported per reporting year, on an annual or annualized stock change basis; monitoring can follow the crop rotation when data quality rules are met. Requirements 21.LMR and 23.LMR, chapter 13 [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- Losses are reported in the year they happen. When monitoring stops or is not renewed, removals reported earlier are assumed emitted. Requirement 23.LMR, page 75 [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- Ongoing monitoring of storage is mandatory; monitoring periods are consecutive and their length should follow the crop rotation; resampling at least every five years. Pages 69 and 70, requirement 21.LMR [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- Published 30 June 2026, effective 1 January 2027 [LSR page](https://ghgprotocol.org/land-sector-and-removals-standard)

**So what:** a removal claimed for one year is the stock change of that year, not the projection. A closed cut is one monitoring period; later losses show in later cuts, never by editing a closed one.

## How results are combined across farms: area or production

- The LSR has no rule for averaging farms. Its allocation hierarchy works inside one production system: economic value first, then area × time (m²·year). Section 6.3, page 31; aggregated data must be justified where disaggregation is required, requirement 32 [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- SBTi FLAG (Science Based Targets initiative, Forest, Land and Agriculture), v1.2 of March 2026, does not address combining farms or sourcing areas [SBTi FLAG](https://sciencebasedtargets.org/sectors/forest-land-and-agriculture)
- Value Change Initiative and ISEAL guidance on supply sheds: not found (not verified)
- Reasoning: summing absolute values per plot and dividing by the summed denominator (hectares for land metrics, tonnes for product metrics) gives the same result as a weighted mean by that denominator.

**So what:** no standard forces area or production as the weight; product decides, and the closing states which weight it used.

## Whether past results are restated when emission factors change

- The LSR asks to recalculate the base year when a methodology change, a data improvement or an error is significant, against a threshold the company writes down. Factor updates are not named explicitly. Requirement 29, chapter 17 [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- GHG Protocol Corporate Standard and ISO 14064-1 clause text: not accessed (not verified)

**So what:** a closed result is not restated by itself. Keeping the factor version in the snapshot lets the platform show that a newer factor exists without touching what was declared.

## What Verra VM0042 says about verification, locking and corrections

- Verification is per verification period, one to five years; a period of several years is quantified year by year to define vintages. Section 8 and 8.1 [VM0042 v2.2](https://verra.org/wp-content/uploads/2024/09/VM0042v2.2.pdf)
- Soil organic carbon is remeasured every five years or before each verification, whichever comes first; values estimated in advance are replaced by monitored data at each verification [VM0042 v2.2](https://verra.org/wp-content/uploads/2024/09/VM0042v2.2.pdf)
- v2.2 is active since 21 October 2025; a corrections document of June 2026 exists, content not checked [Verra VM0042 page](https://verra.org/methodologies/vm0042-methodology-for-improved-agricultural-land-management-v2-0/)
- A lock concept or a rule for corrections after verification: not found in the v2.2 text.

**So what:** Verra is an offsetting standard; GAIA works with insetting, but the idea of a verification event over a fixed period, split by year, maps to one closing per crop year.

## How MRV platforms handle it in practice

- Cool Farm Platform: only assessments with status "submitted" enter an aggregation report; edits in progress stay out until resubmitted [Cool Farm sharing and aggregation guide](https://coolfarmsupport.zohodesk.eu/portal/en/kb/articles/sharing-and-aggregation-guide)
- The older Cool Farm Tool calculates results on access and does not store them [Cool Farm FAQ](https://coolfarm.org/frequently-asked-questions/) (not verified, search snippet only)
- Regrow shows supply shed reports for SBTi, CSRD (Corporate Sustainability Reporting Directive) and Verra, with no visible lock or submission step [Regrow](https://www.regrow.ag)
- Indigo: growers file season data by deadlines, and a subset of fields is sampled by third party verifiers [United Soybean Board listing](https://unitedsoybean.org/usb-carbon-toolbox/carbon-programs/indigo/) (secondary source)
- Agreena: verified under VM0042 v2.0 with a yearly ISO 14064-2 audit by DNV [Agreena news](https://agreena.com/news/agreenacarbon-project-verra-verification/) (not verified, search snippet only)

**So what:** "submit, then it is frozen" (Cool Farm Platform) is the closest market pattern. Reporting periods per crop season are not standard across platforms.

## How soil carbon change is split among crops in a rotation and fallow

- The LSR computes the stock change over the whole rotation and splits it across all its crops; carbon effects of cover crops and fallow go to the cash crops; with no rotation, to the next cash crop; for intercropping, economic value first, then m²·year. Section 6.3, page 31 [LSR v1.1](https://ghgprotocol.org/sites/default/files/2026-06/Land-Sector-and-Removals-Standard-v1.1.pdf)
- VM0042 v2.2 asks the historical look back to cover at least one full rotation; no rule on fallow found [VM0042 v2.2](https://verra.org/wp-content/uploads/2024/09/VM0042v2.2.pdf)

**So what:** cutting the Remoção (soil carbon removal) by the months of one crop leaves fallow months unassigned; the LSR would assign them to the cash crop. Product has to choose.

## Not found

- ISO 14067 and ISO 14064-1 clause text (paywalled)
- A standard rule for combining several farms into one project number
- Value Change Initiative and ISEAL text on supply sheds
- Verra's June 2026 corrections document, Soil Capital, and Indigo's own documentation
