'use client';
/* 브랜드 루트 `/` — 표지 → 01 만든 것 → 02 우리는 무엇인가 → 03 만드는 사람 → 푸터(Shell).
   🔴 순서가 이 페이지의 유일한 비율 판정이다: **철학은 제품 아래에 온다.**
   레퍼런스 실측 — 브랜드 서사 288단어 vs 제품 70단어인데 스크롤 순서는 제품 5%, 철학 35%.
   단어 수가 아니라 순서가 레버다. 구 사이트는 이걸 거꾸로 하고 있었다.

   🔴 루트는 **구매** CTA 도 레일도 안 가진다(파는 면은 `/ae` 다) — `rail` 프롭을 붙이지 마라.
   다만 네비의 `AE Plugin →` 은 **제품 진입**이지 구매 버튼이 아니다. 레퍼런스 원리 2 가
   *"5% 지점에 벌써 제품이 있다"* 이고 프로토도 이 항목을 갖고 있었다 — 빼지 마라.
   🔴 브랜드 서사는 네비 항목을 안 가진다(레퍼런스도 `/about` 이 없다). 히어로의 스탠스 줄이 `#brand` 로 간다. */
import Page4, { type NavLink } from '@/components/site4/Shell';
import Hero from './Hero';
import Lineup from './Lineup';
import Brand from './Brand';
import Who from './Who';

const LINKS: NavLink[] = [
  { href: '#lineup', k: 'home.nav.lineup' },
  { href: '#brand', k: 'home.nav.brand' },
];

export default function Home() {
  return (
    <Page4 page="home" plateTotal={3} links={LINKS} cta={{ href: '/ae', k: 's.toProduct' }}>
      <Hero />
      <Lineup />
      <Brand />
      <Who />
    </Page4>
  );
}
