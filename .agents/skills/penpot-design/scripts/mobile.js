// Mobile helpers (DS - Mobile and GAIA Mobile · * files). Load after helpers.js: node pp.js helpers.js mobile.js
const S = storage;

S.fixw = (b, w) => { b.flex.horizontalSizing = "fix"; b.resize(w, Math.max(b.height, 1)); b.flex.verticalSizing = "auto"; return b; };
S.fixed = (b, w, h) => { b.flex.horizontalSizing = "fix"; b.flex.verticalSizing = "fix"; b.resize(w, h); return b; };
S.wrap = (t) => { t.growType = "auto-height"; if (t.layoutChild) t.layoutChild.horizontalSizing = "fill"; return t; };
S.chip = (ic, tone, size = 40) => { const c = S.box("Chip", "row", 0); S.fixed(c, size, size); c.flex.justifyContent = "center"; S.fill(c, tone + "-subtle"); S.radius(c, "radius.full"); c.appendChild(S.icon(ic, size / 2, tone === "info" ? "primary" : tone + "-subtle-foreground")); return c; };
S.docItem = (sec, name, rule, node) => { const sub = S.stack("item/" + name, "column", 12); sub.appendChild(S.txt(name, "h3", "foreground")); const r = S.txt(rule, "body", "muted-foreground"); sub.appendChild(r); r.growType = "auto-height"; r.resize(880, r.height); r.growType = "auto-height"; sub.appendChild(node); sec.appendChild(sub); return sub; };
S.fixDocTexts = () => { for (const t of penpotUtils.findShapes((s) => s.type === "text" && !(s.tokens || {}).fill && (s.fills || []).some((f) => f.fillColor) && /^(item|section)/.test((s.parent?.name || "").replace(/\s/g, "")), penpot.root)) S.fill(t, String(t.fontWeight) === "600" ? "foreground" : "muted-foreground"); };
S.addVariant = (setName, board, props) => { const v = S.V(setName); const cont = v.mainInstance().parent; board.name = setName; const c = S.lib.createComponent([board]); cont.appendChild(board); const P = v.variants.properties; const vc = v.variants.variantComponents().find((x) => x.id === c.id); if (!vc) throw new Error("variant not attached"); Object.entries(props).forEach(([k, val]) => vc.setVariantProperty(P.indexOf(k), val)); return vc; };
S.sec = () => penpot.root.children.find((c) => c.name.startsWith("section"));

S.mscreen = (name, kind, { title = null, sync = null, h = 812 } = {}) => {
  const f = S.box(name, "column", 0); f.flex.alignItems = "stretch"; S.fixed(f, 375, h); S.fill(f, "primary"); f.clipContent = true;
  const ab = S.inst("AppBar", { kind }); f.appendChild(ab); ab.layoutChild.horizontalSizing = "fill";
  if (title) S.setText(penpotUtils.findShape((s) => s.name === "Title", ab), title);
  if (sync) { const ss = penpotUtils.findShape((s) => s.name === "SyncStatus", ab); ss.swapComponent(S.V("SyncStatus").variants.variantComponents().find((c) => c.variantProps.state === sync && c.variantProps.on === "primary")); }
  const c = S.box("Content", "column", 16, 16, 20); c.flex.alignItems = "stretch"; S.fill(c, "muted"); S.bind(c, "radius.4xl", ["borderRadiusTopLeft", "borderRadiusTopRight"]);
  f.appendChild(c); c.layoutChild.horizontalSizing = "fill"; c.layoutChild.verticalSizing = "fill";
  return { f, c, ab };
};
S.put = (p, ...ks) => { for (const k of ks) { p.appendChild(k); if (k.layoutChild) k.layoutChild.horizontalSizing = "fill"; } return p; };
S.float = (f, node, x, yFromBottom) => { f.appendChild(node); node.layoutChild.absolute = true; node.layoutChild.zIndex = 5; penpotUtils.setParentXY(node, x, f.height - yFromBottom - node.height); return node; };
S.actionBar = (f, actions, state, labels) => { const a = S.inst("ActionBar", { actions, state }); const bs = penpotUtils.findShapes((s) => s.name === "MButton", a); labels.forEach((l, i) => l && bs[i] && S.setText(bs[i], l)); f.appendChild(a); a.layoutChild.absolute = true; a.layoutChild.zIndex = 5; penpotUtils.setParentXY(a, 0, f.height - a.height); return a; };
S.fab = (f, label) => { const b = S.inst("FAB", { kind: "extended" }); S.setText(b, label); f.appendChild(b); b.layoutChild.absolute = true; b.layoutChild.zIndex = 5; return b; };
S.placeFab = (f) => { const b = f.children.find((k) => k.name === "FAB"); if (b) penpotUtils.setParentXY(b, 375 - 16 - b.width, f.height - 34 - 16 - b.height); };
S.overlay = (f, sheet) => { const r = penpot.createRectangle(); r.name = "scrim"; f.appendChild(r); r.layoutChild.absolute = true; r.resize(375, f.height); penpotUtils.setParentXY(r, 0, 0); S.fill(r, "foreground"); r.opacity = 0.5; r.layoutChild.zIndex = 10;
  f.appendChild(sheet); sheet.layoutChild.absolute = true; sheet.layoutChild.zIndex = 11; return sheet; };
S.placeSheet = (f) => { const s = f.children.find((k) => k.name === "BottomSheet"); if (s) penpotUtils.setParentXY(s, 0, f.height - s.height); };
S.empty = (kind, title, desc, action) => { const e = S.inst("MEmptyState", { kind }); const ts = penpotUtils.findShapes((s) => s.type === "text", e); if (title) ts[0].characters = title; if (desc) { ts[1].hidden = false; ts[1].characters = desc; } const b = penpotUtils.findShape((s) => s.name === "MButton", e); if (action) { b.hidden = false; S.setText(b, action); } else if (b) b.hidden = true; return e; };
S.card = (name, gap = 16) => { const c = S.box(name, "column", gap, 20, 20); c.flex.alignItems = "stretch"; S.fill(c, "card"); S.radius(c, "radius.3xl"); S.shadow(c, "shadow.sm"); return c; };
S.row = (x) => { const f = penpot.root.children.filter((c) => c.name.startsWith(x)); return f; };
S.initials = (root) => { for (const a of penpotUtils.findShapes((s) => s.name === "Avatar", root)) S.setText(a, storage.user.initials); };
S.stepper = (n, total, name) => { const st = S.comp("MobileStepper").instance(); S.texts(st, [`Etapa ${n} de ${total}`, name]); const p = penpotUtils.findShape((s) => s.name === "Progress", st); p.resize(Math.round((311 * n) / total), p.height); return st; };
S.autoH = (f) => { const c = f.children.find((k) => k.name === "Content"); const ab = f.children.find((k) => k.name === "AppBar"); const need = ab.height + c.flex.topPadding + c.flex.bottomPadding + c.children.reduce((a, k) => a + k.height, 0) + (c.children.length - 1) * c.flex.rowGap + (f.children.some((k) => k.name === "ActionBar") ? 180 : f.children.some((k) => k.name === "FAB") ? 120 : 40); if (need > f.height) f.resize(375, Math.ceil(need)); };
S.map = (state, h = 220) => { const m = S.inst("MapPlaceholder", { state }); m.resize(343, h); S.fitMap(m); S.radius(m, "radius.3xl"); return m; };
S.tabs = (labels, active) => { const r = S.box("Tabs", "row", 8); r.flex.alignItems = "center"; labels.forEach((l) => { const t = S.inst("MTab", { state: l === active ? "active" : "inactive" }); S.setText(t, l); r.appendChild(t); }); return r; };
S.pair = (label, value) => { const p = S.stack("Pair", "column", 2); p.appendChild(S.txt(label, "caption", "muted-foreground")); if (typeof value === "string") { const v = S.txt(value, "body-strong", "foreground"); p.appendChild(v); S.wrap(v); } else p.appendChild(value); return p; };
S.header = (title, count, action) => { const r = S.box("SectionHeader", "row", 8); r.appendChild(S.txt(title, "h3", "foreground")); if (count) r.appendChild(S.txt(count, "body", "muted-foreground")); const sp = S.box("spacer", "row"); S.fixed(sp, 1, 1); r.appendChild(sp); sp.layoutChild.horizontalSizing = "fill"; if (action) { const b = S.inst("MButton", { variant: "outline", size: "sm", state: "default" }); S.setText(b, action); r.appendChild(b); } return r; };
S.iconBtn = async (ic) => { const b = S.inst("MIconButton", { on: "surface" }); if (ic !== "chevron-left") await S.swapIn(b, ic, ic === "trash-2" ? "destructive" : "foreground"); return b; };
S.details = async (title, pairs, { del = false } = {}) => { const c = S.card("Details", 14); const h = S.box("Header", "row", 4); const t = S.txt(title, "h3", "foreground"); h.appendChild(t); S.wrap(t); h.appendChild(await S.iconBtn("pencil")); if (del) h.appendChild(await S.iconBtn("trash-2")); S.put(c, h); for (const [l, v] of pairs) S.put(c, S.pair(l, typeof v === "function" ? v() : v)); return c; };
S.skDetails = (title, n) => { const c = S.card("Details", 14); c.appendChild(S.txt(title, "h3", "foreground")); for (let i = 0; i < n; i++) { const p = S.stack("Pair", "column", 6); const a = S.comp("Skeleton").instance(); a.resize(80, 12); const b = S.comp("Skeleton").instance(); b.resize(180, 14); p.appendChild(a); p.appendChild(b); S.put(c, p); } return c; };
S.sheet = (kind, texts = [], buttons = []) => { const sh = S.inst("BottomSheet", { kind }); const ts = penpotUtils.findShapes((s) => s.type === "text", sh); texts.forEach((t, i) => { if (t !== null && ts[i]) ts[i].characters = t; }); const bs = penpotUtils.findShapes((s) => s.name === "MButton", sh); buttons.forEach((t, i) => { if (t !== null && bs[i]) S.setText(bs[i], t); }); return sh; };
S.cardHead = (ic, title, desc) => { const c = S.card("FormSection"); const h = S.box("Head", "row", 12); h.appendChild(S.chip(ic, "info", 40)); const t = S.txt(title, "h3", "foreground"); h.appendChild(t); S.wrap(t); S.put(c, h); if (desc) { const d = S.txt(desc, "body", "muted-foreground"); S.put(c, d); d.growType = "auto-height"; } return c; };
// Library lookups walk every component of both libraries; cache them by name (reload helpers after changing a library).
{ const vC = new Map(), cC = new Map(), V0 = S.V, C0 = S.comp;
  S.V = (n) => { if (!vC.has(n)) vC.set(n, V0(n)); return vC.get(n); };
  S.comp = (n) => { if (!cC.has(n)) cC.set(n, C0(n)); return cC.get(n); };
  const vcC = new Map();
  S.inst = (container, props) => { const v = typeof container === "string" ? S.V(container) : container; const key = v.id; if (!vcC.has(key)) vcC.set(key, v.variants.variantComponents().map((c) => [c, { ...c.variantProps }]));
    const hit = vcC.get(key).find(([, vp]) => Object.entries(props).every(([k, val]) => vp[k] === val)); if (!hit) throw new Error("variant " + JSON.stringify(props)); return hit[0].instance(); }; }
return "mobile helpers ok";
