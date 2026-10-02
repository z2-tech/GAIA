# 01 · Export Excel dos dados brutos

Feature 1 do [escopo de 29/09/2026](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md).
Depende da [feature 0](../00_calculo_final/README.md): o export mostra o cálculo
oficial de cada talhão, não as simulações.

Estado: **discovery**. Nada criado no Plane. Questionário respondido por Paulo e
Ruan em 01/10; análise em [07-analise-respostas.md](07-analise-respostas.md);
definição em [08-versao-final-1.md](08-versao-final-1.md). Divergências vão para a
reunião de 06/10.

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O pedido, o que existe no código, o que dá e o que não dá para exportar hoje |
| [02-pesquisa.md](02-pesquisa.md) | As planilhas de referência em `docs/references/domain`, normas e mercado |
| [03-analise-produto.md](03-analise-produto.md) | Análise de produto e proposta de planilha (abas, layout, o que pode e o que não pode) |
| [04-questionario-produto.md](04-questionario-produto.md) | Questionário para Paulo e Ruan (versão texto) |
| [questionario.html](questionario.html) | Mesmo questionário como página interativa. Link no fim deste arquivo |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis, por fase, com regras e pendências |
| [06-por-modulo.md](06-por-modulo.md) | Abas de Remoção, Regenerativo e Biodiversidade |
| [07-analise-respostas.md](07-analise-respostas.md) | Consensos, divergências, perguntas a refazer, requisitos novos e pauta de 06/10 |
| [08-versao-final-1.md](08-versao-final-1.md) | **Versão final 1:** o que é a feature, jornada, regras de negócio (RN-n), conteúdo por módulo, permissões e pendências (P-n) |

## Em uma página

- **Todos os módulos:** além da Emissão, abas de Remoção (entradas do modelo,
  culturas e compostos, resultados BAU × projeto), Regenerativo (28 indicadores ×
  fazendas) e Biodiversidade (43 perguntas × talhões). Ver [06](06-por-modulo.md) e
  [referência dos módulos](../modulos-referencia.md).
- **Pedido** (Paulo, 29/09): "baixar os dados brutos, como se fosse a planilha".
  Num projeto de 20 fazendas: linhas = insumos (fertilizante, calcário…), colunas =
  fazendas, com os números. O auditor também baixa e precisa ver os fatores de
  emissão usados.
- **A referência não tem esse layout.** O `LCA_Annual_Crops_Tool.xlsx` é uma
  planilha por cultura × safra × talhão, com uma aba por categoria e o fator de
  emissão na mesma linha do insumo. Nenhuma planilha de `domain` põe fazendas lado
  a lado. A proposta junta os dois: abas e colunas fixas iguais às do LCA tool, e
  uma coluna por fazenda depois delas.
- **No código não há nada de export** (nem lib, nem endpoint). Dá para montar em
  Python a partir do que já existe (`LcaSelectors.get_culture_detail_dict`).
- **Três problemas de dado aparecem ao exportar:**
  1. O fator de emissão usado em cada cálculo não é guardado. Só dá para mostrar o
     fator atual do catálogo.
  2. Calcário e gesso são salvos convertidos para kg total; a unidade digitada se
     perde.
  3. A unidade do combustível é salva, mas o cálculo a ignora (m³, kg e TJ entram
     como litro). É um **bug de cálculo**, não só de export.
- **Maior decisão aberta:** o que é "uma coluna". Uma fazenda tem vários talhões,
  culturas e safras. Somar kg/ha de talhões diferentes dá número errado.
- **Segunda maior:** para quem é o arquivo (equipe, cliente, auditor). Isso decide
  se vai resultado, fator de emissão, localização e identificação do produtor.

## Hipóteses de trabalho (a validar no questionário)

- **H1 · XLSX com abas no padrão do LCA tool.** Capa "Sobre", "Resumo", uma aba
  por categoria (insumos nas linhas, colunas fixas Insumo · Unidade · FE · Unidade
  FE · Fonte, depois uma coluna por fazenda e Total), "Fatores de emissão",
  "Dados (formato longo)" e "Dicionário". Ver [03](03-analise-produto.md).
- **H2 · Só o cálculo oficial**, só valores (sem fórmulas), sem dados pessoais nem
  localização por padrão.

## Link do questionário

https://claude.ai/artifact/46VX7dbWZSbE2BmQaLerAd (respostas por pessoa na coleção `respostas`)
