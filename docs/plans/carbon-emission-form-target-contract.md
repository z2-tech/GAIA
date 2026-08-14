# Formulário Carbono Emissão — reescrita na especificação alvo

**Status:** ✅ Concluído — Fases 0 a 6 entregues, aguardando commit
**Criado:** 2026-08-14
**Atualizado:** 2026-08-14
**Repositório:** `gaia-web` (frontend apenas — `gaia-api` **não** é tocado)
**Cards de origem:** FE-29, FE-30, FE-31, FE-32, FE-33 (GAIAPROJEC-68..72)

---

## 0. Progresso

| Fase | Status | Entrega |
|------|--------|---------|
| 0 — Infra do contrato alvo | ✅ **Concluída** | `types/lca-api-contract.ts` criado |
| 1 — Restyle (ModuleShell + stepper) | ✅ **Concluída** | Componentes genéricos em `src/components/module/` |
| 2 — Etapa 1: Cultura & Produto | ✅ **Concluída** | FE-29 |
| 3 — Etapa 2: Solo unificado | ✅ **Concluída** | FE-30 |
| 4 — Etapa 3: Correção de solo + insumos | ✅ **Concluída** | FE-31 |
| 5 — Etapas 4 e 5 | ✅ **Concluída** | FE-32, FE-33 (menos o fator de transporte) |
| 6 — i18n + gates | ✅ **Concluída** | pt/en 168 chaves em paridade, 3 gates verdes |

### O que já está no disco

Fase 0 está commitada (`5ffbc44`). **Fases 1–6 estão na working tree, não commitadas**,
na branch `feat/carbon-emission-form-target-contract`.

- `gaia-web/src/features/carbon-emission/module/types/lca-api-contract.ts` — os 5
  payloads-alvo. Reaproveita os enums do SDK que continuam válidos (`ClimaEnum`,
  `LandUseTypeEnum`, `SoilMoistureEnum`, `SoilDrainageEnum`, `UnidadeEnum`,
  `ResidueManagementTypeEnum`, `LcaProjectSoilCreateSoilTextureEnum`) e define localmente
  só o que não existe: `LcaFertilizerQuantityUnit` e `LcaDefensiveQuantityUnit`.
  `cultura` virou `string` para aceitar a lista ampla do catálogo.
  Agora **tem consumidor**: os 5 builders retornam `Target*` e cada `use-lca-step-*.ts`
  faz o cast na borda da mutation.
- **Novos**: `src/components/module/{module-shell,module-stepper}.tsx`,
  `carbon-emission/module/components/section-header.tsx`,
  `carbon-emission/module/lib/{product-catalog,land-use-change}.ts`.
- **Deletado**: `carbon-emission/module/components/lca-module-tabs.tsx`.

### Decisões do usuário tomadas durante a execução (2026-08-14)

| # | Decisão | Efeito |
|---|---------|--------|
| D9 | Fator de transporte fica **totalmente fora do frontend** | FE-33 "fator 0,1470 refletido no fluxo" **não** implementado, de propósito. Reforça D8 e a pendência da seção 10 |
| D10 | Evidência **opcional** em todos os blocos | Contraria o "anexo obrigatório" da FE-31; alinha com o `evidencia_file: string \| null` do contrato e não trava a navegação em dev |

### Baseline de verificação — leia antes de rodar os gates

| Comando | Resultado esperado hoje |
|---------|-------------------------|
| `bunx tsc --noEmit` | exit 0, sem saída |
| `bun lint` | **86 warnings + 1 info** |

Os 86 warnings são **pré-existentes**, concentrados em `src/components/ui/`, e não têm
relação com este trabalho. Medido com `git stash`: 353 arquivos sem o arquivo novo → 86
warnings; 354 arquivos com ele → 86 warnings. **Não persiga esses warnings.** O critério
é não aumentar o número.

### Resultado dos gates (medido em 2026-08-14, pós-entrega)

| Comando | Resultado |
|---------|-----------|
| `bunx tsc --noEmit` | exit 0 |
| `bun lint` | 86 warnings + 1 info — **igual ao baseline**, zero novo |
| `bun run build` | `✓ Compiled successfully in 4.6s` |
| i18n | pt/en com 168 chaves, mesma ordem, zero chave faltando, **zero órfã nova** |

### Como retomar

O trabalho está pronto para revisão e commit. Se for continuar:

1. `git add -A && git commit` na branch `feat/carbon-emission-form-target-contract`.
2. Remover a dívida da seção 9 conforme as cards BE forem entregues.
3. Resolver as pendências da seção 10 com o time.

---

## 1. Premissa central

O frontend é construído contra o **contrato futuro** — o que as cards BE-27..BE-38 vão
entregar — e **não** contra o backend atual.

Consequência aceita pelo usuário: ao final, os 5 POSTs do formulário retornam **400**
contra o `gaia-api` de hoje. Isso é esperado, não é bug. O objetivo é ter a UI completa e
navegável antes do backend alinhar.

> Decisão do usuário, 2026-08-14: *"quero fazer o front sem se importar com o backend
> atual, mesmo que no final do formulário eu não consiga enviar. Então todas as etapas
> devem seguir o que as tasks pedem."*

---

## 2. Estado do backend quando este plano foi escrito

**Todas** as cards BE-26..BE-38 estão em **Backlog**. Nenhuma linha de `gaia-api` foi
alterada. O contrato atual conflita com as cards FE em quase todos os pontos:

| Ponto | Backend hoje |
|---|---|
| `produtos` | Obrigatório, ≥1 item, com 4 fatores de alocação + `rendimento_global > 0` + `processo{fossil,bio,remocao}` |
| Produtos | Sem endpoint. `lca/urls.py` só tem seeds/defensives/fuel-types/fertilizers |
| `cultura` | `ChoiceField` sobre `LcaCultureType` — só `SOYBEAN` e `WHEAT` |
| Unidades | `montante_colhido_kg` e `residue_qty_kg_ha` em kg |
| Solo | `manejo_solo` e `mudanca_uso_solo` separados, ambos exigindo `csolo_*` / `cbm_*` numéricos |
| Gesso | Campo inexistente |
| Evidência | Ausente em sementes e transporte |

### Auditoria BE-26 (fechada em 2026-08-14)

Registrada como comentário na GAIAPROJEC-58. Achados que afetam este plano:

1. `organic_carbon_pct`, `organic_matter`, `field_name` **não alimentam cálculo** — só
   persistência. Remoção segura.
2. `soil_texture`, `soil_moisture`, `soil_drainage`, `residue_qty_kg_ha` e
   `residue_management_type` **também não alimentam cálculo**. De todo o bloco Solo,
   apenas `clima` entra em cálculo (`direta.py` e `indireta.py`).
3. FSN/FON/ureia são deriváveis dos fertilizantes hoje — `LcaFertilizerType.UREA` e
   `LcaFertilizerClassification.SYNTHETIC|ORGANIC` já existem.
4. Gesso não tem fator de emissão IPCC (é sulfato, não carbonato) — deve ser
   persistência apenas.
5. `FE_ENERGIA = 0.0385095647762709 tCO2-eq/MWh` já é fixo, independente de matriz.
6. O teto de 20 anos **já existe** em `mudanca_uso_solo.py` (`ano_mais_recente - 19`),
   assim como a amortização linear (`indice × 0.005 − 0.0025`).
7. 🚩 `alocado.py` usa `FE_TRANSP_FOSSIL = 0.1047` (Ecoinvent 3.9.1). A BE-35 pede
   `0.1470` — mesmos dígitos em ordem trocada. **Suspeita de erro de transcrição.**
8. 🚩 `direta.py:22` — `IPCC_PARAMS` só tem SOYBEAN e WHEAT, e `calcular_fcr` retorna
   `0.0` para cultura desconhecida. Ampliar culturas sem ampliar essa tabela **zera o FCR
   em silêncio**.
9. ❌ A tabela IPCC de estoque de carbono do solo/biomassa **não existe** no repositório.
   `csolo_*` / `cbm_*` vêm 100% digitados pelo usuário.

Cards criadas a partir da auditoria: **BE-36** (`GET /lca/products/`), **BE-37**
(catálogo de culturas + `IPCC_PARAMS`), **BE-38** (tabela IPCC de estoque de carbono).

### Mapa de cards no Plane

Projeto `Gaia` (`fe4e534c-2855-4a42-af0a-1aca6bb7820c`). Todas em **Backlog**, atribuídas
a Leonardo Paiva, label Backend. Use `workitem retrieve_by_identifier`.

| Card | Identificador | Assunto |
|---|---|---|
| BE-26 | GAIAPROJEC-58 | Auditoria dos cálculos — resultado no comentário |
| BE-27 | GAIAPROJEC-59 | Produto opcional + alocação server-owned |
| BE-28 | GAIAPROJEC-60 | Solo: remover carbono orgânico / talhão |
| BE-29 | GAIAPROJEC-61 | Mudança de uso do solo unificada |
| BE-30 | GAIAPROJEC-62 | Correção de solo + gesso |
| BE-31 | GAIAPROJEC-63 | Fertilizantes: %N, unidades, evidência |
| BE-32 | GAIAPROJEC-64 | Defensivos: ingrediente ativo + unidades |
| BE-33 | GAIAPROJEC-65 | Sementes: trigo/milho + evidência |
| BE-34 | GAIAPROJEC-66 | Combustível/energia: sem rótulo |
| BE-35 | GAIAPROJEC-67 | Transporte: evidência + fator (🚩 bloqueada) |
| BE-36 | GAIAPROJEC-73 | `GET /lca/products/` |
| BE-37 | GAIAPROJEC-74 | Catálogo de culturas LCA ↔ RothC |
| BE-38 | GAIAPROJEC-75 | Tabela IPCC de estoque de carbono |
| FE-29 | GAIAPROJEC-68 | Etapa 1 — Cultura & Produto |
| FE-30 | GAIAPROJEC-69 | Etapa 2 — Solo |
| FE-31 | GAIAPROJEC-70 | Etapa 3 — Correção de solo + insumos |
| FE-32 | GAIAPROJEC-71 | Etapa 4 — Combustível + energia |
| FE-33 | GAIAPROJEC-72 | Etapa 5 — Transporte + i18n |

BE-27, BE-28, BE-30 e BE-35 já receberam uma seção "🔍 Atualização — auditoria BE-26"
no fim da descrição, com os achados acima.

---

## 3. Decisões tomadas

| # | Decisão | Justificativa |
|---|---|---|
| D1 | Builders retornam tipos locais de `types/lca-api-contract.ts`, com cast na borda da mutation | O SDK gerado (`@/client/types.gen`) reflete o backend atual. Sem tipos locais, `bun run build` quebra em todo builder |
| D2 | Select de produtos lê de `lib/product-catalog.ts` local (4 produtos de `lca/enum/product_type.py`) | `GET /lca/products/` não existe (BE-36). Troca por hook de API depois é uma linha |
| D3 | Culturas via `useListRothCCrops` (`GET /routhc/crops/`) | O endpoint já existe e serve as 17 culturas. Entrega o que a FE-29 pede e vira a opção 1 da BE-37 na prática |
| D4 | Avanço de etapa mesmo com erro de API, guardado por `NODE_ENV !== "production"` | `use-lca-module.ts:117-130` só avança no `onSuccess`. Sem bypass, as etapas 2-5 são inalcançáveis em dev |
| D5 | Nenhuma conversão de unidade no frontend | O backend alvo recebe valor + unidade e converte (BE-27, BE-31, BE-32). Converter no front duplicaria a regra |
| D6 | `csolo_*` e `cbm_*` somem do formulário | O backend resolve via BE-38. A FE-30 pede "apenas selects" |
| D7 | Carbon-removal **não** é tocado | Os componentes novos em `src/components/module/` nascem genéricos; a migração do carbon-removal fica para depois |
| D8 | O fator de transporte **não** é alterado | 0.1047 vs 0.1470 sem confirmação (achado 7). BE-35 está marcada como bloqueada |

### Portar `lca_cultura.csv` para o front foi **descartado**

As colunas do CSV são `Planta, Produto, Emissão, Alocação mássica, Alocação Energética,
Alocação Econômica`. Os fatores **variam por planta** (LEM, Ponta Grossa, Rondonópolis,
Tatuí, Outras) e por tipo de emissão. O formulário não tem campo de planta, então portar
produziria número errado. O `product-catalog.ts` carrega **apenas** nome e id.

---

## 4. Contrato alvo

```ts
// POST /lca/culture/  — BE-27
{
  project_id, farm_id,
  assessment_name, harvest_year, area_ha,
  montante_colhido_t,          // toneladas
  residue_qty_t_ha,            // toneladas/ha
  residue_management_type,
  cultura,                     // lista ampla (RothC)
  notes,
  produtos?: [{ product_id }]  // opcional, só o id
}

// POST /lca/soil/  — BE-28 + BE-29
{
  project_id, farm_id, project_culture_id,
  clima,                                    // pendência: virá da fazenda
  soil_texture, soil_moisture, soil_drainage,
  notes,
  mudanca_uso_solo: {
    area_car_ha,
    manejo_atual: LandUseType,
    mudancas: [{ manejo_anterior: LandUseType, anos_desde_mudanca: 1..20 }]
  }
}

// POST /lca/inputs/  — BE-30, BE-31, BE-32, BE-33
{
  project_id, farm_id, project_culture_id,
  correcao_solo: { calcario_calcitico_kg, calcario_dolomitico_kg, gesso_agricola_kg },
  fertilizantes: [{ lca_fertilizer_id, quantidade, unidade_quantidade: "KG_HA"|"T_HA",
                    data_aplicacao, evidencia_file }],
  defensivos:    [{ lca_defensivo_id, quantidade,
                    unidade_quantidade: "KG_HA"|"G_HA"|"ML_HA"|"L_HA",
                    concentracao_ingrediente_ativo, evidencia_file }],
  sementes:      [{ lca_semente_id, quantidade_kg_ha, evidencia_file }],
  notes
}

// POST /lca/fuel/  — BE-34
{
  project_id, farm_id, project_culture_id, notes,
  combustiveis: [{ lca_combustivel_id, consumo_anual, unidade, evidencia_file }],
  energia:      [{ energia_mwh, evidencia_file }]
}

// POST /lca/transport/  — BE-35
{ project_id, farm_id, project_culture_id, distance_km, evidencia_file, notes }
```

---

## 5. Fases

### Fase 0 — Infra do contrato alvo ✅ CONCLUÍDA
**Novo** `src/features/carbon-emission/module/types/lca-api-contract.ts` — os 5 payloads
acima, cada um com comentário EN apontando a card BE que o entrega.

Verificado: `bunx tsc --noEmit` exit 0; `bun lint` sem warning novo em relação ao
baseline de 86.

O cast em cada `use-lca-step-*.ts` **não** foi feito aqui — ele entra junto com a
alteração de cada builder, nas Fases 2–5. Hoje o arquivo compila sem consumidor.

### Fase 1 — Restyle (autocontida, sem dependência de contrato) ⬅️ PRÓXIMA
- **Novo** `src/components/module/module-shell.tsx` — genérico. Grid
  `lg:grid-cols-[240px_minmax(0,1fr)]`, aside à esquerda, footer com `border-t`.
  Baseado em `carbon-removal/module/components/module-shell.tsx:27`.
- **Novo** `src/components/module/module-stepper.tsx` — `<ol>` vertical no `lg`, `Button`
  com `Badge` circular, `Check` no concluído. Baseado em `main-stepper.tsx:31`.
- **Novo** `carbon-emission/module/components/section-header.tsx` — hoje duplicado em
  `crop-step.tsx:30`, `soil-step.tsx:27`, `inputs-step.tsx:27`, `fuel-step.tsx:26` e
  inline em `transport-step.tsx:22`.
- **Deletado** `lca-module-tabs.tsx` (53 linhas, consumidor único).
- **Alterado** `lca-module-form.tsx:50-118` (usa `ModuleShell`, botões no slot `footer`),
  `carbon-emission/module/page.tsx:16` (`flex min-h-0 flex-1 flex-col gap-1
  overflow-hidden`), e o espaçamento dos 5 steps para o padrão de
  `project-parameters-step.tsx`.
- Scroll-to-top no `currentStep` (FE-29).

### Fase 2 — Etapa 1: Cultura & Produto (FE-29)
`LcaProdutoFormValues` → `{ product_id }`. `montante_colhido_t`, `residue_qty_t_ha`.
Cultura via `useListRothCCrops`. Produto opcional via Select.
Somem os 7 campos de alocação por produto.
**Novo** `lib/product-catalog.ts`.

### Fase 3 — Etapa 2: Solo unificado (FE-30)
Somem `organic_carbon_pct`, `organic_matter`, `field_name`. Blocos 2.2 e 2.3 fundem em
`mudanca_uso_solo` com `manejo_atual` + `mudancas[]`. **Somem todos os `csolo_*` e
`cbm_*`.** Teto rígido de 20 anos com bloqueio de adição. Preview da distribuição linear
(`indice × 0.005 − 0.0025`, espelhando `mudanca_uso_solo.py:81`). Clima mantido com
marcação de pendência, conforme a card.

### Fase 4 — Etapa 3: Correção de solo + insumos (FE-31)
Bloco renomeado. Só calcários + `gesso_agricola_kg`. Fertilizante: label
`${nome} - ${default_nutrient_percentage}%` (`use-lca-dropdown-options.ts` já devolve
`fertilizersData` cru), `unidade_quantidade`, evidência, somem 4 campos. Defensivo:
"concentração do ingrediente ativo", 4 unidades, some `categoria`. Semente: evidência +
lista trigo/milho.

### Fase 5 — Etapas 4 e 5 (FE-32, FE-33)
Somem `combustiveis[].rotulo`, `energia[].rotulo`, `energia[].categoria`.
`comprovante_file` → `evidencia_file`. Transporte ganha `evidencia_file`. Hints com o FE
de energia e o fator de transporte.

### Fase 6 — i18n + gates
pt/en estão em paridade hoje (190 chaves em `carbonEmissions`). Novas chaves nos dois,
remoção de órfãs, `i18n-key-validator` no diff.

---

## 6. Roteamento de agentes

| Camada | Agente |
|---|---|
| Orquestrador | `senior-nextjs` |
| Shell, stepper, cards, espaçamento | `design-agent` |
| Schemas, types, hooks, campos, payloads | `form-agent` |
| Chaves pt/en | `i18n-key-validator` |
| Skill de direção visual | `frontend-design` |

Sem `api-layer-agent` (nenhum endpoint novo é consumido além do `/routhc/crops/` já
existente) e sem `cross-stack` (o contrato do backend não muda nesta entrega).

---

## 7. Definição de pronto

- [ ] `bun lint` verde
- [ ] `bun run build` verde
- [ ] `bunx tsc --noEmit` verde
- [ ] `i18n-key-validator` sem chave órfã
- [ ] Formulário navegável ponta a ponta em dev (etapas 1→5)
- [ ] Checklist de aceite das 5 cards atendido na camada de UI
- [ ] `.opencode/bin/codegraph-global-sync.sh` rodado ao final

---

## 8. Fora de escopo

- Qualquer alteração em `gaia-api`
- O fator de transporte (0.1047 vs 0.1470) — sem confirmação
- Migração do carbon-removal para os componentes genéricos de `src/components/module/`

## 9. Dívida deliberada — remover quando o backend chegar

Os três pontos abaixo ficam marcados com comentário EN apontando a card:

| Item | Arquivo | Remove com |
|---|---|---|
| Tipos locais do contrato | `types/lca-api-contract.ts` | BE-27..BE-35 |
| Catálogo de produtos hardcoded | `lib/product-catalog.ts` | BE-36 |
| Bypass de navegação em dev | `hooks/use-lca-module.ts` | Quando os POSTs pararem de dar 400 |

## 10. Pendências com o time

- **Fator de transporte**: 0.1047 (Ecoinvent 3.9.1, atual) ou 0.1470 (BE-35)? Confirmar
  com quem levantou na reunião de 14/08.
- **Fonte dos números IPCC** de estoque de carbono para a BE-38 — bloqueia BE-29 e, no
  backend, a Etapa 2.
- **BE-28**: `soil_texture` / `soil_moisture` / `soil_drainage` não alimentam cálculo.
  Manter como metadado ou remover?
