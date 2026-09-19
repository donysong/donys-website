/* `/ko/ae/docs` — 읽는 면의 **국문 판본**. 내용은 `/ae/docs` 와 같고 로캘만 박혀 있다.

   🔴 클라이언트 토글로만 두면 구워진 HTML 이 EN 한 벌뿐이라 국문에 주소도 색인도 없다
   (`components/site3p/lang.tsx` 2026-09-19 주석). `Shell` 의 `LOCALIZED` 와 `app/sitemap.ts` 가
   이미 이 경로를 가리키고 있다 — 없으면 사이트맵이 404 를 색인시킨다.

   본문 카탈로그는 `lib/docsData.ts` 생성물이다. 바뀌면  npm run build:docs. */
import { LangProvider } from '@/components/site3p/lang';
import DocsPage from '@/components/site4/docs/DocsPage';

export const metadata = {
  alternates: {
    canonical: '/ko/ae/docs',
    languages: { en: '/ae/docs', ko: '/ko/ae/docs', 'x-default': '/ae/docs' },
  },
};

export default function DocsKo() {
  return (
    <LangProvider initial="ko">
      <DocsPage />
    </LangProvider>
  );
}
