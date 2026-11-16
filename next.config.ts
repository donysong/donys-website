import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 정적 사이트 → Cloudflare Pages 에 그대로 올린다
  /* 🔴 404 는 `app/global-not-found.tsx` 다. 루트 레이아웃이 둘(`(en)`·`(ko)`)이라 `app/not-found.tsx` 를
     입힐 단일 레이아웃이 없다 — 이 플래그 없이는 Next 기본 흰 화면(`lang` 없음·링크 0)이 `out/404.html` 로 구워졌다. */
  experimental: { globalNotFound: true },
  /* 🔴 2026-11-16 — 한국에서 `younameit.works` 는 Cloudflare 로스앤젤레스(LAX)를 거친다(`cdn-cgi/trace` colo=LAX): 1.3MB 글꼴이 7~30초.
     같은 파일을 프로젝트 주소 `younameit.pages.dev` 로 받으면 서울(ICN)에서 1초 안이다(실측 같은 날: 글꼴 Bold 0.95s vs 6.9s).
     그래서 프로덕션 빌드(`tools/buildProd.mjs`)만 `_next/static`(JS · CSS · 글꼴)을 그 주소에서 받게 한다. `pages.dev` 는 이미
     `Access-Control-Allow-Origin: *` 를 주므로 글꼴 교차 출처가 된다. 환경변수가 없으면(로컬 · 미리보기) 예전처럼 같은 출처다 —
     프리뷰 배포가 프로덕션 별칭의 해시 파일을 가리키면 깨지기 때문이다. */
  assetPrefix: process.env.YNI_ASSET_PREFIX || undefined,
};

export default nextConfig;
