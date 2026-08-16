# Outras mudancas e proximas etapas - Reuniao de 14/08/2026

Este arquivo registra os encaminhamentos da reuniao que nao fazem parte das
tasks especificas do formulario de Carbono Emissao.

## 1. Arquitetura por talhao

### Decisao

A plataforma deve deixar de concentrar os cadastros e assessments apenas no
nivel da fazenda. O talhao passa a ser a unidade de avaliacao dos modulos.

### Fluxo esperado

```text
Projeto -> Fazenda -> Lista de talhoes -> Modulos do talhao
                                      -> Carbono Emissao
                                      -> Carbono Remocao
                                      -> Regenerativo
                                      -> Biodiversidade
                                      -> Saude do solo
```

### Regras

- Uma fazenda com manejo homogeneo pode ter um unico talhao representativo.
- Fazendas com manejos distintos devem ser divididas em varios talhoes.
- Os assessments e calculos devem ser vinculados ao talhao avaliado.
- A estrutura por talhao deve ser implementada antes da entrada das novas
  calculadoras, evitando retrabalho nos modulos seguintes.
- A comparacao deve permitir analisar talhoes da mesma fazenda ou de fazendas
  diferentes.

## 2. Comparacao de fazendas e talhoes

Criar uma experiencia de comparacao para selecionar duas ou mais entidades e
visualizar seus resultados lado a lado.

- Permitir selecionar fazendas ou talhoes dentro do escopo permitido ao
  usuario.
- Exibir os resultados em graficos de barras, evitando excesso de linhas em
  comparacoes com varias entidades.
- Aplicar a comparacao aos modulos de Carbono Emissao, Carbono Remocao e
  Regenerativo, com extensao futura para os demais indicadores.
- Permitir reabrir o assessment associado a cada entidade.
- Permitir excluir entidades ou assessments quando aplicavel.
- Permitir baixar as evidencias e os resultados em relatorio PDF.

## 3. Permissoes e visibilidade

Definir as regras de acesso antes da implementacao da comparacao.

- O usuario deve visualizar apenas projetos, fazendas e talhoes aos quais tem
  acesso.
- A comparacao deve respeitar as mesmas permissoes da visualizacao individual.
- Deve ser definido se cada perfil pode comparar apenas os proprios projetos,
  projetos do tenant ou projetos compartilhados.
- A tela de gestao de usuarios nao deve aparecer para perfis sem permissao.

## 4. Validacao dos calculos e testes de usabilidade

- Validar os calculos de Carbono Emissao e Carbono Remocao contra a planilha
  de referencia.
- Confirmar as dependencias do backend antes de remover ou automatizar campos.
- Executar testes praticos com um usuario externo a equipe de desenvolvimento.
- Usar os testes para verificar clareza dos formularios, navegacao, evidencias
  e entendimento dos resultados.
- Concluir os ajustes do formulario antes da rodada de testes.

## 5. MapBiomas e fontes geoespaciais

O uso de dados do MapBiomas foi identificado como uma evolucao importante para
automatizar o historico de uso do solo.

- Para o MVP, manter o fluxo manual guiado por selects quando a integracao nao
  estiver disponivel.
- Avaliar consumo dos dados do MapBiomas para Brasil e Argentina.
- Exibir ao usuario a fonte e os dados utilizados como referencia quando o
  preenchimento for automatizado.
- Para projetos globais, manter uma estrategia baseada em IPCC ou outra fonte
  com cobertura internacional.
- Confirmar se a integracao MapBiomas entra no MVP ou em uma etapa posterior.

## 6. Biodiversidade e saude do solo

Preparar a plataforma para os novos modulos ja considerando a arquitetura por
talhao.

### Biodiversidade

- Usar dados como distancia do talhao, produtividade, cultura de interesse e
  plantas de cobertura.
- Calcular o indice de polinizacao por talhao.
- Planejar a interpolacao dos resultados para mapas de calor e visualizacoes
  geoespaciais.
- Criar recursos visuais e ilustracoes explicativas para os selects e manejos.
- Avaliar a exportacao dos resultados em PDF.

### Saude do solo

- Receber e organizar o conteudo tecnico das ferramentas para orientar o
  desenvolvimento.
- Definir como o modulo sera conectado ao fluxo de talhao e aos demais
  indicadores ambientais.

## 7. Metodologias de carbono e nomenclatura

A plataforma deve evoluir para suportar diferentes metodologias conforme a
necessidade do cliente ou da regiao.

- LCA, correspondente a ACV em portugues.
- GHG Protocol.
- 2BSVS.
- ISCC.
- Validar a nomenclatura em portugues e ingles em todas as telas e resultados.
- Garantir suporte de idioma em portugues e ingles, especialmente para o fluxo
  de apresentacao internacional.

## 8. Posicionamento da plataforma

A Gaia deve ser apresentada como uma plataforma de MRV:

- Monitoramento.
- Relato.
- Verificacao.

O posicionamento deve destacar coleta de dados de campo, evidencias auditaveis,
processamento segundo padroes internacionais e geracao de relatorios para
claims ambientais.

O diferencial apresentado na reuniao e a abordagem multi-indicadora, reunindo
carbono, agua, biodiversidade e saude do solo, em vez de limitar a plataforma a
contabilidade de carbono.

## 9. Entregas e responsabilidades

| Responsavel | Encaminhamento |
|---|---|
| Equipe tecnica | Refatorar a estrutura de cadastro e avaliacao para talhoes |
| Equipe tecnica | Definir e implementar as regras de acesso e visibilidade |
| Equipe tecnica | Preparar os testes de usabilidade com usuario externo |
| Paulo e Ruan | Validar os calculos contra as planilhas de referencia |
| Felipe | Conduzir a interface de comparacao entre entidades |
| Paulo | Refinar e compartilhar as calculadoras e o conteudo tecnico |
| Gabriel | Desenvolver referencias visuais para biodiversidade e comparacao |
| Equipe | Definir o escopo da integracao MapBiomas no MVP |
| Paulo e Ruan | Preparar o pitch e o material de suporte para a Holanda |

## 10. Dependencias e pontos em aberto

- Migracao para talhoes deve preceder a integracao das novas calculadoras.
- O contrato de comparacao depende da definicao final de entidades, metricas e
  agregacoes.
- As regras de acesso precisam estar definidas antes da comparacao entre
  projetos ou fazendas.
- O escopo do MapBiomas no MVP ainda precisa ser confirmado.
- As formulas das calculadoras adicionais precisam ser documentadas antes da
  implementacao do frontend.
- O prazo mencionado na reuniao foi de aproximadamente um mes e sete dias para
  a plataforma estar funcional e homologada para a apresentacao internacional.
