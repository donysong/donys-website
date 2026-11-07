import type { Metadata } from 'next';
import TermsEn from '@/components/legal/TermsEn';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Terms of Service for the You Name It plugins.';

export const metadata: Metadata = {
  alternates: { canonical: '/terms/upcoming', languages: { en: '/terms/upcoming', ko: '/ko/terms/upcoming', 'x-default': '/terms/upcoming' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다. */
  title: 'Terms of Service (upcoming)',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/terms/upcoming', title: 'Terms of Service (upcoming) — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 🔴 **시행 예정본** — 시행일(`lib/policy.ts` 의 `PR_EFFECTIVE`) 전엔 현재 판(`/terms`)이 효력을 가진다. noindex · 사이트맵에 없음.
   시행일에 `PR_IN_FORCE = true` 로 바꾸는 커밋에서 이 파일(과 국문 짝)을 지운다 — `deployCheck [policy]` 가 남은 것을 잡는다. */
export default function TermsUpcomingPage() {
  return <TermsEn view="upcoming" />;
}
