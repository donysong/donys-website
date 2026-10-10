'use client';
/* `/pr` 의 화면 상태 — 지금 시각(얼리버드 · AE 쿠폰 안내가 걸려 있나)과 들어온 `utm_*`(결제 링크로 넘긴다).

   🔴 구운 HTML 은 **빌드 시각**(`builtAt`, page.tsx 가 서버에서 넘긴다)의 상태다. 브라우저가 열리면 지금 시각으로 다시 정한다 —
      11/10 에 구운 판이 11/14 에도 떠 있으면 얼리버드가 끝난 뒤에도 $34.99 를 말하기 때문이다(`lib/pr.ts` 머리 주석).
      첫 렌더는 서버와 같은 값이라 하이드레이션이 안 갈린다(바꾸는 건 effect 안에서만).
   🔴 utm 넘기기(PR repo `gtm/polar/polar-setup.md` §4 끝): `?utm_source=youtube&utm_medium=shorts…` 로 들어오면 그 쿼리를
      Polar 결제 링크에 그대로 붙여서 주문에 출처가 남는다. 분석 스크립트가 아니다 — 방문자 브라우저는 제3자에게 아무것도 안 보낸다
      (개인정보 처리방침 제7조 ② · deployCheck `[third-party]`).
   결제 주소가 빈 값(아직 Polar 에서 안 만들었다)이면 href 없는 버튼을 그린다 — `data-pending="checkout"` 을 deployCheck `[pr]` 가 센다. */
import { createContext, useContext, useEffect, useState } from 'react';
import { PR } from '@/lib/product';
import { prAeCouponAt, prEarlyAt } from '@/lib/pr';

export type CheckoutKind = 'free' | 'pro' | 'bundle';
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
  const checkout = (k: CheckoutKind) => {
    const u = URLS[k];
    if (!u) return '';
    return utm ? `${u}${u.includes('?') ? '&' : '?'}${utm}` : u;
  };
  return { early: prEarlyAt(now), aeCoupon: prAeCouponAt(now), checkout };
}

/** 결제 링크 하나. 주소가 아직 없으면 href 없는 버튼(누를 수 없다) — 배포는 deployCheck 가 막는다. */
export function Checkout({ kind, className, children, ...rest }: {
  kind: CheckoutKind; className?: string; children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & { 'data-price-cta'?: boolean }) {
  const { checkout } = usePr();
  const href = checkout(kind);
  return (
    <a className={className} href={href || undefined} data-pending={href ? undefined : 'checkout'}
      aria-disabled={href ? undefined : true} data-cur {...rest}>
      {children}
    </a>
  );
}

/** 켜진 기능 이름 목록 — EN 은 마지막 앞에 `and`, KO 는 쉼표만(원문 `pr.diff2.free` 두 언어 그대로). */
export function joinNames(lang: 'en' | 'ko', names: string[]): string {
  if (lang === 'ko' || names.length < 2) return names.join(', ');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** 판 번호(`01`…) + 종이(true = 노트 판 `.onnote`, false = 파란 판) — PrPage 가 판 순서로 매겨 각 섹션에 넘긴다. */
export type Plate = { no: string; note: boolean };
