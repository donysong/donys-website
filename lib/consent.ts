/* 분석·광고 측정 동의 저장소 — 설계 = 플러그인 repo donys/docs/ANALYTICS_PLAN.md §7.
   저장 = localStorage['yni-consent'] = {"v":<범위 버전>,"a":true|false,"t":"<ISO>"}. 선택 사실의 first-party 기록이라 동의 대상이 아니다.
   한 번의 선택이 켜져 있는 측정 전부(지금 GA4 · Meta 를 켜면 둘)를 덮는다. 범위가 바뀌면 `CONSENT_VERSION` 이 올라 재동의를 받는다.
   한계: 범주별 선택 없음(둘 중 하나만 허용하려는 방문자는 거부를 고른다), 언제 업그레이드: 그런 요구가 생기면 `a` 를 객체로 늘리고 `v:2`. */

export const CONSENT_KEY = 'yni-consent';

/** 🔴 Meta Pixel 을 켜는 날 `true` — 동의 범위가 넓어지므로 **저장된 동의 전부가 무효가 되어 다시 묻는다**(`CONSENT_VERSION` 이 1 → 2).
    같은 날 방침 개정·배너의 Meta 이전 고지(`Analytics.tsx`)·컨테이너(`--meta-pixel-id`)가 같이 나가야 한다(`analytics.test` · `deployCheck [analytics]` 가 짝을 본다).
    2026-10-20 오너 결정: 1차는 GA4 만 — 픽셀은 광고를 돌리기 직전에 별도 개정으로 넣는다. */
export const META_PIXEL_ON = false;
/** 저장된 동의가 어떤 범위에 대한 것인지. 범위가 바뀌면 올려서 재동의를 받는다. */
export const CONSENT_VERSION = META_PIXEL_ON ? 2 : 1;
export type Consent = 'granted' | 'denied';

/** 저장된 문자열 → 선택. 깨졌거나 모르는 버전이면 `null`(= 다시 묻는다). 순수 함수. */
export function parseConsent(raw: string | null | undefined, version = CONSENT_VERSION): Consent | null {
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as { v?: unknown; a?: unknown };
    if (j && j.v === version && typeof j.a === 'boolean') return j.a ? 'granted' : 'denied';
  } catch { /* 깨진 값 — 다시 묻는다 */ }
  return null;
}

export function serializeConsent(c: Consent, now = new Date(), version = CONSENT_VERSION): string {
  return JSON.stringify({ v: version, a: c === 'granted', t: now.toISOString() });
}

/** 사파리 프라이빗·저장소 차단에서도 던지지 않는다 — 읽기 실패 = `null`(매 방문 배너), 쓰기 실패 = 이번 방문만 유효. */
export function readConsent(): Consent | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

export function writeConsent(c: Consent): void {
  try { localStorage.setItem(CONSENT_KEY, serializeConsent(c)); } catch { /* 이번 방문만 */ }
  window.dispatchEvent(new CustomEvent('yni:consent', { detail: c }));
}

/** 푸터 *쿠키 설정* 링크 → 배너를 다시 연다. */
export function openConsent(): void {
  window.dispatchEvent(new CustomEvent('yni:consent-open'));
}

/* ── 철회: GTM 이 심은 쿠키를 지운다 ──
   GA 는 상위 도메인(`.younameit.works`)에 심으므로 호스트 한 가지로는 안 지워진다 — 가능한 도메인 후보를 전부 시도한다. */
export const TRACKING_COOKIE = /^(_ga(_.+)?|_gid|_gat(_.+)?|_gcl_.+|_fbp|_fbc)$/;

/** `a.b.example.com` → ['a.b.example.com','.a.b.example.com','.b.example.com','.example.com'] (최상위 `.com` 은 제외). 순수 함수. */
export function cookieDomains(hostname: string): string[] {
  const parts = hostname.split('.');
  const out = [hostname];
  for (let i = 0; i <= parts.length - 2; i++) out.push('.' + parts.slice(i).join('.'));
  return out;
}

export function clearTrackingCookies(): void {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => TRACKING_COOKIE.test(n));
  for (const name of names) {
    for (const domain of cookieDomains(location.hostname)) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}
