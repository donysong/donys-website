import Home from '@/components/site4/home/Home';
import { LangProvider } from '@/components/site3p/lang';
import { PRICE_USD, CHECKOUT_URL, VERSION, SITE } from '@/lib/product';
/* 🔴 `/ko` = 루트의 **국문 판본**. 내용은 같고 로캘만 박혀 있다(`initial="ko"`).
   국문을 클라이언트 토글로만 두면 구워진 HTML 이 EN 한 벌뿐이라 주소도 색인도 없다 — 그래서 갈라 굽는다.
   🔴 루트는 **브랜드 면**이다 — 제품 면이 아니다(§14). 제품 상세·가격·FAQ 는 `/ae` 가 들고 있고,
   여기서 파는 건 스튜디오다. 그래서 canonical 만 남기고 title/description 을 브랜드로 갈았다. */
export const metadata = {
  title: 'You Name It — 뭐든, 말만 해.',
  description:
    '창작하는 사람의 손을 더는 도구와 콘텐츠를 만듭니다. 영상·도구·글 — 매체는 안 가립니다. 첫 번째는 After Effects 패널, You Name It AE Plugin 입니다.',
  /* 🔴 국문은 `/ko` 에 **따로 구워진다**(클라이언트 스왑이 아니다) — 둘을 hreflang 으로 묶어 준다.
     안 묶으면 구글이 같은 내용의 두 페이지를 중복으로 읽는다. */
  alternates: {
    canonical: '/ko',
    languages: { en: '/', ko: '/ko', 'x-default': '/' },
  },
};

/* 🔴 루트의 JSON-LD 는 `Organization` 이다. 구 페이지는 `SoftwareApplication` 이었는데,
   제품이 `/ae` 로 내려간 지금 루트에 제품 스키마를 두면 구글이 두 URL 을 같은 제품으로 읽는다.
   제품 상세(카탈로그 수·기능)는 `/ae` 가 선언한다 — 여기는 "누가 파는가"만 말한다. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'You Name It',
  url: SITE,
  logo: `${SITE}/riso/logo-red.webp`,
  email: 'support@younameit.works',
  description:
    'A studio that makes tools and content for people who create — video, tools, writing.',
  makesOffer: {
    '@type': 'Offer',
    price: PRICE_USD,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: CHECKOUT_URL,
    itemOffered: {
      '@type': 'SoftwareApplication',
      name: 'You Name It AE Plugin',
      url: `${SITE}/ae`,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Windows, macOS',
      softwareVersion: VERSION,
    },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LangProvider initial="ko">
        <Home />
      </LangProvider>
    </>
  );
}
