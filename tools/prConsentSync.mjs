#!/usr/bin/env node
/* PR 플러그인 결제 화면의 소식 메일 동의 → Resend 명단 · 처리 결과 통지 (정보통신망법 §50⑦ · 시행령 §62의2).
   정본 = PR repo `gtm/legal/marketing-consent.md` §4 (2026-10-13 판단). 결제 화면 체크박스 3개(`mkt_collect` ·
   `mkt_receive` · `mkt_transfer`, 문구 판 `pr-checkout-v1`)는 Polar 주문의 `custom_field_data` 에 남는다 —
   **체크 안 한 칸은 값이 아니라 키 자체가 없다**(sandbox 실측 2026-10-13). `true` 만 동의다.

   한 사람(이메일) 당 통지 1통, 날짜 = 가장 최근 동의:
     new      3개 다 · 명단에 없음(또는 수신거부 상태)  → 연락처 추가 + 통지 A
     renewed  3개 다 · 이미 구독 중                    → consent_at · consent_ver · source 갱신 + 통지 B (2년 재확인이 새로 센다)
     kept     수신만(일부) · 이미 구독 중              → 아무것도 안 바꿈 + 통지 "구독은 그대로"
     declined 수신만(일부) · 명단에 없음               → 아무것도 안 바꿈 + 통지 C "처리하지 않음"
     (수신을 체크하지 않았으면 수신 의사가 없다 → 아무것도 안 한다)

   🔴 철회한 사람을 되살리지 마라 — 철회하면 연락처가 **삭제**된다. 옛 주문을 다시 훑으면 철회자가 다시 들어간다.
      그래서 커서(마지막으로 처리한 주문 시각)를 `~/.config/younameit/pr-consent-sync.json` 에 둔다(이메일은 안 둔다,
      실패 재시도용 sha256 만). 첫 실행은 `--since` 가 있어야 돌고, 커서가 있으면 `--since` 를 거부한다.
   🔴 통지는 동의일부터 14일 안 — **매주** 돌려라. 10일 넘은 주문은 경고한다.

   실행: set -a; . ~/.config/younameit/secrets.env; set +a      (POLAR_TOKEN(orders:read 필요) · RESEND_API_KEY(Full access) · NEWSLETTER_SECRET)
         node tools/prConsentSync.mjs --since 2026-10-31      ← 첫 실행: 할 일만 출력(KST 날짜)
         node tools/prConsentSync.mjs --since 2026-10-31 --send
         node tools/prConsentSync.mjs [--send]                 ← 그다음부터(커서 이후 주문만)
   테스트: node --test tools/prConsentSync.test.mjs (가짜 fetch — Polar · Resend 를 부르지 않는다) */
import crypto from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONSENT_VER = 'pr-checkout-v1';
export const SOURCE = 'pr-checkout';
/* PR repo `gtm/polar/polar-setup.md` §8 운영 id — 무료판(P1) · Pro(P2). 번들(P3)엔 동의 칸이 없다. */
export const PR_PRODUCTS = ['755f92d3-7c6d-43f6-b6fa-3f31a44ff128', '3bce4d77-efc6-41e9-89ed-4b84cc27272c'];
const MKT = ['mkt_collect', 'mkt_receive', 'mkt_transfer'];
const DAY = 86400_000;
const WARN_DAYS = 10;

/* ── 순수 함수 ── */
export function consentOf(order) {
  const f = order.custom_field_data || {};
  if (MKT.every((k) => f[k] === true)) return 'full';
  if (f.mkt_receive === true) return 'partial';
  return 'none';
}

export const kstDate = (iso) => new Date(Date.parse(iso) + 9 * 3600_000).toISOString().slice(0, 10);
export const sinceToIso = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(s) ? new Date(Date.parse(`${s}T00:00:00+09:00`)).toISOString() : new Date(Date.parse(s)).toISOString());
export const hashEmail = (e) => crypto.createHash('sha256').update(e.toLowerCase()).digest('hex').slice(0, 32);

/** 커서 이후 주문만, 이메일마다 한 줄: 3개 다 동의한 주문이 있으면 그중 최근, 없으면 수신만 동의한 최근 주문. */
export function planFromOrders(orders, state) {
  const after = (o) => o.created_at > state.cursor || (o.created_at === state.cursor && !state.seen.includes(o.id));
  const fresh = orders.filter((o) => o.status !== 'pending' && PR_PRODUCTS.includes(o.product_id ?? o.product?.id) && after(o));
  const by = new Map();
  for (const o of fresh) {
    const c = consentOf(o);
    const email = (o.customer?.email || '').trim().toLowerCase();
    if (c === 'none' || !email) continue;
    const cur = by.get(email);
    const better = !cur || (c === 'full' && cur.consent !== 'full') || (c === cur.consent && o.created_at > cur.at);
    if (better) by.set(email, { email, consent: c, at: o.created_at, orderId: o.id });
  }
  const last = fresh.reduce((m, o) => (o.created_at > m ? o.created_at : m), state.cursor);
  return { rows: [...by.values()].sort((a, b) => (a.at < b.at ? -1 : 1)), nextCursor: last, nextSeen: fresh.filter((o) => o.created_at === last).map((o) => o.id), scanned: fresh.length };
}

/** `functions/_lib/newsletter.ts` signToken 과 같은 형식 — 둘을 같이 고쳐라. */
export function unsubLink(secret, site, email, lang) {
  const payload = Buffer.from(JSON.stringify({ e: email, l: lang, a: 'u', t: Math.floor(Date.now() / 1000) })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${site}${lang === 'ko' ? '/ko' : ''}/newsletter?unsubscribe=${payload}.${sig}`;
}

/** 통지 본문 — 한 통에 한국어 · 영어(결제 화면은 언어를 남기지 않는다). 광고 문구를 넣지 마라: 넣는 순간 광고성 정보다. */
export function noticeMail(kind, { day, processed, links, biz, site }) {
  const kept = kind === 'kept' || kind === 'renewed';
  const subscribed = kind !== 'declined';
  const ko = [
    `전송자: ${biz.nameKo}(${biz.nameEn})`,
    subscribed
      ? `고객님께서 ${day} 에 You Name It PR Plugin 결제 화면에서 이메일로 광고성 정보(새 도구·업데이트·할인 소식)를 받는 데 동의하셨습니다.`
      : `고객님께서 ${day} 에 You Name It PR Plugin 결제 화면에서 이메일로 광고성 정보를 받는 데 동의하셨습니다.`,
    ...(kind === 'new' || kind === 'renewed' ? ['함께 동의하신 항목: 개인정보 수집·이용(이메일 주소, 동의 일시), 개인정보 국외 이전(Resend, 미국).'] : []),
    kind === 'new'
      ? `처리 결과: ${processed} 에 수신 동의 처리를 마쳤습니다.`
      : kind === 'renewed'
        ? `처리 결과: 이미 수신 동의 상태여서 구독은 그대로이며, 동의 일시를 ${day} 로 갱신했습니다.`
        : kind === 'kept'
          ? '처리 결과: 이미 수신 동의 상태여서 구독은 그대로입니다.'
          : '처리 결과: 수신 동의를 처리하지 않았습니다. 소식 메일을 보내려면 개인정보 수집·이용과 국외 이전 동의도 함께 필요한데, 체크되지 않은 항목이 있었습니다. 따라서 소식 메일은 보내지 않으며, 구매와 이용에는 아무 영향이 없습니다.',
    subscribed
      ? '언제든 아래 링크나 소식 메일 하단의 수신거부 링크로 철회하실 수 있으며, 비용은 들지 않습니다. 철회하시면 처리 결과를 알려 드리고 이메일 주소를 지체 없이 삭제합니다.'
      : `소식 메일을 받으시려면 ${site.replace(/^https?:\/\//, '')}/ko/newsletter 에서 다시 신청하실 수 있습니다.`,
    ...(subscribed ? [`수신 동의 철회하기: ${links.ko}`] : []),
  ];
  const en = [
    `Sender: ${biz.nameEn}`,
    subscribed
      ? `On ${day} (KST), at the You Name It PR Plugin checkout, you agreed to receive promotional email (new tools, updates and deals) from us.`
      : `On ${day} (KST), at the You Name It PR Plugin checkout, you agreed to receive promotional email from us.`,
    ...(kind === 'new' || kind === 'renewed' ? ['You also agreed to the collection and use of your personal data (email address, time of consent) and its transfer abroad (Resend, USA).'] : []),
    kind === 'new'
      ? `Result: on ${processed} (KST) your consent was recorded and you are subscribed.`
      : kind === 'renewed'
        ? `Result: you were already subscribed. Your subscription stays as it is, and your consent date is now ${day}.`
        : kind === 'kept'
          ? 'Result: you were already subscribed, and your subscription stays as it is.'
          : 'Result: we did not process it. The newsletter also needs your agreement to the collection and use of your personal data and to its transfer abroad, and one of those boxes was not ticked. So we will not send you newsletters, and your purchase and use are not affected.',
    subscribed
      ? 'You can withdraw at any time, free of charge, with the link below or the unsubscribe link at the bottom of any newsletter. If you withdraw, we tell you the result and delete your email address without delay.'
      : `If you want the newsletter, you can sign up again at ${site.replace(/^https?:\/\//, '')}/newsletter.`,
    ...(subscribed ? [`Withdraw consent: ${links.en}`] : []),
  ];
  const subject = kept || kind === 'new'
    ? '[You Name It] 광고성 정보 수신 동의 처리 결과 · Your newsletter consent is confirmed'
    : '[You Name It] 광고성 정보 수신 동의 처리 결과 · About your newsletter consent';
  return { subject, text: [ko.join('\n\n'), '—', en.join('\n\n'), `${biz.footKo}\n${biz.footEn}`].join('\n\n') };
}

/* ── 바깥 호출 ── */
export function makeApis({ fetchImpl = fetch, polarToken, resendKey }) {
  const call = (base, auth) => async (method, p, body) => {
    const r = await fetchImpl(base + p, { method, headers: { authorization: `Bearer ${auth}`, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, data: j };
  };
  return { polar: call('https://api.polar.sh', polarToken), resend: call('https://api.resend.com', resendKey) };
}

export async function listOrders(polar, sinceIso) {
  const out = [];
  for (let page = 1; ; page++) {
    const q = `?${PR_PRODUCTS.map((id) => `product_id=${id}`).join('&')}&sorting=created_at&limit=100&page=${page}`;
    const r = await polar('GET', `/v1/orders/${q}`);
    if (!r.ok) throw new Error(`Polar GET /v1/orders/ → ${r.status} ${JSON.stringify(r.data).slice(0, 300)}`);
    for (const o of r.data.items || []) if (o.created_at >= sinceIso) out.push(o);
    if (page >= (r.data.pagination?.max_page ?? 1)) return out;
  }
}

export function readBiz(productTs) {
  const pick = (re) => productTs.match(re)?.[1] || '';
  const nameKo = pick(/name:\s*\{\s*ko:\s*'([^']+)'/), nameEn = pick(/name:\s*\{[^}]*en:\s*'([^']+)'/);
  const ceo = pick(/ceo:\s*\{\s*ko:\s*'([^']+)'/), regNo = pick(/regNo:\s*'([^']+)'/);
  const addrKo = pick(/address:\s*\{\s*ko:\s*'([^']+)'/), addrEn = pick(/address:\s*\{[^}]*en:\s*'([^']+)'/);
  const email = pick(/email:\s*'([^']+)'/), phone = pick(/phone:\s*'([^']+)'/);
  return {
    nameKo, nameEn, email,
    footKo: [`${nameKo}(${nameEn})`, ceo && `대표 ${ceo}`, regNo && `사업자등록번호 ${regNo}`, addrKo, phone, email].filter(Boolean).join(' · '),
    footEn: [nameEn, addrEn, regNo && `Business Reg. No. ${regNo}`, phone, email].filter(Boolean).join(' · '),
  };
}

const val = (p) => (typeof p === 'object' && p ? p.value : p) || '';

/** 한 사람 처리 — 연락처 상태를 읽고 kind 를 정한 뒤(send 일 때만) 쓰고 보낸다. */
export async function applyRow(row, { resend, send, secret, site, segmentId, biz, now }) {
  const got = await resend('GET', `/contacts/${encodeURIComponent(row.email)}`);
  if (!got.ok && got.status !== 404) throw new Error(`Resend GET contact → ${got.status}`);
  const exists = got.ok && got.data && got.data.email;
  const subscribed = exists && !got.data.unsubscribed;
  /* 연락처엔 이 주문이 이미 반영됐는데 done 에 없다 = 지난 실행이 통지 전에 멈췄다 → 쓰기는 건너뛰고 통지만 보낸다. */
  const resumed = subscribed && row.consent === 'full' && val(got.data.properties?.consent_at) === row.at && val(got.data.properties?.source) === SOURCE;
  const kind = resumed ? 'new' : row.consent === 'full' ? (subscribed ? 'renewed' : 'new') : subscribed ? 'kept' : 'declined';
  if (!send) return { kind, email: row.email, at: row.at };

  const properties = { consent_at: row.at, consent_ver: CONSENT_VER, source: SOURCE };
  if (resumed) {
    /* 이미 썼다 */
  } else if (kind === 'new') {
    const made = exists
      ? await resend('PATCH', `/contacts/${encodeURIComponent(row.email)}`, { unsubscribed: false, properties })
      : await resend('POST', '/contacts', { email: row.email, unsubscribed: false, properties, segments: segmentId ? [{ id: segmentId }] : [] });
    if (!made.ok) throw new Error(`Resend ${exists ? 'PATCH' : 'POST'} contact → ${made.status} ${JSON.stringify(made.data).slice(0, 300)}`);
    if (exists && segmentId) await resend('POST', `/contacts/${encodeURIComponent(row.email)}/segments/${segmentId}`);
  } else if (kind === 'renewed') {
    const up = await resend('PATCH', `/contacts/${encodeURIComponent(row.email)}`, { properties });
    if (!up.ok) throw new Error(`Resend PATCH contact → ${up.status}`);
  }
  const links = { ko: unsubLink(secret, site, row.email, 'ko'), en: unsubLink(secret, site, row.email, 'en') };
  const mail = noticeMail(kind, { day: kstDate(row.at), processed: kstDate(now.toISOString()), links, biz, site });
  const sent = await resend('POST', '/emails', { from: 'You Name It <news@younameit.works>', reply_to: biz.email, to: row.email, subject: mail.subject, text: mail.text });
  if (!sent.ok) throw new Error(`Resend POST /emails → ${sent.status} ${JSON.stringify(sent.data).slice(0, 300)}`);
  return { kind, email: row.email, at: row.at };
}

export async function run({ args, env, apis, readState, writeState, productTs, now = new Date(), log = console.log }) {
  const send = args.includes('--send');
  const sinceArg = args[args.indexOf('--since') + 1];
  const hasSince = args.includes('--since');
  let state = readState();
  if (state && hasSince) throw new Error('커서가 이미 있다 — --since 를 쓰지 마라(옛 주문을 다시 훑으면 철회자가 되살아난다). 일부러 처음부터 하려면 상태 파일을 직접 지워라.');
  if (!state && !hasSince) throw new Error('첫 실행엔 --since <KST 날짜> 가 필요하다(예: --since 2026-10-31 = 출시일).');
  if (!state) state = { cursor: sinceToIso(sinceArg), seen: [], done: [] };
  state.seen ||= []; state.done ||= [];

  let segmentId = env.RESEND_SEGMENT_ID || '';
  if (!segmentId) {
    const segs = await apis.resend('GET', '/segments');
    segmentId = ((segs.data?.data || segs.data || []).find?.((s) => s.name === 'newsletter') || {}).id || '';
    if (!segmentId) log('주의: Resend 세그먼트 newsletter 를 못 찾았다 — 연락처만 만들고 세그먼트엔 안 넣는다');
  }
  const orders = await listOrders(apis.polar, state.cursor);
  const plan = planFromOrders(orders, state);
  const todo = plan.rows.filter((r) => !state.done.includes(hashEmail(r.email)));
  log(`주문 ${plan.scanned}건(커서 ${state.cursor} 이후) → 통지 대상 ${todo.length}명${send ? '' : ' (미리보기 — 보내려면 --send)'}`);
  for (const r of todo) if ((now - Date.parse(r.at)) / DAY > WARN_DAYS) log(`🔴 ${r.email}: 동의 ${kstDate(r.at)} — ${WARN_DAYS}일이 넘었다. 14일 안에 통지해야 한다`);

  const biz = readBiz(productTs);
  const site = env.SITE_URL || 'https://younameit.works';
  const results = [];
  for (const r of todo) {
    try {
      const res = await applyRow(r, { resend: apis.resend, send, secret: env.NEWSLETTER_SECRET, site, segmentId, biz, now });
      results.push(res);
      log(`${send ? '처리' : '예정'} ${res.kind.padEnd(8)} ${r.email}  동의 ${kstDate(r.at)}`);
      if (send) state.done.push(hashEmail(r.email));
    } catch (e) {
      log(`✗ ${r.email}: ${e.message}`);
      if (send) writeState(state); // 끝낸 사람은 done 에 남아 재실행 때 다시 통지하지 않는다. 커서는 그대로.
      throw new Error('중간에 멈췄다 — 원인을 고치고 같은 명령으로 다시 돌려라(끝낸 사람은 건너뛴다).');
    }
  }
  if (send) writeState({ cursor: plan.nextCursor, seen: plan.nextSeen, done: [] });
  return results;
}

/* ── 실행 ── */
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const env = process.env;
  const need = ['POLAR_TOKEN', 'RESEND_API_KEY', 'NEWSLETTER_SECRET'].filter((k) => !env[k]);
  if (need.length) { console.error(`${need.join(' · ')} 가 필요하다.`); process.exit(1); }
  const statePath = env.PR_CONSENT_STATE || path.join(os.homedir(), '.config', 'younameit', 'pr-consent-sync.json');
  try {
    await run({
      args: process.argv.slice(2),
      env,
      apis: makeApis({ polarToken: env.POLAR_TOKEN, resendKey: env.RESEND_API_KEY }),
      readState: () => (existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : null),
      writeState: (s) => { mkdirSync(path.dirname(statePath), { recursive: true }); writeFileSync(statePath, JSON.stringify(s, null, 2), { mode: 0o600 }); },
      productTs: readFileSync(new URL('../lib/product.ts', import.meta.url), 'utf8'),
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
