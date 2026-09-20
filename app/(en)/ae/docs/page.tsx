/* `/ae/docs` — 읽는 면(EN). 본문은 전부 `components/site4/docs/` 아래에 있고 여기는 라우트 껍데기다.

   🔴 이 페이지가 보여주는 카탈로그(툴 39 · 패널 7 · 이펙트 5 · 설명 EN/KO)는 **손으로 적은 게
   아니라 `lib/docsData.ts` 생성물**이다. 플러그인 카탈로그가 바뀌면  npm run build:docs.

   🔴 로캘은 URL 이 정한다 — 국문은 `/ko/ae/docs` 에 **따로 구워진다**(`lang.tsx` 2026-09-19 주석 ·
   `Shell` 의 `LOCALIZED`). 그래서 `initial="en"` 으로 박고, 토글은 상태가 아니라 짝 페이지로 간다.
   hreflang 을 안 걸면 구글이 같은 내용의 두 URL 을 중복으로 읽는다. */
import { LangProvider } from '@/components/site3p/lang';
import DocsPage from '@/components/site4/docs/DocsPage';

export const metadata = {
  /* 🔴 자기 타이틀이 없으면 **브랜드 루트의 기본값**이 그대로 나간다 — 읽는 면 두 장이
     2026-09-19 까지 그 상태였다(`/ae/docs` 가 루트와 같은 제목). 브랜드명은 붙이지 마라,
     레이아웃 template 이 붙인다. */
  title: 'Docs · What the panels do',
  alternates: {
    canonical: '/ae/docs',
    languages: { en: '/ae/docs', ko: '/ko/ae/docs', 'x-default': '/ae/docs' },
  },
};

export default function Docs() {
  return (
    <LangProvider initial="en">
      <DocsPage />
    </LangProvider>
  );
}
