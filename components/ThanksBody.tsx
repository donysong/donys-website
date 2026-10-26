/* 결제 뒤 착지 면 `/thanks` · `/ko/thanks` — 영문판과 국문판이 이 한 벌을 공유한다.
   Polar Checkout Link 의 Success URL 이 `https://younameit.works/thanks?checkout_id={CHECKOUT_ID}` 를 가리킨다(오너 설정 — ANALYTICS_PLAN §9).
   `purchase` 이벤트는 `components/Analytics.tsx` 가 이 경로를 보고 쏜다(동의한 방문자만 · 주문 ID 당 한 번).

   🔴 문구는 오너 확인 대상이다(ANALYTICS_PLAN A5 — 새 페이지). 사실은 FAQ q12 가 이미 말하는 것만 쓴다: 키와 설치 파일은 고객 포털에 있다.
      "메일로 키가 간다" 같은 말은 확인 전이라 쓰지 않았다.
   🔴 `/ae/` 아래에 두지 마라 — deployCheck 가 `/ae` 이하를 *파는 면* 으로 읽어 결제 링크를 요구한다. */
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { PORTAL_URL } from '@/lib/product';

const T = {
  en: {
    brand: 'You Name It AE Plugin',
    h1: 'Thank you',
    lead: 'Your payment went through.',
    portal: 'Your license key and the installer are in the customer portal. Sign in with the email you paid with.',
    portalB: 'Open the customer portal',
    guide: 'How to install',
    guideHref: '/ae/docs#install',
    help: 'Anything wrong? Write to',
  },
  ko: {
    brand: 'You Name It AE Plugin',
    h1: '감사합니다',
    lead: '결제가 완료되었습니다.',
    portal: '라이선스 키와 설치 파일은 고객 포털에 있습니다. 결제하신 이메일로 로그인하세요.',
    portalB: '고객 포털 열기',
    guide: '설치하는 법',
    guideHref: '/ko/ae/docs#install',
    help: '문제가 있으면 아래로 알려 주세요:',
  },
} as const;

export default function ThanksBody({ lang }: { lang: 'en' | 'ko' }) {
  const t = T[lang];
  return (
    <ReadingShell lang={lang} plate="s.thanks">
      <header className="max-w-3xl">
        <p className="lab">{t.brand}</p>
        <InkTitle>{t.h1}</InkTitle>
        <p className="text-[17px] leading-relaxed">{t.lead}</p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1]">
        <p className="text-[15px] leading-relaxed">{t.portal}</p>
        <p className="mt-5 flex flex-wrap items-center gap-4">
          <a className="btn-line font-bold" href={PORTAL_URL} target="_blank" rel="noopener" data-cur>{t.portalB} ↗</a>
          <a className="text-[15px] font-semibold underline underline-offset-4" href={t.guideHref} data-cur>{t.guide}</a>
        </p>
        <p className="mt-6 text-[14px] text-[var(--text-secondary)]">
          {t.help} <a className="font-semibold underline underline-offset-4" href="mailto:support@younameit.works" data-cur>support@younameit.works</a>
        </p>
      </div>
    </ReadingShell>
  );
}
