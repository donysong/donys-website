'use client';
/* 제품 히어로 — 워드마크 → 약속문 → 호스트·버전 → 데모 판 교대 → 원 2개 → 도장 4.
   🔴 `$49.99` 원은 **체크아웃으로 간다**(프로토는 `#price` 로 갔고, 가격 섹션엔 버튼이 없어서
   거기서 길이 끊겼다). 오른쪽 원은 **이미 산 사람**의 자리 — Docs 의 설치 안내로 간다.
   두 원 = *아직 안 샀다 → 구매* / *샀다 → 설치*. 그게 둘이 나란한 이유다.
   🔴 약속문은 락업 **아래**다(2026-09-26). 전엔 14px 링크색으로 락업 위에 떠서 페이지의 유일한
   약속이 제일 작은 글자였다. 락업 비율(브랜드 작게 / 제품 크게, §14.3)은 안 건드렸다.
   🔴 도장에 `AE 2022+` · `Windows · macOS` 를 다시 넣지 마라 — 바로 위 호스트 줄이 같은 말을 한다.
   🔴 판 교대는 크로스페이드가 아니라 **갈아끼우기**다(하우스 위글 원리) — 2.6초, 호버하면 멈춘다.
   히어로는 2× 스틸 한 장이다(시트 아님). 움직임이 필요한 자리는 후킹 카드가 받는다. */
import { useEffect, useRef, useState } from 'react';
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { useHref } from '@/components/site4/Shell';
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
  const href = useHref();
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
      <h1 className="disp">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="ae.hero.plugin" />
      </h1>
      <p className="promise">{t('ae.hero.promise')}</p>
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
          <a className="circ line" href={href('/ae/docs#install')} data-cur>
            <span><b>{t('ae.hero.install')}</b><small>{t('ae.hero.install.note')}</small></span>
          </a>
          <a className="undercirc" href="#faq" data-cur>{t('ae.hero.faq')}</a>
        </div>
      </div>

      <div className="metas">
        {['ae.meta.once', 'ae.meta.two', 'ae.meta.refund'].map((k) => (
          <span className="stamp black" key={k}><span className="dot" />{t(k)}</span>
        ))}
        <span className="stamp red"><span className="dot" />{t('ae.meta.chat')}</span>
      </div>
    </header>
  );
}
