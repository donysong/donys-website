'use client';

import { useEffect, useRef } from 'react';
import Plate from './Plate';

/* 제품 원리 3박자 — 브랜드 가이드에서 그대로 옮긴 것이다 (계획서 §5):
   말한다 / 앉는다("착지가 판단 도구") / 뜯는다(TEARDOWN "뜯어볼 수 있는 도구").

   🔴 영상 3편은 **실 AE 화면 녹화로 교체**해야 한다 (계획서 §7 ① · 오너 자산).
      지금 들어 있는 anim-*.mp4 는 tools/promo 에서 구운 합성 목업이다. */
const BEATS = [
  {
    n: '01',
    title: 'Say it',
    body: 'Describe the thing in your head, in your own words. No preset to hunt for, no tutorial to follow first.',
    src: '/videos/anim-chat.mp4',
    poster: '/images/promo/poster-chat.webp',
  },
  {
    n: '02',
    title: 'It lands',
    body: 'On your comp. Your layers, your keyframes, your project — not a render, not an export you have to import back.',
    src: '/videos/anim-motion.mp4',
    poster: '/images/promo/poster-motion.webp',
  },
  {
    n: '03',
    title: 'Tear it down',
    body: 'Every keyframe is editable, every curve reachable in the graph editor. Nothing is a black box you have to accept.',
    src: '/videos/anim-graph.mp4',
    poster: '/images/promo/poster-graph.webp',
  },
];

/** 뷰포트에 들어올 때만 재생한다 — 세 편이 동시에 도는 걸 막는다. */
function useInViewPlay() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Beat({ beat }: { beat: (typeof BEATS)[number] }) {
  const ref = useInViewPlay();
  return (
    <article>
      <div className="plate-card fig">
          <div className="screen asis">
            <video
              ref={ref}
              src={beat.src}
              poster={beat.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={`${beat.title} — the panel working inside After Effects`}
            />
          </div>
        <div className="fig-cap">
          <span className="fig-no">Fig. 0{beat.n}</span>
          <span>{beat.title}</span>
        </div>
      </div>
      <p className="mono" style={{ marginTop: 16, color: 'var(--ink-black)' }}>{beat.n}</p>
      <h3
        style={{
          margin: '6px 0 8px',
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: '-.02em',
          color: 'var(--text-primary)',
          fontVariationSettings: "'ROND' 100, 'wdth' 106",
        }}
      >
        {beat.title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '34ch' }}>
        {beat.body}
      </p>
    </article>
  );
}

export default function Loop() {
  return (
    <section id="product" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        {/* 🔴 `min-w-0` — flex 아이템이 안쪽 `width:max-content` 판 때문에 min-content 아래로
            못 줄어든다(Panels.tsx 와 같은 계급, 실측 2026-09-14 360px). */}
        <div className="min-w-0">
          <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
            Plate 02 / 08 — the loop
          </p>
          <h2 className="headline">
            <Plate as="span" tone="black">One loop, three beats.</Plate>
          </h2>
        </div>
        <p style={{ maxWidth: '38ch', fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Three beats, and you are holding the pen the whole way through. The panel takes over the
          hands, never the decision.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
        {BEATS.map((b) => (
          <Beat key={b.n} beat={b} />
        ))}
      </div>
    </section>
  );
}
