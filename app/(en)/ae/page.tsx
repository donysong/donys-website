import AePage from '@/components/site4/ae/AePage';
import { LangProvider } from '@/components/site3p/lang';
import { PRICE, PRICE_USD, CHECKOUT_URL, COUNTS, VERSION, SITE } from '@/lib/product';
import { share } from '@/lib/meta';

/* 🔴 제품 문장의 자리는 이 페이지 하나다(루트 레이아웃은 브랜드다 — §14 분리).
   canonical 은 페이지마다 선언한다. 루트에 두면 하위 페이지가 "홈의 중복" 이 된다. */
export const metadata = {
  /* 🔴 제품명 규칙 — 한 줄 자리에는 `You Name It AE Plugin`(브랜드 = You Name It). `absolute` 라
     레이아웃 template(`— You Name It`)이 브랜드를 두 번 붙이지 않는다. */
  title: { absolute: 'You Name It AE Plugin — panels for After Effects' },
  description: `After Effects panels that build what you press or describe on real, editable layers — ${COUNTS.scripts} one-click tools, ${COUNTS.motion} motion presets, ${COUNTS.textPresets} text presets, a curve editor, expressions, and a Chat panel that runs on your own Claude or ChatGPT plan. ${PRICE} once, two computers.`,
  alternates: {
    canonical: '/ae',
    languages: { en: '/ae', ko: '/ko/ae', 'x-default': '/ae' },
  },
  ...share({
    path: '/ae',
    title: 'You Name It AE Plugin',
    description: `The repetitive setup is one button. The rest you describe in plain words — and it lands on your layers, still editable. ${PRICE} once.`,
    card: 'product',
    lang: 'en',
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
  description: `An After Effects panel that builds what you press or describe on real, editable layers — ${COUNTS.scripts} one-click tools, ${COUNTS.motion} motion presets, ${COUNTS.gradients} gradients, ${COUNTS.curves} easing curves, ${COUNTS.expressions} expressions, and Claude working with ${COUNTS.tools} tools and ${COUNTS.skills} skills.`,
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
      <LangProvider initial="en">
        <AePage />
      </LangProvider>
    </>
  );
}
