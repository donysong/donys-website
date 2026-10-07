import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import NewsletterForm from '@/components/site4/NewsletterForm';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Get news about new tools, updates and deals from You Name It by email.';

/* 소식 메일 구독 — 폼·확인·철회 = `NewsletterForm` · 서버 = `functions/api/newsletter/*` (2026-09-30 오너 *"수신 동의 장치 만들어두자"*).
   색인하지 않는다: 확인·철회 링크가 이 주소에 토큰을 달고 온다(`?confirm=` · `?unsubscribe=`). */
export const metadata: Metadata = {
  alternates: { canonical: '/newsletter', languages: { en: '/newsletter', ko: '/ko/newsletter', 'x-default': '/newsletter' } },
  title: 'Newsletter',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/newsletter', title: 'Newsletter — You Name It', description: DESCRIPTION, card: 'brand', lang: 'en' }),
};

export default function NewsletterPage() {
  return (
    <ReadingShell lang="en" plate="s.ft.news">
      <header className="max-w-3xl">
        <p className="lab">You Name It</p>
        <InkTitle>Newsletter</InkTitle>
        <p className="text-[17px] leading-relaxed">New tools, updates and the occasional deal. Only when there is something to say.</p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1]">
        <NewsletterForm lang="en" />
      </div>
    </ReadingShell>
  );
}
