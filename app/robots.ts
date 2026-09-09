/* 🔴 `output:'export'` 에서 이 파일은 Route Handler 로 컴파일되고, 정적 export 는
   여기에 명시적 `dynamic='force-static'` 을 요구한다. 없으면 빌드가
   `Failed to collect page data` 로 죽는다(2026-09-09 실측). 지우지 마라. */
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://younameit.works/sitemap.xml',
  };
}
