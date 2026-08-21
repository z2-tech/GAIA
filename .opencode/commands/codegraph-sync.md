---
description: Refresh every GAIA CodeGraph index and publish the versioned cross-repo snapshot.
---

Execute `./.opencode/bin/codegraph-global-sync.sh` from any directory. It resolves the GAIA root, refreshes both child indexes, updates the live cross-repo shadow, and publishes `.codegraph/codegraph.db`.

On first run it initializes missing indexes. Subsequent runs are incremental; use `--force` only for a full rebuild.

After sync, run `./.opencode/bin/codegraph-global-sync.sh --status` to verify the root snapshot, shadow, API, and Web indexes.
