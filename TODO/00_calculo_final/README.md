# 00 · Cálculo final (oficial) vs simulação

Feature 0 do [escopo de 29/09/2026](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md).
É a base do export, do PDF, do QR code e do auditor: os quatro mostram o cálculo
real, não as simulações.

Estado: **discovery**. Não há task criada no Plane. O questionário precisa voltar
respondido antes do design e do dev.

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O que é a feature, o que o código tem hoje, onde ela encaixa |
| [02-pesquisa.md](02-pesquisa.md) | O que os docs do projeto e as normas/ferramentas de mercado dizem, com fontes |
| [03-analise-produto.md](03-analise-produto.md) | Análise de produto/UX e proposta de fluxo |
| [04-questionario-produto.md](04-questionario-produto.md) | Questionário para Paulo e Ruan responderem (versão texto) |
| [questionario.html](questionario.html) | Mesmo questionário como página interativa, publicada em https://claude.ai/artifact/WsKJzRgjMiHHUwa6bvtDpB. Respostas ficam salvas por pessoa na coleção `respostas` |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis, com o que depende de cada resposta |

## Em uma página

- **Pedido** (Paulo, 29/09): por talhão e módulo, marcar qual cálculo é o real. Os
  outros são simulações. Na venda e na verificação só vai o real, "a foto daquele
  momento".
- **Hoje:** nenhum módulo tem isso por talhão. O Regenerativo tem `is_primary`, mas
  por fazenda do projeto (`project_farm`), e nenhuma tela deixa escolher. Comparação,
  benchmark e completude usam todos os cálculos ou o mais recente.
- **"Foto do momento" não existe:** a LCA sobrescreve o resultado ao recalcular e
  apaga ao cancelar; o RothC apaga e recria ao editar; o score do Regenerativo é
  recalculado com os pesos atuais; os fatores de emissão não têm versão.
- **Nome:** "linha de base" e "cenário" já têm outro sentido (BAU/projeto no RothC e
  nas normas). Proposta: **Oficial** e **Simulação**.
- **Maior decisão aberta:** a unidade do oficial. Um por talhão e módulo, ou um por
  talhão, módulo e safra? Sem período (safra) não dá para declarar pegada de produto
  (ISO 14067) nem montar histórico. Só a LCA tem `harvest_year` hoje.
- **Segunda maior:** quando trava. Hipótese de trabalho (H1, abaixo): ao
  **finalizar o projeto**. A validar no questionário.

## Hipóteses de trabalho

Propostas da Z2 usadas como base nos documentos. **Não são decisões**: estão no
questionário para o produto confirmar ou corrigir.

### H1 · O oficial trava só quando o projeto é finalizado (Henrique, 30/09/2026)

- Enquanto o projeto está em andamento, o usuário faz quantos cálculos quiser e
  marca e desmarca o oficial à vontade. Nada trava.
- **Finalizar o projeto** é uma ação explícita, com uma etapa de revisão: o
  usuário confirma, talhão por talhão e módulo por módulo, qual cálculo é o oficial
  (o verdadeiro) e quais são testes.
- Ao confirmar, os oficiais **travam**. É também o momento natural do
  congelamento: guardar inputs, resultado e versão dos fatores.

Consequências, se confirmada:

- A conclusão automática de hoje (`auto_complete_project`, projeto vira
  "concluído" quando chega a 100%) conflita com a finalização explícita. Proposta:
  100% vira "pronto para finalizar"; "finalizado" só por ação do usuário.
- Surgem perguntas novas: reabrir projeto finalizado, quem finaliza, talhão sem
  oficial na hora de finalizar, PDF/QR antes de finalizar. Estão no questionário,
  seção 3.
- Se um projeto corresponder a uma safra (pergunta 5), a unidade do oficial
  (pergunta 6) fica mais simples: o próprio projeto é o período.

### H2 · Jornada do projeto (entendimento da reunião de 29/09, a validar)

```
Peterson fecha projeto      Campo coleta       Consultor preenche na GAIA
com cliente (N fazendas) ──► dados (mobile) ──► linha de base + simulações
                                                        │
                                                        ▼
Cliente/comprador ◄── PDF + QR ◄── Control Union ◄── Escolhe oficiais
recebe; QR no lote    gerados      verifica como       e FINALIZA
                                   auditor             (quem? J3)
```

Pontos que não sabemos e que mudam o desenho:

- **Quem finaliza** na prática: quem preencheu, um revisor, o gestor ou o cliente
  (J3).
- **Ordem entre finalizar e verificar** (J5). Se a Control Union verifica depois
  de finalizar, erro do auditor obriga a reabrir. Se verifica antes, finalizar
  pode ser o "ok" que vem depois da verificação, e o fluxo fica: preencher →
  escolher oficiais → enviar para verificação → verificado → finalizar → PDF/QR.
- **Quem usa a plataforma** (J4) e se o cliente final acessa ou só recebe (J8).
- **Recorrência:** safra seguinte é projeto novo ou continuação (J9 e pergunta 5).

Seção J do [questionário](04-questionario-produto.md).
