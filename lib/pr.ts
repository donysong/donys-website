/* `/pr` 의 계산 — 날짜 경계 · 얼리버드 · "이 기능을 주장해도 되나". 값은 전부 `lib/product.ts` 의 `PR` 블록에서 온다.
   🔴 여기서 값을 새로 정하지 마라 — 이 파일은 셈만 한다.

   왜 화면에서 다시 재나: 정적 export 라 HTML 은 **빌드한 날**의 상태로 구워진다. 11/10 에 구운 판이 11/14 에도 떠 있으면
   얼리버드가 끝난 뒤에도 $34.99 를 말한다(Polar 는 이미 $49.99 를 받는다). 그래서 구운 HTML 은 빌드 시점 상태를 들고 있고,
   브라우저가 열리면 지금 시각으로 다시 정한다(`components/site4/pr/state.tsx`). AE 쿠폰 안내도 같은 이유로 스스로 걷힌다. */
import { PR, PR_FEATURES, PR_MODE, PR_OFF, type PrFeature } from './product';

const DAY = 86_400_000;
const KST = 9 * 3_600_000;

/** KST 달력 날짜(YYYY-MM-DD) 00:00 KST 의 UTC ms */
export function kstDayStart(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) - KST;
}
/** 그 날짜가 끝나는 순간(다음 날 00:00 KST) — "그날 23:59:59 까지" 의 바로 다음 */
export const kstDayEnd = (iso: string) => kstDayStart(iso) + DAY;

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d) + n * DAY).toISOString().slice(0, 10);
}

/** 얼리버드 마지막 날. Pro 가 earlyEnd 뒤에 열렸으면(preorder → full) 연 날부터 openEarlyDays 일(연 날 포함),
 *  그 전에 열렸으면 원래대로 earlyEnd (facts.md "Early-bird after Pro opens"). */
export function prEarlyUntil(): string {
  const o = PR.proOpenedOn as string;
  return o && o > PR.earlyEnd ? addDays(o, PR.openEarlyDays - 1) : PR.earlyEnd;
}

/** 얼리버드가 지금 걸려 있나. preorder 판은 Pro 가 열릴 때까지 사전예약가 = 얼리버드가라 늘 참이다. */
export function prEarlyAt(now: number): boolean {
  if (PR_MODE === 'preorder') return true;
  return now >= kstDayStart(PR.earlyStart) && now < kstDayEnd(prEarlyUntil());
}

/** AE 구매자 코드 안내를 아직 실어도 되나 — 지난 코드를 권하는 문장은 페이지에 남기지 않는다(pr-page.full.md 가격 절 주석). */
export const prAeCouponAt = (now: number) => now < kstDayEnd(PR.aeCouponEnd);

const TIER = new Map<string, string>(PR_FEATURES.map((f) => [f.id, f.tier]));
export const prTier = (id: PrFeature) => TIER.get(id) as 'free' | 'pro';

/** 이 기능을 "들어 있다" 고 말해도 되나.
 *  - 출고 빌드에서 꺼진 기능(`PR_OFF`)은 어느 판에서도 안 된다.
 *  - preorder 판에선 Pro 기능 전부가 안 된다 — 사전예약 블록에만 이름으로 나간다(pr-page.preorder.md 규칙 1). */
export function prClaimable(id: PrFeature): boolean {
  if (PR_OFF.includes(id)) return false;
  return PR_MODE === 'full' || prTier(id) === 'free';
}

/** 태그가 여럿인 줄·카드 — 태그가 **전부** 꺼져야 빠진다(pr-page.full.md "A card is dropped when every feature tagged … is off").
 *  일부만 꺼졌으면 남는다 — 그 문장은 동결일에 손으로 고친다. */
export const prAny = (ids: readonly PrFeature[]) => ids.some(prClaimable);

/** `/pr` · `/ko/pr` 의 JSON-LD(`SoftwareApplication`) — 두 판본이 같은 뼈대를 쓰고 설명만 그 면의 언어다(`/ae` 와 같은 이유).
 *  Offer 둘 = 무료판($0) · Pro(판 A 정가 / 판 B 사전예약가 + `PreOrder`). 결제 주소가 아직 없으면 `url` 을 빼고 낸다 —
 *  빈 주소를 구조화 데이터에 싣지 않는다. 얼리버드는 싣지 않는다(정적 데이터가 기간을 넘겨 살아남는다). */
export function prJsonLd(site: string, path: string, description: string) {
  const pre = PR_MODE === 'preorder';
  const offer = (name: string, price: string, url: string, availability: string) => ({
    '@type': 'Offer', name, price, priceCurrency: 'USD', availability, ...(url ? { url } : {}),
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'You Name It PR Plugin',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows, macOS',
    softwareVersion: PR.version,
    url: `${site}${path}`,
    description,
    offers: [
      offer('Free', '0', PR.checkoutFree, 'https://schema.org/InStock'),
      offer('Pro', pre ? PR.earlyPriceUsd : PR.priceUsd, PR.checkoutPro, pre ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock'),
    ],
    publisher: { '@type': 'Organization', name: 'You Name It', url: site },
  };
}

/** 화면 목록용 — 그룹 순서는 레지스트리 순서 그대로 */
export const prFeaturesIn = (group: string) => PR_FEATURES.filter((f) => f.group === group).map((f) => f.id as PrFeature);
