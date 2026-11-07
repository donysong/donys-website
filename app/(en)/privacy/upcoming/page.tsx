import type { Metadata } from 'next';
import PrivacyEn from '@/components/legal/PrivacyEn';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Privacy Policy for the You Name It plugins.';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy/upcoming', languages: { en: '/privacy/upcoming', ko: '/ko/privacy/upcoming', 'x-default': '/privacy/upcoming' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Privacy Policy (upcoming)',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/privacy/upcoming', title: 'Privacy Policy (upcoming) — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 🔴 **시행 예정본** — PR Plugin 개정(`lib/policy.ts` 의 `PR_EFFECTIVE`) 전엔 현재 판(`/privacy`)이 효력을 가진다. noindex · 사이트맵에 없음.
   본문 = 현재 판과 같은 `PrivacyEn` 한 벌 — 동의 기반 방문 통계 조항(2026-10-31 시행, `ANALYTICS_ON`)은 현재 판과 똑같이 들어가고 PR 조항만 더해진다.
   (분석 개정의 예정본은 07957ae 에서 시행과 함께 지웠다 — 이 파일은 PR 개정 고지로 다시 생겼다.)
   PR 개정이 시행되면(`PR_IN_FORCE`) 이 파일(과 국문 짝)을 지운다 — `deployCheck [policy]` 가 남은 것을 잡는다. */
export default function PrivacyUpcomingPage() {
  return <PrivacyEn view="upcoming" />;
}
