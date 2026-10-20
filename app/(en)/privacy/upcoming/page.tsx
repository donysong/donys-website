import type { Metadata } from 'next';
import PrivacyEn from '@/components/legal/PrivacyEn';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Privacy Policy for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy/upcoming', languages: { en: '/privacy/upcoming', ko: '/ko/privacy/upcoming', 'x-default': '/privacy/upcoming' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Privacy Policy (upcoming)',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/privacy/upcoming', title: 'Privacy Policy (upcoming) — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 🔴 **시행 예정본** — 시행일(`lib/analytics.ts` 의 `ANALYTICS_EFFECTIVE`) 전엔 이 페이지가 아니라 현재 판(`/privacy`)이 효력을 가진다.
   현재 판 맨 위 "개정 예정 안내" 띠가 여기로 잇는다. 색인하지 않는다(noindex · 사이트맵에 없음).
   분석을 켜는 날(`GTM_ID` 채움) 개정본이 현재 판이 되므로 이 파일(과 국문 짝)은 같은 커밋에서 지운다 — `deployCheck [policy]` 가 남은 것을 잡는다. */
export default function PrivacyUpcomingPage() {
  return <PrivacyEn view="upcoming" />;
}
