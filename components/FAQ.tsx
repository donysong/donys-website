'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Which AE versions are supported?',
    a: 'After Effects 2022 (v22.0) and above on both Windows and macOS.',
  },
  {
    q: 'How many devices can I use?',
    a: 'Each license supports up to 2 devices simultaneously. You can deactivate a device and transfer to another anytime.',
  },
  {
    q: 'Is there a free trial?',
    a: "No free trial, but we offer a 14-day refund policy — no questions asked.",
  },
  {
    q: 'Do I get free updates?',
    a: 'Yes! All minor updates (bug fixes, AE compatibility, preset additions) are free. Major version upgrades (v2.0+) may be priced separately.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. After initial activation, the license is cached locally for 7 days. You only need internet once a week for re-verification.',
  },
  {
    q: 'How do I install?',
    a: 'Download the .zxp file after purchase, then install using the free ZXP Installer from aescripts.com. Takes about 30 seconds.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-[700px] px-6 py-32">
      <div className="section-divider mb-24" />

      <div className="mb-16">
        <p className="label mb-4">FAQ</p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
          }}
        >
          Frequently asked questions
        </h2>
      </div>

      <div>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 0',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: openIndex === i ? 'var(--text-primary)' : 'var(--text-default)',
                  transition: 'color 0.08s ease',
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  marginLeft: 16,
                  flexShrink: 0,
                  fontSize: 16,
                  lineHeight: 1,
                  color: 'var(--text-muted)',
                  transition: 'transform 0.12s ease, color 0.08s ease',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  display: 'inline-block',
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div
                style={{
                  paddingBottom: 18,
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
