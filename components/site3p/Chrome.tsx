'use client';
/* 페이지 크롬 — 종이·그레인·등록 마크·커서·잉크 진행 바·네비.
   전부 인쇄물의 어휘다: 커서는 등록 마크, 진행 바는 잉크 띠, 네비 라벨은 지금 몇 번째 판인지. */
import { useEffect, useState } from 'react';
import { useLang, useT } from './lang';

export function Defs() {
  return (
    <svg className="defs" aria-hidden="true">
      <filter id="p3-press" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n">
          <animate attributeName="seed" values="4;11;2;9;7;5" dur="1s" calcMode="discrete" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation="0.25" />
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

/* 커서(등록 마크) + 상단 잉크 바. 손가락 기기에선 커서를 숨긴다(CSS). */
export function useChrome() {
  useEffect(() => {
    const cur = document.getElementById('p3-cur');
    const bar = document.getElementById('p3-inkbar');
    const fine = matchMedia('(pointer:fine)').matches;
    const onMove = (e: PointerEvent) => { if (cur) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; } };
    const down = () => cur?.classList.add('down');
    const up = () => cur?.classList.remove('down');
    const over = (e: Event) => { if ((e.target as HTMLElement).closest?.('[data-cur]')) cur?.classList.add('big'); };
    const out = (e: Event) => { if ((e.target as HTMLElement).closest?.('[data-cur]')) cur?.classList.remove('big'); };
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
    return () => {
      removeEventListener('pointermove', onMove); removeEventListener('pointerdown', down); removeEventListener('pointerup', up);
      document.removeEventListener('pointerover', over); document.removeEventListener('pointerout', out);
      removeEventListener('scroll', scroll); sw.disconnect(); one.disconnect();
    };
  }, []);
}

export function Nav() {
  const { t } = useT();
  const { lang, setLang } = useLang();
  const [plate, setPlate] = useState({ no: '00', name: 'nav.cover' });
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      setPlate({ no: el.dataset.plate || '00', name: el.dataset.name || 'nav.cover' });
      document.querySelectorAll('#p3-navlinks a:not(.btn-line)').forEach((a) => {
        a.classList.toggle('on', a.getAttribute('href') === '#' + el.id);
      });
    }), { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('section[data-plate]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const links: [string, string][] = [['#who', 'nav.who'], ['#why', 'nav.why'], ['#what', 'nav.what'], ['#made', 'nav.made'], ['#price', 'nav.price']];
  return (
    <nav>
      <div className="label lab"><span>{t('nav.plate')}</span> <b>{plate.no}</b> / 05 &nbsp;·&nbsp; <b>{t(plate.name)}</b></div>
      <a className="logo" href="#top" data-cur><img src="/riso/logo-red.webp" alt="You Name It" /></a>
      <div className="links" id="p3-navlinks">
        {links.map(([href, k]) => <a key={href} href={href} data-cur>{t(k)}</a>)}
        <a className="btn-line" href="#price" data-cur>{t('nav.buy')}</a>
        <span className="langs">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} data-cur>EN</button>
          <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')} data-cur>KO</button>
        </span>
      </div>
    </nav>
  );
}
