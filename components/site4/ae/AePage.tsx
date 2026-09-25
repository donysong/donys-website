'use client';
/* `/ae` — 제품 페이지. 정본 = 정적 프로토 `proto4/ae.html` (플러그인 repo research/website-2026-09).
   판 순서 = 인쇄 순서: 표지(히어로) → 01 누구를 → 02 무엇인가 → 03 기능 → 04 새 기능 →
   05 가격 → 06 FAQ → 사양.
   🔴 구 `07 다음 것`(*"Untitled, still"*)은 2026-09-26 에 뺐다 — 브랜드 서사 0 규칙(아래 ①) 위반이었고
   구매자에게 그 자리에 있을 이유가 없었다. 라인업의 빈 행은 브랜드 루트(`/`)가 갖는다.
   🔴 설치 순서는 이 페이지에 없다 — 읽는 면(`/ae/docs#install`)이 갖고, 히어로 원·FAQ·사양표가 거기로 보낸다.

   🔴 이 페이지가 지키는 규칙 셋(레퍼런스 battleaxe.co 실측):
     ① 본문에 브랜드 서사 0단어 — 브랜드로 가는 길은 푸터뿐이다(셸이 건다).
     ② 가격 전에 증거 — 기능 5블록 · 후킹 6장 · 도그푸드 · 릴리스가 전부 가격 위에 있다.
     ③ 가격 섹션에 버튼이 없다 — 스티키 레일(45% 점화)이 CTA 를 독점한다.
   🔴 CTA 는 전부 **실제 체크아웃**으로 간다(레일 · 히어로 원 · 네비 버튼). 프로토는 셋 다 `#price`
   였고 그 섹션엔 버튼이 없어서 **팔 수 없는 페이지**였다 — 그 결함을 이식하지 마라. */
import Page4, { type NavLink } from '@/components/site4/Shell';
import { CHECKOUT_URL } from '@/lib/product';
import Hero from './Hero';
import Who from './Who';
import Posi from './Posi';
import Features from './Features';
import News from './News';
import Price from './Price';
import Faq from './Faq';
import Specs from './Specs';

const LINKS: NavLink[] = [
  { href: '#who', k: 'ae.nav.who' },
  { href: '#what', k: 'ae.nav.what' },
  { href: '#price', k: 'ae.nav.price' },
  { href: '#faq', k: 'ae.nav.faq' },
  { href: '/ae/docs', k: 's.docs' },
];

export default function AePage() {
  return (
    <Page4 page="ae" plateTotal={6} rail links={LINKS} cta={{ href: CHECKOUT_URL, k: 's.buy.price' }}>
      <Hero />
      <Who />
      <Posi />
      <Features />
      <News />
      <Price />
      <Faq />
      <Specs />
    </Page4>
  );
}
