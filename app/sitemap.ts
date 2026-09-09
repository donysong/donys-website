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
    { url: `${SITE}/update`,  lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/refund`,  lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
