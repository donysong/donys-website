import PrPage from '@/components/site4/pr/PrPage';
import { PrProvider } from '@/components/site4/pr/state';
import { LangProvider } from '@/components/site3p/lang';
import { SITE } from '@/lib/product';
import { prJsonLd } from '@/lib/pr';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

/* `/pr` — You Name It PR Plugin sales page (EN). KO = `app/(ko)/ko/pr/page.tsx`.
   🔴 Meta text comes from the dictionary (`lib/copy/pr.ts` `pr.meta.*`).
   The layout template (`%s — You Name It`) adds the brand to the title — do not write it again here.
   Share card = the one site card (`lib/meta.ts`, owner 2026-10-17). canonical is declared per page (a root canonical makes
   every child page "a duplicate of home"). */
export const metadata = {
  title: t('en', 'pr.meta.title'),
  description: t('en', 'pr.meta.desc'),
  alternates: {
    canonical: '/pr',
    languages: { en: '/pr', ko: '/ko/pr', 'x-default': '/pr' },
  },
  ...share({
    path: '/pr',
    title: 'You Name It PR Plugin',
    description: t('en', 'pr.meta.desc'),
    lang: 'en',
  }),
};

/* Build time — the baked HTML's checkout gates and AE-code offer use this instant. The browser re-decides with its own clock (`state.tsx`). */
const BUILT_AT = Date.now();

export default function Pr() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(prJsonLd(SITE, '/pr', t('en', 'pr.meta.desc'))) }} />
      <LangProvider initial="en">
        <PrProvider builtAt={BUILT_AT}>
          <PrPage />
        </PrProvider>
      </LangProvider>
    </>
  );
}
