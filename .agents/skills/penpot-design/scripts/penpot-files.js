// Screen files in the GAIA Penpot project, via REST (token: PENPOT_TOKEN in the repo .env). Needs transit-js.
//   node penpot-files.js new "GAIA · Regenerativo"   create a module file linked to the Design System, with its tokens
//   node penpot-files.js sync-tokens                 copy the Design System tokens into every GAIA · * file
//   node penpot-files.js list                        list the project files
const t = require("transit-js");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const TOKEN = fs.readFileSync(path.join(__dirname, "../../../../.env"), "utf8").match(/^PENPOT_TOKEN=(.*)$/m)[1].trim();
const DS = "220f6449-533e-815b-8008-b020a89edaa3";
const PROJECT = "24d9d841-759d-81bc-8008-b1bf91b7bc31";
const FEAT = ["fdata/path-data","plugins/runtime","design-tokens/v1","variants/v1","layout/grid","styles/v2","fdata/objects-map","tokens/numeric-input","render-wasm/v1","components/v2","fdata/shape-data-type"];
const K = (k) => t.keyword(k);
const reader = t.reader("json", { defaultHandler: (tag, rep) => t.tagged(tag, rep) });
const writer = t.writer("json");

const call = (method, body, { sendTransit = false, acceptTransit = false } = {}) => {
  const tmp = path.join(require("os").tmpdir(), `penpot-body-${process.pid}`);
  fs.writeFileSync(tmp, body);
  const out = execFileSync("curl", ["-s", "--retry", "3", "-H", `Authorization: Token ${TOKEN}`, "-H", "User-Agent: gaia-cli",
    "-H", `Accept: ${acceptTransit ? "application/transit+json" : "application/json"}`,
    "-H", `Content-Type: ${sendTransit ? "application/transit+json" : "application/json"}`,
    `https://design.penpot.app/api/main/methods/${method}`, "--data-binary", `@${tmp}`], { maxBuffer: 1 << 30 }).toString();
  fs.unlinkSync(tmp);
  if (acceptTransit) return reader.read(out);
  const res = out ? JSON.parse(out) : null;
  if (res && !Array.isArray(res) && (res.type || res.code) && !res.lagged) throw new Error(`${method}: ${out.slice(0, 1000)}`);
  return res;
};
const json = (method, params) => call(method, JSON.stringify(params));

const update = (fileId, changes) => {
  const f = json("get-file-info", { id: fileId });
  const revn = f.revn ?? json("get-file", { id: fileId }).revn;
  const body = t.map([K("id"), t.uuid(fileId), K("session-id"), t.uuid(crypto.randomUUID()), K("revn"), revn, K("vern"), f.vern || 0,
    K("features"), t.set(FEAT), K("changes"), changes]);
  return call("update-file", writer.write(body), { sendTransit: true });
};
const dsTokens = () => call("get-file", JSON.stringify({ id: DS }), { acceptTransit: true }).get(K("data")).get(K("tokens-lib"));
const setTokens = (fileId, lib) => update(fileId, [t.map([K("type"), K("set-tokens-lib"), K("tokens-lib"), lib])]);
const moduleFiles = () => json("get-project-files", { projectId: PROJECT }).filter((f) => f.name.startsWith("GAIA · "));

const [cmd, name] = process.argv.slice(2);
if (cmd === "new") {
  if (!name || !name.startsWith("GAIA · ")) throw new Error('name must start with "GAIA · "');
  if (moduleFiles().some((f) => f.name === name)) throw new Error("already exists: " + name);
  const f = json("create-file", { name, projectId: PROJECT, features: FEAT });
  json("link-file-to-library", { fileId: f.id, libraryId: DS });
  setTokens(f.id, dsTokens());
  const page = json("get-file", { id: f.id }).data.pages[0];
  update(f.id, [t.map([K("type"), K("mod-page"), K("id"), t.uuid(page), K("name"), "00 Legenda"])]);
  console.log(`created ${name} ${f.id}\nhttps://design.penpot.app/#/workspace?team-id=${f.teamId}&file-id=${f.id}`);
} else if (cmd === "sync-tokens") {
  const lib = dsTokens();
  for (const f of moduleFiles()) { setTokens(f.id, lib); console.log("tokens synced:", f.name); }
} else if (cmd === "list") {
  for (const f of json("get-project-files", { projectId: PROJECT })) console.log(f.id, f.name);
} else {
  console.log("usage: node penpot-files.js new <name> | sync-tokens | list");
}
