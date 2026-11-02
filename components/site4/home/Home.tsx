'use client';
/* 브랜드 루트 `/` — 표지(돌에 이름 붙이기) → 01 영상 → 02 플러그인 → 03 일하는 방식 → 무료 → 04 갓 만든 것 → 끝 한 줄 → 푸터(Shell).
   🔴 철학은 **표지에서 체험으로** 먼저 온다(오너 2026-11-02, 플러그인 repo WEBSITE_RENEWAL_PLAN §18). 구 규칙 *"철학은 제품 아래"* 를 뒤집었다 —
   말로 하는 철학을 위로 올린 게 아니라, 설명 없이 해 보게 하는 표지다.

   🔴 루트는 **구매** CTA 도 레일도 안 가진다(파는 면은 `/ae` 다) — `rail` 프롭을 붙이지 마라.
   다만 네비의 `AE Plugin →` 은 **제품 진입**이지 구매 버튼이 아니다. 레퍼런스 원리 2 가
   *"5% 지점에 벌써 제품이 있다"* 이고 프로토도 이 항목을 갖고 있었다 — 빼지 마라.
   🔴 브랜드 서사는 네비 항목을 안 가진다(레퍼런스도 `/about` 이 없다). 히어로의 스탠스 줄이 `#brand` 로 간다. */
import { useEffect } from 'react';
import Page4, { type NavLink } from '@/components/site4/Shell';
import HeroStone from './HeroStone';
import { Intro, Tiles, FreeCallout, Recent, Films, Outro } from './V5';

/* v5 (2026-10-26) — 구 02 What we are(`Brand.tsx`) · 03 Who makes it(`Who.tsx`) · `Lineup.tsx` 는 판정이 굳을 때까지 파일만 둔다.
   철학은 타일 1(`home.v5.t1`) + 끝 한 줄(`Outro`)로 접혔다(오너 판정 a). */
const LINKS: NavLink[] = [
  { href: '#lineup', k: 'home.nav.lineup' },
  { href: '#how', k: 'home.nav.how' },
];

export default function Home() {
  /* 칸 보기 — `/?grid` 면 16칸 띠를 깔다(site4.css `.show-grid`). 배치를 칸에 맞출 때만 쓴다. */
  useEffect(() => {
    if (new URLSearchParams(location.search).has('grid')) document.querySelector('.p3.p4')?.classList.add('show-grid');
  }, []);
  return (
    <Page4 page="home" plateTotal={4} links={LINKS} cta={{ href: '/ae', k: 's.toProduct' }}>
      <HeroStone />
      <Films />
      <Intro />
      <Tiles />
      <FreeCallout />
      <Recent />
      <Outro />
    </Page4>
  );
}
