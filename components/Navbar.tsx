'use client';

import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';
import { PRICE } from '@/lib/product';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Demo', href: '/#demo' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(12,12,12,.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'background .2s var(--ease-out), border-color .2s var(--ease-out)',
      }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between px-6">
        <a href="/" className="flex items-center" aria-label="You Name It — home">
          <BrandMark size={22} />
        </a>

        {/* Desktop nav — 링크는 텍스트만. 면을 색으로 채우지 않는다 (§3) */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                borderRadius: 'var(--r-sm)',
                transition: 'color .12s var(--ease-out)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {l.label}
            </a>
          ))}
          {/* 네비의 CTA 는 상시 노출 크롬이라 §3 그대로 — 예외는 구매 버튼뿐 (§9.9 ③) */}
          <a className="cta" href="/#pricing" style={{ marginLeft: 12, padding: '7px 16px', fontSize: 13 }}>
            Get it
          </a>
        </div>

        <button
          style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M5 5l10 10M5 15L15 5" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          style={{
            background: 'var(--mat-elev)',
            borderTop: '1px solid var(--border)',
            padding: '10px 24px 18px',
          }}
          className="md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border)',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            className="cta"
            href="/#pricing"
            style={{ display: 'block', marginTop: 14, padding: '11px 0', textAlign: 'center', fontSize: 13 }}
            onClick={() => setOpen(false)}
          >
            Get it — {PRICE}
          </a>
        </div>
      )}
    </nav>
  );
}
