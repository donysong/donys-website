/* 🔴 `<html>`·`<head>`·`<body>` 한 벌 — **루트 레이아웃이 둘이라서** 여기로 뽑았다.
   정적 export 에서 `<html lang>` 은 루트 레이아웃이 정하고 페이지가 못 바꾼다. 그래서
   `app/(en)/layout.tsx` 와 `app/(ko)/layout.tsx` 로 갈랐고, 둘이 이 컴포넌트를 공유한다.
   🔴 국문 면이 `lang="en"` 으로 구워지던 것이 이걸 만든 이유다 — hreflang 은 맞는데
   문서 자체가 영어라고 선언하면 크롤러와 스크린리더가 둘 다 틀린 값을 읽는다.
   🔴 여기엔 **제3자 스크립트·폰트 링크가 없다** (2026-09-30). 폰트는 `fonts.ts` 가 우리 도메인에서 굽고,
   구 Google Analytics 경로(`NEXT_PUBLIC_GA_ID`, 한 번도 켜진 적 없음)는 지웠다 — 켜는 순간 쿠키가 생겨
   개인정보 처리방침의 "쿠키를 설치하지 않습니다"(국문 제10조)가 거짓이 된다. 분석은 Cloudflare Web Analytics 하나다. */
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import RisoDefs from '@/components/RisoDefs';
import { googleSansFlex } from './fonts';

export default function SiteHtml({ lang, children }: { lang: 'en' | 'ko'; children: React.ReactNode }) {
  return (
    <html lang={lang} className={googleSansFlex.variable}>
      <body>
        {/* 종이 · 트림 마크 · 눌림 필터 — 페이지 전체가 이 위에 인쇄된다 */}
        <RisoDefs />
        {children}
      </body>
    </html>
  );
}
