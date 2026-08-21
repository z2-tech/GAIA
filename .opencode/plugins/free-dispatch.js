// Free-model dispatch: Zen's free tier rotates without notice (deepseek-v4-flash-free
// was removed mid-sprint and canceled whole agent batches). Any agent whose configured
// model is absent from the catalog is re-pointed to the best free model still listed,
// so plan->build dispatch never dies on a retired model.
// ponytail: reads the models.dev disk cache, never the server — a config-hook HTTP
// call deadlocks CLI subcommands that boot without a server (opencode 1.18.21).
import { readFile } from "node:fs/promises"

const FREE_MODELS = [
  "opencode/big-pickle",
  "opencode/nemotron-3-ultra-free",
  "opencode/hy3-free",
  "opencode/mimo-v2.5-free",
  "opencode/muse-spark-1.2-contributor-free",
]

export const FreeDispatch = async () => {
  return {
    config: async (config) => {
      let catalog = new Set()
      try {
        const cache = `${process.env.XDG_CACHE_HOME || `${process.env.HOME}/.cache`}/opencode/models.json`
        const data = JSON.parse(await readFile(cache, "utf8"))
        for (const [provider, info] of Object.entries(data ?? {})) {
          for (const model of Object.keys(info?.models ?? {})) {
            catalog.add(`${provider}/${model}`)
          }
        }
      } catch {
        return
      }
      if (catalog.size === 0) return
      const fallback = FREE_MODELS.find((model) => catalog.has(model))
      if (!fallback) return
      if (typeof config.model === "string" && !catalog.has(config.model)) {
        console.warn(`[free-dispatch] default model "${config.model}" unavailable, using ${fallback}`)
        config.model = fallback
      }
      for (const [name, agent] of Object.entries(config.agent ?? {})) {
        if (typeof agent?.model !== "string" || catalog.has(agent.model)) continue
        agent.model = fallback
        console.warn(`[free-dispatch] agent "${name}": model unavailable, using ${fallback}`)
      }
    },
  }
}
