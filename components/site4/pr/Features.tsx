'use client';
/* 03 Features — the v5 `/ae` 03 layout: cream cards alternating left/right on the red stem (`ae/PenTimeline.tsx`).
   Cards here are text only — there are no release-build panel captures yet (`/ae` §15.3: captures come from the release tag,
   and the page shows no Pro screens). When captures exist, a card gets `/ae`'s `figure.fig` back.
   Cards (each one drops when its features are not claimable, `lib/pr.ts`):
     silence cuts   autocut.basic
     toolkit        the free toolkit features that are on, one line each: name — claim — note (`pr.f.<id>.*`)
     Pro cut …      the Pro features outside the toolkit that are on (silence cut advanced · candidates · XML fast path · captions · Chat), same lines
     Pro toolkit    the Pro toolkit features that are on, same lines — approximations and what needs the buyer's own key are in the note
     can't do       honesty: what Premiere does not open to scripts (not a feature claim)
     in the works   features that are `off` in this release — names only, no claim, no date (source 4b)
   Pro features are described here as well as named in 04 / 05 (owner 2026-11-10: Pro ships in the same download, so the buyer reads what the
   key unlocks, honesty note included — the text is the PR repo's `feature-claims.json`). */
import { Html, useT } from '@/components/site3p/lang';
import type { PrFeature } from '@/lib/product';
import { T } from '@/lib/copy';
import { prClaimable, prFree, prIn, prLaunchSet, prPlanned, prProTools } from '@/lib/pr';
import { useReveal } from '@/components/site4/home/V5';
import PenTimeline from '@/components/site4/ae/PenTimeline';
import Head from './Head';

/* Not every feature has a note — `t()` returns the key for a missing key, so look in the dictionary itself. */
const hasNote = (id: PrFeature) => `pr.f.${id}.note` in T.en;

/* One line per feature: name — claim — note. */
function Claims({ ids }: { ids: PrFeature[] }) {
  const { t } = useT();
  return (
    <ul className="pr-claims">
      {ids.map((id) => (
        <li key={id}>
          <b>{t(`pr.f.${id}.name`)}</b>{t(`pr.f.${id}.claim`)}
          {hasNote(id) ? <i>{t(`pr.f.${id}.note`)}</i> : null}
        </li>
      ))}
    </ul>
  );
}

function Card({ i, children }: { i: number; children: React.ReactNode }) {
  return <div className="feat sweep" data-reveal style={{ ['--d' as string]: `${((i % 2) * 0.167).toFixed(3)}s` }}><div>{children}</div></div>;
}

export default function Features() {
  const { t, list } = useT();
  const ref = useReveal<HTMLElement>();
  const tools = prIn('toolkit').filter(prFree);
  const proCut = prLaunchSet().filter(prClaimable);
  const proTools = prProTools();
  const planned = prPlanned();
  const cards: React.ReactNode[] = [];
  if (prClaimable('autocut.basic')) cards.push(
    <>
      <h3>{t('pr.cut.h')}</h3>
      <Html k="pr.cut.p" as="p" />
      <p className="pr-note">{t('pr.cut.note')}</p>
    </>,
  );
  if (tools.length) cards.push(
    <>
      <h3>{t('pr.tools.h')}</h3>
      <Html k="pr.tools.p" as="p" />
      <Claims ids={tools} />
    </>,
  );
  if (proCut.length) cards.push(
    <>
      <h3>{t('pr.pro.h')}</h3>
      <p>{t('pr.pro.p')}</p>
      <Claims ids={proCut} />
    </>,
  );
  if (proTools.length) cards.push(
    <>
      <h3>{t('pr.protools.h')}</h3>
      <p>{t('pr.protools.p')}</p>
      <Claims ids={proTools} />
    </>,
  );
  cards.push(
    <>
      <h3>{t('pr.cant.h')}</h3>
      <p>{t('pr.cant.p')}</p>
      <ul>{list('pr.cant.li').map((s) => <li key={s}>{s}</li>)}</ul>
    </>,
  );
  if (planned.length) cards.push(
    <>
      <h3>{t('pr.planned.h')}</h3>
      <p>{t('pr.planned.p')}</p>
      <ul>{planned.map((id) => <li key={id}>{t(`pr.f.${id}.name`)}</li>)}</ul>
    </>,
  );
  return (
    <section id="what" ref={ref} data-plate="03" data-name="pr.plate.what">
      <div className="sec">
        <Head no="03" stone={4} k="pr.what.h" tag="pr.what.tag" />
        <PenTimeline>
          {cards.map((c, i) => <Card i={i} key={i}>{c}</Card>)}
        </PenTimeline>
      </div>
    </section>
  );
}
