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
    <section id="faq" className="section-fade mx-auto max-w-2xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent-light)]">
          FAQ
        </p>
        <h2 className="text-3xl font-bold tracking-tight md:text-[2.5rem]">
          Frequently asked questions
        </h2>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--border-hover)]"
          >
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-[15px] font-medium">{faq.q}</span>
              <svg
                className="ml-4 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200"
                style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
