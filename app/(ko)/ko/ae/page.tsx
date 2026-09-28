import AePage from '@/components/site4/ae/AePage';
import { LangProvider } from '@/components/site3p/lang';
import { PRICE, PRICE_USD, CHECKOUT_URL, COUNTS, VERSION, SITE } from '@/lib/product';
import { share } from '@/lib/meta';

/* 🔴 `/ko/ae` = 제품 페이지의 **국문 판본**(`initial="ko"`). 정적 export 라 로캘마다 HTML 이 따로 구워진다.
   JSON-LD 설명도 국문이다(2026-09-29 L5) — 구조화 데이터는 그 면에 보이는 글과 같은 언어여야 하고, 아래 메타가 국문인 것과 같은 이유다.
   🔴 제품 문장의 자리는 이 페이지 하나다(루트 레이아웃은 브랜드다 — §14 분리).
   canonical 은 페이지마다 선언한다. 루트에 두면 하위 페이지가 "홈의 중복" 이 된다. */
export const metadata = {
  /* 🔴 제품명 규칙 — 한 줄 자리에는 `You Name It AE Plugin`(브랜드 = You Name It). `absolute` 라
     레이아웃 template(`— You Name It`)이 브랜드를 두 번 붙이지 않는다.
     🔴 국문 판본의 메타는 **국문이다** — 영문을 두면 국문 검색 결과·카톡 미리보기에 영어가 뜬다
     (2026-09-26 이전엔 설명·og:url 이 영문판 것이었다). */
  title: { absolute: 'You Name It AE Plugin — After Effects 패널' },
  description: `누르거나 말로 설명한 것을 지금 연 컴프 안에 고칠 수 있는 레이어로 만드는 After Effects 패널. 원클릭 툴 ${COUNTS.scripts}개, 모션 프리셋 ${COUNTS.motion}개, 텍스트 프리셋 ${COUNTS.textPresets}개, 커브·익스프레션 에디터, 그리고 본인의 Claude 또는 ChatGPT 구독으로 도는 Chat. ${PRICE} 일회 구매, 컴퓨터 2대.`,
  alternates: {
    canonical: '/ko/ae',
    languages: { en: '/ae', ko: '/ko/ae', 'x-default': '/ae' },
  },
  ...share({
    path: '/ko/ae',
    title: 'You Name It AE Plugin',
    description: `반복 셋업은 버튼 하나로 끝납니다. 나머지는 말로 설명하면 당신 레이어 위에 고칠 수 있는 채로 앉습니다. ${PRICE} 일회 구매.`,
    card: 'product',
    lang: 'ko',
  }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'You Name It AE Plugin',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Windows, macOS',
  softwareVersion: VERSION,
  url: `${SITE}/ae`,
  description: `누르거나 말로 설명한 것을 고칠 수 있는 실제 레이어로 만드는 After Effects 패널. 원클릭 툴 ${COUNTS.scripts}개, 모션 프리셋 ${COUNTS.motion}개, 그라디언트 ${COUNTS.gradients}개, 이징 커브 ${COUNTS.curves}개, 익스프레션 ${COUNTS.expressions}개, 그리고 본인의 Claude 또는 ChatGPT 구독으로 도는 Chat 패널(툴 ${COUNTS.tools}개 · 스킬 ${COUNTS.skills}개).`,
  offers: {
    '@type': 'Offer',
    price: PRICE_USD,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: CHECKOUT_URL,
  },
  publisher: { '@type': 'Organization', name: 'You Name It', url: SITE },
};

export default function Ae() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LangProvider initial="ko">
        <AePage />
      </LangProvider>
    </>
  );
}
