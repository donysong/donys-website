'use client';
/* 프로토 v3.3 이식본 — 판 순서 = 인쇄 순서. 표지(히어로) → 01 Who → 02 Why → 03 What → 04 Made by → 05 Price.
   정본 = 플러그인 repo `donys/docs/WEBSITE_RENEWAL_PLAN.md` §12. */
import { useLang } from './lang';
import { Defs, Surface, Nav, useChrome } from './Chrome';
import Hero from './Hero';
import Who from './Who';
import Why from './Why';
import What from './What';
import MadeBy from './MadeBy';
import Price from './Price';
import Footer3P from './Footer3P';

export default function Page3P() {
  const { lang } = useLang();
  useChrome();
  return (
    <div className="p3" data-lang={lang}>
      <Defs />
      <Surface />
      <div className="ink-bar" id="p3-inkbar" aria-hidden="true" />
      <div className="cur" id="p3-cur" aria-hidden="true" />
      <Nav />
      <Hero />
      <Who />
      <Why />
      <What />
      <MadeBy />
      <Price />
      <Footer3P />
    </div>
  );
}
