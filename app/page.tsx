import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Loop from '@/components/Loop';
import Proof from '@/components/Proof';
import Press from '@/components/Press';
import Panels from '@/components/Panels';
import { SpotStrip } from '@/components/Spots';
import Stance from '@/components/Stance';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Notes from '@/components/Notes';
import Footer from '@/components/Footer';
import { PRICE_USD, CHECKOUT_URL, COUNTS, VERSION, SITE } from '@/lib/product';

/* 구글 리치결과용 구조화 데이터. 🔴 가격·버전·카탈로그 숫자를 여기 다시 박지 마라 —
   전부 lib/product.ts 에서만 읽는다. */
/* canonical 은 페이지마다 선언한다 — 루트 레이아웃에 두면 하위가 전부 상속한다(layout.tsx 주석). */
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

/* 판 순서 = 인쇄 순서다 (계획서 §4). 절을 넣거나 뺄 때 Plate NN / 07 라벨도 같이 고쳐라 —
   라벨은 장식이 아니라 이 페이지가 몇 판짜리 인쇄물인지를 말한다. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Loop />
        <section className="mx-auto max-w-[1240px] px-6 pb-10 md:px-10">
          <SpotStrip
            ids={['roundCorners', 'sequenceLayers', 'carouselRig', 'proximityRig', 'edgeBoil']}
            note="what the panel draws — drawn by the panel"
          />
        </section>
        <Proof />
        <section className="mx-auto max-w-[1240px] px-6 pb-4 md:px-10">
          <SpotStrip
            ids={['writeOn', 'autoMarker', 'shadowCaster', 'clickReact', 'pointsToNulls']}
            note="19 of 39 shown · pulled straight from the panel"
          />
        </section>
        <Panels />
        <Press />
        <Stance />
        <Pricing />
        <FAQ />
        <Notes />
      </main>
      <Footer />
    </>
  );
}
