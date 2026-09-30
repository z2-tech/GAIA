# 01 · Entendimento

## O pedido

- 29/09 [27:48]: "baixar só em PDF o dashboard, de preferência com um QR code no fim".
- 29/09 [31:04]: "por projeto, por módulo, em formato PDF".
- 29/09 [47:20]: "baixar o dash em PDF. Quero ter no meu computador".
- 14/08: Paulo pediu, na comparação, "para imprimir e aquilo sai para mim um
  arquivo PDF". Resposta "Os gerar PDF estão ligados já" = anotado. Nunca foi feito.
- 06/08: ideia de "exportação de relatório" guardada no S3 para baixar depois.

## O que existe

Caminhos: `A` = `gaia-api`, `W` = `gaia-web/src`.

- **Nenhum PDF, impressão ou CSS de impressão** no código. Única lib útil:
  `html-to-image`, usada para fotografar o mapa (`W/features/project/lib/kml-photo-upload.ts`).
- **Dashboards só por talhão/cálculo**, todos client-side (`"use client"` + React
  Query):
  - Emissão: `W/features/carbon-emission/result/lca-result.tsx`, abas por produto,
    Recharts `BarChart`.
  - Remoção: `W/features/carbon-removal/calculation/components/calculation-page-content.tsx`,
    `LineChart` em `ResponsiveContainer` sem altura (`comparison-chart.tsx:106`).
  - Regenerativo: `W/features/regenerative/dashboard/`, SVG próprio.
  - Biodiversidade: sem dashboard.
- **Não há dashboard de projeto nem de fazenda** (ver feature 05).
- Animações do Recharts ligadas (nenhum `isAnimationActive={false}`).
- Layout com `body h-dvh overflow-hidden` (`W/app/layout.tsx:47`): `window.print()`
  sairia cortado.
- Fontes: Atyp Display (local) e Geist Mono. Só tema claro. i18n por cookie.
- Marca: `W/../public/logo-completa-azul.svg` e variações; `--primary #0d6afe`,
  `--green-600 #24b25f`.

## Infra que pesa na decisão

| Peça | Hoje | Consequência |
|---|---|---|
| Web | AWS Amplify (`gaia-web/amplify.yml`) | Sem Chromium no servidor da web |
| API | Docker `python:3.11-slim`, gunicorn 2 workers × 2 threads, imagem no ECR | Dá para adicionar um container ao lado; PDF pesado síncrono trava a API |
| Fila | Nenhuma (sem Celery/RQ) | Gerar síncrono com timeout; fila só se precisar |
| Arquivos | S3 via boto3 (`A/uploads/services.py`) | Guardar o PDF emitido já é possível |
| Auth | JWT em cookie legível por JS | Renderizador no servidor precisa de token próprio de uso único |
| Foto do mapa | `Farm.kml_photo` (`A/farms/models.py:52`) | Serve para capa do PDF e página do QR |

## Opções técnicas

| Opção | Como | Prós | Contras |
|---|---|---|---|
| A. `window.print()` + CSS `@media print` | Rota de impressão no Next | Zero dependência; texto vetorial | Diálogo do navegador; sem registro nem hash no servidor; não serve para QR |
| B. `html-to-image` + lib de PDF no navegador | Foto da tela | Rápido de fazer | PDF vira imagem, sem texto; sem integridade |
| **C. Gotenberg (Chromium) ao lado da API** | Django chama Gotenberg, que abre `/print/...` com token de uso único e espera `window.__PRINT_READY` | Reaproveita os componentes e gráficos; PDF/A e PDF/UA; Django guarda arquivo, hash e snapshot | Container de ~300 MB+; 2–5 s por PDF; componentes precisam de tamanho fixo e sem animação |
| D. Python puro (ReportLab / WeasyPrint) | Números do banco, gráficos redesenhados | Sem browser; ideal para dados | Gráficos duplicados; WeasyPrint não roda JS e precisa de Cairo/Pango |

**Recomendação: C.** Fiel ao que o usuário vê, e o servidor controla o documento,
o que a feature 03 (QR) exige.

## Dependências

| Feature | Por quê | Sem ela |
|---|---|---|
| 00 cálculo oficial | O PDF mostra o oficial congelado | PDF muda se alguém recalcular |
| 05 consolidado | PDF do projeto = consolidado do projeto | Só dá PDF de talhão |
| 03 QR code | Mesmo registro de documento | PDF sem prova de origem |
| 01 export | Mesma consulta de dados | Números podem divergir entre Excel e PDF |

## Riscos

- Gráfico com `ResponsiveContainer` sem altura sai vazio no render headless.
- Estado de tela (aba de produto na Emissão, período na Remoção) precisa virar
  parâmetro do PDF.
- Unidade de combustível ignorada no cálculo (feature 01): o PDF publicaria o erro.
- Gerar PDF síncrono com 2 workers pode travar a API em uso simultâneo.
