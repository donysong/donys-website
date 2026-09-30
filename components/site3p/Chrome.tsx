'use client';
/* 페이지 크롬 — 종이·그레인·등록 마크·커서·잉크 진행 바. 전부 인쇄물의 어휘다:
   커서는 등록 마크, 진행 바는 잉크 띠.
   🔴 네비는 여기 없다 — `components/site4/Shell.tsx` 의 `Nav4` 가 갖는다. 구 `Nav` 는
   판 수·항목이 페이지마다 달라진 §14 분리에서 죽었고, 그게 `lib/copy/v33.ts` 의 마지막 소비자였다. */
import { useEffect } from 'react';
import { penify } from './pen';
import { scrawl } from './scrawl';


export function Defs() {
  return (
    <svg className="defs" aria-hidden="true">
      <filter id="p3-press" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n">
          <animate attributeName="seed" values="4;11;2;9;7;5" dur="1s" calcMode="discrete" repeatCount="indefinite" />
        </feTurbulence>
        {/* 🔴 끝에 `feGaussianBlur` 를 다시 달지 마라 (2026-09-30) — 크롬에선 0.25px 라 안 보이는데 Safari 는
            판 전체를 뭉개서 표제가 초점 나간 사진처럼 읽혔다(WebKit 26 실측, 빼면 크롬은 눈으로 구분 불가). */}
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export function Surface() {
  return (
    <>
      <div className="paper" aria-hidden="true"><div className="fiber" /><div className="roller" /></div>
      <div className="grain tooth" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="reg-mark tl" aria-hidden="true" /><div className="reg-mark tr" aria-hidden="true" />
      <div className="reg-mark bl" aria-hidden="true" /><div className="reg-mark br" aria-hidden="true" />
    </>
  );
}

/* 커서(등록 마크) + 상단 잉크 바. 손가락 기기에선 커서를 숨긴다(CSS).
   🔴 커서는 **첫 움직임 전엔 안 보인다**(`.live`) — 좌표를 모르는 동안 (0,0) 모서리에 박혀 있었다(2026-09-28).
   창 밖으로 나가면 다시 숨는다. */
export function useChrome() {
  useEffect(() => {
    const cur = document.getElementById('p3-cur');
    const bar = document.getElementById('p3-inkbar');
    const fine = matchMedia('(pointer:fine)').matches;
    const onMove = (e: PointerEvent) => {
      if (!cur) return;
      cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; cur.classList.add('live');
    };
    const down = () => cur?.classList.add('down');
    const up = () => cur?.classList.remove('down');
    const over = (e: Event) => { if ((e.target as HTMLElement).closest?.('[data-cur]')) cur?.classList.add('big'); };
    const out = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest?.('[data-cur]')) cur?.classList.remove('big');
      if (!e.relatedTarget) cur?.classList.remove('live');
    };
    const scroll = () => {
      const h = document.documentElement;
      if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    };
    if (fine) {
      addEventListener('pointermove', onMove); addEventListener('pointerdown', down); addEventListener('pointerup', up);
      document.addEventListener('pointerover', over); document.addEventListener('pointerout', out);
    }
    addEventListener('scroll', scroll, { passive: true });
    /* 판 등록 — 뷰포트에 들어오면 밑판이 4칸에서 1칸으로 앉는다(--m) */
    const sw = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); sw.unobserve(en.target); }
    }), { threshold: 0.2 });
    document.querySelectorAll('.sweep').forEach((el) => sw.observe(el));
    const one = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { (en.target as HTMLElement).style.setProperty('--m', '1'); one.unobserve(en.target); }
    }), { threshold: 0.3 });
    document.querySelectorAll('.sweep-one').forEach((el) => { (el as HTMLElement).style.setProperty('--m', '4'); one.observe(el); });
    /* 빨간 펜 — 밑줄 자리에 손그림 획을 붙인다(pen.ts). 긋는 조건은 CSS 가 쥔다. */
    const stopPen = penify();
    /* 빈 바탕을 끌면 빨간 펜으로 긋는다(scrawl.ts) — 데스크톱만, 글자·링크는 안 뺏는다. */
    const stopScrawl = scrawl();
    return () => {
      removeEventListener('pointermove', onMove); removeEventListener('pointerdown', down); removeEventListener('pointerup', up);
      document.removeEventListener('pointerover', over); document.removeEventListener('pointerout', out);
      removeEventListener('scroll', scroll); sw.disconnect(); one.disconnect(); stopPen(); stopScrawl();
    };
  }, []);
}
