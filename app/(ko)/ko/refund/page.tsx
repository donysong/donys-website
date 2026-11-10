import type { Metadata } from 'next';
import RefundKo from '@/components/legal/RefundKo';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It 플러그인의 환불 정책입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/refund', languages: { en: '/refund', ko: '/ko/refund', 'x-default': '/refund' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '환불 정책',
  description: DESCRIPTION,
  ...share({ path: '/ko/refund', title: '환불 정책 — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

/* 본문은 `components/legal/RefundKo.tsx`. */
export default function RefundKoPage() {
  return <RefundKo />;
}
