# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [08-versao-final-1.md](08-versao-final-1.md).
Regras do cálculo oficial (CF-RN-n) em
[../00_calculo_final/07-versao-final-1.md](../00_calculo_final/07-versao-final-1.md).
Revisado em 02/10/2026 com as respostas do Paulo. Falta o Ruan.

A coluna "Pendência" indica a decisão de 06/10 que ainda pode mudar a task. Sem
pendência, a task pode começar quando a dependência do CF estiver pronta.

## Fase 1: rascunho (depende das fases 1 e 2 do CF)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Layout do PDF no Penpot | 2 páginas A4: resumo com blocos por módulo, escopo e mapa; detalhe por módulo; referências; rodapé; marca d'água de rascunho; selos autodeclarado e verificado | RN-04, RN-06, RN-08–10, estrutura | P-5, P-7 |
| PROD: Textos curtos por módulo | Rótulos, avisos de uma linha e referências de metodologia, em PT e EN; revisão do Paulo e dos especialistas (João, Day) | RN-25, RN-30, RN-31 | P-2 |
| FE: Rota de impressão do projeto | `/print/project/[id]`: layout A4 com `@page`, gráficos com tamanho fixo e sem animação, só módulos contratados, números oficiais agregados, sinal `window.__PRINT_READY` | RN-01–05, RN-20–29 | P-3, P-4 |
| FE: Gerar rascunho | Botão "Gerar PDF" (outline) no projeto; idioma; em andamento sai com marca d'água pelo `window.print()` da rota | RN-08, RN-13 | — |

## Fase 2: documento autodeclarado (depende da fase 3 do CF)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE/infra: Gotenberg ao lado da API | Container no compose e no deploy (ECR); limites de memória e timeout | — | — |
| BE: Documento emitido | Model com código, projeto, FK da foto da finalização, tipo (autodeclarado, verificado), status (válido, substituído), `replaced_by`, quem e quando. Arquivos por idioma com hash e chave S3. Compartilhado com a feature 03 | RN-09–12 | P-6 |
| BE: Endpoint de emissão | Valida estado do projeto e papel; reusa o documento se já existe para a foto e o tipo; token de uso único para a rota de impressão; chama o Gotenberg; salva PDF no S3; hash | RN-09, RN-11, RN-14 | P-1 |
| BE: Substituir documento ao reabrir | Reabertura (CF-RN-28) marca o documento válido como substituído; nova finalização liga `replaced_by` | RN-12 | P-6 |
| BE: Listar e baixar documentos | Por projeto; auditor baixa do projeto que verifica | RN-15 | — |
| FE: Rota de impressão lendo da foto | Mesma rota da fase 1, com dados da foto, código e selo no rodapé | RN-11 | — |
| FE: Documentos do projeto | Botão gera rascunho ou documento conforme o estado; progresso; toast com código; lista com código, tipo, idioma, data, quem gerou, status | RN-08–14 | P-1 |

## Fase 3: documento verificado (junto com a feature 03 e a fase 4 do CF)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Documento verificado | Gerar tipo verificado em projeto verificado, com verificadora e data da aprovação | RN-10 | — |
| FE: Página de verificação no PDF | QR, código curto, URL, logo da verificadora; selo "Verificado por" | RN-06, RN-10 | — |

## Dependências

- **00 cálculo oficial:** oficial e safra (fase 1), agregação por fazenda e projeto
  (fase 2), estados e foto (fase 3), verificação (fase 4).
- **03 QR code:** página pública e revogação leem o mesmo documento.
- **01 export:** mesma consulta dos dados, para Excel e PDF baterem.
- **05 consolidado:** o dashboard de projeto na tela usa a mesma agregação.

## Saiu desta versão

| Título antigo | Por quê |
|---|---|
| Rota `/print/project/[id]/[module]` e PDF por módulo | Paulo: só projeto completo (1) |
| Tabela por fazenda | LGPD e PDF de 2 páginas (P-5) |
| PDF/A-3b e assinatura ICP-Brasil | Não precisa (14). PDF/A volta se a verificadora pedir |
| Revogar documento | Feature 03 |
| Recomendações no Regenerativo e na Biodiversidade | Depois (M5) |
