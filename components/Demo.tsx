'use client';

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
          See it in action
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Watch how Dony&apos;s speeds up your After Effects workflow.
        </p>
      </div>

      {/* Video placeholder */}
      <div className="card overflow-hidden">
        <div className="relative aspect-video w-full" style={{ background: 'var(--bg-active)' }}>
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  margin: '0 auto 12px',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-muted)',
                  fontSize: 16,
                  transition: 'color 0.08s ease, border-color 0.08s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                }}
              >
                ▶
              </div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Demo video coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature preview grid */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { label: 'Text Presets', src: '/images/feature-text-presets.svg' },
          { label: 'Graph Editor', src: '/images/feature-graph-editor.svg' },
          { label: 'Gradient Library', src: '/images/feature-gradient-library.svg' },
          { label: 'Expression Editor', src: '/images/feature-expression-editor.svg' },
        ].map(({ label, src }) => (
          <div key={label} className="card overflow-hidden" style={{ position: 'relative' }}>
            <img
              src={src}
              alt={`${label} panel preview`}
              className="w-full"
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '4px 10px',
                background: 'var(--bg-elevated)',
                borderTop: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
