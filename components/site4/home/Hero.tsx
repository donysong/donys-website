'use client';
/* 표지 무대(`P1Cover`) · 돌 카드 · 고무 스탬프. 표지 내용 = `HeroStone.tsx`(오너 2026-11-02, §18).

   v5 P1 (2026-10-09 · 플러그인 repo WEBSITE_RENEWAL_PLAN §17.8) — 레퍼런스(mindmarket) 표지 그대로의 구조:
   표지는 한 화면이고, 그 안의 무대(`.p1-stage`)가 **두 화면 높이의 핀**(`.p1-pin`) 안에서 붙어 있다. 그동안 01 판이
   둥근 윗모서리로 올라와 덮고, 스크롤 진행도(`--p`, motion.ts)가 글자를 1→.8 로 줄이고 검정 잉크 막을 0→.4 로 깐다.
   값·조건은 CSS(site4.css `.p1`)가 쥔다 — 1000px 미만·줄인 모션에선 붙지도 줄지도 않는다.
   🔴 `id="top"` 을 표지에 달지 마라 — `Shell.tsx` 의 루트 div 가 이미 그 앵커를 들고 있다. */
import { useEffect, useRef } from 'react';
import { typedHTML } from '@/components/site3p/Typed';
import { useT } from '@/components/site3p/lang';
import { useClearNav, useProgress } from '@/components/site4/motion';

/* 고무 스탬프 — 누르면 다시 찍힌다(proto4.js 와 같은 동작). 처음엔 안 찍는다. */
export function rePress(e: React.MouseEvent<HTMLSpanElement>) {
  const s = e.currentTarget;
  s.classList.remove('press');
  void s.offsetWidth;
  s.classList.add('press');
}

/* 표지 무대 — 핀 · 붙는 무대 · 스크롤 진행도. */
export function P1Cover({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref);
  useClearNav(ref);
  return (
    <header className={['hero p1', className].filter(Boolean).join(' ')} ref={ref}>
      <div className="p1-pin"><div className="p1-stage"><div className="p1-copy">{children}</div></div></div>
    </header>
  );
}

/* 돌 카드 — 2026-09-30 오너 레퍼런스(`doru (0;00;00;00) 1.png`)를 **부품으로** 다시 지었다(이미지 통짜 금지 — 오너).
   모눈 종이(CSS) · 타자기 두 줄(웹폰트) · 빨간 펜 동그라미·밑줄(`pen.ts` — 사이트의 모든 빨간 선과 같은 획) ·
   `!` 돌(`stone-7`) · 접혀 올라간 모서리와 그 밑의 빨간 종이(clip-path). 접힌 날개 = 잘린 삼각형을 접는 선에 대해 뒤집은 것 —
   꼭짓점 계산은 site4.css `.stone-card` 주석. 펜은 표지 타자기가 다 칠 즈음 그어진다(한 순간으로 묶는다).
   v5 — 자리는 01 만든 것(`Lineup.tsx`)이다. 그래서 펜 시계가 **마운트**가 아니라 **진입**에서 돈다(구 1.9s 는 표지 타자기에 맞춘 값이었다 —
   화면 밖에서 이미 그어져 버렸다). 카드 40% 가 보이면 .5s 뒤 긋는다. 언어를 바꾸면 다시 긋는다. */
/* `caption={false}` = 손글씨 두 줄 없이 돌만(홈 v5 01 — 오너 2026-10-26 *"돌 하나가 이야기가 된다 이거 뺄까"*). */
export function StoneCard({ caption = true }: { caption?: boolean } = {}) {
  const { t, lang } = useT();
  const cap = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = cap.current; if (!el) return;
    el.classList.remove('done');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      id = window.setTimeout(() => el.classList.add('done'), reduce ? 0 : 500);
    }, { threshold: 0.4 });
    io.observe(el.closest('figure') ?? el);
    return () => { io.disconnect(); clearTimeout(id); };
  }, [lang]);
  return (
    <figure className="stone-card">
      <span className="sc-under" aria-hidden="true" />
      <span className="sc-paper" aria-hidden="true" />
      {caption ? (
        <figcaption ref={cap} className="typed">
          <span className="sc-l1" dangerouslySetInnerHTML={{ __html: typedHTML(t('home.hero.fig1')) }} />
          <span className="sc-l2" dangerouslySetInnerHTML={{ __html: typedHTML(t('home.hero.fig2')) }} />
        </figcaption>
      ) : null}
      <img className="sc-rock" src="/riso/stones/stone-7.webp" alt="" width={720} height={704} />
      <span className="sc-flap" aria-hidden="true" />
    </figure>
  );
}
