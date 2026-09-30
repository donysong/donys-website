'use client';
/* 00 표지 — 태그라인 2줄, 그게 전부다 (레퍼런스는 14단어).
   🔴 `id="top"` 을 여기 달지 마라 — `Shell.tsx` 의 루트 div 가 이미 그 앵커를 들고 있다.
   스탠스 줄(타자기)이 브랜드 서사(#brand)로 가는 유일한 링크다 — 네비 항목이 아니라 문장이다. */
import { Plate3 } from '@/components/site3p/Plate3';
import { useEffect, useRef } from 'react';
import Typed, { typedHTML } from '@/components/site3p/Typed';
import { Html, useT } from '@/components/site3p/lang';

/* 고무 스탬프 — 누르면 다시 찍힌다(proto4.js 와 같은 동작). 처음엔 안 찍는다. */
export function rePress(e: React.MouseEvent<HTMLSpanElement>) {
  const s = e.currentTarget;
  s.classList.remove('press');
  void s.offsetWidth;
  s.classList.add('press');
}

export default function Hero() {
  const { t } = useT();
  return (
    <header className="hero">
      <div>
        <span className="stamp black" onClick={rePress}><span className="dot" />{t('home.hero.stamp')}</span>
        {/* 🔴 `{' '}` 를 지우지 마라 — JSX 는 두 엘리먼트 사이의 **줄바꿈 공백을 없앤다**.
            `.pl` 은 inline-block 이라 공백이 사라지면 "뭐든말만 해." 로 붙는다(프로토 HTML 은 공백이 있다).
            같은 함정이 `components/site3p/Hero.tsx` 에 이미 걸려 있다 — 거기선 줄이 어차피 넘쳐서 안 보일 뿐이다. */}
        <h1 className="disp">
          <Plate3 k="home.hero.h1a" />{' '}
          <Plate3 k="home.hero.h1b" />
        </h1>
        <Html k="home.hero.sub" as="p" className="sub" />
        <a className="typed-link" href="#brand" data-cur>
          <Typed k="home.hero.typed" />
        </a>
      </div>
      <StoneCard />
    </header>
  );
}

/* 돌 카드 — 2026-09-30 오너 레퍼런스(`doru (0;00;00;00) 1.png`)를 **부품으로** 다시 지었다(이미지 통짜 금지 — 오너).
   모눈 종이(CSS) · 타자기 두 줄(웹폰트) · 빨간 펜 동그라미·밑줄(`pen.ts` — 사이트의 모든 빨간 선과 같은 획) ·
   `!` 돌(`stone-7`) · 접혀 올라간 모서리와 그 밑의 빨간 종이(clip-path). 접힌 날개 = 잘린 삼각형을 접는 선에 대해 뒤집은 것 —
   꼭짓점 계산은 site4.css `.stone-card` 주석. 펜은 표지 타자기가 다 칠 즈음 그어진다(한 순간으로 묶는다). */
function StoneCard() {
  const { t, lang } = useT();
  const cap = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = cap.current; if (!el) return;
    el.classList.remove('done');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => el.classList.add('done'), reduce ? 0 : 1900);
    return () => clearTimeout(id);
  }, [lang]);
  return (
    <figure className="stone-card">
      <span className="sc-under" aria-hidden="true" />
      <span className="sc-paper" aria-hidden="true" />
      <figcaption ref={cap} className="typed">
        <span className="sc-l1" dangerouslySetInnerHTML={{ __html: typedHTML(t('home.hero.fig1')) }} />
        <span className="sc-l2" dangerouslySetInnerHTML={{ __html: typedHTML(t('home.hero.fig2')) }} />
      </figcaption>
      <img className="sc-rock" src="/riso/stones/stone-7.webp" alt="" width={720} height={704} />
      <span className="sc-flap" aria-hidden="true" />
    </figure>
  );
}
