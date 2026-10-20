/* 분석·광고 측정 — 이벤트 층. 설계서 = 플러그인 repo donys/docs/ANALYTICS_PLAN.md · 사양 정본 = `lib/analyticsSpec.json`.

   🔴 **GTM_ID 가 비어 있으면 이 모듈 전체가 꺼진다**(배너·로더·푸터 링크 전부 렌더 안 됨) — 지금 상태. 켜는 버튼은 아래 상수 한 줄이다.
      그리고 켜는 커밋은 방침 개정 고지 후 시행일(ANALYTICS_EFFECTIVE)이 지나야 배포된다(`deployCheck [analytics]` 가 막는다).
      구 `NEXT_PUBLIC_GA_ID` 경로는 한 번도 안 켜졌다(2026-09-30 삭제) — 환경변수가 비면 조용히 꺼지고 게이트가 위양성을 냈다.
      그래서 ID 는 환경변수가 아니라 코드 상수다(공개 값이다). 상태가 커밋에 보인다.
   🔴 GTM 은 **동의한 뒤에 JS 로 주입**한다 — 정적 HTML 에 `googletagmanager.com` 이 없어야 `deployCheck [third-party]` 가 계속 "동의 전 제3자 요청 0" 을 지킨다.
   🔴 동의 전 `track()` 은 **버린다**(쌓았다 뒤늦게 보내지 않는다 — 동의 전 행동의 사후 전송도 동의 전 처리다). */
import { SPEC as spec } from './analyticsSpec';
import { CHECKOUT_URL } from './product';
import { clearTrackingCookies } from './consent';

/** GTM 컨테이너 ID. 비어 있으면 꺼짐. */
export const GTM_ID: string = '';
/** 분석을 켜도 되는 첫 날(YYYY-MM-DD, KST) — 방침 개정 고지 +7일(방침 제16조). GTM_ID 를 채우는 커밋과 같이 정한다. */
export const ANALYTICS_EFFECTIVE: string = '';
export const ANALYTICS_ON = GTM_ID !== '';

export type EventName = keyof typeof spec.events;
export type ItemId = keyof typeof spec.items;

type DL = { dataLayer?: unknown[] };
let started = false;

/* ── 페이지 문맥 (순수) ───────────────────────────────────────────── */

export type PageKind = 'home' | 'ae' | 'docs' | 'update' | 'download' | 'newsletter' | 'legal' | 'thanks' | 'other';

/** 경로 → 페이지 종류. 국문 접두사(`/ko`)와 끝 슬래시를 무시한다. */
export function pageKindOf(pathname: string): PageKind {
  const p = (pathname.replace(/^\/ko(?=\/|$)/, '').replace(/\/+$/, '') || '/');
  if (p === '/') return 'home';
  if (p === '/ae') return 'ae';
  if (p === '/ae/docs') return 'docs';
  if (p === '/update') return 'update';
  if (p === '/download') return 'download';
  if (p === '/newsletter') return 'newsletter';
  if (p === '/thanks') return 'thanks';
  if (p === '/terms' || p === '/privacy' || p === '/refund') return 'legal';
  return 'other';
}

export const pageLangOf = (pathname: string): 'en' | 'ko' => (/^\/ko(\/|$)/.test(pathname) ? 'ko' : 'en');

/* ── URL 속의 비밀 (순수) ─────────────────────────────────────────── */

/** 이메일 확인·해지 링크의 토큰 키 — `/download?confirm=…` · `/newsletter?confirm=…|unsubscribe=…`.
    🔴 GA4 `page_location` 과 Meta Pixel 의 `dl` 은 **URL 전체**를 보낸다. 토큰이 거기 실리면 제3자 서버에 남는다(구독 확인·해지 권한).
    그래서 GTM 을 부르기 *전에* 주소에서 지운다 — 폼은 마운트 때 이미 토큰을 상태로 읽었다. GA4 쪽에도 같은 키로 URL 쿼리 마스킹을 걸어 뒀다(이중 안전).
    `checkout_id` 는 일부러 남긴다: `/thanks` 가 읽고, GA4 `transaction_id` 와 같은 값이라 새로 알려 주는 게 없다. */
export const SECRET_PARAMS = ['confirm', 'unsubscribe', 'token'] as const;

/** `path?query#hash` 에서 비밀 키만 뺀다. 나머지(순서 포함)는 그대로. 순수 함수. */
export function stripSecretParams(pathSearchHash: string): string {
  const hashAt = pathSearchHash.indexOf('#');
  const head = hashAt < 0 ? pathSearchHash : pathSearchHash.slice(0, hashAt);
  const hash = hashAt < 0 ? '' : pathSearchHash.slice(hashAt);
  const q = head.indexOf('?');
  if (q < 0) return pathSearchHash;
  const params = new URLSearchParams(head.slice(q + 1));
  let changed = false;
  for (const k of SECRET_PARAMS) if (params.has(k)) { params.delete(k); changed = true; }
  if (!changed) return pathSearchHash;
  const rest = params.toString();
  return head.slice(0, q) + (rest ? `?${rest}` : '') + hash;
}

/* ── 링크 분류 (순수) ─────────────────────────────────────────────── */

/** 결제 링크 → 상품. 모르는 `buy.polar.sh` 링크는 `unknown` — 조용히 틀리지 않고 보고서에 보이게 한다.
    🔴 PR 플러그인 페이지(`feat/pr-page`)가 들어오면 그 Polar 링크를 여기 한 줄 더한다. */
const PRODUCTS: Record<string, ItemId> = { [CHECKOUT_URL]: 'ae-pro' };

export type LinkInfo = { href: string; hreflang?: string | null; dl?: string | null };
export type LinkEvent =
  | { kind: 'checkout'; item: ItemId | 'unknown' }
  | { kind: 'download'; ext: string; file: string; tier?: string }
  | { kind: 'mail' }
  | { kind: 'lang'; to: string }
  | null;

/** 클릭된 `<a>` 가 어떤 이벤트인지. 우선순위: 결제 > 다운로드 > 메일 > 언어. 순수 함수 — DOM 없이 시험한다. */
export function classifyLink({ href, hreflang, dl }: LinkInfo): LinkEvent {
  if (!href) return null;
  if (href.startsWith('mailto:')) return { kind: 'mail' };
  let u: URL;
  try { u = new URL(href, 'https://younameit.works'); } catch { return null; }
  if (u.hostname === 'buy.polar.sh') {
    const key = u.origin + u.pathname;
    const item = (Object.entries(PRODUCTS).find(([k]) => k === key || k === href)?.[1]) ?? 'unknown';
    return { kind: 'checkout', item };
  }
  const file = u.pathname.split('/').pop() ?? '';
  const ext = file.includes('.') ? file.split('.').pop()!.toLowerCase() : '';
  if (ext === 'zxp' || dl) return { kind: 'download', ext: ext || 'zxp', file, ...(dl ? { tier: dl } : {}) };
  if (hreflang && (hreflang === 'en' || hreflang === 'ko')) return { kind: 'lang', to: hreflang };
  return null;
}

/** 클릭한 자리 — 결제 CTA 가 여섯 곳에 있어 *어느 자리가 파는가* 가 이 사이트의 핵심 질문이다. 위가 이긴다. */
const PLACEMENTS: [string, string][] = [
  ['[data-price-cta]', 'price'],
  ['.rail', 'rail'],
  ['.phero', 'hero'],
  ['nav', 'nav'],
  ['footer', 'footer'],
];
export function placementOf(el: { closest(sel: string): { id?: string } | null }): string {
  for (const [sel, name] of PLACEMENTS) if (el.closest(sel)) return name;
  return el.closest('section[id]')?.id || 'page';
}

/* ── 상품·전자상거래 페이로드 (순수) ──────────────────────────────── */

export function itemPayload(id: ItemId | 'unknown') {
  if (id === 'unknown') return { item_id: 'unknown', quantity: 1 };
  const { currency: _c, ...rest } = spec.items[id];
  return { item_id: id, ...rest, quantity: 1 };
}

export function ecommerce(id: ItemId | 'unknown', extra: Record<string, unknown> = {}) {
  const known = id !== 'unknown';
  return {
    ...(known ? { currency: spec.items[id].currency, value: spec.items[id].price } : {}),
    items: [itemPayload(id)],
    ...extra,
  };
}

/* ── dataLayer ───────────────────────────────────────────────────── */

const w = () => window as unknown as DL;

/** 이벤트 한 개를 dataLayer 로. 로더가 안 불렸으면(= 동의 전) 버린다. */
export function track(name: EventName, params: Record<string, unknown> = {}): void {
  if (!started) return;
  w().dataLayer!.push({ event: name, ...params });
}

/** 전자상거래 이벤트(view_item · begin_checkout · purchase) — GA4 관례대로 직전 ecommerce 를 비우고 보낸다.
    Meta 태그가 읽을 평평한 `item_id` 도 같이 둔다(GA4 태그는 이 키를 안 쓴다). */
export function trackCommerce(name: EventName, id: ItemId | 'unknown', params: Record<string, unknown> = {}, extra: Record<string, unknown> = {}): void {
  if (!started) return;
  const dl = w().dataLayer!;
  dl.push({ ecommerce: null });
  dl.push({ event: name, item_id: id, ecommerce: ecommerce(id, extra), ...params });
}

/** 동의 granted 일 때만 부른다. 멱등. 순서가 계약이다: dataLayer → consent default(denied) → update(granted) → 문맥 → GTM 주입.
    GTM 의 Meta 태그가 `ad_storage` 를 보고 도니까 default→update 를 거쳐야 *granted 가 명시*된다. */
export function startGtm(): void {
  if (started || !ANALYTICS_ON) return;
  started = true;
  const here = location.pathname + location.search + location.hash;
  const clean = stripSecretParams(here);
  if (clean !== here) history.replaceState(history.state, '', clean);   // GTM 이 URL 을 읽기 전에 — 위 SECRET_PARAMS 주석
  const win = window as unknown as DL;
  const dl = (win.dataLayer ||= []);
  /* GTM 은 `arguments` 객체 꼴만 동의 명령으로 읽는다 — 배열을 push 하면 무시된다. */
  function gtag(..._a: unknown[]) { dl.push(arguments); }   // eslint-disable-line prefer-rest-params
  const all = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];
  gtag('consent', 'default', Object.fromEntries(all.map((k) => [k, 'denied'])));
  gtag('consent', 'update', Object.fromEntries(all.map((k) => [k, 'granted'])));
  dl.push({ page_lang: pageLangOf(location.pathname), page_kind: pageKindOf(location.pathname) });
  dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** 철회: 쿠키를 지우고 새로고침(이미 로드된 GTM 을 내릴 방법이 새로고침뿐이다). */
export function stopAndReload(): void {
  clearTrackingCookies();
  location.reload();
}
