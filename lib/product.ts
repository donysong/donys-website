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
export const VERSION = '2.10.0';

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

/* ════ You Name It PR Plugin (`/pr` · `/ko/pr`) — 가격 · 날짜 · 링크 · 판 스위치 한 곳 ════════════════════════
   정본 = PR 플러그인 repo `gtm/facts.md`(맨 끝 절 "Proposed PR block"). 값을 여기서 바꾸면 그 표도 같이 바꾼다 —
   GTM 메일·영상·법 초안이 같은 표를 읽는다.
   🔴 위 AE 값(PRICE · CHECKOUT_URL · COUNTS · VERSION)과 섞지 마라. PR 사전(`lib/copy/pr.ts`)의 `{price}` `{version}` 은
      AE 값이 아니라 **이 블록**이 채운다(`lib/copy.ts` `prNums`) — 지금 PR 정가와 AE 가격이 같은 $49.99 라서 섞여도 티가 안 난다.
   날짜 = 전부 **KST 달력 날짜**, 끝 날짜는 그날 23:59:59 KST 까지다(`lib/pr.ts` 가 경계를 계산한다).
   🔴 체크아웃 세 개가 빈 값이면 deployCheck `[pr]` 가 배포를 세운다 — 누를 수 없는 구매 버튼을 내보내지 않는다.
      주소 = Polar 설정 체크리스트(PR repo `gtm/polar/polar-setup.md` §4 L1·L2·L3)에서 만든 링크. 발명하지 마라 — 오너가 채운다. */
export type PrMode = 'full' | 'preorder';
export const PR = {
  price: '$49.99',
  priceUsd: '49.99',
  earlyPrice: '$34.99',
  earlyPriceUsd: '34.99',
  earlyStart: '2026-10-31',       // KST — 런칭일. Polar D1 `starts_at` 과 같은 순간
  earlyEnd: '2026-11-13',         // KST, 그날 포함 — full 판의 얼리버드 마지막 날
  openEarlyDays: 14,              // preorder → Pro 가 열린 날부터(그날 포함) 얼리버드가 이어지는 날 수
  /* Pro 가 실제로 열린 날(KST). preorder 판이 full 판으로 넘어가는 날 오너가 채운다 — 그날이 earlyEnd 보다 뒤면
     얼리버드 끝 = 이 날 + openEarlyDays − 1 (facts.md "Early-bird after Pro opens"). 처음부터 full 이면 빈 값 그대로. */
  proOpenedOn: '',
  bundlePrice: '$79.99',          // AE + PR Pro 번들 — 키 하나로 둘 다(활성화 4)
  preorderDeadline: '2026-12-15', // KST, 그날 포함 — 그때까지 안 열리면 사전예약 전부 자동 전액 환불
  aeCouponPct: 30,                // AE 구매자 PR Pro 할인 코드
  aeCouponEnd: '2026-12-31',      // KST, 그날 포함 — 지나면 페이지가 코드 안내를 스스로 걷는다(`lib/pr.ts`)
  computers: 2,
  refundDays: 14,
  revalidateDays: 7,
  offlineDays: 30,
  remoteOffRefundDays: 30,        // Pro 기능을 원격으로 이보다 오래 끄면 14일이 지나도 환불
  minPremiere: '25.6.4',          // 25.6.2 · 25.6.3 은 스크립트가 멈춰 막혀 있다
  testedWin: '25.6.4 · 26.5.2',
  testedMac: '26.5.2',
  version: '1.0.0',               // 🔴 손으로 올리지 마라 — 출고 태그 값(AE `VERSION` 과 같은 규칙)
  sttRate: '$0.22',               // ElevenLabs 오디오 1시간 정가(2026-10) — 런칭 때 다시 확인
  /* Polar 체크아웃 — 🔴 빈 값 = 아직 없음(자리표시자). 컴포넌트는 빈 값이면 href 없는 버튼(`data-pending="checkout"`)을 그리고
     deployCheck `[pr]` 가 실패한다. L2(Pro) 에는 D1 얼리버드 할인이 링크에 미리 걸린다(polar-setup.md §4). */
  checkoutFree: '',
  checkoutPro: '',
  checkoutBundle: '',
  /* 🔴 판 스위치 — 'full'(Pro 결제 열림) | 'preorder'(무료판 + Pro 사전예약). 10/28 동결일에 오너가 정한다(PRD §0).
     빌드 때 `NEXT_PUBLIC_PR_MODE=preorder npm run build` 로 덮어 미리 볼 수 있다(아래 `PR_MODE`) — 배포는 이 값으로. */
  launchMode: 'full' as PrMode,
  /* 동반 플러그인(UXP `.ccx`)이 v1.0 에 들어가나 — 스파이크 D2. false 면 `.ccx` 문장이 전부 빠지고 대체 문장이 선다. */
  companion: true,
  /* 기능 상태를 출고 레지스트리에서 옮겨 적은 날(KST). 빈 값 = 아직 안 옮겼다 → deployCheck `[pr]` 실패.
     동결일(10/28) 절차: PR repo `node gtm/tools/check-gtm.mjs --claims --registry <release>/src/features/registry.ts`
     → `off` 인 id 를 아래 `PR_OFF` 에 적고 → 이 값을 그날로. */
  featuresFrozenOn: '',
  /* 약관·개인정보·환불 페이지에 PR 추가 조항(PR repo `gtm/legal/*-additions.md`)을 실었나. 🔴 10/24 까지(약관 제4조 7일 고지).
     false 면 deployCheck `[pr]` 실패 — 결제 페이지가 그 제품을 다루지 않는 약관을 걸고 나가지 않게. */
  legalReady: false,
} as const;

/* 빌드 때 판 덮어쓰기 — `NEXT_PUBLIC_` 이라 서버 렌더와 클라이언트 번들에 **같은 값으로** 박힌다(하이드레이션이 안 갈린다).
   값이 없거나 이상하면 `PR.launchMode`. deployCheck `[pr]` 가 구운 판(`data-pr-mode`)이 이 상수와 다르면 경고한다. */
const PR_MODE_ENV = process.env.NEXT_PUBLIC_PR_MODE;
export const PR_MODE: PrMode = PR_MODE_ENV === 'full' || PR_MODE_ENV === 'preorder' ? PR_MODE_ENV : PR.launchMode;

/* PR 기능 목록 — PR repo `src/features/registry.ts` 의 id · tier · group 그대로(순서 = 레지스트리 = 화면 순서).
   🔴 tier 는 사실이다(무엇이 무료인가) — 여기서 바꾸지 마라, 레지스트리가 정본이다.
   `keyauto` 는 파는 기능이 아니라 설정이라 표·목록에 안 나온다(FAQ 만). */
export const PR_FEATURES = [
  { id: 'autocut.basic', tier: 'free', group: 'autocut' },
  { id: 'autocut.advanced', tier: 'pro', group: 'autocut' },
  { id: 'autocut.filler', tier: 'pro', group: 'autocut' },
  { id: 'autocut.ngTakes', tier: 'pro', group: 'autocut' },
  { id: 'autocut.xmlFastPath', tier: 'pro', group: 'autocut' },
  { id: 'captions.longform', tier: 'pro', group: 'captions' },
  { id: 'captions.shortform', tier: 'pro', group: 'captions' },
  { id: 'chat', tier: 'pro', group: 'chat' },
  { id: 'offset', tier: 'free', group: 'toolkit' },
  { id: 'anchor', tier: 'free', group: 'toolkit' },
  { id: 'bins', tier: 'free', group: 'toolkit' },
  { id: 'watchfolder', tier: 'free', group: 'toolkit' },
  { id: 'assets', tier: 'free', group: 'toolkit' },
  { id: 'fxconsole', tier: 'pro', group: 'toolkit' },
  { id: 'wiggle', tier: 'pro', group: 'toolkit' },
  { id: 'speedramp', tier: 'pro', group: 'toolkit' },
  { id: 'unnest', tier: 'pro', group: 'toolkit' },
  { id: 'nest', tier: 'pro', group: 'toolkit' },
  { id: 'facetrack', tier: 'pro', group: 'toolkit' },
  { id: 'denoise', tier: 'pro', group: 'toolkit' },
  { id: 'collect', tier: 'pro', group: 'toolkit' },
  { id: 'keyauto', tier: 'free', group: 'infra' },
] as const;
export type PrFeature = (typeof PR_FEATURES)[number]['id'];

/* 🔴 출고 빌드에서 `off` 인 기능 — 동결일에 채운다(위 `featuresFrozenOn`). 여기 있는 기능은 페이지가 **이름만** 싣는다
   ("준비 중" 목록) — 주장·표 행·카드·FAQ 가 빠진다(PRD §0 "판매 페이지와 데모에는 출시본에 실제로 들어간 기능만").
   preorder 판에선 여기 없어도 Pro 기능은 전부 "사전예약 블록" 으로만 나간다(`lib/pr.ts` `prClaimable`). */
export const PR_OFF: readonly PrFeature[] = [];

/* preorder 판이 "Pro 가 열릴 때 들어온다" 고 약속하는 묶음(PRD §0) — 이 넷이 전부 §15 를 통과해야 Pro 가 열린다. */
export const PR_LAUNCH_SET: readonly PrFeature[] = ['autocut.advanced', 'captions.longform', 'captions.shortform', 'chat'];

/* 법 링크 — PR 추가 조항은 **기존 세 페이지에 붙는다**(PR repo `gtm/legal/README.md` — 두 제품이 갈라지지 않게 한 벌).
   그래서 주소는 지금 있는 면 그대로다. 조항별 앵커(`#…`)는 조항을 실은 뒤에만 단다 — 없는 id 는 deployCheck `[anchors]` 가 세운다.
   `notices` = 제3자 라이선스 고지 면(PRD §8 "앱과 사이트에"). 🔴 아직 없다 — 빈 값이면 링크를 안 그리고 deployCheck `[pr]` 가 실패한다. */
export const PR_LEGAL = {
  terms: '/terms',
  privacy: '/privacy',
  refund: '/refund',
  notices: '',
} as const;
