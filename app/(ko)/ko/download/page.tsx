import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import FreeDownloadForm from '@/components/site4/FreeDownloadForm';
import { TIERS } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = `You Name It AE Plugin 무료 버전을 내려받습니다. Library · Curves · Expressions · Support 패널과 Toolbox 툴 ${TIERS.freeTools}개.`;

/* 무료 버전 다운로드 국문판 — 영문판(`app/(en)/download/page.tsx`) 주석 참조. 색인하지 않는다(토큰 주소). */
export const metadata: Metadata = {
  alternates: { canonical: '/ko/download', languages: { en: '/download', ko: '/ko/download', 'x-default': '/download' } },
  title: '무료 다운로드',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...share({ path: '/ko/download', title: '무료 다운로드 — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

export default function DownloadKoPage() {
  return (
    <ReadingShell lang="ko" plate="s.ft.download">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>무료 다운로드</InkTitle>
        <p className="text-[17px] leading-relaxed">
          Library · Curves · Expressions · Support 패널과 Toolbox 툴 {TIERS.freeTools}개. 카드 없이 이메일만 입력하시면 다운로드 링크를 보내 드립니다.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed">
          무료와 Pro 에 각각 무엇이 들어 있는지 궁금하시면 <a href="/ko/ae#price" className="font-semibold underline underline-offset-4">비교해 보세요</a>.
        </p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1]">
        <FreeDownloadForm lang="ko" standalone />
      </div>
    </ReadingShell>
  );
}
