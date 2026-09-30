'use client';
/* 타자기 문장 — 뷰포트에 들어오면 한 글자씩. [[말]] = 빨간 펜 동그라미 · __말__ = 빨간 펜 밑줄.
   획은 타이핑이 끝나면(`.done`) 그어진다. 모양은 `pen.ts` 한 곳이 준다.
   🔴 HTML 태그는 통째로 붙인다(한 글자씩 흘리면 태그가 화면에 보인다).
   🔴 자리는 **다 친 문장**이 미리 잡는다(`.ghost` — 투명 글자, 스크린리더는 이걸 읽는다). 타이핑은 그 위 겹판(`.live`)에서만
   일어난다 — 구판은 빈 칸에서 치기 시작해 둘째 줄로 넘어가는 순간 블록이 27px 커지며 밑을 밀었다(폰 홈 CLS 0.145, 2026-09-30).
   서버 HTML 에도 다 친 문장이 들어간다(JS 없이도 읽힌다). */
import { useEffect, useRef } from 'react';
import { useT } from './lang';
import { penSVG } from './pen';

export function typedHTML(s: string) {
  return s
    .replace(/\[\[(.+?)\]\]/g, (_m, w) => `<span class="circle">${w}${penSVG('circle', w)}</span>`)
    .replace(/__(.+?)__/g, (_m, w) => `<span class="ul">${w}${penSVG('ul', w)}</span>`);
}

export default function Typed({ k, className = '', style }: { k: string; className?: string; style?: React.CSSProperties }) {
  const { t, lang } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const html = typedHTML(t(k));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.classList.remove('done');
    el.innerHTML = `<span class="ghost">${html}</span><span class="live" aria-hidden="true"><span class="t"></span><i class="caret"></i></span>`;
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
  return <div ref={ref} className={`typed ${className}`} style={style} data-cur dangerouslySetInnerHTML={{ __html: html }} />;
}
