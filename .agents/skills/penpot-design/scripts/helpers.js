// Penpot MCP helper library for the GAIA design system.
// Paste the whole file as the `code` of one `execute_code` call. It (re)defines
// every helper in `storage` and returns a checklist. Idempotent: safe to re-run.
// Docs: docs/agents/design/penpot.md

const lib = penpot.library.local;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
storage.lib = lib;
storage.sleep = sleep;

storage.tok = (name) => {
  for (const s of lib.tokens.sets) {
    const t = s.tokens.find((t) => t.name === name);
    if (t) return t;
  }
  throw new Error("token " + name);
};
storage.typo = (name) => lib.typographies.find((t) => t.name === name);

// applyToken toggles: re-applying the current token removes it. Always go through bind.
storage.bind = (s, tokName, props) => {
  const cur = s.tokens || {};
  const need = props.filter((p) => cur[p] !== tokName);
  if (need.length) s.applyToken(storage.tok(tokName), need);
  return s;
};
storage.fill = (s, t) => storage.bind(s, t, ["fill"]);
storage.stroke = (s, t, w = 1, align = "inner") => {
  s.strokes = [{ strokeColor: "#000000", strokeWidth: w, strokeAlignment: align, strokeStyle: "solid", strokeOpacity: 1 }];
  return storage.bind(s, t, ["strokeColor"]);
};
storage.radius = (s, t) =>
  storage.bind(s, t, ["borderRadiusTopLeft", "borderRadiusTopRight", "borderRadiusBottomRight", "borderRadiusBottomLeft"]);
storage.shadow = (s, t) => storage.bind(s, t, ["shadow"]);

storage.txt = (content, typoName = "body", colorTok = "foreground") => {
  const t = penpot.createText(content);
  storage.typo(typoName).applyToText(t);
  t.growType = "auto-width";
  storage.fill(t, colorTok);
  return t;
};

// Lucide renders stroke 2 in a 24 viewBox, so a 16px icon draws 1.33.
storage.icon = (name, size = 16, tok = "foreground") => {
  const c = lib.components.find((c) => c.name === name);
  const i = c.instance();
  i.resize(size, size);
  const w = (2 * size) / 24;
  penpotUtils.analyzeDescendants(i, (r, s) => {
    if (s.strokes?.length) {
      s.strokes = s.strokes.map((st) => ({ strokeColor: st.strokeColor, strokeOpacity: 1, strokeStyle: st.strokeStyle, strokeAlignment: st.strokeAlignment, strokeCapStart: st.strokeCapStart, strokeCapEnd: st.strokeCapEnd, strokeWidth: w }));
      s.applyToken(storage.tok(tok), ["strokeColor"]);
    }
  });
  return i;
};

storage.box = (name, dir = "column", gap = 0, px = 0, py = 0) => {
  const b = penpot.createBoard();
  b.name = name;
  b.fills = [];
  const f = b.addFlexLayout();
  f.dir = dir;
  f.rowGap = gap;
  f.columnGap = gap;
  f.horizontalPadding = px;
  f.verticalPadding = py;
  f.horizontalSizing = "auto";
  f.verticalSizing = "auto";
  f.alignItems = "center";
  return b;
};
storage.stack = (name, dir = "column", gap = 8, pad = 0) => {
  const b = storage.box(name, dir, gap, pad, pad);
  b.flex.alignItems = "start";
  return b;
};
storage.add = (parent, ...kids) => {
  for (const k of kids) parent.appendChild(k);
  return parent;
};

storage.findVariant = (n, s) => {
  s = s || penpotUtils.getPageByName("02 Primitives").root;
  if (s.name === n && s.isVariantContainer && s.isVariantContainer()) return s;
  for (const c of s.children || []) {
    const r = storage.findVariant(n, c);
    if (r) return r;
  }
};
storage.V = (n) => storage.findVariant(n, penpotUtils.getPageByName("03 GAIA Components").root) || storage.findVariant(n);
storage.inst = (container, props) => {
  const v = typeof container === "string" ? storage.findVariant(container) || storage.V(container) : container;
  const c = v.variants.variantComponents().find((c) => Object.entries(props).every(([k, val]) => c.variantProps[k] === val));
  if (!c) throw new Error("variant " + JSON.stringify(props));
  return c.instance();
};
storage.comp = (n) => lib.components.find((c) => c.name === n && !(c.isVariant && c.isVariant()));
storage.setText = (shape, str) => {
  const t = penpotUtils.findShape((s) => s.type === "text", shape);
  if (t) t.characters = str;
  return shape;
};
// Penpot rejects empty strings, so null skips a text and false hides it.
storage.texts = (inst, arr) => {
  const ts = penpotUtils.findShapes((s) => s.type === "text", inst);
  arr.forEach((v, i) => {
    if (v === null || !ts[i]) return;
    if (v === false) ts[i].hidden = true;
    else ts[i].characters = v;
  });
  return inst;
};

// Overriding text in an instance keeps the main's box width in the editor (only exports re-measure),
// so buttons with auto width render the new text overflowing. Run after every build step.
storage.fitTexts = (root) => {
  let n = 0;
  for (const t of penpotUtils.findShapes((s) => s.type === "text", root)) {
    const tb = t.textBounds;
    if (!tb || tb.width < 1 || tb.height < 1 || t.width < 1 || t.height < 1) continue;
    if (t.growType === "auto-width" && Math.abs(t.width - tb.width) > 0.5) {
      t.resize(Math.ceil(tb.width), t.height);
      t.growType = "auto-width";
      n++;
    } else if (t.growType === "auto-height" && tb.height - t.height > 0.5) {
      t.resize(t.width, Math.ceil(tb.height));
      t.growType = "auto-height";
      n++;
    }
  }
  return n;
};

storage.variantSet = (name, items) => {
  const comps = items.map((it) => {
    it.board.name = name;
    return lib.createComponent([it.board]);
  });
  const v = penpot.createVariantFromComponents(comps.map((c) => c.mainInstance()));
  v.name = name;
  const keys = Object.keys(items[0].props);
  const vs = v.variants;
  while (vs.properties.length < keys.length) vs.addProperty();
  keys.forEach((k, i) => vs.renameProperty(i, k));
  const byMain = new Map(comps.map((c, i) => [c.id, items[i]]));
  for (const c of vs.variantComponents()) {
    const it = byMain.get(c.id);
    if (it) keys.forEach((k, i) => c.setVariantProperty(i, it.props[k]));
  }
  const f = v.flex || v.addFlexLayout();
  f.dir = "row";
  f.wrap = "wrap";
  f.rowGap = 16;
  f.columnGap = 16;
  f.verticalPadding = 24;
  f.horizontalPadding = 24;
  f.alignItems = "center";
  v.fills = [];
  storage.stroke(v, "border");
  v.borderRadius = 12;
  return v;
};
storage.fitRows = (v, per) => {
  const kids = v.children;
  const rows = [];
  for (let i = 0; i < kids.length; i += per) rows.push(kids.slice(i, i + per));
  const g = v.flex.columnGap, rg = v.flex.rowGap, p = v.flex.horizontalPadding, vp = v.flex.verticalPadding;
  const w = Math.max(...rows.map((r) => r.reduce((a, k) => a + k.width, 0) + g * (r.length - 1)));
  const hs = rows.map((r) => Math.max(...r.map((k) => k.height)));
  v.flex.horizontalSizing = "fix";
  v.flex.verticalSizing = "fix";
  v.resize(2 * p + w + 1, 2 * vp + hs.reduce((a, b) => a + b, 0) + rg * (rows.length - 1));
};
storage.fitAuto = async (v, width) => {
  v.flex.alignItems = "start";
  v.flex.alignContent = "start";
  v.flex.horizontalSizing = "fix";
  v.flex.verticalSizing = "fix";
  v.resize(width, 3000);
  await sleep(800);
  const bottom = Math.max(...v.children.map((c) => c.y + c.height)) - v.y;
  v.resize(width, bottom + v.flex.verticalPadding);
};

storage.findSection = (n) => penpot.currentPage.root.children.find((c) => c.name.replace(/\s/g, "") === n.replace(/\s/g, ""));
storage.section = (title, desc) =>
  storage.add(storage.stack("section/" + title, "column", 16), storage.txt(title, "h1"), storage.txt(desc, "body", "muted-foreground"));
storage.desc = (sec, w = 880) => {
  const d = sec.children[1];
  d.growType = "auto-height";
  d.resize(w, d.height);
  d.growType = "auto-height";
};

// swapComponent keeps the previous icon's child geometry, so fitIcon re-derives it from the main.
storage.fitIcon = (ic, name) => {
  const M = lib.components.find((c) => c.name === name).mainInstance();
  const k = ic.width / M.width;
  const flat = (r) => penpotUtils.analyzeDescendants(r, (root, s) => s).map((x) => x.result);
  const a = flat(ic), b = flat(M);
  if (a.length !== b.length) return "mismatch";
  a.forEach((s, i) => {
    const m = b[i];
    s.resize(Math.max(m.width * k, 0.01), Math.max(m.height * k, 0.01));
    s.x = ic.x + (m.x - M.x) * k;
    s.y = ic.y + (m.y - M.y) * k;
  });
  return "ok";
};
storage.swapIn = async (inst, name, tok) => {
  const find = () => penpotUtils.findShape((s) => s.name.startsWith("icon /"), inst);
  let ic = find();
  const size = ic.width;
  ic.swapComponent(lib.components.find((c) => c.name === name));
  await sleep(200);
  ic = find();
  if (Math.round(ic.width) !== Math.round(size)) ic.resize(size, size);
  storage.fitIcon(ic, name);
  const w = (2 * size) / 24;
  penpotUtils.analyzeDescendants(ic, (r, s) => {
    if (s.strokes?.length)
      s.strokes = s.strokes.map((st) => ({ strokeColor: st.strokeColor, strokeOpacity: 1, strokeStyle: st.strokeStyle, strokeAlignment: st.strokeAlignment, strokeCapStart: st.strokeCapStart, strokeCapEnd: st.strokeCapEnd, strokeWidth: w }));
  });
  await sleep(100);
  penpotUtils.analyzeDescendants(ic, (r, s) => {
    if (s.strokes?.length) s.applyToken(storage.tok(tok), ["strokeColor"]);
  });
  return ic;
};

// Hover overlay for "bg-x/90" style states (fill opacity does not survive tokens).
storage.layer = (b, tok, op) => {
  const r = penpot.createRectangle();
  r.name = "state-layer";
  b.appendChild(r);
  r.layoutChild.absolute = true;
  r.resize(b.width, b.height);
  penpotUtils.setParentXY(r, 0, 0);
  r.constraintsHorizontal = "leftright";
  r.constraintsVertical = "topbottom";
  storage.fill(r, tok);
  r.opacity = op;
  return r;
};

storage.ring = (size, stroke, pct, tok, trackTok = "muted") => {
  const b = penpot.createBoard();
  b.name = "ring";
  b.fills = [];
  b.resize(size, size);
  const r = (size - stroke) / 2, c = size / 2;
  const t = penpot.createEllipse();
  t.name = "track";
  b.appendChild(t);
  t.resize(size - stroke, size - stroke);
  penpotUtils.setParentXY(t, stroke / 2, stroke / 2);
  t.fills = [];
  t.strokes = [{ strokeColor: "#000000", strokeWidth: stroke, strokeAlignment: "center", strokeStyle: "solid", strokeOpacity: 1 }];
  storage.bind(t, trackTok, ["strokeColor"]);
  if (pct > 0) {
    const a = Math.min(pct, 0.999) * 2 * Math.PI;
    const x = b.x + c + r * Math.sin(a), y = b.y + c - r * Math.cos(a);
    const p = penpot.createPath();
    p.name = "progress";
    p.content = `M ${b.x + c} ${b.y + c - r} A ${r} ${r} 0 ${pct > 0.5 ? 1 : 0} 1 ${x} ${y}`;
    p.fills = [];
    p.strokes = [{ strokeColor: "#000000", strokeWidth: stroke, strokeAlignment: "center", strokeStyle: "solid", strokeOpacity: 1, strokeCapStart: "round", strokeCapEnd: "round" }];
    storage.bind(p, tok, ["strokeColor"]);
    b.appendChild(p);
  }
  return b;
};

// Re-applying a token right after reassigning strokes toggles it off; this rebinds by resolved hex. Logos keep brand hex.
storage.repairIcons = async (root) => {
  const map = { "#212123": "foreground", "#737478": "muted-foreground", "#0d6afe": "primary", "#ffffff": "primary-foreground", "#d02b30": "destructive", "#b6b8be": "sidebar-muted-foreground", "#0e6636": "success-subtle-foreground", "#a21a20": "destructive-subtle-foreground" };
  const inLogo = (s) => { let a = s; while (a) { if (a.name?.startsWith("logo")) return true; a = a.parent; } return false; };
  let n = 0;
  for (const s of penpotUtils.findShapes((s) => (s.strokes || []).length && !(s.tokens || {}).strokeColor && !inLogo(s), root)) {
    const t = map[s.strokes[0].strokeColor.toLowerCase()];
    if (t) { s.applyToken(storage.tok(t), ["strokeColor"]); n++; }
  }
  await sleep(300);
  for (const s of penpotUtils.findShapes((s) => s.name.startsWith("svg-") && (s.fills || []).some((f) => f.fillColor) && !(s.tokens || {}).fill && (s.tokens || {}).strokeColor && !inLogo(s), root)) {
    s.applyToken(storage.tok(s.tokens.strokeColor), ["fill"]);
    n++;
  }
  return n;
};

storage.audit = (root) =>
  penpotUtils
    .findShapes((s) => {
      let a = s;
      while (a) { if (a.name?.startsWith("logo")) return false; a = a.parent; }
      if (s.name === "state-layer" && s.tokens?.fill) return false;
      const t = s.tokens || {};
      return ((s.fills || []).some((x) => x.fillColor) && !t.fill) || ((s.strokes || []).length && !t.strokeColor);
    }, root)
    .map((s) => `${s.parent?.parent?.name}>${s.parent?.name}>${s.name}:${(s.fills || []).map((f) => f.fillColor)}|${(s.strokes || []).map((f) => f.strokeColor)}`);

storage.user = { name: "Maria Silva", email: "maria@fazenda.com.br", initials: "MS" };
storage.screen = (name, { title, back = false, active = "projects" }) => {
  const box = storage.box;
  const f = box(name, "row", 0, 0, 8);
  f.flex.rightPadding = 8;
  f.flex.leftPadding = 0;
  f.flex.alignItems = "stretch";
  f.flex.horizontalSizing = "fix";
  f.flex.verticalSizing = "fix";
  f.resize(1440, 900);
  storage.fill(f, "sidebar");
  f.clipContent = true;
  const sb = storage.inst("Sidebar", { state: "expanded", active });
  f.appendChild(sb);
  sb.layoutChild.verticalSizing = "fill";
  storage.texts(penpotUtils.findShape((s) => s.name === "User", sb), [storage.user.name, storage.user.email]);
  storage.texts(penpotUtils.findShape((s) => s.name === "Avatar", sb), [storage.user.initials]);
  const inset = box("Inset", "column", 0);
  inset.flex.alignItems = "stretch";
  storage.radius(inset, "radius.xl");
  storage.fill(inset, "muted");
  inset.clipContent = true;
  f.appendChild(inset);
  inset.layoutChild.horizontalSizing = "fill";
  inset.layoutChild.verticalSizing = "fill";
  const hd = storage.inst(storage.V("AppHeader"), { back: back ? "yes" : "no" });
  inset.appendChild(hd);
  hd.layoutChild.horizontalSizing = "fill";
  hd.children.find((k) => k.type === "text").characters = title;
  for (const k of hd.children) if (k.name === "Actions" || k.name === "BadgeScore") k.hidden = true;
  const content = box("Content", "column", 24, 24, 24);
  content.flex.alignItems = "stretch";
  inset.appendChild(content);
  content.layoutChild.horizontalSizing = "fill";
  content.layoutChild.verticalSizing = "fill";
  return { f, content, inset };
};

storage.plot = { farm: "Fazenda Boa Vista", name: "Talhão 02", area: "38,2 ha", date: "12/03/2025", pct: "64%" };
// Plot shell (lotes 07-10): header border hidden so header + line tabs read as one block.
storage.plotScreen = (name, { active = "Dados gerais", title = true } = {}) => {
  const S = storage;
  const { f, content, inset } = S.screen(name, { title: S.plot.farm + " - " + S.plot.name, back: true, active: "projects" });
  const hd = inset.children.find((k) => k.name === "AppHeader");
  hd.children.find((k) => k.name === "BadgeScore").hidden = false;
  hd.children.find((k) => k.name === "BadgeScore").switchVariant(0, "mid");
  const bs = hd.children.find((k) => k.name === "BadgeScore");
  S.setText(bs, S.plot.pct);
  hd.children.find((k) => k.name === "border-b").hidden = true;
  const tabs = S.box("PlotTabs", "column", 0);
  tabs.flex.alignItems = "stretch";
  S.fill(tabs, "background");
  const row = S.box("Tabs", "row", 16, 24, 0);
  row.flex.alignItems = "end";
  for (const l of ["Dados gerais", "Carbono emissão", "Carbono remoção", "Regenerativo"]) {
    const t = S.inst("Tab", { variant: "line", state: l === active ? "active" : "inactive" });
    S.setText(t, l);
    row.appendChild(t);
  }
  tabs.appendChild(row);
  row.layoutChild.horizontalSizing = "fill";
  const sp = S.inst("Separator", { orientation: "horizontal" });
  tabs.appendChild(sp);
  sp.layoutChild.horizontalSizing = "fill";
  inset.insertChild(1, tabs);
  tabs.layoutChild.horizontalSizing = "fill";
  if (!title) {
    hd.children.find((k) => k.type === "text").characters = " ";
    bs.hidden = true;
  }
  return { f, content, inset, hd, tabs };
};

storage.listHeader = (content, title, placeholder, action) => {
  const box = storage.box;
  const r = box("ListHeader", "row", 16);
  r.appendChild(storage.txt(title, "h2", "foreground"));
  const s = storage.inst("Input Group", { addon: "icon", content: "placeholder" });
  storage.setText(s, placeholder);
  s.resize(360, 36);
  r.appendChild(s);
  const sp = box("spacer", "row");
  sp.flex.verticalSizing = "fix";
  sp.resize(1, 1);
  r.appendChild(sp);
  sp.layoutChild.horizontalSizing = "fill";
  if (action) {
    const b = storage.inst("Button", { variant: "default", size: "default", state: "default" });
    storage.setText(b, action);
    r.appendChild(b);
  }
  content.appendChild(r);
  r.layoutChild.horizontalSizing = "fill";
  return r;
};

storage.panel = (title, w, desc) => {
  const box = storage.box;
  const p = box("Dialog", "column", 24, 24, 24);
  p.flex.alignItems = "stretch";
  p.flex.horizontalSizing = "fix";
  p.resize(w, 100);
  p.flex.verticalSizing = "auto";
  storage.fill(p, "background");
  storage.stroke(p, "border");
  storage.radius(p, "radius.lg");
  storage.shadow(p, "shadow.lg");
  const x = storage.icon("x", 16, "muted-foreground");
  p.appendChild(x);
  x.layoutChild.absolute = true;
  penpotUtils.setParentXY(x, w - 32, 16);
  x.opacity = 0.7;
  const h = box("Header", "column", 8);
  h.flex.alignItems = "start";
  h.appendChild(storage.txt(title, "h2", "foreground"));
  if (desc) h.appendChild(storage.txt(desc, "body", "muted-foreground"));
  p.appendChild(h);
  h.layoutChild.horizontalSizing = "fill";
  return p;
};
storage.fsec = (p, legend) => {
  const s = storage.box(legend || "Section", "column", 12);
  s.flex.alignItems = "stretch";
  if (legend) s.appendChild(storage.txt(legend, "h3", "foreground"));
  p.appendChild(s);
  s.layoutChild.horizontalSizing = "fill";
  return s;
};
storage.row2 = (s, a, b) => {
  const r = storage.box("Row", "row", 16);
  r.flex.alignItems = "start";
  r.appendChild(a);
  a.layoutChild.horizontalSizing = "fill";
  if (b) { r.appendChild(b); b.layoutChild.horizontalSizing = "fill"; }
  s.appendChild(r);
  r.layoutChild.horizontalSizing = "fill";
  return r;
};
storage.field = (label, value, { control = "input", state = "default", content = "filled", help = null } = {}) => {
  const f = storage.inst(storage.V("FormField"), { control, state: "default" });
  const ctl = penpotUtils.findShape((s) => ["Input", "Select Trigger", "Textarea", "Input Group"].includes(s.name), f);
  if (control === "input" && (state !== "default" || content !== "filled")) { ctl.switchVariant(0, state); ctl.switchVariant(1, content); }
  if (["select", "password", "unit", "date", "textarea"].includes(control) && content !== "filled") ctl.switchVariant(1, content);
  const ts = penpotUtils.findShapes((s) => s.type === "text", f);
  ts[0].characters = label;
  if (value !== null) ts[control === "unit" ? 1 : ts.length - 2].characters = value;
  if (help) ts[ts.length - 1].characters = help;
  else ts[ts.length - 1].hidden = true;
  return f;
};
storage.footer = (p, a, b) => {
  const r = storage.box("Footer", "row", 8);
  r.flex.justifyContent = "end";
  for (const [v, l] of [a, b]) {
    const x = storage.inst("Button", { variant: v, size: "default", state: "default" });
    storage.setText(x, l);
    r.appendChild(x);
  }
  p.appendChild(r);
  r.layoutChild.horizontalSizing = "fill";
};
// Absolute children of a resized MapPlaceholder instance ignore constraints; re-derive them from the main.
storage.fitMap = (m) => {
  const M = m.component().mainInstance();
  const W = M.width, H = M.height, w = m.width, h = m.height;
  m.children.forEach((k, i) => {
    const mk = M.children[i];
    if (!k.layoutChild?.absolute || !mk || mk.name !== k.name) return;
    const rx = mk.x - M.x, ry = mk.y - M.y;
    if (k.name === "Zoom") penpotUtils.setParentXY(k, w - (W - rx), ry);
    else if (k.name === "DrawToolbar") penpotUtils.setParentXY(k, rx, ry);
    else penpotUtils.setParentXY(k, rx + (w - W) / 2, ry + (h - H) / 2);
  });
};
// Flex frames ignore array order for overlap; zIndex keeps scrim and panel on top.
storage.withDialog = (f, panel) => {
  const s = penpot.createRectangle();
  s.name = "scrim";
  f.appendChild(s);
  s.layoutChild.absolute = true;
  s.resize(1440, 900);
  penpotUtils.setParentXY(s, 0, 0);
  storage.fill(s, "foreground");
  s.opacity = 0.5;
  f.appendChild(panel);
  panel.layoutChild.absolute = true;
  s.layoutChild.zIndex = 10;
  panel.layoutChild.zIndex = 11;
};

// Screen pages: a "Legenda" board on top and one "Fluxo NN — <nome>" board per flow, frames tagged with FlowTag.
storage.flowSection = (n, title, desc, items) => {
  const S = storage;
  const nn = String(n).padStart(2, "0");
  const sec = S.box("Fluxo " + nn + " — " + title, "column", 64, 80, 80);
  sec.flex.alignItems = "start";
  S.fill(sec, "background");
  S.stroke(sec, "border", 2);
  S.radius(sec, "radius.xl");
  const hd = S.stack("Header", "column", 12);
  hd.appendChild(S.txt("Fluxo " + nn, "doc-title", "primary"));
  hd.appendChild(S.txt(title, "doc-display", "foreground"));
  hd.appendChild(S.txt(desc, "doc-body", "muted-foreground"));
  sec.appendChild(hd);
  const row = S.box("Telas", "row", 120);
  row.flex.alignItems = "start";
  sec.appendChild(row);
  for (const [name, kind] of items) {
    const f = penpot.root.children.find((c) => c.name === name);
    if (!f) throw new Error("frame " + name);
    const col = S.stack("Tela", "column", 24);
    const lab = S.box("Label", "row", 16);
    lab.appendChild(S.inst(S.V("FlowTag"), { kind }));
    lab.appendChild(S.txt(name, "doc-title", "foreground"));
    col.appendChild(lab);
    col.appendChild(f);
    row.appendChild(col);
  }
  return sec;
};
storage.pageLegend = (title, desc) => {
  const S = storage;
  const b = S.box("Legenda", "column", 32, 80, 64);
  b.flex.alignItems = "start";
  S.fill(b, "background");
  S.stroke(b, "border", 2);
  S.radius(b, "radius.xl");
  b.appendChild(S.txt(title, "doc-display", "foreground"));
  b.appendChild(S.txt(desc, "doc-body", "muted-foreground"));
  const r = S.box("Tags", "row", 48);
  const kinds = [["principal", "estado padrão da tela"], ["carregando", "dados ou ação em andamento"], ["erro", "falha de carga, ação ou validação"], ["sucesso", "retorno positivo"], ["vazio", "resposta sem itens"], ["dialog", "sobreposição na tela"]];
  for (const [k, t] of kinds) {
    const it = S.box("Item", "row", 16);
    it.appendChild(S.inst(S.V("FlowTag"), { kind: k }));
    it.appendChild(S.txt(t, "doc-body", "muted-foreground"));
    r.appendChild(it);
  }
  b.appendChild(r);
  return b;
};
// Heights settle only after layout and fitTexts; run again after any text change or the boards overlap.
storage.restack = async () => {
  await sleep(600);
  const lg = penpot.root.children.find((c) => c.name === "Legenda");
  const secs = penpot.root.children.filter((c) => c.name.startsWith("Fluxo")).sort((a, b) => a.name.localeCompare(b.name));
  let y = lg ? lg.height + 240 : 0;
  for (const s of secs) { s.x = 0; s.y = y; y += s.height + 240; }
};

return {
  page: penpot.currentPage.name,
  pages: penpotUtils.getPages().map((p) => p.name),
  tokens: lib.tokens.sets.map((s) => `${s.name}:${s.tokens.length}`),
  typographies: lib.typographies.length,
  helpers: Object.keys(storage).length,
};
