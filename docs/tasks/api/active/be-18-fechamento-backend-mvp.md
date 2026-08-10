# BE-18 — Fechamento técnico do backend do MVP

> **Prioridade:** Alta | **Status:** Próxima sessão
> **Web pós-API:** [FE-28](../../web/active/fe-28-reconciliar-sdk-pos-backend.md)

## Prompt da próxima sessão

**Missão:** fechar backend MVP em PRs pequenos. Ordem: decidir → proteger →
validar ciência → features aprovadas → schema final. Zero código Web.

### Regras

- Trace fluxo/callers/contrato antes de editar. Corrija causa comum, menor diff.
- Reuse existente; delete antes de abstrair; nada especulativo.
- Views HTTP; services escrita/transação; selectors leitura; models estado.
- Uma concern/PR. Branch desde `develop`; sem rebase de branch compartilhada.
- Lógica nova → menor teste útil. Null/desabilitado ≠ zero.
- Sem card/agente/skill/prompt/modo em código, símbolo, teste ou comentário.
  Comentário só por invariante oculta, inglês, 1–2 linhas.
- Trilha bloqueada para; demais seguem. Sem decisão, sem model/migration.

### Roteamento de modelos

- **ORCH:** `openai/gpt-5.6-sol`; sessão principal. Decide D0, fatia fases,
  revisa diff, integra, controla Git e executa gates finais.
- **EXEC:** `opencode-go/deepseek-v4-pro`; recebe uma fase/concern aprovada por
  dispatch para `senior-backend`. Implementa e devolve diff, checks, riscos.
- Preflight: confirmar ORCH ativo e EXEC determinístico. Hoje `opencode.json` e
  `/feature-*` forçam DeepSeek; não chamar esses comandos como sessão principal
  se GPT deve preservar orquestração. Se pin incerto, configurar agente e reiniciar.
- Dispatch quando houver múltiplas layers, >3 arquivos, migration, auditoria longa
  ou matriz de testes. Envelope obrigatório: branch, fase, evidências, escopo/
  arquivos permitidos, aceite, checks, sem Web, commit ou push.

### Baseline

- API: `fix/backend-mvp-hardening` (`8d267c6`, `5cf02af`, `f9e770f`);
  discovery 171, não reduzir. Testes atuais = regressão, não validação científica.
- Schema sem warnings sob `test_settings`; tornar schema default sem dependência DB.
- Web limpo em `develop@4394416`; patch SDK intermediário descartado. Só FE-28
  regenera após API final.
- Referências: [inventário de domínio](../../../references/domain/README.md).
  RothC: guia oficial + Fortran Apache 2.0 com golden vectors 70 anos + DOI Zenodo.
  LCA: GHG Protocol v2.0 (energia/grid BR), EXIOBASE 3.9.6 (cradle-to-gate),
  PestLCI Embrapa (defensivos), IPCC AR6 (GWP). Fatores rastreáveis disponíveis.

### D0 — Decisões bloqueantes

- **Fonte:** resolvido para todas as categorias:
  - Energia: GHG Protocol v2.0 (diesel, gasolina, biodiesel, grid BR 2016–2023)
  - Cradle-to-gate insumos: EXIOBASE 3.9.6 (200 setores × 214 países, ~1 GB externo)
  - Defensivos: PestLCI Consensus Embrapa 2021 (27 moléculas BR, 35 mesorregiões)
  - GWP: IPCC AR6 (N₂O=273, CH₄ fóssil=29.8)
  Tarefa: versionar seed data no modelo, auditar fatores atuais contra fontes.
- **RBAC:** definir tenant e vínculo user↔project/farm; Membership hoje é global.
- **Assessment:** farm/plot, multiplicidade, latest, clone, cancelamento. Destrava
  BE-01/02/03/04/06/15. Web espera project_id + farm_id por cálculo; backend deve
  tratar assessment como vinculado a farm, com result versionável.
- **LCA data:** FE/alocação server-owned versionada ou custom evidenciada? Migration
  `0016` morreu com `LcaCulture` em `0021`. Web espera: cultura, produtos (com
  alocação), solo, fertilizantes, corretivos (ureia, calcítico, dolomítico),
  defensivos, sementes, combustíveis, energia, transporte. Backend provê fatores
  versionados; frontend envia inputs e exibe resultados. Não ditar estrutura de
  formulário — o contrato é o serializer.
- **Transporte:** obrigatório, opcional explícito ou fora da fronteira? Ausente
  ≠ 0; nunca 898.
- **RothC:** resíduo/HI/FC/matéria seca/raízes, FYM/composto/fertilizante/pousio,
  timing, estoque e ganho anual. Web já distingue modo (biomass vs productivity_crop),
  tipo de cultura (perennial/annual), dados mensais (DPM/RPM, cobertura, biomassa)
  e composto. Modelo backend só precisa suportar o que o serializer expõe;
  complexidade de sub-steps fica no frontend.
- **Clima:** coordenada, normal, cobertura mínima, futuro; cenários usam mesmo clima.
- **BAU/projeto:** mesmos SOC/pools/profundidade/área/data/horizonte/clima/versões;
  definir delta/sinal/unidade. Web já modela como 3 MainSteps (parâmetros → BAU →
  projeto) com sub-steps mode/crop/monthly/compost por cenário. Backend: assessment
  entity com dois scenarios (bau/project) que compartilham parâmetros de solo/clima.
  `PROJECT_FACTOR=0.8` no `scenario-comparison-model.ts` é placeholder visual,
  não regra backend. **MVP:** BAT entra? EIQ/STIR não.

### P1 — Base segura

- Migrations isoladas: índice `authx`; auditoria/ID `cfp`. Revisar, não misturar.
- Reparar shebang `pre-commit` ou usar `venv/bin/python -m pre_commit`.
- Remover query de roles na construção de serializer; schema default deve rodar sem DB.
- Auto-completion não está em `develop`: reimplementar seletivo; nunca portar branch
  antiga inteira (mistura auth/CFP). Reconciliar BE-10/11/16/17.
- Respecificar BE-09: perene é uso do solo, não clima/textura.

### P2 — Segurança, integridade, contrato

- Scoping em selectors project/farm/RothC/LCA/regenerativo; testar cada role e ID alheio.
- LCA: impedir vínculo cruzado entre project/farm/project_farm/project_culture.
- Filtrar cancelados em list/detail/completude; decidir soft-delete LCA
  (`LcaProjectCulture` não herda `BaseModel`).
- Serializer explícito para todo 2xx. Corrigir: LCA detail=`unknown`; result sem
  `total`; `soil_amendments` vs `soil_amndments`; authz responses só descritivas.
  Schema deve casar com o que `LcaModuleFormValues` e `RothCModuleMockFormValues`
  já esperam no frontend — não inventar campos novos nem renomear os vigentes.
- Esvaziar `lca/views.py`: ORM/read → selectors; write/transação/payload → services.
  Service não devolve QuerySet de leitura.

### P3 — Ciência

**RothC**

- **Desbloqueado**: código Fortran canônico (`RothC.for` + `Shell.for`) e golden
  vectors de 70 anos (`year_results.out`, `month_results.out`) versionados em
  `docs/references/domain/rothc/`.
- Validar GAIA × Fortran usando os 70 snapshots anuais como teste de conformidade.
- Diferenças conhecidas: sem spin-up, IOM recalculado, evapotranspiração via
  Penman-Monteith em vez de bandeja, SMD simplificado, termo `0.02×fym` espúrio.
- `produtividade/HI` inclui colheita: definir resíduo retornado, base seca, mês/ano.
- Inicialização deve conservar SOC ou usar spin-up; hoje 0+0+2%+82%+IOM não fecha.
- Definir estoque inicial/final/médio, intervalo, `tC/ha/year`, CO2/CO2e/sinal;
  `co2` mensal hoje é C. Fechar `aporte_biomassa` e `how_many_years_future`.
- Clima: latitude request vs farm, normal histórica, dias/anos mínimos, all-future.
  Recurso sem método aprovado fica indisponível/null.

**LCA**

- **Parcialmente desbloqueado**: GHG Protocol v2.0 cobre energia/grid BR.
  EXIOBASE 3.9.6 cobre fatores cradle-to-gate para todos os setores (fertilizantes,
  calcário, defensivos, sementes, combustíveis) — arquivos externos, seed data
  a extrair. PestLCI Embrapa cobre frações de emissão de defensivos por
  compartimento. GWP IPCC AR6 confirmado (N₂O=273).
- TRACI 2.2 (US EPA, domínio público) disponível para eutrofização futura.
- Circularity/Agribalyse bloqueado por EULA proprietária.
- **Tarefa imediata**: auditar fatores atuais (K=988/501, FSOM 1/15, FCR 1/10,
  FATOR_TOTAL=0.5, frete 0.1047/0.000029, vegetação natural como fóssil) contra
  fontes e popular tabelas de referência versionadas. Remover duplicação de
  unidades (L/M3/KG para combustível). Validar alocação e cascata. Só depois:
  constraints de área, colheita, rendimento.

### P4 — Features aprovadas

- Ciclo de vida: BE-01 LCA, BE-02 RothC, BE-04 regenerativo; BE-03 após regra de clone.
- BE-07 reescrita; BE-08/13/14 após semântica RothC; BE-05 só se BAT=MVP.
- BE-12 segue separado. Cenário só após D0; versionar método/FE e preservar baseline.

### Gates finais

- Iteração: testes focados + suíte `--keepdb`.
- Final: suíte limpa oficial sem `--keepdb`; discovery ≥171; zero rede/email.
- `makemigrations --check --dry-run`; schema default `--fail-on-warn` sem DB;
  pre-commit; scan de artefatos proibidos; validação estrutural; CodeGraph sync.
- Done: D0 registrado; RBAC/vínculos/cancelamento/2xx cobertos; vetores rastreáveis
  verdes; migrations limpas; schema final publicado; FE-28 desbloqueado.
