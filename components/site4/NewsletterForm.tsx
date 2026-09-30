'use client';
/* 소식 메일 구독 — 폼 · 확인 버튼 · 철회 버튼을 한 컴포넌트가 주소의 쿼리로 가른다(`?confirm=` · `?unsubscribe=`).
   서버 = `functions/api/newsletter/*` · 설계와 법 근거 = `functions/_lib/newsletter.ts` 머리 주석 · 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) D.
   🔴 동의 셋을 **따로** 받는다(개인정보 보호법 §22① · §28의8①1호 · 정보통신망법 §50①). 하나로 합치거나 미리 체크해 두지 마라.
   🔴 각 동의 밑의 고지 항목(목적·항목·기간·거부권 / 국외 이전 5항목)은 법이 동의 **전에** 알리라고 한 것이다 — 접어 두지 않는다.
   문구를 바꾸면 `CONSENT_VERSION`(functions/_lib/newsletter.ts)을 올려라 — 누가 어느 문구에 동의했는지가 거기 남는다.
   버튼은 외곽선(`.btn-line`)이다 — 채움 빨강은 구매에만 쓴다(REBRAND §9.9 ③). */
import { useEffect, useState } from 'react';
import { BUSINESS } from '@/lib/product';

type Lang = 'ko' | 'en';
type Mode = 'form' | 'confirm' | 'unsubscribe';
type Phase = 'idle' | 'busy' | 'done' | 'error';

const T = {
  ko: {
    email: '이메일 주소',
    all: '아래 세 가지에 모두 동의합니다',
    c1: '[필수] 개인정보 수집·이용 동의',
    c1d: [
      ['수집 항목', '이메일 주소, 동의 일시, 언어'],
      ['이용 목적', 'You Name It 의 새 도구·업데이트·할인 소식(광고성 정보) 전송'],
      ['보유 기간', '동의를 철회하실 때까지 — 철회하시면 처리 결과를 알려 드린 뒤 지체 없이 삭제합니다'],
      ['거부 권리', '동의하지 않으실 수 있습니다. 이 경우 소식 메일만 받으실 수 없고, 제품 구매·이용에는 아무 영향이 없습니다'],
    ],
    c2: '[필수] 광고성 정보(이메일) 수신 동의',
    c2d: [['내용', '새 도구·업데이트·할인 소식을 이메일로 받습니다. 모든 소식 메일 하단의 링크로 언제든 무료로 철회하실 수 있습니다']],
    c3: '[필수] 개인정보 국외 이전 동의',
    c3d: [
      ['이전받는 자', 'Plus Five Five, Inc.(Resend) · support@resend.com'],
      ['이전 국가', '미국(발송 처리 지역: 일본 도쿄)'],
      ['이전 항목', '이메일 주소, 동의 일시, 언어'],
      ['이전 시기·방법', '구독을 확인하실 때 암호화된 통신으로 전송'],
      ['이용 목적·기간', '구독자 명단 보관과 소식 메일 발송 · 동의를 철회하실 때까지'],
      ['거부 방법·효과', '동의하지 않으시면 이전되지 않으며, 이 경우 소식 메일을 받으실 수 없습니다'],
    ],
    submit: '구독 신청',
    sent: '확인 메일을 보냈습니다. 72시간 안에 메일의 버튼을 누르시면 구독이 끝납니다. 메일이 안 보이면 스팸함도 확인해 주세요.',
    errEmail: '이메일 주소를 확인해 주세요.',
    errConsent: '세 가지 동의가 모두 필요합니다.',
    err: '처리하지 못했습니다. 잠시 뒤 다시 시도하시거나 ' + BUSINESS.email + ' 로 알려 주세요.',
    confirmH: '구독을 확인하시겠어요?',
    confirmB: '구독 확인',
    confirmed: '구독이 확인되었습니다. 처리 결과를 메일로 보내 드렸습니다.',
    badToken: '링크가 만료되었거나 올바르지 않습니다. 확인 링크는 72시간 동안만 유효합니다 — 아래에서 다시 신청해 주세요.',
    unsubH: '소식 메일 수신을 거부하시겠어요?',
    unsubB: '수신 거부',
    unsubbed: '수신 거부가 완료되었습니다. 구독 정보를 삭제했고, 처리 결과를 메일로 보내 드렸습니다.',
    note: '광고성 정보는 동의하신 분께만 보냅니다. 업데이트·라이선스·환불처럼 구매에 필요한 안내는 광고가 아니라 이 동의와 관계없이 받으실 수 있습니다.',
    privacy: '개인정보 처리방침',
  },
  en: {
    email: 'Email address',
    all: 'I agree to all three below',
    c1: '[Required] Consent to collect and use personal data',
    c1d: [
      ['What', 'Your email address, the time you agreed, and your language'],
      ['Why', 'To send You Name It news about new tools, updates and deals (promotional email)'],
      ['How long', 'Until you withdraw — then we tell you the result and delete it without delay'],
      ['Your choice', 'You may refuse. You then simply do not get the newsletter; buying and using the Product is not affected'],
    ],
    c2: '[Required] Consent to receive promotional email',
    c2d: [['What', 'News about new tools, updates and deals by email. Withdraw any time, free, from the link at the bottom of every newsletter']],
    c3: '[Required] Consent to transfer personal data abroad',
    c3d: [
      ['Recipient', 'Plus Five Five, Inc. (Resend) · support@resend.com'],
      ['Country', 'United States (sending region: Tokyo, Japan)'],
      ['Data', 'Email address, time of consent, language'],
      ['When and how', 'When you confirm, over an encrypted connection'],
      ['Purpose and period', 'Keeping the subscriber list and sending the newsletter · until you withdraw'],
      ['If you refuse', 'Nothing is transferred, and you cannot receive the newsletter'],
    ],
    submit: 'Subscribe',
    sent: 'We sent you a confirmation email. Press its button within 72 hours to finish. If you do not see it, check your spam folder.',
    errEmail: 'Please check your email address.',
    errConsent: 'All three consents are needed.',
    err: 'Something went wrong. Please try again later or tell us at ' + BUSINESS.email + '.',
    confirmH: 'Confirm your subscription?',
    confirmB: 'Confirm',
    confirmed: 'You are subscribed. We emailed you the result.',
    badToken: 'This link has expired or is not valid. Confirmation links work for 72 hours — please subscribe again below.',
    unsubH: 'Unsubscribe from the newsletter?',
    unsubB: 'Unsubscribe',
    unsubbed: 'You are unsubscribed. We deleted your subscription data and emailed you the result.',
    note: 'We send promotional email only to people who agreed. Notices you need for a purchase, such as update, license and refund notices, are not advertising and reach you regardless.',
    privacy: 'Privacy Policy',
  },
} as const;

async function post(path: string, body: unknown) {
  const r = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  return { ok: r.ok && j.ok === true, error: j.error };
}

function Disclosure({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <dl className="mt-1.5 mb-1 grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-3 gap-y-1 pl-7 text-[13px] leading-snug text-[var(--text-secondary)]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold text-[var(--text-primary)]">{k}</dt>
          <dd className="m-0 [overflow-wrap:anywhere]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function NewsletterForm({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [mode, setMode] = useState<Mode>('form');
  const [token, setToken] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState({ collect: false, ads: false, transfer: false });
  const all = agree.collect && agree.ads && agree.transfer;

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const c = q.get('confirm');
    const u = q.get('unsubscribe');
    if (c) { setMode('confirm'); setToken(c); } else if (u) { setMode('unsubscribe'); setToken(u); }
  }, []);

  const toForm = (m: string) => { setMode('form'); setPhase('error'); setMsg(m); history.replaceState(null, '', location.pathname); };

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value || '';
    if (!all) { setPhase('error'); setMsg(t.errConsent); return; }
    setPhase('busy');
    const r = await post('/api/newsletter/subscribe', {
      email, lang, website, agreeCollect: agree.collect, agreeAds: agree.ads, agreeTransfer: agree.transfer,
    }).catch(() => ({ ok: false, error: 'net' }));
    if (r.ok) { setPhase('done'); setMsg(t.sent); } else { setPhase('error'); setMsg(r.error === 'email' ? t.errEmail : r.error === 'consent' ? t.errConsent : t.err); }
  }

  async function act() {
    setPhase('busy');
    const r = await post(`/api/newsletter/${mode === 'confirm' ? 'confirm' : 'unsubscribe'}`, { token }).catch(() => ({ ok: false, error: 'net' }));
    if (r.ok) { setPhase('done'); setMsg(mode === 'confirm' ? t.confirmed : t.unsubbed); }
    else if (r.error === 'token') toForm(t.badToken);
    else { setPhase('error'); setMsg(t.err); }
  }

  const status = msg ? (
    <p role="status" className={`mt-4 text-[15px] font-semibold ${phase === 'error' ? 'text-[var(--red)]' : 'text-[var(--text-primary)]'}`}>{msg}</p>
  ) : null;

  if (mode !== 'form') {
    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">{mode === 'confirm' ? t.confirmH : t.unsubH}</h2>
        {phase === 'done' ? null : (
          <button type="button" className="btn-line font-bold" onClick={act} disabled={phase === 'busy'} data-cur>
            {mode === 'confirm' ? t.confirmB : t.unsubB}
          </button>
        )}
        {status}
      </div>
    );
  }

  if (phase === 'done') return <div>{status}</div>;

  const box = 'mt-0.5 h-4 w-4 flex-none accent-[var(--black)]';
  return (
    <form onSubmit={subscribe} noValidate>
      <label className="block text-[15px] font-semibold text-[var(--text-primary)]" htmlFor="nl-email">{t.email}</label>
      <input
        id="nl-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full max-w-md rounded-md border-[1.5px] border-[var(--black)] bg-white/70 px-3 py-2.5 text-[15px] text-[var(--black)]"
      />
      {/* 봇 덫 — 사람에겐 안 보이고 스크린리더도 건너뛴다 */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      <fieldset className="mt-6 space-y-4 border-0 p-0">
        <label className="flex items-start gap-3 border-b border-black/20 pb-3 text-[15px] font-bold text-[var(--text-primary)]">
          <input type="checkbox" className={box} checked={all} onChange={(e) => setAgree({ collect: e.target.checked, ads: e.target.checked, transfer: e.target.checked })} />
          {t.all}
        </label>
        {([['collect', t.c1, t.c1d], ['ads', t.c2, t.c2d], ['transfer', t.c3, t.c3d]] as const).map(([k, label, rows]) => (
          <div key={k}>
            <label className="flex items-start gap-3 text-[15px] font-semibold text-[var(--text-primary)]">
              <input type="checkbox" className={box} checked={agree[k]} onChange={(e) => setAgree({ ...agree, [k]: e.target.checked })} />
              {label}
            </label>
            <Disclosure rows={rows} />
          </div>
        ))}
      </fieldset>

      <p className="mt-5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        {t.note}{' '}
        <a href={lang === 'ko' ? '/ko/privacy' : '/privacy'} className="font-semibold underline underline-offset-4">{t.privacy}</a>
      </p>
      <button type="submit" className="btn-line mt-5 font-bold" disabled={phase === 'busy'} data-cur>{t.submit}</button>
      {status}
    </form>
  );
}
