# 04 · Auditor convidado por projeto

Feature 4 do [escopo de 29/09/2026](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md):
o dono do projeto convida o auditor por e-mail; ele vê só aquele projeto, somente
leitura, com cálculos oficiais, dados primários e fatores de emissão, e baixa
Excel e PDF.

Estado: **discovery**. Nada criado no Plane. Questionário respondido pelo Paulo
em 01/10 (o Ruan não respondeu este; as falas dele sobre auditor vêm do
questionário do cálculo final). Análise em [07-analise-respostas.md](07-analise-respostas.md);
definição em [08-versao-final-1.md](08-versao-final-1.md). Pendências vão para a
reunião de 06/10.

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O pedido, o que já foi perguntado em outras features, o que existe no código, decisões técnicas, riscos |
| [02-pesquisa.md](02-pesquisa.md) | O que a Control Union pode verificar, o que o verificador pede (ISO 14064-3, Verra), como Vanta, Drata, One Click LCA dão acesso, segurança do convite, LGPD |
| [03-analise-produto.md](03-analise-produto.md) | Fluxo do convite, painel de verificação, rastro do cálculo, apontamentos |
| [04-questionario-produto.md](04-questionario-produto.md) | Perguntas para Paulo e Ruan |
| [questionario.html](questionario.html) | Mesmas perguntas em página interativa (link abaixo) |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks por fase (correções, acesso, painel e rastro, verificação, evidências), com regras e pendências |
| [06-por-modulo.md](06-por-modulo.md) | O que o auditor vê e o que falta em cada módulo |
| [07-analise-respostas.md](07-analise-respostas.md) | O que mudou, o que vira regra, pontos em aberto e pauta de 06/10 |
| [08-versao-final-1.md](08-versao-final-1.md) | **Versão final 1:** o que é a feature, jornada, regras de negócio (RN-n), estados, permissões e pendências (P-n) |

## Em uma página

- **A Control Union ainda não é verificadora da Verra para carbono no solo.** Na
  Verra ela está ativa só no programa de plástico; o VCS está em credenciamento.
  Hoje ela verifica a pegada (Emissão, ISO 14064-3), não a Remoção pelo padrão
  Verra. Isso muda o que o Paulo promete na venda.
- **O papel `auditor` existe, mas é global.** Somente leitura vale na plataforma
  inteira, não por projeto; um técnico convidado como auditor de outro projeto
  continuaria escrevendo. E o auditor ainda cria e cancela avaliação de
  Biodiversidade e pede URL de upload.
- **Bom sinal no código:** três funções decidem quem vê projeto, fazenda e cálculo
  em todos os módulos. Incluir "membro convidado" nelas libera a leitura sem mexer
  em cada tela.
- **Não há convite.** Hoje só o admin cria contas, com senha enviada no e-mail. O
  convite usa link com token (128 bits, 7 dias, uso único, preso ao e-mail); quem
  já tem conta só aceita.
- **O auditor pergunta "de onde veio este número?"**, não "o que falta
  preencher?". A tela nova é um **painel fazenda × módulo** e um **rastro do
  cálculo** (insumo → quantidade → fator → fonte → emissão). Hoje o fator fica
  guardado só em quatro fontes da LCA, sem versão e nem sempre com fonte.
- **Mercado:** Vanta, Drata e One Click LCA convidam por projeto, deixam o auditor
  comentar ou sinalizar e encerram o acesso ao fim da auditoria. O One Click trava
  o projeto ao enviar para verificação.
- **Antes de abrir para auditor**, corrigir o que ele vai achar: unidade de
  combustível ignorada, janela do RothC não gravada, delta BAU × projeto em dois
  jeitos, denominadores do Regenerativo e da Biodiversidade.

## Hipóteses de trabalho

Resultado depois das respostas: H1 e H4 derrubadas, H3 substituída, H2 e H5
confirmadas ([07](07-analise-respostas.md#hipóteses)).

- **H1 · v1 = convite + leitura + download.** Apontamentos e registro de
  verificação na v2.
- **H2 · Auditor vê só os oficiais.**
- **H3 · Acesso com data de fim**, revogável; na v2 termina ao registrar a
  verificação.
- **H4 · Só o admin do projeto convida.**
- **H5 · Projeto trava durante a auditoria** (liga com a H1 da feature 00 e a
  pergunta J5).

## Link do questionário

https://claude.ai/artifact/7s4VHQopQGkSDguVUgsYFR (respostas por pessoa na coleção `respostas`)
