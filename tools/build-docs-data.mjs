/* `/ae/docs` 데이터 생성기 — 🔴 **정본은 플러그인 코드다, 이 파일이 아니다.**

   툴·설명(EN/KO)·패널·출고 이펙트를 **플러그인 repo 의 출고 태그에서 읽어** `lib/docsData.ts` 를 찍는다.
   손으로 옮기면 반드시 낡는다 — 전례 둘:
     · 사이트가 없는 모션 프리셋 112개를 두 달간 광고했다 (실제 26)
     · `42 scripts` 가 아직 `promo-assets` 에 살아 있다 (실제 39, 커밋 4c50e0b 로 무효)
   카탈로그가 바뀌면:  npm run build:docs   (`npm run build` 도 이걸 먼저 돈다)

   🔴 **읽는 곳은 워킹트리가 아니라 태그 `v<VERSION>` 이다** (VERSION = `lib/product.ts`).
      사이트가 파는 건 구매자가 받는 zxp 이고, 그건 태그에서 나온다. 2026-09-26 전에는 워킹트리(HEAD)를
      읽어서 다음 재생성이 ⑴ 태그 뒤에 들어온 툴(Vertex Grid)을 광고하고 ⑵ 태그 뒤 개명
      (`proximityRig → effectorRig`)으로 판을 `none` 으로 떨어뜨릴 참이었다 — 둘 다 **안 나간 코드**다.
      `git show <태그>:<경로>` 는 플러그인 워킹트리·브랜치 상태와 무관하다(옆 세션이 뭘 고치고 있든 같다).
      릴리스 순서: 플러그인 태그 → `lib/product.ts` VERSION → 이 생성기. 태그가 없으면 여기서 죽는다.

   앞선 생성기(`proto4/build-docs.mjs`)와 다른 점 셋 — 전부 의도한 것이다:
   ⑴ **EN 도 읽는다.** 구 생성기는 `ko.ts` 만 읽어서 사이트가 한국어에 묶여 있었다.
      툴 설명을 손으로 번역하지 마라 — 제품이 이미 양 로케일을 갖고 있다.
   ⑵ **릴리스는 복사하지 않는다.** `lib/releases.ts` 가 정본이고 페이지가 그걸 직접 import 한다.
      여기서는 **세기만** 한다 (복사하면 정본이 둘이 된다).
   ⑶ **HTML 이 아니라 데이터를 낸다.** 렌더는 `components/site4/docs/` 가 한다.

   읽는 곳 (전부 태그 v<VERSION> 안):
     donys/src/data/builtinScripts.ts   툴 id · name · category · 순서
     donys/src/i18n/{ko,en}.ts          툴 설명 (`scripts` 블록) + 사용법 표의 `{{ns.key}}` 라벨
     donys/CSXS/manifest.xml            패널 (AE 창 메뉴 라벨 = 정본)
     donys/seed-presets/effects/        출고 이펙트 슬러그
     donys/usage/{ko,en}/<id>.md        사용법 → `lib/docsUsage.ts` (파서 = `tools/usageMd.mjs`)

   🔴 **사용법 문서만 개발용 우회가 있다**: `DOCS_PLUGIN_REF=<브랜치·SHA·플러그인 체크아웃 경로>` 이면 `donys/usage/` 와
   그 라벨 사전(`i18n`)을 태그 대신 그 ref 에서 읽는다(v2.8.0 이 나오기 전에 화면을 개발하려는 용도). 카탈로그(툴·패널·이펙트·설명)는
   **여전히 태그**다 — 사이트가 파는 건 출고본이다. 결과 `lib/docsUsage.ts` 의 `DOCS_USAGE_SRC` 가 `dev:…` 로 찍히고
   `deployCheck` 가 그걸 배포 실패로 막는다. 기본은 태그다.
   사이트 쪽:
     public/riso/spots/<id>.webp        프리뷰 시트 존재 여부
     lib/copy/docs.ts                   `docs.note.<id>` 가 가리키는 툴이 태그에 있는지 (대조만)
     lib/releases.ts · lib/product.ts   개수 대조용 (쓰지 않는다)
*/
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseUsage } from './usageMd.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const PLUGIN = path.resolve(SITE, '../Dony-s-AE-Plugin');

const fail = (msg) => { console.error('\x1b[31m✗ ' + msg + '\x1b[0m'); process.exit(1); };
const readSite = (rel) => {
  const p = path.join(SITE, rel);
  if (!fs.existsSync(p)) fail(`읽을 파일이 없다: ${p}`);
  return fs.readFileSync(p, 'utf8');
};

/* ── 0. 어느 판을 읽나 — `lib/product.ts` 의 VERSION = 출고본 ─────────────── */
const VERSION = readSite('lib/product.ts').match(/export const VERSION\s*=\s*'(\d+\.\d+\.\d+)'/)?.[1];
if (!VERSION) fail('lib/product.ts 에서 VERSION 을 못 읽었다 — `export const VERSION = \'x.y.z\'` 형식이어야 한다.');
const TAG = `v${VERSION}`;

const git = (...args) => execFileSync('git', ['-C', PLUGIN, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
if (!fs.existsSync(path.join(PLUGIN, '.git'))) fail(`플러그인 repo 가 없다: ${PLUGIN}`);
let TAG_COMMIT;
try { TAG_COMMIT = git('rev-parse', '--verify', '--quiet', `refs/tags/${TAG}^{commit}`).trim(); }
catch { fail(`플러그인 repo 에 태그 ${TAG} 가 없다.\n  lib/product.ts VERSION(${VERSION})이 출고본인지, 태그를 만들었는지(또는 fetch 했는지) 확인해라.\n  🔴 워킹트리로 대신 읽지 마라 — 안 나간 툴을 광고하게 된다.`); }

/** 태그 안의 파일 한 개. 없으면 죽는다 — 빈 카드를 내는 것보다 낫다. */
const show = (rel) => {
  try { return git('show', `${TAG}:${rel}`); }
  catch { fail(`태그 ${TAG} 에 ${rel} 이 없다 — 플러그인 구조가 바뀌었다.`); }
};

/* ── 1. 툴 — id · 표시 이름 · 카테고리 · 순서 ──────────────────────────
   entry 는 한 줄이고 id/name/category 가 붙어 있다. 느슨한 `[\s\S]*?` 는 쓰지 않는다 —
   한 항목에 name 이 빠지면 다음 항목의 name 을 집어오기 때문이다. */
const TOOLS = [];
{
  const src = show('donys/src/data/builtinScripts.ts');
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
/** i18n 파일 전체를 중첩 객체로 읽는다. 파일은 `const ko = { … } as const` 꼴이고 한 줄에 한 항목이다
    (`"key": "문자열",` · `"ns": {` · `},` · `//` 주석). 한 줄 문자열이 아닌 값이 나오면 중첩이 어긋나므로 끝에서 막는다. */
function parseI18n(text, name) {
  const root = {};
  const stack = [root];
  let opened = false;
  for (const line of text.split('\n')) {
    if (/^\s*(\/\/.*)?$/.test(line)) continue;
    let m;
    if (!opened) { if (/^const \w+ = \{\s*$/.test(line)) opened = true; continue; }
    if ((m = line.match(/^\s*"((?:[^"\\]|\\.)+)":\s*\{\s*$/))) { const o = {}; stack.at(-1)[JSON.parse(`"${m[1]}"`)] = o; stack.push(o); continue; }
    if (/^\s*\},?\s*(as const;)?\s*$/.test(line)) { stack.pop(); continue; }
    if ((m = line.match(/^\s*"((?:[^"\\]|\\.)+)":\s*("(?:[^"\\]|\\.)*")\s*,?\s*(\/\/.*)?$/))) stack.at(-1)[JSON.parse(`"${m[1]}"`)] = JSON.parse(m[2]);
  }
  if (!opened || stack.length !== 0) fail(`${name} 의 중첩이 안 맞는다 — i18n 구조가 바뀌었다.`);
  return root;
}

/* 🔴 파일 전체를 훑고 "같은 키 중 긴 쪽" 을 고르는 휴리스틱은 쓰지 않는다 — 블록(`scripts`)을 이름으로 짚는다. */
function scriptsDict(rel) {
  const name = path.basename(rel);
  const block = parseI18n(show(rel), name).scripts;
  if (!block) fail(`${name} 에 "scripts" 블록이 없다 — i18n 구조가 바뀌었다.`);
  return Object.fromEntries(Object.entries(block).filter(([, v]) => typeof v === 'string'));
}
const KO = scriptsDict('donys/src/i18n/ko.ts');
const EN = scriptsDict('donys/src/i18n/en.ts');

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

/* ── 3. 프리뷰 시트 ────────────────────────────────────────────────────
   sheet = 툴박스 호버 프리뷰 시트(4×4·16f). 패널이 버튼 위에 띄우는 그림 그대로다.
   none  = 빈 판. 새 툴이 시트 없이 나갈 수는 있다 — 있다고 우기지 말고 빈 판이라고 적는다.
   🔴 **주인 없는 시트는 죽는다.** 시트 파일명이 태그의 툴 id 와 안 맞으면 거의 항상 **개명**이다
   (`proximityRig → effectorRig` 가 다음 태그에서 그렇게 된다) — 조용히 두면 그 툴 판이 `none` 으로
   떨어지고 옛 시트는 아무도 안 쓰는 파일로 남는다. 파일명을 새 id 로 옮기거나(개명), 지워라(은퇴).
   (구 `svg` 도해 분기는 Depth Pass 가 시트를 가지면서 소비자 0 이 돼 지웠다 — 2026-09-26.) */
const SPOTS = path.join(SITE, 'public/riso/spots');
const ids = new Set(TOOLS.map((t) => t.id));
for (const t of TOOLS) t.preview = fs.existsSync(path.join(SPOTS, t.id + '.webp')) ? 'sheet' : 'none';
{
  /* 툴 시트 = camelCase 이름 그대로(`bentoGrid.webp`). `fx-*` · `panel-*.en` · `still/` 은 다른 자산이다. */
  const orphans = fs.readdirSync(SPOTS)
    .filter((f) => /^[a-z][A-Za-z0-9]*\.webp$/.test(f))
    .map((f) => f.replace(/\.webp$/, ''))
    .filter((id) => !ids.has(id));
  if (orphans.length) {
    const blank = TOOLS.filter((t) => t.preview === 'none').map((t) => t.id);
    fail(`태그 ${TAG} 에 없는 툴의 시트가 있다: ${orphans.join(', ')}\n  시트 없는 툴: ${blank.join(', ') || '(없음)'}\n  개명이면 public/riso/spots/<옛id>.webp 를 새 id 로 옮기고, 은퇴한 툴이면 지워라.`);
  }
}

/* ── 4. 패널 — AE 창 메뉴 라벨이 정본 ──────────────────────────────────
   🔴 패널명은 로케일 무관 영문이다(오너 2026-09-01). 여기서 읽은 문자열이 AE 메뉴에 뜨는
   문자열과 **같은 것**이므로 사전에 다시 적지 마라. 순서만 편집 판단이다. */
const PANEL_ORDER = ['toolbox', 'chat', 'library', 'curves', 'expressions', 'custom-1', 'support'];
const PANELS = [];
{
  const xml = show('donys/CSXS/manifest.xml');
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
   슬러그만 여기서 내고 표기는 카피 레인이 쥔다. */
const FX_ORDER = ['riso-print', 'chromatic-aberration', 'crt-screen', 'confetti-vector', 'vox-original'];
{
  const have = git('ls-tree', '-d', '--name-only', TAG, 'donys/seed-presets/effects/')
    .split('\n').filter(Boolean).map((p) => path.posix.basename(p)).sort();
  if (!have.length) fail(`태그 ${TAG} 에 donys/seed-presets/effects/ 가 없다.`);
  if (have.join(',') !== [...FX_ORDER].sort().join(',')) {
    fail(`출고 이펙트가 바뀌었다.\n  태그 ${TAG}: ${have.join(', ')}\n  FX_ORDER: ${[...FX_ORDER].sort().join(', ')}\n  CLAUDE.md 닫힌 표를 먼저 봐라 — 은퇴한 10종은 되살리지 않는다.`);
  }
}

/* ── 6. 대조 — 사이트가 광고하는 숫자와 실측이 갈라지면 죽는다 ──────────
   이 페이지가 존재하는 이유가 바로 이 대조다. `lib/product.ts` 는 이 레인이 고치지 않으므로
   틀리면 고쳐야 할 사람에게 알린다. */
{
  const prod = readSite('lib/product.ts');
  const num = (k) => {
    const m = prod.match(new RegExp(`\\b${k}:\\s*(\\d+)`));
    return m ? Number(m[1]) : null;
  };
  const checks = [['scripts', num('scripts'), TOOLS.length], ['effects', num('effects'), FX_ORDER.length]];
  for (const [k, declared, actual] of checks) {
    if (declared !== actual) fail(`lib/product.ts COUNTS.${k} = ${declared} 인데 태그 ${TAG} 실측은 ${actual} 이다.\n  사이트가 없는 걸 광고하는 상태다 — product.ts 를 고치고 다시 돌려라.`);
  }
}

/* 툴 카드의 추가 줄(`docs.note.<id>` — 요구사항·한계)이 가리키는 툴이 태그에 있어야 한다.
   개명·은퇴 뒤에 조용히 사라지는 줄이 되면 안 된다(그 줄이 Depth Pass 의 OS·다운로드 고지다). */
{
  const noteIds = [...new Set([...readSite('lib/copy/docs.ts').matchAll(/'docs\.note\.([A-Za-z0-9]+)'\s*:/g)].map((m) => m[1]))];
  const stray = noteIds.filter((id) => !ids.has(id));
  if (stray.length) fail(`lib/copy/docs.ts 의 docs.note.<id> 가 태그 ${TAG} 에 없는 툴을 가리킨다: ${stray.join(', ')}\n  개명이면 키를 새 id 로, 은퇴면 키를 지워라.`);
}

/* 릴리스는 **세기만** 한다 — 정본은 `lib/releases.ts` 고 페이지가 그걸 직접 읽는다. */
const RELEASES = (readSite('lib/releases.ts').match(/^\s{4}version:\s*'/gm) || []).length;
if (!RELEASES) fail('lib/releases.ts 에서 릴리스를 못 읽었다 — 형식이 바뀌었다.');

/* ── 6b. 사용법 — `donys/usage/{ko,en}/<id>.md` ───────────────────────
   id 규약(플러그인 repo 파일 규약 v1): 툴 = builtinScripts id · 패널 = `panel-<key>`(`custom-1` → `panel-custom`) ·
   카탈로그 = `catalog-<kind>`. 🔴 `carouselRig` 는 갱신 중이라 문서가 없다 — 없는 id 는 **토글이 안 뜰 뿐 에러가 아니다**.
   읽는 곳 = 기본 태그. `DOCS_PLUGIN_REF` 가 있으면 그 ref(브랜치 · SHA · 플러그인 체크아웃 경로)에서 usage 와 라벨 사전을 읽는다. */
const CATALOG_KINDS = ['expressions', 'gradients', 'textPresets', 'curves', 'motionPresets', 'effects'];
const USAGE_IDS = new Map([
  ...TOOLS.map((t) => [t.id, 'tool']),
  ...PANELS.map((p) => [`panel-${p.key.replace(/-\d+$/, '')}`, 'panel']),
  ...CATALOG_KINDS.map((k) => [`catalog-${k}`, 'catalog']),
]);

const softGit = (ref, rel) => { try { return git('show', `${ref}:${rel}`); } catch { return null; } };
const gitList = (ref, dir) => git('ls-tree', '--name-only', ref, `${dir}/`).split('\n').filter(Boolean).map((p) => path.posix.basename(p));

function usageSource() {
  const ref = (process.env.DOCS_PLUGIN_REF || '').trim();
  if (!ref) return { label: TAG, dev: false, read: (rel) => softGit(TAG, rel), list: (dir) => gitList(TAG, dir) };
  const dir = path.resolve(ref);
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    return {
      label: `dev:${dir}`, dev: true,
      read: (rel) => (fs.existsSync(path.join(dir, rel)) ? fs.readFileSync(path.join(dir, rel), 'utf8') : null),
      list: (d) => (fs.existsSync(path.join(dir, d)) ? fs.readdirSync(path.join(dir, d)) : []),
    };
  }
  let sha;
  try { sha = git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`).trim(); }
  catch { fail(`DOCS_PLUGIN_REF=${ref} 는 디렉토리도 플러그인 repo 의 ref 도 아니다.`); }
  return { label: `dev:${ref}@${sha.slice(0, 7)}`, dev: true, read: (rel) => softGit(sha, rel), list: (d) => gitList(sha, d) };
}

/** `{{ns.key}}` → 제품이 출고하는 라벨. `ns` 최상위 블록 안에서 먼저 점이 든 평평한 키로, 그다음 중첩 경로로 찾는다. */
function labeler(dict, lang, srcLabel) {
  const lookup = (key) => {
    const i = key.indexOf('.');
    const ns = dict[key.slice(0, i)];
    if (i < 0 || !ns || typeof ns !== 'object') return undefined;
    const rest = key.slice(i + 1);
    if (typeof ns[rest] === 'string') return ns[rest];
    let cur = ns;
    for (const part of rest.split('.')) cur = cur && typeof cur === 'object' ? cur[part] : undefined;
    return typeof cur === 'string' ? cur : undefined;
  };
  return (key, where) => {
    const v = lookup(key);
    if (v === undefined) throw new Error(`${where}: {{${key}}} 가 ${srcLabel} 의 ${lang}.ts 에 없다 — 라벨을 손으로 쓰지 말고 대화상자가 쓰는 키를 적어라.`);
    return v.replace(/\*\*/g, '').replace(/\s*\n\s*/g, ' ').trim();
  };
}

const USAGE = {};
const usageNotes = { verify: 0, skipped: [], orphan: [] };
const SRC = usageSource();
{
  const files = Object.fromEntries(['ko', 'en'].map((l) => [l, new Set(SRC.list(`donys/usage/${l}`).filter((f) => /^[A-Za-z][A-Za-z0-9-]*\.md$/.test(f) && f !== 'README.md').map((f) => f.slice(0, -3)))]));
  const all = [...new Set([...files.ko, ...files.en])].sort();
  if (all.length) {
    const resolvers = {};
    for (const l of ['ko', 'en']) {
      const text = SRC.read(`donys/src/i18n/${l}.ts`);
      if (text === null) fail(`${SRC.label} 에 donys/src/i18n/${l}.ts 가 없다 — 사용법 표의 라벨을 풀 수 없다.`);
      resolvers[l] = labeler(parseI18n(text, `${l}.ts`), l, SRC.label);
    }
    for (const id of all) {
      if (!USAGE_IDS.has(id)) { usageNotes.orphan.push(id); continue; }
      if (!files.ko.has(id) || !files.en.has(id)) { usageNotes.skipped.push(`${id}(${files.ko.has(id) ? 'en' : 'ko'} 없음)`); continue; }
      const entry = {};
      try {
        for (const l of ['ko', 'en']) {
          const where = `donys/usage/${l}/${id}.md`;
          const r = parseUsage(SRC.read(where), l, resolvers[l], where);
          if (r.id !== id) throw new Error(`${where}: frontmatter id(${r.id}) 가 파일명과 다르다.`);
          if (r.kind !== USAGE_IDS.get(id)) throw new Error(`${where}: kind(${r.kind}) 가 id 규약(${USAGE_IDS.get(id)})과 다르다.`);
          usageNotes.verify += r.verify;
          entry.kind = r.kind;
          entry[l] = { requires: r.requires, sel: r.sel, ctl: r.ctl, mod: r.mod, lim: r.lim };
        }
      } catch (e) { fail(e.message); }
      USAGE[id] = entry;
    }
  }
}

/* ── 7. 출력 ──────────────────────────────────────────────────────── */
const j = (v) => JSON.stringify(v);
const toolLine = (t) => `  { id: ${j(t.id)}, name: ${j(t.name)}, cat: ${j(t.cat)}, preview: ${j(t.preview)}, ko: ${j(t.ko)}, en: ${j(t.en)} },`;

const out = `/* 🔴 **생성물이다. 손으로 고치지 마라.**
   고칠 곳은 \`tools/build-docs-data.mjs\` 이고, 고친 뒤에는  npm run build:docs  를 돌려라.
   내용의 정본은 플러그인 repo 의 **출고 태그 ${TAG}** 다 — 툴은 \`src/data/builtinScripts.ts\`,
   설명은 \`src/i18n/{ko,en}.ts\`, 패널은 \`CSXS/manifest.xml\`, 이펙트는 \`seed-presets/effects/\`.
   (워킹트리가 아니다 — 사이트가 파는 건 구매자가 받는 zxp 다.)
   여기 숫자를 손으로 올리면 그 순간 사이트가 없는 걸 광고하기 시작한다(전례 둘 — 생성기 머리말).

   🔴 릴리스 노트는 여기 없다 — \`lib/releases.ts\` 가 정본이고 페이지가 직접 읽는다. */

/** 이 파일을 찍은 플러그인 태그. \`lib/product.ts\` VERSION 과 같아야 한다. */
export const DOCS_TAG = ${j(TAG)};

export type DocsCat = ${CATS.map(j).join(' | ')};
export type DocsPreview = 'sheet' | 'none';

/** 툴 한 장. \`ko\`/\`en\` 은 패널 툴팁에서 뽑은 한 줄이며 \`<b>\` 를 품을 수 있다. */
export type DocsTool = {
  /** 플러그인 id — 카드 앵커(\`#tool-<id>\`)도 이 값이다. */
  id: string;
  /** 표시 이름 — 로케일 무관 영문. 패널 버튼에 뜨는 문자열과 같다. */
  name: string;
  cat: DocsCat;
  /** sheet = 16프레임 프리뷰 시트 · none = 빈 판 */
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

const usageOut = `/* 🔴 **생성물이다. 손으로 고치지 마라.**
   고칠 곳은 플러그인 repo 의 \`donys/usage/{ko,en}/<id>.md\` 이고(사이트 repo 에서 사용법 문장을 고치지 마라),
   파서·변환기는 \`tools/usageMd.mjs\`, 읽는 쪽은 \`tools/build-docs-data.mjs\`. 고친 뒤  npm run build:docs  를 돌려라.
   읽은 곳 = \`DOCS_USAGE_SRC\`. 기본은 출고 태그(\`lib/product.ts\` VERSION)다 — \`dev:…\` 는 \`DOCS_PLUGIN_REF\` 개발용 우회이고
   \`deployCheck\` 가 그 상태의 배포를 막는다.

   \`id\` = 툴 id · \`panel-<key>\`(\`custom-1\` = \`panel-custom\`) · \`catalog-<kind>\`. 여기 없는 id 는 그 카드에 토글이 안 뜬다(에러 아님).
   🔴 값은 **이스케이프를 거친 최소 HTML**(\`p ul li table thead tbody tr th td code b\`)이다 — \`dangerouslySetInnerHTML\` 로 넣는다.
   \`requires\` 는 일반 텍스트다. 표의 컨트롤 칸은 생성 때 제품 라벨(\`{{ns.key}}\`)로 이미 풀려 있다. */

/** 이 파일을 찍은 곳 — 태그(\`v2.8.0\`) 또는 개발 우회(\`dev:<ref>\`). */
export const DOCS_USAGE_SRC = ${j(SRC.label)};

export type DocsUsageKind = 'tool' | 'panel' | 'catalog';

/** 한 로캘의 사용법 — 4절(선택 · 컨트롤 · 수식어 · 한계·되돌리기)이 HTML 이다. */
export type DocsUsageLoc = {
  /** 요구 사항 한 줄씩(없으면 \`[]\`). 배지로 그린다. */
  requires: string[];
  sel: string;
  ctl: string;
  mod: string;
  lim: string;
};

export type DocsUsage = { kind: DocsUsageKind; ko: DocsUsageLoc; en: DocsUsageLoc };

export const DOCS_USAGE: Readonly<Record<string, DocsUsage>> = ${JSON.stringify(USAGE, null, 2)};
`;
fs.writeFileSync(path.join(SITE, 'lib/docsUsage.ts'), usageOut);

/* ── 8. 사람이 읽는 확인 ──────────────────────────────────────────── */
const byCat = CATS.map((c) => `${c} ${TOOLS.filter((t) => t.cat === c).length}`).join(' · ');
const plates = TOOLS.filter((t) => t.preview === 'sheet').length;
console.log(`lib/docsData.ts 생성 — 플러그인 태그 ${TAG} (${TAG_COMMIT.slice(0, 7)})`);
console.log(`  툴       ${TOOLS.length}  (${byCat})`);
console.log(`  판       ${plates}/${TOOLS.length}`);
console.log(`  설명     KO ${TOOLS.filter((t) => t.ko).length} · EN ${TOOLS.filter((t) => t.en).length}`);
console.log(`  패널     ${PANELS.length}  (${PANELS.map((p) => p.name).join(' · ')})`);
console.log(`  이펙트   ${FX_ORDER.length}`);
console.log(`  릴리스   ${RELEASES}  (복사 안 함 — lib/releases.ts 가 정본)`);
const uBy = (k) => Object.values(USAGE).filter((u) => u.kind === k).length;
console.log(`lib/docsUsage.ts 생성 — ${SRC.label}`);
console.log(`  사용법   ${Object.keys(USAGE).length}  (툴 ${uBy('tool')}/${TOOLS.length} · 패널 ${uBy('panel')}/${PANELS.length} · 카탈로그 ${uBy('catalog')}/${CATALOG_KINDS.length})${Object.keys(USAGE).length ? '' : ' — 이 ref 에는 donys/usage/ 가 없다: 토글이 안 뜬다'}`);
const warnU = (m) => console.warn('\x1b[33m⚠ ' + m + '\x1b[0m');
if (usageNotes.verify) warnU(`사용법에 <!-- VERIFY --> 가 ${usageNotes.verify}개 남아 있다 — 검증 레인이 안 끝난 문서다(화면에서는 지웠다).`);
if (usageNotes.skipped.length) warnU(`한 로캘만 있는 사용법은 건너뛴다: ${usageNotes.skipped.join(', ')}`);
if (usageNotes.orphan.length) warnU(`카드가 없는 id 의 사용법(개명·은퇴·이월?): ${usageNotes.orphan.join(', ')}`);
if (SRC.dev) warnU(`개발 우회 — 사용법을 ${SRC.label} 에서 읽었다. 이 상태로 배포하지 마라(deployCheck 가 막는다).`);
const blank = TOOLS.filter((t) => t.preview === 'none');
if (blank.length) console.log(`  빈 판    ${blank.map((t) => t.name).join(', ')}`);
