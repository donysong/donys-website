'use client';

import { CHECKOUT_URL, COUNTS, PRICE_USD } from '@/lib/product';

const INCLUDED = [
  `${COUNTS.scripts} one-click scripts`,
  `${COUNTS.motion} motion presets, tunable after apply`,
  `${COUNTS.textPresets} text animation presets`,
  `${COUNTS.gradients} gradients (ramp + tritone)`,
  `Graph editor with ${COUNTS.curves} curve presets`,
  `Expression editor with ${COUNTS.expressions} snippets`,
  `Claude AI chat — ${COUNTS.tools} tools, ${COUNTS.skills} skills`,
  'Free minor updates',
  '2 devices per license',
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1180px] px-6 py-28">
      <div className="plate-rule mb-20" />

      <div className="mb-14 text-center">
        <p className="plate-no mb-4">03 — PRICING</p>
        <h2
          className="misreg"
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          Buy it once. It stays yours.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
          No subscription. No seat renewals. No hidden fees.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <div
          className="card halftone"
          style={{ padding: '34px 32px 30px', borderRadius: 'var(--r-lg)' }}
        >
          <div
            style={{
              marginBottom: 26,
              paddingBottom: 24,
              borderBottom: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <p className="label" style={{ marginBottom: 14, fontSize: 10 }}>
              You Name It
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: 3,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>$</span>
              <span
                className="misreg"
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                  lineHeight: 1,
                  color: 'var(--text-primary)',
                }}
              >
                {PRICE_USD}
              </span>
              <span style={{ fontSize: 13, marginLeft: 4, color: 'var(--text-muted)', fontWeight: 600 }}>
                USD
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>one-time payment</p>
          </div>

          <ul style={{ marginBottom: 26, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {INCLUDED.map((item) => (
              <li
                key={item}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5 }}
              >
                <svg
                  style={{ width: 14, height: 14, marginTop: 3, flexShrink: 0, color: 'var(--accent)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ color: 'var(--text-default)' }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* 🔴 §3 의 예외 — 구매 CTA 만 평시에 면을 채운다 (§9.9 ③) */}
          <a
            className="cta-buy"
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', padding: '13px 0', textAlign: 'center', fontSize: 14 }}
          >
            Buy now
          </a>

          <p style={{ marginTop: 16, textAlign: 'center', fontSize: 11.5, color: 'var(--text-muted)' }}>
            <a
              href="/refund"
              style={{ textDecoration: 'underline', textUnderlineOffset: 3, color: 'inherit' }}
            >
              14-day refund policy
            </a>
            {' · '}AE 2022+{' · '}Windows &amp; macOS
          </p>
        </div>
      </div>

      {/* 비교 축 = 가격이 아니라 구조. 우리는 한 번 사면 끝이다 (§9.9 ④) */}
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px 22px',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ color: 'var(--text-secondary)' }}>Pay once, keep it</span>
        <span style={{ color: 'var(--border-strong)' }}>/</span>
        <span>AEJuice — subscription</span>
        <span style={{ color: 'var(--border-strong)' }}>/</span>
        <span>Flow — graph editor only</span>
      </div>
    </section>
  );
}
