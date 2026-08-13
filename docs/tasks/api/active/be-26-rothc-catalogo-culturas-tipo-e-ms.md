# BE-26 — RothC: catálogo de culturas por tipo e matéria seca

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-13)
> **Plane:** [GAIAPROJEC-56](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/643923a1-9017-4562-9c0f-6d3e316e5938)

## Contexto

O produto exige divisão das culturas em **Anuais** e **Perenes/Semi-perenes** e um
catálogo ampliado (soja, trigo, milho, batata, aveia, centeio, cevada, milheto, sorgo,
tabaco, arroz, café, pastagem, cana, palma, manga, eucalipto, abacate, citros, cacau).
O backend tinha 17 culturas sem tipo e 10 itens faltando; o enum `CropType` existia
morto e o Web consumia lista hardcoded via i18n (incluía `SOIL`, inexistente no backend).

## Decisões fechadas (`sustainability-specialist` + produto)

- Convenção de HI mantida: `resíduo = P_MS × (1 − HI) / HI` (fração colhida da biomassa
  aérea seca).
- Cana: manter HI 0.85 (conservador — palhada removida). Não migrar para 0.70 até
  decisão de posicionamento.
- Pastagem: PASTURE 0.77 = corte/fenação. Pastejo continua via
  `monthly_input_mode = biomass` + `IMPROVED_GRASSLAND`.
- Unidade de produtividade: diferenciação sistêmica no backend via
  `dry_matter_fraction` (frutas/palma = produto fresco); Web só expõe unidade correta,
  sem mudança de contrato.
- HI corrigidos: MAIZE 0.45→0.50, COFFEE 0.50→0.20, SOYBEAN 0.50→0.45, WHEAT 0.55→0.50,
  PULSES 0.30→0.40. Históricos não afetados (`entrada_biomassa_kg_ha` é snapshot).

## Entregue

- `RothcCrop` com `crop_type` (enum `CropType`) e `dry_matter_fraction` (check 0 < f ≤ 1).
- Migration `0006` (campos + backfill SUGARCANE/COFFEE → perennial) e `0007` (seed de 10
  novas + update dos 5 HIs; rollback restaura HIs legados).
- 10 novas culturas: RYE 0.38, MILLET 0.42, TOBACCO 0.50 | PASTURE 0.77, PALMA 0.50
  (MS 0.10), MANGO 0.15 (MS 0.17), EUCALYPTUS 0.65, AVOCADO 0.15 (MS 0.25), CITRUS 0.20
  (MS 0.13), COCOA 0.10.
- Conversão de matéria seca aplicada nos 3 caminhos (perene, anual, legado `calcular`).
- `GET /api/v2/routhc/crops/` — catálogo com tipo e fração MS (schema drf-spectacular).
- Enum `Cultura` sincronizado (27 códigos + traduções pt/en).
- Testes: 27 culturas com tipo/fração, conversão MS no perene, endpoint de catálogo,
  residuais recalculados com os HIs novos.
- Fix de infraestrutura: `test_runner._seed_data` agora replica a cadeia completa de
  seeds (0003+0004+0006+0007), eliminando estado poluído em runs `--keepdb` após
  `RothcCompostMigrationTests` (TransactionTestCase com MigrationExecutor).

## Checklist

- [x] Migration `0006` — `crop_type` + `dry_matter_fraction` + backfill
- [x] Migration `0007` — seed 10 novas + correção de 5 HIs
- [x] Modelagem aplica `dry_matter_fraction` (perene, anual e legado)
- [x] Endpoint de catálogo com schema explícito
- [x] Enum `Cultura` sincronizado
- [x] Testes atualizados e novos (422 verdes, fresh + `--keepdb` repetido)
- [x] `spectacular --validate --fail-on-warn` OK
- [x] Vault atualizado (`Sustainability-Metrics.md`: catálogo, decisões de produto)

## Pendente para o Web (ver `docs/tasks/web/active/fe-29-rothc-dropdown-culturas-tipo-unidade.md`, GAIAPROJEC-57)

- Dropdown de cultura agrupado por tipo consumindo `GET /api/v2/routhc/crops/`.
- Unidade de produtividade por cultura (t MS/ha vs t produto fresco/ha).
