/* `/ae/docs` 데이터 생성기 — 🔴 **정본은 플러그인 코드다, 이 파일이 아니다.**

   툴 39종·설명(EN/KO)·패널 7개·출고 이펙트 5종을 **플러그인 repo 에서 읽어** `lib/docsData.ts` 를 찍는다.
   손으로 옮기면 반드시 낡는다 — 전례 둘:
     · 사이트가 없는 모션 프리셋 112개를 두 달간 광고했다 (실제 26)
     · `42 scripts` 가 아직 `promo-assets` 에 살아 있다 (실제 39, 커밋 4c50e0b 로 무효)
   카탈로그가 바뀌면:  npm run build:docs

   앞선 생성기(`proto4/build-docs.mjs`)와 다른 점 셋 — 전부 의도한 것이다:
   ⑴ **EN 도 읽는다.** 구 생성기는 `ko.ts` 만 읽어서 사이트가 한국어에 묶여 있었다.
      툴 설명 39개를 손으로 번역하지 마라 — 제품이 이미 양 로케일을 갖고 있다.
   ⑵ **릴리스는 복사하지 않는다.** `lib/releases.ts` 가 정본이고 페이지가 그걸 직접 import 한다.
      여기서는 **세기만** 한다 (복사하면 정본이 둘이 된다).
   ⑶ **HTML 이 아니라 데이터를 낸다.** 렌더는 `components/site4/docs/` 가 한다.

   읽는 곳:
     ../Dony-s-AE-Plugin/donys/src/data/builtinScripts.ts   툴 id · name · category · 순서
     ../Dony-s-AE-Plugin/donys/src/i18n/{ko,en}.ts          툴 설명 (`scripts` 블록)
     ../Dony-s-AE-Plugin/donys/CSXS/manifest.xml            패널 7개 (AE 창 메뉴 라벨 = 정본)
     ../Dony-s-AE-Plugin/donys/seed-presets/effects/        출고 이펙트 슬러그
     public/riso/spots/<id>.webp | <id>.svg                 프리뷰 존재 여부
     lib/releases.ts · lib/product.ts                       개수 대조용 (쓰지 않는다)
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const PLUGIN = path.resolve(SITE, '../Dony-s-AE-Plugin');

const fail = (msg) => { console.error('\x1b[31m✗ ' + msg + '\x1b[0m'); process.exit(1); };
const read = (p) => {
  if (!fs.existsSync(p)) fail(`읽을 파일이 없다: ${p}\n  플러그인 repo 가 ${PLUGIN} 에 있어야 한다.`);
  return fs.readFileSync(p, 'utf8');
};

/* ── 1. 툴 — id · 표시 이름 · 카테고리 · 순서 ──────────────────────────
   entry 는 한 줄이고 id/name/category 가 붙어 있다. 느슨한 `[\s\S]*?` 는 쓰지 않는다 —
   한 항목에 name 이 빠지면 다음 항목의 name 을 집어오기 때문이다. */
const TOOLS = [];
{
  const src = read(path.join(PLUGIN, 'donys/src/data/builtinScripts.ts'));
  const re = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']*)',\s*category:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) TOOLS.push({ id: m[1], name: m[2], cat: m[3] });
  if (!TOOLS.length) fail('builtinScripts.ts 에서 툴을 하나도 못 읽었다 — 파일 형식이 바뀌었다.');
}

/* 카테고리 순서 = 패널 `ScriptGrid` 와 같다. 여기 없는 카테고리가 나오면 조용히 빠지므로 막는다. */
const CATS = ['motion', 'layer', 'comp', 'shape', 'stylize', 'export'];
{
  const stray = [...new Set(TOOLS.map((t) => t.cat))].filter((c) => !CATS.includes(c));
  if (stray.length) fail(`모르는 카테고리: ${stray.join(', ')} — CATS 에 더하고 사전에 docs.cat.* 를 써라.`);
}

/* ── 2. 툴 설명 — 양 로케일. i18n `scripts` 블록만 본다 ─────────────────
   🔴 파일 전체를 훑고 "같은 키 중 긴 쪽" 을 고르는 휴리스틱은 쓰지 않는다. `toolboxMenu` 에도
   `copyKeyframes` 가 있어서 어느 쪽이 잡히는지가 문장 길이에 달리게 된다. 블록을 못 찾거나
   툴 하나라도 설명이 없으면 **여기서 죽는다** — 빈 카드를 내는 것보다 낫다. */
function scriptsDict(file) {
  const lines = read(file).split('\n');
  const start = lines.findIndex((l) => /^\s{2}"scripts":\s*\{\s*$/.test(l));
  if (start < 0) fail(`${path.basename(file)} 에 "scripts" 블록이 없다 — i18n 구조가 바뀌었다.`);
  const out = {};
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\s{2}\},?\s*$/.test(lines[i])) return out;
    const m = lines[i].match(/^\s*"([A-Za-z][A-Za-z0-9_]*)":\s*("(?:[^"\\]|\\.)*")\s*,?\s*$/);
    if (m) out[m[1]] = JSON.parse(m[2]);
  }
  fail(`${path.basename(file)} 의 "scripts" 블록이 안 닫힌다.`);
}
const KO = scriptsDict(path.join(PLUGIN, 'donys/src/i18n/ko.ts'));
const EN = scriptsDict(path.join(PLUGIN, 'donys/src/i18n/en.ts'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* 패널 툴팁 → 카드 한 줄.
   🔴 첫 줄만 쓰면 안 된다 — `· ` 불릿을 가진 툴은 **첫 줄이 공통 UI 안내**라서 Copy Keys 와
   Paste Keys 가 글자 그대로 같은 설명을 달고 나왔다(2026-09-16 육안 적발). 불릿이 있으면
   불릿이 그 툴이 실제로 하는 일이다. `**말**` 은 사전과 같은 규칙으로 <b> 가 된다. */
const oneLine = (s) => {
  const lines = String(s).split('\n').map((l) => l.trim()).filter(Boolean);
  const bullets = lines.filter((l) => l.startsWith('·')).map((l) => l.replace(/^·\s*/, ''));
  const body = bullets.length ? bullets.join(' · ') : lines[0] || '';
  return esc(body).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').trim();
};

const missing = [];
for (const t of TOOLS) {
  if (!KO[t.id] || !EN[t.id]) { missing.push(t.id); continue; }
  t.ko = oneLine(KO[t.id]);
  t.en = oneLine(EN[t.id]);
}
if (missing.length) fail(`i18n scripts 사전에 설명이 없는 툴: ${missing.join(', ')}\n  ko.ts · en.ts 양쪽에 넣어라 — 사이트가 손번역을 들고 있으면 안 된다.`);

/* ── 3. 프리뷰 자산 ────────────────────────────────────────────────────
   sheet = 툴박스 호버 프리뷰 시트(4×4·16f). 패널이 버튼 위에 띄우는 그 그림 그대로다.
   svg   = Depth Pass 전용 — 컴프 화면에 결과가 안 드러나는 툴이라 제품이 도해를 들고 있다.
   none  = 빈 판. 있다고 우기지 말고 빈 판이라고 적는다. */
const SPOTS = path.join(SITE, 'public/riso/spots');
for (const t of TOOLS) {
  t.preview = fs.existsSync(path.join(SPOTS, t.id + '.webp')) ? 'sheet'
    : fs.existsSync(path.join(SPOTS, t.id + '.svg')) ? 'svg' : 'none';
}

/* ── 4. 패널 — AE 창 메뉴 라벨이 정본 ──────────────────────────────────
   🔴 패널명은 로케일 무관 영문이다(오너 2026-09-01). 여기서 읽은 문자열이 AE 메뉴에 뜨는
   문자열과 **같은 것**이므로 사전에 다시 적지 마라. 순서만 편집 판단이다. */
const PANEL_ORDER = ['toolbox', 'chat', 'library', 'curves', 'expressions', 'custom-1', 'support'];
const PANELS = [];
{
  const xml = read(path.join(PLUGIN, 'donys/CSXS/manifest.xml'));
  const found = new Map();
  for (const m of xml.matchAll(/<Menu>You Name It - ([^<]+)<\/Menu>/g)) {
    const name = m[1].trim();
    found.set(name.toLowerCase().replace(/\s+/g, '-'), name);
  }
  const keys = [...found.keys()].sort().join(',');
  if (keys !== [...PANEL_ORDER].sort().join(',')) {
    fail(`manifest 의 패널과 PANEL_ORDER 가 다르다.\n  manifest: ${keys}\n  order   : ${[...PANEL_ORDER].sort().join(',')}\n  패널이 늘거나 줄면 순서와 사전(docs.panel.*)을 같이 고쳐라.`);
  }
  for (const k of PANEL_ORDER) PANELS.push({ key: k, name: found.get(k) });
}

/* ── 5. 출고 이펙트 — seed-presets 디렉토리가 정본 ─────────────────────
   🔴 이력이 14 → 4 → 5 다. `harnessLint [seed]` 가 세는 것과 같은 디렉토리를 센다.
   이름·설명은 사전(`docs.fx.*`)에 있다 — 사이트 표기가 제품 표기와 갈라진 자리가 있어서
   슬러그만 여기서 내고 표기는 카피 레인이 쥔다(보고서 ⑸ 참조). */
const FX_ORDER = ['riso-print', 'chromatic-aberration', 'crt-screen', 'confetti-vector', 'vox-original'];
{
  const dir = path.join(PLUGIN, 'donys/seed-presets/effects');
  if (!fs.existsSync(dir)) fail(`seed-presets/effects 가 없다: ${dir}`);
  const have = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  if (have.join(',') !== [...FX_ORDER].sort().join(',')) {
    fail(`출고 이펙트가 바뀌었다.\n  디렉토리: ${have.join(', ')}\n  FX_ORDER: ${[...FX_ORDER].sort().join(', ')}\n  CLAUDE.md 닫힌 표를 먼저 봐라 — 은퇴한 10종은 되살리지 않는다.`);
  }
}

/* ── 6. 대조 — 사이트가 광고하는 숫자와 실측이 갈라지면 죽는다 ──────────
   이 페이지가 존재하는 이유가 바로 이 대조다. `lib/product.ts` 는 이 레인이 고치지 않으므로
   틀리면 고쳐야 할 사람에게 알린다. */
{
  const prod = read(path.join(SITE, 'lib/product.ts'));
  const num = (k) => {
    const m = prod.match(new RegExp(`\\b${k}:\\s*(\\d+)`));
    return m ? Number(m[1]) : null;
  };
  const checks = [['scripts', num('scripts'), TOOLS.length], ['effects', num('effects'), FX_ORDER.length]];
  for (const [k, declared, actual] of checks) {
    if (declared !== actual) fail(`lib/product.ts COUNTS.${k} = ${declared} 인데 실측은 ${actual} 이다.\n  사이트가 없는 걸 광고하는 상태다 — product.ts 를 고치고 다시 돌려라.`);
  }
}

/* 릴리스는 **세기만** 한다 — 정본은 `lib/releases.ts` 고 페이지가 그걸 직접 읽는다. */
const RELEASES = (read(path.join(SITE, 'lib/releases.ts')).match(/^\s{4}version:\s*'/gm) || []).length;
if (!RELEASES) fail('lib/releases.ts 에서 릴리스를 못 읽었다 — 형식이 바뀌었다.');

/* ── 7. 출력 ──────────────────────────────────────────────────────── */
const j = (v) => JSON.stringify(v);
const toolLine = (t) => `  { id: ${j(t.id)}, name: ${j(t.name)}, cat: ${j(t.cat)}, preview: ${j(t.preview)}, ko: ${j(t.ko)}, en: ${j(t.en)} },`;

const out = `/* 🔴 **생성물이다. 손으로 고치지 마라.**
   고칠 곳은 \`tools/build-docs-data.mjs\` 이고, 고친 뒤에는  npm run build:docs  를 돌려라.
   내용의 정본은 플러그인 repo 다 — 툴은 \`src/data/builtinScripts.ts\`, 설명은 \`src/i18n/{ko,en}.ts\`,
   패널은 \`CSXS/manifest.xml\`, 이펙트는 \`seed-presets/effects/\`.
   여기 숫자를 손으로 올리면 그 순간 사이트가 없는 걸 광고하기 시작한다(전례 둘 — 생성기 머리말).

   🔴 릴리스 노트는 여기 없다 — \`lib/releases.ts\` 가 정본이고 페이지가 직접 읽는다. */

export type DocsCat = ${CATS.map(j).join(' | ')};
export type DocsPreview = 'sheet' | 'svg' | 'none';

/** 툴 한 장. \`ko\`/\`en\` 은 패널 툴팁에서 뽑은 한 줄이며 \`<b>\` 를 품을 수 있다. */
export type DocsTool = {
  id: string;
  /** 표시 이름 — 로케일 무관 영문. 패널 버튼에 뜨는 문자열과 같다. */
  name: string;
  cat: DocsCat;
  /** sheet = 16프레임 프리뷰 시트 · svg = 도해 · none = 빈 판 */
  preview: DocsPreview;
  ko: string;
  en: string;
};

/** AE 창 메뉴 ▸ Extensions 에 뜨는 패널. \`name\` 은 메뉴 라벨 그대로다(로케일 무관). */
export type DocsPanel = { key: string; name: string };

export const DOCS_CATS: readonly DocsCat[] = [${CATS.map(j).join(', ')}];

export const DOCS_TOOLS: readonly DocsTool[] = [
${TOOLS.map(toolLine).join('\n')}
];

export const DOCS_PANELS: readonly DocsPanel[] = [
${PANELS.map((p) => `  { key: ${j(p.key)}, name: ${j(p.name)} },`).join('\n')}
];

/** 출고 이펙트 슬러그. 표기(이름·설명)는 \`lib/copy/docs.ts\` 의 \`docs.fx.*\` 에 있다. */
export const DOCS_FX: readonly string[] = [
${FX_ORDER.map((s) => `  ${j(s)},`).join('\n')}
];
`;
fs.writeFileSync(path.join(SITE, 'lib/docsData.ts'), out);

/* ── 8. 사람이 읽는 확인 ──────────────────────────────────────────── */
const byCat = CATS.map((c) => `${c} ${TOOLS.filter((t) => t.cat === c).length}`).join(' · ');
const plates = TOOLS.filter((t) => t.preview !== 'none').length;
console.log('lib/docsData.ts 생성');
console.log(`  툴       ${TOOLS.length}  (${byCat})`);
console.log(`  판       ${plates}/${TOOLS.length}  (시트 ${TOOLS.filter((t) => t.preview === 'sheet').length} · 도해 ${TOOLS.filter((t) => t.preview === 'svg').length})`);
console.log(`  설명     KO ${TOOLS.filter((t) => t.ko).length} · EN ${TOOLS.filter((t) => t.en).length}`);
console.log(`  패널     ${PANELS.length}  (${PANELS.map((p) => p.name).join(' · ')})`);
console.log(`  이펙트   ${FX_ORDER.length}`);
console.log(`  릴리스   ${RELEASES}  (복사 안 함 — lib/releases.ts 가 정본)`);
const blank = TOOLS.filter((t) => t.preview === 'none');
if (blank.length) console.log(`  빈 판    ${blank.map((t) => t.name).join(', ')}`);
