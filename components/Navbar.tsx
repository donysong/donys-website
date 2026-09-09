'use client';

import { useEffect, useState } from 'react';
import { PRICE } from '@/lib/product';

const NAV_LINKS = [
  { label: 'Product', href: '/#product' },
  { label: 'Proof', href: '/#proof' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Notes', href: '/update' },
];

/* 🔴 로고는 파란 종이 위에서 흰 판본이다 (02_Main_White).
   2색 판본(05)은 `You`/`It` 이 블루라 파란 종이에 묻는다 — REBRAND §9.2.1 의
   대비 판정을 그대로 적용한 결과다. 파일 교체 금지. */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav style={{ position: 'relative', zIndex: 20 }}>
      <div
        className="mx-auto grid max-w-[1240px] items-center px-6 pt-7 md:px-10"
        style={{ gridTemplateColumns: '1fr auto 1fr', gap: 16 }}
      >
        <div className="mono hidden md:block" style={{ color: 'var(--text-secondary)' }}>
          Plate <b style={{ color: 'var(--ink-black)', fontWeight: 500 }}>01</b> / 07
          {'  ·  '}Ink <b style={{ color: 'var(--ink-black)', fontWeight: 500 }}>E50437</b>
        </div>

        <a href="/" aria-label="You Name It — home" className="justify-self-start md:justify-self-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/riso/logo-white.webp" alt="You Name It" style={{ height: 46, display: 'block' }} />
        </a>

        <div className="hidden items-center justify-end gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-black)' }}
            >
              {l.label}
            </a>
          ))}
          {/* 네비 CTA 는 상시 노출 크롬이라 §3 그대로 — 면을 채우는 예외는 구매 버튼 2개뿐 */}
          <a className="cta" href="/#pricing" style={{ padding: '9px 16px', fontSize: 13 }}>
            Buy
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="justify-self-end md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-black)', padding: 6 }}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M5 5l12 12M5 17L17 5" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            inset: '76px 0 0',
            zIndex: 30,
            background: 'var(--paper)',
            padding: '8px 24px 24px',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '16px 0',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--ink-black)',
                borderBottom: '1.5px solid var(--line)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            className="cta-buy"
            href="/#pricing"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 22, textAlign: 'center', fontSize: 15 }}
          >
            <i className="rim" /><i className="bed" /><i className="grn" />
            Get it — {PRICE}
          </a>
        </div>
      )}
    </nav>
  );
}
