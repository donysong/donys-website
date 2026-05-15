'use client';

const INCLUDED = [
  '20+ built-in scripts',
  '50 text animation presets',
  '50+ gradient presets',
  'Graph editor with 21 curve presets',
  'Expression editor with autocomplete',
  'Smart widgets (anchor, sequence, clone)',
  'Multi-panel support (up to 5)',
  'Free minor updates',
  '2 devices per license',
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-24" />

      <div className="mb-16 text-center">
        <p className="label mb-4">Pricing</p>
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
          Simple pricing
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
          One-time purchase. No subscription. No hidden fees.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: 360 }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '32px 32px 28px',
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 24,
              borderBottom: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 10,
              }}
            >
              Dony&apos;s
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: 6,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--text-primary)',
                }}
              >
                $30
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>USD</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>one-time payment</p>
          </div>

          {/* Features list */}
          <ul style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INCLUDED.map((item) => (
              <li
                key={item}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}
              >
                <svg
                  style={{ width: 14, height: 14, marginTop: 1, flexShrink: 0, color: 'var(--success-text)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://donysae.lemonsqueezy.com/checkout/buy/2280c131-6bd8-4d0b-8947-f94a8ed7f1b9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 0',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'var(--accent-dark)',
              color: '#0c0c0c',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.08s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent-dark)')}
          >
            Buy Now
          </a>

          <p
            style={{
              marginTop: 14,
              textAlign: 'center',
              fontSize: 11,
              color: 'var(--text-muted)',
            }}
          >
            <a
              href="/refund"
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'var(--border-strong)',
                textUnderlineOffset: 2,
                color: 'inherit',
                transition: 'color 0.08s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              14-day refund policy
            </a>
            {' '}·{' '}AE 2022+{' '}·{' '}Windows &amp; macOS
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px 20px',
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'var(--text-muted)',
        }}
      >
        <span>Motion Tools Pro: $40</span>
        <span style={{ color: 'var(--border-strong)' }}>—</span>
        <span>Flow: $19 (graph only)</span>
        <span style={{ color: 'var(--border-strong)' }}>—</span>
        <span>AEJuice: subscription</span>
      </div>
    </section>
  );
}
