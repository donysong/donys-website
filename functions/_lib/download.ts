/* 무료 버전 다운로드 — 이메일을 받고 다운로드 링크를 건네는 서버 쪽. 소식 메일(`_lib/newsletter.ts`)과 같은 이중 확인을 쓴다:
     ① /api/download/request   폼 → 확인 메일(토큰 72시간) — 아직 명단에 없다
     ② /download?confirm=토큰    페이지의 버튼 → /api/download/confirm → Resend 연락처(`free_at`) + 다운로드 링크(페이지 · 메일)
   🔴 링크는 GET 으로 상태를 바꾸지 않는다(메일 보안 스캐너가 링크를 미리 열어도 명단에 들어가지 않는다) — 소식 메일과 같은 규칙.
   🔴 **다운로드 신청 ≠ 광고 수신 동의.** 연락처의 `free_at`·`free_ver` 는 "무료 버전을 받았다"는 사실이고, 광고성 정보를 보내도 된다는 뜻이 아니다.
      광고 수신 동의(`consent_at` · 세그먼트 `newsletter`)는 폼의 **선택 항목**(동의 셋)을 모두 체크했을 때만 같은 확인 버튼으로 같이 확정된다
      (정보통신망법 §50① · 개인정보 보호법 §22① — 필수와 선택·마케팅은 구분해서 받는다). 브로드캐스트는 `newsletter` 세그먼트로만 보낸다 —
      "모든 연락처"로 보내면 다운로드만 한 사람에게 광고가 나간다.
   🔴 파일 주소는 `lib/product.ts` DOWNLOAD_URL 이다(공개 R2). 이메일을 받는 건 명단을 위해서고 파일 보호가 아니다. */
import { DOWNLOAD_URL, VERSION } from '../../lib/product';
import {
  CONSENT_VERSION, type Env, type Lang, frame, isEmail, json, pageUrl, plain, readToken, resultMail, sendMail, signToken, site, upsertContact,
} from './newsletter';

/* 무료 다운로드 고지·동의 문구의 판 — 폼의 고지 문구(`components/site4/FreeDownloadForm.tsx`)나 개인정보 처리방침의 해당 항목을 바꾸면 올려라.
   연락처 속성 `free_ver` 로 누가 어느 문구를 보고 신청했는지 남는다. 소식 메일 동의 문구의 판은 `CONSENT_VERSION`(newsletter.ts) 그대로다 — 문구가 같다. */
export const FREE_VERSION = '2026-10-15';

export const downloadUrl = (env: Env, lang: Lang, q: string) => `${site(env)}${lang === 'ko' ? '/ko' : ''}/download?${q}`;

/* ── 요청 검증 — 순수 함수라 `tools/functions.test.mjs` 가 직접 돌린다 ── */
export type DownloadRequest =
  | { ok: true; email: string; lang: Lang; news: boolean }
  | { ok: false; status: number; error: 'bad_request' | 'email' | 'consent' | 'news_consent'; silent?: boolean };

/** 폼 본문을 읽는다. 필수 동의(`agreeTerms`)가 참이어야 하고, 소식 메일은 선택이지만 **셋이 모두 참이거나 모두 아니거나**다(일부만이면 되돌려 보낸다). */
export function parseDownloadRequest(b: unknown): DownloadRequest {
  if (!b || typeof b !== 'object') return { ok: false, status: 400, error: 'bad_request' };
  const r = b as Record<string, unknown>;
  /* 봇 덫 — 채워져 있으면 성공처럼 답하고 아무것도 안 한다(소식 메일 폼과 같다). */
  if (typeof r.website === 'string' && r.website) return { ok: false, status: 200, error: 'bad_request', silent: true };
  const email = typeof r.email === 'string' ? r.email.trim().toLowerCase() : '';
  if (!isEmail(email)) return { ok: false, status: 400, error: 'email' };
  if (r.agreeTerms !== true) return { ok: false, status: 400, error: 'consent' };
  const n = (r.news && typeof r.news === 'object' ? r.news : {}) as Record<string, unknown>;
  const yes = [n.collect, n.ads, n.transfer].filter((x) => x === true).length;
  if (yes !== 0 && yes !== 3) return { ok: false, status: 400, error: 'news_consent' };
  return { ok: true, email, lang: r.lang === 'en' ? 'en' : 'ko', news: yes === 3 };
}

/* 요청 → 확인 메일. 응답은 주소가 있든 없든 같다 — 누가 명단에 있는지 이 창구로 알아낼 수 없게. */
export async function requestDownload(env: Env, body: unknown) {
  const r = parseDownloadRequest(body);
  if (!r.ok) return r.silent ? json({ ok: true }) : json({ ok: false, error: r.error }, r.status);
  const token = await signToken(env, { e: r.email, l: r.lang, a: 'd', ...(r.news ? { n: 1 as const } : {}) });
  await sendMail(env, r.email, confirmMail(r.lang, downloadUrl(env, r.lang, `confirm=${token}`), r.news));
  return json({ ok: true });
}

/* 확인 → 명단 + 링크. 소식 메일 동의가 같이 왔으면(`n`) 그 동의도 여기서 확정하고 처리 결과를 알린다(시행령 §62의2). */
export async function confirmDownload(env: Env, body: unknown) {
  const t = await readToken(env, (body as { token?: unknown } | null)?.token, 'd');
  if (!t) return json({ ok: false, error: 'token' }, 400);
  const now = new Date().toISOString();
  const properties: Record<string, string> = { free_at: now, free_ver: FREE_VERSION, lang: t.l };
  if (t.n) Object.assign(properties, { consent_at: now, consent_ver: CONSENT_VERSION });
  const ok = await upsertContact(env, t.e, {
    properties,
    segmentIds: [env.RESEND_FREE_SEGMENT_ID, ...(t.n ? [env.RESEND_SEGMENT_ID] : [])],
    subscribe: !!t.n,
  });
  if (!ok) return json({ ok: false, error: 'upstream' }, 502);
  if (t.n) {
    const unsub = await signToken(env, { e: t.e, l: t.l, a: 'u' });
    await sendMail(env, t.e, resultMail(t.l, 'sub', pageUrl(env, t.l, `unsubscribe=${unsub}`)));
  }
  await sendMail(env, t.e, readyMail(env, t.l));
  return json({ ok: true, url: DOWNLOAD_URL, version: VERSION, news: !!t.n });
}

/* ── 메일 본문 — 둘 다 거래·이용 안내다(광고 아님). 🔴 업그레이드·할인 같은 홍보 문장을 넣지 마라: 광고 수신에 동의하지 않은 사람에게 가는 메일이다. ── */
export function confirmMail(lang: Lang, link: string, news: boolean) {
  const T = {
    ko: {
      subject: '[You Name It] 무료 버전 다운로드 링크를 받으려면 확인해 주세요',
      p: [
        'You Name It AE Plugin 무료 버전 다운로드를 신청하셨습니다.',
        '아래 버튼을 누르시면 다운로드 링크가 열립니다. 이 링크는 72시간 동안 유효합니다.',
        ...(news ? ['신청하실 때 소식 메일(광고성 정보) 수신에도 동의하셨습니다. 이 버튼을 누르시면 그 동의도 함께 확정됩니다. 원하지 않으시면 이 메일을 무시해 주세요.'] : []),
        '직접 신청하지 않으셨다면 이 메일을 무시해 주세요. 아무 일도 일어나지 않습니다.',
      ],
      b: '다운로드 링크 받기',
    },
    en: {
      subject: '[You Name It] Confirm to get your free download link',
      p: [
        'We received a request for the free version of You Name It AE Plugin.',
        'Press the button below and the download link opens. The link works for 72 hours.',
        ...(news ? ['On the form you also agreed to receive our newsletter (promotional email). This button confirms that consent too. If you changed your mind, ignore this email.'] : []),
        'If you did not ask for this, ignore this email and nothing will happen.',
      ],
      b: 'Get the download link',
    },
  }[lang];
  return { subject: T.subject, html: frame(lang, T.p, { href: link, label: T.b }), text: plain(lang, T.p, link) };
}

export function readyMail(env: Env, lang: Lang) {
  const guide = `${site(env)}${lang === 'ko' ? '/ko' : ''}/ae/docs#install`;
  const T = {
    ko: {
      subject: '[You Name It] 무료 버전 다운로드 링크',
      p: [
        `요청하신 You Name It AE Plugin 무료 버전(v${VERSION})의 다운로드 링크입니다.`,
        `설치 방법은 <a href="${guide}">설치 안내</a>에 있습니다.`,
        '이메일 주소의 삭제를 원하시면 이 메일에 회신하시거나 support@younameit.works 로 알려 주세요. 지체 없이 삭제합니다.',
      ],
      b: '다운로드',
    },
    en: {
      subject: '[You Name It] Your free download link',
      p: [
        `Here is the download link for the free version of You Name It AE Plugin (v${VERSION}) you asked for.`,
        `Installation steps are in the <a href="${guide}">install guide</a>.`,
        'To have your email address deleted, reply to this email or write to support@younameit.works. We delete it without delay.',
      ],
      b: 'Download',
    },
  }[lang];
  return { subject: T.subject, html: frame(lang, T.p, { href: DOWNLOAD_URL, label: T.b }), text: plain(lang, T.p, DOWNLOAD_URL) };
}

