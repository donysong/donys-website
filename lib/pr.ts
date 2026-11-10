/* `/pr` math — date gates and "may the page say this feature is in". Every value comes from the `PR` block and
   `PR_FEATURES` in `lib/product.ts`. 🔴 Do not decide values here; this file only computes.

   Why the browser re-checks: the site is a static export, so the HTML is baked with the state of the **build day**.
   A page built on 11/10 and still up on 11/14 would keep the Pro button closed (or, after the AE code expires,
   keep offering it). So the baked HTML carries the build-time state and the browser re-decides with its own clock
   (`components/site4/pr/state.tsx`). First render = server values, so hydration never diverges. */
import { PR, PR_FEATURES, type PrFeature } from './product';

const DAY = 86_400_000;
const KST = 9 * 3_600_000;

/** 00:00 KST of a KST calendar day (YYYY-MM-DD), as UTC ms */
export function kstDayStart(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) - KST;
}
/** The instant a day ends (next day 00:00 KST) — the moment right after "until 23:59:59 that day" */
export const kstDayEnd = (iso: string) => kstDayStart(iso) + DAY;

/** Which checkout may be pressed at `now`. Free, Pro and the bundle all open on one day: the day the terms/privacy
 *  revision takes effect (owner, 2026-11-07; one launch day and Pro as a regular purchase, owner 2026-11-10). Before that the page shows the date instead of a link. */
export type CheckoutKind = 'free' | 'pro' | 'bundle';
export const prOpensOn = (k: CheckoutKind) => (k === 'free' ? PR.launchOn : PR.checkoutOpensOn);
export const prOpenAt = (now: number, k: CheckoutKind) => now >= kstDayStart(prOpensOn(k));

/** The last KST day of the Pro launch price: the checkout-open day + `PR.openEarlyDays` (11/14 + 14 = 11/28; owner, 2026-11-10).
 *  The page shows this date. Polar is the real gate — the price there has to change after this day (nothing in this site does that). */
export const PR_EARLY_UNTIL = new Date(kstDayStart(PR.checkoutOpensOn) + PR.openEarlyDays * DAY + KST).toISOString().slice(0, 10);

/** The AE-owner code offer may still be on the page (a page must not offer an expired code). */
export const prAeCouponAt = (now: number) => now < kstDayEnd(PR.aeCouponEnd);

const ROW = new Map(PR_FEATURES.map((f) => [f.id as string, f]));
const row = (id: PrFeature) => ROW.get(id)!;
export const prTier = (id: PrFeature) => row(id).tier;

/** May the page say this feature is in the version you can download today?
 *  Only free features that are on are described. Pro features appear by name and table label only (04 price card · 05 key list). */
export const prClaimable = (id: PrFeature) => row(id).tier === 'free' && row(id).state === 'on';

/** A line or card tagged with several features stays while **any** of them is claimable (pr-page.full.md rule). */
export const prAny = (ids: readonly PrFeature[]) => ids.some(prClaimable);

/** Registry order, one group. */
export const prIn = (group: string) => PR_FEATURES.filter((f) => f.group === group).map((f) => f.id);

/** Free features not in this release — names only, under "still in the works". */
export const prPlanned = () => PR_FEATURES.filter((f) => f.tier === 'free' && f.state === 'off' && f.group !== 'infra').map((f) => f.id);

/** Pro features the key unlocks on sale day (labels). */
export const prLaunchSet = () => PR_FEATURES.filter((f) => f.tier === 'pro' && f.launch).map((f) => f.id);
/** Pro toolkit tools that are in this release, locked by the license until the key is entered (names only). */
export const prProTools = () => PR_FEATURES.filter((f) => f.tier === 'pro' && !f.launch && f.state === 'on').map((f) => f.id);
/** Pro tools not in this release — names only, no dates. Unbuilt ones never appear. */
export const prLater = () => PR_FEATURES.filter((f) => f.tier === 'pro' && !f.launch && f.state === 'off').map((f) => f.id);

/** JSON-LD (`SoftwareApplication`) for `/pr` · `/ko/pr` — same skeleton, description in the page language.
 *  Offers = Free ($0, in stock from launch day) · Pro (launch price through `PR_EARLY_UNTIL`, in stock from the checkout-open day). */
export function prJsonLd(site: string, path: string, description: string) {
  const offer = (name: string, price: string, url: string, from: string, until?: string) => ({
    '@type': 'Offer', name, price, priceCurrency: 'USD', availability: 'https://schema.org/InStock', availabilityStarts: `${from}T00:00:00+09:00`,
    ...(until ? { priceValidUntil: until } : {}), ...(url ? { url } : {}),
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'You Name It PR Plugin',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    softwareVersion: PR.version,
    url: `${site}${path}`,
    description,
    offers: [
      offer('Free', '0', PR.checkoutFree, PR.launchOn),
      offer('Pro', PR.earlyPriceUsd, PR.checkoutPro, PR.checkoutOpensOn, PR_EARLY_UNTIL),
    ],
    publisher: { '@type': 'Organization', name: 'You Name It', url: site },
  };
}
