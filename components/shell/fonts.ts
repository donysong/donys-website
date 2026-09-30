/* 웹 폰트 — **우리 도메인에서 서빙한다** (2026-09-30 오너 *"폰트 자체 호스팅 ㄱㄱ"*).
   🔴 구 `<link>` 두 줄(fonts.googleapis.com · cdn.jsdelivr.net)을 되살리지 마라 — 방문자 브라우저가 Google·jsDelivr 에
   IP 를 직접 보냈고, 그래서 개인정보 처리방침에 "브라우저가 직접 요청하는 제3자" 항목이 따로 있어야 했다
   (플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) C6). deployCheck `[third-party]` 가 구운 HTML 에서 그 호스트를 세운다.

   - 영문 = Google Sans Flex(OFL) — `next/font/google` 이 **빌드 때** 받아서 `/_next/static/media` 로 굽는다(런타임 요청 0).
     🔴 `ROND`·`wdth` 축을 빼지 마라 — 디스플레이가 wdth 112 · ROND 100 을 쓴다. 축이 없으면 조용히 기본 폭으로 떨어진다.
     패밀리 이름은 next/font 가 해시로 바꾸므로 CSS 는 문자열 `'Google Sans Flex'` 가 아니라 **`var(--font-gsf)`** 를 쓴다.
   - 국문 = Pretendard Variable(OFL) — npm `pretendard`(CDN 과 같은 v1.3.9)의 dynamic-subset CSS 를 SiteHtml 이 import 한다.
     글자 범위별 92조각이라 페이지에 쓰인 글자의 조각만 받는다(패밀리 이름은 그대로 'Pretendard Variable').
   (구 IBM Plex Mono 는 쓰는 곳이 0 이라 받지 않는다 — v3.2 에서 모노 폐기.)
   ⚠️ 빌드 경고 *"Failed to find font override values for font `Google Sans Flex`"* 는 무해하다 — next/font 에 이 패밀리의
   대체 글꼴 보정표가 없어 보정 폴백만 안 만든다(구 CDN 판도 보정 없이 썼다). 파일 크기는 CDN 판과 바이트 단위로 같다. */
import { Google_Sans_Flex, Nanum_Gothic_Coding, Special_Elite } from 'next/font/google';

export const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin', 'latin-ext'],
  axes: ['ROND', 'wdth'],
  display: 'swap',
  variable: '--font-gsf',
});

/* 타자기 — 표지 돌 카드의 두 줄에만 쓴다(2026-09-30 오너 레퍼런스 `doru 1.png`). 영문 = Special Elite(OFL · 잉크 번진 타자기),
   국문 = Nanum Gothic Coding(OFL · 고정폭 — 한글 타자기의 한 칸 한 글자). 국문은 글자 범위별 조각이라 미리 받지 않는다. */
export const typewriter = Special_Elite({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-type' });
export const typewriterKo = Nanum_Gothic_Coding({ weight: '400', subsets: ['latin'], display: 'swap', preload: false, variable: '--font-type-ko' });
