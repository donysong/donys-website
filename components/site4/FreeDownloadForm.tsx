'use client';
/* 무료 버전 다운로드 폼 — 이메일을 받고, 확인 메일의 버튼을 누르면 다운로드 링크를 건넨다(소식 메일과 같은 이중 확인).
   쓰는 곳 둘: `/ae` 가격 판의 Free 칸(`standalone` 아님 — 폼만) · `/download` · `/ko/download`(`standalone` — 확인 메일의 링크 `?confirm=` 도 이 페이지가 받는다).
   서버 = `functions/api/download/*` · 흐름과 법 근거 = `functions/_lib/download.ts` 머리 주석.

   🔴 동의는 **둘로 나뉜다**(개인정보 보호법 §22① · 정보통신망법 §50①):
      · [필수] 이용약관 · 개인정보 처리방침 동의 = 이메일을 다운로드 링크 발송과 무료 이용자 관리에 쓰는 것. 이것만 체크하면 광고는 오지 않는다.
      · [선택] 소식 메일(광고성 정보) = `NewsConsent.tsx` 의 동의 셋(소식 받기 페이지와 같은 문구). 접힌 칸(`<details>`) 안에 있어서 펼쳐야 체크할 수 있고,
        고지 항목은 체크박스 바로 밑에 접지 않고 보인다. 일부만 체크하면 막는다.
   🔴 필수 고지(목적 · 항목 · 보유 기간 · 거부권 · 처리 위탁)는 체크박스 밑에 **항상 보인다**. 문구를 바꾸면 `FREE_VERSION`(functions/_lib/download.ts)을 올려라.
   🔴 광고 문구를 이 폼에 넣지 마라 — 필수 동의만 한 사람에게 가는 화면이다.
   버튼은 외곽선(`.btn-line`)이다 — 채움 빨강은 구매에만 쓴다. */
import { useEffect, useState } from 'react';
import { BUSINESS } from '@/lib/product';
import { CHECKBOX, Disclosure, NEWS_NONE, NewsConsentFields, newsAll, newsAny } from './NewsConsent';

type Lang = 'ko' | 'en';
type Mode = 'form' | 'confirm';
type Phase = 'idle' | 'busy' | 'done' | 'error';
type Ready = { url: string; version: string; news: boolean };

const T = {
  ko: {
    email: '이메일 주소',
    terms: ['[필수] ', '이용약관', '과 ', '개인정보 처리방침', '에 동의합니다'],
    rows: [
      ['수집 항목', '이메일 주소, 신청 일시, 언어'],
      ['이용 목적', '무료 버전 다운로드 링크 발송, 무료 이용자 관리, 제품 이용에 필요한 안내(보안·업데이트 등 — 광고 아님)'],
      ['보유 기간', '삭제를 요청하실 때까지 — 요청하시면 지체 없이 삭제합니다'],
      ['거부 권리', '동의하지 않으실 수 있습니다. 이 경우 다운로드 링크를 받으실 수 없으며, 유료 버전 구매에는 영향이 없습니다'],
      ['처리 위탁', '메일 발송과 명단 보관은 Resend(Plus Five Five, Inc., 미국)에 맡깁니다 — 개인정보 처리방침 제6조·제7조'],
    ],
    newsSummary: '[선택] 소식 메일(광고성 정보)도 받기',
    newsIntro: '받지 않으셔도 다운로드에는 영향이 없습니다. 받으시려면 아래 세 가지에 모두 동의해 주세요(아래 [필수]는 소식 메일에만 해당합니다).',
    submit: '무료로 받기',
    busy: '보내는 중…',
    sent: '확인 메일을 보냈습니다. 72시간 안에 메일의 버튼을 누르시면 다운로드 링크가 열립니다. 메일이 안 보이면 스팸함도 확인해 주세요.',
    errEmail: '이메일 주소를 확인해 주세요.',
    errConsent: '이용약관과 개인정보 처리방침에 동의해 주세요.',
    errNews: '소식 메일을 받으시려면 세 가지에 모두 동의해 주세요. 받지 않으시려면 체크를 모두 풀어 주세요.',
    err: '처리하지 못했습니다. 잠시 뒤 다시 시도하시거나 ' + BUSINESS.email + ' 로 알려 주세요.',
    confirmH: '무료 버전 다운로드 링크를 받으시겠어요?',
    confirmB: '링크 받기',
    badToken: '링크가 만료되었거나 올바르지 않습니다. 확인 링크는 72시간 동안만 유효합니다 — 아래에서 다시 신청해 주세요.',
    ready: (v: string) => `v${v} 다운로드 링크입니다. 같은 링크를 메일로도 보냈습니다.`,
    readyNews: '소식 메일 수신 동의도 확인되었습니다. 처리 결과를 메일로 보내 드렸습니다.',
    download: '다운로드',
    guide: '설치 안내',
  },
  en: {
    email: 'Email address',
    terms: ['[Required] I agree to the ', 'Terms of Service', ' and the ', 'Privacy Policy', ''],
    rows: [
      ['What', 'Your email address, the time you asked, and your language'],
      ['Why', 'To send the free download link, to keep a list of free-version users, and to send notices you need to use the Product (security, updates — not advertising)'],
      ['How long', 'Until you ask us to delete it — we delete it without delay'],
      ['Your choice', 'You may refuse. You then cannot get the download link; buying the paid version is not affected'],
      ['Processor', 'Sending email and keeping the list are handled by Resend (Plus Five Five, Inc., United States) — see Section 4 of the Privacy Policy'],
    ],
    newsSummary: '[Optional] Also get the newsletter (promotional email)',
    newsIntro: 'The download works either way. To get the newsletter, agree to all three below (the [Required] marks below apply to the newsletter only).',
    submit: 'Get it free',
    busy: 'Sending…',
    sent: 'We sent you a confirmation email. Press its button within 72 hours and the download link opens. If you do not see it, check your spam folder.',
    errEmail: 'Please check your email address.',
    errConsent: 'Please agree to the Terms of Service and the Privacy Policy.',
    errNews: 'To get the newsletter, agree to all three. If you do not want it, clear every box.',
    err: 'Something went wrong. Please try again later or tell us at ' + BUSINESS.email + '.',
    confirmH: 'Get the link to the free version?',
    confirmB: 'Get the link',
    badToken: 'This link has expired or is not valid. Confirmation links work for 72 hours — please ask again below.',
    ready: (v: string) => `Here is the link to v${v}. We also emailed it to you.`,
    readyNews: 'Your newsletter consent is confirmed too. We emailed you the result.',
    download: 'Download',
    guide: 'Install guide',
  },
} as const;

async function post(path: string, body: unknown) {
  const r = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string; url?: string; version?: string; news?: boolean };
  return { ok: r.ok && j.ok === true, ...j };
}

export default function FreeDownloadForm({ lang, standalone = false }: { lang: Lang; standalone?: boolean }) {
  const t = T[lang];
  const [mode, setMode] = useState<Mode>('form');
  const [token, setToken] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(false);
  const [news, setNews] = useState(NEWS_NONE);
  const [ready, setReady] = useState<Ready | null>(null);

  useEffect(() => {
    if (!standalone) return;
    const c = new URLSearchParams(location.search).get('confirm');
    if (c) { setMode('confirm'); setToken(c); }
  }, [standalone]);

  const toForm = (m: string) => { setMode('form'); setPhase('error'); setMsg(m); history.replaceState(null, '', location.pathname); };

  async function request(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value || '';
    if (!terms) { setPhase('error'); setMsg(t.errConsent); return; }
    if (newsAny(news) && !newsAll(news)) { setPhase('error'); setMsg(t.errNews); return; }
    setPhase('busy');
    const r = await post('/api/download/request', { email, lang, website, agreeTerms: terms, news }).catch(() => ({ ok: false, error: 'net' }));
    if (r.ok) { setPhase('done'); setMsg(t.sent); }
    else { setPhase('error'); setMsg(r.error === 'email' ? t.errEmail : r.error === 'consent' ? t.errConsent : r.error === 'news_consent' ? t.errNews : t.err); }
  }

  async function confirm() {
    setPhase('busy');
    const r = await post('/api/download/confirm', { token }).catch(() => ({ ok: false, error: 'net' } as { ok: boolean; error?: string; url?: string; version?: string; news?: boolean }));
    if (r.ok && r.url && r.version) { setReady({ url: r.url, version: r.version, news: !!r.news }); setPhase('done'); setMsg(''); }
    else if (r.error === 'token') toForm(t.badToken);
    else { setPhase('error'); setMsg(t.err); }
  }

  const status = msg ? (
    /* 오류 글자 = 짙은 빨강(소식 메일 폼과 같다 — 브랜드 `--red` 는 종이 위 3.88:1 이라 15px 본문에 못 쓴다) */
    <p role="status" className={`mt-4 text-[15px] font-semibold ${phase === 'error' ? 'text-[#b0002a]' : 'text-[var(--text-primary)]'}`}>{msg}</p>
  ) : null;

  if (mode === 'confirm') {
    if (ready) {
      return (
        <div data-free-ready>
          <p role="status" className="mb-4 text-[15px] font-semibold text-[var(--text-primary)]">{t.ready(ready.version)}</p>
          <p className="flex flex-wrap items-center gap-4">
            <a className="btn-line font-bold" href={ready.url} data-cur>{t.download} ↓</a>
            <a className="text-[15px] font-semibold underline underline-offset-4" href={lang === 'ko' ? '/ko/ae/docs#install' : '/ae/docs#install'} data-cur>{t.guide}</a>
          </p>
          {ready.news ? <p className="mt-4 text-[14px] text-[var(--text-secondary)]">{t.readyNews}</p> : null}
        </div>
      );
    }
    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">{t.confirmH}</h2>
        <button type="button" className="btn-line font-bold" onClick={confirm} disabled={phase === 'busy'} aria-busy={phase === 'busy'} data-cur>
          {phase === 'busy' ? t.busy : t.confirmB}
        </button>
        {status}
      </div>
    );
  }

  if (phase === 'done') return <div data-free-sent>{status}</div>;

  const [pre, termsLink, mid, privacyLink, post_] = t.terms;
  const link = 'font-semibold underline underline-offset-4';
  return (
    <form onSubmit={request} noValidate data-free-form>
      <label className="block text-[15px] font-semibold text-[var(--text-primary)]" htmlFor="free-email">{t.email}</label>
      <input
        id="free-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full max-w-md rounded-md border-[1.5px] border-[var(--black)] bg-white/70 px-3 py-2.5 text-[15px] text-[var(--black)]"
      />
      {/* 봇 덫 — 사람에겐 안 보이고 스크린리더도 건너뛴다 */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      <div className="mt-5">
        <label className="flex items-start gap-3 text-[15px] font-semibold text-[var(--text-primary)]">
          <input type="checkbox" className={CHECKBOX} checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>
            {pre}
            <a className={link} href={lang === 'ko' ? '/ko/terms' : '/terms'} target="_blank" rel="noopener" data-cur>{termsLink}</a>
            {mid}
            <a className={link} href={lang === 'ko' ? '/ko/privacy' : '/privacy'} target="_blank" rel="noopener" data-cur>{privacyLink}</a>
            {post_}
          </span>
        </label>
        <Disclosure rows={t.rows} />
      </div>

      <details className="mt-4 border-t border-black/20 pt-3" data-free-news>
        <summary className="cursor-pointer text-[15px] font-semibold text-[var(--text-primary)]" data-cur>{t.newsSummary}</summary>
        <p className="mb-3 mt-2 text-[13px] leading-snug text-[var(--text-secondary)]">{t.newsIntro}</p>
        <NewsConsentFields lang={lang} agree={news} onChange={setNews} />
      </details>

      <button type="submit" className="btn-line mt-5 font-bold" disabled={phase === 'busy'} aria-busy={phase === 'busy'} data-cur>
        {phase === 'busy' ? t.busy : t.submit}
      </button>
      {status}
    </form>
  );
}
