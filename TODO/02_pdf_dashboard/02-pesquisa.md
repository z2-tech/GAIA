# 02 · Pesquisa

## O que um relatório de pegada precisa ter

- **ISO 14067:2018, cláusula 7** (https://www.iso.org/standard/71206.html):
  - Resultado em kgCO₂e por unidade declarada; contribuição por estágio (absoluta e
    %); **fóssil, biogênico e mudança de uso do solo (dLUC) separados**.
  - Relatório inclui: unidade, fronteira, fontes de dados, GEE e fatores de
    caracterização (GWP), cut-off, alocação, qualidade de dados, incerteza,
    tratamento da eletricidade, conclusões e limitações, exclusões, **período**.
  - Gráficos são opcionais. Compensação fica fora da pegada.
- **GHG Protocol Product Standard, cap. 13**
  (https://ghgprotocol.org/sites/default/files/standards/Product-Life-Cycle-Accounting-Reporting-Standard_041613.pdf):
  data e versão do inventário; fonte dos GWP; biogênico e LUC separados;
  **aviso sobre limitações de uso, incluindo comparação entre produtos**;
  declaração de verificação com nível e quem verificou.
- **PACT (WBCSD):** checklist de campos (id, versão anterior, status, período,
  unidade, com e sem remoção biogênica, LUC, GWP, alocação, % dado primário,
  verificação). https://wbcsd.github.io/tr/data-exchange-protocol/latest/

## Claims e greenwashing

- **ISO 14021 Amd 1:2021:** regras para "pegada de carbono" e "carbono neutro";
  proíbe termos vagos. https://www.iso.org/standard/81242.html
- **UE, diretiva EmpCo (2024/825), vigente desde 27/09/2026:** proíbe claims
  genéricos e "neutro" baseado em compensação.
  https://www.getsunhat.com/blog/green-claims-esg-data-empco-communication
- **CONAR, Anexo U (revisão out/2025):** veracidade, exatidão, pertinência, fontes
  acessíveis ao público (cita QR codes). Fonte primária não acessada.

## Exemplos

- **Declaração de verificação SGS (ISO 14067), 3 páginas:** nº da declaração,
  período, norma, resultado por unidade, validade de 2 anos, texto antifraude;
  depois escopo, fronteira, GWP (AR6), bases de dados, exclusões, nível de
  asseguração, materialidade.
  https://s22.q4cdn.com/133460125/files/doc_downloads/2025/10/HEYDUDE-SGS-Verified-PCFs.pdf
- Cool Farm Tool, Regrow, Agreena, Sustell: sem PDF público de exemplo.
- Embrapa Footprint PRO Carbono (soja, milho, algodão):
  https://www.embrapa.br/en/busca-de-publicacoes/-/publicacao/1162996/footprint-pro-carbono-a-calculadora-para-a-pegada-de-carbono-de-commodities-agricolas

## Integridade do documento

- **Diploma digital do MEC:** código de validação e QR; o validador aceita o QR, o
  código digitado ou o arquivo. https://portal.mec.gov.br/diplomadigital/?pagina=faq-sociedade
- Boas práticas: domínio próprio; status ao vivo (válido, substituído, revogado);
  correção gera novo documento e o antigo aponta para o novo.
- O PDF não consegue conter o próprio hash: o hash fica no servidor e a página
  pública pode comparar um arquivo enviado.
- **PDF/A-3b** para arquivo de longo prazo; permite anexar o JSON do snapshot.
- Assinatura **PAdES** com e-CNPJ ICP-Brasil: opcional, fase 2.
  https://www.etsi.org/deliver/etsi_en/319100_319199/31914201/01.02.01_60/en_31914201v010201p.pdf

## Tecnologia

- **Gotenberg** (Chromium em Docker): espera o render por expressão JS, gera
  PDF/A e PDF/UA. https://gotenberg.dev/docs/convert-with-chromium/convert-url-to-pdf
- **Playwright `page.pdf`:** PDF com tags e sumário. https://playwright.dev/docs/api/class-page
- **WeasyPrint:** PDF/A, mas não executa JS (gráficos Recharts não saem).
- **@react-pdf/renderer:** não suporta SVG aninhado; adaptador de gráficos não
  suporta Recharts v3. https://github.com/EvHaus/react-pdf-charts
- Custo típico de Chromium: 200–500 MB de RAM, 2–5 s por PDF (fonte de fornecedor,
  não verificado).
