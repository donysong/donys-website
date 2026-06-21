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
    <section id="demo" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-24" />

      <div className="mb-16">
        <p className="label mb-4">Demo</p>
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
          See it move
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 440,
          }}
        >
          Real keyframes, real easing — every result stays fully editable on the timeline.
        </p>
      </div>

      {/* Featured — full AI build */}
      <div
        style={{ border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}
        className="mb-4"
      >
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
            aria-label="Claude building a synthwave title card from a single prompt"
          />
        </div>
        <div
          style={{
            padding: '18px 24px 22px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '4px 14px',
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Build with AI
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, minWidth: 240 }}>
            One prompt → Claude sets up the comp, gradient, animated type, glow, and an ambient
            loop — a finished title card, every layer still editable.
          </p>
        </div>
      </div>

      {/* Two-up — preset + curve */}
      <div className="grid gap-4 md:grid-cols-2">
        {GRID_DEMOS.map((d) => (
          <div
            key={d.label}
            style={{ border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}
          >
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
            <div style={{ padding: '16px 20px 20px' }}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 7,
                }}
              >
                {d.label}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {d.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
