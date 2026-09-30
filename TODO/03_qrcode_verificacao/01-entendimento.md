# 01 · Entendimento

## O pedido

- 29/09 [31:04]: "se o cara escaneia, vai pro site da GAIA e consegue ver que de
  fato aquele resultado foi gerado dentro da plataforma".
- 29/09 [31:52]: a empresa imprime o QR e prega no **lote** (algodão, milho). Quem
  escaneia vê "a pegada de carbono, qual foi o score regenerativo".
- 29/09 [33:00]: **público**. "Se o cara prega isso num pacote de algodão, ele quer
  que seja público. Senão ele não imprime e não prega."
- 29/09 [35:08–35:20]: escopo **fazenda**, não cadeia. Ruan: "o principal ponto do
  QR code é validar que o dado veio de um site real, que não foi manipulado", como
  o QR de documento de universidade.
- 29/09 [37:44–38:20]: conteúdo = "dashboard bem simplificado", "a fazenda, aquele
  mapinha da fazenda"; no projeto, "uma média das fazendas".
- 29/09 [46:28]: nada de conta para o público externo.
- 29/09 [47:56]: "o QR code ligado a um domínio GAIA, pro cara falar: esse dado saiu
  de dentro dessa plataforma".
- 29/09 [48:56]: se contratou todos os módulos, um resumo de cada.
- Pendência do cliente: dizer o que a página mostra e mandar a lista de
  plataformas de referência ("Puma", "CR", "Farm…", nomes incertos na legenda).

Dois usos diferentes na mesma frase:

| Uso | Quem escaneia | O que quer saber |
|---|---|---|
| **Conferir o PDF** | Comprador, trader, Control Union | "Este PDF é autêntico? Os números batem com o que a GAIA emitiu?" |
| **QR no lote** | Qualquer pessoa, até consumidor | "De onde vem isso e qual a pegada?" Não conhece a GAIA ([33:28]) |

## O que existe

Caminhos: `A` = `gaia-api`, `W` = `gaia-web/src`.

- **Nenhuma rota pública de dados.** DRF exige login em tudo
  (`A/gaia/settings.py:131`, `IsAuthenticated` padrão). `AllowAny` só em
  `A/core/views.py` e `A/authx/authn/views.py` (health e login).
- **Sem throttle** configurado no DRF. Uma rota pública nasceria sem limite de
  requisições.
- **No Next, rota pública = rota de login.** `W/proxy.ts` tem
  `PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"]` e
  **redireciona quem está logado** para `/projects`. Pôr `/v` nessa lista faria o
  usuário logado nunca ver a página. Precisa de uma segunda lista, sem esse
  redirecionamento.
- Layout privado com menu (`W/app/(private)/layout.tsx`); a página pública precisa
  de layout próprio.
- **`Project.id` e `Farm.id` são inteiros sequenciais** (`AutoField`). A URL não
  pode usar esses ids.
- **Módulos contratados já existem:** `Project.modules` (M2M,
  `A/projects/models.py:39`). Serve para "mostrar só o que foi contratado".
- **Mapa:** `Farm.boundary_geometry` (GeoJSON do perímetro),
  `Farm.kml_photo` (chave S3 de uma foto do mapa), `Plot.geometry`,
  `Farm.latitude/longitude`, `city_name`, `state`. Leaflet está instalado, mas é
  client-side e usa tiles externos.
- **Nenhuma lib de QR** na API nem na web.
- **Domínios:** `dev.gaiametrics.com.br`, `hom.gaiametrics.com.br`,
  `api-dev.gaiametrics.com.br` (`A/gaia/settings.py:34-63`). Domínio de produção
  não aparece no código.
- Nada de `robots`/`noindex` no app.

## Dependências

| Feature | Por quê | Sem ela |
|---|---|---|
| 02 PDF | O QR nasce do **documento emitido** (registro com snapshot, hash, status). Mesmo model | Não há o que verificar |
| 00 cálculo oficial | Só o oficial vai para a página | Página mostraria simulação |
| 05 consolidado | Números do projeto ("média das fazendas", ponderada) | Só dá página de talhão |
| 04 auditor | Selo "Verificado por Control Union em dd/mm" | Página só diz "Autodeclarado" |

## Decisões técnicas (Z2)

- **A página lê o snapshot do documento, nunca o dado atual.** Se ler o dado ao
  vivo, o PDF e a página divergem no primeiro recálculo, e a prova some. Isso vale
  também para o mapa: a imagem é guardada na emissão.
- **Token aleatório por documento**, não id. 16 caracteres base32 (80 bits),
  mostrado em grupos (`7K3F-92QD-M4XA-TR8P`). O mesmo código vai no QR e serve
  para digitar. Com limite de requisições, não dá para adivinhar.
- **URL curta**, porque URL longa deixa o QR denso e ruim de ler em etiqueta
  pequena: `https://<domínio>/v/7K3F92QDM4XATR8P`.
- **API:** view pública só de leitura, `AllowAny`, sem autenticação (um cookie
  vencido não pode derrubar a página), com throttle anônimo. Devolve só o snapshot
  e o status.
- **Web:** rota `(public)/v/[token]` renderizada no servidor (abre rápido no
  celular, sem esperar JS), `noindex`, layout próprio, fora do redirecionamento do
  `proxy.ts`. `/v` sem token = campo para digitar o código.
- **Conferência do arquivo:** o PDF não carrega o próprio hash. O servidor guarda o
  SHA-256; a página aceita o PDF, calcula o hash no navegador (Web Crypto) e
  compara. Nada é enviado.
- **QR:** gerado na rota de impressão do PDF e na aba Documentos (para baixar PNG/
  SVG de etiqueta). Uma lib na web (`qrcode`) basta.

## Riscos

- **Privacidade (LGPD):** nome do produtor é dado pessoal; o polígono da fazenda
  mostra onde ela fica exatamente. Na página pública isso fica aberto para
  qualquer um.
- **Claim em produto:** página no lote é comunicação ao consumidor. Na UE, a
  diretiva EmpCo vale desde 27/09/2026. Remoção lida como "compensa a pegada" ou
  Regenerativo lido como "certificado" vira problema do cliente.
- **Etiqueta impressa não muda.** Se o documento for substituído ou revogado, os
  QRs já colados continuam apontando para ele. A página precisa dizer isso com
  clareza, sem quebrar.
- **Imagem do mapa no S3:** URL pré-assinada expira. A imagem do snapshot precisa
  de caminho próprio servido pela API ou de cópia pública.
- **Scraping:** página pública pode ser copiada. A garantia é a origem no domínio
  GAIA, não sigilo.
