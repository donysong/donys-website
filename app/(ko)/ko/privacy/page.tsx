import type { Metadata } from 'next';
import PrivacyKo from '@/components/legal/PrivacyKo';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It AE Plugin 의 개인정보 처리방침입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/privacy', languages: { en: '/privacy', ko: '/ko/privacy', 'x-default': '/privacy' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '개인정보 처리방침',
  description: DESCRIPTION,
  ...share({ path: '/ko/privacy', title: '개인정보 처리방침 — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

/* 본문은 `components/legal/PrivacyKo.tsx` — 현재 판과 개정 예정본(`./upcoming`)이 같은 본문을 그린다. */
export default function PrivacyKoPage() {
  return <PrivacyKo view="current" />;
}
