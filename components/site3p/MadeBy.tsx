'use client';
/* 04 Made by — 스탠스 4줄 + 판 놀이터. "정답은 주지 않는다" 를 말이 아니라 **손으로** 보여주는 자리다:
   Y·N·I 판을 직접 끌어 어긋내면 겹친 자리가 제3색이 된다(multiply). */
import { useEffect, useRef } from 'react';
import { useT } from './lang';
import { Plate3 } from './Plate3';
import Typed from './Typed';

const HOME: Record<string, [string, string]> = { red: ['70px', '66px'], blue: ['150px', '84px'], black: ['236px', '70px'] };

export default function MadeBy() {
  const { t } = useT();
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = board.current; if (!b) return;
    const cleanups: (() => void)[] = [];
    b.querySelectorAll<HTMLElement>('.plate').forEach((p) => {
      let off: [number, number] | null = null;
      const down = (e: PointerEvent) => {
        off = [e.clientX - parseFloat(p.style.getPropertyValue('--x')), e.clientY - parseFloat(p.style.getPropertyValue('--y'))];
        p.setPointerCapture(e.pointerId); b.appendChild(p);
      };
      const move = (e: PointerEvent) => {
        if (!off) return;
        const r = b.getBoundingClientRect();
        const x = Math.max(-40, Math.min(r.width - 110, e.clientX - off[0]));
        const y = Math.max(-40, Math.min(r.height - 110, e.clientY - off[1]));
        p.style.setProperty('--x', x + 'px'); p.style.setProperty('--y', y + 'px');
      };
      const up = () => { off = null; };
      p.addEventListener('pointerdown', down); p.addEventListener('pointermove', move);
      p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up);
      cleanups.push(() => { p.removeEventListener('pointerdown', down); p.removeEventListener('pointermove', move); p.removeEventListener('pointerup', up); p.removeEventListener('pointercancel', up); });
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  const register = () => {
    const b = board.current; if (!b) return;
    const ps = b.querySelectorAll<HTMLElement>('.plate');
    ps.forEach((p) => {
      p.style.transition = 'left .46s cubic-bezier(.2,.9,.2,1), top .46s cubic-bezier(.2,.9,.2,1)';
      const tone = p.classList[1] as keyof typeof HOME;
      p.style.setProperty('--x', HOME[tone][0]); p.style.setProperty('--y', HOME[tone][1]);
    });
    setTimeout(() => ps.forEach((p) => { p.style.transition = ''; }), 500);
  };

  return (
    <section className="sec" id="made" data-plate="04" data-name="nav.made">
      <div className="sec-head">
        <div className="no lab"><img src="/riso/stones/stone-7.webp" alt="" />04 &nbsp;·&nbsp; <span>{t('nav.made')}</span></div>
        <h2><Plate3 k="made.h2" black reg press={false} boil={false} /></h2>
        <div className="tag">{t('made.tag')}</div>
      </div>
      <p className="lead" dangerouslySetInnerHTML={{ __html: t('made.lead') }} />
      <div className="stance">
        <div>
          <div className="stance-lines">
            <div><Plate3 k="s1" reg /><span>{t('s1.k')}</span></div>
            <div><Plate3 k="s2" black reg press={false} boil={false} /><span>{t('s2.k')}</span></div>
            <div><Plate3 k="s3" black reg press={false} boil={false} /><span>{t('s3.k')}</span></div>
            <div><Plate3 k="s4" reg /><span>{t('s4.k')}</span></div>
          </div>
          <div className="quotes">
            <Typed k="q.name" /><Typed k="q.meaning" /><Typed k="q.stone" />
          </div>
        </div>
        <div>
          {/* 🔴 배너의 큐브릭 **사진**은 공개 사이트로 못 옮긴다(제3자 촬영물 + 초상). 인용문은 인용이라 남는다 —
              사진 없이 신문 클리핑 조판으로만 싣는다. */}
          <div className="clip kub" data-cur>
            <div className="cap">
              <h3>{t('kub.h')}</h3>
              <small>Kubrick · <span>{t('wall')}</span> · <span>{t('kub.hover')}</span></small>
            </div>
          </div>
          <div className="play">
            <div className="board sheet gridp" ref={board}>
              <div className="plate red" style={{ ['--x' as string]: '70px', ['--y' as string]: '66px' }} data-cur>Y</div>
              <div className="plate blue" style={{ ['--x' as string]: '150px', ['--y' as string]: '84px' }} data-cur>N</div>
              <div className="plate black" style={{ ['--x' as string]: '236px', ['--y' as string]: '70px' }} data-cur>I</div>
            </div>
            <div className="cap">
              <span>Fig. 4 — <b>{t('play.h')}</b> <span>{t('play.p')}</span></span>
              <button onClick={register} data-cur>{t('play.reg')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
