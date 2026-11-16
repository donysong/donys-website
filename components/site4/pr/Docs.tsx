import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { T, list, t } from '@/lib/copy';
import type { PrFeature } from '@/lib/product';
import { prClaimable, prFree, prIn, prLaunchSet, prPlanned, prProTools } from '@/lib/pr';

/* `/pr/docs` · `/ko/pr/docs` — the detail the `/pr` 03 blocks link to (owner 2026-11-16: "the detailed feature text goes to the Docs").
   Same claims as before, moved here from the long cards: every tool with its note, what Premiere cannot do, the Mac limits and what is
   not in this release. Source text = `lib/copy/pr.ts` (`pr.cut.*` `pr.tools.*` `pr.pro.*` `pr.protools.*` `pr.cant.*` `pr.mac.*` `pr.planned.*`
   and each feature's `pr.f.<id>.*`), which `tools/pr.test.mjs` keeps in step with the PR repo's `gtm/site/feature-claims.json`.
   Anchors the blocks use: #silence · #toolkit · #pro (captions, Chat, the other Pro cutting features) · #protools · #cant · #mac. */
const H2 = 'mt-12 mb-3 scroll-mt-24 text-xl font-semibold text-[var(--text-primary)]';
const hasNote = (id: PrFeature) => `pr.f.${id}.note` in T.en;

function Claims({ lang, ids }: { lang: 'en' | 'ko'; ids: PrFeature[] }) {
  return (
    <ul className="mt-3 list-disc space-y-3 pl-5">
      {ids.map((id) => (
        <li key={id}>
          <b className="block font-extrabold">{t(lang, `pr.f.${id}.name`)}</b>
          {t(lang, `pr.f.${id}.claim`)}
          {hasNote(id) ? <i className="mt-1 block text-[13px] not-italic opacity-80">{t(lang, `pr.f.${id}.note`)}</i> : null}
        </li>
      ))}
    </ul>
  );
}

export default function PrDocs({ lang }: { lang: 'en' | 'ko' }) {
  const tools = prIn('toolkit').filter(prFree);
  const proCut = prLaunchSet().filter(prClaimable);
  const proTools = prProTools();
  const planned = prPlanned();
  const back = lang === 'ko' ? '/ko/pr' : '/pr';
  return (
    <ReadingShell lang={lang} plate="pr.docs.plate" cta={{ href: '/pr', k: 's.toProduct.pr' }} prFooter>
      <header className="max-w-3xl">
        <p className="lab">You Name It PR Plugin</p>
        <InkTitle>{t(lang, 'pr.docs.h')}</InkTitle>
        <p className="text-sm">{t(lang, 'pr.docs.intro')}</p>
        <p className="mt-3 text-sm"><a href={back} className="underline underline-offset-4">{t(lang, 'pr.docs.back')}</a></p>
      </header>
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="text-[15px] leading-relaxed text-[var(--text-secondary)] [&>:first-child]:mt-0">
          {prClaimable('autocut.basic') ? (
            <section id="silence">
              <h2 className={H2}>{t(lang, 'pr.cut.h')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t(lang, 'pr.cut.p') }} />
              <p className="mt-3 text-sm opacity-80">{t(lang, 'pr.cut.note')}</p>
            </section>
          ) : null}
          {tools.length ? (
            <section id="toolkit">
              <h2 className={H2}>{t(lang, 'pr.tools.h')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t(lang, 'pr.tools.p') }} />
              <Claims lang={lang} ids={tools} />
            </section>
          ) : null}
          {proCut.length ? (
            <section id="pro">
              <h2 className={H2}>{t(lang, 'pr.pro.h')}</h2>
              <p>{t(lang, 'pr.pro.p')}</p>
              <Claims lang={lang} ids={proCut} />
            </section>
          ) : null}
          {proTools.length ? (
            <section id="protools">
              <h2 className={H2}>{t(lang, 'pr.protools.h')}</h2>
              <p>{t(lang, 'pr.protools.p')}</p>
              <Claims lang={lang} ids={proTools} />
            </section>
          ) : null}
          <section id="cant">
            <h2 className={H2}>{t(lang, 'pr.cant.h')}</h2>
            <p>{t(lang, 'pr.cant.p')}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">{list(lang, 'pr.cant.li').map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
          <section id="mac">
            <h2 className={H2}>{t(lang, 'pr.mac.h')}</h2>
            <p>{t(lang, 'pr.mac.p')}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">{list(lang, 'pr.mac.li').map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
          {planned.length ? (
            <section id="planned">
              <h2 className={H2}>{t(lang, 'pr.planned.h')}</h2>
              <p>{t(lang, 'pr.planned.p')}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">{planned.map((id) => <li key={id}>{t(lang, `pr.f.${id}.name`)}</li>)}</ul>
            </section>
          ) : null}
        </div>
      </div>
    </ReadingShell>
  );
}
