'use client';
/* 제품 히어로 — 아이브로 → 워드마크 → 데모 판 교대 → 원 2개 → 도장 6.
   🔴 `$49.99` 원은 **체크아웃으로 간다**(프로토는 `#price` 로 갔고, 가격 섹션엔 버튼이 없어서
   거기서 길이 끊겼다). `설치` 원만 `#specs` 로 간다.
   🔴 판 교대는 크로스페이드가 아니라 **갈아끼우기**다(하우스 위글 원리) — 2.6초, 호버하면 멈춘다.
   히어로는 2× 스틸 한 장이다(시트 아님). 움직임이 필요한 자리는 후킹 카드가 받는다. */
import { useEffect, useRef, useState } from 'react';
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { CHECKOUT_URL, PRICE } from '@/lib/product';

/* 툴 이름은 패널 정본이라 국문에서도 영문이다. */
const ROT = [
  { id: 'bentoGrid', name: 'Bento Grid' },
  { id: 'carouselRig', name: 'Carousel' },
  { id: 'writeOn', name: 'Write On' },
  { id: 'proximityRig', name: 'Effector' },
  { id: 'shadowCaster', name: 'Master Shadow' },
];

export default function Hero() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const held = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (held.current || document.hidden) return;
      setI((n) => (n + 1) % ROT.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="phero">
      <span className="eyebrow">{t('ae.hero.eyebrow')}</span>
      <h1 className="disp">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="ae.hero.plugin" />
      </h1>
      <p className="lab lc" style={{ opacity: 0.7 }}>{t('ae.hero.sub')}</p>

      <div className="pstage">
        <div className="side">
          <a className="circ fill" href={CHECKOUT_URL} data-cur>
            <span><b>{PRICE}</b><small>{t('ae.hero.buy.note')}</small></span>
          </a>
          <a className="undercirc" href="#specs" data-cur>{t('ae.hero.specs')}</a>
        </div>

        <figure className="demo">
          <div
            className="rotator"
            onPointerEnter={() => { held.current = true; }}
            onPointerLeave={() => { held.current = false; }}
          >
            {ROT.map((r, n) => (
              <div className={`slide${n === i ? ' on' : ''}`} key={r.id}>
                <figure className="spot-fig">
                  <img src={`/riso/spots/still/${r.id}.webp`} alt={r.name} />
                </figure>
              </div>
            ))}
            <div className="rot-tag">
              <span className="slug">{ROT[i].name}</span>
              <span style={{ opacity: 0.6, fontWeight: 600 }}>{t('ae.hero.rot.tag')}</span>
            </div>
            <div className="rot-ticks" aria-hidden="true">
              {ROT.map((r, n) => <i className={n === i ? 'on' : ''} key={r.id} />)}
            </div>
          </div>
          <figcaption className="cap" style={{ marginTop: 46 }}><Html k="ae.hero.cap" /></figcaption>
        </figure>

        <div className="side">
          <a className="circ line" href="#specs" data-cur>
            <span><b>{t('ae.hero.install')}</b><small>{t('ae.hero.install.note')}</small></span>
          </a>
          <a className="undercirc" href="#faq" data-cur>{t('ae.hero.faq')}</a>
        </div>
      </div>

      <div className="metas">
        {['ae.meta.once', 'ae.meta.two', 'ae.meta.refund', 'ae.meta.ae', 'ae.meta.os'].map((k) => (
          <span className="stamp black" key={k}><span className="dot" />{t(k)}</span>
        ))}
        <span className="stamp red"><span className="dot" />{t('ae.meta.chat')}</span>
      </div>
    </header>
  );
}
