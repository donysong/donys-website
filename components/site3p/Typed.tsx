'use client';
/* 타자기 문장 — 뷰포트에 들어오면 한 글자씩. [[말]] = 동그라미가 그려진다 · __말__ = 밑줄.
   🔴 HTML 태그는 통째로 붙인다(한 글자씩 흘리면 태그가 화면에 보인다). */
import { useEffect, useRef } from 'react';
import { useT } from './lang';

const CIRCLE = '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M12 30 C 10 8, 90 4, 92 26 S 70 58, 30 54 S 4 44, 14 24" pathLength="1"/></svg>';
export function typedHTML(s: string) {
  return s
    .replace(/\[\[(.+?)\]\]/g, (_m, w) => `<span class="circle">${w}${CIRCLE}</span>`)
    .replace(/__(.+?)__/g, (_m, w) => `<span class="ul">${w}</span>`);
}

export default function Typed({ k, className = '', style }: { k: string; className?: string; style?: React.CSSProperties }) {
  const { t, lang } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const html = typedHTML(t(k));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.classList.remove('done');
    el.innerHTML = '<span class="t"></span><i class="caret"></i>';
    let timer: number | undefined;
    const run = () => {
      const target = el.querySelector('.t') as HTMLElement | null; if (!target) return;
      let out = '', i = 0;
      const step = () => {
        if (i >= html.length) { el.innerHTML = html; el.classList.add('done'); return; }
        if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; }
        else { out += html[i++]; }
        target.innerHTML = out;
        timer = window.setTimeout(step, reduce ? 0 : 28);
      };
      step();
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearTimeout(timer); };
  }, [html, lang]);
  return <div ref={ref} className={`typed ${className}`} style={style} data-cur />;
}
