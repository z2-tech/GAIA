# Áudios 21/08/2026 — comparação, permissões e pousio

## Fontes e confiança

Transcrição local com Whisper `large-v3-turbo`, normalizada para pontuação e
termos já usados pelo GAIA. Trechos incertos permanecem marcados; não foram
completados por inferência.

| Horário | Arquivo | Duração |
|---|---|---:|
| 08:16:21 | `WhatsApp Ptt 2026-08-21 at 08.16.21.ogg` | 42 s |
| 08:17:00 | `WhatsApp Ptt 2026-08-21 at 08.17.00.ogg` | 37 s |
| 08:17:06 | `WhatsApp Ptt 2026-08-21 at 08.17.06.ogg` | 5 s |
| 08:17:43 | `WhatsApp Ptt 2026-08-21 at 08.17.43.ogg` | 32 s |
| 08:20:51 | `WhatsApp Ptt 2026-08-21 at 08.20.51.ogg` | 40 s |
| 08:39:19 | `WhatsApp Ptt 2026-08-21 at 08.39.19.ogg` | 19 s |

Informação textual enviada com o último áudio:

> Tem que adicionar a opção pousio no DMR em Remoção.

O produto e o código usam **DPM/RPM**; portanto, `DMR` foi tratado abaixo como
provável referência a DPM/RPM, ainda sujeita a confirmação terminológica.

Estas falas são fonte de contexto e intenção de produto. Não substituem fonte
científica ou critério de aceite aprovado.

## Transcrição cronológica normalizada

### 08:16:21

> Mano, é bem simples, pelo que eu entendi. Todos os módulos têm um gráfico no
> final, aí é só comparar um com o outro. Eu estou na Remoção do talhão 1: posso
> comparar com a Remoção 2 do talhão 1, com outra Remoção de outro talhão da
> mesma fazenda ou com outra Remoção de outro talhão de outra fazenda. Tudo que
> é um cálculo completo de Remoção pode ser comparado com qualquer cálculo
> completo de Remoção, de qualquer talhão, de qualquer fazenda. A mesma coisa
> para Emissão e para Regenerativo.

### 08:17:00

> Acho que é simples. É mais de um: posso comparar um, dois, três, até vários.
> Acho que o design vai ser o que mais vai pegar. Minha ideia é, na resposta,
> onde estão aqueles gráficos, ter um campo para selecionar qualquer talhão a
> que o usuário tenha acesso. No backend, são os cálculos que já existem: eu
> mando mais de um ID e você retorna. Também precisa conseguir encontrar os
> talhões e os cálculos de cada talhão a que o usuário tem acesso.

### 08:17:06

> [Trecho inicial indistinto.] Fiquei confuso. Deu para entender?

Não foi extraído requisito desta fala.

### 08:17:43

> Uma coisa que precisa ser vista, e que acho mais urgente, são as permissões.
> Não sei se foi em dev ou homolog, mas o Juan estava como administrador e a
> minha conta também. Eu não conseguia ver os projetos que ele tinha criado e
> ele não conseguia ver os que eu tinha criado. Quando crio um projeto,
> seleciono o administrador do projeto; ele deveria ser administrador só
> daquele projeto. Já o usuário com papel de admin deveria conseguir ver tudo.

### 08:20:51

> Quando vejo um resultado, por exemplo de Carbono Emissão, envio o talhão e o
> ID daquele cálculo ou formulário. Posso preencher o mesmo formulário várias
> vezes. Para comparar, preciso enviar os IDs dos outros formulários dos outros
> talhões. Então precisa de uma listagem: seleciono a fazenda, aparecem os
> talhões; seleciono o talhão, aparecem todos os cálculos daquele módulo.

### 08:39:19

> Show de bola. Entrei no planner e está colocado “definir fórmula de pousio no
> cálculo”. Na verdade, quando está em pousio, a entrada de biomassa é igual a
> zero, porque não tem nada. Então a gente considera igual a zero.

## Requisitos extraídos

### Comparação

- A unidade comparada é uma **execução concluída de assessment/cálculo**, não a
  fazenda ou o projeto agregado.
- A comparação ocorre dentro do mesmo módulo: Emissão com Emissão, Remoção com
  Remoção e Regenerativo com Regenerativo.
- Devem ser elegíveis execuções do mesmo talhão, de talhões diferentes da mesma
  fazenda e de talhões de fazendas diferentes, sempre dentro do acesso do usuário.
- O fluxo de descoberta sugerido é `fazenda -> talhão -> execuções do módulo`.
- Deve ser possível selecionar mais de duas execuções. A fala não estabelece um
  limite operacional ou visual.
- A experiência parte dos gráficos de resultado já existentes.

### Permissões

- A correção de visibilidade é mais urgente que a comparação.
- **Admin global** é o papel da conta e deve enxergar todos os projetos.
- **Administrador do projeto** é o usuário selecionado no cadastro do projeto e
  administra somente os projetos aos quais foi atribuído, salvo se também tiver
  papel global de admin.

### Pousio no RothC

- Deve existir uma opção explícita `Pousio` no campo referido como DMR, provavelmente
  o seletor DPM/RPM de Carbono Remoção.
- Pousio implica entrada de biomassa igual a zero e nenhuma cultura ativa.
- A cobertura do solo continua sendo uma entrada explícita e independente.

## Reconciliação com o estado atual

| Tema | Estado atual | Consequência |
|---|---|---|
| Comparação | Não existe endpoint ou tela de comparação entre execuções. Os resultados atuais recebem um único assessment; por exemplo, `gaia-web/src/features/carbon-emission/result/components/emission-charts.tsx:19-23` recebe um único conjunto `data`. | Há trabalho de produto, design e Web. Um backend novo só é necessário se as APIs individuais não sustentarem o fluxo ou o volume aprovado. |
| Escopo documentado da comparação | [BE-12](../../../tasks/api/active/be-12-comparacao.md), [FE-08](../../../tasks/web/active/fe-08-comparacao.md) e [SHARED-04](../../../tasks/shared/shared-04-design-comparacao.md) propõem fazendas/projetos agregados, radar, veredito e seleção de 2–4 entidades. | O contrato atual conflita com os áudios e não deve ser implementado sem rebrief. A proposta agregada pode sobreviver como evolução separada. |
| Vínculo a talhão | `RothcCalculation` e `RegenerativeAssessment` mantêm `ProjectFarm` e um `plot` anulável (`gaia-api/rothc/models.py:40-61`, `gaia-api/regenerative/models.py:62-78`). LCA mantém `project_farm_id` e `plot_id` em `LcaProjectCulture` (`gaia-api/lca/models.py:170-174`). Listagens dos módulos já aceitam filtro por talhão. | A migração para talhão está funcionalmente avançada, mas dados legados ainda podem não possuir `plot_id`; a elegibilidade da comparação deve tratar isso explicitamente. |
| Descoberta de execuções | RothC lista cálculos por projeto/fazenda e opcionalmente por talhão em `RothcSelectors.list_calculations_by_project_farm` e retorna IDs/metadados em `RothcService.list_calculations`. Regenerativo tem filtro equivalente. LCA exige/expõe `plot_id` no fluxo atual. | O fluxo cascata pode começar reutilizando as APIs existentes. Não há evidência de necessidade imediata de endpoint batch ou agregador. |
| Admin global | `HasRole("admin")` usa `user_has_role_name`, que reconhece `Membership.role`. Porém, `is_admin_user` significa apenas `is_staff`/`is_superuser` (`gaia-api/authx/authz/permissions.py:9-15,66-85`), e `ProjectSelectors._user_accessible_project_qs` só concede escopo global por essa função (`gaia-api/projects/selectors.py:17-28`). | Uma conta com role `admin`, mas sem flags Django, passa pelo endpoint e recebe somente projetos vinculados. Isso reproduz o relato dos áudios. |
| Testes de permissão | `gaia-api/projects/tests/test_access_control.py:54-67` exige que o role `admin` permaneça escopado; somente staff/superuser veem tudo em `:113-130`. | O comportamento divergente está codificado, não é apenas falha visual. [BE-15](../../../tasks/api/active/be-15-permissao-visualizacao.md) precisa ser tratado como correção de contrato e testes. |
| Pousio inferido | A regra já está no [vault](../../../vault/concepts/Sustainability-Metrics.md) e no concluído [BE-19](../../../tasks/api/active/be-19-rothc-ciclos-cultura.md). `_build_annual_monthly` gera biomassa zero e nenhuma cultura fora dos ciclos; `test_fallow_outside_cycles_zero_biomass_no_crop` cobre isso. O Web destaca `monthWithoutCrop`. | Não é necessário redefinir a fórmula. Falta representar `Pousio` explicitamente no contrato e na interface, se essa for mesmo a intenção de DMR. |
| Pousio no DPM/RPM | `DpmRpm`, o schema gerado, o schema do formulário e as traduções PT/EN têm seis opções e não incluem `FALLOW`. `calculate_dpm_rpm_split` retorna DPM=RPM=0 quando a entrada de carbono é zero (`gaia-api/rothc/calculations/pools.py:28-39`). | A razão DPM/RPM não altera o resultado quando a entrada é zero, mas o fluxo atual resolve uma razão antes do split. Uma opção explícita exige invariante próprio; não se deve inventar uma razão científica para pousio. |

## Atividades priorizadas

### P0 — Corrigir o contrato de admin global

Card existente: [BE-15](../../../tasks/api/active/be-15-permissao-visualizacao.md).

1. Separar no domínio e nos testes o role global `admin` do campo `Project.admin`.
2. Fazer o role global ativo enxergar projetos e fazendas de todos os usuários.
3. Manter o administrador de projeto sem role global restrito aos seus vínculos.
4. Preservar os escopos vigentes de manager, technician e auditor até decisão
   específica de tenant.
5. Cobrir listagem e detalhe com duas contas de role `admin`, além do caso de
   administrador apenas do projeto.
6. Verificar roles, flags e versão implantada em dev/homolog antes e depois da correção.

### P1 — Rebrief do design de comparação

Card existente: [SHARED-04](../../../tasks/shared/shared-04-design-comparacao.md).

1. Desenhar a comparação a partir da tela de resultado de um módulo.
2. Definir o seletor `fazenda -> talhão -> execução`, com rótulos que distingam
   múltiplas execuções do mesmo talhão.
3. Definir limite prático, comportamento de overflow e legibilidade para mais de
   duas séries; “várias” não equivale a capacidade literalmente infinita.
4. Definir o que torna uma execução “concluída” em cada módulo e como tratar
   registros legados sem talhão.
5. Reutilizar a linguagem visual dos gráficos atuais. Radar e veredito ficam fora
   deste rebrief, salvo nova decisão explícita.

### P1 — Reescopar implementação de comparação

Cards existentes: [BE-12](../../../tasks/api/active/be-12-comparacao.md) e
[FE-08](../../../tasks/web/active/fe-08-comparacao.md).

1. Trocar a identidade de fazenda/projeto agregado por IDs de execuções do mesmo módulo.
2. Reutilizar primeiro as listagens e detalhes existentes, inclusive filtros de acesso.
3. Tratar `plot_id` como contexto de descoberta e apresentação; o servidor deve
   derivar e validar o vínculo a partir da execução identificada, não confiar na
   combinação enviada pelo cliente.
4. Criar endpoint batch somente se o design aprovado ou uma medição mostrar que
   chamadas individuais não atendem.
5. Não incluir normalização entre módulos, radar ou veredito nesta entrega.
6. Se houver mudança de API: OpenAPI primeiro, SDK gerado depois, Web por `src/services/`.

### P1 — Tornar pousio explícito no DPM/RPM

Atividade cross-stack candidata, dependente apenas da confirmação de que `DMR`
significa DPM/RPM:

1. Adicionar um valor de contrato explícito, por exemplo `FALLOW`, sem associar uma
   razão DPM/RPM arbitrária.
2. Validar no backend o invariante `FALLOW -> biomassa 0 e nenhuma cultura ativa`.
3. Manter cobertura do solo editável no mês em pousio.
4. No modo anual por produtividade/cultura, representar automaticamente como pousio
   os meses fora dos ciclos; no modo de biomassa, zerar e bloquear entrada incompatível.
5. Atualizar OpenAPI, regenerar o SDK e adicionar traduções `Pousio`/`Fallow`.
6. Cobrir submissão, persistência e retomada do formulário nos dois cenários RothC.

## Decisões em aberto

- Confirmar que `DMR` significa DPM/RPM.
- Definir o limite visual de execuções simultâneas na comparação.
- Definir nomes mínimos para distinguir execuções: assessment, data, talhão, fazenda
  e cenário, quando aplicável.
- Confirmar se a comparação agregada de fazendas/projetos com radar e veredito ainda
  é desejada como feature futura separada.
- Definir a elegibilidade exata de “concluído” em LCA, RothC e Regenerativo.
- Definir como registros legados sem `plot_id` aparecem ou ficam indisponíveis.
- Identificar o ambiente em que a falha de permissão foi observada e conferir os
  `Membership`, `is_staff`, `is_superuser` e a versão implantada das duas contas.

## Snapshot técnico

Estado observado em 21/08/2026:

- `GAIA`: branch `main`, com alterações não relacionadas em configuração de agents e
  outros documentos observadas durante esta análise.
- `gaia-web`: branch `develop`, limpa; nenhuma tela genérica de comparação encontrada.
- `gaia-api`: branch `develop`, com uma refatoração ampla e não relacionada ainda não
  commitada. As referências de código acima descrevem esse working tree e devem ser
  revalidadas quando ele estabilizar.
