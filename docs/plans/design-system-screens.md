# Migração do design system para o gaia-web — Parte 2 (telas)

**Status:** Em execução. Core no `develop` (2026-09-26). Módulo 2 (Auth) implementado na `feat/screens-auth` (`6ec1af7`, `75e76bd`, sidebar `034fab6`), aguardando conferência visual e merge. Próximo: Projeto, Fazenda & Talhão.
**Atualizado:** 2026-09-26

## Contexto

- A Parte 1 ([design-system-migration.md](./design-system-migration.md)) já está no `develop` do gaia-web. Ela entregou os tokens, a tipografia, os primitivos e os componentes GAIA com o nome do Penpot, além do `lint:tokens`.
- A Parte 2 é a etapa 2 da fase 5 do [penpot-design-system.md](./penpot-design-system.md). Ela compara cada tela do gaia-web com o frame correspondente no Penpot e acerta o que é da tela: layout, composição, estados e scroll.
- Onde está a referência:
  - **Frames:** nos arquivos `GAIA · <Módulo>` do Penpot, com uma página por fluxo.
  - **O que o design mudou em relação ao código:** registrado lote a lote em [screens.md](../agents/design/screens.md), na seção "Lotes feitos".
- **Regra de conteúdo:** os textos continuam os do i18n. O design só troca layout e componentes, e toda divergência de conteúdo já aprovada está registrada no `screens.md`.

## Decisões

| Decisão | Por quê |
|---|---|
| Uma branch por módulo (`feat/screens-<módulo>`), a partir do `develop` | Cada módulo tem começo e fim claros, e o checkpoint e o merge são por módulo. |
| Um commit por fluxo (uma página do Penpot = um commit) | Fica fácil revisar e reverter, no mesmo recorte do Penpot. |
| Comparação visual lado a lado em 1440×900 | É a única forma de fechar "igual ao design". Exporto o frame do Penpot (`export_shape`) e tiro screenshot da tela real no Chrome, logado pela sessão do usuário. |
| Ordem: Core → Auth → Projeto, Fazenda & Talhão → Carbono emissão → Carbono remoção → Regenerativo | O Core inclui a casca logada (sidebar, header, listas), que todas as outras telas herdam. Auth é independente e pequeno. Os módulos do talhão vêm por último, porque dependem das telas de fazenda e talhão. |
| Estados obrigatórios (carregando, erro, vazio e o executando de cada ação) seguem [states.md](../agents/design/states.md) | O Penpot desenha todos os estados, e hoje várias telas só mostram texto "Carregando". |
| Componente que falta no código é criado com o nome do Penpot, só quando a tela precisa dele | Evita criar peça sem uso (ex.: ErrorState, FacetedFilter, DetailsCard, Stepper do wizard). |
| Biodiversidade, Análise de contexto, Saúde do solo e Água ficam fora | Ainda não têm front nem API reais (placeholders), por decisão do usuário. |

## Módulos

Para cada módulo: rotas do código ↔ páginas do Penpot ↔ onde está o drift da tela.

### 1. Core (arquivo `GAIA · Core`, lote 05) · implementado

| Fluxo no Penpot | Rota |
|---|---|
| 01 Meus Projetos · 02 Novo projeto | `(private)/projects` |
| 03 Gestão de Usuários · 04 Novo usuário · 05 Gerenciar permissões · 06 Detalhes do usuário | `(private)/users` |
| 07 Perfil · 08 Trocar senha · 09 Idioma | `(private)/profile`, `/profile/edit-password`, `/profile/language` |

Pendências herdadas da Parte 1 que entram aqui: o espaçamento do Card (`py-6 flex-col` do shadcn, P14), o FacetedFilter (se a tela de usuários usar) e os estados de carregamento e erro das listas.

### 2. Auth (arquivo `GAIA · Auth`, lote 04) · implementado

| Fluxo | Rota |
|---|---|
| Login (principal, erro, senha redefinida) | `(auth)/login` |
| Recuperar senha · Redefinir senha | `(auth)/forgot-password`, `(auth)/reset-password` |

Pendências herdadas: o título do login em `display` (sair o `font-bold`), o card de 440 e o seletor de idioma em TabsList.

### 3. Projeto, Fazenda & Talhão (arquivo `GAIA · Projeto, Fazenda & Talhão`, lotes 06 e 07)

| Fluxo | Rota |
|---|---|
| 01 Projeto · 02 Nova fazenda (wizard de 3 passos) | `(private)/projects/[projectId]` |
| 03 Fazenda · 04 Novo talhão | `projects/[projectId]/farm/[farmId]/(farm)` |
| Talhão · 01 Dados gerais · 02 Editar talhão · 03 Excluir talhão | `…/plot/[plotId]` |

Componentes que devem entrar aqui: o Stepper (wizard da Nova fazenda), o DetailsCard (detalhes da fazenda e do talhão, hoje `farm-details` com card `highlighted` e `DataRow` feitos à mão), o PlotCard e o MapPlaceholder nos seus estados.

### 4. Carbono emissão (arquivo `GAIA · Carbono emissão`, lotes 08 e 09)

| Fluxo | Rota |
|---|---|
| 01 Avaliações · 02 Excluir avaliação · 05 Adicionar produto · 06 Remover produto | `…/plot/[plotId]/carbon-emission` |
| 03 Módulo ACV | `…/carbon-emission/module` |
| 04 Resultado ACV | `…/carbon-emission/result/[cultureId]` |
| Comparação · 01 Comparar avaliações · 02 Adicionar avaliação à comparação | `(private)/comparison/carbon-emission` |

Pendências herdadas:
- eixos, grade e tooltip dos gráficos no padrão do ChartCard (grade tracejada em `border`, eixos em caption muted, tooltip em `popover`);
- o `uppercase` dos rótulos em `picker-dialog` e `kpi-compare-cards`;
- o AssessmentCard da lista de avaliações;
- o resultado ACV mostrando carregamento em texto, sem skeleton.

### 5. Carbono remoção (arquivo `GAIA · Carbono remoção`, lote 10)

| Fluxo | Rota |
|---|---|
| 01 Resultados · 02 Renomear cálculo · 03 Excluir cálculo | `…/plot/[plotId]/carbon-removal` |
| 04 Preencher módulo · 05 Aplicar em lote · 06 Replicar valor | `…/carbon-removal/module` |
| 07 Editar preenchimento | `…/carbon-removal/[calculationId]/edit` |
| 08 Resultado do cálculo | `…/carbon-removal/[calculationId]` |

As páginas `Comparação ·` do Penpot (lote 11) **ficam fora**. O código não tem esse módulo, então ele entra como feature própria, com contrato de API, e não como ajuste de tela.

### 6. Regenerativo (arquivo `GAIA · Regenerativo`, lotes 12 e 13)

| Fluxo | Rota |
|---|---|
| 01 Regenerativo (Score + Tópicos) | `…/plot/[plotId]/regenerative` |
| 02 Módulo regenerativo | `…/regenerative/module` |
| Comparação · 01 · 02 | `(private)/comparison/regenerative` |

Pendências herdadas: o ScoreScale (substitui o `ScaleTrack`), o `uppercase` em `score-overview` e a coluna de bandeira só com ponto em `topics` (vira TopicFlag).

## Fluxo de trabalho por fluxo (página do Penpot)

1. **Levantar:**
   - Exportar os frames da página (`export_shape`).
   - Tirar screenshot da rota real em 1440×900, no estado correspondente.
   - Ler o trecho do lote no `screens.md`.
2. **Listar as diferenças**, uma por linha: layout, componente, estado, scroll ou texto (este só quando o `screens.md` registra a mudança aprovada).
3. **Implementar** pelos agentes de camada (`design-agent`, `form-agent`, `table-agent`, `api-layer-agent`), com a especificação medida no Penpot.
4. **Conferir:** screenshot de novo e comparar com o frame, estado por estado.
5. **Verificar:** typecheck, `biome check src messages`, `lint:boundaries`, `lint:tokens`, Vitest e `next build`.
6. **Commit** do fluxo. No fim do módulo: push, checkpoint com o usuário e merge no `develop`.

## Decisões tomadas durante a execução

- **CardList (2026-09-26):** o "Visualizar" virou Button link pequeno no topo à direita. A mudança foi feita primeiro no Penpot.
- **Linhas de tabela:** o fundo é branco, igual ao cabeçalho. A tabela acompanha a altura das linhas, com a paginação logo abaixo.
- **RadialProgress (2026-09-26):** o trilho usa a cor do tom a 20%, e não `muted`, para aparecer no BadgeScore. Feito no Penpot e no código.
- **Erro de envio:**
  - Em dialog, e em formulário com estado de erro desenhado, o erro aparece só num Alert destructive no topo do corpo, sem toast. O toast fica para sucesso e para erro fora de dialog.
  - Validação aparece por campo.
- **"Voltar" dos dialogs:** Button outline com o texto "Voltar", como nos frames do Core. Isso desfaz o "Cancelar" da Parte 1.
- **Componentes novos no código:** ErrorState, Alert, Toggle e InputOTP (dependência `input-otp`, com o `FormOTP`), com os nomes do Penpot.
- **Senha redefinida:** o redirect depois de redefinir vai para `/login?reset=success`, e o login mostra o Alert de sucesso. Isso substitui o toast.
- **Sidebar (2026-09-26):** recolhida com 64 px e botões de 36 (ícone 16) e começa recolhida (cookie `sidebar_state` só abre quando é `true`). O botão de recolher virou item (ícone + nome) no fim, acima do separador. Feito no Penpot e no código.
- **Biblioteca nos arquivos de telas:** depois de mudar um componente no Design System, clicar em "Atualizar" no aviso de bibliotecas de cada arquivo `GAIA · <Módulo>`.

## Definição de pronto (por módulo)

- Toda rota do módulo bate com os frames do Penpot em 1440×900, em todos os estados desenhados.
- Carregando, erro e vazio existem onde o Penpot desenha. Cada ação mostra o executando e o erro dela.
- Nenhum componente fora do sistema. Se faltou peça, ela foi criada com o nome do Penpot.
- Os checks estão verdes e o `lint:tokens` passa.
- `screens.md` tem uma linha "implementado em <data>" no lote.

## Fora de escopo e pendências

- **Comparação da Carbono remoção (lote 11):** é feature nova, com plano próprio quando houver API.
- **Biodiversidade, Análise de contexto, Saúde do solo e Água.**
- **Dark mode.**
- **Status do projeto:** depende da task no Plane para o gaia-api mandar o `StatusEnum` (Drift G4). Até lá, o BadgeStatus da lista de projetos segue com a função de mapeamento.
- **Responsivo abaixo de 1440:** os frames do Penpot são 1440×900. O comportamento em telas menores segue o que o código já faz, sem regressão, e não entra na conferência.
