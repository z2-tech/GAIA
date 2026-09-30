# 02 · Pesquisa

Levantado em 30/09/2026. "(não verificado)" = sem fonte primária.

## O que as plataformas mostram no QR

**Plataformas agrícolas de carbono: nenhuma tem página pública por resultado.**
A prova pública fica no registro de terceiros (Verra, Climate Action Reserve,
SustainCERT), não na plataforma.

| Plataforma | QR ou página pública? | O que existe |
|---|---|---|
| Regrow | Não | MRV B2B; metodologia verificada pela Climate Action Reserve. https://www.regrow.ag/post/verifying-and-certifying-ecosystem-outcomes |
| Cargill RegenConnect | Não (portal com login) | Roda sobre a Regrow; tem linha de algodão. Provável "CR" da reunião (não verificado). https://www.regrow.ag/case-studies/cargill |
| Agreena | Não | Prova via Verra (VM0042) e DNV. https://agreena.com/certifications/verra-verification-for-the-agreenacarbon-programme/ |
| Indigo Ag | Não | Projeto público no registro da CAR. https://www.indigoag.com/carbon-resources |
| Cool Farm Tool | Não | Avaliação privada, compartilhada por código. https://coolfarm.org/frequently-asked-questions/ |
| Sustell | Não | A plataforma é certificada pela DNV, não cada relatório. https://www.dsm-firmenich.com/anh/news/press-releases/2022/2022-03-08-sustell-receives-independent-iso-certification-by-dnv.html |

"Puma" e "Farm Tur": não identificados. A PUMA usa Better Cotton, sem QR de
rastreio até a fazenda (não verificado).

**Rastreabilidade e selos com página pública:**

- **SouABR (ABRAPA, algodão brasileiro):** QR na etiqueta mostra as fazendas ABR
  de origem e o caminho da fibra até o varejo; 578 mil peças, Renner, C&A,
  Reserva. É cadeia de custódia, não resultado ambiental. Campos exatos não
  verificados (site deu 403).
  https://abrapa.com.br/2025/11/28/souabr-consolida-expansao-da-rastreabilidade-do-algodao-brasileiro-e-aproxima-moda-industria-e-consumidor/
- **ClimatePartner:** o selo traz um ID único (número + QR). A página pública mostra
  pegada, metas, medidas de redução e projetos. Diz atender a EmpCo com
  verificação externa. **É o mais parecido com o caso GAIA.**
  https://www.climatepartner.com/en/take-action/communicate-transparently/climatepartner-certified-label
- **Carbon Trust:** diretório público de produtos com selo: valor em CO₂e, período,
  norma. https://label.carbontrust.com/
- **Farmer Connect "Thank My Farmer":** QR abre app com mapa, história do produtor,
  traders, projetos.
  https://www.prnewswire.com/news-releases/farmer-connect-uses-ibm-blockchain-to-bridge-the-gap-between-consumers-and-smallholder-coffee-farmers-300981149.html
- **Provenance:** selo "Verified" com check verde **só** com confirmação de
  terceiro. https://knowledge.provenance.org/how-do-i-have-a-proof-point-verified-by-provenance
- **FSC e Verra:** busca pública com código, titular, status (válido, suspenso,
  encerrado / ativo, aposentado, cancelado). https://search.fsc.org/ ·
  https://registry.verra.org/app/search/VCS/All%20Projects
- **Passaporte Digital de Produto (UE, ESPR 2024/1781):** QR liga o produto a um
  URI único; acesso por perfil (consumidor, reparador, autoridade). Têxteis entram
  em 2027. https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en

**Padrão que se repete:** ID único, status explícito, consulta no domínio de quem
emite, link para o verificador independente quando há.

## Validação de documento

- **Diploma digital:** código de validação, link e QR levam à página da
  instituição. Válido: dados do registro, status, histórico, download. **Suspenso
  ou revogado: só status e histórico, sem os dados.**
  https://conhecimento.sti.ufpb.br/books/diploma-digital/page/validacao-do-diploma-digital
- **Validador do MEC:** aceita o XML, mas só checa a estrutura, não o conteúdo.
  https://verificadordiplomadigital.mec.gov.br/diploma
- **ITI VALIDAR:** aceita PDF assinado ou QR + código; responde Aprovado,
  Reprovado ou Indeterminado. É o que detecta alteração no arquivo.
  https://validar.iti.gov.br/
- **Receita Federal (certidão):** tipo, CNPJ, código de controle, data e hora;
  responde se é autêntica. Sem upload.
  https://receita.economia.gov.br/orientacao/tributaria/certidoes-e-situacao-fiscal/confirmar-autenticidade-de-certidao

Conclusão: página só com status prova que o documento **existe**, não que o PDF
na mão **não foi alterado**. Para isso, hash (conferência do arquivo) ou
assinatura PAdES (fase 2, já anotada na feature 02).

## Segurança da URL pública

- **Entropia:** OWASP pede no mínimo 64 bits de um gerador criptográfico.
  https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
  Proposta Z2: 80 bits (16 caracteres base32), mesmo código no QR e para digitar,
  com limite de requisições.
- **noindex:** meta `robots` ou header `X-Robots-Tag` (vale também para o PDF).
  https://developers.google.com/search/docs/crawling-indexing/block-indexing
- **Revogado:** só status e data, como o diploma.

## Privacidade (LGPD)

- Dado pessoal = informação sobre pessoa identificada ou identificável (art. 5º,
  I): nome e CPF do produtor pessoa física, e a localização se permitir
  identificar a pessoa.
  https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- A consulta pública do CAR mostra o polígono do imóvel e esconde nome e CPF
  (ocultação não verificada em fonte primária). https://consulta.car.gov.br/
- Risco: polígono na página da GAIA + CAR = produtor reidentificado (não
  verificado). Por isso o padrão proposto é município, UF, área e safra; polígono
  e nome da fazenda só com escolha do emissor.

## Claims na página (consumidor)

- **UE, EmpCo 2024/825 (desde 27/09/2026):** proíbe claim genérico ("verde",
  "eco"), "neutro" por compensação e **selo próprio sem certificação de terceiro**.
  https://eur-lex.europa.eu/eli/dir/2024/825/oj/eng (resumo via
  https://diretivas.eu/2024-825/en/; texto literal não verificado)
- **CONAR Anexo U** (revisão 24/10/2025, Código 2026):
  https://conar.wpenginepowered.com/wp-content/uploads/2026/08/Codigo_CONAR_2026.pdf
  - 1.3: acesso facilitado a informação verificável, **cita QR code e site**.
  - 2: claim genérico sem qualificação induz a erro.
  - 7: **proíbe recurso gráfico que sugira certificação de terceiro inexistente.**
  - 9.1: claim climático informa a base, o tipo (redução, remoção, compensação) e a
    etapa do ciclo de vida.

Consequências para a página:

- O veredito diz "Documento emitido pela GAIA", não "Verificado" nem "Certificado".
  Nada de selo ou check que pareça certificação enquanto não houver verificação
  externa.
- Emissão sempre com a fronteira ("do berço à porteira da fazenda").
- Remoção rotulada como remoção modelada, nunca como compensação.
