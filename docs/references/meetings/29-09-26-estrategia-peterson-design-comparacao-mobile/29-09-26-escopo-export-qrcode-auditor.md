# Escopo: cálculo final, export, PDF, QR code e auditor

Origem: reunião de 29/09/2026, trecho 26:30–55:00
([ata](29-09-26-reuniao-transcricao-e-pontos.md)). Este documento junta o que
foi pedido, o que já existe no código e o que falta decidir, para virar tasks no
Plane (`/plane-doc-to-tasks`).

Estado: **rascunho**. O conteúdo da página do QR code depende de uma definição
do Paulo e do Ruan.

## Prioridade

Pedido do Paulo [47:20]: "primeiro baixar Excel e PDF, segundo o QR code,
terceiro o auditor". A biodiversidade fica para depois [53:56].

A marcação de **cálculo final** não estava na lista do Paulo, mas os três itens
dependem dela: o PDF, o QR code e o auditor mostram o cálculo real, não as
simulações.

| #   | Feature                                 | Depende de                  |
| --- | --------------------------------------- | --------------------------- |
| 0   | Cálculo final vs simulação              | —                           |
| 1   | Export Excel dos dados brutos           | 0 (para filtrar só o final) |
| 2   | PDF do dashboard                        | 0                           |
| 3   | QR code + página pública de verificação | 2                           |
| 4   | Auditor convidado por projeto           | 0, 1, 2                     |

## 0. Cálculo final vs simulação

**Pedido** [38:32–41:12]

- Hoje cada cálculo feito num talhão vira "mais um cálculo". Não há como dizer
  qual é o real.
- O usuário marca, por talhão e módulo, qual cálculo é o **final** (o real). Os
  outros são **simulações**.
- Paulo: o final é a **linha de base**, a "foto daquele momento". As simulações
  servem para escolher práticas ("qual prática me dá mais carbono ou reduz
  emissão") e não vão para a venda. No máximo vai junto uma projeção de estoque
  de carbono de +5 anos.
- A verificação (Control Union) é feita em cima do cálculo final.

**Código hoje**

- Nenhum campo de final/simulação nos models do `gaia-api` (busca por
  `simulat`, `is_final`, `is_official`: nada).

**Em aberto**

- Um final por talhão e módulo, ou por talhão, módulo e safra/ano?
- Depois de verificado ou exportado, o cálculo final fica travado? Editar
  depois cria nova versão?
- A projeção de +5 anos (RothC) entra como parte do final ou como anexo?
- A comparação e os dashboards passam a usar só o final por padrão?

## 1. Export Excel dos dados brutos

**Pedido** [27:12]

- "Como se fosse a planilha": num projeto com 20 fazendas, **linhas = insumos**
  (fertilizante, calcário etc.), **colunas = fazendas**, valores = o que foi
  preenchido.
- Uso: o cliente quer ter os dados no computador. O auditor também baixa [49:40]
  e precisa ver os **fatores de emissão** usados em cada insumo [51:00].

**Código hoje**

- Nenhuma lib de Excel/PDF/QR no `gaia-api` nem export no `gaia-web`.

**Em aberto**

- Nível: projeto (fazendas como colunas) e também fazenda (talhões como
  colunas)?
- Uma aba por módulo (Emissão, Remoção, Regenerativa)?
- Só o cálculo final, ou todos com uma coluna indicando simulação?
- Os fatores de emissão vão numa aba própria, para todos ou só para o auditor?
- Unidades: as do formulário ou normalizadas?

## 2. PDF do dashboard

**Pedido** [27:48, 31:04]

- Dashboard **por projeto e por módulo** em PDF, para baixar.
- No fim do PDF, o QR code do item 3.

**Em aberto**

- Quais gráficos entram por módulo. Parte do layout sai do design no Penpot
  antes do dev (processo acordado na mesma reunião).
- PDF por fazenda também, ou só por projeto?
- Geração no servidor ou no navegador. Com QR code e prova de autenticidade,
  gerar no servidor e registrar o snapshot faz mais sentido (ver item 3).

## 3. QR code e página pública de verificação

**Pedido** [31:04–38:20, 47:56]

- O QR code do PDF abre uma página no **domínio da GAIA** que prova que o
  resultado foi gerado na plataforma e não foi manipulado. Ruan comparou com o
  QR code de declarações de universidade [35:40].
- Caso de uso: a empresa prega o QR code no lote (algodão, milho) para dar
  rastreabilidade: pegada de carbono, score regenerativo.
- Escopo **fazenda/projeto**, não cadeia. Balanço de massa (caso Nestlé) está
  fora [35:08].
- **Página pública, sem login.** Paulo: quem prega no produto quer que seja
  público [33:00]. Ruan: criar usuário para público externo é complexidade demais
  [46:28].
- Geração automática por projeto, lendo do banco (Z2 [37:12]).

**Conteúdo da página** (pendência do Paulo e do Ruan)

Primeira ideia na reunião: dashboard **bem simplificado**, a fazenda, o
**mapa da fazenda**, o dado de carbono; resumo só dos **módulos contratados**
[48:56]; no nível de projeto, a média das fazendas [38:20]. Referências a
pesquisar: Regrow e as plataformas que o Paulo vai mandar por escrito
("Puma", "CR", "Farm…", nomes incertos na legenda).

**Notas técnicas (Z2)**

- `Project.id` é inteiro sequencial (`projects/models.py`). A URL pública não
  pode usar esse id, senão qualquer um enumera projetos. Usar um token aleatório
  por documento emitido.
- "Prova de que não foi manipulado" só funciona se a página mostrar os números
  **do momento da emissão**. Se ela ler o dado atual e o cálculo mudar depois, o
  PDF e a página divergem. Proposta: cada PDF gera um registro imutável (token,
  data, cálculo final usado, valores exibidos, hash do PDF) e a página lê esse
  registro.
- Não dá para impedir cópia do conteúdo de uma página pública. A garantia é que
  a fonte está no domínio GAIA, não sigilo.

**Em aberto**

- O que mostrar (acima).
- A página mostra status de verificação ("verificado por Control Union em
  dd/mm")?
- Emissor pode revogar um QR code?
- Rota e domínio (`gaia/prova/<token>` foi só exemplo).

## 4. Auditor

**Pedido** [43:04–53:24]

- **Permissão, não ambiente separado** (Z2 [44:32]). O auditor usa a própria
  plataforma.
- Modelo de outro projeto da Z2 [46:40]: o dono do projeto **convida o auditor
  por e-mail**, ele cria a conta e ganha acesso só àquele projeto.
- O auditor vê: todas as fazendas e talhões do projeto, os cálculos **finais**
  de cada módulo, os **dados primários** preenchidos (defensivos, produtos etc.)
  [50:16–50:52], e os **fatores de emissão** usados [51:00].
- Somente leitura. Baixa o Excel e o PDF.

**Código hoje**

- O papel `auditor` já existe em `authx` e aparece em `HasRole(...)` nas views
  de LCA (ex.: `gaia-api/lca/views.py:210`). Mas papéis são **globais**
  (`Membership` liga usuário a papel, sem projeto).
- O acesso a projeto é por `created_by`, `admin` ou responsável/criador de
  fazenda (`ProjectSelectors._user_accessible_project_qs`). Não existe
  "membro convidado" de projeto nem fluxo de convite.

Falta: vínculo auditor↔projeto, convite por e-mail, escopo somente leitura por
projeto, e tela com os fatores de emissão por cálculo.

**Negócio (futuro, não entra no primeiro corte)**

- Opção na plataforma de **pedir verificação pela Control Union**, que cobra à
  parte (Paulo [52:16]).
- Lista de verificadores credenciados que pagam para estar na relação, como os
  verification bodies da Verra (Ruan [52:44]).
- Se a GAIA cobra pelo acesso do auditor: em aberto.

**Em aberto**

- Auditor aprova/reprova dentro da plataforma (registro de "verificado"), ou só
  consulta?
- Convite expira? Dono pode revogar?
- Quem pode convidar: só o admin do projeto?

## Pendências do cliente (Paulo e Ruan)

1. Definir o conteúdo da página do QR code.
2. Mandar por escrito a lista de plataformas com QR code para referência.
3. Trazer João (carbono do solo) e Day (emissões) para testar com dados reais,
   com urgência.
