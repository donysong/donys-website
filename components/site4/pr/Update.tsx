import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { prDate, t } from '@/lib/copy';
import { prFiles } from '@/lib/pr';
import { PR_RELEASES } from '@/lib/prReleases';

/* `/pr/update` · `/ko/pr/update` — where the panel sends people when a new version is out.

   🔴 The path is a **contract**: the panel's `version.json` (live on R2, `https://dl.younameit.works/pr/version.json`) carries `"url": "https://younameit.works/pr/update"`
   (PR repo `scripts/release/version-json.mjs` `RELEASE_NOTES_URL`), and the panel opens it from Settings ▸ Updates (Download page · What's new). Do not move or delete it.
   The panel opens the one address whatever the language of the panel, so a Korean reader lands on the English page first: the switch to `/ko/pr/update` sits in the first screen.
   Same shape as the AE page (`components/UpdateBody.tsx`): the current version and its download first, the history below. Not in the nav or the footer — people come from the panel
   (owner 2026-11-16); the footer's own "Release notes" link is the AE page's, as on `/pr/docs`.

   What goes where: file names and addresses = `lib/pr.ts` `prFiles` (through the `{winFile}` `{macFile}` `{zxpFile}` `{versionJson}` placeholders); the history = `lib/prReleases.ts` (a new release adds
   one entry there and bumps `PR.version`, nothing here); the words = `pr.upd.*` in `lib/copy/pr.ts`. How the panel updates itself (what the user sees, when it falls back to this page) is read from the
   PR repo: `src/update/` and the `update.*` strings (`src/i18n/update.en.ts`) — if that flow changes, `pr.upd.panel.*` changes with it. */
const LINKS = '[&_p_a]:underline! [&_li_a]:underline! [&_a]:underline-offset-4 [&_a]:font-semibold';
/* `.p3 … code` styles only a few containers (site4.css), so the sheet carries its own */
const CODE = '[&_code]:rounded-[3px] [&_code]:bg-[rgba(13,42,56,.07)] [&_code]:px-[5px] [&_code]:py-px [&_code]:font-mono [&_code]:text-[.88em] [&_code]:[overflow-wrap:anywhere]';
const H3 = 'mt-8 mb-2 text-[15px] font-bold';
const OL = 'ml-5 list-decimal space-y-1.5 text-[15px] leading-relaxed';

export default function PrUpdate({ lang }: { lang: 'en' | 'ko' }) {
  const T = (k: string) => t(lang, k);
  const html = (k: string) => ({ dangerouslySetInnerHTML: { __html: t(lang, k) } });
  const files = prFiles();
  const latest = PR_RELEASES[0];
  const back = lang === 'ko' ? '/ko/pr' : '/pr';
  const other = lang === 'ko' ? '/pr/update' : '/ko/pr/update';
  const steps = (os: 'win' | 'mac', n: number) => (
    <ol className={OL}>{Array.from({ length: n }, (_, i) => <li key={i} {...html(`pr.upd.${os}.li${i + 1}`)} />)}</ol>
  );
  return (
    <ReadingShell lang={lang} plate="pr.upd.plate" cta={{ href: '/pr', k: 's.toProduct.pr' }} prFooter>
      <header className={`max-w-3xl ${LINKS}`}>
        <p className="lab">You Name It PR Plugin</p>
        <InkTitle>{T('pr.upd.h')}</InkTitle>
        <p className="text-[17px] leading-relaxed">{T('pr.upd.intro')}</p>
        <p className="mt-3 text-sm">
          <a href={other} hrefLang={lang === 'en' ? 'ko' : 'en'}>{T('pr.upd.lang')}</a>
          {' · '}
          <a href={back}>{T('pr.docs.back')}</a>
        </p>
      </header>

      <div id="update" className={`sheet mt-10 max-w-3xl [--m:1] ${LINKS} ${CODE}`}>
        <p className="lab">{T('pr.upd.cur')}</p>
        <h2 className="mt-2 mb-4 text-2xl font-extrabold tracking-tight">
          v{latest.version} <span className="text-base font-semibold opacity-70">· {prDate(lang, latest.date)}</span>
        </h2>
        <p className="text-[15px] leading-relaxed">{T('pr.upd.req')}</p>
        {/* Outline buttons: the filled button is for buying only (REBRAND §9.9 ③). The file name under each one is what lands in the Downloads folder. */}
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-5">
          {([['win', files.win], ['mac', files.mac]] as const).map(([os, f]) => (
            <div key={os}>
              <a className="btn-line" href={f.url} data-cur>{T(`pr.upd.dl.${os}`)}</a>
              <p className="mt-2 text-xs opacity-70 [overflow-wrap:anywhere]">{f.name}</p>
            </div>
          ))}
        </div>

        <h3 id="panel" className={H3}>{T('pr.upd.panel.h')}</h3>
        <div className="space-y-3 text-[15px] leading-relaxed">
          {['p1', 'p2', 'p3'].map((p) => <p key={p} {...html(`pr.upd.panel.${p}`)} />)}
        </div>

        <h3 id="hand" className={H3}>{T('pr.upd.hand.h')}</h3>
        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-bold">{T('pr.upd.win.h')}</h4>
            {steps('win', 4)}
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold">{T('pr.upd.mac.h')}</h4>
            {steps('mac', 4)}
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed" {...html('pr.upd.guide')} />

        <h3 id="verify" className={H3}>{T('pr.upd.sum.h')}</h3>
        <div className="space-y-3 text-[15px] leading-relaxed">
          <p {...html('pr.upd.sum.p1')} />
          <ul className="list-disc space-y-1.5 pl-5">
            {['win', 'mac'].map((os) => <li key={os} {...html(`pr.upd.sum.${os}`)} />)}
          </ul>
          <p {...html('pr.upd.sum.p2')} />
        </div>

        <h3 id="help" className={H3}>{T('pr.upd.help.h')}</h3>
        <p className="text-[15px] leading-relaxed" {...html('pr.upd.help')} />
      </div>

      <div className="mt-16">
        {PR_RELEASES.map((r) => (
          /* One anchor per version (`#v1.0.0`), like the AE page. */
          <article key={r.version} id={`v${r.version}`} className="rel">
            <h2 className="m-0 flex flex-wrap items-baseline gap-[18px]">
              <span className="v">v{r.version}</span>
              <span className="d">{prDate(lang, r.date)}</span>
            </h2>
            <ul>{r.items[lang].map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p className={`mt-4 text-[13px] ${CODE}`}>
              {T('pr.upd.rel.sha')}: <code className="[overflow-wrap:anywhere]">{r.sha256}</code>
            </p>
          </article>
        ))}
      </div>
    </ReadingShell>
  );
}
