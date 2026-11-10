'use client';
/* `/pr` — You Name It PR Plugin sales page, launch shape = free version + Pro pre-order (owner, 2026-11-07).
   Source copy = PR repo `gtm/site/pr-page.preorder.md` over `pr-page.full.md`. Skeleton = v5 `/ae` (AePage.tsx), so the two
   product pages read as one site: cover → 01 who → 02 what it is → 03 features → 04 free · Pro → 05 pre-order (in `/ae`'s
   05 slot) → 06 FAQ + specs (one sheet) → 07 install. Paper alternates blue ↔ note exactly like `/ae` (01 blue, 02 note …).
   No video in the cover (owner: no demo at launch) — the two circles sit together.

   🔴 Every purchase CTA here is **PR Pro checkout** (rail · cover circle · price button · footer). Never the AE checkout —
      the shell defaults to AE, so `buy` must always be passed.
   🔴 Before the Pro checkout opens (`PR.checkoutOpensOn`) there is nothing to buy: no rail, the nav and footer slots carry
      the free version as an outline (fill is for purchase only, REBRAND §9.9 ③), the filled buttons show the date. Free opens the same day (owner, 2026-11-10), so before it the outline shows the date too.
   🔴 No brand story in the body (`/ae` rule ①) — the footer is the only way to the brand. */
import Page4, { type BuyCta, type NavLink } from '@/components/site4/Shell';
import { useT } from '@/components/site3p/lang';
import { PR } from '@/lib/product';
import Hero from './Hero';
import Who from './Who';
import Posi from './Posi';
import Features from './Features';
import Price from './Price';
import Preorder from './Preorder';
import Faq, { Specs } from './Faq';
import Install from './Install';
import { usePr } from './state';

const LINKS: NavLink[] = [
  { href: '#who', k: 'pr.nav.who' },
  { href: '#what', k: 'pr.nav.what' },
  { href: '#price', k: 'pr.nav.price' },
  { href: '#faq', k: 'pr.nav.faq' },
  { href: '#install', k: 'pr.nav.install' },
];

export default function PrPage() {
  const { t } = useT();
  const { open, checkout, pending } = usePr();
  const pro = open('pro');
  const buy: BuyCta = pro
    ? { href: checkout('pro'), label: t('pr.cta.pro'), big: t('pr.buy.pre'), small: PR.earlyPrice, pending: pending('pro') }
    : { href: checkout('free'), label: t('pr.cta.free'), big: '', small: '', line: true, pending: pending('free') };
  return (
    <Page4 page="pr" plateTotal={7} links={LINKS} cta={{ href: buy.href, k: pro ? 'pr.cta.pro' : 'pr.cta.free', pending: buy.pending }} buy={buy} rail={pro}>
      <Hero />
      <Who />
      <Posi />
      <Features />
      <Price />
      <Preorder />
      {/* FAQ + specs = one sheet (`/ae` does the same — specs follow the FAQ with no top gap). */}
      <div className="onnote">
        <Faq />
        <Specs />
      </div>
      <Install />
    </Page4>
  );
}
