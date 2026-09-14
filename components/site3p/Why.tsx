'use client';
/* 02 Why — 문제는 아이디어가 아니라 **손**이다. 루프 3(Repeat → Delay → Starve) + 하루 슬라이더 + 잡일 마키.
   🔴 하루 슬라이더 비율은 설명용이고 그렇게 적어 둔다 — 시간 수치는 주장하지 않는다(정직성 가드 §12.6). */
import { useEffect, useRef } from 'react';
import { useT } from './lang';
import { Plate3 } from './Plate3';
import Typed from './Typed';

const CHORES: [string, number][] = [['d.null', 2], ['d.ease', 2], ['d.idea', 1], ['d.rename', 2], ['d.stagger', 2], ['d.fix', 1.5], ['d.idea', 1], ['d.precomp', 2], ['d.render', 2]];
const AFTER: [string, number][] = [['d.say', 0.7], ['d.plan', 3], ['d.say', 0.7], ['d.plan', 3], ['d.press', 0.7], ['d.plan', 3], ['d.say', 0.7], ['d.done', 2.5]];

export default function Why() {
  const { t, list } = useT();
  const day = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const d = day.current, st = strip.current; if (!d || !st) return;
    d.style.setProperty('--x', '38%');
    const setX = (cx: number) => {
      const r = st.getBoundingClientRect();
      const p = Math.max(4, Math.min(96, (cx - r.left) / r.width * 100));
      d.style.setProperty('--x', p + '%');
    };
    const down = (e: PointerEvent) => { dragging.current = true; st.setPointerCapture(e.pointerId); setX(e.clientX); };
    const move = (e: PointerEvent) => { if (dragging.current) setX(e.clientX); };
    const up = () => { dragging.current = false; };
    st.addEventListener('pointerdown', down); st.addEventListener('pointermove', move);
    st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
    /* 뷰포트에 들어오면 한 번 시연한다 — 끌라고 써 두기만 하면 아무도 안 끈다 */
    let raf = 0;
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const t0 = performance.now();
      const anim = () => {
        const tt = Math.min(1, (performance.now() - t0) / 1400);
        const e = 1 - Math.pow(1 - tt, 3);
        if (!dragging.current) d.style.setProperty('--x', (38 + e * 24) + '%');
        if (tt < 1) raf = requestAnimationFrame(anim);
      };
      raf = requestAnimationFrame(anim);
      io.disconnect();
    }), { threshold: 0.5 });
    io.observe(d);
    return () => {
      st.removeEventListener('pointerdown', down); st.removeEventListener('pointermove', move);
      st.removeEventListener('pointerup', up); st.removeEventListener('pointercancel', up);
      io.disconnect(); cancelAnimationFrame(raf);
    };
  }, []);

  const loop = [['01', 'l1', 'l.so'], ['02', 'l2', 'l.so'], ['03', 'l3', 'l.again']];
  return (
    <>
      <section className="sec" id="why" data-plate="02" data-name="nav.why" style={{ paddingBottom: 40 }}>
        <div className="sec-head">
          <div className="no lab"><img src="/riso/stones/stone-4.webp" alt="" />02 &nbsp;·&nbsp; <span>{t('nav.why')}</span></div>
          <h2><Plate3 k="why.h2" black reg press={false} boil={false} /></h2>
          <div className="tag">{t('why.tag')}</div>
        </div>
        <div className="why-top">
          <div>
            <p className="claim disp"><span>{t('why.c1')}</span> <Plate3 k="why.c2" block /></p>
            <Typed k="why.typed" style={{ maxWidth: '48ch' }} />
          </div>
          {/* 🔴 배너의 시지프스 크롭은 공개 사이트로 못 옮긴다(신문 클리핑 원문이 읽힌다) — 같은 말을 하는 우리 재료로 간다: 같은 돌, 매일 */}
          <div className="clip sisy sweep-one" data-cur>
            <div className="art"><img src="/riso/stones/stone-2.webp" alt="" /></div>
            <div className="cap"><span>{t('why.sisy')}</span><span>↻</span></div>
          </div>
        </div>
        <div className="loop sweep">
          {loop.map(([n, k, arrow]) => (
            <div className="clip" key={n} data-cur>
              <span className="no">{n}</span>
              <h3>{t(`${k}.h`)}</h3>
              <p>{t(`${k}.p`)}</p>
              <span className="arrow">{t(arrow)}</span>
            </div>
          ))}
        </div>
        <div className="day" ref={day}>
          <div className="labels lab">
            <span>{t('day.l')}</span>
            <span><b>{t('day.drag')}</b> {t('day.h')}</span>
            <span>{t('day.r')}</span>
          </div>
          <div className="strip sheet" ref={strip}>
            <div className="row before">
              {CHORES.map(([k, w], idx) => (
                <span key={idx} className={k === 'd.idea' ? 'idea' : 'chore'} style={{ ['--w' as string]: w }}>{t(k)}</span>
              ))}
            </div>
            <div className="row after">
              {AFTER.map(([k, w], idx) => (
                <span key={idx} className={k === 'd.say' || k === 'd.press' ? 'say' : 'idea'} style={{ ['--w' as string]: w }}>{t(k)}</span>
              ))}
            </div>
            <div className="handle" aria-hidden="true" />
          </div>
          <div className="foot"><span>{t('day.f1')}</span><span>{t('day.f2')}</span><span>{t('day.f3')}</span></div>
        </div>
      </section>
      <Marquee id="mq1" />
      <Marquee id="mq2" rev />
    </>
  );
}

function Marquee({ id, rev = false }: { id: string; rev?: boolean }) {
  const { list } = useT();
  const items = list(id);
  return (
    <div className={`marquee lines${rev ? ' rev' : ''}`} aria-hidden="true">
      <div className="track">{[...items, ...items].map((x, i) => <span key={i}>{x}</span>)}</div>
    </div>
  );
}
