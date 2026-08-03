---
description: Refresh GAIA's cross-repo CodeGraph shadow and report its status.
---

Execute `./.opencode/bin/codegraph-global-sync.sh` to sync the shadow global CodeGraph index, then verify status.

On first run or if shadow workspace missing, the script will init a new `.codegraph/` index. On subsequent runs, it syncs incrementally.

After sync, run: `codegraph status "/tmp/opencode/shadow-codegraph-gaia"` to confirm files/nodes/edges are up to date.

If `Pending Changes: Added: N` persists with 0 nodes after sync, treat as noise from SQLite WAL/SHM in `.codegraph/` — index is current.
