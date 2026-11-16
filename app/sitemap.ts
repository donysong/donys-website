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
    /* PR 플러그인 판매 면(2026-10-10). 🔴 deployCheck `[pr]` 가 결제 링크·기능 동결·법 조항이 갖춰지기 전엔 배포를 세운다 —
       그러니 이 줄이 색인보다 먼저 나가는 일은 없다. */
    { url: `${SITE}/pr`,      lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ko/pr`,   lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    /* 🔴 국문은 **따로 구워진 페이지**다(`?lang=ko` 클라이언트 스왑이 아니다). 색인 대상이니 싣는다.
       법 3장 국문판은 2026-09-30 오너가 구 "영문 전용"(09-19)을 다시 열어 생겼다(사업자 등록 뒤 — 개인정보 처리방침은
       국문 독자가 읽을 수 있어야 한다). 🔴 국문 법문이 영문과 갈라지면 그 자체가 책임이다 — 한쪽을 고치면 같이 고쳐라. */
    { url: `${SITE}/ko`,         lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ko/ae`,      lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/ko/ae/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/ko/update`,  lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE}/update`,  lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/refund`,  lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/ko/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/ko/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/ko/refund`,  lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    /* 제3자 라이선스 고지(PR 플러그인, PRD §8) — 법 면과 같은 층. 라이선스 원문은 두 언어 모두 영어다. */
    { url: `${SITE}/pr/docs`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/ko/pr/docs`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/pr/notices`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/ko/pr/notices`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
