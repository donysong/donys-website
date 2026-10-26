'use client';
/* 소식 메일 동의 셋 — 수집·이용 / 광고성 정보 수신 / 국외 이전을 **따로** 받고, 각 동의 밑에 법이 동의 **전에** 알리라고 한 고지 항목을 접지 않고 보인다.
   두 폼이 같이 쓴다: `NewsletterForm`(소식 받기 페이지) · `FreeDownloadForm`(무료 다운로드 폼의 선택 항목). 문구가 한 곳이라 두 입구의 동의가 같은 문구에 대한 동의다.
   법 근거 · 설계 = `functions/_lib/newsletter.ts` 머리 주석.
   🔴 하나로 합치거나 미리 체크해 두지 마라(개인정보 보호법 §22① · §28의8①1호 · 정보통신망법 §50①).
   🔴 이 문구를 바꾸면 `CONSENT_VERSION`(functions/_lib/newsletter.ts)을 올려라 — 누가 어느 문구에 동의했는지가 거기 남는다. */

type Lang = 'ko' | 'en';
export type NewsAgree = { collect: boolean; ads: boolean; transfer: boolean };
export const NEWS_NONE: NewsAgree = { collect: false, ads: false, transfer: false };
export const newsAll = (a: NewsAgree) => a.collect && a.ads && a.transfer;
export const newsAny = (a: NewsAgree) => a.collect || a.ads || a.transfer;

export const NEWS_CONSENT = {
  ko: {
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
  },
  en: {
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
  },
} as const;

export function Disclosure({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    /* 390 폭에서 두 칸이면 값 칸이 126px 로 눌려 한 줄 서너 낱말이 됐다 — sm 미만에선 머리 밑에 값을 쌓는다 */
    <dl className="mt-1.5 mb-1 grid grid-cols-1 gap-x-3 gap-y-1 pl-7 text-[13px] leading-snug text-[var(--text-secondary)] sm:grid-cols-[minmax(0,7.5rem)_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold text-[var(--text-primary)]">{k}</dt>
          <dd className="m-0 [overflow-wrap:anywhere] max-sm:mb-1.5">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export const CHECKBOX = 'mt-0.5 h-4 w-4 flex-none accent-[var(--black)]';

export function NewsConsentFields({ lang, agree, onChange }: { lang: Lang; agree: NewsAgree; onChange: (a: NewsAgree) => void }) {
  const t = NEWS_CONSENT[lang];
  return (
    <fieldset className="space-y-4 border-0 p-0">
      <label className="flex items-start gap-3 border-b border-black/20 pb-3 text-[15px] font-bold text-[var(--text-primary)]">
        <input type="checkbox" className={CHECKBOX} checked={newsAll(agree)} onChange={(e) => onChange({ collect: e.target.checked, ads: e.target.checked, transfer: e.target.checked })} />
        {t.all}
      </label>
      {([['collect', t.c1, t.c1d], ['ads', t.c2, t.c2d], ['transfer', t.c3, t.c3d]] as const).map(([k, label, rows]) => (
        <div key={k}>
          <label className="flex items-start gap-3 text-[15px] font-semibold text-[var(--text-primary)]">
            <input type="checkbox" className={CHECKBOX} checked={agree[k]} onChange={(e) => onChange({ ...agree, [k]: e.target.checked })} />
            {label}
          </label>
          <Disclosure rows={rows} />
        </div>
      ))}
    </fieldset>
  );
}
