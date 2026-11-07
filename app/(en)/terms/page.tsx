import type { Metadata } from 'next';
import TermsEn from '@/components/legal/TermsEn';
import { share } from '@/lib/meta';
import { PR_IN_FORCE } from '@/lib/policy';

const DESCRIPTION = PR_IN_FORCE ? 'Terms of Service for the You Name It plugins.' : 'Terms of Service for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/terms', languages: { en: '/terms', ko: '/ko/terms', 'x-default': '/terms' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Terms of Service',
  description: DESCRIPTION,
  ...share({ path: '/terms', title: 'Terms of Service — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 본문은 `components/legal/TermsEn.tsx` — 현재 판과 개정 예정본(`./upcoming`)이 같은 본문을 그린다. */
export default function TermsPage() {
  return <TermsEn view="current" />;
}
