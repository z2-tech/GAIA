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
  Guia oficial RothC-26.3 + código Fortran canônico Apache 2.0 com golden vectors
  de 70 anos versionados. Validação Python × Fortran desbloqueada.
  Modelo de domínio LCA (openLCA) disponível; fatores de emissão ainda ausentes.

### D0 — Decisões bloqueantes

- **Fonte:** RothC resolvido — guia oficial + Fortran canônico (GitHub v2.1.1 +
  Zenodo DOI v1.0.0) com vetores dourados de 70 anos.
  LCA energia: GHG Protocol v2.0 (mar/2024) cobre combustíveis, grid BR e
  transporte. Faltam fatores para fertilizantes, calcário e defensivos.
- **RBAC:** definir tenant e vínculo user↔project/farm; Membership hoje é global.
- **Assessment:** farm/plot, multiplicidade, latest, clone, cancelamento. Destrava
  BE-01/02/03/04/06/15.
- **LCA data:** FE/alocação server-owned versionada ou custom evidenciada? Definir
  ranges/normalização/conservação. Migration `0016` morreu com `LcaCulture` em `0021`.
- **Transporte:** obrigatório, opcional explícito ou fora da fronteira? Ausente
  ≠ 0; nunca 898.
- **RothC:** resíduo/HI/FC/matéria seca/raízes, FYM/composto/fertilizante/pousio,
  timing, estoque e ganho anual.
- **Clima:** coordenada, normal, cobertura mínima, futuro; cenários usam mesmo clima.
- **BAU/projeto:** mesmos SOC/pools/profundidade/área/data/horizonte/clima/versões;
  definir delta/sinal/unidade. Contexto atual: `gaia-web/src/features/carbon-removal/module-mock/hooks/use-roth-c-module-mock.ts`
  descarta cenários; `gaia-web/src/features/carbon-removal/calculation-mock/lib/scenario-comparison-model.ts`
  usa `PROJECT_FACTOR=0.8`; nenhum é regra backend. **MVP:** BAT entra? EIQ/STIR não.

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

- **Parcialmente desbloqueado**: GHG Protocol Cross-Sector Tools v2.0 (mar/2024)
  versionado em `docs/references/domain/lca/ghg-protocol/`. Cobre:
  - Combustíveis líquidos (diesel=74.1 tCO₂/TJ, gasolina, biodiesel, LPG)
  - Eletricidade grid Brasil 2016–2023 via MCTI/SIRENE
  - Transporte e frete rodoviário/ferroviário/marítimo/aéreo
  - Conversões de unidades energéticas
- GWP IPCC AR6 confirmado: N₂O=273, CH₄ fóssil=29.8 (openLCA AR6 method package
  em `lca/ipcc/`).
- TRACI 2.2 (US EPA, domínio público) disponível para eutrofização futura.
- Bloqueado: fatores de emissão para fertilizantes, calcário, ureia e defensivos
  — GHG Protocol é somente energia (IPCC Vol. 2). Precisa IPCC Vol. 4 ou ecoinvent.
- Circularity/Agribalyse bloqueado por EULA proprietária.
- LCA Commons 2025 (USDA/NREL) é referência secundária, não fonte primária.
- Auditar: K=`988/501 kgCO2e/kg K2O`; combustível aceita L/M3/KG mas usa kg/L;
  composto recebe fração nutriente apesar de FE/kg produto.
- Validar FSOM/FCR/LUC: `1/15`, `1/10`, `FATOR_TOTAL=.5`, vegetação natural como
  fóssil, resíduo persistido ignorado.
- Validar alocação caller-supplied/negativos/rendimento/cascata/conservação e frete
  `0.1047/0.000029 kgCO2e/tkm`.
- Só após fonte: constraints de área, colheita, rendimento e demais invariantes.

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
