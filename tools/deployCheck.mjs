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
     [share]    하위 경로가 레이아웃의 og:url(루트)을 물려받아 공유하면 루트 카드가 떴고, `/ae` 는 og:image 가 없었다
     [404]      모르는 주소가 Next 기본 흰 화면(`lang` 없음·링크 0)이었다
     [biz]      사업자 등록(2026-09-22) 뒤에도 전자상거래법 §10·§13 필수 표시(대표·사업자번호·신고번호·전화…)가 0 이었다
     [third-party] 폰트를 Google·jsDelivr 에서 받아 방문자 IP 가 두 회사로 갔다(자체 호스팅 2026-09-30)
     [usage]    사용법을 개발 우회(`DOCS_PLUGIN_REF`)로 읽은 채 배포하면 안 나간 문서가 출고본 Docs 에 실린다
     [anchors]  앵커 링크(`#tool-<id>` · `/ae/docs#install` …)가 가리키는 id 가 구운 페이지에 없다 — 툴 개명·이사가 외부 링크만 죽이는 게 아니라 내부 링크도 죽인다

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
/* 셸 푸터를 쓰는 나머지 면 — 2026-09-26 전엔 구 `Navbar`/`Footer` 였고 `Buy` 가 없는 앵커(`/#pricing`)로 갔다.
   같은 법·지원 검사를 태워서 구 크롬이 되살아나면 여기서 잡는다. */
const READING = ['/update.html', '/ko/update.html', '/terms.html', '/privacy.html', '/refund.html',
  '/ko/terms.html', '/ko/privacy.html', '/ko/refund.html', '/newsletter.html', '/ko/newsletter.html'];
const koMissing = KO.filter((r) => !pages.some((p) => rel(p) === r));
if (koMissing.length) fail.push(`[i18n] 국문 정적 경로가 없다: ${koMissing.join(' · ')} — 클라이언트 토글만으로는 색인도 공유도 안 된다`);
else ok.push('[i18n] 국문 정적 경로 3장');

/* ── 페이지별 검사 ──────────────────────────────────────────────── */
const CHECKOUT = 'buy.polar.sh';
const BIZ_REG = read(path.join(process.cwd(), 'lib/product.ts')).match(/regNo:\s*'([^']+)'/)?.[1] || '(regNo 없음)';
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
  const isSurface = REQUIRED.includes(r) || KO.includes(r) || READING.includes(r);
  const isKo = r === '/ko.html' || r.startsWith('/ko/');

  for (const [w, why] of BANNED) {
    if (body.includes(w)) fail.push(`[banned] ${r} 에 "${w}" (${why})`);
  }

  if (isProduct) {
    if (!html.includes(CHECKOUT)) fail.push(`[checkout] ${r} 에 결제 링크(${CHECKOUT})가 없다 — 팔 수 없는 페이지다`);
    /* 가격 섹션 = 구매 버튼 **하나**, 그리고 그게 결제 링크다. 🔴 구 규칙은 "버튼 0 — 레일이 CTA 독점"(레퍼런스 원리 7)이었는데
       2026-09-30 오너가 *"buy it once 여기에 구매 버튼 하나 달아"* 로 뒤집었다. 대신 그 버튼이 보이는 동안 레일이 숨는다(Shell `BuyRail`)
       — 한 화면에 결제 CTA 하나는 그대로다. */
    const price = html.match(/<section[^>]*id="price"[\s\S]*?<\/section>/);
    const links = price ? price[0].match(/<a\s[^>]*>/g) || [] : [];
    if (price && (links.length !== 1 || !links[0].includes(CHECKOUT)))
      fail.push(`[price] ${r} 가격 섹션의 링크 ${links.length}개 — 결제 버튼 하나여야 한다`);
  }

  if (isSurface) {
    /* 🔴 업데이트 노트·법 3장은 **로캘을 따라간다**(VOICE_AND_TERMS §5-4) — 국문 면은 `/ko/…`. 계약 경로 `/update` 는
       영문 면이 걸고, `/ko/update` 첫 화면이 영문 전환을 갖는다. 법 3장 국문판 = 2026-09-30. */
    const L = (h) => (isKo ? '/ko' + h : h);
    for (const [href, label] of [[L('/terms'), '약관'], [L('/privacy'), '개인정보'], [L('/refund'), '환불'], [L('/update'), '업데이트']]) {
      if (!html.includes(`href="${href}"`)) fail.push(`[legal] ${r} 에 ${label} 링크(${href})가 없다`);
    }
    /* 사업자 줄(Shell `BizLine`) — §10 초기화면 표시 + 공정위 공개페이지 연결. 셸 푸터라 모든 면에 있어야 한다. */
    if (!html.includes(BIZ_REG) || !html.includes('bizCommPop.do?wrkr_no=' + BIZ_REG.replace(/-/g, '')))
      fail.push(`[biz] ${r} 에 사업자등록번호(${BIZ_REG})·공정위 확인 링크가 없다 — 전자상거래법 §10`);
    if (!/mailto:support@younameit\.works/.test(html)) fail.push(`[contact] ${r} 에 지원 주소가 없다`);
    if (/gmail\.com/i.test(html)) fail.push(`[pii] ${r} 에 개인 Gmail 이 있다`);
    /* 방문자 브라우저를 제3자 서버로 보내지 않는다 — 폰트는 자체 호스팅, 분석은 Cloudflare Web Analytics 하나(2026-09-30).
       되살아나면 개인정보 처리방침(국문 제7조 ② "다른 회사의 서버에 직접 요청하게 하지 않습니다")이 거짓이 된다. */
    const tp = html.match(/(?:src|href)="https?:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|www\.googletagmanager\.com|www\.google-analytics\.com)/);
    if (tp) fail.push(`[third-party] ${r} 가 방문자 브라우저를 ${tp[1]} 로 보낸다 — 처리방침 제7조 ②`);
    /* 🔴 대표자 성명은 더 이상 금지어가 아니다 — 전자상거래법 §10 이 **표시를 요구한다**(2026-09-30). 대신 주민등록번호 꼴을 막는다
       (사업자등록증명에 같이 찍혀 있다 — 옮겨 적다 새는 자리). */
    if (/\/Users\/|DEV_BYPASS/.test(html)) fail.push(`[pii] ${r} 에 로컬 경로·내부 문자열이 새어 있다`);
    if (/\b\d{6}-(?:[1-4]\d{6}|[1-4]?\*{6,7})/.test(body)) fail.push(`[pii] ${r} 에 주민등록번호 꼴이 있다`);
  }

  /* 공유 카드 — 색인되는 면은 자기 og:url(= canonical)과 실재하는 og:image 를 가진다 */
  if (isSurface) {
    const meta = (p) => html.match(new RegExp(`<meta[^>]*property="${p}"[^>]*content="([^"]*)"`))?.[1];
    const canon = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
    const ogUrl = meta('og:url'), ogImg = meta('og:image');
    if (!ogImg) fail.push(`[share] ${r} 에 og:image 가 없다 — 링크 미리보기가 빈 카드로 나간다`);
    else if (!fs.existsSync(path.join(OUT, new URL(ogImg).pathname))) fail.push(`[share] ${r} og:image 가 없는 파일 ${ogImg}`);
    if (!ogUrl || !canon || ogUrl.replace(/\/$/, '') !== canon.replace(/\/$/, ''))
      fail.push(`[share] ${r} og:url(${ogUrl}) ≠ canonical(${canon}) — 공유하면 다른 페이지로 정규화된다`);
  }

  /* 로컬 자산 실존 — 깨진 이미지는 판이 비어 보인다 */
  for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:webp|png|jpg|svg|css|js|json|zxp))"/g)) {
    const f = path.join(OUT, m[1]);
    if (!fs.existsSync(f)) fail.push(`[assets] ${r} → 없는 파일 ${m[1]}`);
  }
}

/* ── 404 ── 모르는 주소가 막다른 길이 아닌가 */
const nf = pages.find((p) => rel(p) === '/404.html');
if (!nf) fail.push('[404] out/404.html 이 없다');
else {
  const h = read(nf);
  const need = ['href="/"', 'href="/ae"', 'href="/ae/docs"'].filter((x) => !h.includes(x));
  if (need.length || !/<html[^>]*lang=/.test(h)) fail.push(`[404] 셸·링크가 없는 기본 화면이다 — 빠진 것: ${need.join(' · ') || '<html lang>'}`);
  else ok.push('[404] 셸 + / · /ae · /ae/docs 링크');
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

/* ── 사업자 필수 표시 ─────────────────────────────────────────────
   전자상거래법 §10(초기화면: 상호·대표·주소·전화·이메일·사업자등록번호·약관·호스팅) · §13(통신판매업 신고번호).
   값은 `lib/product.ts` BUSINESS 한 곳이다 — 빈 값이면 푸터가 그 줄을 안 그리므로 **여기서** 배포를 세운다. */
const bizVal = (k) => product.match(new RegExp(`\\n\\s*${k}:\\s*'([^']*)'`))?.[1];
if (!bizVal('phone')) fail.push('[biz] lib/product.ts BUSINESS.phone 가 비어 있다 — 전화번호(§10) 없이 나간다. 오너가 채운다');
else ok.push(`[biz] BUSINESS.phone = ${bizVal('phone')}`);
/* 통신판매업 신고는 면제 중이다(오너 2026-09-30 — 직전연도 거래 50회 미만). 배포를 막지 않고 **매 빌드 상기**만 한다. */
if (!bizVal('mailOrderNo')) warn.push('[biz] 통신판매업 신고 면제 중(직전연도 50회 미만) — 매년 1월 직전연도 판매 수를 확인하고, 50건을 넘었으면 신고 후 BUSINESS.mailOrderNo');
else ok.push(`[biz] BUSINESS.mailOrderNo = ${bizVal('mailOrderNo')}`);

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

/* ── 사용법 생성물 — 출고본 태그에서 읽었나 ───────────────────────────
   `lib/docsUsage.ts` 는 `DOCS_PLUGIN_REF` 개발 우회로도 찍힌다(v2.8.0 이 나오기 전에 화면을 개발하는 용도). 그 상태로 나가면
   사이트가 안 나간 문서를 광고한다 — 카탈로그를 워킹트리가 아니라 태그에서 읽는 이유와 같다(생성기 머리말). */
{
  const ver = product.match(/export const VERSION\s*=\s*'(\d+\.\d+\.\d+)'/)?.[1];
  const src = read(path.join(process.cwd(), 'lib/docsUsage.ts')).match(/DOCS_USAGE_SRC\s*=\s*"([^"]*)"/)?.[1];
  if (!src) fail.push('[usage] lib/docsUsage.ts 에서 DOCS_USAGE_SRC 를 못 읽었다 — npm run build:docs');
  else if (src !== `v${ver}`) fail.push(`[usage] 사용법 출처가 출고 태그(v${ver})가 아니다: ${src} — DOCS_PLUGIN_REF 를 풀고 npm run build 를 다시 돌려라`);
  else ok.push(`[usage] 사용법 출처 = 태그 ${src}`);
  for (const p of pages) if (/VERIFY/.test(text(read(p)))) fail.push(`[usage] ${rel(p)} 에 VERIFY 표식이 새어 있다`);
}

/* ── 앵커 — 같은 페이지 `#id` 와 다른 페이지 `/path#id` 가 가리키는 id 가 실재하나 ──────────
   구운 HTML 의 `id="…"` 만 본다(클라이언트에서 생기는 id 는 없다). 해시 리다이렉트(`Usage.tsx` HASH_REDIRECT)는 **외부** 옛 링크용이라
   여기서는 면제하지 않는다 — 사이트 안에 옛 앵커가 남아 있으면 그게 결함이다. */
{
  const idsOf = new Map(pages.map((p) => [rel(p), new Set([...read(p).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
  const fileOf = (u) => (u === '/' ? '/index.html' : u.replace(/\/$/, '') + '.html');
  let n = 0;
  for (const p of pages) {
    for (const m of read(p).matchAll(/href="(\/[^"#?]*)?#([^"]+)"/g)) {
      const target = m[1] ? fileOf(m[1]) : rel(p);
      const ids = idsOf.get(target);
      if (!ids) continue;   // 정적 페이지가 아닌 경로(외부 · 파일)는 이 검사의 몫이 아니다
      n++;
      if (!ids.has(decodeURIComponent(m[2]))) fail.push(`[anchors] ${rel(p)} 의 링크 ${m[1] || ''}#${m[2]} 가 ${target} 에 없는 id 를 가리킨다`);
    }
  }
  ok.push(`[anchors] 앵커 링크 ${n}개 확인`);
}

/* ── 보고 ───────────────────────────────────────────────────────── */
const uniq = (a) => [...new Set(a)];
for (const l of uniq(ok)) console.log('  ok   ' + l);
for (const l of uniq(warn)) console.log('  WARN ' + l);
for (const l of uniq(fail)) console.log('  FAIL ' + l);
console.log(`\n페이지 ${pages.length} · 통과 ${uniq(ok).length} · 경고 ${uniq(warn).length} · 실패 ${uniq(fail).length}`);
process.exit(uniq(fail).length ? 1 : 0);
