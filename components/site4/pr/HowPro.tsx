'use client';
/* 05 How Pro works — the key, the launch price and the refund in one place, in `/ae`'s 05 slot right after the price sheet.
   🔴 The key list covers **only the launch set** (`PR_FEATURES[].launch`): one line per group below, shown while one of its ids is
      in the launch set. If a group leaves the launch set, this list and the price card change together.
   Pro toolkit in this release = one line of names under "what the key unlocks"; Pro tools not in this release = names only,
   **no dates** (source rule 3).
   Price + refund lines = what the terms in force say for a regular purchase: the launch price through `PR_EARLY_UNTIL`
   (`lib/pr.ts`), then the list price; a 14-day refund, with the refund policy linked for the details. */
import { Html, useT } from '@/components/site3p/lang';
import type { PrFeature } from '@/lib/product';
import { prLater, prLaunchSet, prProTools } from '@/lib/pr';
import Head from './Head';
import { joinNames } from './state';

const OPEN: { k: string; ids: PrFeature[] }[] = [
  { k: 'pr.how.open.cut', ids: ['autocut.advanced'] },
  { k: 'pr.how.open.cap', ids: ['captions.longform', 'captions.shortform'] },
  { k: 'pr.how.open.chat', ids: ['chat'] },
];

export default function HowPro() {
  const { t, lang } = useT();
  const launch = prLaunchSet() as PrFeature[];
  const later = prLater();
  const tools = prProTools();
  return (
    <section id="pro" data-plate="05" data-name="pr.plate.how">
      <div className="sec tight">
        <Head no="05" stone={7} k="pr.how.h" />
        <div className="posi">
          <Html k="pr.how.p" as="p" className="plain" />
        </div>
        <div className="howto">
          <div>
            <h3>{t('pr.how.now.h')}</h3>
            <p>{t('pr.how.now.p')}</p>
          </div>
          <div>
            <h3>{t('pr.how.open.h')}</h3>
            <ul>
              {OPEN.filter((g) => g.ids.some((id) => launch.includes(id))).map((g) => <li key={g.k}>{t(g.k)}</li>)}
              {tools.length ? <li>{t('pr.how.open.tools').split('{names}').join(joinNames(lang, tools.map((id) => t(`pr.f.${id}.name`))))}</li> : null}
            </ul>
          </div>
          <div>
            <h3>{t('pr.how.later.h')}</h3>
            <p>{t('pr.how.later.p')}</p>
            {later.length ? <p className="pr-more">{joinNames(lang, later.map((id) => t(`pr.f.${id}.name`)))}</p> : null}
          </div>
        </div>
        {/* the refund line carries a link, so the price + refund list sits in `.howto` (links there get the pen underline; links in `.posi .plain` stay bare) */}
        <div className="howto pr-one">
          <div>
            <ul>
              <li>{t('pr.how.price')}</li>
              <li dangerouslySetInnerHTML={{ __html: t('pr.how.refund') }} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
