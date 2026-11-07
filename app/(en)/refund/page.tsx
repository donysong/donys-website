import type { Metadata } from 'next';
import RefundEn from '@/components/legal/RefundEn';
import { share } from '@/lib/meta';
import { PR_IN_FORCE } from '@/lib/policy';

const DESCRIPTION = PR_IN_FORCE ? 'Refund Policy for the You Name It plugins.' : 'Refund Policy for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/refund', languages: { en: '/refund', ko: '/ko/refund', 'x-default': '/refund' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Refund Policy',
  description: DESCRIPTION,
  ...share({ path: '/refund', title: 'Refund Policy — You Name It', description: DESCRIPTION, lang: 'en' }),
};

/* 본문은 `components/legal/RefundEn.tsx` — 현재 판과 개정 예정본(`./upcoming`)이 같은 본문을 그린다. */
export default function RefundPage() {
  return <RefundEn view="current" />;
}
