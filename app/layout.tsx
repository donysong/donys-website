import type { Metadata } from 'next';
import './globals.css';
import { COUNTS, PRICE } from '@/lib/product';

export const metadata: Metadata = {
  // 🔴 donys.dev 는 아직 안 붙었다 (2026-09-07 실측: DNS 미해석).
  // 여기를 donys.dev 로 두면 OG/트위터 카드 이미지가 죽은 호스트를 가리킨다.
  // 도메인 붙는 날 이 두 값(metadataBase · openGraph.url)을 같이 옮겨라.
  metadataBase: new URL('https://donys-website.vercel.app'),
  title: 'You Name It — You think it. It builds it.',
  description:
    `An After Effects panel that builds what you describe — ${COUNTS.scripts} scripts, ${COUNTS.motion} motion presets, ${COUNTS.gradients} gradients, a graph editor, expressions, and Claude working on your real layers. ${PRICE} one-time.`,
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
      `Scripts, ${COUNTS.motion} motion presets, gradients, a graph editor & Claude — building what you describe on real layers. ${PRICE} one-time.`,
    type: 'website',
    url: 'https://donys-website.vercel.app',
    images: ['/images/promo/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You Name It — You think it. It builds it.',
    description: `Scripts, motion presets, gradients, a graph editor & Claude built in. ${PRICE}.`,
    images: ['/images/promo/hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Sans Flex — OFL, 브랜드 영문 정본 (REBRAND_BLUE_PLAN §9.6).
            헤드라인 느림보고딕은 웹에도 못 올린다 — woff2 셀프호스팅 = 재배포 (§9.9).
            로고 락업은 이미지로 구운 것이라 그 서체가 거기 살아 있다. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:ROND,wght@0..100,300..800&display=swap"
          rel="stylesheet"
        />
        {/* 국문 폴백 — ONE 모바일 고딕은 웹 배포 불가라 Pretendard(OFL)가 받는다 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
