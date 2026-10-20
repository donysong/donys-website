import type { Metadata } from 'next';
import PrivacyEn from '@/components/legal/PrivacyEn';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Privacy Policy for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy', languages: { en: '/privacy', ko: '/ko/privacy', 'x-default': '/privacy' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Privacy Policy',
  description: DESCRIPTION,
  ...share({ path: '/privacy', title: 'Privacy Policy — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 본문은 `components/legal/PrivacyEn.tsx` — 현재 판과 개정 예정본(`./upcoming`)이 같은 본문을 그린다. */
export default function PrivacyPage() {
  return <PrivacyEn view="current" />;
}
