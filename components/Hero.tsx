'use client';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pt-36 pb-20"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Top stripe accent */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{ height: 1, background: 'var(--accent)', opacity: 0.15 }}
      />

      <div className="relative z-10 my-auto max-w-[760px] text-center fade-in-up">
        {/* Label */}
        <p className="label mb-6" style={{ color: 'var(--text-muted)' }}>
          After Effects Plugin
        </p>

        <h1
          className="mb-6"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}
        >
          The only After Effects plugin
          <br />
          you&apos;ll ever need
        </h1>

        <p
          className="mx-auto mb-10"
          style={{
            maxWidth: 480,
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}
        >
          Scripts, text presets, gradients, graph editor, expression editor,
          and smart widgets — all in one plugin.
        </p>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <a
            href="#pricing"
            style={{
              padding: '9px 24px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'var(--accent-dark)',
              color: '#0c0c0c',
              border: 'none',
              transition: 'background 0.08s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent-dark)')}
          >
            Get Dony&apos;s — $30
          </a>
          <a
            href="#demo"
            style={{
              padding: '8px 24px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              transition: 'color 0.08s ease, border-color 0.08s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-[1100px] fade-in-up delay-200">
        <div className="card overflow-hidden">
          <img
            src="/images/hero-screenshot.svg"
            alt="Dony's After Effects plugin — Script Grid, Gradient Library, and Graph Editor panels"
            className="w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute -bottom-px left-0 right-0"
          style={{ height: 160, background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
        />
      </div>
    </section>
  );
}
