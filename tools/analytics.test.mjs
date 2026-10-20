/* 분석 층 시험 — 동의 저장 · 링크 분류 · 페이지 문맥 · 사양↔소스↔GTM 컨테이너 일치. 설계 = 플러그인 repo ANALYTICS_PLAN.
   실행: npm run test:analytics   (Node ≥ 22.18 — 타입 제거 실행 + `tools/tsResolve.mjs`. 22.6~22.17 은 NODE_OPTIONS=--experimental-strip-types)
   네트워크·DOM 은 안 쓴다 — 순수 함수와 파일 내용만 본다. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { register } from 'node:module';

register('./tsResolve.mjs', import.meta.url);

const { SPEC } = await import('../lib/analyticsSpec.ts');
const A = await import('../lib/analytics.ts');
const C = await import('../lib/consent.ts');
const { CHECKOUT_URL } = await import('../lib/product.ts');
const { buildContainer } = await import('./gtmContainer.mjs');

const ROOT = path.resolve(import.meta.dirname, '..');
const EVENTS = Object.keys(SPEC.events);

/* ═══ 동의 저장소 ═══ */

test('parseConsent — 정상 값만 읽고 깨진 것·구버전·타입 틀림은 null(= 다시 묻는다)', () => {
  assert.equal(C.parseConsent(C.serializeConsent('granted')), 'granted');
  assert.equal(C.parseConsent(C.serializeConsent('denied')), 'denied');
  for (const bad of [null, undefined, '', 'garbage', '{', '{"v":2,"a":true}', '{"v":1}', '{"v":1,"a":"yes"}', '[]', 'null', '"granted"'])
    assert.equal(C.parseConsent(bad), null, `읽혀선 안 된다: ${bad}`);
});

test('동의 범위 버전 — 범위가 바뀌면(v 불일치) 저장된 동의는 무효 = 다시 묻는다', () => {
  const v1 = C.serializeConsent('granted', new Date(), 1);
  assert.equal(C.parseConsent(v1, 1), 'granted');
  assert.equal(C.parseConsent(v1, 2), null, 'Meta 를 켜 범위가 넓어지면(v2) 옛 동의로 통과하면 안 된다');
  assert.equal(C.parseConsent(C.serializeConsent('denied', new Date(), 1), 2), null, '옛 거부도 다시 묻는다(새 범위에 대한 의사가 아니다)');
  assert.equal(C.CONSENT_VERSION, C.META_PIXEL_ON ? 2 : 1);
});

test('META_PIXEL_ON 이면 배너에 Meta 이전 고지가 있어야 한다 · 꺼져 있으면 배너가 Meta 를 말하지 않는다', () => {
  const banner = fs.readFileSync(path.join(ROOT, 'components/Analytics.tsx'), 'utf8');
  const copy = banner.slice(banner.indexOf('const ROWS'), banner.indexOf('/** Polar'));
  if (C.META_PIXEL_ON) assert.ok(copy.includes('Meta Platforms, Inc.'), 'META_PIXEL_ON 인데 배너 국외 이전 표에 Meta 행이 없다');
  else assert.ok(!/Meta/.test(copy), 'Meta 를 안 켰는데 배너가 Meta 를 말한다 — 사실과 어긋난다');
});

test('cookieDomains — 호스트와 상위 도메인 후보(최상위는 제외)', () => {
  assert.deepEqual(C.cookieDomains('younameit.works'), ['younameit.works', '.younameit.works']);
  assert.deepEqual(C.cookieDomains('a.b.example.com'), ['a.b.example.com', '.a.b.example.com', '.b.example.com', '.example.com']);
  assert.deepEqual(C.cookieDomains('localhost'), ['localhost']);
});

test('추적 쿠키 판별 — GA/Meta 만 잡고 우리 것은 안 건드린다', () => {
  for (const n of ['_ga', '_ga_ABC123', '_gid', '_gat_gtag_x', '_gcl_au', '_fbp', '_fbc']) assert.ok(C.TRACKING_COOKIE.test(n), n);
  for (const n of ['yni-lang', 'session', 'garden', '_gaming_pref', '_gidx', 'fbp']) assert.ok(!C.TRACKING_COOKIE.test(n), n);
});

/* ═══ 페이지 문맥 ═══ */

test('pageKindOf — 국문 접두사·끝 슬래시를 무시하고 종류를 가른다', () => {
  const k = A.pageKindOf;
  assert.equal(k('/'), 'home'); assert.equal(k('/ko'), 'home'); assert.equal(k('/ko/'), 'home');
  assert.equal(k('/ae'), 'ae'); assert.equal(k('/ko/ae/'), 'ae');
  assert.equal(k('/ae/docs'), 'docs'); assert.equal(k('/ko/ae/docs'), 'docs');
  assert.equal(k('/update'), 'update'); assert.equal(k('/ko/update'), 'update');
  assert.equal(k('/download'), 'download'); assert.equal(k('/newsletter'), 'newsletter');
  assert.equal(k('/thanks'), 'thanks'); assert.equal(k('/ko/thanks'), 'thanks');
  for (const p of ['/terms', '/ko/privacy', '/refund']) assert.equal(k(p), 'legal');
  assert.equal(k('/korea'), 'other', '/ko 접두사 판정이 /korea 를 삼키면 안 된다');
  assert.equal(k('/nope'), 'other');
});

test('pageLangOf — /ko 와 /ko/… 만 국문', () => {
  assert.equal(A.pageLangOf('/ko'), 'ko'); assert.equal(A.pageLangOf('/ko/ae'), 'ko');
  assert.equal(A.pageLangOf('/ae'), 'en'); assert.equal(A.pageLangOf('/korea'), 'en');
});

/* ═══ URL 속의 비밀 ═══ */

test('stripSecretParams — 확인·해지 토큰만 지우고 나머지 쿼리·해시·순서는 그대로', () => {
  const f = A.stripSecretParams;
  assert.equal(f('/download?confirm=abc123'), '/download');
  assert.equal(f('/ko/newsletter?unsubscribe=xyz'), '/ko/newsletter');
  assert.equal(f('/newsletter?lang=ko&confirm=abc&x=1#top'), '/newsletter?lang=ko&x=1#top');
  assert.equal(f('/thanks?checkout_id=co_1'), '/thanks?checkout_id=co_1', 'checkout_id 는 남긴다(/thanks 가 읽는다)');
  assert.equal(f('/ae#price'), '/ae#price');
  assert.equal(f('/ae'), '/ae');
  assert.equal(f('/x?a=1&token=T&b=2'), '/x?a=1&b=2');
  assert.equal(f('/download?confirm=a&unsubscribe=b&token=c'), '/download');
  assert.equal(f('/p?q=confirm'), '/p?q=confirm', '값에 confirm 이 있는 건 키가 아니다');
});

/* ═══ 링크 분류 ═══ */

test('classifyLink — 결제 링크는 상품으로, 모르는 Polar 링크는 unknown 으로(조용히 틀리지 않는다)', () => {
  assert.deepEqual(A.classifyLink({ href: CHECKOUT_URL }), { kind: 'checkout', item: 'ae-pro' });
  assert.deepEqual(A.classifyLink({ href: CHECKOUT_URL + '?utm_source=x' }), { kind: 'checkout', item: 'ae-pro' }, '쿼리가 붙어도 같은 상품');
  assert.deepEqual(A.classifyLink({ href: 'https://buy.polar.sh/polar_cl_OTHER' }), { kind: 'checkout', item: 'unknown' });
  assert.equal(A.classifyLink({ href: 'https://polar.sh/donys/portal' }), null, '고객 포털은 결제가 아니다');
});

test('classifyLink — 다운로드·메일·언어, 그리고 그 밖은 null', () => {
  assert.deepEqual(A.classifyLink({ href: 'https://dl.younameit.works/younameit-2.10.0.zxp' }), { kind: 'download', ext: 'zxp', file: 'younameit-2.10.0.zxp' });
  assert.deepEqual(A.classifyLink({ href: '/files/x', dl: 'free' }), { kind: 'download', ext: 'zxp', file: 'x', tier: 'free' }, 'data-dl 이 있으면 확장자가 없어도 다운로드');
  assert.deepEqual(A.classifyLink({ href: 'mailto:support@younameit.works' }), { kind: 'mail' });
  assert.deepEqual(A.classifyLink({ href: '/ko/ae', hreflang: 'ko' }), { kind: 'lang', to: 'ko' });
  assert.equal(A.classifyLink({ href: '/ae/docs#install' }), null);
  assert.equal(A.classifyLink({ href: '/x', hreflang: 'fr' }), null, '모르는 언어는 세지 않는다');
  assert.equal(A.classifyLink({ href: '' }), null);
  assert.equal(A.classifyLink({ href: 'http://[bad' }), null, '깨진 URL 은 던지지 않는다');
});

test('placementOf — 결제 CTA 자리: 위가 이긴다, 없으면 가장 가까운 section id, 그것도 없으면 page', () => {
  const el = (...matches) => ({ closest: (sel) => (matches.includes(sel) ? { id: sel === 'section[id]' ? 'faq' : undefined } : null) });
  assert.equal(A.placementOf(el('[data-price-cta]', '.phero')), 'price');
  assert.equal(A.placementOf(el('.rail')), 'rail');
  assert.equal(A.placementOf(el('nav')), 'nav');
  assert.equal(A.placementOf(el('footer')), 'footer');
  assert.equal(A.placementOf(el('section[id]')), 'faq');
  assert.equal(A.placementOf(el()), 'page');
});

/* ═══ 전자상거래 페이로드 ═══ */

test('ecommerce — 알려진 상품은 값·통화가 사양에서 나오고, unknown 은 값이 없다', () => {
  const e = A.ecommerce('ae-pro', { transaction_id: 'co_1' });
  assert.equal(e.value, 49.99); assert.equal(e.currency, 'USD'); assert.equal(e.transaction_id, 'co_1');
  assert.deepEqual(e.items, [{ item_id: 'ae-pro', item_name: 'You Name It AE Plugin Pro', item_category: 'plugin', price: 49.99, quantity: 1 }]);
  const u = A.ecommerce('unknown');
  assert.equal(u.value, undefined); assert.equal(u.currency, undefined); assert.equal(u.items[0].item_id, 'unknown');
});

test('가격은 두 곳(lib/product.ts · 사양)에 있다 — 갈라지면 매출이 거짓이 된다', () => {
  const m = fs.readFileSync(path.join(ROOT, 'lib/product.ts'), 'utf8').match(/PRICE_USD\s*=\s*'([\d.]+)'/);
  assert.ok(m, 'lib/product.ts 에서 PRICE_USD 를 못 읽었다');
  assert.equal(Number(m[1]), SPEC.items['ae-pro'].price, 'lib/analyticsSpec.ts items.ae-pro.price ≠ lib/product.ts PRICE_USD');
});

test('동의 전 track/trackCommerce 는 던지지도 쌓지도 않는다(window 없음 = 로더가 안 불린 상태)', () => {
  assert.doesNotThrow(() => A.track('faq_open', { faq_id: 'q1' }));
  assert.doesNotThrow(() => A.trackCommerce('begin_checkout', 'ae-pro'));
});

/* ═══ 켜짐 상태의 일관성 ═══ */

test('GTM_ID 가 있으면 켜는 날(ANALYTICS_EFFECTIVE)도 유효한 날짜여야 한다 — 비면 꺼짐', () => {
  if (A.GTM_ID === '') { assert.equal(A.ANALYTICS_ON, false); return; }
  assert.match(A.GTM_ID, /^GTM-[A-Z0-9]{4,}$/);
  assert.match(A.ANALYTICS_EFFECTIVE, /^\d{4}-\d{2}-\d{2}$/, 'GTM_ID 를 채웠으면 ANALYTICS_EFFECTIVE(방침 고지 +7일)도 정해라');
});

/* ═══ 사양 ↔ 소스 ═══ */

function sources() {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (!['node_modules', '.next', 'out', '.git'].includes(e.name)) walk(p); }
      else if (/\.(tsx?|mjs)$/.test(e.name) && !p.endsWith('analytics.test.mjs')) out.push(p);
    }
  })(ROOT);
  return out;
}

test('사양의 모든 이벤트는 소스 어딘가에서 발화된다 — 후크가 지워지면 여기서 빨개진다', () => {
  const src = sources().filter((p) => !p.endsWith('analyticsSpec.ts')).map((p) => fs.readFileSync(p, 'utf8')).join('\n');
  for (const name of EVENTS)
    assert.match(src, new RegExp(`track(Commerce)?\\(\\s*'${name}'`), `이벤트 ${name} 를 발화하는 track('${name}', …) 가 어디에도 없다`);
});

test('소스가 부르는 track 이름은 전부 사양에 있다 — 사양 밖 이벤트는 GTM 이 안 받는다', () => {
  const names = new Set();
  for (const p of sources()) for (const m of fs.readFileSync(p, 'utf8').matchAll(/\btrack(?:Commerce)?\(\s*'([a-z_]+)'/g)) names.add(m[1]);
  for (const n of names) assert.ok(EVENTS.includes(n), `track('${n}') 는 lib/analyticsSpec.ts 에 없다`);
});

test('파라미터 이름은 소문자 스네이크 · GA4 한도(40자) 안', () => {
  for (const [n, e] of Object.entries(SPEC.events)) {
    assert.match(n, /^[a-z][a-z0-9_]{0,39}$/, n);
    for (const p of e.params) assert.match(p, /^[a-z][a-z0-9_]{0,39}$/, `${n}.${p}`);
  }
});

/* ═══ 사양 → GTM 컨테이너 ═══ */

const withMeta = buildContainer({ ga4Id: 'G-TEST123456', metaPixelId: '123456789012345' }).containerVersion;
const gaOnly = buildContainer({ ga4Id: 'G-TEST123456' }).containerVersion;

test('컨테이너 — GA4 이벤트 트리거가 사양의 모든 이벤트를 덮는다(그 밖은 안 덮는다)', () => {
  const trig = withMeta.trigger.find((t) => t.name === 'CE - GA4 events');
  const regex = trig.customEventFilter[0].parameter.find((p) => p.key === 'arg1').value;
  const covered = regex.replace(/^\^\(|\)\$$/g, '').split('|');
  assert.deepEqual(covered.sort(), [...EVENTS].sort());
});

test('컨테이너 — 사양의 모든 파라미터가 GA4 태그의 이벤트 설정과 데이터 영역 변수로 있다', () => {
  const tagParams = withMeta.tag.find((t) => t.name === 'GA4 - events').parameter.find((p) => p.key === 'eventSettingsTable').list.map((m) => m.map[0].value);
  const wanted = [...new Set(Object.values(SPEC.events).flatMap((e) => e.params))];
  assert.deepEqual([...tagParams].sort(), wanted.sort());
  for (const k of [...wanted, ...SPEC.common]) assert.ok(withMeta.variable.some((v) => v.name === `DLV - ${k}`), `변수 DLV - ${k} 없음`);
});

test('컨테이너 — Google 태그는 구성 단계에서 공통 파라미터를 받는다', () => {
  const g = withMeta.tag.find((t) => t.type === 'googtag');
  assert.deepEqual(g.firingTriggerId, ['2147479573']);
  assert.deepEqual(g.parameter.find((p) => p.key === 'configSettingsTable').list.map((m) => m.map[0].value), [...SPEC.common]);
});

test('컨테이너 — Meta 태그는 사양의 meta 표기 이벤트와 정확히 일치(+ 기본 코드 1)', () => {
  const wanted = Object.values(SPEC.events).filter((e) => e.meta).map((e) => `Meta - ${e.meta}`).sort();
  const got = withMeta.tag.filter((t) => t.name.startsWith('Meta - ') && t.name !== 'Meta - base').map((t) => t.name).sort();
  assert.deepEqual(got, wanted);
  assert.ok(withMeta.tag.some((t) => t.name === 'Meta - base'));
  assert.ok(withMeta.tag.find((t) => t.name === 'Meta - base').parameter[0].value.includes('{{Meta Pixel ID}}'));
});

test('컨테이너 — Meta ID 가 없으면 Meta 태그·변수가 0(빈 ID 로 조용히 도는 일 없다)', () => {
  assert.equal(gaOnly.tag.filter((t) => t.name.startsWith('Meta')).length, 0);
  assert.ok(!gaOnly.variable.some((v) => v.name === 'Meta Pixel ID'));
  assert.equal(gaOnly.tag.length, 2);
});

test('컨테이너 — 동의 설정: Google 태그는 analytics_storage, Meta 태그는 ad_storage 필요', () => {
  const need = (t) => t.consentSettings.consentType?.list?.[0]?.value;
  for (const t of withMeta.tag.filter((t) => t.type === 'googtag' || t.type === 'gaawe')) assert.equal(need(t), 'analytics_storage', t.name);
  for (const t of withMeta.tag.filter((t) => t.type === 'html')) assert.equal(need(t), 'ad_storage', t.name);
});

test('컨테이너 — Purchase 는 주문 ID 로 eventID 를 건다(나중에 CAPI 를 붙일 때 중복 제거 키)', () => {
  const p = withMeta.tag.find((t) => t.name === 'Meta - Purchase').parameter[0].value;
  assert.match(p, /eventID:'\{\{DLV - ecommerce\.transaction_id\}\}'/);
});

test('컨테이너 — ID 검증: 잘못된 GA4/Meta ID 는 던진다', () => {
  assert.throws(() => buildContainer({ ga4Id: '' }));
  assert.throws(() => buildContainer({ ga4Id: 'UA-1234' }));
  assert.throws(() => buildContainer({ ga4Id: 'G-TEST123456', metaPixelId: 'abc' }));
});
