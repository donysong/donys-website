'use client';

import { COUNTS } from '@/lib/product';

/* 홍보 이미지는 4:3 통짜 카드(자체 카피 포함)라 그대로 넣으면 글자가 뭉개지고 아래
   카드 텍스트와 중복된다. `zoom`/`pos` 로 **패널만** 확대해 프레이밍한다.
   🔴 잘라서 별도 PNG 로 저장하지 마라 — 원본은 tools/promo/out 에서 다시 구워지고,
   잘라둔 사본은 그때부터 갈라진다. 프레이밍은 CSS 가 한다. */
const FEATURES = [
  {
    tag: 'Scripts',
    title: 'Toolbox',
    description:
      `${COUNTS.scripts} one-click utilities — parenting, nulls, sequencing, GIF export, RGB split. Across every selected layer at once.`,
    img: '/images/promo/f-toolbox.png',
    zoom: '265%',
    pos: '70% 53%',
  },
  {
    tag: 'Motion',
    title: 'Motion Presets',
    description:
      `${COUNTS.motion} motion archetypes, every one re-tunable from Effect Controls after you apply it — spring, overshoot, bounce, elastic.`,
    img: '/images/promo/f-motion.png',
    zoom: '265%',
    pos: '70% 53%',
  },
  {
    tag: 'Text',
    title: 'Text Presets',
    description:
      `${COUNTS.textPresets} expression-driven text animations, per character. Variable-font axes (weight · width · slant) on AE 26.`,
    img: '/images/promo/f-text.png',
    zoom: '265%',
    pos: '70% 53%',
  },
  {
    tag: 'Gradients',
    title: 'Gradient Library',
    description:
      `${COUNTS.gradients} designer gradients sorted by mood. Apply as a real AE ramp or 3-stop tritone — favorite and import your own.`,
    img: '/images/promo/f-gradient.png',
    zoom: '265%',
    pos: '70% 53%',
  },
  {
    tag: 'Easing',
    title: 'Graph Editor',
    description:
      `Visual bezier editor with ${COUNTS.curves} presets. Read the curve off a keyframe, reshape it, apply to selected keys.`,
    img: '/images/promo/f-graph.png',
    zoom: '250%',
    pos: '70% 44%',
  },
  {
    tag: 'Expressions',
    title: 'Expression Editor',
    description:
      `${COUNTS.expressions} proven expressions with a live editor that applies as you type. Auto-targets the right property.`,
    img: '/images/promo/f-expr.png',
    zoom: '265%',
    pos: '70% 53%',
  },
];

const CHAT_SKILLS = [
  'Smooth Entrance', 'Snappy Entrance', 'Bouncy Overshoot', 'Kinetic Typography',
  'Counter Tick', 'Zoom Focus Pull', 'Stroke Draw', 'Ambient Loop',
  '3D Depth Dolly', 'Multi-layer Build', 'Typewriter', 'Mask Wipe', 'Parallax 2.5D', 'Shape Morph',
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1180px] px-6 py-28">
      <div className="plate-rule mb-20" />

      <div className="mb-14">
        <p className="plate-no mb-4">01 — FEATURES</p>
        <h2
          className="misreg"
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            marginBottom: 14,
          }}
        >
          One panel. The whole workflow.
        </h2>
        <p style={{ fontSize: 15.5, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 520 }}>
          Replace Flow, AEJuice, and a folder of scattered scripts with one integrated
          panel — with Claude sitting inside it.
        </p>
      </div>

      {/* Chat — full-width featured card */}
      <div
        className="card halftone mb-4"
        style={{ display: 'grid', gap: 0, overflow: 'hidden', borderRadius: 'var(--r-lg)' }}
      >
        <div className="md:grid md:grid-cols-[1.05fr_1fr]">
          <div style={{ padding: '34px 34px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <p className="label" style={{ fontSize: 10 }}>AI Chat</p>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-dark)',
                  color: 'var(--accent)',
                }}
              >
                New
              </span>
            </div>

            <h3
              style={{
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: 10,
              }}
            >
              Say what you&apos;re picturing.
            </h3>
            <p
              style={{
                fontSize: 14.5,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 22,
                maxWidth: 520,
              }}
            >
              The chat panel runs Claude with direct access to your comp — {COUNTS.tools} native AE
              tools and {COUNTS.skills} bundled skills (motion, layout, typography). It does not decide the piece for you; it puts what you asked for on
              real layers, with keyframes you can still open and change. Uses your own Claude
              Pro / Max — no extra fee.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CHAT_SKILLS.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 10.5,
                    fontWeight: 500,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'var(--bg-active)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-active)' }}
            className="hidden md:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/promo/poster-chat.png"
              alt="A finished synthwave title card built inside After Effects"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Six feature cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card" style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)' }}>
            <div
              className="halftone"
              role="img"
              aria-label={`The ${f.title} panel inside After Effects`}
              style={{
                aspectRatio: '5 / 6',
                backgroundColor: 'var(--bg-active)',
                backgroundImage: `url(${f.img})`,
                backgroundSize: f.zoom,
                backgroundPosition: f.pos,
                backgroundRepeat: 'no-repeat',
                borderBottom: '1px solid var(--border)',
              }}
            />
            <div style={{ padding: '20px 22px 24px' }}>
              <p className="label" style={{ fontSize: 10, marginBottom: 10 }}>{f.tag}</p>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
