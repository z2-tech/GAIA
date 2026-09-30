# 05 · Rascunho de tasks

Não criadas no Plane. "Depende de" aponta perguntas do
[questionário](04-questionario-produto.md).

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras do PDF | Tipos, estrutura, selo, alocação, regras de emissão e substituição | 1–15 |
| PROD: Textos de metodologia e avisos | Por módulo; revisão do Paulo e dos especialistas (João, Day) | 3, 5, 6 |
| PROD: Layout A4 no Penpot | Capa, páginas por módulo, tabela por fazenda, metodologia, verificação; rodapé; marca d'água de rascunho | 3, 4, 10 |
| BE: Documento emitido | Model com id aleatório, código curto, tipo, projeto, snapshot JSON (números, versões de método e fatores), hash do PDF, chave S3, emitido por/em, status (válido, substituído, revogado), `replaced_by`. **Compartilhado com a feature 03** | 12, 13 |
| BE/infra: Gotenberg ao lado da API | Container no compose e no deploy (ECR); limites de memória e timeout | — |
| BE: Endpoint de emissão | Cria o documento, gera token de uso único para a rota de impressão, chama o Gotenberg, salva PDF no S3, calcula hash; PDF/A-3b | 11, 13 |
| BE: Listar, baixar e revogar documentos | Por projeto | 12 |
| FE: Rotas de impressão | `/print/project/[id]` e `/print/project/[id]/[module]`: layout A4 com `@page`, gráficos com tamanho fixo e sem animação, dados do snapshot, sinal `window.__PRINT_READY` | layout |
| FE: Gerar PDF e aba Documentos | Botão com tipos, progresso, toast com código; lista com status e ações | layout |
| FE: Rascunho | Mesmo layout com marca d'água, sem QR, gerado sem registro | 11 |

## Dependências

- **00 cálculo oficial:** snapshot do que é impresso.
- **05 consolidado:** números do PDF do projeto.
- **03 QR code:** página pública que lê o documento emitido.
- **01 export:** mesma consulta de dados, para Excel e PDF baterem.

## Por módulo (ver 06-por-modulo.md)

| Título | O quê | Depende de |
|---|---|---|
| PROD: Textos de aviso por módulo | Remoção, Regenerativo, Biodiversidade (textos em ../modulos-referencia.md) | M2, M4 |
| FE: Páginas de Remoção no PDF | Números principais, gráfico BAU × projeto, entradas do modelo, tabela por talhão, aviso | M1, M2 |
| FE: Página do Regenerativo no PDF | Nota e faixa, 5 seções, pontos fortes e de atenção, contexto, % da área por faixa no projeto | M3, M4, M5 |
| FE: Página da Biodiversidade no PDF | Nota, classificação, 3 áreas, melhorias, respondidas | M5, M6 |
