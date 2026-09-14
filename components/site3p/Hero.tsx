'use client';
/* 히어로 — 3P 요약. 돌은 같고 **마크만 갈아끼운다**(6fps steps, 페이드 없음) = You name it.
   판정 근거 = 플랜 §12.4. 호버하면 멈추고, 마크를 누르면 그걸로 고정한다. */
import { useEffect, useRef, useState } from 'react';
import { useT } from './lang';
import { Plate3 } from './Plate3';
import Typed from './Typed';

/* 돌 7종과 그 위의 마크. 같은 돌에 다른 이름 — 배너의 "A stone becomes a story" 를 그대로 옮긴 것이다. */
const STONES = [
  { src: '/riso/stones/stone-3.webp', mark: 'I' },
  { src: '/riso/stones/stone-4.webp', mark: '#' },
  { src: '/riso/stones/stone-5.webp', mark: '*' },
  { src: '/riso/stones/stone-6.webp', mark: ';' },
  { src: '/riso/stones/stone-7.webp', mark: '!' },
  { src: '/riso/stones/stone-1.webp', mark: 'I' },
  { src: '/riso/stones/stone-2.webp', mark: 'I' },
];
const ORDER = ['I', '#', '*', ';', '!'];

export default function Hero() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const hold = useRef(false);
  const stone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!hold.current) setI((k) => (k + 1) % STONES.length); }, 900);
    return () => clearInterval(id);
  }, []);

  const tilt = (e: React.MouseEvent) => {
    const el = stone.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };
  const pick = (mark: string) => {
    const k = STONES.findIndex((s) => s.mark === mark);
    if (k >= 0) { setI(k); hold.current = true; setTimeout(() => { hold.current = false; }, 2500); }
  };

  return (
    <section className="hero" id="top">
      <div>
        <span className="stamp black press" onClick={(e) => { const s = e.currentTarget; s.classList.remove('press'); void s.offsetWidth; s.classList.add('press'); }}>
          <span className="dot" /><span dangerouslySetInnerHTML={{ __html: t('hero.stamp') }} />
        </span>
        <h1>
          <Plate3 k="hero.h1a" />
          <Plate3 k="hero.h1b" />
          {t('hero.h1c') ? <Plate3 k="hero.h1c" /> : null}
        </h1>
        <p className="sub" dangerouslySetInnerHTML={{ __html: t('hero.sub') }} />
        <div className="ctas">
          <a className="buy" href="#price" data-cur>{t('hero.cta')}</a>
          <a className="watch" href="#what" data-cur>{t('hero.try')}</a>
        </div>
        <div className="meta lab">
          <span>{t('meta.once')}</span><span className="sep" /><span>AE 2022+</span>
          <span className="sep" /><span>{t('meta.two')}</span><span className="sep" /><span>{t('meta.refund')}</span>
        </div>
        <Typed k="hero.typed" />
      </div>

      <div className="stone-wrap boil">
        <div className="sticky stone-note" data-cur>
          <div className="stone" ref={stone} aria-label="A stone, renamed"
               onMouseEnter={() => { hold.current = true; }}
               onMouseLeave={() => { hold.current = false; if (stone.current) stone.current.style.transform = ''; }}
               onMouseMove={tilt}>
            {STONES.map((s, k) => (
              <img key={s.src} src={s.src} alt="" className={k === i ? 'on' : ''} />
            ))}
          </div>
          <div className="stone-cap lab">
            <span>Fig. 0 — <b>{t('hero.fig')}</b></span>
            <span className="marks">
              {ORDER.map((m) => (
                <button key={m} className={STONES[i].mark === m ? 'on' : ''} onClick={() => pick(m)} data-cur>{m}</button>
              ))}
            </span>
          </div>
          <div className="ticks" aria-hidden="true">
            {STONES.map((s, k) => <i key={k} className={k === i ? 'on' : ''} />)}
          </div>
          <Typed k="hero.note" />
        </div>
      </div>
    </section>
  );
}
