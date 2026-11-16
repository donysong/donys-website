'use client';
/* 03 Features — the v5 `/ae` 03 shape (`ae/Features.tsx`): a picture on the left, a claim heading and ONE short paragraph on the right,
   cream cards on the red stem (`ae/PenTimeline.tsx`). Owner 2026-11-16: "put the product UI in the blocks, shorten the text, match the AE page,
   the detail goes to the Docs". Everything that used to be a long card here (every tool with its note, what Premiere cannot do, the Mac
   limits, what is not in this release) now lives on `/pr/docs` (`pr/Docs.tsx`); the blocks link there.
   Pictures = `public/pr/feat-<silence|captions|chat|tools>-<en|ko>.webp`: the product's own panels rendered in a browser on a sample sequence
   (Mock Premiere), composed on a 16:9 paper. Not Premiere windows. Re-shoot = PR repo `node scripts/preview/serve.mjs`.
   Blocks (each drops when its feature is not claimable, `lib/pr.ts`): silence cut · captions · Chat · the toolbox. */
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import type { PrFeature } from '@/lib/product';
import { prClaimable, prFree, prIn } from '@/lib/pr';
import { useReveal } from '@/components/site4/home/V5';
import PenTimeline from '@/components/site4/ae/PenTimeline';
import Head from './Head';
import { joinNames } from './state';

const BLOCKS: { k: string; img: string; gate: PrFeature | null; pro: boolean; more: string }[] = [
  { k: 'pr.v5.f1', img: 'silence', gate: 'autocut.basic', pro: false, more: '#silence' },
  { k: 'pr.v5.f2', img: 'captions', gate: 'captions.longform', pro: true, more: '#pro' },
  { k: 'pr.v5.f3', img: 'chat', gate: 'chat', pro: true, more: '#pro' },
  { k: 'pr.v5.f4', img: 'tools', gate: null, pro: false, more: '#toolkit' },
];

export default function Features() {
  const { t, lang } = useT();
  const href = useHref();
  const ref = useReveal<HTMLElement>();
  const free = joinNames(lang, prIn('toolkit').filter(prFree).map((id) => t(`pr.f.${id}.name`)));
  const blocks = BLOCKS.filter((b) => !b.gate || prClaimable(b.gate));
  return (
    <section id="what" ref={ref} data-plate="03" data-name="pr.plate.what">
      <div className="sec">
        <Head no="03" stone={4} k="pr.what.h" tag="pr.what.tag" />
        <PenTimeline>
          {blocks.map((b, i) => (
            <div className="feat sweep" data-reveal key={b.k} style={{ ['--d' as string]: `${((i % 2) * 0.167).toFixed(3)}s` }}>
              <figure className="fig">
                <figure className="spot-fig">
                  <img src={`/pr/feat-${b.img}-${lang}.webp`} alt={t(`${b.k}.alt`)} width={1600} height={900} loading="lazy" decoding="async" />
                  <figcaption className="cap" style={{ marginTop: 12 }}>{t(`${b.k}.cap`)}</figcaption>
                </figure>
              </figure>
              <div>
                {b.pro ? <span className="stamp red v5-pro"><span className="dot" />{t('ae.v5.pro')}</span> : null}
                <h3>{t(`${b.k}.h`)}</h3>
                <p>{t(`${b.k}.p1`).split('{names}').join(free)}</p>
                <a className="feat-more" href={href(`/pr/docs${b.more}`)} data-cur>{t('pr.v5.more')} <span aria-hidden="true">→</span></a>
              </div>
            </div>
          ))}
        </PenTimeline>
        <div className="docs-cta">
          <span className="txt">{t('pr.v5.docs.txt')}</span>
          <a className="btn-line" href={href('/pr/docs')} data-cur>{t('pr.v5.docs.btn')} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
