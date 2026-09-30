# 01 · Entendimento da feature

## O pedido

Reunião de 29/09/2026, [38:32–41:12]
([ata](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-reuniao-transcricao-e-pontos.md)).

- Z2: hoje cada cálculo feito num talhão vira "mais um cálculo". Precisa dizer
  qual é o real: "no talhão A da fazenda A do projeto A, o cálculo A é o real; B, C
  e D foram testes".
- Paulo: no começo do projeto cria-se a linha de base. Em cima dela, simulações
  para escolher práticas ("qual prática me dá mais carbono ou reduz emissão"). Na
  venda vai só a linha de base: pegada e estoque de carbono "naquele momento", no
  máximo com projeção de estoque de +5 anos. "Não entrego simulações irreais."
- Paulo: a verificação (Control Union) é feita em cima do dado real, "a foto
  daquele momento". Depois gera dashboard, QR code e prega no produto.

## O que a feature é, em uma frase

Separar, para cada talhão e módulo, o cálculo que a empresa **declara** (e que
vai para PDF, QR, auditor e verificação) dos cálculos de **exploração**
(simulações), e garantir que o declarado não mude depois de usado.

São duas coisas diferentes, que podem ser entregues em fases:

1. **Marcação:** qual cálculo é o oficial. Livre enquanto o projeto está em
   andamento. Barato.
2. **Finalização e congelamento:** ao finalizar o projeto, o usuário revisa e
   confirma os oficiais, e eles travam. Depois disso não mudam, mesmo que os
   fatores de emissão mudem. Caro, e é o que dá valor à verificação e ao QR.

## Ciclo de vida (hipótese H1, 30/09, a validar)

```
Projeto em andamento                          Projeto finalizado
─────────────────────────────────────────     ──────────────────────────
cálculos livres: criar, editar, clonar        oficiais travados (snapshot)
marcar / trocar / desmarcar oficial à vontade  simulações: ver/criar? (pergunta 17)
100% preenchido = "pronto para finalizar"      PDF / QR / auditor / verificação
            │
            └── Finalizar projeto → revisão talhão × módulo → confirmar → trava
```

O status do projeto hoje tem só `in_progress`, `completed` e `cancelled`
(`projects/enum/project_status.py`), e `completed` é automático ao chegar a 100%
(`projects/services.py:78-91`). Se H1 for confirmada, "concluído" automático e "finalizado"
precisam ser coisas separadas.

## Vocabulário: por que não chamar de "linha de base"

| Termo | Sentido que já tem | Onde |
|---|---|---|
| Cenário BAU / Cenário do projeto | As duas rodadas do RothC num mesmo cálculo | `CONTEXT.md:17`, `rothc/models.py:104` |
| baseline (token visual) | Cor do BAU nos gráficos | `docs/agents/design/components.md:72` |
| Baseline (VM0042, ISO 14064-2) | Contrafactual: o que aconteceria sem mudar prática | normas, ver [02-pesquisa.md](02-pesquisa.md) |
| Ano-base (GHG Protocol, SBTi) | Ano de referência para medir redução | idem |

O que o Paulo descreveu é o **inventário oficial de um período**. Proposta:
**Oficial** para o cálculo declarado e **Simulação** para os outros. "Linha de
base" fica reservado, se precisar, para marcar qual período oficial é o ano-base.
Confirmar no questionário.

## O que existe hoje no código

Caminhos relativos a `gaia-api/` salvo indicação.

| Módulo | Model de "um cálculo" | Por talhão? | Período | Resultado | Marca de oficial |
|---|---|---|---|---|---|
| Emissão (LCA) | `LcaProjectCulture` `lca/models.py:171` | vários; `plot_id` é inteiro sem FK | `harvest_year` + `crop` | gravado em `LcaCalculationResult`; recalcular sobrescreve (`lca/services.py:820`), cancelar apaga (`:1169`) | nenhuma |
| Remoção (RothC) | `RothcCalculation` `rothc/models.py:40` | vários | sem ano; janela de modelagem | gravado mensal; editar apaga e recria (`rothc/services.py:1310-1338`), clima buscado na hora | nenhuma |
| Regenerativo | `RegenerativeAssessment` `regenerative/models.py:62` | vários | nenhum | score **calculado na hora** com pesos atuais (`regenerative/services.py:291`) | `is_primary`, único por `project_farm` (`:93`, `:99-103`) |
| Biodiversidade | `BiodiversityAssessment` `biodiversity/models.py:21` | vários; talhão obrigatório na API (a UI fica na fazenda e está em construção) | nenhum | score gravado; seções recalculadas | nenhuma |
| CFP | `CfpAssessment` `cfp/models.py:6` | só fazenda | nenhum | integração desligada | nenhuma |

Outros pontos:

- Nenhum model tem status (rascunho, travado, verificado), versão ou histórico.
  Não há django-simple-history.
- `LcaProjectCulture` não herda `BaseModel`: não tem `created_by`/`updated_by`.
- Catálogos de fator (LCA) não têm versão nem `valid_from`. Migrations fazem
  `update()` no registro. Um resultado gravado não muda, mas qualquer recálculo
  pega o fator novo.
- Precedente útil no Regenerativo: o primeiro assessment vira primário sozinho
  (`regenerative/services.py:88`), marcar um desmarca os outros (`:48`), cancelar
  o primário promove o mais recente (`:207-215`), endpoint
  `assessments/<id>/primary/`. Nenhuma tela usa isso para escolher.

## Quem consome cálculos hoje (e teria de mudar)

| Consumidor | Qual cálculo usa hoje | Arquivo |
|---|---|---|
| Comparação | os IDs escolhidos, ou todos os não cancelados | `comparison/services.py:301`, `comparison/selectors.py:88` |
| Benchmark (média, p25, p75) | todos os acessíveis; simulação distorce | `comparison/selectors.py:107` |
| Completude do talhão, LCA | média de todas as culturas | `farms/services.py:106-124` |
| Completude do talhão, Carbono | 1.0 se existe qualquer cálculo | `farms/services.py:84-96` |
| Completude do talhão, Regenerativo | o mais recente, ignora o primário | `farms/services.py:43-52` |
| Status do projeto | concluído **automático** quando média das fazendas = 100%; volta para em andamento se cair. Conflita com H1 | `projects/services.py:78-91` |
| Tela de Regenerativo | o primário, senão o primeiro | `gaia-web/src/services/regenerative/regenerative.query.ts:34` |
| Listas de Emissão e Remoção | todos, por `-created_at` | `gaia-web/src/features/carbon-emission/dashboard/lca-listing.tsx:79` |
| PDF, QR, auditor | não existem ainda | — |

## Achados colaterais (fora da feature, registrar)

Lista completa por módulo em [../modulos-referencia.md](../modulos-referencia.md).


- Biodiversidade deixa o papel `auditor` criar e cancelar (`biodiversity/views.py:105-106`, `:225-226`).
- A tela de Emissão não esconde "novo" nem o menu de ações para o auditor.
- Regenerativo por talhão ignora `is_primary` na completude.
- `docs/vault/flows/Completion-Flow.md:9` e `docs/tasks/api/active/be-10-status-projeto-concluido.md` divergem sobre o auto-complete
  do projeto estar em `develop`.
