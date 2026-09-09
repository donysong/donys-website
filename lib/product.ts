/* 제품 사실 한 곳. 🔴 가격을 컴포넌트에 다시 박지 마라 —
   $30 이 Navbar·Hero·Pricing·layout 메타·terms 다섯 곳에 흩어져 있었고,
   가격이 오른 뒤에도 사이트는 옛 값을 계속 보여줬다. */
export const PRICE = '$49.99';
export const PRICE_USD = '49.99';

/* Polar = 활성 결제 provider */
export const CHECKOUT_URL =
  'https://buy.polar.sh/polar_cl_NebuNphvrIXOb3G8sgLi2sfZd6TUZfjxyxklW2VUPmY';

/* 카탈로그 숫자 — 🔴 코드에서 센 값이다. 손으로 올리지 마라.
   2026-09-07 실측(플러그인 repo):
     scripts        src/data/builtinScripts.ts        42
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
  scripts: 42,
  motion: 26,
  textPresets: 61,
  gradients: 62,
  curves: 21,
  expressions: 69,
  tools: 56,
  skills: 29,
} as const;

/* 최신 릴리스 버전 한 곳. app/update/page.tsx 의 다운로드 링크·표시 문구가 여기서 읽는다.
   🔴 v2.5.0 을 컷한 뒤에도 이 페이지가 두 자리에서 v2.4.0 을 보여주던 전례가 있다.
   릴리스 노트 이력(RELEASES)은 항목마다 자기 version 을 갖지만, **"최신"의 정의는 여기 하나**다.
   둘이 갈라지면 app/update/page.tsx 최상단 단정이 빌드를 깬다. */
export const VERSION = '2.5.0';

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
