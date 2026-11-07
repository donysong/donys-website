/* `/pr` math — date gates and "may the page say this feature is in". Every value comes from the `PR` block and
   `PR_FEATURES` in `lib/product.ts`. 🔴 Do not decide values here; this file only computes.

   Why the browser re-checks: the site is a static export, so the HTML is baked with the state of the **build day**.
   A page built on 11/10 and still up on 11/14 would keep the pre-order button closed (or, after the AE code expires,
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

/** Which checkout may be pressed at `now`. Free opens on launch day; Pro pre-order and the bundle open on the day the
 *  terms/privacy revision takes effect (owner, 2026-11-07). Before that the page shows the date instead of a link. */
export type CheckoutKind = 'free' | 'pro' | 'bundle';
export const prOpensOn = (k: CheckoutKind) => (k === 'free' ? PR.launchOn : PR.checkoutOpensOn);
export const prOpenAt = (now: number, k: CheckoutKind) => now >= kstDayStart(prOpensOn(k));

/** The AE-owner code offer may still be on the page (a page must not offer an expired code). */
export const prAeCouponAt = (now: number) => now < kstDayEnd(PR.aeCouponEnd);

const ROW = new Map(PR_FEATURES.map((f) => [f.id as string, f]));
const row = (id: PrFeature) => ROW.get(id)!;
export const prTier = (id: PrFeature) => row(id).tier;

/** May the page say this feature is in the version you can download today?
 *  Pre-order shape: only free features that are on. Pro features appear only in the pre-order lists, by name. */
export const prClaimable = (id: PrFeature) => row(id).tier === 'free' && row(id).state === 'on';

/** A line or card tagged with several features stays while **any** of them is claimable (pr-page.full.md rule). */
export const prAny = (ids: readonly PrFeature[]) => ids.some(prClaimable);

/** Registry order, one group. */
export const prIn = (group: string) => PR_FEATURES.filter((f) => f.group === group).map((f) => f.id);

/** Free features not in this release — names only, under "still in the works". */
export const prPlanned = () => PR_FEATURES.filter((f) => f.tier === 'free' && f.state === 'off' && f.group !== 'infra').map((f) => f.id);

/** Pro features the pre-order promises for the opening update / the rest (names only, no dates). Unbuilt ones never appear. */
export const prLaunchSet = () => PR_FEATURES.filter((f) => f.tier === 'pro' && f.launch).map((f) => f.id);
export const prLater = () => PR_FEATURES.filter((f) => f.tier === 'pro' && !f.launch && f.state !== 'unbuilt').map((f) => f.id);

/** JSON-LD (`SoftwareApplication`) for `/pr` · `/ko/pr` — same skeleton, description in the page language.
 *  Offers = Free ($0, in stock from launch day) · Pro (pre-order price, `PreOrder`, from the checkout-open day). */
export function prJsonLd(site: string, path: string, description: string) {
  const offer = (name: string, price: string, url: string, availability: string, from: string) => ({
    '@type': 'Offer', name, price, priceCurrency: 'USD', availability, availabilityStarts: `${from}T00:00:00+09:00`, ...(url ? { url } : {}),
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
      offer('Free', '0', PR.checkoutFree, 'https://schema.org/InStock', PR.launchOn),
      offer('Pro (pre-order)', PR.earlyPriceUsd, PR.checkoutPro, 'https://schema.org/PreOrder', PR.checkoutOpensOn),
    ],
    publisher: { '@type': 'Organization', name: 'You Name It', url: site },
  };
}
