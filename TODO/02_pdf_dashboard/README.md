# 02 · PDF do dashboard

Feature 2 do [escopo de 29/09/2026](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md):
dashboard **por projeto e por módulo** em PDF, com o QR code (feature 03) no fim.

Estado: **discovery**. Nada criado no Plane.

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O pedido, o que existe (nada), infra, dependências, opções técnicas |
| [02-pesquisa.md](02-pesquisa.md) | O que um relatório de pegada precisa ter (ISO 14067, GHG Protocol, claims) e integridade de documento |
| [03-analise-produto.md](03-analise-produto.md) | Estrutura proposta dos PDFs, página a página, e o fluxo de emissão |
| [04-questionario-produto.md](04-questionario-produto.md) | Perguntas curtas de confirmação para Paulo e Ruan |
| [questionario.html](questionario.html) | Mesmas perguntas em página interativa (link abaixo) |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis |
| [06-por-modulo.md](06-por-modulo.md) | Páginas de Remoção, Regenerativo e Biodiversidade, com os avisos de cada um |

## Em uma página

- **Todos os módulos:** as normas de pegada valem só para a Emissão. Remoção tem
  aviso próprio ("estimativa modelada, não é crédito"), Regenerativo é "índice
  interno, não certificação" e Biodiversidade "não mede espécies". Ver
  [06](06-por-modulo.md) e [referência dos módulos](../modulos-referencia.md).
- **O pedido parece simples, mas o PDF é a ponta de três outras features:**
  - **00 cálculo oficial:** o PDF mostra o oficial, congelado. Sem snapshot, o PDF
    de hoje não bate com a tela de amanhã.
  - **05 consolidado:** **não existe dashboard de projeto** hoje, só de talhão. "PDF
    do projeto" pressupõe o consolidado.
  - **03 QR code:** o QR aponta para um registro do documento emitido; o PDF e o QR
    nascem do mesmo registro.
- **Nada de PDF existe no código.** A frase "Os gerar PDF estão ligados já" (reunião
  de 14/08) queria dizer "anotado", não implementado.
- **Conteúdo não é só "print da tela".** Para ir a comprador e verificador, a
  pegada precisa seguir a ISO 14067 (unidade, período, fronteira, alocação, GWP,
  fóssil, biogênico e mudança de uso do solo separados) e o GHG Protocol exige um
  aviso de limitações. Remoção vai em seção própria e **não é crédito de carbono**.
  Desde 27/09/2026 a UE proíbe claims genéricos ("neutro", "verde") em produto
  (diretiva EmpCo), o que afeta clientes como a Nestlé.
- **Selo de status em todo PDF:** "Autodeclarado, não verificado por terceira
  parte" até a Control Union verificar.
- **Decisão técnica (Z2):** a web roda no AWS Amplify, que não comporta navegador
  headless; a API não tem fila. Proposta: **Gotenberg** (container com Chromium)
  ao lado da API, renderizando uma rota `/print/...` do próprio Next. Reaproveita
  os gráficos, gera PDF/A, e o Django guarda arquivo, hash e snapshot no S3.

## Hipóteses de trabalho

- **H1 · Dois formatos:** PDF do projeto (resumo + um capítulo por módulo) e PDF de
  um módulo do projeto. PDF de talhão só se o produto pedir.
- **H2 · Documento emitido:** cada PDF gerado vira um registro com código, data,
  quem emitiu, snapshot dos números, hash e status (válido, substituído,
  revogado). Gerar de novo cria outro documento; o antigo fica "substituído".
- **H3 · Só projeto finalizado emite PDF "oficial"** (com QR). Antes disso, PDF de
  rascunho com marca d'água, sem QR (liga com a pergunta 18 da feature 0).

## Link do questionário

https://claude.ai/artifact/5djHacLZTFyT3VqW4MM1qz (respostas por pessoa na coleção `respostas`)
