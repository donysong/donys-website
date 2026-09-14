import Page3P from '@/components/site3p/Page';
import { LangProvider } from '@/components/site3p/lang';
import { PRICE_USD, CHECKOUT_URL, COUNTS, VERSION, SITE } from '@/lib/product';

export const metadata = { alternates: { canonical: '/' } };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'You Name It',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Windows, macOS',
  softwareVersion: VERSION,
  url: SITE,
  description: `An After Effects panel that builds what you describe on real, editable layers — ${COUNTS.scripts} scripts, ${COUNTS.motion} motion presets, ${COUNTS.gradients} gradients, a graph editor, expressions, and Claude working with ${COUNTS.tools} tools and ${COUNTS.skills} skills.`,
  offers: {
    '@type': 'Offer',
    price: PRICE_USD,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: CHECKOUT_URL,
  },
  publisher: { '@type': 'Organization', name: 'You Name It', url: SITE },
};

/* 🔴 본문은 전부 `.p3` 아래에 있다 — 프로토 v3.3 이식본(components/site3p/).
   구 섹션 컴포넌트(Hero/Loop/Proof/Press/Panels/Spots/Stance/Pricing/FAQ/Notes)는 이 페이지가
   더 이상 쓰지 않는다. 남겨두면 두 디자인이 갈라져서 다음 사람이 어느 쪽을 고쳐야 할지 모른다. */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LangProvider>
        <Page3P />
      </LangProvider>
    </>
  );
}
