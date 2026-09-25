/* 공유 카드(Open Graph · X) 한 곳 — 모든 page.tsx 의 metadata 가 여기서 조립한다.

   🔴 **레이아웃에 `openGraph.url` 을 두지 마라** (2026-09-26 실측). 하위 페이지가 그 값을 물려받아
   Docs·update·법·`/ko` 링크를 공유하면 스크레이퍼가 **루트로 정규화**했다. 그래서 url 은 페이지마다 선언한다.
   🔴 Next 는 `openGraph` 를 **얕게 병합한다** — 페이지가 openGraph 를 하나라도 적으면 레이아웃의
   openGraph(이미지 포함)가 **통째로 사라진다**. `/ae` 가 그렇게 이미지 없는 카드로 나가고 있었다.
   그러니 페이지는 조각을 손으로 적지 말고 `share()` 가 돌려주는 **완전한** 객체를 펼친다.

   카드 두 장의 역할 — 브랜드 루트와 제품은 다른 물건이다(§14 분리):
     brand   `/` · `/ko` · 법 3장        — 제품 메타 없음
     product `/ae` · `/ko/ae` · Docs · 업데이트 — 제품 카드
   원본 = 플러그인 repo `tools/promo/out/og-*.png` (이 repo 에서 잘라 저장하지 마라 — 다음 재생성 때 갈라진다). */
import type { Metadata } from 'next';
import { SITE } from './product';

const CARDS = {
  brand: {
    url: '/images/promo/og-brand.png',
    alt: 'You Name It — We make tools and content for people who create.',
  },
  product: {
    url: '/images/promo/og-ae.png',
    alt: 'You Name It AE Plugin — The bottleneck is not the idea. It is the hands.',
  },
} as const;

/* `path` 를 빼면 url 없는 카드가 나온다 — **레이아웃 전용**(페이지가 share() 를 빠뜨렸을 때의 바닥).
   레이아웃이 url 을 가지면 위 🔴 의 상속 결함이 되살아난다. */
export function share({ path, title, description, card, lang }: {
  path?: string;
  title: string;
  description: string;
  card: keyof typeof CARDS;
  lang: 'en' | 'ko';
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = { ...CARDS[card], width: 1200, height: 630 };
  return {
    openGraph: {
      title,
      description,
      type: 'website',
      ...(path ? { url: `${SITE}${path === '/' ? '' : path}` } : {}),
      siteName: 'You Name It',
      /* 짝 언어는 `alternates.languages`(hreflang)가 말한다 — 법 3장은 짝이 없으니 여기선 적지 않는다. */
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
