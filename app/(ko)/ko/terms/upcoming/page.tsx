import type { Metadata } from 'next';
import TermsKo from '@/components/legal/TermsKo';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It 플러그인의 이용약관입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/terms/upcoming', languages: { en: '/terms/upcoming', ko: '/ko/terms/upcoming', 'x-default': '/terms/upcoming' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다. */
  title: '이용약관 (시행 예정)',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/ko/terms/upcoming', title: '이용약관 (시행 예정) — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

/* 🔴 **시행 예정본** — 시행일(`lib/policy.ts` 의 `PR_EFFECTIVE`) 전엔 이 페이지가 아니라 현재 판(`/ko/terms`)이 효력을 가진다.
   현재 판 맨 위 "개정 예정 안내" 띠가 여기로 잇는다. 색인하지 않는다(noindex · 사이트맵에 없음).
   시행일에 `PR_IN_FORCE = true` 로 바꾸는 커밋에서 이 파일(과 영문 짝)을 지운다 — `deployCheck [policy]` 가 남은 것을 잡는다. */
export default function TermsUpcomingKoPage() {
  return <TermsKo view="upcoming" />;
}
