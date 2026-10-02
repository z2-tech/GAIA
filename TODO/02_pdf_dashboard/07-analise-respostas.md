# 07 · Análise das respostas (Paulo, 01/10/2026)

Fonte: [Resosta_paulo.txt](Resosta_paulo.txt). Só o Paulo respondeu. O Ruan ainda
não. Onde a resposta do Paulo é a única base, a regra fica provisória até o Ruan
confirmar na reunião de 06/10.

Paulo respondeu 20 das 21 perguntas (a 15, "algo mais", ficou em branco). Devolveu
três com dúvida (5, 12 e M2) e marcou a 8 dizendo "temos que discutir".

Comparação feita contra a proposta da Z2 ([03](03-analise-produto.md),
[06](06-por-modulo.md)) e contra a versão final 1 do cálculo oficial
([CF](../00_calculo_final/07-versao-final-1.md)).

## O que mudou no nosso entendimento

1. **O PDF é curto.** Paulo quer um resumo de 1 a 2 páginas (4), não o documento
   de 6 a 12 páginas da proposta. Só o PDF do projeto completo (1). Saem o PDF por
   módulo, o de fazenda e o de talhão.
2. **O leitor é cliente e comprador.** A Control Union não lê o PDF para
   verificar: ela verifica na plataforma e atesta (2). O PDF não precisa carregar
   tudo o que o auditor pede. Metodologia vira só referência (comentário da 1).
3. **LGPD pesa.** Paulo duvida da tabela por fazenda (passo 6) e não marcou nome
   do produtor nem nome das fazendas (8). O mesmo aparece no export (B4, D4), no
   QR (9) e no auditor (9, "às cegas"). É tema transversal, não só deste PDF.
4. **Duas versões do PDF.** A pergunta do Paulo na 5 ("duas versões? uma
   verificada e outra autodeclarada, quando não quiserem pagar?") descreve o
   modelo certo. O projeto sem claim termina no finalizado e entrega o PDF
   autodeclarado. O projeto com claim, depois de verificado, entrega o PDF com QR
   e o selo da verificadora. Bate com CF-RN-31, CF-RN-36 e CF-RN-37.
5. **Rascunho antes de finalizar** (11). Casa com CF-RN-36.
6. **Biodiversidade entra agora** (M6), apesar da tela em construção.

## Vira regra

| # | Regra | Base |
|---|---|---|
| R1 | Um tipo de PDF: projeto completo, com os módulos contratados | 1 |
| R2 | Leitor: cliente e comprador. Control Union verifica na plataforma | 2 |
| R3 | Resumo de 1 a 2 páginas | 4 |
| R4 | Metodologia só como referência (norma e versão), sem texto longo | 1 |
| R5 | Emissão mostra só a alocação principal | 7 |
| R6 | Mostra mapa das fazendas, produtividade (t/ha), município e UF. Não mostra nome do produtor | 8 |
| R7 | Idioma escolhido na hora: português ou inglês | 9 |
| R8 | Marca GAIA + Peterson | 10 |
| R9 | Remoção mostra os três números (ganho por ha/ano, diferença contra o BAU, total da área); o principal é o total da área | M1 |
| R10 | Regenerativo lista pontos fortes e de atenção por indicador | M3 |
| R11 | Regenerativo usa "X% da área na faixa Bom do índice GAIA v1", nunca "fazenda regenerativa" | M4 |
| R12 | Recomendações de melhoria ficam para depois | M5 |
| R13 | Biodiversidade entra na primeira versão | M6 |
| R14 | Rascunho antes de finalizar; documento oficial depois | 11 |
| R15 | Sem assinatura digital ICP-Brasil | 14 |

## Pontos em aberto

| Tema | Paulo | Proposta Z2 / CF | Proposta |
|---|---|---|---|
| Quem gera o PDF oficial (13) | Só gestor | CF-RN-22: admin do projeto, gestor e GAIA finalizam | Gestor e GAIA. Perguntar se o admin do projeto, que pode finalizar, também gera |
| Aviso da Remoção (6, M2) | Não precisa ("quem é da área sabe"); aceita o aviso padrão, mas pergunta como fica se verificado | Aviso obrigatório (GHG Protocol, EmpCo). Na página do QR (feature 03, M1) o próprio Paulo aceitou o aviso | Manter uma linha de aviso. O PDF vai ao comprador, que não é da área. Texto muda com o status (ver abaixo) |
| Número principal da Remoção (M1) | Os três; destaque no total da área | CF-RN-18: o declarado é a variação medida entre linha de base e monitoramento; projeção informativa (CF-P-2) | Projeto com monitoramento: variação medida em destaque. Projeto só com linha de base: os três números do RothC, rotulados como projeção do modelo |
| Qual alocação é a principal (7) | "Só a principal", sem dizer qual | A tela da Emissão abre na alocação por massa (`allocation-section.tsx:36`) | Massa até o produto decidir |
| Nome das fazendas (8) | Não marcou | Proposta tinha tabela por fazenda | Sem nome do produtor e sem nome de fazenda. Fazendas aparecem como "Fazenda 1, 2, 3" |
| Mapa + município (8) | Marcou, "temos que discutir" | Mapa vem de `Farm.kml_photo` | Mapa sem rótulo. Discutir: mapa e município juntos identificam a propriedade |
| Tabela por fazenda (passo 6) | Dúvida por LGPD | Proposta tinha | Fora da v1. Com 1 a 2 páginas não cabe mesmo |
| PDF antigo depois de gerar de novo (12) | Não entendeu | H2: o antigo vira "substituído" | Reformular com exemplo (abaixo). Provisório: substituído |
| Selo de status (5) | Perguntou se são duas versões | Selo em todo PDF até verificar | Sim. Autodeclarado e verificado são as duas versões |
| 4 módulos em 2 páginas (4, M6) | Resumo e Biodiversidade agora | Proposta de 6 a 12 páginas | Página 1 resumo, página 2 detalhe. Se os 4 módulos não couberem, o layout no Penpot decide se cresce para 3 |

## Perguntas para refazer com exemplo

**5 · Selo.** "O projeto da Fazenda Boa Vista foi finalizado mas o cliente não vai
pagar verificação. O PDF que ele baixa sai com o selo 'Autodeclarado, não
verificado por terceira parte' e sem QR. Outro cliente pagou a Control Union; depois
da aprovação, o PDF dele sai com 'Verificado por Control Union em 10/03/2027' e o QR.
É isso?"

**12 · PDF antigo.** "Em 10/03 você gerou o PDF e mandou ao comprador. Em 20/03 a
GAIA reabriu o projeto e corrigiu a ureia de um talhão. O número mudou. Quando o
comprador conferir o PDF de 10/03, ele deve ver: (a) válido; (b) substituído por
uma versão mais nova; (c) nada, o PDF antigo não é rastreado?"

**M2 · Aviso da Remoção verificada.** "Depois que a Control Union verificar, o aviso
da Remoção perde o 'não verificada por terceira parte', mas continua dizendo que
não é crédito de carbono. Concorda?" A verificação aqui é de cálculo e
metodologia (auditor, pergunta 1), não emissão de crédito.

## Requisitos novos

| Requisito | Origem | Onde encaixa |
|---|---|---|
| Score do projeto no Regenerativo, além da faixa e do % de área | QR M2 do Paulo | Este PDF e a página do QR |
| Logo da verificadora no PDF verificado | QR 17 do Paulo | Este PDF (selo) e feature 03 |
| Política de LGPD comum a export, PDF, QR e auditor | Paulo em quatro questionários | Reunião 06/10; regra única para as quatro features |

## O que o código diz

- **Módulos contratados existem.** `Project.modules` (M2M com `Module`,
  `projects/models.py:39`). O PDF mostra só esses.
- **Três alocações calculadas.** Massa, energia e economia
  (`lca/models.py:128-130`). A tela abre em massa.
- **Não há nome do produtor na fazenda.** `Farm` tem `name`, `responsible` (usuário),
  endereço, `city_name`, `state`, coordenadas e `kml_photo` (`farms/models.py:9-58`).
  "Nome do produtor" na prática é o nome do responsável ou o nome da fazenda.
- **Dashboard de projeto não existe.** Os números do PDF dependem da agregação
  do cálculo oficial (CF-RN-13, fase 2 do CF).

## Efeito no rascunho de tasks

- Sai o PDF por módulo e a rota `/print/project/[id]/[module]`.
- Layout A4 passa a ser 2 páginas, não 6 a 12.
- Sai a tabela por fazenda.
- Metodologia vira bloco de referências curto. Os textos por módulo continuam,
  menores.
- Selo de status ganha três estados de documento: rascunho, autodeclarado e
  verificado.
- Permissão de emissão: gestor e GAIA.
- Assinatura ICP-Brasil sai da lista.

## Pauta para 06/10

1. Ruan: responder o questionário (são 21 perguntas, 15 minutos).
2. Quem gera o PDF oficial: só gestor ou também o admin do projeto?
3. Aviso da Remoção: uma linha no PDF, igual à página do QR?
4. Remoção: qual número vai em destaque quando o projeto tem só linha de base?
   (liga com CF-P-2)
5. Qual alocação é a principal: massa, energia ou economia?
6. LGPD: nome da fazenda, mapa e município. Uma regra para as quatro features.
7. Refazer 5, 12 e M2 com os exemplos acima.
