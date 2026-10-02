# QR code e página pública · versão final 1

Data: 02/10/2026. Base: reunião de 29/09, resposta do Paulo Rocha ao questionário
([análise](07-analise-respostas.md)), a [versão final 1 do cálculo
oficial](../00_calculo_final/07-versao-final-1.md) (regras citadas como CF-RN-n e
CF-P-n) e o código atual. O Ruan não respondeu este questionário.

Regras marcadas com **(P-n)** são provisórias: seguem a proposta da Z2 até a
decisão da pendência n, listada no fim. As demais estão fechadas.

## 1. O que é a feature

Cada projeto verificado ganha um código e um QR. Quem escaneia abre uma página
pública no domínio da GAIA, sem login, que diz se o resultado saiu mesmo da
plataforma, se foi verificado e por quem, e mostra os números do projeto naquele
momento.

O QR vai no PDF do projeto e pode ser baixado sozinho (PNG ou SVG) para imprimir
em etiqueta, como o saco de café.

A página lê a foto imutável do projeto (CF-RN-25), nunca o dado atual. Se alguém
recalcular algo depois, o PDF e a página continuam batendo.

## 2. Por que

- O comprador quer saber se o PDF é autêntico sem pedir acesso à plataforma.
- A Peterson quer que o cliente possa pôr o resultado no produto (29/09: "se o
  cara prega isso num pacote de algodão, ele quer que seja público").
- Nenhuma plataforma agrícola de carbono pesquisada tem página pública por
  resultado ([02](02-pesquisa.md)).

## 3. Vocabulário

| Termo | Significado |
|---|---|
| **Código** | 16 caracteres base32 (`7K3F-92QD-M4XA-TR8P`), aleatório, o mesmo no QR e para digitar |
| **Página pública** | `/v/<código>` no domínio da GAIA. Sem login, sem indexação |
| **Emissor** | Quem gera o PDF oficial e o QR. A empresa que emitiu aparece na página |
| **Revogar** | Tirar o QR de circulação. A página passa a mostrar só "revogado" e a data |
| **Verificado** | Cálculos e metodologia conferidos por uma verificadora (CF-RN-33). Não é certificação nem crédito de carbono |

## 4. Jornada

1. O projeto é finalizado e verificado (CF-RN-19 a CF-RN-33).
2. **Gerar.** O gestor gera o PDF oficial (resposta 13 do PDF). Na emissão,
   escolhe o que fica público: nome das fazendas, município e UF, mapa, PDF para
   baixar. O padrão vem preenchido com o mínimo.
3. **Imprimir.** O PDF sai com o QR no fim. Na aba Documentos, o emissor copia o
   link ou baixa o QR em PNG ou SVG, com o código embaixo, para a gráfica.
4. **Escanear.** Comprador, trader, cliente do Peterson ou consumidor final abre a
   página no celular. Vê primeiro o veredito (emitido pela GAIA, verificado por
   quem), depois os números por módulo.
5. **Conferir o PDF.** Quem recebeu o arquivo pode arrastá-lo para a página, que
   responde "idêntico ao emitido" ou "diferente". **(P-6)**
6. **Revogar.** Se um número errado estiver em circulação, o emissor revoga. Os
   QRs já colados continuam abrindo a página, que mostra só "revogado" e a data.

## 5. Regras de negócio

### 5.1 Quando existe QR

- **RN-01** QR só para projeto verificado (CF-RN-37). Projeto finalizado e não
  verificado tem PDF sem QR, com a marca "não verificado" (CF-RN-36). **(P-1)**
- **RN-02** O QR é do projeto. Não há QR por fazenda nem por talhão.
- **RN-03** Um código por foto verificada do projeto. Todo PDF gerado dessa foto
  (em PT ou EN, com ou sem mapa) leva o mesmo QR e registra o próprio hash.
  Gerar outro PDF não troca o código das etiquetas já impressas. **(P-2)**
- **RN-04** O código tem 80 bits de gerador criptográfico. A URL nunca usa o id
  do projeto ou da fazenda.

### 5.2 O que a página mostra

- **RN-05** Ordem fixa: veredito, identidade, números por módulo, conferir PDF,
  detalhes técnicos (fechado), "O que é a GAIA".
- **RN-06** Veredito: "Documento emitido pela GAIA", data de emissão, código,
  status (válido ou revogado) e selo "Cálculos e metodologia verificados por
  <verificadora> em dd/mm". Nada de "certificado".
- **RN-07** Só os módulos contratados (`Project.modules`) com oficial na foto.
- **RN-08** Os números são do projeto: média ponderada dos oficiais das fazendas
  (CF-RN-13, CF-RN-14). A página diz "média de N fazendas, X ha".
- **RN-09** A página mostra a safra coberta (ano de colheita, CF-RN-11, exibido
  como "safra 2025/26"). O documento não vence.
- **RN-10** Público por padrão: empresa emissora, cultura, safra, número de
  fazendas e área total. Nome das fazendas, município, UF e mapa só se o emissor
  liberar na emissão. Nome do produtor nunca. **(P-3)**
- **RN-11** Mapa: o emissor escolhe na emissão entre sem mapa, municípios ou
  contornos das fazendas. Padrão: sem mapa. A imagem é guardada na foto e servida
  por caminho que não expira. **(P-3)**
- **RN-12** PDF completo para baixar na página: o emissor escolhe. Padrão: não.
- **RN-13** Marca: GAIA, logo da empresa emissora e logo da verificadora.
  **(P-7)**
- **RN-14** PT e EN. Idioma inicial pelo navegador; o visitante troca.

### 5.3 Conteúdo por módulo

Um número principal e uma frase de aviso por módulo. O resto vai em detalhes
técnicos. Textos da [06-por-modulo.md](06-por-modulo.md) até o Paulo mandar os
ajustes. **(P-5)**

| Módulo | Número principal | Detalhes | Aviso curto |
|---|---|---|---|
| Emissão | kgCO₂e por kg do produto, um por cultura | Total em tCO₂e; fóssil, biogênico e uso do solo; fronteira; alocação; GWP; versão dos fatores | "Pegada do berço à porteira da fazenda, calculada pela GAIA conforme ISO 14067." + linha de verificação |
| Remoção | Variação de estoque medida, tCO₂e/ha (CF-RN-18) | Estoque inicial e final; projeção de 5 anos marcada como informativa | "Estimativa de modelo (RothC). Não é crédito de carbono e não compensa a pegada." **(P-4)** |
| Regenerativo | Score do projeto, faixa (Bom, Atenção, Crítico) e % da área em Bom | As 5 seções com a faixa de cada; versão do índice | "Índice interno GAIA. Não é certificação nem selo." |
| Biodiversidade | % da área em cada classe (baixa, média, alta) **(P-8)** | Classe por fazenda, se liberado | "Autoavaliação de práticas. Indica potencial, não mede espécies." |

- **RN-15** A Remoção fica em bloco separado da Emissão. Nunca subtraída da
  pegada. Nada de "líquido", "neutro" ou "compensa".
- **RN-16** Nunca "fazenda regenerativa" nem "projeto regenerativo".

### 5.4 Revogação

- **RN-17** Revogar é do gestor, do admin do projeto e da equipe GAIA. Motivo
  obrigatório, guardado e não publicado. **(P-9)**
- **RN-18** Revogado mostra só "Este documento foi revogado pelo emissor em
  dd/mm". Sem números.
- **RN-19** Revogar não mexe no projeto: ele continua verificado (CF-RN-30). Para
  publicar outro número é preciso novo projeto.

### 5.5 Acesso e segurança

- **RN-20** A API pública é só leitura, sem autenticação, com limite de
  requisições por IP. Código inexistente e código mal formado dão a mesma
  resposta ("Código não encontrado").
- **RN-21** A página e o PDF levam `noindex`.
- **RN-22** `/v` sem código mostra um campo para digitar (aceita com ou sem
  hífen, maiúscula ou minúscula).

## 6. Estados do QR

```
Projeto verificado ──Gerar PDF oficial──► Ativo ──Revogar (motivo)──► Revogado
                                            │
                                            └── novos PDFs da mesma foto: mesmo código
```

| Estado | Veredito | Números | PDF para baixar | Conferir PDF |
|---|---|---|---|---|
| Ativo | "Emitido pela GAIA" + selo de verificação | sim | se o emissor liberou | sim |
| Revogado | "Revogado pelo emissor em dd/mm" | não | não | não |
| Não encontrado | "Código não encontrado. Confira os caracteres." | não | não | não |

O estado "substituído" da proposta inicial sai: com RN-03, gerar outro PDF não
cria código novo, e projeto verificado não muda (CF-RN-30).

## 7. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | GAIA (staff) | Público |
|---|---|---|---|---|---|---|
| Gerar PDF oficial com QR | não | sim | sim **(P-9)** | não | sim | não |
| Escolher o que fica público | não | sim | sim | não | sim | não |
| Baixar QR (PNG/SVG), copiar link | não | sim | sim | não | sim | não |
| Revogar | não | sim | sim | não | sim | não |
| Ver a página | sim | sim | sim | sim | sim | sim |

## 8. O que muda no sistema

| Área | Mudança |
|---|---|
| Documento emitido (feature 02) | Código e status passam a ficar na foto verificada do projeto; cada PDF gerado é um filho com hash; o que foi liberado para publicar; empresa emissora e logos; motivo e data de revogação |
| API | Endpoint público `AllowAny` com throttle anônimo, devolve a foto filtrada pelo que foi liberado |
| Web | Rota `(public)/v/[token]` e `/v`, render no servidor, layout próprio, fora do redirecionamento do `proxy.ts` |
| Web | Lib `qrcode`; QR no PDF; aba Documentos com baixar QR, copiar link, revogar |
| Mapa | Imagem gerada na emissão e guardada com a foto |

## 9. Fases de entrega

1. **Página e código:** endpoint público, rota `/v`, veredito, números por módulo
   da foto, entrada manual, PT/EN, QR no PDF. Depende do PDF oficial (02) e do
   estado verificado (CF fase 4).
2. **Controle do emissor:** o que publicar, mapa, logos, baixar QR para etiqueta,
   revogar.
3. **Integridade:** conferir PDF por hash. **(P-6)**

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 10. Fora desta feature

| Item | Onde |
|---|---|
| QR por fazenda ou por lote | Descartado por ora (Paulo 3). Rever se o cliente pedir rastreio por lote |
| Contador de leituras | Depois (Paulo 18) |
| Assinatura digital do PDF (PAdES) | Feature 02, fase 2. O Paulo disse que não precisa (PDF 14) |
| Pesquisa de Puma, My Easy Farm, UCropIt, Sateligence | PROD, antes do Penpot |
| Política de LGPD para o que sai da plataforma | Transversal: export, PDF, QR, auditor |

## 11. Pendências

Decidir na reunião de 06/10. Até lá valem as regras provisórias indicadas.

| # | Pergunta | Paulo | Ruan | Regra provisória |
|---|---|---|---|---|
| P-1 | QR só em projeto verificado ou também em finalizado, com selo "autodeclarado"? | "Mostrar quando é um ou outro" (12); no cálculo final, QR só verificado (18) | — | Só verificado (RN-01). O selo já é campo da página, então mudar depois é troca de regra |
| P-2 | Código por PDF gerado ou por projeto verificado? | — | — | Por projeto verificado; cada PDF registra seu hash (RN-03) |
| P-3 | O que fica público por padrão (LGPD)? | Só empresa emissora marcada; "precisamos discutir" (9); mapa a critério do emissor (8) | — | Empresa, cultura, safra, nº de fazendas, área total; resto só se liberado; sem mapa por padrão (RN-10, RN-11) |
| P-4 | Aviso "não é crédito de carbono": na página sim e no PDF não? | Sim na página (M1); no PDF "acho que não precisa" (PDF 6) | — | Aviso curto na página. No PDF, decidir junto |
| P-5 | Quais ajustes nos avisos por módulo? | "Com ajustes", sem comentário (M4) | — | Textos da 06-por-modulo (seção 5.3) |
| P-6 | A página confere se o PDF é idêntico ao emitido? | Não entendeu (10) | — | Sim, fase 3. Perguntar de novo com o exemplo da [análise](07-analise-respostas.md#pergunta-10-reformulada) |
| P-7 | Quem é a "empresa que emitiu" e de onde vem o logo? | GAIA + emissora + verificadora (17) | — | Nome e logo preenchidos na emissão, padrão Peterson |
| P-8 | Biodiversidade no projeto: como agregar a classe? | Entra (M3) | — | % da área em cada classe |
| P-9 | Quem gera o PDF oficial e revoga o QR? | Gestor (PDF 13) | — | Gestor, admin do projeto e GAIA (RN-17), igual a finalizar (CF-RN-22) |
