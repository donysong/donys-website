/* 사이트 카피 사전 — EN/KO. 🔴 **파일 하나가 아니라 페이지별로 갈려 있다**(§14.13).
   레인 넷이 같은 파일을 동시에 고치다 서로를 덮은 전례가 있어서 이렇게 갈랐다:

     lib/copy/shared.ts 셸(네비·푸터·법·메타) — 세 페이지가 같이 쓴다
     lib/copy/home.ts   `/`        브랜드 루트
     lib/copy/ae.ts     `/ae`      제품
     lib/copy/docs.ts   `/ae/docs` 읽는 면
     lib/copy/pr.ts     `/pr`      PR 플러그인(무료판 + Pro 사전예약)

   합칠 때 **뒤가 이긴다** — 페이지 사전이 shared 를 덮는다.
   🔴 구 `v33.ts`(프로토 v3.3 사전 194키)는 2026-09-19 에 지웠다. §14 분리로 단일 페이지가 죽으면서
   소비자가 0이 됐고, 살려 둘 이유였던 EN 번역은 `/ae` 가 쓰는 23개만 `ae.ts` 로 옮겼다.
   나머지 171키는 방문자마다 내려가는 죽은 문자열이었다. 필요하면 커밋 `91bfbb9` 에 있다.
   🔴 숫자는 사전에 박지 마라 — `{scripts}` 같은 자리표시자를 쓰면 `lib/product.ts` 가 채운다
   (사이트가 없는 프리셋 112개를 두 달간 광고한 전례가 있다).
   타자기 표기: [[말]] = 동그라미가 그려진다 · __말__ = 밑줄. */
import { COUNTS, PORTAL_URL, PR, PRICE, TIERS, VERSION } from './product';
import type { Dict, Entry, Lang } from './copy/types';
import SHARED from './copy/shared';
import HOME from './copy/home';
import AE from './copy/ae';
import DOCS from './copy/docs';
import PR_COPY from './copy/pr';

export type { Lang, Entry };

function merge(...ds: Dict[]): Dict {
  return {
    en: Object.assign({}, ...ds.map((d) => d.en)),
    ko: Object.assign({}, ...ds.map((d) => d.ko)),
  };
}

/* ── PR 플러그인 사전 — **AE 표(`NUMS`)보다 먼저** 채운다 ─────────────────────────────────────
   🔴 PR 원문(PR repo `gtm/`)의 `{price}` `{version}` 은 **PR 의 값**이다. 아래 `NUMS`(AE 값)가 먼저 닿으면 PR 페이지에
   AE 버전(2.8.0)과 AE 가격이 찍힌다 — 그래서 PR 키는 여기서 `lib/product.ts` 의 `PR` 로 먼저 다 채운 뒤에 합친다
   (그 뒤엔 `NUMS` 가 건드릴 자리가 남지 않는다). 자리표시자 정본 = PR repo `gtm/facts.md` 의 표.
   날짜는 언어마다 다르게 적는다(KO `2026년 11월 14일` · EN `November 14, 2026`) — 이 표만 언어를 받는 이유다.
   `{names}` 만 컴포넌트가 채운다. */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function prDate(lang: Lang, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return lang === 'ko' ? `${y}년 ${m}월 ${d}일` : `${MONTHS[m - 1]} ${d}, ${y}`;
}
/* Short form for the hero circles (172px): KO `11월 14일` · EN `Nov 14` */
function prDay(lang: Lang, iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return lang === 'ko' ? `${m}월 ${d}일` : `${MONTHS[m - 1].slice(0, 3)} ${d}`;
}
function prNums(lang: Lang): [string, string][] {
  return Object.entries({
    '{price}': PR.price,
    '{earlyPrice}': PR.earlyPrice,
    '{launch}': prDate(lang, PR.launchOn),
    '{launchShort}': prDay(lang, PR.launchOn),
    '{checkoutOpens}': prDate(lang, PR.checkoutOpensOn),
    '{checkoutOpensShort}': prDay(lang, PR.checkoutOpensOn),
    '{openEarlyDays}': String(PR.openEarlyDays),
    '{bundlePrice}': PR.bundlePrice,
    '{preorderDeadline}': prDate(lang, PR.preorderDeadline),
    '{aeCoupon}': `${PR.aeCouponPct}%`,
    '{aeCouponEnd}': prDate(lang, PR.aeCouponEnd),
    '{computers}': String(PR.computers),
    '{refundDays}': String(PR.refundDays),
    '{revalidateDays}': String(PR.revalidateDays),
    '{offlineDays}': String(PR.offlineDays),
    '{remoteOffDays}': String(PR.remoteOffRefundDays),
    '{minPremiere}': PR.minPremiere,
    '{testedWin}': PR.testedWin,
    '{version}': PR.version,
    '{portal}': PORTAL_URL,
  });
}
function prFill(d: Dict): Dict {
  const one = (lang: Lang) => {
    const nums = prNums(lang);
    const sub = (s: string) => nums.reduce((o, [k, n]) => o.split(k).join(n), s);
    return Object.fromEntries(Object.entries(d[lang]).map(([k, v]) => [k, Array.isArray(v) ? v.map(sub) : sub(v)]));
  };
  return { en: one('en'), ko: one('ko') };
}
const PR_DICT = prFill(PR_COPY);

const RAW = merge(SHARED, HOME, AE, DOCS, PR_DICT);

const NUMS: Record<string, string> = {
  '{scripts}': String(COUNTS.scripts),
  '{motion}': String(COUNTS.motion),
  '{textPresets}': String(COUNTS.textPresets),
  '{gradients}': String(COUNTS.gradients),
  '{curves}': String(COUNTS.curves),
  '{expressions}': String(COUNTS.expressions),
  '{tools}': String(COUNTS.tools),
  '{skills}': String(COUNTS.skills),
  '{effects}': String(COUNTS.effects),
  '{freeTools}': String(TIERS.freeTools),
  '{proTools}': String(TIERS.proTools),
  '{price}': PRICE,
  '{version}': VERSION,
};

function fill(v: Entry): Entry {
  if (Array.isArray(v)) return v.map((s) => fill(s) as string);
  let out = v;
  for (const [k, n] of Object.entries(NUMS)) out = out.split(k).join(n);
  return out;
}

export const T: Record<Lang, Record<string, Entry>> = {
  en: Object.fromEntries(Object.entries(RAW.en).map(([k, v]) => [k, fill(v)])),
  ko: Object.fromEntries(Object.entries(RAW.ko).map(([k, v]) => [k, fill(v)])),
};

export function t(lang: Lang, key: string): string {
  const v = T[lang][key] ?? T.en[key] ?? key;
  return Array.isArray(v) ? v.join(' · ') : v;
}
export function list(lang: Lang, key: string): string[] {
  const v = T[lang][key] ?? T.en[key] ?? [];
  return Array.isArray(v) ? v : [v];
}
