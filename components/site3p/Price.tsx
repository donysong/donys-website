'use client';
/* 05 Price — 한 번 사면 계속 네 것. 구독 열에 손을 올리면 달이 계속 올라간다(그게 구독이다). */
import { useEffect, useRef, useState } from 'react';
import { useT } from './lang';
import { Plate3 } from './Plate3';
import { PRICE, CHECKOUT_URL } from '@/lib/product';

export default function Price() {
  const { t, lang } = useT();
  const [months, setMonths] = useState(1);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  const monthLabel = (x: number) => (lang === 'ko' ? `${x}${t('vs.month')}` : `${t('vs.month')} ${x}`);
  const faq = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];

  return (
    <section className="sec" id="price" data-plate="05" data-name="nav.price">
      <div className="sec-head">
        <div className="no lab"><img src="/riso/stones/stone-1.webp" alt="" />05 &nbsp;·&nbsp; <span>{t('nav.price')}</span></div>
        <h2><Plate3 k="price.h2" black reg press={false} boil={false} /></h2>
        <div className="tag">{t('price.tag')}</div>
      </div>
      <div className="pricing">
        <div className="sheet price-sheet tape sweep-one" data-cur>
          <div className="stampzone"><span className="stamp red big">{t('price.stamp')}</span></div>
          <div className="lab" style={{ color: '#444' }}>You Name It · <span>{t('price.kind')}</span></div>
          <div className="price">{PRICE}<small>{t('price.once')}</small></div>
          <h3>{t('price.h3')}</h3>
          <ul>
            <li><span>{t('pl1')}</span><span>{t('pl1b')}</span></li>
            <li><span>Toolbox · Motion · Text · Gradient · Graph · Expression</span><span>{t('pl2b')}</span></li>
            <li><span>Windows &amp; macOS · AE 2022+</span><span>{t('pl3b')}</span></li>
            <li><span>{t('pl4')}</span><span>{t('pl4b')}</span></li>
            <li><span>{t('pl5')}</span><span>{t('pl5b')}</span></li>
          </ul>
          <a className="buy" href={CHECKOUT_URL} data-cur>{t('price.buy')}</a>
          <div className="fine">{t('price.fine')}</div>
        </div>
        <div className="aside">
          <h3 className="disp">{t('aside.h')}</h3>
          <p>{t('aside.p')}</p>
          <div className="vs">
            <div>
              <b className="red">{t('vs.once')}</b><p>{t('vs.once.p')}</p>
              <div className="tick"><span>{t('vs.paid')}</span> · <b>{monthLabel(1)}</b> · <span>{t('vs.done')}</span></div>
            </div>
            <div data-cur
                 onMouseEnter={() => { timer.current = window.setInterval(() => setMonths((m) => m + 1), 350); }}
                 onMouseLeave={() => { if (timer.current) clearInterval(timer.current); }}>
              <b>{t('vs.sub')}</b><p>{t('vs.sub.p')}</p>
              <div className="tick"><span>{t('vs.still')}</span> · <b>{monthLabel(months)}</b> <span style={{ opacity: .6 }}>{t('vs.hover')}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq">
        {faq.map((f, i) => (
          <details key={f} open={i === 0}>
            <summary data-cur><span className="n">{String(i + 1).padStart(2, '0')}</span><span>{t(`${f}.q`)}</span><span className="pm">+</span></summary>
            <div className="a">{t(`${f}.a`)}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
