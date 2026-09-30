/* 소식 메일(광고성 정보) 수신 동의 — Cloudflare Pages Functions 공용 모듈. `_` 로 시작해서 라우트가 되지 않는다.
   정본 설계·법 근거 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) D1~D4 · 페이지 = `components/site4/NewsletterForm.tsx`.

   흐름(이중 확인 — 동의의 증거는 **본인이 메일의 버튼을 누른 것**이다):
     ① /api/newsletter/subscribe  폼 → 확인 메일(토큰 72시간) — 아직 명단에 없다
     ② /newsletter?confirm=토큰    페이지의 버튼 → /api/newsletter/confirm → Resend 연락처 + 세그먼트 · **처리 결과 통지**
     ③ 철회 = 메일 속 링크 → /newsletter?unsubscribe=토큰 → /api/newsletter/unsubscribe → 통지 → 연락처 **삭제**
        · 브로드캐스트의 Resend 수신거부 링크로 철회하면 Resend 가 `contact.updated` 웹훅을 쏜다 → /api/newsletter/webhook 가 같은 통지·삭제
   🔴 링크는 GET 으로 상태를 바꾸지 않는다 — 메일 보안 스캐너가 링크를 미리 열어 **본인 모르게 동의·철회**되는 걸 막는다.
   🔴 `RESEND_API_KEY` 가 없으면 **보내지 않고 기록만** 한다(로컬 `wrangler pages dev` 시험용). 운영에서 이 상태면 가입이 조용히 안 된다 —
      설정 = `tools/newsletterSetup.mjs`. */

import { BUSINESS } from '../../lib/product';

export interface Env {
  RESEND_API_KEY?: string;
  RESEND_SEGMENT_ID?: string;
  RESEND_WEBHOOK_SECRET?: string;
  NEWSLETTER_SECRET?: string;
  NEWSLETTER_FROM?: string;
  SITE_URL?: string;
}
export interface Ctx {
  request: Request;
  env: Env;
}
export type Lang = 'ko' | 'en';

/* 동의 문구의 판 — 페이지의 동의 문구를 바꾸면 올려라(연락처 속성 `consent_ver` 로 누가 어느 문구에 동의했는지 남는다). */
export const CONSENT_VERSION = '2026-09-30';
const CONFIRM_TTL_S = 72 * 3600;

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && s.length <= 254 && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(s);

const site = (env: Env) => (env.SITE_URL || 'https://younameit.works').replace(/\/$/, '');
export const pageUrl = (env: Env, lang: Lang, q: string) => `${site(env)}${lang === 'ko' ? '/ko' : ''}/newsletter?${q}`;

/* ── 서명 토큰 — 저장소 없이 "이 주소의 이 동작" 을 증명한다. payload.signature (둘 다 base64url) ── */
type TokenBody = { e: string; l: Lang; a: 'c' | 'u'; t: number };
const b64u = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
async function hmac(key: string, data: string) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(data)));
}
function eq(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}
export async function signToken(env: Env, body: Omit<TokenBody, 't'>) {
  const payload = b64u(new TextEncoder().encode(JSON.stringify({ ...body, t: Math.floor(Date.now() / 1000) })));
  return `${payload}.${b64u(await hmac(secret(env), payload))}`;
}
export async function readToken(env: Env, token: unknown, action: 'c' | 'u'): Promise<TokenBody | null> {
  if (typeof token !== 'string' || token.length > 1024) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  try {
    if (!eq(await hmac(secret(env), payload), unb64u(sig))) return null;
    const body = JSON.parse(new TextDecoder().decode(unb64u(payload))) as TokenBody;
    if (body.a !== action || !isEmail(body.e)) return null;
    if (action === 'c' && Date.now() / 1000 - body.t > CONFIRM_TTL_S) return null;
    return body;
  } catch {
    return null;
  }
}
function secret(env: Env) {
  if (!env.NEWSLETTER_SECRET || env.NEWSLETTER_SECRET.length < 32) throw new Error('NEWSLETTER_SECRET 없음(32자 이상)');
  return env.NEWSLETTER_SECRET;
}

/* ── Resend ── */
export const dry = (env: Env) => !env.RESEND_API_KEY;
export async function resend(env: Env, method: string, path: string, body?: unknown) {
  if (dry(env)) {
    console.log('[newsletter:dry]', method, path, body ? JSON.stringify(body).slice(0, 2000) : '');
    return { ok: true, status: 200, data: {} as Record<string, unknown> };
  }
  const r = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await r.json().catch(() => ({}))) as Record<string, unknown>;
  if (!r.ok && r.status !== 404) console.error('[newsletter] resend', method, path, r.status, JSON.stringify(data).slice(0, 500));
  return { ok: r.ok, status: r.status, data };
}
export function sendMail(env: Env, to: string, mail: { subject: string; html: string; text: string }) {
  return resend(env, 'POST', '/emails', {
    from: env.NEWSLETTER_FROM || 'You Name It <news@younameit.works>',
    reply_to: 'support@younameit.works',
    to,
    ...mail,
  });
}

/* ── 메일 본문 — 확인(광고 아님) · 처리 결과 통지(시행령 §62의2: 전송자 명칭 · 동의/철회 사실과 날짜 · 처리 결과) ── */
/* 전송자 정보는 사이트와 같은 한 곳(`lib/product.ts` BUSINESS)에서 읽는다 — 광고성 정보에는 전송자 명칭·연락처가 있어야 한다(시행령 별표 6). */
const B = BUSINESS;
const SENDER = { ko: `${B.name.ko}(${B.name.en})`, en: B.name.en };
const FOOT = {
  ko: [SENDER.ko, `대표 ${B.ceo.ko}`, `사업자등록번호 ${B.regNo}`, B.address.ko, B.phone, B.email].filter(Boolean).join(' · '),
  en: [B.name.en, B.address.en, `Business Reg. No. ${B.regNo}`, B.phone, B.email].filter(Boolean).join(' · '),
};
const kstDate = (d = new Date()) => {
  const k = new Date(d.getTime() + 9 * 3600 * 1000);
  return `${k.getUTCFullYear()}-${String(k.getUTCMonth() + 1).padStart(2, '0')}-${String(k.getUTCDate()).padStart(2, '0')}`;
};
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
function frame(lang: Lang, paras: string[], button?: { href: string; label: string }) {
  const p = paras.map((x) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#0d2a38">${x}</p>`).join('');
  const b = button
    ? `<p style="margin:22px 0"><a href="${esc(button.href)}" style="display:inline-block;padding:12px 20px;background:#e50437;color:#fff;border-radius:6px;font-weight:700;text-decoration:none">${esc(button.label)}</a></p>`
    : '';
  return `<div style="max-width:560px;margin:0 auto;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Pretendard','Apple SD Gothic Neo',sans-serif">${p}${b}<p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#5b6b73">${esc(FOOT[lang])}</p></div>`;
}
const plain = (lang: Lang, paras: string[], link?: string) => [...paras.map((x) => x.replace(/<[^>]+>/g, '')), link || '', '', FOOT[lang]].join('\n\n');

export function confirmMail(lang: Lang, link: string) {
  const T = {
    ko: {
      subject: '[You Name It] 소식 메일 구독을 확인해 주세요',
      p: ['You Name It 소식 메일 구독 신청을 받았습니다.', '아래 버튼을 눌러 확인하시면 구독이 끝납니다. 이 링크는 72시간 동안 유효합니다.', '직접 신청하지 않으셨다면 이 메일을 무시해 주세요. 아무 일도 일어나지 않습니다.'],
      b: '구독 확인하기',
    },
    en: {
      subject: '[You Name It] Please confirm your subscription',
      p: ['We received a request to subscribe to the You Name It newsletter.', 'Press the button below to confirm. The link works for 72 hours.', 'If you did not ask for this, ignore this email and nothing will happen.'],
      b: 'Confirm subscription',
    },
  }[lang];
  return { subject: T.subject, html: frame(lang, T.p, { href: link, label: T.b }), text: plain(lang, T.p, link) };
}

export function resultMail(lang: Lang, kind: 'sub' | 'unsub', unsubLink?: string) {
  const d = kstDate();
  const T = {
    ko: {
      sub: {
        subject: '[You Name It] 광고성 정보 수신 동의 처리 결과',
        p: [
          `전송자: ${SENDER.ko}`,
          `고객님께서 ${d} 에 이메일로 광고성 정보(새 도구·업데이트·할인 소식)를 받는 데 동의하셨습니다.`,
          '처리 결과: 수신 동의가 완료되었습니다.',
          '언제든 아래 링크나 소식 메일 하단의 수신거부 링크로 철회하실 수 있으며, 비용은 들지 않습니다.',
        ],
        b: '수신 동의 철회하기',
      },
      unsub: {
        subject: '[You Name It] 광고성 정보 수신 거부 처리 결과',
        p: [
          `전송자: ${SENDER.ko}`,
          `고객님께서 ${d} 에 광고성 정보 수신을 거부(동의 철회)하셨습니다.`,
          '처리 결과: 수신 거부가 완료되어 더 이상 소식 메일을 보내지 않으며, 구독 정보(이메일 주소)를 삭제했습니다.',
          '구매하신 제품의 업데이트·라이선스·환불 안내처럼 거래에 필요한 메일은 광고가 아니므로 계속 받으실 수 있습니다.',
        ],
        b: '',
      },
    },
    en: {
      sub: {
        subject: '[You Name It] Your newsletter consent is confirmed',
        p: [
          `Sender: ${SENDER.en}`,
          `On ${d} (KST) you agreed to receive promotional email (new tools, updates and deals) from us.`,
          'Result: your consent is recorded and you are subscribed.',
          'You can withdraw at any time, free of charge, with the link below or the unsubscribe link at the bottom of any newsletter.',
        ],
        b: 'Withdraw consent',
      },
      unsub: {
        subject: '[You Name It] You are unsubscribed',
        p: [
          `Sender: ${SENDER.en}`,
          `On ${d} (KST) you withdrew your consent to receive promotional email.`,
          'Result: you are unsubscribed, we will not send you newsletters, and we have deleted your subscription data (email address).',
          'Emails needed for a purchase, such as update, license and refund notices, are not advertising and will still reach you.',
        ],
        b: '',
      },
    },
  }[lang][kind];
  const button = kind === 'sub' && unsubLink ? { href: unsubLink, label: T.b } : undefined;
  return { subject: T.subject, html: frame(lang, T.p, button), text: plain(lang, T.p, button?.href) };
}

/* 철회 공통 — 통지 → 연락처 삭제(목적이 끝났으니 지체 없이 파기, 개인정보 보호법 §21). 연락처가 이미 없으면 아무것도 안 한다(웹훅 재시도 대비). */
export async function withdraw(env: Env, email: string, fallbackLang: Lang) {
  const got = await resend(env, 'GET', `/contacts/${encodeURIComponent(email)}`);
  if (!dry(env) && got.status === 404) return { removed: false };
  const props = (got.data?.properties || {}) as Record<string, { value?: string } | string>;
  const raw = props.lang;
  const lang: Lang = (typeof raw === 'string' ? raw : raw?.value) === 'en' ? 'en' : (typeof raw === 'string' ? raw : raw?.value) === 'ko' ? 'ko' : fallbackLang;
  await sendMail(env, email, resultMail(lang, 'unsub'));
  await resend(env, 'DELETE', `/contacts/${encodeURIComponent(email)}`);
  return { removed: true };
}
