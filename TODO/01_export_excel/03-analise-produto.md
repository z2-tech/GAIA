# 03 · Análise de produto

Formato da skill `business-product-strategist`, aplicado à experiência de "tirar
os dados da plataforma". É proposta para validar com produto.

## Avaliação geral

Hoje não existe saída de dados. Para ver os insumos de 20 fazendas, a pessoa abre
talhão por talhão, cálculo por cálculo, e copia à mão. A plataforma recebe dado,
mas não devolve, e isso trava três usos: conferir o que a equipe digitou, entregar
ao cliente e passar pela auditoria. A equipe do Paulo já pensa em planilha (o LCA
tool é o modelo mental deles), então o export precisa parecer familiar, e não
um despejo de banco.

## Problemas encontrados

- **Nenhuma visão consolidada dos insumos.** Não dá para responder "quanto de ureia
  foi usado no projeto?" sem abrir cada cálculo.
- **Conferência cara.** Erro de digitação (kg no lugar de t) só aparece se alguém
  abrir o cálculo certo.
- **Auditoria sem trilha.** O fator usado não é guardado, as fontes de alguns
  fatores só existem no código, e calcário perde a unidade digitada.
- **Várias culturas e safras por fazenda.** Uma coluna "fazenda" esconde isso; somar
  valores por hectare de talhões diferentes dá número errado.
- **Risco de vazamento.** Fazenda tem endereço, coordenadas, polígono; perfil tem
  CPF, CNPJ, telefone. Um export ingênuo leva tudo.

## Oportunidades

- **Conferência em minutos:** a matriz insumo × fazenda deixa outlier visível
  (uma fazenda com 10× mais diesel que as outras).
- **Confiança do auditor:** fator, unidade e fonte na mesma linha do insumo, como
  no LCA tool, e uma aba em formato longo para recalcular.
- **Familiaridade:** repetir nomes de abas, grupos e legenda de cores do LCA tool
  reduz explicação.
- **Base para o PDF e o QR (feature 2 e 3):** a mesma consulta que monta a planilha
  monta o resumo do PDF.

## Redesign sugerido: a planilha

### Abas

| # | Aba | Conteúdo | Para quem |
|---|---|---|---|
| 1 | Sobre | Projeto, período/safra, fazendas incluídas, exportado por e quando, versão da metodologia, GWP (AR6), normas, filtros usados, legenda de cores, aviso de confidencialidade | Todos |
| 2 | Resumo | Estilo `Total_Agro`: categorias nas linhas, fazendas nas colunas, em tCO₂e e kgCO₂e/kg; fóssil, biogênico e remoções separados | Todos |
| 3 | Fazendas | Uma linha por fazenda (e talhão): nome, município/UF, áreas, cultura, safra, montante colhido, clima, status do cálculo (oficial, desatualizado) | Todos |
| 4–11 | Uma aba por categoria | Fertilizantes, Defensivos, Sementes, Corretivos, Combustíveis, Energia, Transporte, Solo e MUT | Todos |
| 12 | Fatores de emissão | Categoria · Item · Gás · Valor · Unidade · Fonte · Versão/ano | Auditor |
| 13 | Dados (formato longo) | Uma linha por valor: projeto, fazenda, talhão, cálculo, safra, categoria, insumo, valor, unidade, fonte do dado, atualizado em | Auditor, análise |
| 14 | Dicionário | O que é cada coluna e unidade; vazio = não informado, 0 = zero | Todos |

Remoção, Regenerativo e Biodiversidade entram depois, cada um com sua aba (ver
"Outros módulos").

### Aba de categoria (exemplo: Fertilizantes)

Mesmas colunas fixas do LCA tool, depois uma coluna por fazenda e o total.

```
 Fertilizantes · Projeto Soja MT 25/26 · kg por fazenda (total da área)
┌──────────────────────┬────────────┬─────────┬────────┬─────────────────┬──────────────────┬───────────┬───────────┬─────┬──────────┐
│ Insumo               │ Classif.   │ Unidade │ FE     │ Unidade FE      │ Fonte            │ Faz. Boa  │ Faz. Sol  │ ... │ Total    │
├──────────────────────┼────────────┼─────────┼────────┼─────────────────┼──────────────────┼───────────┼───────────┼─────┼──────────┤
│ NITROGÊNIO                                                                                                                     │
│ Ureia                │ Sintético  │ kg      │ 3,51   │ kgCO2e/kg N     │ Ecoinvent 3.10   │ 12.000    │ 8.400     │     │ 20.400   │
│ Sulfato de amônio    │ Sintético  │ kg      │ 2,77   │ kgCO2e/kg N     │ Ecoinvent 3.10   │           │ 3.000     │     │ 3.000    │
│ FÓSFORO                                                                                                                        │
│ MAP                  │ Sintético  │ kg      │ ...    │ ...             │ ...              │ 5.500     │ 4.200     │     │ 9.700    │
│ ORGÂNICOS                                                                                                                      │
│ Cama de frango       │ Orgânico   │ kg      │ 0      │ —               │ não considera    │ 20.000    │           │     │ 20.000   │
└──────────────────────┴────────────┴─────────┴────────┴─────────────────┴──────────────────┴───────────┴───────────┴─────┴──────────┘
 Legenda: ■ Dado do produtor  ■ Dado fixado (fator)  □ Resultado      Valores ilustrativos.
```

Decisões embutidas nesse desenho, todas a confirmar:

- **Uma coluna por fazenda**, com valor **total da área** (kg), porque total soma
  certo entre talhões e por hectare não. Por hectare fica no formato longo ou
  como segunda linha de cabeçalho.
- **Unidade padronizada por aba** (kg para fertilizante, L para diesel), com a
  unidade digitada preservada no formato longo.
- **Célula vazia = não usou ou não informou; 0 = informou zero.**
- **Cabeçalho de fazenda em duas linhas** quando houver mais de uma cultura ou
  safra: "Faz. Boa Vista" em cima, "Soja 25/26" e "Milho 26" embaixo.

### Outros módulos (fase 2)

Os três cabem no mesmo padrão "linhas = itens, colunas = fazendas":

- **Remoção:** parâmetros do solo e ciclos de cultura nas linhas; resultado anual
  de estoque (não mensal) no Resumo.
- **Regenerativo:** 28 indicadores nas linhas, opção escolhida em cada fazenda, e o
  score no fim.
- **Biodiversidade:** 43 perguntas nas linhas agrupadas por área (produção, não
  produtiva pequena e grande), Sim/Não por fazenda, score no fim.

## O que pode e o que não pode (proposta)

| Pode ir | Não vai (por padrão) | Talvez, se o produto quiser |
|---|---|---|
| Dados que o usuário digitou nos cálculos oficiais | Simulações | Aba separada com simulações |
| Unidade, fator de emissão e fonte | CPF, CNPJ, telefone, e-mail | Nome do produtor |
| Nome da fazenda, município/UF, áreas | Coordenadas, polígono da fazenda e dos talhões | Coordenadas para o auditor |
| Resultados por categoria | Fórmulas vivas | Versão "com fórmulas" para análise |
| Status: oficial, desatualizado, data do cálculo | Fazendas que o usuário não pode ver | — |
| Nome do arquivo de evidência anexado | O arquivo em si ou link aberto | Link que exige login |
| Quem exportou e quando (na aba Sobre) | Dados de outros projetos | — |

Regras técnicas que valem sempre: só valores; texto livre neutralizado contra
injeção de fórmula; export respeita as fazendas que o usuário vê
(`list_project_farms`, não a regra da comparação); registro de quem exportou.

## Novos componentes (na plataforma)

- Botão **Exportar** (outline, com ícone de download) no cabeçalho do projeto e da
  fazenda.
- **Painel lateral de opções** (sheet), pequeno: módulos, safra, fazendas, "sem
  identificação do produtor". Padrões preenchidos, um clique para baixar.
- **Aviso antes de baixar** quando há talhão sem cálculo oficial ou com resultado
  desatualizado, com a lista e atalho para resolver.
- **Toast** "Planilha gerada" com o nome do arquivo.

## Melhorias no fluxo

- **Um clique no caso comum:** export do projeto inteiro, só oficiais, todos os
  módulos contratados, sem abrir opções.
- **Nome de arquivo que se explica:**
  `GAIA_<projeto>_<safra>_<aaaa-mm-dd>.xlsx`.
- **Síncrono** na primeira versão (um projeto de dezenas de fazendas cabe numa
  requisição). Gerar em segundo plano e avisar por e-mail só se passar de ~30 s.
- **Mesmo arquivo para todos**, com as abas de auditor no fim, em vez de dois
  exports diferentes. Menos decisão para o usuário.

## Microinterações

- Botão mostra progresso ("Gerando…") e volta ao estado normal ao terminar.
- Painel de opções lembra a última escolha do usuário.
- No aviso de pendências, cada item leva direto ao talhão.

## Impacto para o usuário

- Consultor confere o projeto inteiro numa tela de Excel, sem abrir 20 cálculos.
- Cliente recebe os próprios dados num formato que já conhece.
- Auditor recebe fatores, fontes e dados em formato para recalcular, o que encurta
  a verificação e reduz custo.
- A GAIA deixa de ser caixa-preta, o que ajuda na venda para a Peterson.

## Prioridade

- **Alta:** aba de categoria com matriz insumo × fazenda para Emissão; Sobre;
  Fatores de emissão; regra de acesso e sem dados pessoais.
- **Média:** Resumo por categoria; formato longo; dicionário; aviso de pendências;
  painel de opções.
- **Baixa:** Remoção, Regenerativo e Biodiversidade; opção sem identificação; CSV;
  export assíncrono.

## Complexidade

- **Baixa:** gerar XLSX com openpyxl a partir dos selectors existentes; aba Sobre;
  dicionário; botão e download.
- **Média:** pivot insumo × fazenda com várias culturas e safras; normalização de
  unidades; aba de fatores incluindo constantes do código; regra de acesso por
  fazenda.
- **Alta:** mostrar o fator **realmente usado** (exige salvar snapshot no cálculo,
  ligado à feature 0); corrigir unidade de combustível e de calcário antes de
  exportar.
