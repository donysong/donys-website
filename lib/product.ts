/* 제품 사실 한 곳. 🔴 가격을 컴포넌트에 다시 박지 마라 —
   $30 이 Navbar·Hero·Pricing·layout 메타·terms 다섯 곳에 흩어져 있었고,
   가격이 오른 뒤에도 사이트는 옛 값을 계속 보여줬다. */
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
     curves         src/data/builtinCurves.ts         21
     expressions    src/data/builtinExpressions.ts    69  ← 구 "80+" 는 과장이었다
     MCP tools      src/chat/mcp/schemas.ts           56
     skills         src/chat/runtime/skillsBundle.ts  29 */
export const COUNTS = {
  scripts: 39,
  motion: 26,
  textPresets: 61,
  gradients: 62,
  curves: 21,
  expressions: 69,
  tools: 56,
  skills: 29,
  /* 출고 이펙트. 🔴 이력이 14 → 4 → 5 다 — 2026-09-09 오너가 닫힌 결정을 직접 열어
     `riso-print` 를 더했다(CLAUDE.md 닫힌 표 · `harnessLint [seed]` 가 실측한다).
     은퇴한 10종은 그대로 은퇴다. 여기 숫자를 올리기 전에 그 표부터 봐라. */
  effects: 5,
} as const;

/* 최신 릴리스 버전 한 곳. app/update/page.tsx 의 다운로드 링크·표시 문구가 여기서 읽는다.
   🔴 v2.5.0 을 컷한 뒤에도 이 페이지가 두 자리에서 v2.4.0 을 보여주던 전례가 있다.
   릴리스 노트 이력(RELEASES)은 항목마다 자기 version 을 갖지만, **"최신"의 정의는 여기 하나**다.
   둘이 갈라지면 app/update/page.tsx 최상단 단정이 빌드를 깬다. */
export const VERSION = '2.7.1';

/* 배포 채널 = Cloudflare R2 (2026-09-09 분리). 바이너리(zxp)와 업데이트 매니페스트는
   더 이상 이 repo 의 public/ 에 없다 — 5MB 가 git 히스토리에 쌓이지 않고,
   사이트 빌드/배포가 죽어도 업데이트 배포는 살아 있다. */
export const DIST_BASE = 'https://dl.younameit.works';

/* 🔴 파일명에 버전을 박는다. 같은 이름(donys.zxp)을 릴리스마다 덮어쓰면 R2 커스텀 도메인이
   Cloudflare 캐시를 타므로 엣지가 구버전 5MB 를 계속 먹인다. 릴리스마다 캐시 퍼지를
   기억해야 하는데 그건 언젠가 반드시 잊는다. 버전이 파일명에 있으면 새 버전 = 새 URL 이라
   캐시 충돌이 존재 자체를 안 하고, 구버전 URL 도 살아 있어 롤백이 공짜다. */
export const DOWNLOAD_URL = `${DIST_BASE}/donys-${VERSION}.zxp`;

/* 사이트 정본 주소. 🔴 컴포넌트·JSON-LD 에 다시 박지 마라 — 가격이 다섯 곳에 흩어졌던 것과 같은 계열이다. */
export const SITE = 'https://younameit.works';
