'use client';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
      <div
        className="mx-auto px-6 py-8"
        style={{
          maxWidth: 1200,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px 32px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 14,
                height: 14,
                transform: 'rotate(45deg)',
                border: '1.5px solid var(--accent)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  transform: 'rotate(-45deg)',
                  fontSize: 7,
                  fontWeight: 800,
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                D
              </span>
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              Dony&apos;s
            </span>
          </div>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              paddingLeft: 22,
            }}
          >
            The only AE plugin you&apos;ll ever need.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
          {[
            { label: 'Contact', href: 'mailto:support@donys.dev' },
            { label: 'Twitter', href: '#' },
            { label: 'YouTube', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                transition: 'color 0.08s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
          {[
            { label: 'Terms', href: '/terms' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Refund', href: '/refund' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                transition: 'color 0.08s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {label}
            </a>
          ))}
        </div>

        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.04em',
            color: 'var(--text-muted)',
          }}
        >
          &copy; 2026 Dony&apos;s
        </p>
      </div>
    </footer>
  );
}
