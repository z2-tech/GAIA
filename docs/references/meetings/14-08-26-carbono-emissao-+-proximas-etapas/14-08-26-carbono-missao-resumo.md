# Reunião 14/08/2026 — "Carbono Missão" (Resumo)

Fontes:
- `14-08-26-carbono-missao.pdf`
- `carbono-emissao-a4-2.pdf`

---

# 1. Reunião 14/08/2026 — "Carbono Missão"

## 1.1 Simplificações no formulário de Carbono Emissão

### Produto & Cultura
- **Cultura**: remover o nome; **não diferenciar perene/anual** — mesma lista usada no Carbono Remoção, tudo numa categoria só.
- **Montante colhido** → em **toneladas**.
- **Resíduo** → em **toneladas/ha**.
- **Produto** passa a ser **opcional**; é um Select vindo da planilha. Todos os demais campos de produto são **removidos** (calculados automaticamente) e **movidos para a tela de resultados**.

### Solo
- **Analisar os cálculos no backend antes de qualquer mudança** — verificar de onde vêm e o que consomem (carbono, matéria orgânica).
- **Dados do solo → Remover**: carbono orgânico, matéria orgânica e **talhão**.
- Umidade do solo usa textura/clima/drenagem (isso segue usado nos insumos).
- Carbono e matéria orgânica estavam em dúvida → validar contra a planilha LCA.

### Manejo do solo & Mudança de Uso do Solo (LUC)
- Vira **só "Mudança de uso do solo"** (manejo do solo é absorvido).
- Timeline do **manejo atual** para os passados, só com **selects/dropdowns** reutilizando os dados que já existem em "Manejo do solo" (base IPCC).
- **1 campo "Manejo atual"** + **N campos "Manejo anterior + tempo que rolou a mudança"**.
- **Teto rígido de 20 anos** (regra IPCC): recorta o tempo para 20 anos se houver mudanças de manejo; mudanças >20 anos = **emissão zero**.
- Emissões distribuídas **linearmente** pelos anos; bloquear adição de novas caixas ao atingir 20 anos.

### Insumos → "Correção de solo"
- Renomear bloco para **"Correção de solo"**.
- **Matar campos**: FSN, FON, Ureia (passa a ser calculado com base nos fertilizantes selecionados — confirmar se essa info está ligada aos fertilizantes).
- Manter campos em **KG**: calcário calcítico, calcário dolomítico, **gesso agrícola** (confirmar se o gesso é usado no cálculo).

### Fertilizantes
- Garantir que **% de N** seja um atributo do próprio fertilizante.
- Lista alinhada **integralmente** com o Excel da LCA; exibir **"nome - N%"**.
- Unidade de quantidade **selecionável**: kg/ha ou t/ha.
- **Remover**: porcentagem de nutriente, método de aplicação (cobertura/incorporado), "fabricado em" e inibidores de emissão (não alteram o fator de emissão).
- **Nota fiscal → Evidência** (anexo obrigatório).

### Defensivos
- "Concentração" → **"concentração do ingrediente ativo"**.
- Unidades selecionáveis: **kg/ha, g/ha, ml/ha, l/ha**.
- **Matar** campo "categoria" (e descartada a ideia de "área aplicada" — "invenção de moda").
- **Nota fiscal → Evidência**.

### Sementes
- **Adicionar campo de Evidência**.
- Escopo do MVP limitado a **trigo e milho**.

### Combustível
- **Remover rótulo**; comprovante → **Evidência**.

### Energia elétrica
- **Matar rótulo e categoria**; comprovante → **Evidência**.
- Fator de emissão **fixo por MW**, independente da matriz (solar/eólica/biomassa).

### Transporte / Distância
- **Adicionar Evidência**.
- Cálculo: km informado × fator fixo **0,1470** = tonelada de emissão (biodiesel congelado por ora).

---

## 1.2 Integração de clima & localização
- Clima obtido automaticamente do **município/CEP** cadastrado na criação da fazenda — **pré-computado no backend**, usuário não preenche.
- Planilha LCA tem aba por município: clima, silvicultura, estoque de carbono no solo (anterior/atual).
- **MapBiomas** (Brasil + Argentina) considerado um "luxo" para o futuro; projetos globais seguem IPCC.

## 1.3 Mudança estrutural: fazenda → **talhão**
- Base de dados migra do nível **fazenda** para **talhão** (permite comparativo e mapas de biodiversidade).
- Fluxo de telas: **Projeto → Fazenda → Lista de Talhões → Módulos (Emissão, Remoção, Regenerativo)**.
- Manejo homogêneo = 1 talhão; caso contrário, subdivide em múltiplos talhões.
- **Decisão crítica**: migrar para talhão **antes** de receber as novas calculadoras.

## 1.4 Calculadoras de carbono
- Plataforma cobrirá **4 metodologias**: **LCA (ACV), GHG Protocol, 2BSVS e ISCC (SCC)**.
- Renomear "ACV" → **LCA** (termo em inglês).
- Paulo vai refinar as calculadoras e compartilhar com o time.

## 1.5 Módulos futuros (biodiversidade & saúde do solo)
- Entradas: distância do talhão, produtividade, plantas de cobertura, cultura de interesse econômico.
- Índice de **polinização** por talhão; futuramente **interpolar** → mapas de calor.
- **Ilustrações/figurinhas** (abelhas, manejos) — trabalho do **Gabriel**.
- Exportação de relatórios em **PDF**.

## 1.6 Posicionamento & MRV
- Plataforma = **MRV** (Monitoramento, Relato, Verificação), padrões internacionais, auditoria.
- Dor-alvo: **Escopo 3** de grandes corporações (ex.: Itaú).
- Concorrentes: Mais Farm, Regre, Puma, Farm Tool. Diferencial: **multi-indicadora** (carbono + água + biodiversidade + saúde do solo).

## 1.7 i18n & prazos
- Suporte **inglês/português**; validar nomenclatura ao trocar idioma.
- Prazos: ajustar formulário **antes do fim de semana** (testes do João); **segunda-feira** migrar para Remoção + Regenerativo; **1 mês e 7 dias** para plataforma 100% funcional e homologada.
- Agenda Paulo: Alemanha dia 14, Holanda dia 21.

---

# 2. Próximas etapas (com responsáveis)

| Responsável | Tarefa |
|---|---|
| z2 Tech | Simplificar campos de produto (manter só o item principal) |
| z2 Tech | Simplificar campos de solo (manejo atual + histórico) |
| O grupo | Verificar cálculos no backend (dependências carbono/solo) |
| Ruan | Atualizar fertilizantes (lista, remover categoria, unidades + evidência) |
| Ruan | Atualizar defensivos (concentração de ingrediente ativo + unidades) |
| z2 Tech | Adicionar evidência em sementes |
| z2 Tech | Atualizar combustível (remover rótulo, padronizar evidência) |
| O grupo | Integração MapBiomas no MVP |
| z2 Tech | Ajustar formulário antes do fim de semana (testes) |
| Paulo + Ruan | Validar cálculos de remoção/emissão vs. planilha |
| Paulo | Solicitar testes do João (usuário de terceiro) |
| Felipe | Interface de comparação entre fazendas e talhões |
| O grupo | Definir regras de acesso/visualização de usuários |
| Paulo + Ruan | Preparar pitch Holanda |
| Paulo | Enviar conteúdo técnico de biodiversidade/saúde do solo |
| Felipe | **Refatorar estrutura por talhão** (avaliação e cadastro) |
| Paulo | Refinar calculadoras p/ estrutura de talhões |

---

# 3. Checklist de mudanças no PDF "carbono-emissao-a4-2"

- **Etapas**: ao trocar de etapa, iniciar a tela **no topo**.
- **Enviar planilha no WhatsApp (Produto)**.
- **Pré-computar sem as entradas manuais**? (clima/localização).

### Produto & Cultura
- **Cultura**: remover nome; mesma lista do Carbono Remoção (sem diferenciar); montante colhido → toneladas; resíduo → toneladas/ha.
- **Produto**: opcional; Select vindo da planilha; **todos os outros campos removidos**.

### Solo
- **Dados do solo → Remover**: carbono orgânico, matéria orgânica e talhão.

### Manejo do solo & Mudança de Uso do Solo
- Vira só **"Mudança de uso do solo"**.
- Timeline do **manejo atual** para os passados, só com select usando os dados já existentes em "Manejo do solo".
- **1 campo "Manejo atual"** + N campos "Manejo anterior + tempo da mudança".
- **Máximo 20 anos**; recorta para 20 se houver mudanças de manejo.

### Correção de solo
- Matar FSN, FON, Ureia (calcular com base nos fertilizantes selecionados; verificar vínculo).
- Manter em KG: calcário calcítico, calcário dolomítico, **gesso** (confirmar uso nos cálculos).

### Fertilizantes
- Garantir que **%N** é info do fertilizante.
- Lista alinhada com a LCA (excel); exibir "nome - N%".
- Unidade selecionável: kg/ha ou t/ha.
- **Remover**: porcentagem de nutriente, método de aplicação, "fabricado em", inibidores de emissão.
- Nota fiscal → evidência.

### Defensivos
- "Concentração" → "concentração do ingrediente ativo".
- Unidades: kg/ha, g/ha, ml/ha, l/ha.
- Remover categoria.
- Nota fiscal → evidência.

### Sementes
- + evidência.

### Combustível
- Remover rótulo; comprovante → evidência.

### Energia elétrica
- Remover rótulo e categoria; comprovante → evidência.

### Distância
- + evidência.
