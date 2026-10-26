/* 웹 폰트 — **우리 도메인에서 서빙한다** (2026-09-30 오너 *"폰트 자체 호스팅 ㄱㄱ"*).
   🔴 구 `<link>` 두 줄(fonts.googleapis.com · cdn.jsdelivr.net)을 되살리지 마라 — 방문자 브라우저가 Google·jsDelivr 에
   IP 를 직접 보냈고, 그래서 개인정보 처리방침에 "브라우저가 직접 요청하는 제3자" 항목이 따로 있어야 했다
   (플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) C6). deployCheck `[third-party]` 가 구운 HTML 에서 그 호스트를 세운다.

   - 영문 = Google Sans Flex(OFL) — `next/font/google` 이 **빌드 때** 받아서 `/_next/static/media` 로 굽는다(런타임 요청 0).
     🔴 `ROND`·`wdth` 축을 빼지 마라 — 디스플레이가 wdth 112 · ROND 100 을 쓴다. 축이 없으면 조용히 기본 폭으로 떨어진다.
     패밀리 이름은 next/font 가 해시로 바꾸므로 CSS 는 문자열 `'Google Sans Flex'` 가 아니라 **`var(--font-gsf)`** 를 쓴다.
   - 국문 = Pretendard Variable(OFL) — npm `pretendard`(CDN 과 같은 v1.3.9)의 dynamic-subset CSS 를 SiteHtml 이 import 한다.
     글자 범위별 92조각이라 페이지에 쓰인 글자의 조각만 받는다(패밀리 이름은 그대로 'Pretendard Variable').
     🔴 한글까지 Flex 로는 **못 간다** — Flex 에 한글 글리프가 0 자다(2026-10-26 cmap 실측: google/fonts 원본 · 오너 PC 설치본 둘 다).
   🔴 폰트는 이 둘뿐이다 (2026-10-26 오너 *"국문 영문 모두 Google Sans Flex 로 통일"* → 라틴 = Flex · 한글 = Pretendard).
   타자기(Special Elite · Nanum Gothic Coding) · 느림보고딕(`/ae` 브랜드 라벨)은 그날 뺐다 — 되살리지 마라.
   (구 IBM Plex Mono 는 쓰는 곳이 0 이라 받지 않는다 — v3.2 에서 모노 폐기.)
   ⚠️ 빌드 경고 *"Failed to find font override values for font `Google Sans Flex`"* 는 무해하다 — next/font 에 이 패밀리의
   대체 글꼴 보정표가 없어 보정 폴백만 안 만든다(구 CDN 판도 보정 없이 썼다). 파일 크기는 CDN 판과 바이트 단위로 같다. */
import { Google_Sans_Flex } from 'next/font/google';
import localFont from 'next/font/local';

export const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin', 'latin-ext'],
  axes: ['ROND', 'wdth'],
  display: 'swap',
  variable: '--font-gsf',
});

/* 국문 = 원스토어 ONE 모바일고딕 — 2026-10-26 오너 *"폰트 역시 너무 뾰족해. one모바일고딕으로 롤백"*(구 proto3 가 쓰던 얼굴).
   본문 = 본문체 Regular 400 · Bold 700 · 디스플레이(굵기 800 자리) = 제목체(한 굵기). 나눔스퀘어라운드(같은 날 시도)는 걷었다.
   🔴 라이선스 = 상업·웹 탑재 가능, **파일 수정·재배포 금지** — 파일은 git 밖(assets/fonts/one-mobile/, tools/syncFonts.mjs 가 공식 zip 에서 꺼낸다).
      변환하지 않은 공식 OTF 그대로다(한 파일 0.9–1.9MB) → 미리 받지 않는다(preload:false): 한글이 그려지는 국문 면에서만 받는다.
   Pretendard 는 이 글꼴에 없는 글자의 뒷받침으로만 남는다. */
export const oneMobile = localFont({
  src: [
    { path: '../../assets/fonts/one-mobile/ONE Mobile OTF Regular.otf', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/one-mobile/ONE Mobile OTF Bold.otf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  variable: '--font-om',
  fallback: ['Pretendard Variable', 'system-ui', 'sans-serif'],
});
export const oneMobileTitle = localFont({
  src: '../../assets/fonts/one-mobile/ONE Mobile Title OTF.otf',
  weight: '400 900',
  display: 'swap',
  preload: false,
  variable: '--font-omt',
  fallback: ['Pretendard Variable', 'system-ui', 'sans-serif'],
});

/* 국문 빨간 잉크 판 제목(Plate3 `.pl`)만 = GS 혜자로운 Bold — 2026-10-26 오너 *"붉은색 헤드라인만"*. 검정 소제목·본문은 ONE 모바일 그대로.
   라이선스(GS리테일): 웹폰트 탑재 가능 · 출처 표기 불필요 · 수정·재배포 금지 · 🔴 BI/CI(회사명·브랜드명·로고·슬로건·캐치프레이즈) 금지 —
   브랜드명("You Name It")·"AE PLUGIN" 은 라틴이라 Flex 로 찍혀 해당 없다. 한글 2,780자뿐 — 없는 글자는 ONE 제목체로 넘어간다. */
export const hyejaroun = localFont({
  src: '../../assets/fonts/one-mobile/GSHYEJAROUN-Bold.otf',
  weight: '100 900',
  display: 'swap',
  preload: false,
  variable: '--font-hyeja',
  fallback: ['Pretendard Variable', 'system-ui', 'sans-serif'],
});
