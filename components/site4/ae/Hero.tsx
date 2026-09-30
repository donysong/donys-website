'use client';
/* 제품 히어로 — 워드마크 → 약속문 → 호스트·버전 → 데모 몽타주 → 원 2개 → 도장 4.
   🔴 `$49.99` 원은 **체크아웃으로 간다**(프로토는 `#price` 로 갔고, 가격 섹션엔 버튼이 없어서
   거기서 길이 끊겼다). 오른쪽 원은 **이미 산 사람**의 자리 — Docs 의 설치 안내로 간다.
   두 원 = *아직 안 샀다 → 구매* / *샀다 → 설치*. 그게 둘이 나란한 이유다.
   🔴 약속문은 락업 **아래**다(2026-09-26). 전엔 14px 링크색으로 락업 위에 떠서 페이지의 유일한
   약속이 제일 작은 글자였다. 락업 비율(브랜드 작게 / 제품 크게, §14.3)은 안 건드렸다.
   🔴 도장에 `AE 2022+` · `Windows · macOS` 를 다시 넣지 마라 — 바로 위 호스트 줄이 같은 말을 한다.

   §16-8 (2026-09-28 오너) — 데모 판 = **툴 호버 시트 몽타주 루프**. 구 2× 스틸 판 교대(재인 *"스틸 컷 말고 모션"*)를 갈아냈다.
   재생은 발명하지 않았다: `Spot`(패널 정본 24fps 16f + 홀드 350ms · 쉬는 상태 = 마지막 프레임)을 그대로 쓰고,
   툴마다 `PLAYS` 번 돈 뒤 다음 툴로 **갈아끼운다**(크로스페이드 아님 — 하우스 위글 원리). 넘김 박자는 타이머가 아니라
   시트 애니메이션의 `animationiteration` 이 센다 — 잘리는 자리가 늘 끝 프레임 홀드다.
   화면 밖 · 줄인 모션 설정 = 재생 없음(시트의 마지막 프레임 = 스틸). 호버 = 지금 툴에 머문다.
   ⚠️ 1× 시트(타일 480)를 760 판에 띄우므로 스틸보다 무르다 — 오너가 직접 만든 영상으로 **이 블록째 교체할 자리**다.
   §16-19 — "Made with one button" 은 **처음 한 번만**(첫 툴에서만) 뜬다. */
import { useEffect, useRef, useState } from 'react';
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { Spot } from '@/components/site3p/Spot';
import { useHref } from '@/components/site4/Shell';
import { CHECKOUT_URL, PRICE } from '@/lib/product';

/* 툴 이름은 패널 정본(`lib/docsData.ts` name)이라 국문에서도 영문이다. 시트 = `public/riso/spots/<id>.webp`. */
const REEL = [
  { id: 'bentoGrid', name: 'Bento Grid' },
  { id: 'writeOn', name: 'Write On' },
  { id: 'carouselRig', name: 'Carousel' },
  { id: 'textExploder', name: 'Text Exploder' },
  { id: 'shadowCaster', name: 'Master Shadow' },
  { id: 'proximityRig', name: 'Effector' },
];
const PLAYS = 2;

export default function Hero() {
  const { t } = useT();
  const href = useHref();
  const [i, setI] = useState(0);
  const [first, setFirst] = useState(true);
  const [run, setRun] = useState(false);
  const held = useRef(false);
  const plays = useRef(0);
  const reel = useRef<HTMLDivElement>(null);

  /* 돌리는 조건 = 화면 안 + 모션 허용. 둘 중 하나라도 아니면 시트는 마지막 프레임(스틸)에 선다. */
  useEffect(() => {
    const el = reel.current;
    if (!el) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let seen = false;
    const sync = () => { plays.current = 0; setRun(seen && !still.matches); };
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; sync(); });
    io.observe(el);
    still.addEventListener('change', sync);
    return () => { io.disconnect(); still.removeEventListener('change', sync); };
  }, []);

  const onIteration = (e: React.AnimationEvent) => {
    if (e.animationName !== 'p3-spot-run') return;
    if (held.current || document.hidden) { plays.current = 0; return; }
    if (++plays.current < PLAYS) return;
    plays.current = 0;
    setFirst(false);
    setI((n) => (n + 1) % REEL.length);
  };

  return (
    <header className="phero">
      <h1 className="disp">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="ae.hero.plugin" />
      </h1>
      <p className="promise">{t('ae.hero.promise')}</p>
      <p className="lab lc" style={{ color: 'var(--muted)' }}>{t('ae.hero.sub')}</p>

      <div className="pstage">
        <div className="side">
          <a className="circ fill" href={CHECKOUT_URL} data-cur>
            <span><b>{PRICE}</b><small>{t('ae.hero.buy.note')}</small></span>
          </a>
          <a className="undercirc" href="#specs" data-cur>{t('ae.hero.specs')}</a>
        </div>

        <figure className="demo">
          <div
            ref={reel}
            className={`rotator${run ? ' run' : ''}`}
            onAnimationIteration={onIteration}
            onPointerEnter={() => { held.current = true; }}
            onPointerLeave={() => { held.current = false; }}
          >
            {REEL.map((r, n) => (
              <div className={`slide${n === i ? ' on' : ''}`} key={r.id}>
                <Spot id={r.id} name={r.name} />
              </div>
            ))}
            <div className="rot-tag">
              <span className="slug">{REEL[i].name}</span>
              {first ? <span style={{ color: 'var(--muted)', fontWeight: 600 }}>{t('ae.hero.rot.tag')}</span> : null}
            </div>
            <div className="rot-ticks" aria-hidden="true">
              {REEL.map((r, n) => <i className={n === i ? 'on' : ''} key={r.id} />)}
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
