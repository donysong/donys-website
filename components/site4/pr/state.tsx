'use client';
/* `/pr` screen state — the current time (which checkouts are open, is the AE code offer still on) and the incoming
   `utm_*` (passed on to the checkout link).

   🔴 The baked HTML is the state at **build time** (`builtAt`, passed by page.tsx on the server). When the browser opens
      the page it re-decides with its own clock — a page built on 11/10 must open the Pro checkout by itself on 11/14
      (`lib/pr.ts` header). First render = server values, so hydration never diverges (changes happen in the effect only).
   🔴 utm pass-through (PR repo `gtm/polar/polar-setup.md` §4): arriving with `?utm_source=…` appends that query to the Polar
      link so the order keeps its source. Not analytics — the visitor's browser sends nothing to a third party.
   A closed checkout renders as a button without href: `data-pending="opens"` before its day (shows the date instead),
   `data-pending="checkout"` when the link is still empty in `lib/product.ts`. deployCheck `[pr]` reads both. */
import { createContext, useContext, useEffect, useState } from 'react';
import { PR } from '@/lib/product';
import { prAeCouponAt, prOpenAt, type CheckoutKind } from '@/lib/pr';

const URLS: Record<CheckoutKind, string> = { free: PR.checkoutFree, pro: PR.checkoutPro, bundle: PR.checkoutBundle };

const Ctx = createContext({ now: 0, utm: '' });

export function PrProvider({ builtAt, children }: { builtAt: number; children: React.ReactNode }) {
  const [s, setS] = useState({ now: builtAt, utm: '' });
  useEffect(() => {
    const keep = new URLSearchParams();
    new URLSearchParams(location.search).forEach((v, k) => { if (/^utm_[a-z_]+$/.test(k)) keep.set(k, v); });
    setS({ now: Date.now(), utm: keep.toString() });
  }, []);
  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}

export function usePr() {
  const { now, utm } = useContext(Ctx);
  const open = (k: CheckoutKind) => prOpenAt(now, k);
  /** The link to press, or '' while closed / not made yet. */
  const checkout = (k: CheckoutKind) => {
    const u = URLS[k];
    if (!u || !open(k)) return '';
    return utm ? `${u}${u.includes('?') ? '&' : '?'}${utm}` : u;
  };
  const pending = (k: CheckoutKind) => (!open(k) ? 'opens' : URLS[k] ? undefined : 'checkout');
  return { open, checkout, pending, aeCoupon: prAeCouponAt(now) };
}

/** One checkout link. Closed (before its day, or no link yet) = a button without href showing `closed` instead. */
export function Checkout({ kind, className, closed, children, ...rest }: {
  kind: CheckoutKind; className?: string; closed: React.ReactNode; children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & { 'data-price-cta'?: boolean }) {
  const { checkout, pending } = usePr();
  const href = checkout(kind);
  return (
    <a className={className} href={href || undefined} data-pending={pending(kind)} aria-disabled={href ? undefined : true} data-cur {...rest}>
      {href ? children : closed}
    </a>
  );
}

/** Claimable feature names — EN puts `and` before the last, KO uses commas only (source `pr.diff2.free` in both languages). */
export function joinNames(lang: 'en' | 'ko', names: string[]): string {
  if (lang === 'ko' || names.length < 2) return names.join(', ');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** Plate number (`01`…) + paper (true = note sheet `.onnote`, false = blue). PrPage numbers the sections in order. */
export type Plate = { no: string; note: boolean };
