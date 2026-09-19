/* 사이트 카피 사전 — EN/KO. 🔴 **파일 하나가 아니라 페이지별로 갈려 있다**(§14.13).
   레인 넷이 같은 파일을 동시에 고치다 서로를 덮은 전례가 있어서 이렇게 갈랐다:

     lib/copy/shared.ts 셸(네비·푸터·법·메타) — 세 페이지가 같이 쓴다
     lib/copy/home.ts   `/`        브랜드 루트
     lib/copy/ae.ts     `/ae`      제품
     lib/copy/docs.ts   `/ae/docs` 읽는 면

   합칠 때 **뒤가 이긴다** — 페이지 사전이 shared 를 덮는다.
   🔴 구 `v33.ts`(프로토 v3.3 사전 194키)는 2026-09-19 에 지웠다. §14 분리로 단일 페이지가 죽으면서
   소비자가 0이 됐고, 살려 둘 이유였던 EN 번역은 `/ae` 가 쓰는 23개만 `ae.ts` 로 옮겼다.
   나머지 171키는 방문자마다 내려가는 죽은 문자열이었다. 필요하면 커밋 `91bfbb9` 에 있다.
   🔴 숫자는 사전에 박지 마라 — `{scripts}` 같은 자리표시자를 쓰면 `lib/product.ts` 가 채운다
   (사이트가 없는 프리셋 112개를 두 달간 광고한 전례가 있다).
   타자기 표기: [[말]] = 동그라미가 그려진다 · __말__ = 밑줄. */
import { COUNTS, PRICE, VERSION } from './product';
import type { Dict, Entry, Lang } from './copy/types';
import SHARED from './copy/shared';
import HOME from './copy/home';
import AE from './copy/ae';
import DOCS from './copy/docs';

export type { Lang, Entry };

function merge(...ds: Dict[]): Dict {
  return {
    en: Object.assign({}, ...ds.map((d) => d.en)),
    ko: Object.assign({}, ...ds.map((d) => d.ko)),
  };
}

const RAW = merge(SHARED, HOME, AE, DOCS);

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
