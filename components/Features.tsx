'use client';

const FEATURES = [
  {
    tag: 'Scripts',
    title: 'Toolbox',
    description:
      '27 one-click utilities — parenting, nulls, sequencing, GIF export, RGB split. Across every selected layer at once.',
    img: '/images/promo/f-toolbox.png',
  },
  {
    tag: 'Motion',
    title: 'Motion Presets',
    description:
      '112 production-ready moves with hand-tuned easing — back, bounce, overshoot, elastic. Live preview on hover.',
    img: '/images/promo/f-motion.png',
  },
  {
    tag: 'Text',
    title: 'Text Presets',
    description:
      '62 expression-driven text animations, per character. Variable-font axes (weight · width · slant) on AE 26.',
    img: '/images/promo/f-text.png',
  },
  {
    tag: 'Gradients',
    title: 'Gradient Library',
    description:
      'Designer gradients sorted by mood. Apply as a real AE ramp or 3-stop tritone — favorite and import your own.',
    img: '/images/promo/f-gradient.png',
  },
  {
    tag: 'Easing',
    title: 'Graph Editor',
    description:
      'Visual bezier editor with 21 presets. Read the curve off a keyframe, reshape it, apply to selected keys.',
    img: '/images/promo/f-graph.png',
  },
  {
    tag: 'Expressions',
    title: 'Expression Editor',
    description:
      '80+ proven expressions with a live editor that applies as you type. Auto-targets the right property.',
    img: '/images/promo/f-expr.png',
  },
];

const CHAT_SKILLS = [
  'Smooth Entrance', 'Snappy Entrance', 'Bouncy Overshoot', 'Kinetic Typography',
  'Counter Tick', 'Zoom Focus Pull', 'Stroke Draw', 'Ambient Loop',
  '3D Depth Dolly', 'Multi-layer Build', 'Typewriter', 'Mask Wipe', 'Parallax 2.5D', 'Shape Morph',
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-24" />

      <div className="mb-16">
        <p className="label mb-4">Features</p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          One plugin. The whole workflow.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 460,
          }}
        >
          Replace Flow, AEJuice, and a folder of scattered scripts with one integrated
          panel — now with Claude AI built in.
        </p>
      </div>

      {/* Chat — full-width featured card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderLeft: '2px solid var(--accent)',
          display: 'grid',
          gap: 0,
          overflow: 'hidden',
        }}
        className="md:grid-cols-[1.05fr_1fr]"
      >
        <div style={{ padding: '32px 32px 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              AI Chat
            </p>
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
              }}
            >
              New
            </span>
          </div>

          <h3
            style={{
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}
          >
            Just describe it. Claude animates it.
          </h3>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: 20,
              maxWidth: 520,
            }}
          >
            The chat panel runs Claude with direct access to your comp — 42 native AE tools and
            32 motion skills. Ask for motion, expressions, or a whole layout; it builds them on
            real layers, with keyframes you can edit. Uses your own Claude Pro / Max — no extra fee.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CHAT_SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Chat preview — finished build still (the looping video lives in Hero + Demo) */}
        <div
          style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-active)' }}
          className="hidden md:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/promo/poster-chat.png"
            alt="Claude's finished synthwave title card inside After Effects"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>

      {/* Six feature image cards */}
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3"
        style={{ border: '1px solid var(--border)', borderTop: 'none' }}
      >
        {FEATURES.map((f) => (
          <div key={f.title} className="card-feature" style={{ overflow: 'hidden' }}>
            <div
              style={{
                aspectRatio: '4 / 3',
                background: 'var(--bg-active)',
                borderBottom: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.img}
                alt={`${f.title} panel`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '18px 22px 24px' }}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 10,
                }}
              >
                {f.tag}
              </p>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
