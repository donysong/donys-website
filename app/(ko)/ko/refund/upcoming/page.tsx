import type { Metadata } from 'next';
import RefundKo from '@/components/legal/RefundKo';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It 플러그인의 환불 정책입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/refund/upcoming', languages: { en: '/refund/upcoming', ko: '/ko/refund/upcoming', 'x-default': '/refund/upcoming' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다. */
  title: '환불 정책 (시행 예정)',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/ko/refund/upcoming', title: '환불 정책 (시행 예정) — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

/* 🔴 **시행 예정본** — 시행일(`lib/policy.ts` 의 `PR_EFFECTIVE`) 전엔 현재 판(`/ko/refund`)이 효력을 가진다. noindex · 사이트맵에 없음.
   시행일에 `PR_IN_FORCE = true` 로 바꾸는 커밋에서 이 파일(과 영문 짝)을 지운다 — `deployCheck [policy]` 가 남은 것을 잡는다. */
export default function RefundUpcomingKoPage() {
  return <RefundKo view="upcoming" />;
}
