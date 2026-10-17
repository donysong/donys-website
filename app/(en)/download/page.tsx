import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import FreeDownloadForm from '@/components/site4/FreeDownloadForm';
import { TIERS } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = `Download the free version of You Name It AE Plugin: Library, Curves, Expressions, Support and ${TIERS.freeTools} Toolbox tools.`;

/* 무료 버전 다운로드 — 폼 · 확인 버튼 = `FreeDownloadForm` · 서버 = `functions/api/download/*`.
   색인하지 않는다: 확인 메일의 링크가 이 주소에 토큰을 달고 온다(`?confirm=`). 검색에 잡히는 입구는 `/ae`(가격 판의 Free 칸)다. */
export const metadata: Metadata = {
  alternates: { canonical: '/download', languages: { en: '/download', ko: '/ko/download', 'x-default': '/download' } },
  title: 'Free download',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/download', title: 'Free download — You Name It', description: DESCRIPTION, lang: 'en' }),
};

export default function DownloadPage() {
  return (
    <ReadingShell lang="en" plate="s.ft.download">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>Free download</InkTitle>
        <p className="text-[17px] leading-relaxed">
          Library, Curves, Expressions, Support and {TIERS.freeTools} Toolbox tools. No card. Enter your email and we send you the download link.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed">
          Want to see what Free and Pro each include? <a href="/ae#price" className="font-semibold underline underline-offset-4">Compare them</a>.
        </p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1]">
        <FreeDownloadForm lang="en" standalone />
      </div>
    </ReadingShell>
  );
}
