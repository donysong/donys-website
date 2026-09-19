import type { Metadata } from 'next';
import MotionLab from '@/components/MotionLab';

/* 내부 실험대 — 색인 금지. 네비에 링크 없음. */
export const metadata: Metadata = {
  title: '모션 정본 · 실험대',
  robots: { index: false, follow: false },
};

export default function MotionPage() {
  return <MotionLab />;
}
