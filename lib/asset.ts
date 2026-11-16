/* `public/` 그림(`/riso/*` · `/pr/*`)의 주소를 만든다. 🔴 `<img src>` · `poster` · 인라인 `style` 의 `url()` 은 전부 여기를 거친다 —
   경로를 컴포넌트에 `"/riso/…"` 로 다시 박지 마라(`tools/deployCheck.mjs [assethost]` 가 막는다).
   🔴 영상(`.webm` · `.mp4`)은 여기를 거치지 않는다: `pages.dev` 는 Range 요청에 200 + 전체를 줘서 Safari 가 거부한다(`PanelClip.tsx` 머리 주석).

   왜: 한국에서 `younameit.works` 는 Cloudflare LAX 를 거쳐 요청마다 1~2초가 걸리고, 같은 파일을 프로젝트 주소 `younameit.pages.dev`
   로 받으면 서울(ICN)에서 온다(`next.config.ts` `assetPrefix` 주석). Next 는 `public/` 에 `assetPrefix` 를 안 붙인다(공식 문서) → 우리가 붙인다.
   값 = `YNI_ASSET_PREFIX`(프로덕션 빌드 `tools/buildProd.mjs` 만 준다. `next.config.ts` 의 `env` 가 클라이언트 번들에도 박아 준다).
   비면(개발 · 로컬 미리보기) 상대 경로 그대로다.

   🔴 정식 도메인 그대로 두는 것: `og:image` · `twitter:image` · JSON-LD · 사이트맵 · 파비콘 — 크롤러·미리보기가 읽는다. 그건 `SITE`(lib/product.ts) 로 만든다.
   CSS 파일 안의 `url(/riso/…)` 는 손댈 게 없다: 스타일시트 자체가 prefix 호스트에서 오므로 브라우저가 그 호스트 기준으로 푼다.
   (마스크 이미지는 교차 출처라 CORS 가 필요한데 `pages.dev` 가 모든 파일에 `Access-Control-Allow-Origin: *` 를 준다.) */
const HOST = process.env.YNI_ASSET_PREFIX ?? '';

export const asset = (path: string): string => HOST + path;
