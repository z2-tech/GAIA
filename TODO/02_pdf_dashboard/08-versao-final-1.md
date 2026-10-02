# PDF do projeto · versão final 1

Data: 02/10/2026. Base: reunião de 29/09, respostas do Paulo Rocha ao questionário
([análise](07-analise-respostas.md)), a versão final 1 do cálculo oficial
([CF](../00_calculo_final/07-versao-final-1.md)) e o código atual.

O Ruan ainda não respondeu. Regras marcadas com **(P-n)** são provisórias: seguem
a resposta do Paulo ou a proposta da Z2 até a decisão da pendência n, listada no
fim. Regras do cálculo oficial aparecem como CF-RN-n.

## 1. O que é a feature

Um botão no projeto gera um **resumo em PDF de 1 a 2 páginas** com os números
oficiais de cada módulo contratado: Emissão, Remoção, Regenerativo e
Biodiversidade.

O PDF existe em três versões, conforme o estado do projeto:

- **Rascunho**, antes de finalizar: marca d'água, sem código, para conferência.
- **Autodeclarado**, depois de finalizar: código do documento, selo
  "Autodeclarado, não verificado por terceira parte", sem QR. É o entregável do
  projeto sem claim.
- **Verificado**, depois da aprovação do auditor: selo e logo da verificadora, QR
  code que leva à página pública (feature 03).

O cliente recebe o PDF e repassa ao comprador.

## 2. Por que

- O Paulo quer o dashboard no computador e para entregar ao cliente (29/09). Hoje
  não existe PDF nem dashboard de projeto.
- O comprador recebe um número que circula sem a plataforma. Sem selo de status, um
  número autodeclarado passa por certificado.
- Sem foto do momento (CF-RN-25), o PDF de hoje não bate com a tela de amanhã. O
  PDF lê da foto, não do cálculo vivo.

## 3. Vocabulário

| Termo | Significado |
|---|---|
| **Rascunho** | PDF gerado com o projeto em andamento. Marca d'água "Rascunho". Não é registrado |
| **Documento** | PDF registrado na plataforma, com código, data, quem gerou e hash. Nasce de uma foto do projeto (CF-RN-25) |
| **Autodeclarado** | Documento de projeto finalizado ou em verificação. Não passou por terceira parte |
| **Verificado** | Documento de projeto verificado. Tem QR e logo da verificadora |
| **Substituído** | Documento antigo depois de uma reabertura e nova finalização |

## 4. Jornada

1. Durante o projeto, qualquer usuário com acesso gera um rascunho para conferir
   os números.
2. O projeto é finalizado (CF-RN-19 a CF-RN-23). O gestor gera o documento
   autodeclarado, escolhendo o idioma.
3. Sem claim: o gestor envia o PDF ao cliente. Fim.
4. Com claim: o projeto vai para verificação. A Control Union verifica na
   plataforma, não no PDF.
5. Aprovado (CF-RN-33), o gestor gera o documento verificado, com QR. O cliente
   repassa ao comprador; o QR pode ir no lote.
6. Se a GAIA reabrir um projeto finalizado (CF-RN-28), o documento autodeclarado
   anterior passa a "substituído". A próxima finalização gera um novo.

## 5. Regras de negócio

### 5.1 Documento

- **RN-01** Existe um tipo de PDF: o do projeto completo. Sem PDF por módulo,
  fazenda ou talhão nesta versão.
- **RN-02** O PDF mostra só os módulos contratados no projeto (`Project.modules`).
- **RN-03** O PDF usa só oficiais, agregados por fazenda e projeto (CF-RN-13,
  CF-RN-15).
- **RN-04** Tamanho alvo: 2 páginas A4 retrato. Se os quatro módulos não couberem,
  o layout no Penpot pode ir a 3. **(P-7)**
- **RN-05** Idioma escolhido na hora: português ou inglês.
- **RN-06** Marca GAIA + Peterson no cabeçalho. No verificado, também o logo da
  verificadora.
- **RN-07** Sem assinatura digital ICP-Brasil.

### 5.2 Versões e estados

- **RN-08** Projeto em andamento ou pronto para finalizar gera só rascunho: marca
  d'água "Rascunho", sem código, sem QR, sem registro.
- **RN-09** Projeto finalizado ou em verificação gera documento autodeclarado:
  código, selo "Autodeclarado, não verificado por terceira parte", sem QR
  (CF-RN-36).
- **RN-10** Projeto verificado gera documento verificado: selo "Verificado por
  [verificadora] em [data]", logo da verificadora e QR (CF-RN-37).
- **RN-11** O documento lê da foto da finalização, nunca do cálculo vivo
  (CF-RN-25). Como o projeto travado não muda, gerar de novo devolve o mesmo
  documento. Português e inglês são dois arquivos do mesmo documento, com o mesmo
  código.
- **RN-12** Reabrir o projeto (CF-RN-29) marca o documento anterior como
  "substituído", com link para o novo depois da próxima finalização. **(P-6)**

### 5.3 Quem gera

- **RN-13** Rascunho: qualquer usuário com acesso ao projeto.
- **RN-14** Documento autodeclarado e verificado: gestor (`manager`) e equipe GAIA
  (`is_staff`). **(P-1)**
- **RN-15** O auditor baixa o documento do projeto que verifica (CF-RN-32), mas
  não gera.

### 5.4 Dados pessoais

- **RN-16** O PDF não mostra nome do produtor nem do responsável pela fazenda.
- **RN-17** Fazendas aparecem como "Fazenda 1, 2, 3", sem nome. **(P-5)**
- **RN-18** O PDF mostra município e UF de cada fazenda e o mapa, sem rótulo de
  nome. **(P-5)**
- **RN-19** Sem tabela por fazenda nesta versão.

### 5.5 Conteúdo por módulo

- **RN-20** Emissão: só a alocação principal. Provisório: massa, que é a que a tela
  abre. **(P-4)**
- **RN-21** Emissão: fóssil, biogênico e mudança de uso do solo em linhas
  separadas (ISO 14067). Produtividade em t/ha.
- **RN-22** Remoção: três números. Ganho médio anual (tCO2e/ha/ano), diferença
  contra o BAU (tCO2e/ha) e remoção total da área (tCO2e/ano), este em destaque.
  **(P-3)**
- **RN-23** Remoção com monitoramento: o número em destaque é a variação de estoque
  medida entre linha de base e monitoramento (CF-RN-18). Os números do RothC
  aparecem rotulados como projeção do modelo. **(P-3)**
- **RN-24** Remoção nunca é subtraída da emissão em nenhum total.
- **RN-25** Remoção tem uma linha de aviso. Autodeclarado: "Estimativa de modelo
  (RothC), não verificada por terceira parte. Não é crédito de carbono."
  Verificado: "Estimativa de modelo (RothC). Cálculo verificado por
  [verificadora]. Não é crédito de carbono." **(P-2)**
- **RN-26** Regenerativo: faixa (Bom, Atenção, Crítico), score do projeto e "X% da
  área na faixa Bom do índice GAIA v1". Nunca "fazenda regenerativa" ou "produto
  regenerativo".
- **RN-27** Regenerativo: pontos fortes (indicadores em Bom) e pontos de atenção
  (em Crítico).
- **RN-28** Biodiversidade: nota, classificação (baixa, média, alta), pontos fortes
  e respondidas / total.
- **RN-29** Recomendações de melhoria não entram nesta versão.
- **RN-30** Metodologia: um bloco de referências, uma linha por módulo, com norma,
  versão do índice ou modelo e GWP (AR6). Sem texto explicativo.
- **RN-31** Avisos curtos de Regenerativo ("índice interno GAIA, não é
  certificação") e Biodiversidade ("autoavaliação, não mede espécies") ficam como
  em [06](06-por-modulo.md).

## 6. Estrutura do PDF

Rodapé em todas as páginas: código do documento · página N de M · gerado em
dd/mm/aaaa · selo de status. No rascunho, sem código.

**Página 1 · Resumo**

| Bloco | Conteúdo |
|---|---|
| Cabeçalho | GAIA + Peterson (+ verificadora no verificado), nome do projeto, safra(s), código, selo de status |
| Escopo | Nº de fazendas e talhões, área total, culturas, municípios e UF |
| Números | Um bloco por módulo contratado, cada um com seu rótulo (ver abaixo) |
| Mapa | Mapa das fazendas (`kml_photo`), sem nome |

```
 EMISSÃO                REMOÇÃO (estimativa)     REGENERATIVO           BIODIVERSIDADE
 0,29 kgCO₂e/kg soja    1.240 tCO₂e/ano          62% da área em Bom     Média (58)
 11.140 tCO₂e           +0,8 tCO₂e/ha/ano        Score 71 · Bom         autoavaliação
 Autodeclarado          Não é crédito            Não é certificação     Não mede espécies
```

**Página 2 · Detalhe**

| Módulo | Conteúdo |
|---|---|
| Emissão | Total e por kg na alocação principal; fóssil, biogênico e uso do solo separados; barra de onde vem a emissão; produtividade t/ha |
| Remoção | Três números; gráfico BAU × projeto pequeno; aviso de uma linha |
| Regenerativo | Faixa, score, % da área em Bom; pontos fortes e de atenção |
| Biodiversidade | Nota, classificação, pontos fortes, respondidas / total |
| Referências | Uma linha por módulo: ISO 14067 e GHG Protocol (Emissão), RothC (Remoção), índice GAIA v1 (Regenerativo), questionário GAIA (Biodiversidade); GWP AR6 |
| Verificação | Só no verificado: QR, código curto, URL, verificadora e data |

## 7. Estados

| Estado do projeto (CF) | PDF gerado | Código | Selo | QR |
|---|---|---|---|---|
| Em andamento | Rascunho | não | marca d'água "Rascunho" | não |
| Pronto para finalizar | Rascunho | não | marca d'água "Rascunho" | não |
| Finalizado | Autodeclarado | sim | Autodeclarado | não |
| Em verificação | Autodeclarado | sim | Autodeclarado | não |
| Verificado | Verificado | sim | Verificado por [verificadora] | sim |

Estados do documento: **válido** e **substituído**. Revogar é da feature 03 (QR).

## 8. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | GAIA (staff) |
|---|---|---|---|---|---|
| Gerar rascunho | sim | sim | sim | não | sim |
| Gerar documento autodeclarado ou verificado | não | sim | não **(P-1)** | não | sim |
| Baixar documento já gerado | sim | sim | sim | sim | sim |

## 9. O que muda no sistema

| Área | Mudança |
|---|---|
| Documento emitido | Registro novo: código, projeto, foto da finalização, tipo (autodeclarado, verificado), status (válido, substituído). Cada PDF gerado é um arquivo filho com idioma, hash, chave S3, quem gerou e quando. Compartilhado com a feature 03 (QR-RN-03: o código é da foto, não do arquivo) |
| Infra | Gotenberg (Chromium) ao lado da API, como em [01](01-entendimento.md) |
| Web | Rota de impressão `/print/project/[id]` com layout A4 de 2 páginas, gráficos estáticos, lendo da foto |
| Projeto | Botão "Gerar PDF" e lista de documentos |
| Dependências | Foto e estados do CF (fase 3); agregação do CF (fase 2) |

## 10. Fases de entrega

1. **Rascunho:** rota de impressão com os números oficiais agregados, marca
   d'água. Depende das fases 1 e 2 do CF.
2. **Documento autodeclarado:** registro, Gotenberg, código, selo. Depende da fase
   3 do CF (finalizar e foto).
3. **Documento verificado:** selo da verificadora e QR. Junto com a feature 03 e a
   fase 4 do CF.

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 11. Fora desta feature

| Item | Onde |
|---|---|
| PDF por módulo, fazenda ou talhão | Depois, se pedirem |
| Tabela por fazenda | Depois da regra de LGPD (P-5) |
| Recomendações de melhoria | Depois (M5) |
| Anexo completo com metodologia longa | O auditor vê na plataforma (feature 04) |
| Assinatura ICP-Brasil | Não precisa (14) |
| Revogar documento e página pública | Feature 03 |

## 12. Pendências

Decidir na reunião de 06/10. Até lá valem as regras provisórias indicadas.

| # | Pergunta | Paulo | Ruan | Regra provisória |
|---|---|---|---|---|
| P-1 | Quem gera o PDF oficial? O admin do projeto, que pode finalizar (CF-RN-22), também gera? | Só gestor | — | Gestor e GAIA (RN-14) |
| P-2 | A Remoção leva aviso no PDF? Muda depois de verificado? | Não precisa; pergunta como fica se verificado. Na página do QR aceitou o aviso | — | Uma linha, texto por status (RN-25) |
| P-3 | Remoção: qual número em destaque? Projeção do RothC ou variação medida? (CF-P-2) | Os três; destaque no total da área | — | Só linha de base: total da área. Com monitoramento: variação medida (RN-22, RN-23) |
| P-4 | Qual alocação é a principal na Emissão? | "Só a principal", sem dizer qual | — | Massa (RN-20) |
| P-5 | LGPD: nome da fazenda, mapa e município podem aparecer juntos? Regra comum com export, QR e auditor | Sem nome do produtor; mapa, município e produtividade, "temos que discutir" | — | Sem nomes; fazenda numerada; mapa sem rótulo (RN-16 a RN-18) |
| P-6 | Gerar de novo depois de mudar algo: o PDF antigo vira o quê? | Não entendeu | — | Substituído, só após reabertura (RN-12). Refazer com o exemplo do [07](07-analise-respostas.md) |
| P-7 | Quatro módulos cabem em 2 páginas? | Resumo de 1 a 2 páginas | — | Alvo 2, até 3 se o layout pedir (RN-04) |
| P-8 | O Ruan concorda com o PDF curto, sem PDF por módulo e sem tabela por fazenda? | Sim | — | Seguir o Paulo (RN-01, RN-04, RN-19) |
