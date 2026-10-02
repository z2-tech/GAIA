# Export Excel · versão final 1

Data: 02/10/2026. Base: reunião de 29/09, respostas do Paulo Rocha e do Ruan
Carlos Oliveira ao questionário ([análise](07-analise-respostas.md)), o
[cálculo oficial v1](../00_calculo_final/07-versao-final-1.md) (regras CF-RN-n)
e o código atual da `gaia-api`.

Regras marcadas com **(P-n)** são provisórias: seguem a proposta da Z2 até a
decisão da pendência n, listada no fim. As demais estão fechadas.

## 1. O que é a feature

Um arquivo `.xlsx` gerado pela plataforma com os **dados digitados** nos cálculos
oficiais de um projeto: insumos, entradas do solo, respostas do Regenerativo e da
Biodiversidade. Itens nas linhas, talhões ou fazendas nas colunas, uma aba por
módulo (a Emissão dividida por categoria).

O resultado dos cálculos não vai na planilha. Ele sai no PDF (feature 02).

O auditor recebe a mesma planilha com uma aba a mais: os fatores de emissão e
parâmetros usados.

## 2. Por que

- Hoje não há saída de dados. Para ver os insumos de 20 fazendas é preciso abrir
  cálculo por cálculo.
- O Paulo quer uma cópia de guarda, com rastreabilidade do que foi digitado.
- O cliente recebe os próprios dados.
- O auditor confere os dados primários e recalcula com os fatores.

## 3. Jornada

1. O admin do projeto, o gestor ou o auditor abre o projeto e clica em
   **Exportar**.
2. Um painel pequeno oferece: safra, fazendas, módulos, idioma e "sem
   identificação". Padrão: safra mais recente, todas as fazendas que o usuário
   vê, todos os módulos contratados, português.
3. Se algum talhão não tem oficial, o painel avisa e lista os talhões, com atalho
   para cada um. O export continua.
4. O arquivo baixa na hora: `GAIA_<projeto>_<safra>_<aaaa-mm-dd>.xlsx`.
5. O auditor recebe a versão com a aba de fatores.

## 4. Regras de negócio

### 4.1 Conteúdo

- **RN-01** A planilha leva só dados digitados e dados cadastrais. Totais
  calculados, scores e resultados do RothC ficam no PDF. **(P-1)**
- **RN-02** Os dados vêm só do cálculo oficial de cada talhão × módulo × safra
  (CF-RN-01, CF-RN-15). Simulação nunca entra.
- **RN-03** Com o projeto finalizado, em verificação ou verificado, os dados vêm
  da foto do momento (CF-RN-25), não do cálculo vivo.
- **RN-04** Entram os módulos contratados no projeto. O usuário pode tirar
  módulos no filtro. Emissão e Remoção são a prioridade.
- **RN-05** Dados da fazenda: nome da fazenda, município e UF, área total, área
  agrícola, textura do solo, clima, cultura e safra, montante colhido. **(P-5)**
- **RN-06** Não entram: nome do produtor, CPF, CNPJ, e-mail, telefone,
  endereço, coordenadas, polígono da fazenda e geometria do talhão. **(P-5)**
- **RN-07** Evidência: só o nome do arquivo informado no dado. **(P-6)**
- **RN-08** Fatores de emissão, fontes, versão e parâmetros do RothC só no
  arquivo do auditor.

### 4.2 Organização

- **RN-09** A coluna é a unidade em que o dado foi coletado. Emissão: talhão ×
  cultura. Remoção: talhão. Regenerativo e Biodiversidade: talhão se a avaliação
  tem talhão, fazenda se não tem. **(P-4)**
- **RN-10** Cabeçalho em três linhas: fazenda, talhão, cultura e safra. Colunas
  agrupadas por fazenda.
- **RN-11** Insumos saem por hectare, em unidade padronizada por aba (kg/ha para
  fertilizante, L/ha para diesel). A área (ha) de cada coluna vai numa linha
  própria no topo. **(P-2)**
- **RN-12** A coluna "Total da fazenda" traz o total em kg ou L (soma de kg/ha ×
  área dos talhões). Nunca soma kg/ha. **(P-2)**
- **RN-13** Uma safra por arquivo é o padrão. Exportar mais de uma safra põe a
  safra no cabeçalho de cada coluna. **(P-3)**
- **RN-14** Célula vazia = não informado. Zero = informado zero.
- **RN-15** Abas: Sobre · Fazendas · uma por categoria da Emissão · Remoção ·
  Regenerativo · Biodiversidade · Dados em lista · Dicionário. O auditor recebe
  também Fatores e parâmetros. **(P-7)**
- **RN-16** Cores do LCA tool: dado do produtor, dado fixado, resultado. **(P-7)**

### 4.3 Acesso

- **RN-17** Exportam: admin do projeto, gestor e auditor do projeto. Cliente e
  técnico: pendente. **(P-8)**
- **RN-18** Cada um exporta só as fazendas que vê (`list_project_farms`, não a
  regra da comparação).
- **RN-19** O auditor só exporta projetos em que foi liberado (CF-RN-35).
- **RN-20** Opção "sem identificação": fazendas viram "Fazenda 1, 2, 3", talhões
  "Talhão 1.1, 1.2". A correspondência não sai no arquivo.
- **RN-21** Toda exportação fica registrada: quem, quando, filtros, versão com ou
  sem fatores.

### 4.4 Pendências de dado

- **RN-22** Talhão sem oficial, em projeto em andamento: a coluna sai vazia e a
  aba Sobre lista os talhões. O painel avisa antes de baixar. **(P-9)**
- **RN-23** Projeto finalizado não tem talhão sem oficial (CF-RN-21), então o
  arquivo do auditor nunca tem lacuna.
- **RN-24** A aba Sobre diz o estado do projeto (em andamento, finalizado,
  verificado). Planilha de projeto em andamento é cópia de trabalho, não dado
  final.

### 4.5 Formato

- **RN-25** Só `.xlsx`. Sem CSV, sem reimportação.
- **RN-26** Idioma português ou inglês, escolhido no painel. Vale para nomes de
  aba, rótulos e dicionário. Nomes digitados pelo usuário não são traduzidos.
- **RN-27** Só valores, sem fórmula. Texto livre neutralizado contra injeção de
  fórmula (`=`, `+`, `-`, `@` no início).
- **RN-28** A aba Sobre informa "GWP AR6" e as normas usadas, em uma linha.

## 5. Conteúdo por módulo

| Módulo | Aba | Coluna | Linhas |
|---|---|---|---|
| Emissão | Emissão · Fertilizantes, Defensivos, Sementes, Corretivos, Combustíveis, Energia, Transporte, Solo e MUT | talhão × cultura | Insumo, classificação, unidade padronizada, valor por ha; nome do arquivo de evidência |
| Remoção | Remoção | talhão | SOC inicial (tC/ha), data, laboratório e método da análise, argila, profundidade, janela de modelagem, tipo de entrada BAU e projeto; ciclos de cultura e compostos em bloco de lista abaixo |
| Regenerativo | Regenerativo | fazenda ou talhão (RN-09) | Contexto (manejo, clima e solo, chuva, irrigação); 28 indicadores com a opção escolhida; quem respondeu e quando |
| Biodiversidade | Biodiversidade | fazenda ou talhão (RN-09) | 43 perguntas, Sim/Não, agrupadas por área; vazio = não respondida; quem respondeu e quando |

Se a reunião aprovar resultado na planilha (P-1), entram também: Resumo por
categoria da Emissão (estilo `Total_Agro`), estoque de carbono inicial, médio e
final da Remoção, pontos e nota do Regenerativo, nota e classificação da
Biodiversidade.

Fora em qualquer caso: clima mensal e resultados mês a mês da Remoção (M1, M2).

Arquivo do auditor, aba **Fatores e parâmetros**: categoria, item, gás, valor,
unidade, fonte, versão (CF-RN-26); constantes fixas no código (energia MCTI,
ureia e calcário IPCC 2006, N₂O IPCC 2019, GWP); parâmetros do RothC (constantes
de decomposição, DPM/RPM, fonte do clima).

## 6. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | Cliente | GAIA (staff) |
|---|---|---|---|---|---|---|
| Exportar planilha | **(P-8)** | sim | sim | sim, do projeto liberado | **(P-8)** | sim |
| Exportar com fatores | não | não | não | sim | não | sim |
| Exportar sem identificação | **(P-8)** | sim | sim | sim | **(P-8)** | sim |

## 7. O que muda no sistema

| Área | Mudança |
|---|---|
| Dependência | `openpyxl` (nova) |
| Projeto | Endpoint de export com filtros (safra, fazendas, módulos, idioma, sem identificação) |
| Emissão | Corrigir unidade do combustível no cálculo (`lca/calculations/fuel.py:88-98`); guardar unidade digitada de calcário e gesso; fonte nos fatores de combustível |
| Remoção | Campos novos: data, laboratório e método da análise de solo; guardar a janela de modelagem |
| Fatores | Fator usado por linha guardado no resultado (CF-RN-25, CF-RN-26) |
| Acesso | Export segue `list_project_farms`; auditor pelo vínculo auditor × projeto (feature 04) |
| Registro | Log de exportação |
| Web | Botão Exportar (outline, ícone de download) no projeto; painel de opções; aviso de talhão sem oficial |

## 8. Fases de entrega

1. **Planilha modelo:** pedir a planilha própria do Paulo, montar XLSX de exemplo
   com dados fictícios e validar com Paulo e Ruan. Fecha P-2, P-3 e P-7.
2. **Correções de dado:** unidade de combustível, calcário e gesso. Bug de
   cálculo, independe do export.
3. **Export dos quatro módulos:** dados digitados, só oficiais, filtros, idioma,
   sem identificação. Depende da fase 1 do cálculo oficial (selo e safra).
4. **Arquivo do auditor:** aba de fatores e parâmetros, leitura da foto. Depende
   da fase 3 do cálculo oficial (foto e versão de fatores) e da feature 04.

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 9. Fora desta feature

| Item | Onde |
|---|---|
| Resultados dos cálculos | PDF (feature 02) |
| Pacote de evidências em PDF para baixar (Paulo B6) | Feature 04, depende de upload de evidência |
| Restringir fatores de emissão ao auditor também nas telas (Paulo B3) | Feature 04 |
| Reimportar planilha editada | Não previsto (E3) |
| Export em segundo plano | Só se a geração passar de ~30 s |
| Conferir se a plataforma herdou o erro de `Total_Agro!D18` (F1) | Task de verificação à parte |

## 10. Pendências

Decidir na reunião de 06/10. Até lá valem as regras provisórias indicadas.

| # | Pergunta | Paulo | Ruan | Regra provisória |
|---|---|---|---|---|
| P-1 | A planilha leva resultado? | Não; cálculo vai no PDF | Sim, por categoria (`Total_Agro`) | Só dados digitados (RN-01) |
| P-2 | Por hectare ou total da área? | Por hectare, no nível de coleta | Total da área | kg/ha na célula, total em kg na coluna da fazenda (RN-11, RN-12) |
| P-3 | Várias safras: coluna ou aba? | Coluna por cultura/safra | Aba por safra | Uma safra por arquivo; várias = safra no cabeçalho (RN-13) |
| P-4 | Regenerativo e Biodiversidade: fazenda ou talhão? | Regenerativo por fazenda; Biodiversidade os dois | Talhão nos dois | Unidade em que foi preenchido (RN-09). Levar ao CF: CF-RN-01 diz talhão |
| P-5 | LGPD: nome do produtor e localização | Sem nome do produtor; com coordenadas | Com nome do produtor; só município e UF | Sem nome, sem coordenadas, com município e UF (RN-05, RN-06). Decidir junto com PDF, QR e auditor |
| P-6 | Evidência | Arquivos para baixar, em PDF, fora do Excel | Só o nome do arquivo | Nome do arquivo; pacote na feature 04 (RN-07) |
| P-7 | Abas por categoria, dados em lista e cores do LCA tool | Uma aba por módulo; não entendeu C6 e C7 | Por categoria; sim; sim | Abas por categoria na Emissão com prefixo do módulo; lista e cores incluídas (RN-15, RN-16). Revalidar com a planilha modelo |
| P-8 | Cliente e técnico exportam? | Todos, inclusive cliente | Admin, gestor, auditor | Admin, gestor, auditor e staff (RN-17) |
| P-9 | Talhão sem oficial | Não se aplica | Não permitir exportar | Exporta com coluna vazia e aviso em andamento; finalizado não tem lacuna (RN-22, RN-23) |
