'use client';
/* 05 Pre-order — how it works (source `pr-page.preorder.md` "New block"), in `/ae`'s 05 slot right after the price sheet.
   🔴 The promise covers **only the launch set** (`PR_FEATURES[].launch`): one line per group below, shown while one of its ids is
      in the launch set. If a group leaves the opening update, this list and the pre-order email (PR repo `gtm/email/03`) change together.
   Pro toolkit in this release = one line of names under "what the key unlocks"; Pro tools not in this release = names only,
   **no dates** (source rule 3). The checkout-open date shows only until that day.
   Terms lines = facts.md: pre-order price until Pro opens + `openEarlyDays` after, refund any time before opening, long-stop. */
import { Html, useT } from '@/components/site3p/lang';
import type { PrFeature } from '@/lib/product';
import { prLater, prLaunchSet, prProTools } from '@/lib/pr';
import Head from './Head';
import { joinNames, usePr } from './state';

const OPEN: { k: string; ids: PrFeature[] }[] = [
  { k: 'prp.open.cut', ids: ['autocut.advanced'] },
  { k: 'prp.open.cap', ids: ['captions.longform', 'captions.shortform'] },
  { k: 'prp.open.chat', ids: ['chat'] },
];

export default function Preorder() {
  const { t, list, lang } = useT();
  const { open } = usePr();
  const launch = prLaunchSet() as PrFeature[];
  const later = prLater();
  const tools = prProTools();
  return (
    <section id="preorder" data-plate="05" data-name="pr.plate.prp">
      <div className="sec tight">
        <Head no="05" stone={7} k="prp.h" />
        <div className="posi">
          <Html k="prp.p" as="p" className="plain" />
          <div>
            <Html k="prp.why" as="p" className="plain" style={{ opacity: 0.82 }} />
            {open('pro') ? null : <p className="plain pr-when">{t('prp.when')}</p>}
          </div>
        </div>
        <div className="howto">
          <div>
            <h3>{t('prp.now.h')}</h3>
            <p>{t('prp.now.p')}</p>
          </div>
          <div>
            <h3>{t('prp.open.h')}</h3>
            <ul>
              {OPEN.filter((g) => g.ids.some((id) => launch.includes(id))).map((g) => <li key={g.k}>{t(g.k)}</li>)}
              {tools.length ? <li>{t('prp.open.tools').split('{names}').join(joinNames(lang, tools.map((id) => t(`pr.f.${id}.name`))))}</li> : null}
            </ul>
          </div>
          <div>
            <h3>{t('prp.later.h')}</h3>
            <p>{t('prp.later.p')}</p>
            {later.length ? <p className="pr-more">{joinNames(lang, later.map((id) => t(`pr.f.${id}.name`)))}</p> : null}
          </div>
        </div>
        <div className="howto pr-one">
          <div>
            <ul>{list('prp.terms').map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
