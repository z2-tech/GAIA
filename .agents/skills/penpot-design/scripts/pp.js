// Calls the Penpot MCP server over Streamable HTTP, bypassing the MCP client. Default: the cloud MCP
// configured as "penpot" in ~/.claude.json (auto-connects in every open file); PP_LOCAL=1 uses the local npx @penpot/mcp server.
//   node pp.js <file.js> [more.js ...]   run each file as its own execute_code, in order
//   node pp.js -e "<code>"               run inline code
//   node pp.js --export <shapeId> <out.png>
//   PP_LOCAL=1 node pp.js ...            talk to the local server (localhost:4401) instead
const fs = require("fs");
// The cloud URL carries the user token: read it from the config, never print it.
const cloudUrl = () => { const cfg = JSON.parse(fs.readFileSync(require("os").homedir() + "/.claude.json", "utf8")); for (const p of Object.values(cfg.projects || {})) { const u = p.mcpServers?.penpot?.url; if (u && u.startsWith("https://")) return u; } throw new Error("cloud penpot MCP not configured"); };
const URL = process.env.PENPOT_MCP_URL || (process.env.PP_LOCAL ? "http://localhost:4401/mcp" : cloudUrl());
let session;

const rpc = async (method, params, id) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", ...(session && { "mcp-session-id": session }) },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, ...(id !== undefined && { id }) }),
  });
  session = res.headers.get("mcp-session-id") || session;
  const text = await res.text();
  if (!text) return null;
  const data = text.startsWith("{") ? text : text.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5)).pop();
  return JSON.parse(data);
};

(async () => {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "pp", version: "1" } }, 1);
  await rpc("notifications/initialized", {});
  const [a, b, c] = process.argv.slice(2);
  if (a === "--export") {
    const r = await rpc("tools/call", { name: "export_shape", arguments: { shapeId: b, format: "png" } }, 2);
    const img = r.result?.content?.find((x) => x.type === "image");
    if (!img) return console.log(JSON.stringify(r, null, 1));
    fs.writeFileSync(c, Buffer.from(img.data, "base64"));
    return console.log("saved " + c);
  }
  const codes = a === "-e" ? [b] : process.argv.slice(2).map((f) => fs.readFileSync(f, "utf8"));
  // The cloud MCP reports "suspended" when the tab's heartbeat lapses after idling; it recovers on its own, so retry.
  for (const code of codes) {
    let out;
    for (let i = 0; i < 12; i++) {
      const r = await rpc("tools/call", { name: "execute_code", arguments: { code } }, 2);
      out = r.result?.content?.map((x) => x.text).join("\n") ?? JSON.stringify(r.error ?? r);
      if (!/suspended by the browser/.test(out)) break;
      await new Promise((res) => setTimeout(res, 5000));
    }
    console.log(out);
  }
})();
