/* Pages Functions 시험 — `/go/pro`(Pro 버튼 집계) · 무료 다운로드 흐름 · 소식 메일 확인(공용 `upsertContact` 를 옮겼다).
   실행: npm run test:fn   (Node ≥ 22.18 — 타입 제거 실행 + `tools/tsResolve.mjs`)
   네트워크는 안 탄다: `fetch` 를 갈아 끼워 Resend 호출을 기록만 한다. 비밀값은 시험용 가짜다. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./tsResolve.mjs', import.meta.url);

const { PRO_TOOLS, PRO_TOOL_IDS, PRO_PANEL_IDS, PRO_CLICK_IDS } = await import('../lib/proTools.ts');
const { DOCS_TOOLS } = await import('../lib/docsData.ts');
const { DOWNLOAD_URL, VERSION, COUNTS, TIERS } = await import('../lib/product.ts');
const gp = await import('../functions/_lib/goPro.ts');
const proEn = await import('../functions/go/pro.ts');
const proKo = await import('../functions/ko/go/pro.ts');
const nl = await import('../functions/_lib/newsletter.ts');
const dl = await import('../functions/_lib/download.ts');
const dlRequest = await import('../functions/api/download/request.ts');
const dlConfirm = await import('../functions/api/download/confirm.ts');
const nlConfirm = await import('../functions/api/newsletter/confirm.ts');

/* ═══ /go/pro ═══ */

const OWNER_LIST = ['clickReact', 'carouselRig', 'effectorRig', 'cursorClick', 'autoMarker', 'startMarker', 'faceTrack',
  'depthPass', 'distributeValues', 'writeOn', 'roundCorners', 'patternLab', 'vertexGrid'];

test('Pro 툴 id 는 13개 — 오너 목록과 같고 Docs 카탈로그의 id·이름과 같다', () => {
  assert.deepEqual([...PRO_TOOL_IDS], OWNER_LIST);
  const docs = new Map(DOCS_TOOLS.map((t) => [t.id, t.name]));
  for (const { id, name } of PRO_TOOLS) assert.equal(docs.get(id), name, `${id}: lib/docsData.ts 와 다르다 — 툴 이름·id 가 바뀌었나?`);
});

test('Pro 패널 id 둘(chat · custom1)은 툴 목록과 따로 — 툴 13개·가격 판 이름 목록·TIERS 를 안 건드린다', () => {
  assert.deepEqual([...PRO_PANEL_IDS], ['chat', 'custom1']);
  assert.deepEqual([...PRO_CLICK_IDS], [...OWNER_LIST, 'chat', 'custom1']);
  assert.equal(new Set(PRO_CLICK_IDS).size, PRO_CLICK_IDS.length, 'id 가 겹친다');
  assert.equal(PRO_TOOLS.length, 13, '패널은 PRO_TOOLS 에 들어가면 안 된다 — 가격 판이 "Toolbox 툴 15개" 로 거짓이 된다');
  assert.equal(TIERS.proTools, 13);
});

test('Free 26 + Pro 13 = 카탈로그 툴 수(COUNTS.scripts)', () => {
  assert.equal(TIERS.proTools, 13);
  assert.equal(TIERS.freeTools, 26);
  assert.equal(TIERS.freeTools + TIERS.proTools, COUNTS.scripts, '툴 수가 바뀌었다 — 새 툴이 Free 인지 Pro 인지 정하고 TIERS 를 고쳐라');
});

test('proTool: 툴 13개 + 패널 chat·custom1 은 그대로, 나머지는 전부 other', () => {
  for (const id of [...OWNER_LIST, 'chat', 'custom1']) assert.equal(gp.proTool(id), id);
  for (const bad of [null, undefined, '', 'other', 'ClickReact', 'clickReact ', ' clickReact', '__proto__', 'toString', 'constructor', '<script>', 'x'.repeat(500),
    'Chat', 'CHAT', 'custom-1', 'custom', 'custom2', 'custom 1', 'chat ', 'chat,custom1']) {
    assert.equal(gp.proTool(bad), 'other', JSON.stringify(bad));
  }
});

test('proTarget: 영문 /ae#price · 국문 /ko/ae#price', () => {
  assert.equal(gp.proTarget('en'), '/ae#price');
  assert.equal(gp.proTarget('ko'), '/ko/ae#price');
});

function spy() {
  const points = [];
  return { points, PRO_CLICKS: { writeDataPoint: (p) => points.push(p) } };
}
const req = (path, headers = {}) => new Request(`https://younameit.works${path}`, { headers });

test('goPro: 302 + 점 하나(blobs·indexes 만) — 식별 값 없음', () => {
  const env = spy();
  const r = proEn.onRequestGet({ request: req('/go/pro?tool=writeOn', { 'cf-connecting-ip': '203.0.113.9', 'user-agent': 'UA/1', cookie: 'a=b' }), env });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), 'https://younameit.works/ae#price');
  assert.equal(r.headers.get('cache-control'), 'no-store');
  assert.deepEqual(env.points, [{ blobs: ['writeOn', 'en'], indexes: ['writeOn'] }]);
  assert.ok(!JSON.stringify(env.points).match(/203\.0\.113|UA\/1|a=b/), '요청 헤더 값이 기록에 섞였다');
});

test('goPro: Chat · Custom 패널 문(tool=chat · tool=custom1)도 센다 — 영문·국문 모두', () => {
  const env = spy();
  proEn.onRequestGet({ request: req('/go/pro?tool=chat'), env });
  proKo.onRequestGet({ request: req('/ko/go/pro?tool=custom1'), env });
  assert.deepEqual(env.points, [{ blobs: ['chat', 'en'], indexes: ['chat'] }, { blobs: ['custom1', 'ko'], indexes: ['custom1'] }]);
});

test('goPro: 국문 경로는 /ko/ae#price · 모르는 tool 은 other', () => {
  const env = spy();
  const r = proKo.onRequestGet({ request: req('/ko/go/pro?tool=' + encodeURIComponent('<b>evil</b>')), env });
  assert.equal(r.headers.get('location'), 'https://younameit.works/ko/ae#price');
  assert.deepEqual(env.points, [{ blobs: ['other', 'ko'], indexes: ['other'] }]);
  proEn.onRequestGet({ request: req('/go/pro'), env });
  assert.deepEqual(env.points[1], { blobs: ['other', 'en'], indexes: ['other'] });
});

test('goPro: 프리뷰 호스트를 따른다 · HEAD 는 세지 않는다', () => {
  const env = spy();
  const r = proEn.onRequestHead({ request: new Request('https://abc.younameit.pages.dev/go/pro?tool=vertexGrid'), env });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), 'https://abc.younameit.pages.dev/ae#price');
  assert.equal(env.points.length, 0);
});

test('goPro: 바인딩이 없거나 던져도 이동한다(fail open)', () => {
  const none = proEn.onRequestGet({ request: req('/go/pro?tool=faceTrack'), env: {} });
  assert.equal(none.status, 302);
  const origErr = console.error;
  console.error = () => {};
  try {
    const boom = proEn.onRequestGet({ request: req('/go/pro?tool=faceTrack'), env: { PRO_CLICKS: { writeDataPoint() { throw new Error('quota'); } } } });
    assert.equal(boom.status, 302);
  } finally {
    console.error = origErr;
  }
});

/* ═══ Resend 기록 장치 ═══ */

const SECRET = 's'.repeat(40);
const baseEnv = () => ({
  RESEND_API_KEY: 'test-key', NEWSLETTER_SECRET: SECRET, RESEND_SEGMENT_ID: 'seg_news', RESEND_FREE_SEGMENT_ID: 'seg_free', SITE_URL: 'https://example.test',
});
const realFetch = globalThis.fetch;

/* `existing` = POST /contacts 가 409 로 실패해 PATCH 경로를 타는 연락처 */
function fakeResend({ existing = false } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    const body = init.body ? JSON.parse(init.body) : undefined;
    calls.push({ method: init.method, path: u.pathname, body });
    const fail = existing && init.method === 'POST' && u.pathname === '/contacts';
    return new Response(JSON.stringify({}), { status: fail ? 409 : 200, headers: { 'content-type': 'application/json' } });
  };
  return calls;
}
const restore = () => { globalThis.fetch = realFetch; };
const post = (body) => ({ request: new Request('https://example.test/x', { method: 'POST', body: JSON.stringify(body) }) });
const mails = (calls) => calls.filter((c) => c.path === '/emails');
const tokenOf = (mail) => decodeURIComponent(mail.body.text.match(/confirm=([^\s]+)/)[1]);

const FORM = { email: ' Me@Example.COM ', lang: 'ko', agreeTerms: true, agreePrivacy: true, website: '' };
const NEWS = { collect: true, ads: true, transfer: true };

test('parseDownloadRequest: 필수 동의 둘(약관 · 개인정보 수집·이용)은 각각 · 소식 메일은 셋 모두거나 모두 아니거나', () => {
  const ok = dl.parseDownloadRequest(FORM);
  assert.deepEqual(ok, { ok: true, email: 'me@example.com', lang: 'ko', news: false });
  assert.equal(dl.parseDownloadRequest({ ...FORM, news: NEWS }).news, true);
  assert.equal(dl.parseDownloadRequest({ ...FORM, news: { collect: false, ads: false, transfer: false } }).news, false);
  assert.equal(dl.parseDownloadRequest({ ...FORM, lang: 'en' }).lang, 'en');
  assert.equal(dl.parseDownloadRequest({ ...FORM, lang: 'fr' }).lang, 'ko');
  const err = (b) => dl.parseDownloadRequest(b).error;
  /* 필수 둘은 서로 대신하지 못한다 — 하나만 참이면 나머지 이름으로 되돌린다(뮤턴트: 한쪽 검사를 지우면 아래 둘 중 하나가 깨진다). */
  assert.equal(err({ ...FORM, agreeTerms: false }), 'consent_terms');
  assert.equal(err({ ...FORM, agreeTerms: 'true' }), 'consent_terms');
  assert.equal(err({ ...FORM, agreeTerms: undefined }), 'consent_terms');
  assert.equal(err({ ...FORM, agreePrivacy: false }), 'consent_privacy');
  assert.equal(err({ ...FORM, agreePrivacy: 'true' }), 'consent_privacy');
  assert.equal(err({ ...FORM, agreePrivacy: undefined }), 'consent_privacy');
  assert.equal(err({ ...FORM, agreePrivacy: 1 }), 'consent_privacy');
  const { agreePrivacy: _p, ...legacy } = FORM;   // 옛 폼 본문(체크박스 하나) — 개인정보 동의가 없으면 받지 않는다
  assert.equal(err(legacy), 'consent_privacy');
  assert.equal(err({ ...FORM, agreeTerms: false, agreePrivacy: false }), 'consent_terms');
  assert.equal(err({ ...FORM, email: 'nope' }), 'email');
  assert.equal(err({ ...FORM, email: 'a@b' }), 'email');
  assert.equal(err({ ...FORM, news: { collect: true, ads: true, transfer: false } }), 'news_consent');
  assert.equal(err({ ...FORM, news: { collect: true } }), 'news_consent');
  assert.equal(err(null), 'bad_request');
  assert.equal(err('x'), 'bad_request');
  const bot = dl.parseDownloadRequest({ ...FORM, website: 'http://spam' });
  assert.equal(bot.ok, false);
  assert.equal(bot.silent, true);
});

test('다운로드 요청: 확인 메일 한 통 · 명단엔 아직 없다 · 토큰은 소식 메일 확인에 못 쓴다', async () => {
  const calls = fakeResend();
  try {
    const env = baseEnv();
    const res = await dlRequest.onRequestPost({ ...post(FORM), env });
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].path, '/emails');
    assert.equal(calls[0].body.to, 'me@example.com');
    assert.match(calls[0].body.html, /https:\/\/example\.test\/ko\/download\?confirm=/);
    assert.ok(!calls[0].body.html.includes('소식 메일(광고성 정보) 수신에도 동의'), '소식 메일 선택이 없는데 그 문단이 들어갔다');
    const token = tokenOf(calls[0]);
    assert.ok(await nl.readToken(env, token, 'd'));
    assert.equal(await nl.readToken(env, token, 'c'), null);
    assert.equal(await nl.readToken(env, token, 'u'), null);
    assert.equal((await nl.readToken(env, token, 'd')).n, undefined);
  } finally { restore(); }
});

test('확인 메일의 국외 이전 고지: 이전받는 자 · 국가 · 항목 · 시기 · 목적 · 보유 3년 · 거부 방법 — ko·en, 소식 메일 동의 유무와 무관, 본문 버튼 밑', async () => {
  const REQUIRED = {
    ko: ['Plus Five Five', '미국', '이메일 주소, 신청 일시, 언어', '신청하실 때', '확인하실 때', '다운로드 링크', '마지막 안내 메일을 보낸 날부터 3년', '거부 방법과 효과', '삭제를 요청', 'support@younameit.works', 'https://example.test/ko/privacy'],
    en: ['Plus Five Five', 'United States', 'email address, time of request, language', 'When and how', 'download link', 'last notice email', '3 years', 'How to refuse', 'ask us to delete', 'support@younameit.works', 'https://example.test/privacy'],
  };
  for (const lang of ['ko', 'en']) {
    for (const news of [undefined, NEWS]) {
      const calls = fakeResend();
      try {
        await dlRequest.onRequestPost({ ...post({ ...FORM, lang, news }), env: baseEnv() });
        const [mail] = mails(calls);
        for (const need of REQUIRED[lang]) {
          assert.ok(mail.body.html.includes(need), `${lang} html 에 "${need}" 가 없다`);
          assert.ok(mail.body.text.includes(need), `${lang} text 에 "${need}" 가 없다`);
        }
        assert.ok(mail.body.html.indexOf('Plus Five Five') > mail.body.html.indexOf('confirm='), '고지가 버튼보다 앞에 있다');
        assert.ok(!/할인|discount|upgrade|업그레이드|광고 메일/i.test(mail.body.text.replace(/광고성 정보|promotional email/g, '')), '확인 메일에 홍보 문장이 들어갔다');
      } finally { restore(); }
    }
  }
});

test('다운로드 요청: 필수 동의 중 하나라도 빠지면 400 · 메일 0 · 봇 덫은 200 인데 메일 0', async () => {
  const calls = fakeResend();
  try {
    const env = baseEnv();
    assert.equal((await dlRequest.onRequestPost({ ...post({ ...FORM, agreeTerms: false }), env })).status, 400);
    const noPrivacy = await dlRequest.onRequestPost({ ...post({ ...FORM, agreePrivacy: false }), env });
    assert.equal(noPrivacy.status, 400);
    assert.deepEqual(await noPrivacy.json(), { ok: false, error: 'consent_privacy' });
    assert.equal((await dlRequest.onRequestPost({ ...post({ ...FORM, news: { collect: true, ads: false, transfer: true } }), env })).status, 400);
    assert.equal((await dlRequest.onRequestPost({ request: new Request('https://example.test/x', { method: 'POST', body: '{' }), env })).status, 400);
    assert.equal((await dlRequest.onRequestPost({ ...post({ ...FORM, website: 'x' }), env })).status, 200);
    assert.equal(calls.length, 0);
  } finally { restore(); }
});

test('GET 은 상태를 못 바꾼다 — 라우트가 POST 만 내보낸다', () => {
  for (const m of [dlRequest, dlConfirm]) {
    assert.equal(typeof m.onRequestPost, 'function');
    assert.equal(m.onRequestGet, undefined);
    assert.equal(m.onRequest, undefined);
  }
});

test('다운로드 확인(무료만): free_* 속성 + free 세그먼트만 · 광고 동의 흔적 0 · 링크 응답 + 메일', async () => {
  const sent = fakeResend();
  const env = baseEnv();
  let token;
  try {
    await dlRequest.onRequestPost({ ...post(FORM), env });
    token = tokenOf(sent[0]);
  } finally { restore(); }

  const calls = fakeResend();
  try {
    const res = await dlConfirm.onRequestPost({ ...post({ token }), env });
    const out = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual({ ok: out.ok, url: out.url, version: out.version, news: out.news }, { ok: true, url: DOWNLOAD_URL, version: VERSION, news: false });
    const make = calls.find((c) => c.path === '/contacts');
    assert.equal(make.body.email, 'me@example.com');
    assert.deepEqual(Object.keys(make.body.properties).sort(), ['free_at', 'free_ver', 'lang']);
    assert.equal(make.body.properties.free_ver, dl.FREE_VERSION);
    assert.deepEqual(make.body.segments, [{ id: 'seg_free' }]);
    assert.ok(!JSON.stringify(calls).includes('seg_news'), '무료 다운로드만 한 사람이 소식 메일 세그먼트에 들어갔다');
    const m = mails(calls);
    assert.equal(m.length, 1);
    assert.ok(m[0].body.html.includes(DOWNLOAD_URL));
    assert.ok(!/할인|discount|upgrade|업그레이드|광고/i.test(m[0].body.text.replace('광고 아님', '')), '다운로드 메일에 홍보 문장이 들어갔다');
  } finally { restore(); }
});

test('다운로드 확인(소식 메일 동의 포함): consent_* + 두 세그먼트 + 처리 결과 메일 + 링크 메일', async () => {
  const sent = fakeResend();
  const env = baseEnv();
  let token;
  try {
    await dlRequest.onRequestPost({ ...post({ ...FORM, lang: 'en', news: NEWS }), env });
    assert.match(sent[0].body.html, /newsletter \(promotional email\)/);
    token = tokenOf(sent[0]);
    assert.equal((await nl.readToken(env, token, 'd')).n, 1);
  } finally { restore(); }

  const calls = fakeResend();
  try {
    const out = await (await dlConfirm.onRequestPost({ ...post({ token }), env })).json();
    assert.equal(out.news, true);
    const make = calls.find((c) => c.path === '/contacts');
    assert.deepEqual(Object.keys(make.body.properties).sort(), ['consent_at', 'consent_ver', 'free_at', 'free_ver', 'lang']);
    assert.equal(make.body.properties.consent_ver, nl.CONSENT_VERSION);
    assert.deepEqual(make.body.segments, [{ id: 'seg_free' }, { id: 'seg_news' }]);
    assert.equal(make.body.unsubscribed, false);
    const m = mails(calls);
    assert.equal(m.length, 2);
    assert.match(m[0].body.subject, /newsletter consent is confirmed/);
    assert.match(m[0].body.html, /newsletter\?unsubscribe=/);
    assert.ok(m[1].body.html.includes(DOWNLOAD_URL));
  } finally { restore(); }
});

test('다운로드 확인(이미 있는 연락처): PATCH — 무료만이면 unsubscribed 를 건드리지 않고 세그먼트는 따로 넣는다', async () => {
  const sent = fakeResend();
  const env = baseEnv();
  let token;
  try {
    await dlRequest.onRequestPost({ ...post(FORM), env });
    token = tokenOf(sent[0]);
  } finally { restore(); }
  const calls = fakeResend({ existing: true });
  try {
    const res = await dlConfirm.onRequestPost({ ...post({ token }), env });
    assert.equal(res.status, 200);
    const patch = calls.find((c) => c.method === 'PATCH');
    assert.equal(patch.path, '/contacts/me%40example.com');
    assert.ok(!('unsubscribed' in patch.body), '무료 다운로드가 수신 상태를 덮었다');
    assert.ok(calls.some((c) => c.method === 'POST' && c.path === '/contacts/me%40example.com/segments/seg_free'));
    assert.ok(!calls.some((c) => c.path.includes('seg_news')));
  } finally { restore(); }
});

test('다운로드 확인: 위조 · 만료 · 다른 동작 토큰은 400 이고 아무것도 쓰지 않는다', async () => {
  const env = baseEnv();
  const sent = fakeResend();
  let token;
  try {
    await dlRequest.onRequestPost({ ...post(FORM), env });
    token = tokenOf(sent[0]);
  } finally { restore(); }
  const calls = fakeResend();
  const realNow = Date.now;
  try {
    for (const bad of [undefined, '', 'a.b', token.slice(0, -2) + 'xx', token.replace(/^[^.]+/, 'AAAA'), await nl.signToken(env, { e: 'me@example.com', l: 'ko', a: 'c' })]) {
      const res = await dlConfirm.onRequestPost({ ...post({ token: bad }), env });
      assert.equal(res.status, 400, String(bad).slice(0, 20));
    }
    Date.now = () => realNow() + 73 * 3600 * 1000;
    assert.equal((await dlConfirm.onRequestPost({ ...post({ token }), env })).status, 400);
    assert.equal(calls.length, 0);
  } finally { Date.now = realNow; restore(); }
});

test('소식 메일 확인(공용 upsertContact 로 옮겼다): 동작이 그대로다', async () => {
  const env = baseEnv();
  const token = await nl.signToken(env, { e: 'me@example.com', l: 'en', a: 'c' });
  let calls = fakeResend();
  try {
    assert.equal((await nlConfirm.onRequestPost({ ...post({ token }), env })).status, 200);
    const make = calls.find((c) => c.path === '/contacts');
    assert.deepEqual(Object.keys(make.body.properties).sort(), ['consent_at', 'consent_ver', 'lang']);
    assert.deepEqual(make.body.segments, [{ id: 'seg_news' }]);
    assert.equal(mails(calls).length, 1);
  } finally { restore(); }
  calls = fakeResend({ existing: true });
  try {
    assert.equal((await nlConfirm.onRequestPost({ ...post({ token }), env })).status, 200);
    const patch = calls.find((c) => c.method === 'PATCH');
    assert.equal(patch.body.unsubscribed, false);
    assert.ok(calls.some((c) => c.path === '/contacts/me%40example.com/segments/seg_news'));
  } finally { restore(); }
});
