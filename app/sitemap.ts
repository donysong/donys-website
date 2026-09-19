/* 🔴 `output:'export'` 에서 이 파일은 Route Handler 로 컴파일되고, 정적 export 는
   여기에 명시적 `dynamic='force-static'` 을 요구한다. 없으면 빌드가
   `Failed to collect page data` 로 죽는다(2026-09-09 실측). 지우지 마라. */
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';

const SITE = 'https://younameit.works';

export default function sitemap(): MetadataRoute.Sitemap {
  // 빌드마다 값이 바뀌는 게 의도다 — 정적 export 는 배포 시점 = 빌드 시점이라
  // "마지막으로 실제 콘텐츠가 바뀐 날짜"를 별도로 추적할 장치가 없다.
  const now = new Date();
  return [
    { url: `${SITE}/`,        lastModified: now, changeFrequency: 'weekly', priority: 1 },
    /* 🔴 §14 분리 — 제품은 하위 경로다. `/ae` 가 파는 면, `/ae/docs` 가 읽는 면(로그인·구매 없이 공개).
       루트가 제품 페이지인 상태는 제품이 둘이 되는 날 반드시 깨진다. */
    { url: `${SITE}/ae`,      lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ae/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    /* 🔴 국문은 **따로 구워진 페이지**다(`?lang=ko` 클라이언트 스왑이 아니다). 색인 대상이니 싣는다.
       법·업데이트 페이지는 국문 판본이 없어서 여기 없다 — 만들기 전엔 넣지 마라(404 를 색인시킨다). */
    { url: `${SITE}/ko`,         lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ko/ae`,      lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/ko/ae/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/update`,  lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/refund`,  lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
