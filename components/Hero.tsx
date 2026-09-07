'use client';

import { COUNTS, PRICE } from '@/lib/product';

export default function Hero() {
  return (
    <section
      className="overprint relative flex min-h-screen flex-col items-center overflow-hidden px-6 pt-40 pb-24"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="relative z-10 my-auto max-w-[820px] text-center fade-in-up">
        <p className="label mb-7">After Effects Panel</p>

        {/* 색수차는 14px 이상 타이포에만 (§10.2 크기 게이트) — 여기는 clamp 하한이 38px */}
        <h1
          className="misreg mb-7"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            color: 'var(--text-primary)',
            fontVariationSettings: "'ROND' 100",
          }}
        >
          You think it.
          <br />
          It builds it.
        </h1>

        <p
          className="mx-auto mb-11"
          style={{
            maxWidth: 540,
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
          }}
        >
          Describe what you have in mind — the panel puts it in your comp, on real
          layers with keyframes you can still edit. {COUNTS.scripts} scripts,{' '}
          {COUNTS.motion} motion presets, {COUNTS.gradients} gradients, a graph editor,
          expressions, and Claude built in.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {/* 🔴 §3 의 예외 — 구매 CTA 만 평시에 면을 채운다 (§9.9 ③) */}
          <a className="cta-buy" href="#pricing" style={{ padding: '13px 28px', fontSize: 14 }}>
            Get it — {PRICE}
          </a>
          <a className="cta" href="#demo" style={{ padding: '12px 26px', fontSize: 14 }}>
            Watch it work
          </a>
        </div>

        <p style={{ marginTop: 18, fontSize: 12, color: 'var(--text-muted)' }}>
          One-time purchase · AE 2022+ · Windows &amp; macOS
        </p>
      </div>

      {/* 두 판으로 인쇄된 프레임 — 둘째 판이 밀려 찍힌 자리가 보인다 */}
      <div className="relative z-10 mx-auto mt-24 w-full max-w-[1080px] fade-in-up delay-200">
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--accent-vivid)',
              opacity: 0.28,
              transform: 'translate(calc(var(--slip) * 3), calc(var(--slip) * 3))',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          />
          <div
            className="overflow-hidden"
            style={{
              position: 'relative',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r-lg)',
              background: 'var(--bg-active)',
              boxShadow: 'var(--shadow-3)',
            }}
          >
            <video
              src="/videos/anim-chat.mp4"
              poster="/images/promo/poster-chat.png"
              autoPlay
              muted
              loop
              playsInline
              className="block w-full"
              aria-label="Claude building a synthwave title card inside After Effects, step by step"
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute -bottom-px left-0 right-0"
          style={{ height: 180, background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
        />
      </div>
    </section>
  );
}
