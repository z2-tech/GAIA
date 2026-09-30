# 02 · Pesquisa

## Docs do projeto

**O "ambiente de verificação" citado pelo Paulo não está registrado.** Busca em
atas (05, 06, 07, 14 e 21/08), vault e tasks não achou essa conversa. Foi em call
não transcrita ou WhatsApp. Vale perguntar o que foi dito (questionário).

O que já existe e ajuda:

- **Precedente de "oficial":** `be-03-regenerativo-lista.md:13-16` ("no máximo 1
  primário ativo"), `be-04`: cancelar reatribui o primário, clone nasce não
  primário. `fe-28-fechamento-frontend-mvp.md:181`: "consumir `is_primary` para
  destacar o assessment oficial" (não feito).
- **Decisão D0** (`be-18-fechamento-backend-mvp.md:91-95`): permitir múltiplos,
  `latest` = não cancelado mais recente, "concluído é resultado versionado",
  cancelamento é soft-delete, clone fora do MVP.
- **Snapshot já é intenção declarada:** `CONTEXT.md:11-13` ("fields are
  snapshotted at save; concluded results keep their version"),
  `docs/vault/concepts/Sustainability-Metrics.md:27-28` (fatores "server-owned e
  versionados"), `be-18:169` ("versionar método/FE e preservar baseline"). O código
  não cumpre isso (ver [01](01-entendimento.md)).
- **Status "em auditoria"** existe no design (`components.md:68`,
  `screens.md:196`), não na API.
- **Safra:** só `harvest_year` na LCA (`gaia-api/docs/lca-frontend-guide.md:81`).
  RothC: até três safras por janela, BAU e projeto no mesmo intervalo
  (`07-08-26.pdf:123-142`). Horizonte de projeção do RothC ainda aberto
  (`be-18:146`).
- **Comparação:** `be-12-comparacao.md:92` deixou aberto "`latest` vs média".
  A comparação de remoção usa só o cenário do projeto
  (`docs/agents/design/screens.md:350`).
- **Conflito de docs:** `be-18:91` diz que talhão "não é unidade de assessment";
  `be-06` e a nota de 21/08 usam `plot` no modelo. A feature pede oficial **por
  talhão**, então isso precisa ficar resolvido.
- `CONTEXT.md` não define projeto, fazenda, talhão, cultura, módulo nem cálculo.
  Vale adicionar Oficial e Simulação quando decidido.

## Mercado e normas

Fontes verificadas por busca em 30/09/2026. Itens marcados "não verificado" não
tinham documentação pública.

### Ferramentas

- **Cool Farm Tool:** a avaliação é o registro principal; "save as" duplica e
  "compare" cria cenários what-if a partir dela; compartilhamento com a cadeia por
  "share code". Mudou metodologia por release (IPCC 2019, AR6 em 2022). Travamento
  e versão de avaliações antigas: não verificado.
  https://coolfarm.org/frequently-asked-questions/ ·
  https://coolfarm.org/cool-farm-tool-updates-to-the-2019-ipcc-guidelines-for-greenhouse-gas-inventories/
- **Regrow:** baseline é contrafactual (o que teria acontecido sem mudar prática);
  resultado = delta contra o ano real. Período histórico fixo.
  https://help.regrow.ag/baseline-method-descriptions
- **Agreena:** dados enviados ao fim de cada safra, verificação anual por
  terceiro antes de emitir certificado. https://agreena.com/ro-ro/news/agreenacarbon-programme-how-to/
- **Soil Capital:** baseline = safra mais recente. https://www.soilcapital.com/faq
- **Embrapa Soja/Milho Baixo Carbono:** unidade é intensidade por tonelada, **por
  safra**. https://www.embrapa.br/milho-baixo-carbono
- **Imaflora Carbon on Track Agro:** separa mensuração de verificação em campo.
  https://imaflora.org/servicos/carbo-on-track/carbon-on-track-agro
- **Control Union:** verifica pegada ISO 14067 até a porteira. Requisitos para
  dados de plataforma: não verificado. Perguntar ao Paulo.

### Normas

- **ISO 14067 (pegada de produto):** período declarado e justificado; dados
  primários representam 12 meses ou **a safra** para produto sazonal; comparar
  períodos exige metodologia consistente.
  https://greencalculus.com/standards/iso-14067-product-carbon-footprint/
- **GHG Protocol Land Sector and Removals** (publicado 30/01/2026, vigente em
  01/01/2027): remoções reportadas **separadas** das emissões; monitoramento
  contínuo, senão vira reversão; ano-base recalculado por mudança de método,
  fator ou erro acima de um limite de significância divulgado.
  https://ghgprotocol.org/blog/land-sector-and-removals-standard-what-you-need-know
- **Verra VM0042 v2.2:** baseline e projeto com a **mesma versão de modelo e
  parâmetros**; resultados por ano (vintage); recalibrar roda tudo de novo, mas
  **o que já foi verificado não muda**.
  https://verra.org/methodologies/vm0042-improved-agricultural-land-management-v2-2/
- **ISO 14064-3:** verificação com asseguração razoável ou limitada, materialidade
  típica 5%. Fonte secundária (texto ISO é pago).
- **SBTi FLAG:** ano-base, remoções separadas, recálculo em mudança significativa.
  https://files.sciencebasedtargets.org/production/files/FLAG-FAQ.pdf

### Padrões de produto (SaaS B2B)

- **Anaplan:** a versão "Actual" existe sempre e não se apaga; forecast e
  cenários são versões à parte comparadas contra ela.
  https://help.anaplan.com/versions-19b4391f-5257-40ee-8dfb-36f0ab426c8f
- **Persefoni:** "lock" ao finalizar relatório, log de alterações, restatement
  guarda o histórico. https://www.persefoni.com/blog/best-carbon-accounting-software
- Padrão comum: um registro oficial por período, cenários derivados dele, estado
  travado, correção = nova versão que substitui (nunca editar por cima).

## O que isso implica para o GAIA

1. **Oficial precisa de período.** Sem safra, não há pegada de produto válida nem
   histórico ano a ano. Regra provável: no máximo um oficial por talhão × módulo ×
   safra.
2. **Oficial precisa ser uma cópia congelada:** inputs, resultado, versão dos
   fatores, GWP, parâmetros do RothC, clima usado. O QR aponta para essa cópia, não
   para o cálculo vivo.
3. **Ciclo de vida provável:** Simulação → Oficial (editável) → Em verificação
   (travado) → Verificado (imutável) → Substituído (nova versão com motivo).
4. **Simulação nasce do oficial** (duplicar e mudar prática), com os mesmos
   fatores, para o delta fazer sentido.
5. **Remoção (RothC):** o que se declara é a variação de estoque no período, não a
   projeção longa. O "+5 anos" do Paulo seria anexo informativo. Emissões e
   remoções aparecem separadas.
6. **Auditor precisa de trilha:** quem marcou, quando, o que mudou.
