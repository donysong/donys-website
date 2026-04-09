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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-border) 0px 1px 0px 0px' }}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="/" className="text-[15px] font-semibold tracking-[-0.32px] text-[var(--text)]">
          Dony&apos;s
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-[14px] font-medium tracking-normal text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#pricing"
            className="ml-4 rounded-md bg-[var(--text)] px-4 py-2 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Get Dony&apos;s
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-[var(--text-muted)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M5 5l10 10M5 15L15 5" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="bg-[var(--bg)]/95 backdrop-blur-xl px-6 py-4 md:hidden" style={{ boxShadow: 'var(--shadow-border) 0px 1px 0px 0px' }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 text-[14px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#pricing"
            className="mt-3 block rounded-md bg-[var(--text)] px-4 py-2.5 text-center text-[14px] font-medium text-[var(--bg)]"
            onClick={() => setOpen(false)}
          >
            Get Dony&apos;s — $30
          </a>
        </div>
      )}
    </nav>
  );
}
