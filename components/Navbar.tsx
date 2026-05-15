'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Demo', href: '/#demo' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto flex h-[48px] max-w-[1200px] items-center justify-between px-6">
        {/* Logo mark */}
        <a href="/" className="flex items-center gap-2.5">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              transform: 'rotate(45deg)',
              border: '1.5px solid var(--accent)',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                transform: 'rotate(-45deg)',
                fontSize: 8,
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              D
            </span>
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            Dony&apos;s
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                transition: 'color 0.08s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#pricing"
            style={{
              marginLeft: 16,
              padding: '5px 14px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
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
            Get Dony&apos;s
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M4 4l10 10M4 14L14 4" />
            ) : (
              <path d="M3 5h12M3 9h12M3 13h12" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'var(--bg-elevated)',
            borderTop: '1px solid var(--border)',
            padding: '12px 24px 16px',
          }}
          className="md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                display: 'block',
                padding: '10px 0',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#pricing"
            style={{
              display: 'block',
              marginTop: 12,
              padding: '8px 0',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'var(--accent-dark)',
              color: '#0c0c0c',
            }}
            onClick={() => setOpen(false)}
          >
            Get Dony&apos;s — $30
          </a>
        </div>
      )}
    </nav>
  );
}
