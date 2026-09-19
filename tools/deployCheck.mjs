#!/usr/bin/env node
/* 배포 게이트 — `npm run build` 가 구운 `out/` 을 **기계로** 검사한다.
   손으로 훑는 검수를 대체하려고 만든 게 아니라, **같은 결함이 두 번 나가는 걸** 막으려고 만들었다.
   여기 있는 검사는 전부 실제로 한 번씩 났던 것이다:

     [checkout] 프로토가 모든 CTA 를 `#price` 로 보냈고 가격 섹션엔 버튼이 0이었다 → 팔 수 없는 페이지
     [legal]    약관·개인정보·환불이 href 없는 텍스트였다 → 결제 페이지가 약관 없이 나갈 뻔했다
     [update]   패널 `version.json` 이 가리키는 계약 경로인데 링크가 안 걸려 있었다
     [proto]    "프로토타입 — 확정본 아님" 배지가 세 장 전부에 남아 있었다
     [numbers]  사이트가 없는 프리셋 112개를 두 달간 광고했고 `42 scripts` 가 아직 promo-assets 에 산다
     [banned]   오너가 폐기한 메시지("브리프 하나로 완성 영상")가 카피로 되살아나는 것
     [i18n]     국문이 클라이언트 스왑이라 주소도 색인도 없었다
     [assets]   시트를 안 옮겨서 판이 비어 보였다

   실행: node tools/deployCheck.mjs      (빌드 뒤에 돌린다)
   종료코드 0 = 통과 · 1 = 실패. 실패는 "배포하지 마라" 다. */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const fail = [];
const warn = [];
const ok = [];

if (!fs.existsSync(OUT)) {
  console.error('out/ 이 없다 — `npm run build` 를 먼저 돌려라.');
  process.exit(1);
}

/* ── 페이지 수집 ────────────────────────────────────────────────── */
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(OUT);

const rel = (p) => '/' + path.relative(OUT, p).replace(/\\/g, '/');
const read = (p) => fs.readFileSync(p, 'utf8');
const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ');

const REQUIRED = ['/index.html', '/ae.html', '/ae/docs.html'];
const missing = REQUIRED.filter((r) => !pages.some((p) => rel(p) === r));
if (missing.length) fail.push(`[routes] 빠진 페이지: ${missing.join(' · ')}`);
else ok.push(`[routes] ${REQUIRED.join(' · ')} 존재`);

/* 국문 정적 경로 — 없으면 국문은 주소도 색인도 없다 */
const KO = ['/ko.html', '/ko/ae.html', '/ko/ae/docs.html'];
const koMissing = KO.filter((r) => !pages.some((p) => rel(p) === r));
if (koMissing.length) fail.push(`[i18n] 국문 정적 경로가 없다: ${koMissing.join(' · ')} — 클라이언트 토글만으로는 색인도 공유도 안 된다`);
else ok.push('[i18n] 국문 정적 경로 3장');

/* ── 페이지별 검사 ──────────────────────────────────────────────── */
const CHECKOUT = 'buy.polar.sh';
const BANNED = [
  ['브리프 하나로', '오너 2026-08-31 폐기'],
  ['완성 영상', '오너 2026-08-31 폐기'],
  ['AI-powered', '금지어'],
  ['autopilot', '금지어'],
  ['42 scripts', '실제 39 — 낡은 숫자'],
  ['112', '구 모션 프리셋 수(실제 26) — CSS 폭이 아니라 본문에 있으면 결함'],
  ['프로토타입', '프로토 배지'],
  ['확정본 아님', '프로토 배지'],
  ['Lorem', '자리표시자'],
  ['TODO', '자리표시자'],
];

for (const p of pages) {
  const r = rel(p);
  const html = read(p);
  const body = text(html);
  const isProduct = /^\/(ko\/)?ae(\.html|\/)/.test(r);
  const isSurface = REQUIRED.includes(r) || KO.includes(r);

  for (const [w, why] of BANNED) {
    if (body.includes(w)) fail.push(`[banned] ${r} 에 "${w}" (${why})`);
  }

  if (isProduct) {
    if (!html.includes(CHECKOUT)) fail.push(`[checkout] ${r} 에 결제 링크(${CHECKOUT})가 없다 — 팔 수 없는 페이지다`);
    /* 가격 섹션은 버튼을 안 가진다(레퍼런스 원리 7) — 레일이 CTA 를 독점한다 */
    const price = html.match(/<section[^>]*id="price"[\s\S]*?<\/section>/);
    if (price && /<a\s/.test(price[0])) fail.push(`[price] ${r} 가격 섹션에 <a> 가 있다 — CTA 는 레일이 독점한다`);
  }

  if (isSurface) {
    for (const [href, label] of [['/terms', '약관'], ['/privacy', '개인정보'], ['/refund', '환불'], ['/update', '업데이트']]) {
      if (!html.includes(`href="${href}"`)) fail.push(`[legal] ${r} 에 ${label} 링크(${href})가 없다`);
    }
    if (!/mailto:support@younameit\.works/.test(html)) fail.push(`[contact] ${r} 에 지원 주소가 없다`);
    if (/gmail\.com/i.test(html)) fail.push(`[pii] ${r} 에 개인 Gmail 이 있다`);
    if (/\/Users\/|송동휘|DEV_BYPASS/.test(html)) fail.push(`[pii] ${r} 에 로컬 경로·내부 문자열이 새어 있다`);
  }

  /* 로컬 자산 실존 — 깨진 이미지는 판이 비어 보인다 */
  for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:webp|png|jpg|svg|css|js|json|zxp))"/g)) {
    const f = path.join(OUT, m[1]);
    if (!fs.existsSync(f)) fail.push(`[assets] ${r} → 없는 파일 ${m[1]}`);
  }
}

/* ── 숫자 정본 대조 ─────────────────────────────────────────────── */
const product = read(path.join(process.cwd(), 'lib/product.ts'));
const num = (k) => Number(product.match(new RegExp(`${k}:\\s*(\\d+)`))?.[1]);
const COUNTS = { scripts: num('scripts'), motion: num('motion'), gradients: num('gradients') };
const home = pages.find((p) => rel(p) === '/ae.html');
if (home) {
  const b = text(read(home));
  if (COUNTS.scripts && !b.includes(String(COUNTS.scripts)))
    warn.push(`[numbers] /ae 에 툴 수 ${COUNTS.scripts} 가 안 보인다 — 자리표시자가 안 채워졌을 수 있다`);
  else ok.push(`[numbers] 툴 ${COUNTS.scripts} · 모션 ${COUNTS.motion} · 그라디언트 ${COUNTS.gradients} = lib/product.ts`);
}

/* ── 사전 EN/KO 대칭 ────────────────────────────────────────────── */
for (const f of ['shared', 'home', 'ae', 'docs', 'v33']) {
  const p = path.join(process.cwd(), 'lib/copy', f + '.ts');
  if (!fs.existsSync(p)) continue;
  const s = read(p);
  const i = s.indexOf('en: {'), j = s.indexOf('ko: {');
  if (i < 0 || j < 0) { fail.push(`[i18n] lib/copy/${f}.ts 에 en/ko 블록이 없다`); continue; }
  const keys = (blk) => new Set([...blk.matchAll(/'([a-zA-Z0-9_.]+)'\s*:/g)].map((m) => m[1]));
  const en = keys(s.slice(i, j)), ko = keys(s.slice(j));
  const onlyEn = [...en].filter((k) => !ko.has(k));
  const onlyKo = [...ko].filter((k) => !en.has(k));
  if (onlyEn.length || onlyKo.length)
    fail.push(`[i18n] lib/copy/${f}.ts 비대칭 — EN만 ${onlyEn.length}(${onlyEn.slice(0, 5)}) · KO만 ${onlyKo.length}(${onlyKo.slice(0, 5)})`);
  else ok.push(`[i18n] lib/copy/${f}.ts ${en.size}/${ko.size} 대칭`);
}

/* ── 보고 ───────────────────────────────────────────────────────── */
const uniq = (a) => [...new Set(a)];
for (const l of uniq(ok)) console.log('  ok   ' + l);
for (const l of uniq(warn)) console.log('  WARN ' + l);
for (const l of uniq(fail)) console.log('  FAIL ' + l);
console.log(`\n페이지 ${pages.length} · 통과 ${uniq(ok).length} · 경고 ${uniq(warn).length} · 실패 ${uniq(fail).length}`);
process.exit(uniq(fail).length ? 1 : 0);
