'use client';

import Plate from './Plate';
import { COUNTS } from '@/lib/product';

/* 카탈로그 — 🔴 균등 7카드 금지 (계획서 §4). 2단 위계다:
   대형 2(Chat · Toolbox) + 소형 5. 숫자는 전부 lib/product.ts 에서 읽는다.

   프레이밍: 홍보 이미지는 4:3 통짜 카드(자체 카피 포함)라 그대로 넣으면 글자가 뭉개진다.
   🔴 잘라서 별도 PNG 로 저장하지 마라 — 원본은 tools/promo 에서 다시 구워진다. CSS 가 자른다. */
const BIG = [
  {
    tag: 'Chat',
    title: 'Describe it, in your words',
    body: `Claude works inside your project with ${COUNTS.tools} tools and ${COUNTS.skills} skills — reading your comp, building on your layers. Runs on your own Claude subscription, no API key.`,
    img: '/images/promo/f-chat.webp',
    zoom: '250%',
    pos: '70% 50%',
  },
  {
    tag: 'Scripts',
    title: 'Toolbox',
    body: `${COUNTS.scripts} one-click utilities — parenting, nulls, sequencing, GIF export, RGB split — across every selected layer at once. Arrange the panel the way you work.`,
    img: '/images/promo/f-toolbox.webp',
    zoom: '265%',
    pos: '70% 53%',
  },
];

const SMALL = [
  { tag: 'Motion', title: 'Motion presets', n: COUNTS.motion, body: 'Archetypes you re-tune from Effect Controls after they land.', img: '/images/promo/f-motion.webp' },
  { tag: 'Text', title: 'Text presets', n: COUNTS.textPresets, body: 'Per-character animation, variable-font axes on AE 26.', img: '/images/promo/f-text.webp' },
  { tag: 'Color', title: 'Gradients', n: COUNTS.gradients, body: 'Real AE ramps or 3-stop tritone, sorted by mood.', img: '/images/promo/f-gradient.webp' },
  { tag: 'Easing', title: 'Curve presets', n: COUNTS.curves, body: 'Read a curve off a key, reshape it, apply it back.', img: '/images/promo/f-graph.webp' },
  { tag: 'Code', title: 'Expressions', n: COUNTS.expressions, body: 'A live editor that applies as you type, on the right property.', img: '/images/promo/f-expr.webp' },
];

export default function Press() {
  return (
    <section id="press" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
            Plate 04 / 07 — what’s in the box
          </p>
          <h2 className="headline">
            <Plate as="span" tone="black">One panel, seven tools.</Plate>
          </h2>
        </div>
        <p style={{ maxWidth: '36ch', fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Every one of them writes to your real project. Nothing here is a preview that you have to
          bake before you can touch it.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        {BIG.map((f) => (
          <article key={f.title} className="plate-card">
            <div className="stock-black" style={{ padding: 16 }}>
              <div
                className="screen"
                style={{ aspectRatio: '16 / 10' }}
                role="img"
                aria-label={`The ${f.tag} panel inside After Effects`}
              >
                <span
                  className="shot"
                  style={{ backgroundImage: `url(${f.img})`, backgroundSize: f.zoom, backgroundPosition: f.pos }}
                />
              </div>
              <div style={{ padding: '18px 6px 4px' }}>
                <p className="mono" style={{ color: 'var(--paper)', marginBottom: 8 }}>{f.tag}</p>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: '-.02em',
                    color: 'var(--ink-white)',
                    fontVariationSettings: "'ROND' 100, 'wdth' 106",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#b9c4c9', maxWidth: '46ch' }}>{f.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {SMALL.map((f) => (
          <article key={f.title} className="card-rim">
            <div className="card" style={{ padding: '18px 18px 20px' }}>
              <p
                className="mono num"
                style={{ color: 'var(--ink-red)', marginBottom: 10, fontSize: 22, letterSpacing: '-.01em' }}
              >
                {f.n}
              </p>
              <h3 style={{ margin: '0 0 6px', fontSize: 15.5, fontWeight: 700, color: 'var(--ink-black)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: '#4a5257' }}>{f.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
