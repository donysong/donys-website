'use client';

import { useState } from 'react';
import { PRICE } from '@/lib/product';

const FAQS = [
  {
    q: 'Which AE versions are supported?',
    a: 'After Effects 2022 (v22.0) and above, on both Windows and macOS.',
  },
  {
    q: 'How many devices can I use?',
    a: 'Each license covers 2 devices at once. You can deactivate a device and move the seat to another one anytime.',
  },
  {
    q: 'Is there a free trial?',
    a: 'No trial, but there is a 14-day refund policy — no questions asked.',
  },
  {
    q: 'Do I get free updates?',
    a: `Yes. Minor updates (bug fixes, AE compatibility, new presets) are free for the life of your ${PRICE} license. Major version upgrades may be priced separately.`,
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. After the first activation the license is cached locally for 7 days, so you only need a connection once a week.',
  },
  {
    q: 'Do I need my own Claude account for the AI chat?',
    a: 'Yes — the chat panel drives your own Claude Pro or Max subscription. There is no extra fee on top of the plugin, and no API key to manage.',
  },
  {
    q: 'How do I install?',
    a: 'Download the .zxp after purchase and install it with the free ZXP Installer from aescripts.com. Takes about 30 seconds.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-[760px] px-6 py-28">
      <div className="plate-rule mb-20" />

      <div className="mb-12">
        <p className="plate-no mb-4">04 — FAQ</p>
        <h2
          className="misreg"
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: 'var(--text-primary)',
          }}
        >
          Questions, answered
        </h2>
      </div>

      <div>
        {FAQS.map((faq, i) => (
          <div key={faq.q} style={{ borderBottom: '1px solid var(--border)' }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: openIndex === i ? 'var(--text-primary)' : 'var(--text-default)',
                  transition: 'color .12s var(--ease-out)',
                }}
              >
                {faq.q}
              </span>
              <span
                aria-hidden
                style={{
                  marginLeft: 16,
                  flexShrink: 0,
                  fontSize: 18,
                  lineHeight: 1,
                  color: openIndex === i ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'transform .18s var(--ease-spring), color .12s var(--ease-out)',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  display: 'inline-block',
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div style={{ paddingBottom: 20, fontSize: 14, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
