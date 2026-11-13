#!/usr/bin/env bash
# Shared helpers for the MCP launchers. Credentials live in the machine-local
# <repo root>/.env.mcp.local (gitignored); a launcher reads only the keys it needs,
# so nothing else reaches the MCP process environment.

MCP_BIN_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
MCP_ENV_FILE="${MCP_ENV_FILE:-$(dirname -- "$(dirname -- "${MCP_BIN_DIR}")")/.env.mcp.local}"

# env_value KEY: value from $MCP_ENV_FILE; falls back to the process environment.
env_value() {
  local key="$1" line value first last
  if [[ -f "${MCP_ENV_FILE}" ]]; then
    while IFS= read -r line || [[ -n "${line}" ]]; do
      line="${line%$'\r'}"
      [[ "${line}" == "${key}="* ]] || continue
      value="${line#*=}"
      if (( ${#value} >= 2 )); then
        first="${value:0:1}"
        last="${value: -1}"
        [[ ( "${first}" == '"' && "${last}" == '"' ) || ( "${first}" == "'" && "${last}" == "'" ) ]] && value="${value:1:${#value}-2}"
      fi
      printf '%s' "${value}"
      return 0
    done < "${MCP_ENV_FILE}"
  fi
  [[ -n "${!key:-}" ]] || return 1
  printf '%s' "${!key}"
}

# env_first KEY...: value of the first non-empty KEY.
env_first() {
  local key value
  for key in "$@"; do
    if value="$(env_value "${key}")" && [[ -n "${value}" ]]; then
      printf '%s' "${value}"
      return 0
    fi
  done
  return 1
}

# env_require KEY...: like env_first, but stops the launcher when every KEY is missing.
env_require() {
  env_first "$@" && return 0
  printf 'Missing %s in %s (see .env.mcp.local.example).\n' "$*" "${MCP_ENV_FILE}" >&2
  return 1
}

run_postgres_mcp() {
  # postgres-mcp 0.3.0 imports FastMCP from the pre-2.0 Python SDK and pins
  # pglast==7.2.0, which is no longer published on PyPI (see overrides file).
  exec uvx --from 'postgres-mcp==0.3.0' --with 'mcp>=1.5,<2' \
    --overrides "${MCP_BIN_DIR}/postgres-mcp-overrides.txt" postgres-mcp "$@"
}

urlencode() {
  python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$1"
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  set -euo pipefail
  fixture="$(mktemp)"
  trap 'rm -f "${fixture}"' EXIT
  printf '%s\n' 'MCP_TEST=$!@host=ok' 'MCP_QUOTED="value with spaces"' 'MCP_EMPTY=' > "${fixture}"
  MCP_ENV_FILE="${fixture}"
  [[ "$(env_value MCP_TEST)" == '$!@host=ok' ]]
  [[ "$(env_value MCP_QUOTED)" == 'value with spaces' ]]
  [[ "$(env_first MCP_EMPTY MCP_QUOTED)" == 'value with spaces' ]]
  if env_value MCP_ABSENT >/dev/null; then exit 1; fi
  [[ "$(MCP_ABSENT=from-process env_value MCP_ABSENT)" == 'from-process' ]]
  [[ "$(urlencode "$(env_value MCP_TEST)")" == '%24%21%40host%3Dok' ]]
  printf 'mcp-common self-test: ok\n'
fi
