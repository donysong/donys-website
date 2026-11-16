'use client';
/* 01 Who — the same cards as v5 `/ae` 01 (`article.role.gridp > div.in + div.say`, house contract; 6fps weave entrance).
   Each card carries the feature ids it talks about; a card stays while any of them is claimable (`lib/pr.ts` `prAny`).
   The source's four cards are all here again (owner 2026-11-10: Pro ships in the same download, and the Pro features are described).
   The red plate says "what you do" (the press order), not `/ae`'s "what you'd say", so its quotes are off (`q.pr-act`).
   `data-n` = card count — two cards must not sit in a four-column grid. */
import { Html, useT } from '@/components/site3p/lang';
import { prAny } from '@/lib/pr';
import type { PrFeature } from '@/lib/product';
import { useReveal } from '@/components/site4/home/V5';
import Head from './Head';

const CARDS: { k: string; tags: PrFeature[] }[] = [
  { k: 'r1', tags: ['autocut.basic'] },
  { k: 'r2', tags: ['facetrack', 'captions.shortform'] },
  { k: 'r3', tags: ['watchfolder', 'bins'] },
  { k: 'r4', tags: ['chat'] },
];

export default function Who() {
  const { t } = useT();
  const ref = useReveal<HTMLElement>();
  const cards = CARDS.filter((c) => prAny(c.tags));
  return (
    <section id="who" ref={ref} data-plate="01" data-name="pr.plate.who">
      <div className="sec tight">
        <Head no="01" stone={2} k="pr.who.h" tag="pr.who.tag" />
        <div className="roles sweep" data-n={cards.length}>
          {cards.map((c, i) => (
            <article className="role gridp" tabIndex={0} data-cur key={c.k} data-reveal style={{ ['--d' as string]: `${(i * 0.167).toFixed(3)}s` }}>
              <div className="in">
                <div className="top"><span className="lab lc">{t('pr.role.l')}</span><i>{String(i + 1).padStart(2, '0')}</i></div>
                <h3>{t(`pr.${c.k}.h`)}</h3>
                <p>{t(`pr.${c.k}.p`)}</p>
                <div className="hint">{t('pr.role.hint')}</div>
              </div>
              <div className="say">
                <b>{t('pr.role.say')}</b>
                <Html k={`pr.${c.k}.q`} as="q" className="pr-act" />
                <small>{t(`pr.${c.k}.s`)}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
