/* 제품 사실 한 곳. 🔴 가격을 컴포넌트에 다시 박지 마라 —
   $30 이 Navbar·Hero·Pricing·layout 메타·terms 다섯 곳에 흩어져 있었고,
   가격이 오른 뒤에도 사이트는 옛 값을 계속 보여줬다. */
import { PRO_TOOL_IDS } from './proTools';

export const PRICE = '$49.99';
export const PRICE_USD = '49.99';

/* Polar = 활성 결제 provider */
export const CHECKOUT_URL =
  'https://buy.polar.sh/polar_cl_NebuNphvrIXOb3G8sgLi2sfZd6TUZfjxyxklW2VUPmY';

/* 이미 산 사람의 자리 — 키 재확인 · 기기 해제. 구매 메일 OTP 로 로그인한다.
   🔴 슬러그 `donys` 는 구 브랜드지만 **출고본에 컴파일된 주소**다(플러그인 `src/utils/license/config.ts`
   `POLAR_PORTAL_URL`). 사이트만 바꾸면 패널과 사이트가 다른 포털을 가리킨다 — 둘을 같이 옮겨라.
   사전에서는 `{portal}` 자리표시자로 쓰고 컴포넌트가 채운다(FAQ · 사양). */
export const PORTAL_URL = 'https://polar.sh/donys/portal';

/* 카탈로그 숫자 — 🔴 코드에서 센 값이다. 손으로 올리지 마라.
   🔴 2026-10-05 v2.8.0 태그에서 전부 다시 쟀다(v2.7.1 값으로 셈법을 먼저 검증 — 39·62·21·29·61·69·56 일치).
      바뀐 것 = curves 21→19 · tools 56→57 · scripts 는 39 그대로지만 분류가 모션 10 · 레이어 9 · 컴프 6 ·
      셰이프 7 · 스타일 4 · 내보내기 3 으로 바뀌었다(`ae.f2.p1` 같이 고침). 아래 표의 나머지 줄은 옛 실측 이력이다.
   2026-09-07 실측(플러그인 repo):
     scripts        src/data/builtinScripts.ts        39  ← 🔴 **출고 태그 v2.7.1 에서 센 값이다, 플러그인
                                                            HEAD 가 아니다** (2026-09-26 재실측).
                                                            HEAD 는 40 인데 40번째(Vertex Grid, `ab6a88b`)는
                                                            태그 **뒤에** 들어왔다 — 사는 사람이 받는 zxp 엔
                                                            없다. 여기를 40 으로 올리면 못 사는 툴을 판다.
                                                            ⚠️ `tools/build-docs-data.mjs` 의 대조 게이트가
                                                            HEAD 를 읽어서 지금 39≠40 으로 빌드를 세운다 —
                                                            고칠 곳은 이 숫자가 아니라 생성기(태그를 읽게).
                                                            `lib/docsData.ts` 는 v2.7.1 추출본으로 돌린 결과와
                                                            바이트까지 같다(재생성 불필요).
                                                            구 42 는 09-07 값이고 `4c50e0b`(09-08)로 무효.
                                                            ⚠️ `/ae` 의 카테고리 분해(`ae.f2.p1`, 모션 12 ·
                                                            레이어 8 · 컴프 6 · 셰이프 6 · 스타일 4 ·
                                                            내보내기 3)도 같은 태그 값이다 — 같이 고쳐라.
     motion         src/data/motionPresets.ts         26  ← 구 112 는 오너가 2026-07-19 에
                                                            26 아키타입으로 줄였다(MOTION_PRESET_SPEC).
                                                            사이트는 두 달간 없는 걸 광고했다.
     text presets   src/data/builtinTextPresets.ts    61
     gradients      src/data/builtinGradients.ts      62
     curves         src/data/builtinCurves.ts         19  ← v2.8.0 태그 실측(2026-10-05): bounce-end·elastic-end 삭제
                                                            (Curves 의 Elastic·Bounce 가 꺾임마다 키를 넣는 기능으로 대체)
     expressions    src/data/builtinExpressions.ts    69  ← 구 "80+" 는 과장이었다
     MCP tools      src/chat/mcp/schemas.ts           57  ← v2.8.0 태그 실측: renameLayers 추가
     skills         src/chat/runtime/skillsBundle.ts  29 */
export const COUNTS = {
  scripts: 39,
  motion: 26,
  textPresets: 61,
  gradients: 62,
  curves: 19,
  expressions: 69,
  tools: 57,
  skills: 29,
  /* 출고 이펙트. 🔴 이력이 14 → 4 → 5 → 3 이다 — 2026-09-09 오너가 `riso-print` 를 더했고,
     2026-10-01 오너가 `riso-print`·`vox-original` 을 로컬 전용으로 돌렸다(앞으로만 출고 중단 · 회수 없음).
     은퇴한 10종은 그대로 은퇴다. 여기 숫자를 바꾸기 전에 CLAUDE.md 닫힌 표부터 봐라. */
  effects: 3,
} as const;

/* Free / Pro 가르기 — 2026-10-15 오너 결정(v2.10.0 부터, 같은 빌드를 키로 연다).
   Free = Library · Curves · Expressions · Support 패널 + Toolbox 툴 26개. Pro = Chat · Custom 패널 + Toolbox 툴 13개(`lib/proTools.ts` 가 id 목록).
   🔴 `freeTools + proTools` 는 `COUNTS.scripts` 와 같아야 한다 — `npm run test:fn` 이 본다(툴이 늘면 어느 쪽에 넣을지 먼저 정한다). */
export const TIERS = { proTools: PRO_TOOL_IDS.length, freeTools: 26 } as const;

/* 최신 릴리스 버전 한 곳. app/update/page.tsx 의 다운로드 링크·표시 문구가 여기서 읽는다.
   🔴 v2.5.0 을 컷한 뒤에도 이 페이지가 두 자리에서 v2.4.0 을 보여주던 전례가 있다.
   릴리스 노트 이력(RELEASES)은 항목마다 자기 version 을 갖지만, **"최신"의 정의는 여기 하나**다.
   둘이 갈라지면 app/update/page.tsx 최상단 단정이 빌드를 깬다. */
export const VERSION = '2.10.1';

/* 배포 채널 = Cloudflare R2 (2026-09-09 분리). 바이너리(zxp)와 업데이트 매니페스트는
   더 이상 이 repo 의 public/ 에 없다 — 5MB 가 git 히스토리에 쌓이지 않고,
   사이트 빌드/배포가 죽어도 업데이트 배포는 살아 있다. */
export const DIST_BASE = 'https://dl.younameit.works';

/* 🔴 파일명에 버전을 박는다. 같은 이름(donys.zxp)을 릴리스마다 덮어쓰면 R2 커스텀 도메인이
   Cloudflare 캐시를 타므로 엣지가 구버전 5MB 를 계속 먹인다. 릴리스마다 캐시 퍼지를
   기억해야 하는데 그건 언젠가 반드시 잊는다. 버전이 파일명에 있으면 새 버전 = 새 URL 이라
   캐시 충돌이 존재 자체를 안 하고, 구버전 URL 도 살아 있어 롤백이 공짜다.
   🔴 접두사 = `younameit-` (2026-09-26 오너 — 내려받은 파일에 구 브랜드가 찍히지 않게). v2.7.1 부터다.
   구 `donys-*.zxp` 객체는 R2 에 **남긴다**: 롤백 자산이고, R2 `version.json` 의 `download` 와 레거시
   vercel 매니페스트(v2.5.0 이하 설치본이 본다)가 아직 그 이름을 가리킨다. 지우는 건 오너 확인 사안이다.
   릴리스 때 R2 에 이 이름으로 올라갔는지 200 부터 봐라 — 없으면 `/update` 버튼이 404 다. */
export const DOWNLOAD_URL = `${DIST_BASE}/younameit-${VERSION}.zxp`;

/* 사이트 정본 주소. 🔴 컴포넌트·JSON-LD 에 다시 박지 마라 — 가격이 다섯 곳에 흩어졌던 것과 같은 계열이다. */
export const SITE = 'https://younameit.works';

/* 사업자 정보 한 곳 — 푸터 사업자 줄 · 국문 법 3장 · 개인정보 보호책임자가 여기서 읽는다.
   🔴 전자상거래법 §10(사이버몰 초기화면 표시) · §13(통신판매업 신고번호)이 요구하는 **공개 의무 정보**다 (2026-09-30 오너
   *"한국은 사업자등록번호, 통신판매업, 개인정보 처리방침 등 필수 정보 — 영문 국문 각각 체크"*). 원본 = 오너 사업자등록증명(2026-09-22 발급).
   🔴 주민등록번호는 절대 싣지 마라 — 등록증에 같이 찍혀 있지만 공개 의무가 없고, 싣는 순간 개인정보 유출이다.
   🔴 `phone` 이 빈 값이면 **deployCheck `[biz]` 가 배포를 세운다**(§10 필수 표시). `mailOrderNo` 는 면제 중이라 경고만 한다(아래).
   번호를 발명하지 마라 — 오너가 채운다. */
export const BUSINESS = {
  name: { ko: '유네임잇', en: 'You Name It' },
  /* 영문 표기는 오너 확인 전 추정이다(여권 표기가 따로 있으면 그걸로) */
  ceo: { ko: '송동휘', en: 'Donghwi Song' },
  regNo: '365-75-00550',
  address: {
    ko: '경기도 시흥시 둔대로 40, 6층 654호 (광석동, 현대 테라타워)',
    en: '#654, 6F, 40 Dundae-ro, Siheung-si, Gyeonggi-do, Republic of Korea',
  },
  email: 'support@younameit.works',
  /* 2026-09-30 오너 — 대표 휴대폰 임시(*"일단 내 번호로 해두고 나중에 교체"*). 사업용 번호로 바꾸면 여기 한 곳. */
  phone: '010-8883-7610',
  /* 통신판매업 신고번호 — 🔴 **지금은 신고 면제**(오너 2026-09-30 *"전년도 판매건수 50건이 안 넘어서 아직 안 해도 됨"* ·
     공정위 고시 "직전연도 거래 50회 미만"). 빈 값이면 푸터·약관이 그 줄을 안 그린다. 매년 1월, 직전연도 판매가 50건을
     넘었으면 시흥시청(정부24)에 신고하고 번호를 여기 넣는다 — deployCheck `[biz]` 가 매 빌드 경고로 상기시킨다. */
  mailOrderNo: '',
  /* 호스팅서비스 제공자(§10) — `younameit.works` 응답 헤더 `server: cloudflare` (2026-09-30 실측, Pages direct upload). */
  hosting: 'Cloudflare, Inc.',
};

/* 공정위 사업자정보 공개페이지(§10 — 표시한 정보의 진위를 확인하는 연결). 통신판매업 **신고 정보**를 띄우는 페이지라, 신고 면제 중
   (`mailOrderNo` 빈 값)엔 조회해도 빈 결과다(2026-10-14 실측 — 보안문자 뒤 무결과) → 그동안은 링크를 안 그린다(빈 문자열).
   신고하고 `mailOrderNo` 를 채우면 푸터·약관 링크와 deployCheck `[biz]` 링크 검사가 같이 켜진다. */
export const FTC_BIZ_URL = BUSINESS.mailOrderNo ? `https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${BUSINESS.regNo.replace(/-/g, '')}` : '';

/* SNS — 전부 같은 "younameit" 계정(오너 2026-10-26). 푸터(홈 · /ae · Docs · 읽는 면 공통)의 아이콘 줄이 읽는다.
   🔴 주소를 바꾸면 여기 한 곳만 고친다. 순서 = 화면 순서. */
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/willyounameit/' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@YouNameIt-10' },
  { id: 'x', label: 'X', url: 'https://x.com/YouNameI_Works' },
  { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@you.name.it548' },
] as const;

/* 인스타 릴스 — 홈 01 소개 오른쪽 큰 그림 자리(구 돌 카드)에 세 장 부채꼴로 선다(오너 2026-10-26 *"인스타 영상 몇 개 넣을까? 브랜드 소개니까"*).
   표지 = 인스타 그리드 표지(우리 게시물) 540×960 webp · 누르면 인스타 릴로 간다(영상은 인스타가 튼다 — 영화 클립이 섞인 편은 우리 서버에 안 올린다).
   순서 = 화면 왼→오. 가운데(앞) = 제품(Pattern Lab). */
export const IG_REELS = [
  { id: 'De1IZ37uy4X', url: 'https://www.instagram.com/willyounameit/reel/De1IZ37uy4X/', alt: { ko: '인스타 릴: 메멘토로 보는 구조 짜기', en: 'Instagram reel: building structure, with Memento' } },
  { id: 'De6dKj8uy8U', url: 'https://www.instagram.com/willyounameit/reel/De6dKj8uy8U/', alt: { ko: '인스타 릴: Pattern Lab 소개', en: 'Instagram reel: Pattern Lab' } },
  { id: 'DewOVCCOikZ', url: 'https://www.instagram.com/willyounameit/reel/DewOVCCOikZ/', alt: { ko: '인스타 릴: 긴장감 만드는 법', en: 'Instagram reel: how to build suspense' } },
] as const;

/* ════ You Name It PR Plugin (`/pr` · `/ko/pr`) — prices, dates, links and the feature list, in one place ════════════
   Source of truth for the numbers = PR repo `gtm/facts.md`. Change a value here and that table changes with it
   (the GTM emails, legal drafts and Polar checklist read the same table).
   🔴 Do not mix with the AE values above (PRICE · CHECKOUT_URL · COUNTS · VERSION). `{price}` `{version}` in the PR dictionary
      (`lib/copy/pr.ts`) are filled from **this block** (`lib/copy.ts` `prNums`) before the AE table runs.
   Dates are **KST calendar days**. A day "opens" at 00:00 KST and an end day lasts until 23:59:59 KST (`lib/pr.ts` does the math).

   Launch shape (owner, 2026-11-10; PR repo PRD §14 "출시 재계획"): the free version and Pro go on sale on one day, and **Pro is a regular
   purchase** — the key comes right away and unlocks the Pro features already in the download. There is no pre-order: the pre-order
   articles of the Terms (14-2) and Refund (1-3) stay in the legal text but the page never uses them.
   Launch day (owner, 2026-11-15, PR repo PRD §14 "출시일 (2026-11-15)"): **2026-11-16, 18:00 KST**, free, Pro and the bundle together. Both dates below are
   KST *calendar days* that open at 00:00 KST, but the coordinator deploys this site at 18:00 and keeps the Polar products (P1 · P2 · P3) unpublished until
   then, so nothing can be bought before 18:00 even though a browser clock would already open the buttons at 00:00. Until the deploy, the site in production
   is the one without `/pr`. (An empty date = "date to be announced": every checkout closed, the `*.tbd` strings in `lib/copy/pr.ts`, and `deployCheck --release` blocks.) */
export const PR = {
  price: '$49.99',                // list price — what Pro costs after the launch price ends (the Terms §6 price)
  earlyPrice: '$34.99',           // the launch price, from the checkout-open day through `PR_EARLY_UNTIL` (`lib/pr.ts`). The unused Terms 14-2 calls it "early-bird" and reads this name
  earlyPriceUsd: '34.99',
  /* 🔴 THE launch date: the two dates the owner may move (they are the same day: owner, 2026-11-10 — free and Pro open together). **Empty = date to
     be announced** (owner, 2026-11-11): nothing opens and the copy says so. To launch, set BOTH to the same KST day (YYYY-MM-DD). Each one is a gate
     the browser re-checks against its own clock (`lib/pr.ts` `prOpenAt`), so a page built before the date opens by itself on the day.
     The real gate is Polar: keep a product unpublished until its day, and move the Pro launch-price discount (D1) dates with the launch day.
     (`as string`: the object is `as const`, and an empty literal type would make the dated branches unreachable for the type checker.) */
  launchOn: '2026-11-16' as string, // /pr goes public · the free version can be downloaded (free checkout link opens) — the same day as checkoutOpensOn
  /* Pro + bundle checkout opens. 🔴 Never before `PR_EFFECTIVE` in `lib/policy.ts` (the day the terms · privacy · refund revision with PR takes
     effect — 2026-11-14, owner decides separately whether it moves): nobody may buy under terms that do not cover the product.
     `deployCheck [pr]` and `npm run test:pr` fail when it is earlier. (Not imported: policy → analytics → product is a cycle.) */
  checkoutOpensOn: '2026-11-16' as string,   // same day as launchOn (18:00 KST deploy; Polar P2 · P3 are published at the same moment)
  /* The launch price keeps running through the day that is this many days after the checkout-open day (KST, inclusive; owner 2026-11-10, 14 days).
     `PR_EARLY_UNTIL` in `lib/pr.ts` does the sum and the page shows that date; while the date is empty the page says "the first {earlyDays} days".
     The Terms 14-2 (unused) reads this number too. */
  openEarlyDays: 14,
  bundlePrice: '$79.99',          // AE + PR Pro bundle — one key opens both (4 activations)
  preorderDeadline: '2026-12-15', // 🔴 not used by the page (regular purchase). Only the pre-order articles of the Terms 14-2 and Refund 1-3 read it, and they stay unused — delete it together with them
  aeCouponPct: 30,                // PR Pro discount code for AE buyers
  aeCouponEnd: '2026-12-31',      // KST, inclusive — after this the page drops the code offer by itself (`lib/pr.ts`)
  computers: 2,
  refundDays: 14,
  revalidateDays: 7,
  offlineDays: 30,
  remoteOffRefundDays: 30,        // a Pro feature switched off remotely longer than this → refund even after 14 days
  minPremiere: '25.6.4',          // 25.6.2 · 25.6.3 freeze panel scripts and are blocked
  /* The Premiere builds the Lab ran on (PR repo `docs/lab/2026-11-11-premiere27.md`, then the central night of 2026-11-15: 27.0 → 26.5.2 → 25.6.6).
     Shown in the specs and FAQ q11, so a build that did not pass that night comes out of this list before the deploy. */
  testedWin: '25.6.6 · 26.5.2 · 27.0',
  /* macOS (variant `launch/pr-v5e`, owner 2026-11-16: Windows and macOS ship together): the Mac Lab ran on Premiere Pro 27.0 on an Apple silicon Mac only
     (PR repo `MAC-REPORT.md` 2026-11-16). Mac 26.5.2 and Intel Macs are untested, so the copy says "only". */
  testedMac: '27.0',
  version: '1.0.0',               // 🔴 not by hand — the release tag's value (same rule as AE `VERSION`)
  /* Polar checkout links (production, PR repo `gtm/polar/polar-setup.md` §8). Empty = not made yet → the button renders without
     href (`data-pending="checkout"`) and deployCheck `[pr]` fails. */
  checkoutFree: 'https://buy.polar.sh/polar_cl_bEiq2i8tdwneJHwg1ziLo4vm9ivA1qXWoEppG37fX6n',
  checkoutPro: 'https://buy.polar.sh/polar_cl_TLpmGgP3luqCCFROg32FhyT3020MbhXPKblle4FIHYN',
  checkoutBundle: 'https://buy.polar.sh/polar_cl_9aU6PT1I0uE2NL6ukNCdcsdSGkmANGq7TT9fg2Acf5c',
  /* UXP companion (`.ccx`). The default 1.0.0 release ships none (no `.ccx` in the installer zip) → the page does not mention it.
     Owner session C (D2 · D3) runs on 2026-11-15 night; flip to true only when it picks a `.ccx` format AND the clean install (D20) confirms it —
     the `.ccx` install lines come back with it. Left `false` here on purpose (owner 2026-11-15). */
  companion: false,
  /* The day `PR_FEATURES[].state` was copied from the release registry (KST). Empty → deployCheck `[pr]` fails.
     Gate day (free and Pro ship together in v1.0.0, Pro locked by the license until checkout opens):
     PR repo `node gtm/tools/check-gtm.mjs --claims --registry <release>/src/features/registry.ts`
     → set each `state` below → set this to that day. */
  featuresFrozenOn: '2026-11-15',   // 11/15 (PR repo 4ed817a): every registry row but Speed ramp is on (Speed ramp off, owner 2026-11-15 night). FX Search (`fxconsole`) is back with its Windows shortcut window, Ease curve (`easecurve`) is new, Nest is gone.
} as const;

/* 🔴 THE feature list — one row per PR repo registry id (`src/features/registry.ts`, same order = screen order).
   Every feature claim on `/pr` is decided here and nowhere else: components look a feature up by id, the copy for it is
   `pr.f.<id>.*` in `lib/copy/pr.ts`. To trim a claim after the gate, change its `state` — not the components.
     tier    fact from the registry (what is free). Do not edit here.
     state   'on'      switched on in the release build → free features are described as available
             'off'     not in this release → free features appear by name under "still in the works"; Pro features by name under "later"
                       (FX Search, if tonight's Lab (2026-11-15) fails its criteria: PRD §14 "FX 검색 단축키 팝업" ships it `off` as a whole)
             'unbuilt' no code in v1, or taken out of the release by the owner (`claim: null` in PR repo `gtm/site/feature-claims.json`)
                       → appears nowhere, not even as a name, can never be 'on'. No row uses it today (Nest was deleted, not parked).
     launch  the Pro features the key unlocks on sale day: the price card and 05 list these by label. Since 2026-11-11 that is every Pro feature outside
             the toolkit (silence cut advanced · filler and NG-take candidates · XML fast path · captions · Chat); the Pro toolkit is listed by name
   Free AND Pro features that are 'on' are described on the page, each with its honesty note (`pr.f.<id>.claim|note`, from `feature-claims.json`):
   since 2026-11-10 Pro is sold in the same download, so a buyer reads what they pay for, approximations labelled.
   🔴 deployCheck `[pr]` blocks the deploy until `featuresFrozenOn` is set. If tonight's Lab fails a feature, flip its `state` here (and `featuresFrozenOn` stays the day it was decided).
   `keyauto` is a setting, not something we sell — it does not appear on the page (the XML fast path note and FAQ q15 say what it does). */
export type PrState = 'on' | 'off' | 'unbuilt';
type PrRow<I extends string> = { id: I; tier: 'free' | 'pro'; group: 'autocut' | 'captions' | 'chat' | 'toolkit' | 'infra'; state: PrState; launch: boolean };
/* Identity helper: keeps the ids as a literal union (`PrFeature`) while `state` stays the full `PrState` (an `as const` array
   would narrow it to the values used today, and `state === 'off'` would stop type-checking). */
const prRows = <I extends string>(rows: readonly PrRow<I>[]) => rows;
export const PR_FEATURES = prRows([
  { id: 'autocut.basic', tier: 'free', group: 'autocut', state: 'on', launch: false },
  { id: 'autocut.advanced', tier: 'pro', group: 'autocut', state: 'on', launch: true },
  { id: 'autocut.filler', tier: 'pro', group: 'autocut', state: 'on', launch: true },
  { id: 'autocut.ngTakes', tier: 'pro', group: 'autocut', state: 'on', launch: true },
  { id: 'autocut.xmlFastPath', tier: 'pro', group: 'autocut', state: 'on', launch: true },
  { id: 'captions.longform', tier: 'pro', group: 'captions', state: 'on', launch: true },
  { id: 'captions.shortform', tier: 'pro', group: 'captions', state: 'on', launch: true },
  { id: 'chat', tier: 'pro', group: 'chat', state: 'on', launch: true },
  { id: 'offset', tier: 'free', group: 'toolkit', state: 'on', launch: false },
  { id: 'anchor', tier: 'free', group: 'toolkit', state: 'on', launch: false },
  { id: 'bins', tier: 'free', group: 'toolkit', state: 'on', launch: false },
  { id: 'watchfolder', tier: 'free', group: 'toolkit', state: 'on', launch: false },
  { id: 'assets', tier: 'free', group: 'toolkit', state: 'on', launch: false },
  { id: 'fxconsole', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'wiggle', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'speedramp', tier: 'pro', group: 'toolkit', state: 'off', launch: false },   // owner 2026-11-15 night: out of v1.0 (PR repo 09b91e9), back when real Time Remapping keys work
  { id: 'easecurve', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'unnest', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'facetrack', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'denoise', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'beauty', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'collect', tier: 'pro', group: 'toolkit', state: 'on', launch: false },
  { id: 'keyauto', tier: 'free', group: 'infra', state: 'on', launch: false },
]);
export type PrFeature = (typeof PR_FEATURES)[number]['id'];

/* Legal links — the PR additions go onto the **existing** three pages (PR repo `gtm/legal/README.md`), so the paths stay.
   `notices` = third-party license notices page (PRD §8): `/pr/notices` · `/ko/pr/notices`, the plugin's THIRD-PARTY-NOTICES.md
   (`lib/notices.ts` says where the copy lives and when to re-copy it). Empty = no link, and deployCheck `[pr]` fails. */
export const PR_LEGAL = {
  terms: '/terms',
  privacy: '/privacy',
  refund: '/refund',
  notices: '/pr/notices',
} as const;
