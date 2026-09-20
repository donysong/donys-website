import type { Metadata } from 'next';
import UpdateBody from '@/components/UpdateBody';

/* `/update` 의 **국문판**. 본문은 `components/UpdateBody.tsx` 를 영문판과 공유한다.

   🔴 패널이 가리키는 계약 경로는 `/update` 하나다(매니페스트도 한 벌) — 한국어 유저도 **영문 면에
   먼저 떨어진다.** 그래서 전환 링크가 두 면 모두 **첫 화면**에 있다. 이 페이지를 계약 경로로
   바꾸지 마라: 기존 설치본의 `version.json` 은 `/update` 로 컴파일돼 돌아다닌다.

   🔴 이 페이지가 생긴 이유: 릴리스 노트에 영문이 서면서(2026-09-19) `/update` 가 **반반**이 됐다 —
   크롬은 한국어, 노트는 영어. 영문으로 통일하면 그동안 한국어로 읽던 유저에게는 **회귀**다. */
export const metadata: Metadata = {
  alternates: {
    canonical: '/ko/update',
    languages: { en: '/update', ko: '/ko/update', 'x-default': '/update' },
  },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '업데이트',
  description: 'You Name It 최신 버전 다운로드 및 설치 안내.',
};

export default function UpdateKoPage() {
  return <UpdateBody lang="ko" />;
}
