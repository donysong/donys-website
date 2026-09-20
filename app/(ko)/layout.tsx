/* 🔴 **루트 레이아웃이 둘이다** (라우트 그룹, 2026-09-19).
   정적 export 에서 `<html lang>` 은 루트 레이아웃만 정할 수 있고 페이지가 못 바꾼다.
   국문 면 3장이 `lang="en"` 으로 구워지고 있었다 — hreflang 은 맞는데 문서가 스스로
   영어라고 선언하니 크롤러도 스크린리더도 틀린 값을 읽었다.
   그래서 `(en)` / `(ko)` 로 갈랐다. 괄호 그룹이라 **URL 에는 안 나온다.**
   🔴 `app/layout.tsx` 를 되살리지 마라 — 그게 있으면 그룹 레이아웃이 루트가 아니게 되고
   `<html lang>` 이 다시 하나로 고정된다. */
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../site3p.css';
import '../site4.css';   // 🔴 §14 분리본(`/` · `/ae` · `/ae/docs`)의 신규 컴포넌트. site3p.css 위에 얹힌다 — 순서를 바꾸지 마라
import SiteHtml from '@/components/shell/SiteHtml';
import { SITE } from '@/lib/product';

/* 🔴 **루트 metadata 는 이제 브랜드다** (§14 분리, 2026-09-19).
   전에는 여기에 제품 문장("An After Effects panel that…")이 박혀 있었고, 하위 페이지가 그걸
   상속했다. 분리 뒤로 제품 문장의 자리는 `/ae` 하나다 — 여기 다시 내리지 마라.
   페이지별 title·description·canonical·OG 는 각 page.tsx 가 선언한다. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'You Name It — 창작하는 사람의 도구와 콘텐츠',
    template: '%s — You Name It',
  },
  description:
    '창작하는 사람의 손을 더는 도구와 콘텐츠를 만듭니다. 영상·도구·글 — 매체는 안 가립니다.',
  keywords: [
    'You Name It',
    'After Effects plugin',
    'motion design tools',
    'creative studio',
    'AE panel',
  ],
  openGraph: {
    title: 'You Name It — 창작하는 사람의 도구와 콘텐츠',
    description:
      '창작하는 사람의 손을 더는 도구와 콘텐츠를 만듭니다. 우리가 먼저 쓰는 것만 팝니다.',
    type: 'website',
    url: SITE,
    siteName: 'You Name It',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    // 이 파일이 없으면 OG 카드가 빈다 — public/images/promo/og.png 존재 확인
    images: [
      { url: '/images/promo/og.png', width: 1200, height: 630, alt: 'You Name It' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You Name It — 창작하는 사람의 도구와 콘텐츠',
    description: '창작하는 사람의 손을 더는 도구와 콘텐츠를 만듭니다.',
    images: ['/images/promo/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

/* 🔴 themeColor 는 metadata 가 아니라 viewport export 에 있어야 한다 — metadata 에 두면
   Next 16 이 무시하고 경고만 남긴다(빌드는 통과하므로 조용히 죽는다).
   브라우저 크롬도 종이색을 쓴다: 사이트가 검정이 아니라 파란 인쇄물이라는 첫 신호다. */
export const viewport: Viewport = { themeColor: '#1f9be3' };

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <SiteHtml lang="ko">{children}</SiteHtml>;
}
