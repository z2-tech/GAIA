#!/usr/bin/env bash
set -euo pipefail
# free-dispatcher.sh — Dynamic free model ranking + agent audit for build mode
# Uso: .opencode/bin/free-dispatcher.sh [--fix] [--json]
#   --fix   reescreve pins defasados para o free top (maior ctx, cost 0)
#   --json  saída machine-readable
#
# Regra: orchestrator/plan = user's pick (sem model: no frontmatter) → herda sessão
#        workers = pinned free (com model: explicit) → custo zero
#
# O script é a fonte dinâmica do ranking — não hardcodar lista em AGENTS.md.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/../.." && pwd)"
FIX=false
JSON=false
for arg in "$@"; do
  case "$arg" in
    --fix) FIX=true ;;
    --json) JSON=true ;;
  esac
done

# 1. Descoberta de agents
AGENTS_DIR="$REPO_ROOT/.opencode/agents"
if [[ ! -d "$AGENTS_DIR" ]]; then
  echo "Agents dir not found: $AGENTS_DIR" >&2; exit 1
fi

# 2. Ranking dinâmico dos free models (cost.input==0)
# Usa opencode models opencode --verbose e filtra cost.input==0
if ! command -v opencode >/dev/null 2>&1; then
  echo "opencode not in PATH" >&2; exit 1
fi

FREE_JSON=$(opencode models opencode --verbose 2>&1 | awk '
  /^opencode\//{hdr=$1; buf=""}
  /^\{$/{injson=1; buf=$0; next}
  injson{buf=buf"\n"$0}
  /^\}$/{injson=0; print hdr"\n"buf}
')
# Fallback simples se parsing falhar: lista conhecida
if ! echo "$FREE_JSON" | grep -q '"cost"'; then
  echo "WARN: verbose parsing failed, using fallback list" >&2
  FREE_JSON=""
fi

# Parse com python3 para ranking robusto
BEST_MODEL=$(python3 -c "
import subprocess, json, re, sys
try:
    out = subprocess.check_output(['opencode','models','opencode','--verbose'], text=True, stderr=subprocess.STDOUT)
except Exception as e:
    print('opencode/muse-spark-1.2-contributor-free')
    sys.exit(0)
import re
parts = re.split(r'(opencode/[^\n]+)', out)
infos=[]
for i in range(1,len(parts),2):
    h=parts[i].strip()
    b=parts[i+1] if i+1 < len(parts) else ''
    try:
        j=json.loads(b.strip())
        if j.get('cost',{}).get('input')==0:
            infos.append((h, j['limit']['context'], j['limit']['output']))
    except: pass
if not infos:
    print('opencode/muse-spark-1.2-contributor-free')
else:
    infos=sorted(infos, key=lambda x: (x[1],x[2]), reverse=True)
    print(infos[0][0])
" 2>/dev/null)

if [[ -z "$BEST_MODEL" ]]; then
  BEST_MODEL="opencode/muse-spark-1.2-contributor-free"
fi

# Coleta info dos agents
TMP_AGENTS=$(mktemp)
for f in "$AGENTS_DIR"/*.md; do
  [[ -f "$f" ]] || continue
  name=$(grep -m1 "^name:" "$f" | cut -d: -f2 | xargs 2>/dev/null || true); [[ -z "$name" ]] && name="$(basename "$f" .md)"
  desc=$(grep -m1 "^description:" "$f" | cut -d: -f2- | xargs 2>/dev/null | cut -c1-90 || true); [[ -z "$desc" ]] && desc=""
  model=$(grep -m1 "^model:" "$f" | cut -d: -f2- | xargs 2>/dev/null || true); [[ -z "$model" ]] && model="(inherit)"
  [[ -z "$model" ]] && model="(inherit — user's pick)"
  printf "%s|%s|%s\n" "$name" "$model" "$desc" >> "$TMP_AGENTS"
done

if $JSON; then
  python3 -c "
import subprocess, json, re, pathlib
import subprocess, json, re
out = subprocess.check_output(['opencode','models','opencode','--verbose'], text=True, stderr=subprocess.STDOUT)
parts = re.split(r'(opencode/[^\n]+)', out)
free=[]
for i in range(1,len(parts),2):
    h=parts[i].strip()
    b=parts[i+1] if i+1 < len(parts) else ''
    try:
        j=json.loads(b.strip())
        if j.get('cost',{}).get('input')==0:
            free.append({'model':h,'context':j['limit']['context'],'output':j['limit']['output'],'toolcall':j['capabilities']['toolcall'],'attachment':j['capabilities']['attachment']})
    except: pass
free=sorted(free, key=lambda x: (x['context'],x['output']), reverse=True)
agents=[]
import pathlib
for p in pathlib.Path('$AGENTS_DIR').glob('*.md'):
    txt=p.read_text()
    import re
    name=re.search(r'^name:\s*(.+)\$', txt, re.M)
    desc=re.search(r'^description:\s*(.+)\$', txt, re.M)
    model=re.search(r'^model:\s*(.+)\$', txt, re.M)
    agents.append({'name': name.group(1).strip() if name else p.stem, 'model': model.group(1).strip() if model else None, 'description': (desc.group(1).strip()[:90] if desc else '')})
print(json.dumps({'best_free': '$BEST_MODEL','free_ranking': free,'agents': agents}, indent=2, ensure_ascii=False))
"
  rm -f "$TMP_AGENTS"
  exit 0
fi

echo "=== Free Dispatcher — $(basename "$REPO_ROOT") ==="
echo "Agents dir: $AGENTS_DIR ($(wc -l < "$TMP_AGENTS") agents)"
echo ""
echo "--- Agents disponíveis (discovery) ---"
printf "%-28s %-45s %s\n" "AGENT" "MODEL" "DESCRIPTION"
printf "%-28s %-45s %s\n" "-----" "-----" "-----------"
while IFS='|' read -r name model desc; do
  printf "%-28s %-45s %s\n" "$name" "$model" "$desc"
done < "$TMP_AGENTS"
echo ""

echo "--- Ranking free dinâmico (opencode models opencode --verbose | cost==0) ---"
python3 -c "
import subprocess, json, re
out = subprocess.check_output(['opencode','models','opencode','--verbose'], text=True, stderr=subprocess.STDOUT)
parts = re.split(r'(opencode/[^\n]+)', out)
infos=[]
for i in range(1,len(parts),2):
    h=parts[i].strip()
    b=parts[i+1] if i+1 < len(parts) else ''
    try:
        j=json.loads(b.strip())
        if j.get('cost',{}).get('input')==0:
            infos.append((h, j['limit']['context'], j['limit']['output'], j['capabilities']['toolcall'], j['capabilities']['attachment']))
    except: pass
infos=sorted(infos, key=lambda x: (x[1],x[2]), reverse=True)
print(f\"{'#':<2} {'MODEL':<45} {'CTX':<7} {'OUT':<6} {'tool':<5} {'attach':<6}\")
for i,(h,ctx,out,tc,att) in enumerate(infos,1):
    mark=' ← BEST' if h=='$BEST_MODEL' else ''
    print(f\"{i:<2} {h:<45} {ctx:<7} {out:<6} {str(tc):<5} {str(att):<6}{mark}\")
" 2>&1

echo ""
echo "BEST_FREE=$BEST_MODEL"
echo ""

# 3. Audit pins
echo "--- Audit pins (workers devem ter model == BEST_FREE; orchestrators herdam) ---"
NEEDS_FIX=0
while IFS='|' read -r name model desc; do
  if [[ "$model" == "(inherit"* ]]; then
    echo "  $name: inherit (orchestrator/plan — OK, usa user's pick)"
  elif [[ "$model" == "$BEST_MODEL" ]]; then
    echo "  $name: $model  ✓ pinned correto"
  else
    echo "  $name: $model  ✗ defasado (esperado $BEST_MODEL)"
    NEEDS_FIX=$((NEEDS_FIX+1))
  fi
done < "$TMP_AGENTS"

if [[ $NEEDS_FIX -gt 0 ]]; then
  echo ""
  echo "Pins defasados: $NEEDS_FIX"
  if $FIX; then
    echo "Fix mode: reescrevendo pins para $BEST_MODEL ..."
    for f in "$AGENTS_DIR"/*.md; do
      if grep -q "^model:" "$f"; then
        # só reescreve se for free antigo diferente do best
        cur=$(grep -m1 "^model:" "$f" | cut -d: -f2- | xargs)
        if [[ "$cur" != "$BEST_MODEL" ]]; then
          # verifica se é um free conhecido (evita sobrescrever pago intencional)
          if echo "$cur" | grep -q "opencode/"; then
            sed -i "s|^model:.*|model: $BEST_MODEL|g" "$f"
            echo "  fixed $(basename "$f"): $cur → $BEST_MODEL"
          fi
        fi
      fi
    done
    echo "Fix concluído."
  else
    echo "Rode com --fix para corrigir automaticamente, ou edite .opencode/agents/*.md"
  fi
else
  echo "Todos os workers já no BEST_FREE. Nenhum fix necessário."
fi

rm -f "$TMP_AGENTS"
echo ""
echo "Regra build: usuario escolhe model (session) → plan → em build, rodar este script para buscar base de agents + ranking free → dispatch paralelo com BEST_FREE."
