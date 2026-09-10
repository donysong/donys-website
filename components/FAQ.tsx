'use client';

import Plate from './Plate';
import { PRICE } from '@/lib/product';

/* 🔴 첫 문항은 스탠스 방어다 (계획서 §5). 지우지 마라 — 우리는 "브리프 하나로 완성 영상"
   을 팔지 않는다고 선언했고(루트 CLAUDE.md §🎯), 시장의 AE AI 패널 8종은 전부 그 반대를
   판다. 사는 사람이 제일 먼저 하는 질문이 이것이다. */
const FAQ = [
  {
    q: 'Does it make the video for me?',
    a: 'No. You decide what should happen; the panel builds it on your layers so you can keep working on it. There is no “one prompt, finished film” button here, and there is not going to be one.',
  },
  {
    q: 'Which After Effects versions are supported?',
    a: 'After Effects 2022 (v22.0) and above, on both Windows and macOS.',
  },
  {
    q: 'How many devices can I use?',
    a: 'Each licence covers 2 devices at once. You can deactivate a device and move the seat to another one anytime.',
  },
  {
    q: 'Is there a free trial?',
    a: 'No trial, but there is a 14-day refund policy — no questions asked.',
  },
  {
    q: 'Do I get free updates?',
    a: `Yes. Minor updates (fixes, AE compatibility, new presets) are free for the life of your ${PRICE} licence. Major version upgrades may be priced separately.`,
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. After the first activation the licence is cached locally for 7 days, so you only need a connection once a week.',
  },
  {
    q: 'Do I need my own Claude account for the chat?',
    a: 'Yes — the chat panel drives your own Claude Pro or Max subscription. No extra fee on top of the plugin, and no API key to manage.',
  },
  {
    q: 'How do I install it?',
    a: 'Download the .zxp after purchase and install it with the free ZXP Installer from aescripts.com. It takes about 30 seconds.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
        Plate 08 / 08 — questions
      </p>
      <h2 className="headline" style={{ marginBottom: 34 }}>
        <Plate as="span" tone="black">Asked and answered.</Plate>
      </h2>

      {/* T3 — 읽는 면은 흰 종이 위다 (globals.css 3단 규약) */}
      <div className="sheet" style={{ maxWidth: 900 }}>
        {FAQ.map((item) => (
          <details
            key={item.q}
            style={{ borderTop: '1.5px solid var(--line)', padding: '18px 0' }}
          >
            <summary
              style={{
                cursor: 'pointer',
                listStyle: 'none',
                fontSize: 16.5,
                fontWeight: 700,
                color: 'var(--ink-black)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 20,
              }}
            >
              {item.q}
              <span aria-hidden className="mono" style={{ color: 'var(--ink-black)' }}>+</span>
            </summary>
            <p
              style={{
                marginTop: 12,
                maxWidth: '62ch',
                fontSize: 15,
                lineHeight: 1.65,
                color: '#3c454a',
              }}
            >
              {item.a}
            </p>
          </details>
        ))}
        <div style={{ height: 1.5, background: 'rgba(0,0,0,.12)' }} />
      </div>
    </section>
  );
}
