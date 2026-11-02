'use client';
/* 표지 — 돌에 이름 붙이기 (오너 2026-11-02 *"AB 합치자"*, 플러그인 repo WEBSITE_RENEWAL_PLAN §18).
   낙서 → 손을 떼면 돌이 살아남 → 손잡이 하나로 성격 → `IT` 자리에 이름을 쳐 넣고 Enter → 찍힘.
   역할 경계: 무엇을(그림 · 성격 · 이름) = 방문자, 어떻게(보간 · 떨림 · 잉크) = 도구.

   모션 값은 하우스다 — 돌 떨림 = `wiggle(3,3)` 을 6fps 로 끊은 것(typo-kit), 낙서 떨림 = 같은 박자의 라인 보일,
   튀어오름만 12fps(6fps 면 통통 쪽 한 번에 4프레임이라 모양이 안 읽힌다).
   이름은 진짜 `<input>` 이 받고(모바일 키보드 · 한글 조합) 판이 그대로 비춘다 — 입력값이라 innerHTML 을 안 쓴다.
   한계: 저장·공유 없음, 새로고침하면 사라진다. 공유 주소를 붙이면 우리 도메인 표지에 아무 문구나 찍히므로 그때 따로 판정한다. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Plate3, PlateText } from '@/components/site3p/Plate3';
import { useT } from '@/components/site3p/lang';
import { penPath } from '@/components/site3p/pen';
import { inkPath, startStroke } from '@/components/site3p/scrawl';
import { useHref } from '@/components/site4/Shell';
import { P1Cover } from './Hero';
import './HeroToy.css';

type Stage = 'blank' | 'alive' | 'tuned' | 'named';
type Stroke = { path: SVGPathElement; frames: string[] };

const VB = 1000;          // 낙서 좌표계 — 패드 한 변. 돌과 같이 움직이고 같이 줄어든다
const BOIL_AMP = 3.4;     // 낙서 떨림 폭(좌표계 단위) — 패드 400px 에서 약 1.4px
const WAKE_MS = 420;      // 손을 떼고 살아나기까지 — 이어서 그을 틈
const TUNE_AFTER_MS = 7000;  // 손잡이를 안 만져도 다음 안내로 넘어간다
const MAX_CHARS = 24;
const RING = penPath('circle', 'IT');

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const finePointer = () => matchMedia('(pointer:fine) and (hover:hover)').matches;

/* 성격 c(0 묵직 → 1 통통) → 한 번 튀는 모양. `phase` 0→air 공중, air→1 땅에서 눌림. */
function shape(c: number) {
  return {
    period: lerp(1.9, 0.66, c),
    air: lerp(0.52, 0.8, c),
    height: lerp(0.035, 0.24, c),
    squash: lerp(0.035, 0.2, c),
    tilt: lerp(0.4, 3.6, c),
  };
}

/* 한 획의 떨림 프레임 3장. 점마다 낮은 주파수로 밀어서 선이 끓지, 지글거리지 않는다. */
function boilFrames(pts: number[]): string[] {
  return [0, 1, 2].map((v) => {
    const a = v * 2.1 + 0.7, b = v * 1.3 + 2.2;
    const q: number[] = [];
    for (let i = 0; i < pts.length / 2; i++) {
      q.push(
        pts[i * 2] + BOIL_AMP * (Math.sin(i * 0.31 + a) + 0.6 * Math.sin(i * 0.11 + b)),
        pts[i * 2 + 1] + BOIL_AMP * (Math.cos(i * 0.27 + b) + 0.6 * Math.sin(i * 0.09 + a)),
      );
    }
    return inkPath(q);
  });
}

export default function HeroStone() {
  const { t } = useT();
  const href = useHref();
  const pad = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>('blank');
  const [word, setWord] = useState('');
  const [tick, setTick] = useState(0);
  const [c, setC] = useState(55);
  /* 루프가 읽는 값 — 12fps 로 돌아서 React 상태로 두지 않는다. */
  const live = useRef({ c: 0.55, frozen: true, awake: false, phase: 0, flip: 1, party: 0 });
  const strokes = useRef<Stroke[]>([]);
  const wake = useRef(0);
  const handHeld = useRef(false);   // 손잡이를 쥐는 동안(키보드 조작 포함)은 이름 칸이 초점을 뺏지 않는다
  const has = word.trim().length > 0;
  const armed = stage !== 'blank';

  useEffect(() => {
    const el = body.current, sh = shadow.current, p = pad.current;
    if (!el || !sh || !p || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const m = live.current;
    let raf = 0, lastHop = -1, lastBoil = -1, wx = 0, wy = 0, wr = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const sec = (now - t0) / 1000;
      const boil = Math.floor(sec * 6);
      if (boil !== lastBoil) {
        lastBoil = boil;
        wx = (Math.random() - 0.5) * 5; wy = (Math.random() - 0.5) * 5; wr = (Math.random() - 0.5) * 1.2;
        for (const s of strokes.current) s.path.setAttribute('d', s.frames[boil % 3]);
      }
      const hop = Math.floor(sec * 12);
      if (hop === lastHop) return;
      lastHop = hop;
      let y = 0, sx = 1, sy = 1, r = 0;
      if (m.frozen) { wx = wy = wr = 0; }
      else if (m.awake) {
        const s = shape(m.c);
        m.phase += 1 / 12 / (m.party > 0 ? s.period * 0.85 : s.period);
        if (m.phase >= 1) { m.phase -= 1; m.flip = -m.flip; if (m.party > 0) m.party -= 1; }
        const boost = m.party > 0 ? 1.35 : 1;
        if (m.phase < s.air) {
          const v = m.phase / s.air;
          y = 4 * v * (1 - v) * s.height * boost;
          const st = s.squash * 0.6 * (1 - 2 * v) * (1 - 2 * v) * boost;
          sy = 1 + st; sx = 1 - st * 0.7;
          r = s.tilt * m.flip * (1 - v);
        } else {
          const q = Math.sin(Math.PI * ((m.phase - s.air) / (1 - s.air)));
          const press = s.squash * Math.min(boost, 1.25) * q;   // 축하 때도 납작해지지는 않게
          sy = 1 - press; sx = 1 + press * 0.8;
        }
      }
      const h = p.clientHeight;
      el.style.setProperty('--tx', `${wx}px`);
      el.style.setProperty('--ty', `${wy - y * h}px`);
      el.style.setProperty('--rz', `${wr + r}deg`);
      el.style.setProperty('--sx', sx.toFixed(3));
      el.style.setProperty('--sy', sy.toFixed(3));
      sh.style.setProperty('--k', (1 - y * 1.6).toFixed(3));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (stage !== 'alive') return;
    const id = window.setTimeout(() => setStage('tuned'), TUNE_AFTER_MS);
    return () => clearTimeout(id);
  }, [stage]);

  const focusName = () => {
    if (finePointer() && !handHeld.current) input.current?.focus({ preventScroll: true });
  };
  useEffect(() => { if (stage === 'tuned') focusName(); }, [stage]);

  /* 스크롤로 넘어가면 놓아 줘서 Space·방향키가 평소처럼 스크롤한다. */
  useEffect(() => {
    const off = () => { if (scrollY > 40) input.current?.blur(); };
    addEventListener('scroll', off, { passive: true });
    return () => { removeEventListener('scroll', off); clearTimeout(wake.current); };
  }, []);

  /* 긴 이름은 줄을 넘기지 않고 줄인다 — 넓은 화면은 제목 한 줄 전체, 좁은 화면은 이름 줄만. */
  useLayoutEffect(() => {
    const fit = () => {
      const h = title.current, l = line.current, st = h?.closest<HTMLElement>('.p1-stage');
      if (!h || !l || !st) return;
      const el = matchMedia('(min-width:1000px)').matches ? h : l;
      h.style.removeProperty('--fit'); l.style.removeProperty('--fit');
      const cs = getComputedStyle(st);
      const avail = st.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.setProperty('--fit', Math.min(1, avail / Math.max(1, el.offsetWidth)).toFixed(3));
    };
    fit();
    addEventListener('resize', fit);
    return () => removeEventListener('resize', fit);
  }, [word]);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = svg.current, p = pad.current;
    if (!s || !p || e.button !== 0) return;
    e.preventDefault();
    clearTimeout(wake.current);
    live.current.frozen = true;
    startStroke(s, e.nativeEvent, (m) => {
      const r = p.getBoundingClientRect();
      return [((m.clientX - r.left) / r.width) * VB, ((m.clientY - r.top) / r.height) * VB];
    }, {
      dot: true,
      onEnd: (path, pts) => {
        if (!path) { live.current.frozen = !live.current.awake; return; }
        strokes.current.push({ path, frames: boilFrames(pts) });
        wake.current = window.setTimeout(() => {
          const m = live.current;
          if (!m.awake) { m.awake = true; m.phase = shape(m.c).air; }   // 눌렸다가 뛴다
          m.frozen = false;
          setStage((x) => (x === 'blank' ? 'alive' : x));
        }, WAKE_MS);
      },
    });
  };

  const tune = (v: number) => {
    setC(v);
    live.current.c = v / 100;
    setStage((x) => (x === 'alive' ? 'tuned' : x));
  };
  const grabHandle = () => {
    handHeld.current = true;
    addEventListener('pointerup', () => { handHeld.current = false; focusName(); }, { once: true });
  };

  const stamp = () => {
    if (!has) return;
    live.current.party = 3;
    setStage('named');
    input.current?.blur();
  };

  const again = () => {
    clearTimeout(wake.current);
    svg.current?.replaceChildren();
    strokes.current = [];
    live.current = { c: c / 100, frozen: true, awake: false, phase: 0, flip: 1, party: 0 };
    setWord('');
    setStage('blank');
  };

  const hint = stage === 'named' ? t('home.toy.done')
    : has ? t(finePointer() ? 'home.toy.enter' : 'home.toy.enterTouch')
    : stage === 'tuned' ? t('home.toy.tuned')
    : stage === 'alive' ? t('home.toy.alive')
    : t('home.toy.draw');

  return (
    <P1Cover className="toy">
      <div className="toy-grid" data-stage={stage}>
        <p className="toy-note" aria-live="polite">{hint}</p>
        <div className="toy-pad" ref={pad} onPointerDown={down}>
          <span className="toy-shadow" ref={shadow} aria-hidden="true" />
          <div className="toy-body" ref={body}>
            <img src="/riso/stones/stone-3.webp" alt="" width={720} height={704} draggable={false} />
            <svg ref={svg} viewBox={`0 0 ${VB} ${VB}`} aria-hidden="true" focusable="false" />
          </div>
        </div>
        {/* 판 높이를 안 바꾸려고 끝 버튼은 손잡이 자리에 앉는다 — 표지 아래로 밀리면 다음 판에 가려진다. */}
        {stage === 'named' ? (
          <div className="toy-acts">
            <button type="button" className="btn-line" onClick={again} data-cur>{t('home.toy.again')}</button>
            <a className="btn-fill" href={href('/ae')} data-cur>{t('home.v5.cta.plugin')} <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <label className="toy-handle">
            <span className="toy-handle-ends" aria-hidden="true"><span>{t('home.toy.heavy')}</span><span>{t('home.toy.bouncy')}</span></span>
            <input type="range" min={0} max={100} value={c} aria-label={`${t('home.toy.heavy')} – ${t('home.toy.bouncy')}`}
              tabIndex={armed ? undefined : -1} onChange={(e) => tune(Number(e.target.value))}
              onPointerDown={grabHandle} onKeyDown={() => { handHeld.current = true; }} onBlur={() => { handHeld.current = false; }} data-cur />
          </label>
        )}
      </div>

      <h1 ref={title} className={`disp toy-title${stage === 'named' ? ' stamped' : ''}`} lang="en" onClick={() => input.current?.focus({ preventScroll: true })}>
        <span className="toy-l1">
          <Plate3 k="home.hero.h1a" />{' '}
          <Plate3 k="home.toy.name" />
        </span>{' '}
        <span className={`toy-l2${has ? ' has' : ''}`} ref={line}>
          {has ? (
            <span key={tick} className="toy-word"><PlateText text={word.trim()} /></span>
          ) : (
            <span className={`toy-it${armed ? ' on' : ''}`}>
              <Plate3 k="home.toy.it" />
              <svg className="pen pen-circle" viewBox={RING.vb} preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={RING.d} pathLength={1} /></svg>
            </span>
          )}
          {armed && stage !== 'named' ? <i className="toy-caret" aria-hidden="true" /> : null}
          <Plate3 k="home.toy.dot" />
          {armed ? (
            <input
              ref={input} className="toy-input" type="text" value={word} maxLength={MAX_CHARS}
              aria-label={t('home.toy.aria')} autoComplete="off" autoCorrect="off" spellCheck={false} enterKeyHint="done"
              onChange={(e) => {
                setWord(e.target.value.replace(/^\s+/, ''));
                setTick((n) => n + 1);
                setStage((x) => (x === 'named' ? 'tuned' : x));
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) stamp(); }}
              onBlur={() => { if (!finePointer() && stage !== 'named') stamp(); }}   // 폰은 키보드를 그냥 내려도 찍는다
            />
          ) : null}
        </span>
      </h1>

      <p className="sub">{t('home.v5.tagline')}</p>
    </P1Cover>
  );
}
