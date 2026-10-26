'use client';
/* 무료 버전 다운로드 폼 — 이메일을 받고, 확인 메일의 버튼을 누르면 다운로드 링크를 건넨다(소식 메일과 같은 이중 확인).
   쓰는 곳 둘: `/ae` 가격 판의 Free 칸(`standalone` 아님 — 폼만) · `/download` · `/ko/download`(`standalone` — 확인 메일의 링크 `?confirm=` 도 이 페이지가 받는다).
   서버 = `functions/api/download/*` · 흐름과 법 근거 = `functions/_lib/download.ts` 머리 주석.

   🔴 동의는 **셋으로 나뉜다**(개인정보 보호법 §22① · 정보통신망법 §50① · 2026-10-15 오너 판정: 약관 동의와 수집·이용 동의는 따로 받는다):
      · [필수] 이용약관 동의 = 무료 버전에도 약관(제3조의2)이 적용된다는 것. 이것만으로는 개인정보를 쓰지 않는다.
      · [필수] 개인정보 수집·이용 동의 = 이메일을 다운로드 링크 발송과 무료 이용자 관리에 쓰는 것. 네 항목(수집 항목 · 목적 · 보유 기간 · 거부권과 불이익)이 체크박스 밑에 접지 않고 보인다.
        이 동의를 해도 광고는 오지 않는다. 🔴 개인정보 처리방침은 **동의 대상이 아니라 공개 대상**이다 — 체크박스 문구에 넣지 말고 아래 링크로만 건다.
      · [선택] 소식 메일(광고성 정보) = `NewsConsent.tsx` 의 동의 셋(소식 받기 페이지와 같은 문구). 접힌 칸(`<details>`) 안에 있어서 펼쳐야 체크할 수 있고,
        고지 항목은 체크박스 바로 밑에 접지 않고 보인다. 일부만 체크하면 막는다.
   서버(`functions/_lib/download.ts` parseDownloadRequest)가 필수 둘을 각각 다시 본다. deployCheck `[free]` 는 두 체크박스(`data-consent`)가 구워져 있는지 본다.
   🔴 보유 기간 문구("마지막 안내 메일을 보낸 날부터 3년")는 방침 제3조·확인 메일 고지와 한 문구다 — 바꾸면 셋을 같이 고친다(`[retention]`).
   🔴 문구를 바꾸면 `FREE_VERSION`(functions/_lib/download.ts)을 올려라.
   🔴 광고 문구를 이 폼에 넣지 마라 — 필수 동의만 한 사람에게 가는 화면이다.
   버튼은 외곽선(`.btn-line`)이다 — 채움 빨강은 구매에만 쓴다. */
import { useEffect, useState } from 'react';
import { BUSINESS } from '@/lib/product';
import { track } from '@/lib/analytics';
import { CHECKBOX, Disclosure, NEWS_NONE, NewsConsentFields, newsAll, newsAny } from './NewsConsent';

type Lang = 'ko' | 'en';
type Mode = 'form' | 'confirm';
type Phase = 'idle' | 'busy' | 'done' | 'error';
type Ready = { url: string; version: string; news: boolean };

const T = {
  ko: {
    email: '이메일 주소',
    terms: ['[필수] ', '이용약관', '에 동의합니다'],
    privacy: '[필수] 개인정보 수집·이용에 동의합니다',
    rows: [
      ['수집 항목', '이메일 주소, 신청 일시, 언어'],
      ['이용 목적', '무료 버전 다운로드 링크 발송, 무료 이용자 관리, 제품 이용에 필요한 안내(보안·업데이트 등 — 광고 아님)'],
      ['보유 기간', '그 주소로 마지막 안내 메일(다운로드 링크 등)을 보낸 날부터 3년 — 삭제를 요청하시면 그 전에 지체 없이 삭제합니다'],
      ['거부 권리와 불이익', '동의하지 않으실 수 있습니다. 동의하지 않으시면 다운로드 링크를 받으실 수 없습니다. 유료 버전 구매에는 영향이 없습니다'],
      ['처리 위탁·국외 이전', '메일 발송과 명단 보관은 Resend(Plus Five Five, Inc., 미국)에 맡기며 이메일 주소가 미국으로 이전됩니다 — 확인 메일에도 같은 안내를 적어 보냅니다'],
    ],
    policy: ['자세한 내용은 ', '개인정보 처리방침', '(제6조 위탁 · 제7조 국외 이전)에 있습니다.'],
    newsSummary: '[선택] 소식 메일(광고성 정보)도 받기',
    newsIntro: '안 받아도 다운로드에는 영향이 없어요. 받으시려면 아래 세 가지에 모두 동의해 주세요(아래 [필수]는 소식 메일에만 해당해요).',
    submit: '무료로 받기',
    busy: '보내는 중…',
    sent: '확인 메일을 보냈어요. 72시간 안에 메일 속 버튼을 누르면 다운로드 링크가 열려요. 메일이 안 보이면 스팸함도 한번 봐 주세요.',
    errEmail: '이메일 주소를 확인해 주세요.',
    errTerms: '이용약관에 동의해 주세요.',
    errPrivacy: '개인정보 수집·이용에 동의해 주세요.',
    errNews: '소식 메일을 받으시려면 세 가지에 모두 동의해 주세요. 안 받으시려면 체크를 전부 풀어 주세요.',
    err: '처리하지 못했어요. 잠시 뒤 다시 해 보시거나 ' + BUSINESS.email + '로 알려 주세요.',
    confirmH: '무료 버전 다운로드 링크를 받으시겠어요?',
    confirmB: '링크 받기',
    badToken: '링크가 만료됐거나 올바르지 않아요. 확인 링크는 72시간 동안만 열려요. 아래에서 다시 신청해 주세요.',
    ready: (v: string) => `v${v} 다운로드 링크예요. 같은 링크를 메일로도 보냈어요.`,
    readyNews: '소식 메일 수신 동의도 확인됐어요. 처리 결과는 메일로 보내 드렸어요.',
    download: '다운로드',
    guide: '설치 안내',
  },
  en: {
    email: 'Email address',
    terms: ['[Required] I agree to the ', 'Terms of Service', ''],
    privacy: '[Required] I agree to the collection and use of my personal data',
    rows: [
      ['What', 'Your email address, the time you asked, and your language'],
      ['Why', 'To send the free download link, to keep a list of free-version users, and to send notices you need to use the Product (security, updates — not advertising)'],
      ['How long', '3 years after the last notice email we send to that address (such as the download link) — or sooner: ask us to delete it and we delete it without delay'],
      ['If you refuse', 'You may refuse. You then cannot get the download link. Buying the paid version is not affected'],
      ['Processor and transfer abroad', 'Sending email and keeping the list are handled by Resend (Plus Five Five, Inc., United States), so your email address is transferred to the United States — the confirmation email repeats this notice'],
    ],
    policy: ['Details are in the ', 'Privacy Policy', ' (Section 4).'],
    newsSummary: '[Optional] Also get the newsletter (promotional email)',
    newsIntro: 'The download works either way. To get the newsletter, agree to all three below (the [Required] marks below apply to the newsletter only).',
    submit: 'Get it free',
    busy: 'Sending…',
    sent: 'We sent you a confirmation email. Press its button within 72 hours and the download link opens. Can’t find it? Check your spam folder.',
    errEmail: 'Please check your email address.',
    errTerms: 'Please agree to the Terms of Service.',
    errPrivacy: 'Please agree to the collection and use of your personal data.',
    errNews: 'To get the newsletter, agree to all three. Don’t want it? Clear every box.',
    err: 'Something went wrong. Please try again later or tell us at ' + BUSINESS.email + '.',
    confirmH: 'Get the link to the free version?',
    confirmB: 'Get the link',
    badToken: 'This link has expired or isn’t valid. Confirmation links work for 72 hours, so please ask again below.',
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
  const [privacy, setPrivacy] = useState(false);
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
    if (!terms) { setPhase('error'); setMsg(t.errTerms); track('form_error', { form: 'free_download', reason: 'terms' }); return; }
    if (!privacy) { setPhase('error'); setMsg(t.errPrivacy); track('form_error', { form: 'free_download', reason: 'privacy' }); return; }
    if (newsAny(news) && !newsAll(news)) { setPhase('error'); setMsg(t.errNews); track('form_error', { form: 'free_download', reason: 'news_partial' }); return; }
    setPhase('busy');
    const r = await post('/api/download/request', { email, lang, website, agreeTerms: terms, agreePrivacy: privacy, news }).catch(() => ({ ok: false, error: 'net' }));
    if (r.ok) { setPhase('done'); setMsg(t.sent); track('free_download_request', { placement: standalone ? 'download_page' : 'price' }); }
    else { track('form_error', { form: 'free_download', reason: r.error || 'unknown' }); setPhase('error'); setMsg(r.error === 'email' ? t.errEmail : r.error === 'consent_terms' ? t.errTerms : r.error === 'consent_privacy' ? t.errPrivacy : r.error === 'news_consent' ? t.errNews : t.err); }
  }

  async function confirm() {
    setPhase('busy');
    const r = await post('/api/download/confirm', { token }).catch(() => ({ ok: false, error: 'net' } as { ok: boolean; error?: string; url?: string; version?: string; news?: boolean }));
    if (r.ok && r.url && r.version) { setReady({ url: r.url, version: r.version, news: !!r.news }); setPhase('done'); setMsg(''); track('generate_lead', { lead_type: 'free_download' }); }   // 확인까지 끝난 사람만 리드다 — 신청만 한 사람은 free_download_request
    else if (r.error === 'token') { track('form_error', { form: 'free_download', reason: 'token' }); toForm(t.badToken); }
    else { track('form_error', { form: 'free_download', reason: r.error || 'unknown' }); setPhase('error'); setMsg(t.err); }
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
            <a className="btn-line font-bold" href={ready.url} data-dl="free" data-cur>{t.download} ↓</a>
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

  const [pre, termsLink, post_] = t.terms;
  const [polPre, polLink, polPost] = t.policy;
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
          <input type="checkbox" className={CHECKBOX} checked={terms} onChange={(e) => setTerms(e.target.checked)} data-consent="terms" />
          <span>
            {pre}
            <a className={link} href={lang === 'ko' ? '/ko/terms' : '/terms'} target="_blank" rel="noopener" data-cur>{termsLink}</a>
            {post_}
          </span>
        </label>
      </div>

      <div className="mt-4">
        <label className="flex items-start gap-3 text-[15px] font-semibold text-[var(--text-primary)]">
          <input type="checkbox" className={CHECKBOX} checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} data-consent="privacy" />
          <span>{t.privacy}</span>
        </label>
        <Disclosure rows={t.rows} />
        {/* 방침은 동의 대상이 아니라 공개 대상 — 동의 문구 밖에서 링크로만 건다 */}
        <p className="mb-1 pl-7 text-[13px] leading-snug text-[var(--text-secondary)]">
          {polPre}
          <a className={link} href={lang === 'ko' ? '/ko/privacy' : '/privacy'} target="_blank" rel="noopener" data-cur>{polLink}</a>
          {polPost}
        </p>
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
