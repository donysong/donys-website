/* `/ko/ae/docs` — 읽는 면의 **국문 판본**. 내용은 `/ae/docs` 와 같고 로캘만 박혀 있다.

   🔴 클라이언트 토글로만 두면 구워진 HTML 이 EN 한 벌뿐이라 국문에 주소도 색인도 없다
   (`components/site3p/lang.tsx` 2026-09-19 주석). `Shell` 의 `LOCALIZED` 와 `app/sitemap.ts` 가
   이미 이 경로를 가리키고 있다 — 없으면 사이트맵이 404 를 색인시킨다.

   본문 카탈로그는 `lib/docsData.ts` 생성물이다. 바뀌면  npm run build:docs. */
import { LangProvider } from '@/components/site3p/lang';
import DocsPage from '@/components/site4/docs/DocsPage';
import { COUNTS } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = `You Name It AE Plugin 의 패널과 툴 ${COUNTS.scripts}개가 각각 무엇을 하고, 무엇이 있어야 도는지.`;

export const metadata = {
  /* 🔴 자기 타이틀이 없으면 **브랜드 루트의 기본값**이 그대로 나간다 — 읽는 면 두 장이
     2026-09-19 까지 그 상태였다(`/ae/docs` 가 루트와 같은 제목). 제품명 규칙대로 `absolute`.
     🔴 이름은 `Docs` 하나다 — 전엔 `<title>` 만 `설명서` 였고 h1·푸터는 `Docs` 라 한 면에 이름이 셋이었다.
     🔴 description 이 없으면 **브랜드 문장**이 상속된다(2026-09-26 실측) — 페이지마다 적는다. */
  title: { absolute: 'Docs — You Name It AE Plugin' },
  description: DESCRIPTION,
  alternates: {
    canonical: '/ko/ae/docs',
    languages: { en: '/ae/docs', ko: '/ko/ae/docs', 'x-default': '/ae/docs' },
  },
  ...share({ path: '/ko/ae/docs', title: 'Docs — You Name It AE Plugin', description: DESCRIPTION, card: 'product', lang: 'ko' }),
};

export default function DocsKo() {
  return (
    <LangProvider initial="ko">
      <DocsPage />
    </LangProvider>
  );
}
