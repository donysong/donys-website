import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 정적 사이트 → Cloudflare Pages 에 그대로 올린다
  /* 🔴 404 는 `app/global-not-found.tsx` 다. 루트 레이아웃이 둘(`(en)`·`(ko)`)이라 `app/not-found.tsx` 를
     입힐 단일 레이아웃이 없다 — 이 플래그 없이는 Next 기본 흰 화면(`lang` 없음·링크 0)이 `out/404.html` 로 구워졌다. */
  experimental: { globalNotFound: true },
};

export default nextConfig;
