# Agricultural sustainability metrics: domain rules

RD-n (Regra de Domínio). Each rule: what holds, why, source.

## Greenhouse gases

- RD-1 Gases are converted to CO2 equivalent with the IPCC AR6 global warming potentials (N2O = 273). Why: one unit for every emission source. [IPCC AR6 WG1 Ch 7 Tab 7.15]

## Land use change

- RD-2 A change in land use affects the soil and biomass carbon stock for 20 years after the change; older changes no longer count. Why: the IPCC default transition period. [IPCC 2006 Vol 4 Ch 2]
- RD-3 In Brazil, reference soil carbon stocks come from Novaes et al. 2017 and biomass stocks per phytophysiognomy from MCTI 2020, in t C/ha. Why: national values instead of global defaults. [Novaes et al. 2017 · MCTI 2020]

## Crop residue

- RD-4 Above ground crop residue is estimated from dry matter yield and harvest index (HI): residue = yield × (1 − HI) / HI. Why: HI is the share of above ground dry biomass that is harvested. [IPCC 2019 Refinement Vol 4 Ch 11 Tab 11.1A · IPCC 2006 Tab 11.2]

## Soil carbon model (RothC)

- RD-5 Farmyard manure enters RothC split 49% decomposable plant material (DPM), 49% resistant plant material (RPM), and 2% humified organic matter (HUM). Why: the model's fixed partition for organic amendments. [RothC-26.3 guide, Coleman & Jenkinson 2014]
