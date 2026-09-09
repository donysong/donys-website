'use client';

import Plate from './Plate';
import { CHECKOUT_URL, COUNTS, PRICE_USD } from '@/lib/product';

const INCLUDED = [
  `${COUNTS.scripts} one-click scripts`,
  `${COUNTS.motion} motion presets, re-tunable after they land`,
  `${COUNTS.textPresets} text animation presets`,
  `${COUNTS.gradients} gradients — real ramps or tritone`,
  `Graph editor with ${COUNTS.curves} curve presets`,
  `Expression editor with ${COUNTS.expressions} snippets`,
  `Chat with ${COUNTS.tools} tools and ${COUNTS.skills} skills`,
  'Free minor updates',
  '2 devices per license',
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
        Plate 06 / 07 — price
      </p>

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
        <div>
          <h2 className="headline" style={{ marginBottom: 18 }}>
            <Plate as="span">Buy it once.</Plate>
            <Plate as="span" tone="black">It stays yours.</Plate>
          </h2>
          <p style={{ maxWidth: '40ch', fontSize: 16.5, lineHeight: 1.62, color: 'var(--text-default)' }}>
            No subscription, no seat renewals, no plan to keep paying for. You buy the tool, you
            keep the tool — and the work you make with it never stops opening.
          </p>

          {/* 비교 축 = 가격이 아니라 **구조**다 (§9.9 ④).
              🔴 경쟁사 이름을 다시 넣지 마라 — 브랜드 가이드 BOUNDARIES "툴 리뷰 ✗ · 남 물건 평가 안 함". */}
          <div style={{ marginTop: 30, display: 'grid', gap: 14, maxWidth: 440 }}>
            <div className="trim-rule" />
            <div className="flex items-baseline justify-between gap-6">
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                This panel
              </span>
              <span className="mono" style={{ color: 'var(--ink-black)' }}>Pay once · keep it</span>
            </div>
            <div className="trim-rule" />
            <div className="flex items-baseline justify-between gap-6">
              <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                The usual way
              </span>
              <span className="mono" style={{ color: 'var(--text-muted)' }}>Subscribe · keep paying</span>
            </div>
            <div className="trim-rule" />
          </div>
        </div>

        <div className="card-rim">
          <div className="card" style={{ padding: '30px 28px 26px' }}>
            <p className="mono" style={{ color: '#5a6266', marginBottom: 18 }}>One-time licence</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-red)' }}>$</span>
              <span
                className="num"
                style={{
                  fontSize: 68,
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: '-.045em',
                  color: 'var(--ink-black)',
                  fontVariationSettings: "'ROND' 100, 'wdth' 110",
                }}
              >
                {PRICE_USD}
              </span>
              <span className="mono" style={{ marginLeft: 6, color: '#5a6266' }}>USD</span>
            </div>
            <p style={{ fontSize: 13, color: '#5a6266', marginBottom: 24 }}>
              Paid once. Yours after that.
            </p>

            <ul style={{ display: 'grid', gap: 10, marginBottom: 26, padding: 0, listStyle: 'none' }}>
              {INCLUDED.map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#2b3236' }}>
                  <span aria-hidden style={{ color: '#2b3236', fontWeight: 800 }}>+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* 🔴 §3 의 예외 — 구매 CTA 만 평시에 면을 채운다 (§9.9 ③) */}
            <a
              className="cta-buy"
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 15 }}
            >
              <i className="rim" /><i className="bed" /><i className="grn" />
              Buy now
            </a>

            <p className="mono" style={{ marginTop: 16, textAlign: 'center', color: '#5a6266' }}>
              <a href="/refund" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                14-day refund
              </a>
              {'  ·  '}AE 2022+{'  ·  '}Win &amp; macOS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
