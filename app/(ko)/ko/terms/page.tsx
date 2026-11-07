import type { Metadata } from 'next';
import TermsKo from '@/components/legal/TermsKo';
import { share } from '@/lib/meta';
import { PR_IN_FORCE } from '@/lib/policy';

const DESCRIPTION = PR_IN_FORCE ? 'You Name It 플러그인의 이용약관입니다.' : 'You Name It AE Plugin 의 이용약관입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/terms', languages: { en: '/terms', ko: '/ko/terms', 'x-default': '/terms' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '이용약관',
  description: DESCRIPTION,
  ...share({ path: '/ko/terms', title: '이용약관 — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

/* 본문은 `components/legal/TermsKo.tsx` — 현재 판과 개정 예정본(`./upcoming`)이 같은 본문을 그린다. */
export default function TermsKoPage() {
  return <TermsKo view="current" />;
}
