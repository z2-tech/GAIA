# 01 · Entendimento da feature

## O pedido

Reunião de 29/09/2026 ([ata](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-reuniao-transcricao-e-pontos.md)).

- [27:12] Paulo: "A primeira coisa é baixar os dados brutos, porque a gente vai
  entrar com consumo de fertilizante, consumo de não sei o quê. Digamos que dentro
  de um projeto a gente tenha 20 fazendas. A gente teria que ter esses dados que
  entramos (fertilizante, calcário etc.) e aqui as fazendas e os números."
- [47:20] "Baixar os dados em Excel. Quero ter no meu computador, eu baixo."
- [49:40] O auditor "baixa o arquivo de Excel".
- [51:00] Para o auditor, "a planilha e quais fatores de emissão foram usados".
- [50:52] Ruan: "principalmente os dados primários".

## O que a feature é

Um arquivo Excel, gerado pela plataforma, com os dados que o usuário digitou nos
cálculos de um projeto, organizados para leitura por gente acostumada com as
planilhas de LCA. Serve a três leitores, com necessidades diferentes:

| Leitor | Quer | Implica |
|---|---|---|
| Consultor / equipe | Conferir e cruzar dados de muitas fazendas | Matriz insumo × fazenda, filtros |
| Cliente | Ter os próprios dados | Linguagem simples, sem fatores |
| Auditor | Recalcular e rastrear | Fatores com fonte e versão, unidades explícitas, formato longo, período |

## O que existe no código

Caminhos relativos a `gaia-api/`.

### Dados de entrada por módulo

| Módulo | O que o usuário digita | Onde |
|---|---|---|
| Projeto / fazenda / talhão | Nome, código; fazenda: endereço, município/UF, lat/long, áreas (total, agrícola, preservação), textura do solo, polígono; talhão: nome, área, geometria | `projects/models.py:22`, `farms/models.py:9-87` |
| Emissão (LCA), cultura | Nome, ano da colheita, área cultivada (ha, digitada), cultura, montante colhido (t), resíduo (t/ha e manejo), produtos e alocação | `lca/models.py:171` |
| Emissão, solo | Clima, textura, umidade, drenagem, manejo atual; mudança de uso do solo com histórico | `lca/models.py:237`, `:298`, `:321` |
| Emissão, insumos | Fertilizantes (várias linhas, quantidade + unidade kg/ha ou t/ha, data, evidência); defensivos (várias linhas, unidade kg/g/mL/L por ha, concentração do i.a.); sementes (kg/ha); calcário calcítico, dolomítico e gesso | `lca/models.py:347-472` |
| Emissão, energia | Combustíveis (várias linhas, consumo anual + unidade L/m³/kg/t/TJ); energia elétrica (MWh) | `lca/models.py:501-561` |
| Emissão, transporte | Distância (km) | `lca/models.py:583` |
| Remoção (RothC) | SOC, argila, profundidade, pools, fertilizante; ciclos de cultura (cultura, produtividade, início, fim); compostos (C orgânico) | `rothc/models.py:40`, `:205`, `:243` |
| Regenerativo | 28 indicadores, cada um com uma opção escolhida | `regenerative/models.py:62-137` |
| Biodiversidade | 43 perguntas sim/não | `biodiversity/models.py:6-67` |
| CFP | JSON livre, sem esquema; integração desligada | `cfp/models.py:26` |

### Fatores de emissão

- Catálogos com fator e fonte: fertilizantes (`LcaFertilizer`, Ecoinvent 3.10 /
  IPCC 2021 GWP100), defensivos (`LcaDefensive`, Ecoinvent), sementes (`LcaSeed`).
- Combustíveis (`LcaFuelType`): fatores por gás, **sem campo de fonte**.
- Fixos no código, sem catálogo: energia (MCTI 2023, `lca/calculations/energy.py:8`),
  transporte (`allocated.py:20`), ureia e calcário (IPCC 2006, `urea.py:6`,
  `liming.py:6`), N₂O direto e indireto (IPCC 2019, `direct.py:24`,
  `indirect.py:9`), GWP (`fuel.py:10`).
- **O fator usado em cada cálculo não é guardado.** O cálculo produz `fe` por linha
  (`lca/calculations/seed.py:29`, `fertilizer.py:56`), mas o resultado salvo só
  traz `inputs`, `total_agro` e `total` (`lca/services.py:1014-1038`). Migrations
  já mudaram fatores do catálogo (`0018`, `0024`), então o fator de hoje pode não
  ser o que gerou o resultado.

### Unidades (como ficam salvas)

| Dado | Como fica | Problema para o export |
|---|---|---|
| Fertilizante, defensivo | Valor e unidade digitados | OK; normalizar só no export |
| Defensivo em mL/L | Densidade 1 assumida no cálculo (`lca/services.py:78`) | Explicar no dicionário |
| Calcário e gesso | Convertidos para kg total ao salvar (`lca/services.py:70-74`) | Unidade digitada perdida; API devolve kg/ha dividindo pela área |
| Combustível | Unidade salva, **ignorada no cálculo** (`lca/calculations/fuel.py:88-98`) | Bug de cálculo para m³, kg, t e TJ |

### Resultados salvos

- Emissão: JSON em `LcaCalculationResult.result` com totais por categoria (fóssil,
  biogênico, remoção, líquido) e por produto e alocação.
- Remoção: resultado mensal por cenário (`RothcMonthlyResult`).
- Regenerativo: não salvo, calculado na hora.
- Biodiversidade: score e classificação salvos.

### Acesso e dados pessoais

- Quem vê o projeto: dono ou admin do projeto, criador ou responsável por fazenda
  (`projects/selectors.py:17-28`). Staff vê tudo.
- `list_project_farms` (`projects/selectors.py:94-114`) mostra só as fazendas do
  usuário quando ele não tem vínculo com o projeto; a comparação
  (`comparison/selectors.py:5`) libera todas. **O export deve seguir a primeira.**
- Auditor: não tem vínculo com projeto (feature 4).
- Dados pessoais que podem vazar: endereço, lat/long e polígono da fazenda,
  geometria do talhão, e-mail e nome do responsável, CPF/CNPJ e telefone do perfil
  (`profiles/models.py:32-86`), links de arquivos de evidência (notas).

### O que já existe e dá para reaproveitar

- `LcaSelectors.get_culture_detail_dict` (`lca/selectors.py:304`): insumos de uma
  cultura com nome do catálogo e unidade digitada. É uma coluna pronta.
- `filter_cultures_by_scope` (`lca/comparison/selectors.py:43`): filtra por
  projeto, fazenda, talhão, cultura e ano.
- Permissão de leitura: `HasRole("admin","manager","technician","auditor")`.
- Nenhuma lib de planilha instalada. `openpyxl` seria a única dependência nova.

## O que dá e o que não dá para exportar hoje

| Item | Hoje | Observação |
|---|---|---|
| Insumos de Emissão por fazenda | Dá | Precisa de regra para escolher o cálculo (feature 0) |
| Fator e fonte **atuais** dos catálogos | Dá | Com aviso de que pode não ser o usado |
| Fator **usado** no cálculo | Não dá | Precisa passar a salvar (liga com feature 0) |
| Fatores fixos no código (energia, ureia, IPCC) | Dá | Listar como constantes na aba de fatores |
| Fonte do fator de combustível | Não dá | Campo não existe |
| Unidade digitada de calcário e gesso | Não dá | Só kg total |
| Combustível em m³, kg, t, TJ | Dá o dado; o resultado está errado | Corrigir o cálculo antes |
| Remoção, Regenerativo, Biodiversidade | Dá | Layouts próprios (ver 03) |
| Resultado desatualizado | Dá marcar | `inputs_updated_at` / `is_stale` |
| CFP | Não faz sentido | Sem esquema, integração desligada |

## Achados colaterais (registrar)

- **Bug:** unidade de combustível ignorada no cálculo (`lca/calculations/fuel.py:88-98`).
- Calcário e gesso perdem a unidade digitada ao salvar.
- `LcaFuelType` sem campo de fonte do fator.
- Na planilha de referência `LCA_Annual_Crops_Tool.xlsx`, `Total_Agro!D18`
  (semente, biogênico) aponta para o CO₂ biogênico do combustível, contando-o duas
  vezes. Vale avisar o Paulo, porque a plataforma pode ter herdado isso.
- A comparação libera todas as fazendas do projeto a quem tem acesso a uma só
  (`comparison/selectors.py:5`), diferente da listagem.
