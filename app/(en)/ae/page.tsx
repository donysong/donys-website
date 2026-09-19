import AePage from '@/components/site4/ae/AePage';
import { LangProvider } from '@/components/site3p/lang';
import { PRICE, PRICE_USD, CHECKOUT_URL, COUNTS, VERSION, SITE } from '@/lib/product';

/* 🔴 제품 문장의 자리는 이 페이지 하나다(루트 레이아웃은 브랜드다 — §14 분리).
   canonical 은 페이지마다 선언한다. 루트에 두면 하위 페이지가 "홈의 중복" 이 된다. */
export const metadata = {
  title: 'AE Plugin',
  description: `An After Effects panel that builds what you press or describe on real, editable layers — ${COUNTS.scripts} one-click tools, ${COUNTS.motion} motion presets, ${COUNTS.textPresets} text presets, a curve editor, expressions, and a Chat panel that runs on your own Claude plan. ${PRICE} once, two machines.`,
  alternates: {
    canonical: '/ae',
    languages: { en: '/ae', ko: '/ko/ae', 'x-default': '/ae' },
  },
  openGraph: {
    title: 'You Name It AE Plugin',
    description: `Seven After Effects panels. One button for the chores you can name, one sentence for the ones you can't. ${PRICE} once.`,
    type: 'website',
    url: `${SITE}/ae`,
    siteName: 'You Name It',
  },
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
