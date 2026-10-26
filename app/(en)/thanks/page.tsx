import type { Metadata } from 'next';
import ThanksBody from '@/components/ThanksBody';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Your payment went through. Your license key and the installer are in the customer portal.';

/* 결제 뒤 착지 면 — 본문은 `components/ThanksBody.tsx` 를 국문판과 공유한다. 색인하지 않는다(Polar Success URL 전용 · sitemap 에도 없다). */
export const metadata: Metadata = {
  alternates: { canonical: '/thanks', languages: { en: '/thanks', ko: '/ko/thanks', 'x-default': '/thanks' } },
  title: 'Thank you',
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  ...share({ path: '/thanks', title: 'Thank you — You Name It', description: DESCRIPTION, lang: 'en' }),
};

export default function ThanksPage() {
  return <ThanksBody lang="en" />;
}
