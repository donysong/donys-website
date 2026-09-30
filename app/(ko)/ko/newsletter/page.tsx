import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import NewsletterForm from '@/components/site4/NewsletterForm';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It 의 새 도구·업데이트·할인 소식을 이메일로 받습니다.';

/* 소식 메일 구독 국문판 — 영문판(`app/(en)/newsletter/page.tsx`) 주석 참조. 색인하지 않는다(토큰 주소). */
export const metadata: Metadata = {
  alternates: { canonical: '/ko/newsletter', languages: { en: '/newsletter', ko: '/ko/newsletter', 'x-default': '/newsletter' } },
  title: '소식 받기',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/ko/newsletter', title: '소식 받기 — You Name It', description: DESCRIPTION, card: 'brand', lang: 'ko' }),
};

export default function NewsletterKoPage() {
  return (
    <ReadingShell lang="ko" plate="s.ft.news">
      <header className="max-w-3xl">
        <p className="lab">You Name It</p>
        <InkTitle>소식 받기</InkTitle>
        <p className="text-[17px] leading-relaxed">새 도구, 업데이트, 가끔 할인 소식. 할 말이 있을 때만 보냅니다.</p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1]">
        <NewsletterForm lang="ko" />
      </div>
    </ReadingShell>
  );
}
