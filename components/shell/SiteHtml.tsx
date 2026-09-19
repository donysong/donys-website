/* 🔴 `<html>`·`<head>`·`<body>` 한 벌 — **루트 레이아웃이 둘이라서** 여기로 뽑았다.
   정적 export 에서 `<html lang>` 은 루트 레이아웃이 정하고 페이지가 못 바꾼다. 그래서
   `app/(en)/layout.tsx` 와 `app/(ko)/layout.tsx` 로 갈랐고, 둘이 이 컴포넌트를 공유한다.
   🔴 국문 면이 `lang="en"` 으로 구워지던 것이 이걸 만든 이유다 — hreflang 은 맞는데
   문서 자체가 영어라고 선언하면 크롤러와 스크린리더가 둘 다 틀린 값을 읽는다. */
import { GoogleAnalytics } from '@next/third-parties/google';
import RisoDefs from '@/components/RisoDefs';

export default function SiteHtml({ lang, children }: { lang: 'en' | 'ko'; children: React.ReactNode }) {
  // 정적 export(output:'export')라 NEXT_PUBLIC_ 값은 빌드 타임에 번들로 인라인된다.
  // 빌드 환경에 없으면 undefined → GA 태그 자체를 렌더하지 않는다(빈 gaId 금지).
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Sans Flex — OFL, 브랜드 영문 정본 (REBRAND_BLUE_PLAN §9.6).
            🔴 `wdth`·`ROND` 축을 같이 받아야 한다 — 디스플레이가 wdth 112 · ROND 100 을 쓴다.
            축을 빼면 조용히 기본 폭으로 떨어지고, 그게 "그냥 산세리프" 로 보이는 이유가 된다.
            느림보고딕은 웹에 못 올린다(woff2 셀프호스팅 = 재배포, 닫힌 결정). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wdth,wght,ROND@75..125,300..800,0..100&display=swap"
          rel="stylesheet"
        />
        {/* 판 라벨·수치용 모노 — 인쇄 지시문의 어휘 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
                {/* 국문 폴백 — ONE 모바일 고딕은 웹 배포 불가라 Pretendard(OFL)가 받는다 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* 종이 · 트림 마크 · 눌림 필터 — 페이지 전체가 이 위에 인쇄된다 */}
        <RisoDefs />
        {children}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
