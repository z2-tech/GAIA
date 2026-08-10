# Planilhas de domínio

Inventário dos artefatos usados como referência funcional pelos módulos de
sustentabilidade. Uma fórmula presente na planilha descreve comportamento, mas
não comprova validade científica sem origem, versão e método confirmados.

## Integridade

| Arquivo | Tamanho | SHA-256 |
|---------|---------|---------|
| `Biodiversity Assessment Tool Prototype_Final.xlsx` | 87 KB | `93a64f94057d9563159993ef051f91052663b1cb1a0bc407b2e9f2cdb8f2e21e` |
| `EIQ_Final.xlsx` | 744 KB | `7ceeb71fa3ab84f32f6098581db43983d6b94c76c2c5abf859ac9b9eba536206` |
| `STIR_calculadora_metric_v4.xlsx` | 20 KB | `5e75f4a600521e424fe0eee08ad8415f05410b72b6ad35fc2f85eef7e37f2398` |
| `RothC_Model_short (com dados coletados).xlsx` | 19,5 MB | `927fbf2d0639b287fcc3b76ced9da590c97edc486816ccb986ed504eabfa5f57` |

## BAT

`Biodiversity Assessment Tool Prototype_Final.xlsx`

- 43 questões: área de produção (1–13), pequena área não produtiva (14–25) e
  grande área não produtiva (26–43).
- Abas de entrada para as três áreas, `Pontuação`, `Pontuação_referencia` e
  `Resultdo`.
- Respostas `Sim` alimentam pesos de 1 ou 2 pontos. O resultado compara totais
  com máximos por área e por grupos de biodiversidade da fazenda.
- Referência funcional BAT; autoria, versão metodológica e licença ainda não
  estão registradas.

## EIQ

`EIQ_Final.xlsx`

- Base `EIQ values_August 2025` com 631 ingredientes ativos preenchidos, CAS,
  tipo de pesticida, EIQ final e componentes worker/consumer/ecological.
- Critérios de toxicidade, persistência, sistemicidade, lixiviação e runoff; a
  própria planilha aponta o NYS IPM/Cornell como origem do método.
- `Calculator` recebe até oito produtos, ingrediente ativo, concentração e taxa
  em kg/ha; converte para lb/ac e calcula Field Use EIQ.
- `Results`, `base` e `Planilha1` apoiam os resultados e faixas qualitativas.
- Referência do módulo EIQ; não fornece fatores de emissão nem valida LCA.

## STIR

`STIR_calculadora_metric_v4.xlsx`

- Abas `Calculadora`, `Resultado`, `Biblioteca` e `Ajuda`.
- Biblioteca PT-BR com nove implementos e valores de tillage type, distúrbio e
  profundidade.
- Fórmula por operação:
  `STIR = (velocidade_mph × 0,5) × (tillage_type × 3,25) × profundidade_in × distúrbio`.
- Soma as operações do período e classifica o total em baixo (`≤30`), médio
  (`31–80`) ou alto (`>80`).
- A planilha cita NRCS/RUSLE2, mas a proveniência completa e os thresholds de
  interpretação precisam ser confirmados antes de alegações científicas.

## RothC

`RothC_Model_short (com dados coletados).xlsx`

- Abas `Data` e `Tables`; `Model structure` e `Graphic` estão vazias.
- Implementa passo mensal para os pools DPM, RPM, BIO, HUM e IOM, estoque total,
  decomposição e emissão de carbono.
- Inclui taxas `k` DPM=10, RPM=0,3, BIO=0,66 e HUM=0,02; relações DPM/RPM por
  vegetação; modificadores de temperatura, umidade/TSMD e cobertura do solo.
- O arquivo foi criado por João Victor Marcal Fernandes e modificado por Paulo
  Roberto da Rocha entre 2024-01-16 e 2025-07-24, segundo seus metadados.
- Apesar do nome, os 1.440 meses possuem apenas ano e mês: chuva, evaporação,
  temperatura, argila, cobertura, resíduos, FYM, profundidade e IOM estão vazios.
- Serve para mapear fórmulas e montar comparação funcional. Não contém vetor
  dourado preenchido, fonte Rothamsted, versão metodológica ou licença registrada.

## Escopo fechado

- D0, P1 e P2 do BE-18 podem prosseguir; o mapeamento estático RothC também.
- Alterações científicas RothC exigem proveniência aprovada e entradas/saídas de
  referência recalculáveis.
- Validação LCA continua bloqueada: nenhuma destas planilhas contém metodologia,
  fatores de emissão ou vetores LCA.
- BAT, EIQ e STIR não substituem fontes LCA/RothC.
