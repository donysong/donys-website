import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import RisoDefs from '@/components/RisoDefs';
import { COUNTS, PRICE, SITE } from '@/lib/product';

// 정본 = younameit.works (2026-09-09 Cloudflare 이전)

/* 🔴 여기에 `alternates.canonical` 을 두지 마라 — 루트 레이아웃 metadata 는 하위 페이지가
   **상속**한다. `canonical:'/'` 를 두면 /update·/terms·/privacy·/refund 가 전부
   "홈의 중복" 이라고 선언되어 sitemap 이 색인하라 한 페이지를 구글이 뺀다
   (2026-09-09 shadow 빌드 실측: 네 페이지 전부 canonical=홈). canonical 은 페이지마다 선언한다. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'You Name It — You think it. It builds it.',
  description:
    `An After Effects panel that builds what you describe on real, editable layers — ${COUNTS.scripts} scripts, ${COUNTS.motion} motion presets, ${COUNTS.gradients} gradients, a graph editor, expressions, and Claude built in. ${PRICE} one-time.`,
  keywords: [
    'After Effects plugin',
    'motion design',
    'AE scripts',
    'text animation',
    'graph editor',
    'gradient library',
    'AI motion graphics',
    'Claude After Effects',
    'workflow panel',
  ],
  openGraph: {
    title: 'You Name It — You think it. It builds it.',
    description:
      `Describe it, and it lands on real layers with keyframes you can still tear apart. ${COUNTS.scripts} scripts, ${COUNTS.motion} motion presets, gradients, a graph editor & Claude. ${PRICE} one-time.`,
    type: 'website',
    url: SITE,
    siteName: 'You Name It',
    locale: 'en_US',
    // 이 파일이 없으면 OG 카드가 빈다 — public/images/promo/og.png 존재 확인
    images: [
      { url: '/images/promo/og.png', width: 1200, height: 630, alt: 'You Name It — After Effects panel' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You Name It — You think it. It builds it.',
    description: `Describe it. It lands on real layers you can still edit. ${PRICE}, one-time.`,
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
export const viewport: Viewport = {
  themeColor: '#1f9be3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 정적 export(output:'export')라 NEXT_PUBLIC_ 값은 빌드 타임에 번들로 인라인된다.
  // 빌드 환경에 없으면 undefined → GA 태그 자체를 렌더하지 않는다(빈 gaId 금지).
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
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
