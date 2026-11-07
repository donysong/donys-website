'use client';
/* 02 What it is — myth line, then the plain line that pays it back (v5 `/ae` 02 `.posi`), then three cells (`.howto`, the
   Docs vocabulary): not a subscription · silence cuts free · originals stay.
   Every `{names}` slot is filled from claimable features only (`lib/pr.ts`) — the source says "rewrite it from the features that are on".
     pr.posi.plain   chores it takes (silence cuts · bin cleanup)           — `pr.f.<id>.ex`
     pr.diff2.free   the other free tools                                   — `pr.f.<id>.name`, line drops when none
     pr.safe.li1     work done on a copy / new tracks (silence cuts)        — `pr.f.<id>.ex`
     pr.safe.li2     tools on the selected clips with plugin undo (Offset · Anchor point)
   FX Console is not in li2: it has no plugin undo (PR repo PRD §0, principle-1 exception, W6.4). */
import { Html, useT } from '@/components/site3p/lang';
import type { PrFeature } from '@/lib/product';
import { prClaimable } from '@/lib/pr';
import Head from './Head';
import { joinNames } from './state';

const CHORES: PrFeature[] = ['autocut.basic', 'bins'];
const FREE_TOOLS: PrFeature[] = ['offset', 'anchor', 'bins', 'watchfolder', 'assets'];
const ON_COPY: PrFeature[] = ['autocut.basic'];
const DIRECT: PrFeature[] = ['offset', 'anchor'];

export default function Posi() {
  const { t, lang } = useT();
  const names = (ids: PrFeature[], part: 'ex' | 'name') => joinNames(lang, ids.filter(prClaimable).map((id) => t(`pr.f.${id}.${part}`)));
  const fill = (k: string, s: string) => t(k).split('{names}').join(s);
  const chores = names(CHORES, 'ex');
  const tools = names(FREE_TOOLS, 'name');
  const onCopy = names(ON_COPY, 'ex');
  const direct = names(DIRECT, 'name');
  return (
    <section id="posi" className="onnote" data-plate="02" data-name="pr.plate.posi">
      <div className="sec tight">
        <Head no="02" stone={5} k="pr.plate.posi" />
        <div className="posi">
          <Html k="pr.posi.myth" as="p" className="myth" />
          <div>
            <p className="plain" dangerouslySetInnerHTML={{ __html: fill('pr.posi.plain', chores) }} />
            <Html k="pr.posi.plain2" as="p" className="plain" style={{ marginTop: 16, opacity: 0.82 }} />
          </div>
        </div>

        <div className="howto pr-diff">
          <div>
            <h3>{t('pr.diff1.h')}</h3>
            <Html k="pr.diff1.p" as="p" />
          </div>
          {prClaimable('autocut.basic') ? (
            <div>
              <h3>{t('pr.diff2.h')}</h3>
              <Html k="pr.diff2.p" as="p" />
              {tools ? <p className="pr-more">{fill('pr.diff2.free', tools)}</p> : null}
            </div>
          ) : null}
          <div>
            <h3>{t('pr.safe.h')}</h3>
            <Html k="pr.safe.p" as="p" />
            <ul>
              {onCopy ? <li dangerouslySetInnerHTML={{ __html: fill('pr.safe.li1', onCopy) }} /> : null}
              {direct ? <li dangerouslySetInnerHTML={{ __html: fill('pr.safe.li2', direct) }} /> : null}
              <li>{t('pr.safe.li3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
