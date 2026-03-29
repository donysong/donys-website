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
    <section id="faq" className="mx-auto max-w-3xl px-6 py-28">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] transition hover:border-neutral-600"
          >
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium">{faq.q}</span>
              <span className="ml-4 text-neutral-500 transition" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'none' }}>
                +
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-[var(--border)] px-6 py-4 text-sm leading-relaxed text-neutral-400">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
