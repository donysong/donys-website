/* prConsentSync — 가짜 Polar · Resend 로만 잰다(바깥 호출 없음). 실행: node --test tools/prConsentSync.test.mjs */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { PR_PRODUCTS, consentOf, hashEmail, kstDate, noticeMail, planFromOrders, readBiz, run, sinceToIso, unsubLink } from './prConsentSync.mjs';

const [P1, P2] = PR_PRODUCTS;
const BUNDLE = '1d179e90-f0d6-4596-ae85-46da48407987';
const ALL = { terms_agree: true, mkt_collect: true, mkt_receive: true, mkt_transfer: true };
const RECEIVE_ONLY = { terms_agree: true, mkt_receive: true };
const SECRET = 'x'.repeat(40);
const productTs = readFileSync(new URL('../lib/product.ts', import.meta.url), 'utf8');
let n = 0;
const order = (email, at, fields, product = P2, status = 'paid') => ({ id: `o${++n}`, created_at: at, status, product_id: product, customer: { email }, custom_field_data: fields });

function fakes(orders, contacts = {}) {
  const calls = [];
  const box = new Map(Object.entries(contacts));
  const sent = [];
  let failEmailsFor = null;
  const polar = async (method, p) => {
    calls.push(['polar', method, p]);
    return { ok: true, status: 200, data: { items: orders, pagination: { total_count: orders.length, max_page: 1 } } };
  };
  const resend = async (method, p, body) => {
    calls.push(['resend', method, p, body]);
    if (p === '/segments') return { ok: true, status: 200, data: { data: [{ id: 'seg1', name: 'newsletter' }] } };
    const m = p.match(/^\/contacts\/([^/]+)$/);
    if (method === 'GET' && m) {
      const c = box.get(decodeURIComponent(m[1]));
      return c ? { ok: true, status: 200, data: c } : { ok: false, status: 404, data: { name: 'not_found' } };
    }
    if (method === 'POST' && p === '/contacts') { box.set(body.email, { email: body.email, unsubscribed: false, properties: body.properties }); return { ok: true, status: 201, data: { id: 'c' } }; }
    if (method === 'PATCH' && m) { const c = box.get(decodeURIComponent(m[1])); Object.assign(c, { ...('unsubscribed' in body ? { unsubscribed: body.unsubscribed } : {}), properties: { ...c.properties, ...body.properties } }); return { ok: true, status: 200, data: {} }; }
    if (method === 'POST' && p === '/emails') {
      if (failEmailsFor === body.to) return { ok: false, status: 500, data: { message: 'boom' } };
      sent.push(body); return { ok: true, status: 200, data: { id: 'm' } };
    }
    return { ok: true, status: 200, data: {} };
  };
  return { apis: { polar, resend }, calls, box, sent, failEmails: (to) => { failEmailsFor = to; } };
}

function harness(f, state = null) {
  const h = { state, writes: 0 };
  h.go = (args, now = new Date('2026-11-03T00:00:00Z')) => run({ args, env: { NEWSLETTER_SECRET: SECRET }, apis: f.apis, readState: () => (h.state ? structuredClone(h.state) : null), writeState: (s) => { h.state = structuredClone(s); h.writes++; }, productTs, now, log: () => {} });
  return h;
}

test('consent = three boxes true; a missing key or a non-boolean is not consent', () => {
  assert.equal(consentOf({ custom_field_data: ALL }), 'full');
  assert.equal(consentOf({ custom_field_data: RECEIVE_ONLY }), 'partial');
  assert.equal(consentOf({ custom_field_data: { terms_agree: true, mkt_collect: true, mkt_transfer: true } }), 'none');
  assert.equal(consentOf({ custom_field_data: { mkt_collect: 'true', mkt_receive: 'true', mkt_transfer: 'true' } }), 'none');
  assert.equal(consentOf({}), 'none');
});

test('plan: after the cursor only, PR products only, not pending, one row per email (full beats partial, latest wins)', () => {
  const orders = [
    order('old@x.com', '2026-10-30T10:00:00Z', ALL),
    order('A@X.com', '2026-11-01T01:00:00Z', RECEIVE_ONLY),
    order('a@x.com', '2026-11-01T02:00:00Z', ALL, P1),
    order('a@x.com', '2026-11-01T03:00:00Z', RECEIVE_ONLY),
    order('b@x.com', '2026-11-01T04:00:00Z', ALL, BUNDLE),
    order('c@x.com', '2026-11-01T05:00:00Z', ALL, P2, 'pending'),
    order('d@x.com', '2026-11-01T06:00:00Z', { terms_agree: true }),
  ];
  const p = planFromOrders(orders, { cursor: '2026-10-31T00:00:00.000Z', seen: [] });
  assert.deepEqual(p.rows.map((r) => [r.email, r.consent, r.at]), [['a@x.com', 'full', '2026-11-01T02:00:00Z']]);
  assert.equal(p.nextCursor, '2026-11-01T06:00:00Z');
  assert.deepEqual(p.nextSeen, [orders[6].id]);
  // same timestamp as the cursor: only ids not yet seen
  const q = planFromOrders(orders, { cursor: '2026-11-01T02:00:00Z', seen: [orders[2].id] });
  assert.deepEqual(q.rows.map((r) => r.consent), ['partial']);
});

test('--since is a KST date; first run needs it, a cursor refuses it', async () => {
  assert.equal(sinceToIso('2026-10-31'), '2026-10-30T15:00:00.000Z');
  assert.equal(kstDate('2026-10-31T16:00:00Z'), '2026-11-01');
  const f = fakes([]);
  await assert.rejects(harness(f).go([]), /--since/);
  await assert.rejects(harness(f, { cursor: '2026-10-31T00:00:00Z', seen: [], done: [] }).go(['--since', '2026-10-01']), /커서가 이미 있다/);
});

test('preview writes nothing and sends nothing', async () => {
  const f = fakes([order('new@x.com', '2026-11-01T00:00:00Z', ALL)]);
  const h = harness(f);
  const res = await h.go(['--since', '2026-10-31']);
  assert.deepEqual(res.map((r) => r.kind), ['new']);
  assert.equal(h.writes, 0);
  assert.equal(f.sent.length, 0);
  assert.ok(f.calls.every(([who, m]) => who === 'polar' || m === 'GET'));
});

test('send: new / renewed / kept / declined, contact writes and notices', async () => {
  const orders = [
    order('new@x.com', '2026-11-01T00:00:00Z', ALL),
    order('sub@x.com', '2026-11-01T01:00:00Z', ALL),
    order('keep@x.com', '2026-11-01T02:00:00Z', RECEIVE_ONLY),
    order('no@x.com', '2026-11-01T03:00:00Z', RECEIVE_ONLY),
  ];
  const f = fakes(
    orders,
    {
      'sub@x.com': { email: 'sub@x.com', unsubscribed: false, properties: { consent_at: '2026-09-30T00:00:00Z', consent_ver: '2026-09-30', lang: 'en' } },
      'keep@x.com': { email: 'keep@x.com', unsubscribed: false, properties: { consent_at: '2026-09-30T00:00:00Z', consent_ver: '2026-09-30' } },
    },
  );
  const h = harness(f);
  const res = await h.go(['--since', '2026-10-31', '--send']);
  assert.deepEqual(res.map((r) => [r.email, r.kind]), [['new@x.com', 'new'], ['sub@x.com', 'renewed'], ['keep@x.com', 'kept'], ['no@x.com', 'declined']]);

  const made = f.calls.find(([, m, p]) => m === 'POST' && p === '/contacts');
  assert.deepEqual(made[3], { email: 'new@x.com', unsubscribed: false, properties: { consent_at: '2026-11-01T00:00:00Z', consent_ver: 'pr-checkout-v1', source: 'pr-checkout' }, segments: [{ id: 'seg1' }] });
  assert.equal(f.box.get('sub@x.com').properties.consent_at, '2026-11-01T01:00:00Z');
  assert.equal(f.box.get('sub@x.com').properties.lang, 'en');
  assert.equal(f.box.get('keep@x.com').properties.consent_at, '2026-09-30T00:00:00Z');
  assert.equal(f.box.has('no@x.com'), false);

  assert.deepEqual(f.sent.map((m) => m.to), ['new@x.com', 'sub@x.com', 'keep@x.com', 'no@x.com']);
  for (const m of f.sent) {
    assert.ok(!/광고\)|\(Ad\)/.test(m.subject), 'a legal notice is not an ad');
    assert.match(m.text, /전송자: 유네임잇\(You Name It\)/);
    assert.match(m.text, /Sender: You Name It/);
    assert.match(m.text, /사업자등록번호/);
    assert.equal(m.reply_to, 'support@younameit.works');
  }
  const [a, b, k, c] = f.sent.map((m) => m.text);
  assert.match(a, /2026-11-01 에 You Name It PR Plugin 결제 화면에서/);
  assert.match(a, /처리 결과: 2026-11-03 에 수신 동의 처리를 마쳤습니다/);
  assert.match(a, /국외 이전\(Resend, 미국\)/);
  assert.match(a, /\/ko\/newsletter\?unsubscribe=/);
  assert.match(a, /https:\/\/younameit\.works\/newsletter\?unsubscribe=/);
  assert.match(b, /동의 일시를 2026-11-01 로 갱신했습니다/);
  assert.match(k, /구독은 그대로입니다/);
  assert.match(c, /수신 동의를 처리하지 않았습니다/);
  assert.ok(!/unsubscribe=/.test(c), 'no withdraw link for someone who is not subscribed');
  assert.match(c, /younameit\.works\/ko\/newsletter 에서 다시 신청/);

  assert.deepEqual(h.state, { cursor: '2026-11-01T03:00:00Z', seen: [orders[3].id], done: [] });
});

test('a withdrawn person is not re-added: the next run starts after the cursor', async () => {
  const orders = [order('gone@x.com', '2026-11-01T00:00:00Z', ALL)];
  const f = fakes(orders);
  const h = harness(f);
  await h.go(['--since', '2026-10-31', '--send']);
  f.box.delete('gone@x.com'); // withdrew: the webhook deletes the contact
  const again = await h.go(['--send']);
  assert.deepEqual(again, []);
  assert.equal(f.box.has('gone@x.com'), false);
  assert.equal(f.sent.length, 1);
});

test('a failure stops the run; the rerun skips finished people and still notifies the one that failed', async () => {
  const f = fakes([order('one@x.com', '2026-11-01T00:00:00Z', ALL), order('two@x.com', '2026-11-01T01:00:00Z', ALL)]);
  const h = harness(f);
  f.failEmails('two@x.com');
  await assert.rejects(h.go(['--since', '2026-10-31', '--send']), /중간에 멈췄다/);
  assert.equal(h.state.cursor, '2026-10-30T15:00:00.000Z');
  assert.deepEqual(h.state.done, [hashEmail('one@x.com')]);
  assert.equal(f.box.get('two@x.com').properties.source, 'pr-checkout'); // contact written before the mail failed
  f.failEmails(null);
  const res = await h.go(['--send']);
  assert.deepEqual(res.map((r) => [r.email, r.kind]), [['two@x.com', 'new']]);
  assert.equal(f.calls.filter(([, m, p, body]) => m === 'POST' && p === '/contacts' && body.email === 'two@x.com').length, 1, 'contact not created twice');
  assert.deepEqual(f.sent.map((m) => m.to), ['one@x.com', 'two@x.com']);
  assert.deepEqual(h.state.done, []);
  assert.equal(h.state.cursor, '2026-11-01T01:00:00Z');
});

test('withdraw links use the site token format (functions/_lib/newsletter.ts)', () => {
  const link = unsubLink(SECRET, 'https://younameit.works', 'a@x.com', 'ko');
  const token = new URL(link).searchParams.get('unsubscribe');
  const [payload, sig] = token.split('.');
  assert.equal(sig, crypto.createHmac('sha256', SECRET).update(payload).digest('base64url'));
  const body = JSON.parse(Buffer.from(payload, 'base64url').toString());
  assert.deepEqual([body.e, body.l, body.a], ['a@x.com', 'ko', 'u']);
  assert.ok(link.startsWith('https://younameit.works/ko/newsletter?unsubscribe='));
});

test('business footer comes from lib/product.ts BUSINESS', () => {
  const biz = readBiz(productTs);
  assert.equal(biz.nameKo, '유네임잇');
  assert.equal(biz.email, 'support@younameit.works');
  assert.match(biz.footKo, /대표 .+ · 사업자등록번호 /);
  const m = noticeMail('declined', { day: '2026-11-01', processed: '2026-11-03', links: {}, biz, site: 'https://younameit.works' });
  assert.match(m.subject, /About your newsletter consent/);
});
