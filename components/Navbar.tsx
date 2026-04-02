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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="/" className="text-base font-semibold tracking-tight">
          <span className="gradient-text">Dony&apos;s</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-1.5 text-[13px] text-[var(--text-secondary)] transition hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
          <div className="ml-3 h-4 w-px bg-[var(--border)]" />
          <a
            href="/#pricing"
            className="ml-3 rounded-lg bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-medium text-[var(--text)] transition hover:bg-white/[0.12]"
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
        <div className="border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-2xl px-6 py-3 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#pricing"
            className="mt-2 block rounded-lg bg-white/[0.08] px-4 py-2.5 text-center text-sm font-medium text-[var(--text)]"
            onClick={() => setOpen(false)}
          >
            Get Dony&apos;s — $30
          </a>
        </div>
      )}
    </nav>
  );
}
