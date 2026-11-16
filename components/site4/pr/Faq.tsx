'use client';
/* 06 FAQ — the v5 `/ae` 06 (`details.qa` · summary = question + one-word verdict · GSAP disclosure `useDisclosure`).
   Source = PR repo `gtm/site/pr-faq.md`; groups: work · technical · license · buying Pro (buy1–buy4 replace q20 refund in this shape).
   Left out against the source: q7 (merged into q28, the candidates entry) · q16 (Korean input box, spike D1 still open) · q20 (→ buy3).
   New: `mac` (does it work on a Mac: yes, four limits; owner 2026-11-16, variant `launch/pr-v5e`) · q28 filler and NG-take candidates · q29 skin smoothing · q30 speed ramp · q31 on-device
   transcription (owner 2026-11-11: those features are in the release, so their honesty labels are answers here) · q32 FX Search shortcut (Ctrl+Space
   takes a Premiere shortcut) · q33 FX Search undo (Ctrl+Z, no plugin undo) · q34 Ease curve (baked keyframes, approximate; owner 2026-11-15).
   Tags: a question drops when none of its features is claimable. q21 drops once the AE code expires (`PR.aeCouponEnd`). */
import { Html, useT } from '@/components/site3p/lang';
import { useRef } from 'react';
import { useDisclosure } from '@/components/site4/motion';
import { PR, type PrFeature } from '@/lib/product';
import { prAny } from '@/lib/pr';
import Head from './Head';
import { usePr } from './state';

const TAGS: Record<string, PrFeature[]> = {
  q2: ['autocut.basic'],
  q4: ['captions.longform'],
  q5: ['chat'],
  q6: ['chat'],
  q8: ['autocut.advanced', 'captions.longform', 'chat'],
  q15: ['keyauto'],
  q28: ['autocut.filler', 'autocut.ngTakes'],
  q29: ['beauty'],
  q30: ['speedramp'],
  q31: ['captions.longform'],
  q32: ['fxconsole'],
  q33: ['fxconsole'],
  q34: ['easecurve'],
};

const GROUPS: { lab: string; qs: string[] }[] = [
  { lab: 'pr.faq.g1', qs: ['q1', 'q2', 'q3', 'q28', 'q29', 'q30', 'q34', 'q32', 'q33', 'q6', 'q9', 'q10', 'q8'] },
  { lab: 'pr.faq.g2', qs: ['q11', 'mac', 'q12', 'q13', 'q14', 'q15', 'q31', 'q17'] },
  { lab: 'pr.faq.g3', qs: ['q18', 'q19', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27'] },
  { lab: 'pr.faq.g4', qs: ['buy1', 'buy2', 'buy3', 'buy4', 'q4', 'q5'] },
];

export default function Faq() {
  const { t } = useT();
  const { aeCoupon } = usePr();
  const ref = useRef<HTMLElement>(null);
  useDisclosure(ref);   // open height · fade · ↑↓ Home End (motion.ts)
  const shown = (q: string) => (!TAGS[q] || prAny(TAGS[q])) && (q !== 'q21' || aeCoupon);
  const answer = (q: string) => {
    if (q === 'q12' && !PR.companion) return t('pr.faq.q12.a.nocx');
    return t(`pr.faq.${q}.a`);
  };
  return (
    <section ref={ref} id="faq" data-plate="06" data-name="pr.plate.faq">
      <div className="sec tight">
        <Head no="06" stone={1} k="pr.faq.h" tag="pr.faq.tag" />
        {GROUPS.map((g) => {
          const qs = g.qs.filter(shown);
          return qs.length ? (
            <div className="faq-group" key={g.lab}>
              <span className="lab">{t(g.lab)}</span>
              {qs.map((q) => (
                <details className="qa" key={q} data-faq={q}>
                  <summary data-cur>
                    <span className="q">{t(`pr.faq.${q}.q`)}</span>
                    <span className="verdict">{t(`pr.faq.${q}.v`)}</span>
                  </summary>
                  <div className="a-wrap"><p className="a" dangerouslySetInnerHTML={{ __html: answer(q) }} /></div>
                </details>
              ))}
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}

/* Specs, 9 fields — no plate number (same as `/ae`). One sheet with the FAQ (PrPage wraps both in `.onnote`). */
const FIELDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Specs() {
  const { t } = useT();
  const n = (i: number) => (i === 3 && !PR.companion ? t('pr.sp3.n.nocx') : t(`pr.sp${i}.n`));
  return (
    <section id="specs">
      <div className="sec" style={{ paddingTop: 0 }}>
        <h3 className="lab" style={{ marginBottom: 18, color: 'var(--typeink)' }}>{t('pr.spec.h')}</h3>
        <div className="specs">
          {FIELDS.map((i) => (
            <div className="f" key={i}>
              <span className="k lab">{t(`pr.sp${i}.k`)}</span>
              <span className="v">
                {t(`pr.sp${i}.v`)}
                <span className="n" dangerouslySetInnerHTML={{ __html: n(i) }} />
              </span>
            </div>
          ))}
        </div>
        <Html k="pr.tm" as="p" className="pr-tm" />
      </div>
    </section>
  );
}
