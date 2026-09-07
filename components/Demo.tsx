'use client';

const GRID_DEMOS = [
  {
    label: 'Apply a preset',
    caption: 'Click a motion preset — it lands on your layer with hand-tuned overshoot.',
    src: '/videos/anim-motion.mp4',
    poster: '/images/promo/poster-motion.png',
  },
  {
    label: 'Shape any curve',
    caption: 'Drag a bezier handle in the graph editor and watch the easing update live.',
    src: '/videos/anim-graph.mp4',
    poster: '/images/promo/poster-graph.png',
  },
];

export default function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-[1180px] px-6 py-28">
      <div className="plate-rule mb-20" />

      <div className="mb-14">
        <p className="plate-no mb-4">02 — DEMO</p>
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
          See it move
        </h2>
        <p style={{ fontSize: 15.5, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 480 }}>
          Real keyframes, real easing — every result stays fully editable on the timeline.
        </p>
      </div>

      <div className="card mb-4" style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)' }}>
        <div style={{ background: 'var(--bg-active)', borderBottom: '1px solid var(--border)' }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/videos/anim-chat.mp4"
            poster="/images/promo/poster-chat.png"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block' }}
            aria-label="Claude building a synthwave title card step by step inside After Effects"
          />
        </div>
        <div
          style={{
            padding: '20px 26px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '6px 18px',
          }}
        >
          <p className="label" style={{ fontSize: 10 }}>Build it by describing it</p>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1, minWidth: 260 }}>
            You call the shots — the comp, the gradient, the type, the glow, the ambient loop.
            It does the building, and hands you back a timeline where every layer is still yours
            to open and change.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {GRID_DEMOS.map((d) => (
          <div key={d.label} className="card" style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)' }}>
            <div style={{ background: 'var(--bg-active)', borderBottom: '1px solid var(--border)' }}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={d.src}
                poster={d.poster}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', display: 'block' }}
                aria-label={d.caption}
              />
            </div>
            <div style={{ padding: '18px 22px 22px' }}>
              <p className="label" style={{ fontSize: 10, marginBottom: 8 }}>{d.label}</p>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {d.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
