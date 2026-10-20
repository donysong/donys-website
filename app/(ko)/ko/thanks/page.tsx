import type { Metadata } from 'next';
import ThanksBody from '@/components/ThanksBody';
import { share } from '@/lib/meta';

const DESCRIPTION = '결제가 완료되었습니다. 라이선스 키와 설치 파일은 고객 포털에 있습니다.';

/* 결제 뒤 착지 면 국문판 — 영문판(`app/(en)/thanks/page.tsx`) 주석 참조. 색인하지 않는다. */
export const metadata: Metadata = {
  alternates: { canonical: '/ko/thanks', languages: { en: '/thanks', ko: '/ko/thanks', 'x-default': '/thanks' } },
  title: '감사합니다',
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  ...share({ path: '/ko/thanks', title: '감사합니다 — You Name It', description: DESCRIPTION, lang: 'ko' }),
};

export default function ThanksKoPage() {
  return <ThanksBody lang="ko" />;
}
