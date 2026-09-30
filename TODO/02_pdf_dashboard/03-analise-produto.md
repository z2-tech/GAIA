# 03 · Análise de produto e estrutura dos PDFs

Formato da skill `business-product-strategist`. O layout final vai para o Penpot
(páginas A4) antes do dev.

## Avaliação geral

O PDF é o que sai da plataforma e circula sem ela: vai para o cliente, o comprador,
o verificador e, via QR, para o pacote do produto. Isso muda o nível de exigência.
Um print do dashboard serve para uso interno, mas não sustenta um claim de pegada
diante de um comprador europeu. O PDF precisa ser **legível por um leigo na primeira
página** e **completo para um auditor nas últimas**, com a origem provada pelo QR.

## Problemas encontrados

- Os dashboards de hoje são telas interativas (abas, seletores, hover); nada disso
  existe no papel.
- Não há dashboard de projeto: o PDF "do projeto" não tem de onde sair.
- Nada garante que o número impresso é o mesmo da tela no dia seguinte.
- Sem aviso de status, um resultado autodeclarado pode ser lido como certificado.

## Oportunidades

- **Material de venda:** o PDF do projeto é o que o Paulo leva ao Danilo e ao
  cliente. Primeira página tem de vender.
- **Encurtar a verificação:** metodologia, fatores e fontes no próprio documento
  reduzem ida e volta com a Control Union.
- **Rastreabilidade:** documento com código e QR vira prova anexável a lote.

## Redesign sugerido: estrutura

### PDF do projeto (A4 retrato, ~6–12 páginas)

| Pág. | Conteúdo | Leitor |
|---|---|---|
| 1 · Capa e resumo | Logo, projeto, safra/período, emitido em, **código do documento**, selo de status. 3–5 KPIs grandes: emissão (tCO₂e), intensidade por produto (kgCO₂e/kg), remoção, nota regenerativa. Mapa das fazendas (`kml_photo`) | Todos |
| 2 · Cobertura e escopo | Fazendas, talhões, área, culturas; cobertura por módulo; unidade declarada e fronteira (berço à porteira) | Todos |
| 3 · Emissão | Total e intensidade; fóssil, biogênico e mudança de uso do solo em linhas separadas; de onde vem a emissão (barra por fonte); tabela por fazenda | Cliente, comprador |
| 4 · Remoção | Seção própria; BAU × projeto; horizonte; aviso "estimativa de modelo, não é crédito de carbono" | Cliente, comprador |
| 5 · Regenerativo e Biodiversidade | Nota média e distribuição; aviso "índice GAIA, não certificação" | Cliente |
| 6 · Por fazenda | Tabela com uma linha por fazenda e os principais números | Cliente, verificador |
| 7 · Metodologia | Normas (ISO 14067, GHG Protocol), GWP (AR6), bases de fatores e versões, alocação (principal + sensibilidade), período, exclusões, % de dado primário | Verificador |
| 8 · Limitações e avisos | Limitações de uso, **não comparar produtos entre estudos diferentes**, status de verificação, sem claims genéricos | Todos |
| Última · Verificação | QR grande, código curto para digitar, URL, data de emissão, "confira a autenticidade em …" | Todos |

Rodapé de todas as páginas: código do documento · página N de M · gerado em
dd/mm/aaaa · status.

### PDF de um módulo (2–4 páginas)

Capa-resumo do módulo, detalhamento, por fazenda, metodologia do módulo, página de
verificação. Mesmo rodapé.

### PDF de rascunho

Mesmo layout, **marca d'água "Rascunho"**, sem QR e sem código. Para conferência
antes de finalizar o projeto.

## Fluxo de emissão

```
Projeto finalizado ──► [Gerar PDF ▾ Projeto completo | Emissão | Remoção | …]
                        │
                        ├─ Opções curtas: idioma, safra (padrão preenchido)
                        ▼
                  "Gerando documento…" (2–10 s)
                        ▼
      Documento GAIA-7K3F-92QD · emitido 30/09/2026 · Válido     [Baixar] [Copiar link]
                        │
                        └─ Aba "Documentos" do projeto: histórico, baixar de novo,
                           revogar, ver quem emitiu; gerar de novo cria outro documento
                           e marca o anterior como "substituído"
```

Antes de finalizar: botão vira **"Gerar rascunho"** e o PDF sai com marca d'água.

## Novos componentes

- Botão **Gerar PDF** (outline) com menu dos tipos.
- **Aba "Documentos"** no projeto: lista com código, tipo, data, quem emitiu,
  status (badge), ações.
- **Selo de status** do documento (Autodeclarado · Verificado · Substituído ·
  Revogado), reusado na página do QR.
- **Layout de impressão A4**: capa, cabeçalho, rodapé, quebras de página, versões
  estáticas dos gráficos (sem animação, tamanho fixo), tabela de dados ao lado de
  cada gráfico.

## Melhorias no fluxo

- Um clique no caso comum (projeto completo, safra atual, português).
- Reusar documento: se nada mudou desde o último, oferecer o existente em vez de
  gerar outro.
- Aviso antes de gerar se houver talhão sem oficial ou cálculo desatualizado.

## Microinterações

- Progresso durante a geração; toast "Documento emitido" com o código.
- Copiar link da página de verificação com um clique.

## Impacto para o usuário

- Paulo e Ruan têm material pronto para vender e para entregar.
- O comprador recebe um documento que segue a norma e se autoverifica.
- A Control Union tem metodologia e fontes na mão.

## Prioridade

- **Alta:** registro de documento emitido; PDF do projeto; página de verificação no
  fim; selo de status; metodologia e avisos.
- **Média:** PDF por módulo; aba Documentos; rascunho com marca d'água; PDF/A.
- **Baixa:** inglês; co-branding com o cliente; assinatura ICP-Brasil; PDF de
  talhão.

## Complexidade

- **Baixa:** layout A4 com CSS `@page`; botão e aba de documentos.
- **Média:** Gotenberg ao lado da API; rota de impressão com token de uso único;
  gráficos com tamanho fixo e sem animação; registro de documento.
- **Alta:** depende do consolidado (05) e do snapshot do oficial (00); textos de
  metodologia corretos por módulo (precisam de revisão do Paulo e dos
  especialistas João e Day).
