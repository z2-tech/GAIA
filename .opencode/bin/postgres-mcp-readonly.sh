#!/usr/bin/env bash
# =============================================================================
# Postgres MCP (restricted / read-only) — pinned postgres-mcp via uvx
# =============================================================================
# Reads ONLY the needed keys from <repo root>/.env.mcp.local (see
# .env.mcp.local.example): POSTGRES_HOST/PORT/DB/USER/PASSWORD (DB_HOST/PORT/NAME/USERNAME/PASSWORD also accepted).
# Host/port fall back to localhost/5432. The password is URL-encoded.
# Access mode is "restricted" (read-only) by default; POSTGRES_MCP_ACCESS_MODE=unrestricted
# allows writes and needs explicit confirmation from the responsible developer.
# Requires: uvx (https://docs.astral.sh/uv/) and python3.
#
# Usage: ./.opencode/bin/postgres-mcp-readonly.sh
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/mcp-common.sh"

command -v uvx >/dev/null 2>&1 || { echo "Error: uvx not found in PATH (install uv: https://docs.astral.sh/uv/)." >&2; exit 1; }

host="$(env_first POSTGRES_HOST DB_HOST || printf 'localhost')"
port="$(env_first POSTGRES_PORT DB_PORT || printf '5432')"
name="$(env_require POSTGRES_DB DB_NAME)"
user="$(env_require POSTGRES_USER DB_USERNAME)"
password="$(env_first POSTGRES_PASSWORD DB_PASSWORD || true)"
mode="$(env_first POSTGRES_MCP_ACCESS_MODE || printf 'restricted')"

if [[ "${mode}" != "restricted" ]]; then
  printf '⚠️  Postgres MCP em modo %s: escrita permitida. Confirme com o desenvolvedor antes de qualquer alteração.\n' "${mode}" >&2
fi

export DATABASE_URI="postgresql://$(urlencode "${user}"):$(urlencode "${password}")@${host}:${port}/${name}"
echo "Starting Postgres MCP (${mode}) — ${host}:${port}/${name}" >&2
run_postgres_mcp --access-mode "${mode}"
