// Builders for the GAIA · Fechamento file (closing by crop × harvest year). Load after helpers.js.
const S = storage;
const F = {};
storage.F = F;

F.project = "Projeto Cerrado Sustentável";
F.farms = [
  { name: "Fazenda Boa Vista", area: "135,8 ha", plots: [["Talhão 01", "42,0 ha"], ["Talhão 02", "38,2 ha"], ["Talhão 03", "55,6 ha"]] },
  { name: "Fazenda Santa Rita", area: "216,5 ha", plots: [["Talhão A", "120,0 ha"], ["Talhão B", "96,5 ha"]] },
  { name: "Fazenda Três Irmãos", area: "210,0 ha", plots: [["Talhão único", "210,0 ha"]] },
  { name: "Fazenda São José", area: "135,3 ha", plots: [["Talhão 1", "64,3 ha"], ["Talhão 2", "71,0 ha"]] },
];
F.kpis = [
  ["Pegada de carbono", "0,38", "kgCO₂e/kg", "Milho · média ponderada pela área"],
  ["Emissão por hectare", "2,41", "tCO₂e/ha", "Média ponderada pela área"],
  ["Remoção no período", "1,54", "tCO₂/ha", "0,42 tC/ha · out/2024 a mar/2025"],
  ["Score Regenerativo", "68", "%", "Bom · média ponderada pela área"],
];

F.fillW = (k) => { k.layoutChild.horizontalSizing = "fill"; return k; };
F.fixW = (b, w) => { b.flex.horizontalSizing = "fix"; b.resize(w, Math.max(b.height, 1)); b.flex.verticalSizing = "auto"; return b; };
F.tw = (p, s, ty = "body", tok = "foreground") => {
  const t = S.txt(s, ty, tok);
  p.appendChild(t);
  t.growType = "auto-height";
  t.layoutChild.horizontalSizing = "fill";
  return t;
};
F.col = (name, gap = 8, px = 0, py = 0) => { const b = S.box(name, "column", gap, px, py); b.flex.alignItems = "stretch"; return b; };
F.row = (name, gap = 8, px = 0, py = 0) => S.box(name, "row", gap, px, py);
F.spacer = (p) => {
  const sp = S.box("spacer", "row");
  sp.flex.horizontalSizing = "fix";
  sp.flex.verticalSizing = "fix";
  sp.resize(1, 1);
  p.appendChild(sp);
  sp.layoutChild.horizontalSizing = "fill";
  return sp;
};
F.card = (name, dir = "column", gap = 16, px = 20, py = 20) => {
  const b = S.box(name, dir, gap, px, py);
  b.flex.alignItems = dir === "column" ? "stretch" : "center";
  S.fill(b, "card");
  S.stroke(b, "border");
  S.radius(b, "radius.xl");
  S.shadow(b, "shadow.sm");
  return b;
};
F.btn = (variant, size, label, state = "default") => S.setText(S.inst("Button", { variant, size, state }), label);
F.badge = (variant, label) => S.setText(S.inst("Badge", { variant }), label);
F.status = (k) => {
  const [v, l] = { fechado: ["outro", "Fechado"], verificacao: ["em-auditoria", "Em verificação"], devolvido: ["pendente", "Devolvido"], verificado: ["concluido", "Verificado"] }[k];
  return S.setText(S.inst("BadgeStatus", { status: v }), l);
};
F.lockTag = (label) => {
  const r = F.row("LockTag", 6);
  r.appendChild(S.icon("lock", 12, "muted-foreground"));
  r.appendChild(S.txt(label, "caption-strong", "muted-foreground"));
  return r;
};
F.kv = (label, value, unit, w, sub) => {
  const c = S.stack("Kpi", "column", 2);
  c.appendChild(S.txt(label, "caption", "muted-foreground"));
  const v = F.row("Value", 4);
  v.flex.alignItems = "end";
  v.appendChild(S.txt(value, "body-strong", "foreground"));
  if (unit) v.appendChild(S.txt(unit, "caption", "muted-foreground"));
  c.appendChild(v);
  if (sub) c.appendChild(S.txt(sub, "caption", "muted-foreground"));
  if (w) F.fixW(c, w);
  return c;
};

// Project shell: AppHeader + Fazendas | Fechamentos tabs (new: the project page has no tabs today).
F.projectScreen = (name, tab = "Fechamentos") => {
  const { f, content, inset } = S.screen(name, { title: F.project, back: true });
  const hd = inset.children.find((k) => k.name === "AppHeader");
  const bb = hd.children.find((k) => k.name === "border-b");
  if (bb) bb.hidden = true;
  const tabs = S.box("ProjectTabs", "column", 0);
  tabs.flex.alignItems = "stretch";
  S.fill(tabs, "background");
  const row = S.box("Tabs", "row", 16, 24, 0);
  row.flex.alignItems = "end";
  for (const l of ["Fazendas", "Fechamentos"]) {
    const t = S.inst("Tab", { variant: "line", state: l === tab ? "active" : "inactive" });
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
  return { f, content, inset };
};

F.sectionHeader = (content, title, desc, actions = []) => {
  const r = F.row("ListHeader", 16);
  const c = S.stack("Title", "column", 4);
  c.appendChild(S.txt(title, "h2"));
  if (desc) c.appendChild(S.txt(desc, "body", "muted-foreground"));
  r.appendChild(c);
  F.spacer(r);
  for (const a of actions) r.appendChild(a);
  content.appendChild(r);
  F.fillW(r);
  return r;
};

F.closings = [
  { title: "Soja 2025", status: "verificacao", meta: "Enviado para auditoria em 22/09/2026 por Maria Silva", kpis: [["Pegada", "0,41", "kgCO₂e/kg"], ["Emissão/ha", "1,92", "tCO₂e/ha"], ["Remoção", "1,21", "tCO₂/ha"], ["Score Regen.", "66", "%"]], cov: ["3 de 4 fazendas", "78% da área"], counts: ["3 de 4", "6 de 8"] },
  { title: "Milho 2024", status: "verificado", meta: "Verificado em 14/08/2025 por Ana Costa, auditora", kpis: [["Pegada", "0,44", "kgCO₂e/kg"], ["Emissão/ha", "2,58", "tCO₂e/ha"], ["Remoção", "1,37", "tCO₂/ha"], ["Score Regen.", "61", "%"]], cov: ["4 de 4 fazendas", "92% da área"], counts: ["4 de 4", "7 de 8"] },
  { title: "Feijão 2024", status: "fechado", meta: "Fechado em 20/06/2025 por Maria Silva · sem auditoria", kpis: [["Pegada", "0,52", "kgCO₂e/kg"], ["Emissão/ha", "1,74", "tCO₂e/ha"], ["Remoção", "0,88", "tCO₂/ha"], ["Score Regen.", "61", "%"]], cov: ["2 de 4 fazendas", "41% da área"], counts: ["2 de 4", "3 de 8"] },
];
F.milho25 = { title: "Milho 2025", status: "fechado", meta: "Fechado em 05/10/2026 por Maria Silva · sem auditoria", kpis: F.kpis.map(([l, v, u]) => [{ "Pegada de carbono": "Pegada", "Emissão por hectare": "Emissão/ha", "Remoção no período": "Remoção", "Score Regenerativo": "Score Regen." }[l], v, u]), cov: ["4 de 4 fazendas", "90% da área"], counts: ["4 de 4", "7 de 8"] };

F.closingCard = (d) => {
  const c = F.card("Fechamento — " + d.title, "column", 16, 24, 20);
  const top = F.row("Top", 24);
  const id = S.stack("Id", "column", 6);
  const tr = F.row("Title", 12);
  tr.appendChild(S.txt(d.title, "h3"));
  tr.appendChild(F.status(d.status));
  id.appendChild(tr);
  id.appendChild(S.txt(d.meta, "caption", "muted-foreground"));
  F.fixW(id, 320);
  top.appendChild(id);
  top.appendChild(F.kv("Fazendas", d.counts[0], null, 112));
  top.appendChild(F.kv("Talhões", d.counts[1], null, 112));
  F.spacer(top);
  top.appendChild(S.icon("chevron-right", 16, "muted-foreground"));
  c.appendChild(top);
  F.fillW(top);
  if (d.alert) {
    S.stroke(c, "destructive");
    const a = F.row("Returned", 8, 12, 8);
    S.fill(a, "destructive-subtle");
    S.radius(a, "radius.md");
    a.appendChild(S.icon("circle-alert", 16, "destructive"));
    a.appendChild(S.txt(d.alert, "label", "destructive-subtle-foreground"));
    F.spacer(a);
    a.appendChild(F.btn("outline", "sm", "Ver comentários"));
    c.appendChild(a);
    F.fillW(a);
  }
  return c;
};

F.closingsList = (content, items) => {
  F.sectionHeader(content, "Fechamentos", "Um fechamento por cultura e ano safra. Os cálculos escolhidos ficam travados.", [F.btn("default", "default", "Novo fechamento")]);
  const l = F.col("Lista", 12);
  for (const d of items) { const c = F.closingCard(d); l.appendChild(c); F.fillW(c); }
  content.appendChild(l);
  F.fillW(l);
  return l;
};

F.place = (f, x, y) => { f.x = x; f.y = y; return f; };
F.frame = (name) => penpot.currentPage.root.children.find((c) => c.name === name);

F.alert = (variant, title, desc) => {
  const a = S.inst("Alert", { variant });
  S.texts(a, [title === null ? false : title, desc]);
  const act = a.children.find((k) => k.name === "Action" || k.name === "Button");
  if (act) act.hidden = true;
  return a;
};
F.skel = (w, h = 14) => { const k = S.comp("Skeleton").instance(); k.resize(w, h); return k; };
F.skelCard = () => {
  const c = F.card("Fechamento — carregando", "row", 24, 24, 24);
  const id = S.stack("Id", "column", 8);
  id.appendChild(F.skel(160, 20));
  id.appendChild(F.skel(240, 12));
  F.fixW(id, 320);
  c.appendChild(id);
  for (let i = 0; i < 4; i++) { const k = S.stack("Kpi", "column", 6); k.appendChild(F.skel(64, 12)); k.appendChild(F.skel(88, 16)); F.fixW(k, 112); c.appendChild(k); }
  return c;
};

F.sep = (p) => { const k = S.inst("Separator", { orientation: "horizontal" }); p.appendChild(k); F.fillW(k); return k; };
F.wizard = (f, step, desc) => {
  const W = 1200, H = 856;
  const p = S.box("Dialog", "column", 0);
  p.flex.alignItems = "stretch";
  p.flex.horizontalSizing = "fix";
  p.flex.verticalSizing = "fix";
  p.resize(W, H);
  S.fill(p, "background");
  S.stroke(p, "border");
  S.radius(p, "radius.lg");
  S.shadow(p, "shadow.lg");
  p.clipContent = true;
  const hd = F.col("Header", 20, 24, 0);
  hd.flex.topPadding = 24;
  hd.flex.bottomPadding = 20;
  const ht = S.stack("Title", "column", 4);
  ht.appendChild(S.txt("Novo fechamento", "h2"));
  ht.appendChild(S.txt(desc || "Escolha a cultura, o ano safra e o cálculo de cada talhão. Os cálculos escolhidos ficam travados.", "body", "muted-foreground"));
  hd.appendChild(ht);
  const st = S.inst("Stepper", { current: String(step) });
  const map = { "Dados Gerais": "Recorte", "Enviar arquivo": "Cálculos", "Imagem do perfil": "Revisão" };
  for (const t of penpotUtils.findShapes((x) => x.type === "text", st)) if (map[t.characters]) t.characters = map[t.characters];
  hd.appendChild(st);
  st.layoutChild.horizontalSizing = "fill";
  p.appendChild(hd);
  F.fillW(hd);
  F.sep(p);
  const content = F.col("Content", 16, 24, 20);
  p.appendChild(content);
  F.fillW(content);
  content.layoutChild.verticalSizing = "fill";
  content.clipContent = true;
  F.sep(p);
  const ft = F.row("Footer", 8, 24, 16);
  ft.flex.bottomPadding = 20;
  p.appendChild(ft);
  F.fillW(ft);
  const x = S.icon("x", 16, "muted-foreground");
  p.appendChild(x);
  x.layoutChild.absolute = true;
  penpotUtils.setParentXY(x, W - 32, 20);
  S.withDialog(f, p);
  penpotUtils.setParentXY(p, 120, 22);
  return { p, content, ft };
};
F.foot = (ft, left, btns) => {
  for (const k of left) ft.appendChild(k);
  F.spacer(ft);
  for (const b of btns) ft.appendChild(b);
};

// Step 1 · Recorte
F.step1 = (content, { exists = false } = {}) => {
  if (exists) { const a = F.alert("destructive", "Soja 2025 já tem um fechamento ativo", "Ele foi devolvido pela auditoria: corrija e reenvie o existente, ou escolha outra cultura ou outro ano safra."); content.appendChild(a); F.fillW(a); }
  const r = F.row("Recorte", 16);
  r.flex.alignItems = "start";
  const a = S.field("Cultura", exists ? "Soja" : "Milho", { control: "select" });
  const b = S.field("Ano safra", "2025", { control: "select", help: "Entram as avaliações de milho com fim do cultivo em 2025." });
  r.appendChild(a); r.appendChild(b);
  F.fixW(a, 360); F.fixW(b, 360);
  content.appendChild(r);
  const m = S.stack("Modulos", "column", 8);
  m.appendChild(S.txt("Módulos incluídos", "label"));
  const tg = F.row("Toggles", 8);
  for (const l of ["Carbono emissão", "Carbono remoção", "Regenerativo"]) tg.appendChild(S.setText(S.inst("Toggle", { state: "on" }), l));
  m.appendChild(tg);
  m.appendChild(S.txt("Entram os módulos contratados no projeto. Desmarque para deixar um módulo fora deste fechamento.", "caption", "muted-foreground"));
  content.appendChild(m);
  const pv = F.col("Disponível", 10, 16, 16);
  S.fill(pv, "muted");
  S.radius(pv, "radius.lg");
  pv.appendChild(S.txt(exists ? "Disponível para Soja 2025" : "Disponível para Milho 2025", "label"));
  for (const l of exists ? ["4 fazendas e 8 talhões no projeto", "6 talhões com cálculo de emissão de soja 2025", "14 cálculos fixados"] : ["4 fazendas e 8 talhões no projeto", "7 talhões com cálculo de emissão de milho 2025", "21 cálculos fixados"]) {
    const it = F.row("Item", 8);
    it.appendChild(S.icon("circle-check", 16, "muted-foreground"));
    it.appendChild(S.txt(l, "body", "foreground"));
    pv.appendChild(it);
  }
  F.fixW(pv, 736);
  content.appendChild(pv);
};

// Step 2 · Cálculos: farms × modules matrix
F.COLS = { chk: 24, area: 96, lca: 256, rothc: 256, regen: 220 };
F.sel = (kind, text, w) => {
  const props = { filled: { state: "default", content: "filled" }, placeholder: { state: "default", content: "placeholder" }, error: { state: "error", content: "filled" }, disabled: { state: "disabled", content: "placeholder" }, focus: { state: "focus", content: "filled" } }[kind];
  const s = S.inst("Select Trigger", props);
  S.setText(s, text);
  s.resize(w, 36);
  return s;
};
F.gap = (w) => { const b = S.box("cell", "row"); b.flex.horizontalSizing = "fix"; b.flex.verticalSizing = "fix"; b.resize(w, 1); return b; };
F.mrow = (name, h, tok) => {
  const r = F.row(name, 16, 16, 0);
  r.flex.verticalSizing = "fix";
  r.resize(100, h);
  if (tok) S.fill(r, tok);
  return r;
};
F.matrixHeader = (on) => {
  const r = F.mrow("Header", 40, "muted");
  const C = F.COLS;
  r.appendChild(S.inst("Checkbox", { checked: on ? "true" : "false", state: "default" }));
  const n = S.txt("Fazenda / talhão", "caption-strong", "muted-foreground"); r.appendChild(n); n.growType = "auto-height"; n.layoutChild.horizontalSizing = "fill";
  for (const [l, w] of [["Área", C.area], ["Carbono emissão", C.lca], ["Carbono remoção", C.rothc], ["Regenerativo", C.regen]]) {
    const t = S.txt(l, "caption-strong", "muted-foreground"); r.appendChild(t); t.growType = "fixed"; t.resize(w, 16);
  }
  return r;
};
F.cellText = (s, w, ty = "body", tok = "foreground") => { const t = S.txt(s, ty, tok); t.growType = "fixed"; t.resize(w, 20); t.growType = "auto-height"; return t; };
// mode: empty | applied | loading
F.matrix = (mode) => {
  const C = F.COLS;
  const tbl = F.col("Matriz", 0);
  S.stroke(tbl, "border");
  S.radius(tbl, "radius.lg");
  S.fill(tbl, "background");
  tbl.clipContent = true;
  const add = (r) => { tbl.appendChild(r); F.fillW(r); };
  const on = mode === "applied";
  add(F.matrixHeader(on));
  for (const fm of F.farms) {
    const fr = F.mrow("Fazenda — " + fm.name, 48, "accent");
    fr.appendChild(S.inst("Checkbox", { checked: on ? "true" : "false", state: "default" }));
    const nm = S.stack("Nome", "column", 0);
    nm.appendChild(S.txt(fm.name, "body-strong"));
    nm.appendChild(S.txt(fm.plots.length + (fm.plots.length > 1 ? " talhões" : " talhão"), "caption", "muted-foreground"));
    fr.appendChild(nm); nm.layoutChild.horizontalSizing = "fill";
    fr.appendChild(F.cellText(fm.area, C.area, "body-strong"));
    fr.appendChild(F.gap(C.lca)); fr.appendChild(F.gap(C.rothc));
    fr.appendChild(F.gap(C.regen));
    add(fr);
    for (const [pl, ar] of fm.plots) {
      const none = fm.name === "Fazenda São José" && pl === "Talhão 2";
      const missing = fm.name === "Fazenda Santa Rita" && pl === "Talhão B";
      const r = F.mrow(pl, 44);
      r.appendChild(S.inst("Checkbox", { checked: on && !none ? "true" : "false", state: none ? "disabled" : "default" }));
      const nb = F.row("Nome", 0, 16, 0);
      nb.appendChild(S.txt(pl, "body", none ? "muted-foreground" : "foreground"));
      r.appendChild(nb); nb.layoutChild.horizontalSizing = "fill";
      r.appendChild(F.cellText(ar, C.area, "body", none ? "muted-foreground" : "foreground"));
      if (mode === "loading") { r.appendChild(F.skel(C.lca, 36)); r.appendChild(F.skel(C.rothc, 36)); }
      else if (none) { r.appendChild(F.sel("disabled", "Sem cálculo de milho 2025", C.lca)); r.appendChild(F.sel("disabled", "Escolha a emissão primeiro", C.rothc)); }
      else {
        r.appendChild(F.sel(on ? "filled" : "placeholder", on ? "Milho safra 2025" : "Selecione o cálculo", C.lca));
        r.appendChild(F.sel(on ? "filled" : "placeholder", on ? "Roth-C 2023–2027" : "Selecione o cálculo", C.rothc));
      }
      r.appendChild(mode === "loading" ? F.skel(C.regen, 36) : none ? F.sel("disabled", "—", C.regen) : F.sel(on ? "filled" : "placeholder", on ? "Avaliação 2025" : "Selecione a avaliação", C.regen));
      add(r);
      const b = S.inst("Separator", { orientation: "horizontal" }); tbl.appendChild(b); F.fillW(b);
    }
  }
  return tbl;
};
F.step2 = (content, mode) => {
  const tb = F.row("Toolbar", 8);
  tb.appendChild(F.badge("secondary", "Milho 2025"));
  tb.appendChild(F.badge("outline", "3 módulos"));
  F.spacer(tb);
  const s = S.inst("Input Group", { addon: "icon", content: "placeholder" });
  S.setText(s, "Buscar fazenda ou talhão");
  s.resize(280, 36);
  tb.appendChild(s);
  tb.appendChild(F.btn(mode === "empty" ? "default" : "outline", "default", "Usar fixados (21)"));
  content.appendChild(tb); F.fillW(tb);
  if (mode === "empty") { const a = F.alert("info", null, "Escolha um cálculo por talhão e módulo. Só aparecem cálculos de milho 2025. \"Usar principais\" preenche as células com o cálculo marcado como principal."); content.appendChild(a); F.fillW(a); }
  const m = F.matrix(mode);
  content.appendChild(m); F.fillW(m);
  return m;
};
F.step2Foot = (ft, mode) => {
  const on = mode === "applied";
  const l = [S.txt(on ? "7 de 8 talhões · 4 de 4 fazendas · 90% da área" : "0 de 8 talhões selecionados", "body", "muted-foreground")];
  if (on) l.push(S.txt("· 1 cálculo faltando", "body-strong", "destructive"));
  F.foot(ft, l, [F.btn("outline", "default", "Voltar"), F.btn("default", "default", "Próximo", on ? "disabled" : "disabled")]);
};

// Step 3 · Revisão
F.option = (sel, title, desc) => {
  const c = F.row("Opção", 12, 16, 16);
  c.flex.alignItems = "start";
  S.fill(c, sel ? "info-subtle" : "card");
  S.stroke(c, sel ? "primary" : "border", sel ? 2 : 1);
  S.radius(c, "radius.lg");
  c.appendChild(S.icon(sel ? "circle-check" : "circle", 20, sel ? "primary" : "muted-foreground"));
  const t = S.stack("Texto", "column", 4);
  t.appendChild(S.txt(title, "label"));
  const d = S.txt(desc, "body", "muted-foreground");
  t.appendChild(d); d.growType = "auto-height"; d.layoutChild.horizontalSizing = "fill";
  c.appendChild(t); t.layoutChild.horizontalSizing = "fill";
  return c;
};
F.farmRows = [
  ["Fazenda Boa Vista", "135,8 ha", "0,36", "2,30", "1,62", "71%"],
  ["Fazenda Santa Rita", "216,5 ha", "0,40", "2,55", "1,48", "64%"],
  ["Fazenda Três Irmãos", "210,0 ha", "0,37", "2,38", "1,58", "70%"],
  ["Fazenda São José", "64,3 ha · 1 de 2", "0,41", "2,44", "1,41", "66%"],
];
F.simpleTable = (head, rows, widths, total) => {
  const tbl = F.col("Tabela", 0);
  S.stroke(tbl, "border"); S.radius(tbl, "radius.lg"); S.fill(tbl, "background"); tbl.clipContent = true;
  const mk = (cells, h, tok, ty, ctok) => {
    const r = F.mrow("Linha", h, tok);
    cells.forEach((c, i) => {
      const t = S.txt(c, ty, i === 0 ? (ctok === "muted-foreground" ? ctok : "foreground") : ctok);
      r.appendChild(t);
      if (i === 0) { t.growType = "auto-height"; t.layoutChild.horizontalSizing = "fill"; } else { t.growType = "fixed"; t.resize(widths[i - 1], 20); t.align = "right"; t.growType = "auto-height"; }
    });
    tbl.appendChild(r); F.fillW(r);
    return r;
  };
  mk(head, 40, "muted", "caption-strong", "muted-foreground");
  rows.forEach((r) => { mk(r, 44, null, "body", "foreground"); const b = S.inst("Separator", { orientation: "horizontal" }); tbl.appendChild(b); F.fillW(b); });
  if (total) mk(total, 44, "accent", "body-strong", "foreground");
  return tbl;
};
F.kpiRow = (content) => {
  const r = F.row("Kpis", 16);
  for (const [l, v, u, d] of F.kpis) {
    const k = S.inst("KpiCard", { content: "simple", emphasis: "default", state: "default" });
    S.texts(k, [l, v, u, d]);
    r.appendChild(k); k.layoutChild.horizontalSizing = "fill";
  }
  content.appendChild(r); F.fillW(r);
  return r;
};
F.step3 = (content, { audit = false, error = false } = {}) => {
  if (error) { const a = F.alert("destructive", "Erro ao fechar o recorte", "Algo deu errado. Tente novamente. Nada foi travado."); content.appendChild(a); F.fillW(a); }
  F.kpiRow(content);
  const cv = F.row("Cobertura", 8);
  cv.appendChild(S.txt("Cobertura", "label"));
  cv.appendChild(S.txt("4 de 4 fazendas · 7 de 8 talhões · 626,6 de 697,6 ha (90% da área)", "body", "muted-foreground"));
  content.appendChild(cv);
  const t = F.simpleTable(["Fazenda", "Área", "Pegada (kgCO₂e/kg)", "Emissão (tCO₂e/ha)", "Remoção (tCO₂/ha)", "Score Regen."], F.farmRows, [140, 150, 150, 150, 110], ["Projeto · média ponderada pela área", "626,6 ha", "0,38", "2,41", "1,54", "68%"]);
  content.appendChild(t); F.fillW(t);
  content.appendChild(S.txt("Como fechar", "h3"));
  const o = F.row("Opções", 16);
  o.flex.alignItems = "start";
  const o1 = F.option(!audit, "Fechar sem auditoria", "Os números ficam autodeclarados. Você pode enviar para auditoria depois.");
  const o2 = F.option(audit, "Fechar e enviar para auditoria", "Um auditor revisa os cálculos. Aprovado, o fechamento fica verificado e libera o PDF com QR code.");
  o.appendChild(o1); o.appendChild(o2); o1.layoutChild.horizontalSizing = "fill"; o2.layoutChild.horizontalSizing = "fill";
  content.appendChild(o); F.fillW(o);
  const ck = F.row("Confirmação", 8);
  ck.appendChild(S.inst("Checkbox", { checked: "true", state: "default" }));
  ck.appendChild(S.txt("Entendo que os 21 cálculos escolhidos ficam travados: não podem ser editados, recalculados nem excluídos.", "body"));
  content.appendChild(ck);
};
F.step3Foot = (ft, { audit = false, busy = false } = {}) => {
  const lt = F.row("Info", 6);
  lt.appendChild(S.icon("lock", 16, "muted-foreground"));
  lt.appendChild(S.txt("21 cálculos serão travados", "body", "muted-foreground"));
  F.foot(ft, [lt], [F.btn("outline", "default", "Voltar", busy ? "disabled" : "default"), F.btn("default", "default", audit ? "Fechar e enviar para auditoria" : "Fechar recorte", busy ? "loading" : "default")]);
};

// Closing detail
F.DC = { area: 110, lca: 280, rothc: 260, regen: 200 };
F.link = (label, locked) => {
  const r = F.row("Cálculo", 6);
  if (locked) r.appendChild(S.icon("lock", 12, "muted-foreground"));
  r.appendChild(S.txt(label, "label", "primary"));
  return r;
};
F.dcell = (kids, w) => { const b = F.row("cell", 8); for (const k of kids) b.appendChild(k); F.fixW(b, w); return b; };
F.farmData = {
  "Fazenda Boa Vista": ["0,36 kgCO₂e/kg · 2,30 tCO₂e/ha", "1,62 tCO₂/ha", "Avaliação 2025 · 71%"],
  "Fazenda Santa Rita": ["0,40 kgCO₂e/kg · 2,55 tCO₂e/ha", "1,48 tCO₂/ha", "Avaliação 2025 · 64%"],
  "Fazenda Três Irmãos": ["0,37 kgCO₂e/kg · 2,38 tCO₂e/ha", "1,58 tCO₂/ha", "Avaliação 2025 · 70%"],
  "Fazenda São José": ["0,41 kgCO₂e/kg · 2,44 tCO₂e/ha", "1,41 tCO₂/ha", "Avaliação 2025 · 66%"],
};
F.comments = {
  "Talhão 02": ["lca", "Ana Costa · 30/09/2026", "Ureia de 320 kg/ha está acima da nota fiscal anexada (280 kg/ha). Revise a etapa Insumos."],
  "Talhão A": ["rothc", "Ana Costa · 30/09/2026", "A janela de modelagem começa em 2023, mas o laudo de solo é de 2024. Confirme o ano inicial."],
};
F.detailTable = (status) => {
  const C = F.DC, ret = status === "devolvido", locked = status !== "devolvido";
  const tbl = F.col("Cálculos do fechamento", 0);
  S.stroke(tbl, "border"); S.radius(tbl, "radius.lg"); S.fill(tbl, "background"); tbl.clipContent = true;
  const add = (r) => { tbl.appendChild(r); F.fillW(r); };
  const h = F.mrow("Header", 40, "muted");
  const hn = S.txt("Fazenda / talhão", "caption-strong", "muted-foreground"); h.appendChild(hn); hn.growType = "auto-height"; hn.layoutChild.horizontalSizing = "fill";
  for (const [l, w] of [["Área", C.area], ["Carbono emissão", C.lca], ["Carbono remoção", C.rothc], ["Regenerativo", C.regen]]) h.appendChild(F.cellText(l, w, "caption-strong", "muted-foreground"));
  add(h);
  for (const fm of F.farms) {
    const fd = F.farmData[fm.name];
    const fr = F.mrow("Fazenda — " + fm.name, 48, "accent");
    const nm = S.txt(fm.name, "body-strong"); fr.appendChild(nm); nm.growType = "auto-height"; nm.layoutChild.horizontalSizing = "fill";
    fr.appendChild(F.cellText(fm.name === "Fazenda São José" ? "64,3 ha" : fm.area, C.area, "body-strong"));
    fr.appendChild(F.cellText(fd[0], C.lca, "body-strong"));
    fr.appendChild(F.cellText(fd[1], C.rothc, "body-strong"));
    fr.appendChild(F.cellText("Média " + fd[2].split("· ")[1], C.regen, "body-strong"));
    add(fr);
    for (const [pl, ar] of fm.plots) {
      if (fm.name === "Fazenda São José" && pl === "Talhão 2") continue;
      const cm = ret && F.comments[pl];
      const r = F.mrow(pl, 44, cm ? "destructive-subtle" : null);
      const nb = F.row("Nome", 0, 16, 0); nb.appendChild(S.txt(pl, "body")); r.appendChild(nb); nb.layoutChild.horizontalSizing = "fill";
      r.appendChild(F.cellText(ar, C.area));
      const lc = [F.link("Milho safra 2025", locked), S.txt("0,35", "caption", "muted-foreground")];
      const rc = [F.link("Roth-C 2023–2027", locked), S.txt("1,60", "caption", "muted-foreground")];
      if (cm && cm[0] === "lca") lc.push(F.badge("destructive", "1 comentário"));
      if (cm && cm[0] === "rothc") rc.push(F.badge("destructive", "1 comentário"));
      r.appendChild(F.dcell(lc, C.lca));
      r.appendChild(F.dcell(rc, C.rothc));
      r.appendChild(F.dcell([F.link("Avaliação 2025", locked), S.txt("71%", "caption", "muted-foreground")], C.regen));
      add(r);
      if (cm) {
        const cb = F.row("Comentário", 12, 48, 12);
        S.fill(cb, "destructive-subtle");
        cb.appendChild(S.icon("circle-alert", 16, "destructive"));
        const tx = S.stack("Texto", "column", 2);
        tx.appendChild(S.txt(cm[1], "caption-strong", "destructive-subtle-foreground"));
        const d = S.txt(cm[2], "body", "foreground"); tx.appendChild(d); d.growType = "auto-height"; d.layoutChild.horizontalSizing = "fill";
        cb.appendChild(tx); tx.layoutChild.horizontalSizing = "fill";
        cb.appendChild(F.btn("outline", "sm", "Corrigir"));
        add(cb);
      }
      const b = S.inst("Separator", { orientation: "horizontal" }); tbl.appendChild(b); F.fillW(b);
    }
  }
  return tbl;
};
F.detail = (name, status) => {
  const { f, content } = S.screen(name, { title: "Fechamento · Milho 2025", back: true });
  const meta = {
    fechado: "Fechado em 05/10/2026 por Maria Silva · sem auditoria",
    verificacao: "Enviado para auditoria em 28/09/2026 por Maria Silva",
    devolvido: "Devolvido em 30/09/2026 por Ana Costa, auditora",
    verificado: "Verificado em 03/10/2026 por Ana Costa, auditora",
  }[status];
  const acts = {
    fechado: [["default", "Enviar para auditoria"]],
    verificacao: [],
    devolvido: [["default", "Reenviar para auditoria"]],
    verificado: [["outline", "Baixar PDF verificado"]],
  }[status].map(([v, l]) => F.btn(v, "default", l));
  const top = F.row("Top", 12);
  const pj = S.stack("Id", "column", 4);
  const tr = F.row("Status", 8);
  tr.appendChild(F.status(status));
  tr.appendChild(S.txt(meta, "body", "muted-foreground"));
  pj.appendChild(tr);
  pj.appendChild(S.txt(F.project + " · Milho · ano safra 2025 · Carbono emissão, Carbono remoção, Regenerativo", "caption", "muted-foreground"));
  top.appendChild(pj);
  F.spacer(top);
  for (const a of acts) top.appendChild(a);
  content.appendChild(top); F.fillW(top);
  const al = {
    verificacao: ["info", "Em verificação", "A auditora Ana Costa está revisando os cálculos. Eles ficam travados até a resposta."],
    devolvido: ["destructive", "2 comentários para corrigir", "Os cálculos deste fechamento foram liberados para correção. Corrija os cálculos marcados e reenvie: a seleção não muda."],
    verificado: ["success", "Fechamento verificado", "Travado para sempre. O PDF verificado com QR code está liberado."],
  }[status];
  if (al) { const a = F.alert(al[0], al[1], al[2]); content.appendChild(a); F.fillW(a); }
  F.kpiRow(content);
  const cv = F.row("Cobertura", 8);
  cv.appendChild(S.txt("Cobertura", "label"));
  cv.appendChild(S.txt("4 de 4 fazendas · 7 de 8 talhões · 626,6 de 697,6 ha (90% da área) · fora: Fazenda São José › Talhão 2", "body", "muted-foreground"));
  content.appendChild(cv);
  const t = F.detailTable(status);
  content.appendChild(t); F.fillW(t);
  return f;
};
F.fitHeight = async (f) => {
  await S.sleep(400);
  const c = penpotUtils.findShape((s) => s.name === "Content", f);
  const h = Math.max(...c.children.filter((k) => !k.hidden).map((k) => k.y + k.height)) - f.y + 24;
  f.resize(1440, Math.max(900, Math.ceil(h)));
  return h;
};

F.wrapHeader = (p) => {
  const h = p.children.find((k) => k.name === "Header");
  for (const t of h.children.filter((k) => k.type === "text")) { t.growType = "auto-height"; t.layoutChild.horizontalSizing = "fill"; }
};
F.dlg = async (f, title, desc, { alert, body = [], btns }) => {
  const p = S.panel(title, 512, desc);
  F.wrapHeader(p);
  if (alert) { const a = F.alert(alert[0], alert[1], alert[2]); p.appendChild(a); F.fillW(a); }
  for (const b of body) { p.appendChild(b); F.fillW(b); }
  const r = F.row("Footer", 8);
  r.flex.justifyContent = "end";
  for (const [v, l, st] of btns) r.appendChild(F.btn(v, "default", l, st || "default"));
  p.appendChild(r); F.fillW(r);
  S.withDialog(f, p);
  await S.sleep(300);
  penpotUtils.setParentXY(p, (1440 - 512) / 2, Math.round((900 - p.height) / 2));
  return p;
};
F.detailLoading = (name) => {
  const { f, content } = S.screen(name, { title: "Fechamento · Milho 2025", back: true });
  const top = F.row("Top", 12); top.appendChild(F.skel(96, 20)); top.appendChild(F.skel(320, 16)); F.spacer(top); top.appendChild(F.skel(120, 36));
  content.appendChild(top); F.fillW(top);
  const r = F.row("Kpis", 16);
  for (let i = 0; i < 4; i++) { const k = S.inst("KpiCard", { content: "simple", emphasis: "default", state: "loading" }); r.appendChild(k); k.layoutChild.horizontalSizing = "fill"; }
  content.appendChild(r); F.fillW(r);
  content.appendChild(F.skel(520, 16));
  const t = F.col("Tabela", 0); S.stroke(t, "border"); S.radius(t, "radius.lg"); S.fill(t, "background"); t.clipContent = true;
  const h = F.mrow("Header", 40, "muted"); h.appendChild(F.skel(120, 12)); t.appendChild(h); F.fillW(h);
  for (let i = 0; i < 7; i++) { const rr = F.mrow("Linha", 44); rr.appendChild(F.skel(140, 14)); F.spacer(rr); rr.appendChild(F.skel(80, 14)); rr.appendChild(F.skel(200, 14)); rr.appendChild(F.skel(180, 14)); rr.appendChild(F.skel(140, 14)); t.appendChild(rr); F.fillW(rr); }
  content.appendChild(t); F.fillW(t);
  return f;
};
F.detailBase = (name = "base") => { const f = F.detail(name, "fechado"); f.resize(1440, 900); return f; };

// Plot lists: principal on top, locked calcs
F.lcaCard = (d) => {
  const c = F.card("Avaliação — " + d.name, "column", 16, 20, 20);
  const hd = F.row("Header", 8);
  hd.flex.alignItems = "start";
  const tt = S.stack("Title", "column", 8);
  tt.appendChild(S.txt(d.name, "body-strong"));
  const bg = F.row("Badges", 6);
  bg.appendChild(F.badge("secondary", d.crop));
  bg.appendChild(F.badge("outline", d.year));
  if (d.principal) bg.appendChild(S.icon("pin", 14, "primary"));
  tt.appendChild(bg);
  hd.appendChild(tt); tt.layoutChild.horizontalSizing = "fill";
  hd.appendChild(S.inst("Button Icon", { variant: "ghost", size: "default", state: "default" }));
  c.appendChild(hd); F.fillW(hd);
  F.pending.push(penpotUtils.findShape((s) => s.name === "Button Icon", hd));
  const mt = F.row("Meta", 32);
  mt.appendChild(F.kv("Área", d.area)); mt.appendChild(F.kv("Montante", d.amount));
  c.appendChild(mt);
  const pr = S.inst("ProgressRow", { tone: d.pct === "100%" ? "success" : "chart-1" });
  S.texts(pr, ["Progresso", d.pct]);
  c.appendChild(pr); F.fillW(pr);
  const ft = F.row("Footer", 8);
  if (d.lock) ft.appendChild(F.lockTag(d.lock));
  F.spacer(ft);
  ft.appendChild(F.btn("outline", "sm", d.pct === "100%" ? "Ver resultado →" : "Continuar →"));
  c.appendChild(ft); F.fillW(ft);
  return c;
};
F.pending = [];
// Instances need async icon swaps and bar widths after layout; run once per frame.
F.finish = async (root) => {
  for (const b of F.pending.splice(0)) Array.isArray(b) ? await S.swapIn(b[0], b[1], "foreground") : await S.swapIn(b, "ellipsis-vertical", "foreground");
  await S.sleep(300);
  for (const pr of penpotUtils.findShapes((s) => s.name === "ProgressRow", root)) {
    const bar = penpotUtils.findShape((s) => s.name === "bar", pr), v = penpotUtils.findShape((s) => s.name === "value", pr);
    const pct = parseInt(penpotUtils.findShapes((s) => s.type === "text", pr).pop().characters) / 100;
    if (bar && v && pct) v.resize(Math.max(1, bar.width * pct), v.height);
  }
};
F.lcaItems = [
  { name: "Milho safra 2025", crop: "Milho", year: "2025", area: "38,2 ha", amount: "412,6 t", pct: "100%", principal: true, lock: "Travada · fechamento Milho 2025" },
  { name: "Soja safra 2025", crop: "Soja", year: "2025", area: "38,2 ha", amount: "128,4 t", pct: "60%", principal: true },
  { name: "Milho safra 2024", crop: "Milho", year: "2024", area: "38,2 ha", amount: "398,0 t", pct: "100%", principal: true, lock: "Travada · fechamento Milho 2024 (verificado)" },
  { name: "Milho 2025 — teste adubação", crop: "Milho", year: "2025", area: "38,2 ha", amount: "412,6 t", pct: "100%" },
];
F.grid = (content, cards) => {
  const g = F.col("Grid", 16);
  for (let i = 0; i < cards.length; i += 2) {
    const r = F.row("Row", 16); r.flex.alignItems = "start";
    for (const c of cards.slice(i, i + 2)) { r.appendChild(c); c.layoutChild.horizontalSizing = "fill"; }
    if (cards.length - i === 1) F.spacer(r);
    g.appendChild(r); F.fillW(r);
  }
  content.appendChild(g); F.fillW(g);
  return g;
};
F.lcaScreen = (name) => {
  const { f, content } = S.plotScreen(name, { active: "Carbono emissão" });
  F.sectionHeader(content, "Avaliações Carbono Emissão", "Fixados no topo: são sugeridos para cada cultura e ano no fechamento.", [F.btn("outline", "default", "Comparar"), F.btn("default", "default", "Nova avaliação")]);
  F.grid(content, F.lcaItems.map(F.lcaCard));
  return f;
};
F.menu = async (items, label) => {
  const m = F.col("Dropdown Menu", 0, 4, 4);
  S.fill(m, "popover"); S.stroke(m, "border"); S.radius(m, "radius.md"); S.shadow(m, "shadow.md");
  if (label) { const l = F.row("Menu Label", 0, 8, 6); l.appendChild(S.txt(label, "caption-strong", "muted-foreground")); m.appendChild(l); F.fillW(l); }
  for (const it of items) {
    if (it === "-") { const sp = S.inst("Separator", { orientation: "horizontal" }); m.appendChild(sp); F.fillW(sp); continue; }
    const [lab, icon, variant = "default", state = "default"] = it;
    const mi = S.inst("Menu Item", { variant, state });
    S.setText(mi, lab);
    m.appendChild(mi); F.fillW(mi);
    await S.swapIn(mi, icon, variant === "destructive" ? "destructive" : "foreground");
  }
  F.fixW(m, 240);
  return m;
};
F.openMenu = async (f, card, items, label) => {
  const m = await F.menu(items, label);
  f.appendChild(m);
  m.layoutChild.absolute = true;
  m.layoutChild.zIndex = 12;
  await S.sleep(300);
  const b = penpotUtils.findShape((s) => s.name === "Button Icon", card);
  penpotUtils.setParentXY(m, b.x - f.x + b.width - 240, b.y - f.y + 36);
  return m;
};

F.rothcCard = (d) => {
  const c = F.card("Cálculo — " + d.name, "column", 16, 20, 20);
  const hd = F.row("Header", 8);
  hd.flex.alignItems = "start";
  const tt = S.stack("Title", "column", 8);
  const nm = F.row("Nome", 6);
  nm.appendChild(S.txt(d.name, "body-strong", "primary"));
  nm.appendChild(S.icon("arrow-up-right", 14, "primary"));
  tt.appendChild(nm);
  if (d.principal || d.lock) { const bg = F.row("Badges", 6); if (d.principal) bg.appendChild(S.icon("pin", 14, "primary")); tt.appendChild(bg); }
  hd.appendChild(tt); tt.layoutChild.horizontalSizing = "fill";
  const bi = S.inst("Button Icon", { variant: "ghost", size: "default", state: "default" });
  hd.appendChild(bi); F.pending.push(bi);
  c.appendChild(hd); F.fillW(hd);
  const mt = F.row("Meta", 32);
  mt.appendChild(F.kv("ID", d.id)); mt.appendChild(F.kv("Criado em", d.created));
  c.appendChild(mt);
  const yr = S.stack("Anos", "column", 8);
  yr.appendChild(S.txt("Anos disponíveis", "caption", "muted-foreground"));
  const yb = F.row("Years", 6);
  d.years.forEach((y, i) => yb.appendChild(F.btn(i === d.years.length - 1 ? "default" : "outline", "sm", y)));
  yr.appendChild(yb);
  c.appendChild(yr);
  const ft = F.row("Footer", 8);
  if (d.lock) ft.appendChild(F.lockTag(d.lock));
  F.spacer(ft);
  ft.appendChild(F.btn("outline", "sm", "Visualizar"));
  c.appendChild(ft); F.fillW(ft);
  return c;
};
F.rothcItems = [
  { name: "Roth-C 2023–2027", id: "1042", created: "14 de março de 2025 às 10:12", years: ["2023", "2024", "2025", "2026", "2027"], principal: true, lock: "Travado · fechamentos Milho 2024 e Milho 2025" },
  { name: "Roth-C 2023–2027 · cobertura de inverno", id: "1077", created: "02 de abril de 2025 às 16:40", years: ["2023", "2024", "2025", "2026", "2027"] },
  { name: "Teste plantio direto", id: "1103", created: "20 de agosto de 2026 às 09:05", years: ["2025", "2026"] },
];
F.rothcScreen = (name) => {
  const { f, content } = S.plotScreen(name, { active: "Carbono remoção" });
  F.sectionHeader(content, "Resultados carbono remoção", "Fixados no topo: são sugeridos para o talhão no fechamento.", [F.btn("outline", "default", "Comparar"), F.btn("default", "default", "Preencher módulo")]);
  F.grid(content, F.rothcItems.map(F.rothcCard));
  return f;
};
F.lockedResult = (name) => {
  const { f, content } = S.plotScreen(name, { active: "Carbono emissão" });
  const hd = F.row("PageHeader", 12);
  const bk = S.inst("Button Icon", { variant: "ghost", size: "default", state: "default" }); hd.appendChild(bk); F.pending.push([bk, "arrow-left"]);
  hd.appendChild(S.txt("Milho safra 2025", "h2"));
  hd.appendChild(S.icon("pin", 16, "primary"));
  F.spacer(hd);
  hd.appendChild(F.btn("outline", "sm", "Duplicar como nova"));
  hd.appendChild(F.btn("outline", "sm", "Comparar"));
  content.appendChild(hd); F.fillW(hd);
  const a1 = F.alert("info", "Travada no fechamento Milho 2025", "Não pode ser editada, recalculada nem excluída enquanto o fechamento existir. Para testar mudanças, duplique: a cópia nasce livre.");
  content.appendChild(a1); F.fillW(a1); F.pendingAlert = a1;
  const a2 = F.alert("warning", "Calculado com fatores de 15/01/2025", "Os fatores de emissão foram atualizados em 01/09/2026. Esta avaliação mantém os fatores da época; avaliações novas usam os atuais.");
  const act = penpotUtils.findShape((s) => s.name === "Action" || s.name === "Button", a2); if (act) act.hidden = true;
  content.appendChild(a2); F.fillW(a2);
  const r = F.row("Kpis", 16);
  for (const [l, v, u, d] of [["Pegada de carbono", "0,35", "kgCO₂e/kg", "Por kg de milho"], ["Emissão por hectare", "2,28", "tCO₂e/ha", "38,2 ha"], ["Total Fóssil", "87,1", "tCO₂e", "Métrica de certificação prioritária."]]) {
    const k = S.inst("KpiCard", { content: "simple", emphasis: "default", state: "default" }); S.texts(k, [l, v, u, d]); r.appendChild(k); k.layoutChild.horizontalSizing = "fill";
  }
  content.appendChild(r); F.fillW(r);
  return f;
};

// Closing-model alternatives (A cultura+ano, B janela, C livre): one dialog frame each.
F.OC = { area: 90, lca: 300, rothc: 260, regen: 200 };
F.ocell = (w, kind, text, cap, capTok = "muted-foreground", badge) => {
  const c = S.stack("cell", "column", 4);
  c.appendChild(F.sel(kind, text, w));
  const cr = F.row("Caption", 6);
  cr.appendChild(S.txt(cap, "caption", capTok));
  if (badge) cr.appendChild(F.badge("warning", badge));
  c.appendChild(cr);
  F.fixW(c, w);
  return c;
};
F.optMatrix = (rows) => {
  const C = F.OC;
  const tbl = F.col("Matriz", 0);
  S.stroke(tbl, "border"); S.radius(tbl, "radius.lg"); S.fill(tbl, "background"); tbl.clipContent = true;
  const add = (r) => { tbl.appendChild(r); F.fillW(r); };
  const h = F.mrow("Header", 40, "muted");
  const hn = S.txt("Fazenda / talhão", "caption-strong", "muted-foreground"); h.appendChild(hn); hn.growType = "auto-height"; hn.layoutChild.horizontalSizing = "fill";
  for (const [l, w] of [["Área", C.area], ["Carbono emissão", C.lca], ["Carbono remoção (período usado)", C.rothc], ["Regenerativo", C.regen]]) h.appendChild(F.cellText(l, w, "caption-strong", "muted-foreground"));
  add(h);
  for (const r of rows) {
    if (r.farm) {
      const fr = F.mrow("Fazenda — " + r.farm, 44, "accent");
      const nm = S.txt(r.farm, "body-strong"); fr.appendChild(nm); nm.growType = "auto-height"; nm.layoutChild.horizontalSizing = "fill";
      fr.appendChild(F.cellText(r.area, C.area, "body-strong"));
      fr.appendChild(F.gap(C.lca)); fr.appendChild(F.gap(C.rothc)); fr.appendChild(F.gap(C.regen));
      add(fr);
      continue;
    }
    const pr = F.mrow(r.plot, 68);
    const nb = F.row("Nome", 0, 16, 0); nb.appendChild(S.txt(r.plot, "body")); pr.appendChild(nb); nb.layoutChild.horizontalSizing = "fill";
    pr.appendChild(F.cellText(r.area, C.area));
    pr.appendChild(F.ocell(C.lca, ...r.lca));
    pr.appendChild(F.ocell(C.rothc, ...r.rothc));
    const rg = S.stack("cell", "column", 4); rg.appendChild(F.sel("filled", r.regen, C.regen)); rg.appendChild(S.txt(" ", "caption")); F.fixW(rg, C.regen);
    pr.appendChild(rg);
    add(pr);
    const b = S.inst("Separator", { orientation: "horizontal" }); tbl.appendChild(b); F.fillW(b);
  }
  return tbl;
};
F.optShell = (name, desc) => {
  const { f, content } = F.projectScreen(name);
  F.closingsList(content, F.closings);
  const w = F.wizard(f, 2, desc);
  const st = penpotUtils.findShape((s) => s.name === "Stepper", w.p); if (st) st.hidden = true;
  return f;
};
F.optFill = (f, { bar, help, rows, alert, foot }) => {
  const p = f.children.find((k) => k.name === "Dialog");
  const content = p.children.find((k) => k.name === "Content");
  const ft = p.children.find((k) => k.name === "Footer");
  const b = F.row("Recorte", 16); b.flex.alignItems = "end";
  for (const [label, value, w, control = "select"] of bar) { const fl = S.field(label, value, { control }); b.appendChild(fl); F.fixW(fl, w); }
  content.appendChild(b);
  if (help) content.appendChild(S.txt(help, "caption", "muted-foreground"));
  const m = F.optMatrix(rows); content.appendChild(m); F.fillW(m);
  if (alert) { const a = F.alert("warning", null, alert); content.appendChild(a); F.fillW(a); }
  F.foot(ft, [S.txt(foot, "body", "muted-foreground")], [F.btn("outline", "default", "Voltar"), F.btn("default", "default", "Próximo")]);
};
F.longDesc = () => {
  const hd = penpotUtils.findShape((s) => s.name === "Header" && s.parent?.name?.startsWith("Fluxo"), penpot.root);
  const d = hd.children.filter((k) => k.type === "text")[2];
  d.growType = "auto-height"; d.resize(1440, d.height); d.growType = "auto-height";
};

return Object.keys(F).length;
