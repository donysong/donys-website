'use client';
/* 03 기능의 줄기 — 레퍼런스(mindmarket 홈 타임라인 판: 폭의 ~26% 짜리 굵은 띠가 판 전체를 S 로 휘감고, 카드가 그 위에 좌우로 앉는다)를 우리 판으로.
   🔴 2026-10-26 오너 *"커다란 줄기로 크게 — 지금 너무 소심하고 이상해. 그 줄기가 이 페이지의 중심을 잡아주고 레이아웃의 기준이 되어야 함"*.
   - 레이아웃: 블록(`.feat`) = 크림 카드(폭 56%)가 좌·우로 번갈아 앉는다(site4.css). 빈 반대쪽 = 줄기가 지나는 자리.
   - 줄기 = 판 위 점들(맨 위 가운데 → 각 카드의 빈 쪽 한가운데 → 맨 아래 가운데)을 잇는 Catmull-Rom 곡선. 굵기 = 판 폭의 22%.
     카드와 카드 사이에서 대각선으로 카드 밑을 건너간다. 잉크 판 두 장(밀린 흰 판 + 빨간 잉크) + 알갱이 마스크.
   - 그 빈 쪽 한가운데에 돌이 앉는다(Rive 캐릭터 자리 · 레퍼런스는 여기 캐릭터).
   - 그리는 양 = 스크롤 진행도 1/40 계단(포스터라이즈 — 하우스 모션). 1000px 미만 = 카드 한 줄 · 줄기 숨김. 줄인 모션 = 다 그려진 상태. */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = 40;
const STONES = ['stone-7', 'stone-4', 'stone-2', 'stone-5', 'stone-1', 'stone-6', 'stone-3'];

type Pt = { x: number; y: number };
type Geo = { w: number; h: number; d: string; sw: number; stations: Pt[] };

/* Catmull-Rom(장력 1/6) → 3차 베지어 */
function smooth(pts: Pt[]): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function PenTimeline({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const w = el.offsetWidth, h = el.offsetHeight;
      const stations = [...el.querySelectorAll<HTMLElement>(':scope > .feat')].map((f) => {
        const b = f.getBoundingClientRect();
        const left = b.left - r.left, right = b.right - r.left;
        const onLeft = left + b.width / 2 < w / 2;
        return { x: Math.round(onLeft ? (right + w) / 2 : left / 2), y: Math.round(b.top - r.top + b.height / 2) };
      });
      const sw = Math.round(w * 0.22);   // 둥근 끝(반지름 sw/2)이 판 상자 안에 들게 — 마스크가 상자 밖을 자른다
      const pts = [{ x: w / 2, y: sw / 2 }, ...stations, { x: w / 2, y: h - sw / 2 }];
      setGeo({ w, h, d: smooth(pts), sw, stations });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !geo) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); return; }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 75%', end: 'bottom 60%',
      onUpdate: (s) => el.style.setProperty('--p', (Math.floor(s.progress * STEPS) / STEPS).toFixed(3)),
    });
    el.style.setProperty('--p', (Math.floor(st.progress * STEPS) / STEPS).toFixed(3));
    return () => st.kill();
  }, [geo]);

  return (
    <div className="v5-line-wrap" ref={wrap}>
      {geo ? (
        <div className="v5-pen" aria-hidden="true">
          <svg className="v5-pen-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} focusable="false" style={{ ['--sw' as string]: `${geo.sw}px` }}>
            <path className="v5-pen-plate" pathLength={1} d={geo.d} />
            <path className="v5-pen-ink" pathLength={1} d={geo.d} />
          </svg>
          {geo.stations.map((p, i) => (
            <img key={i} className="v5-pen-stone" src={`/riso/stones/${STONES[i % STONES.length]}.webp`} alt=""
              style={{ left: p.x, top: p.y, ['--at' as string]: (p.y / geo.h).toFixed(3) }} />
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}
