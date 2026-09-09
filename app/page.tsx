import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
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
  description: `An After Effects panel that builds what you describe — ${COUNTS.scripts} scripts, ${COUNTS.motion} motion presets, ${COUNTS.gradients} gradients, ${COUNTS.textPresets} text presets, ${COUNTS.curves} curves, ${COUNTS.expressions} expressions, and Claude working on your real layers with ${COUNTS.tools} tools and ${COUNTS.skills} skills.`,
  offers: {
    '@type': 'Offer',
    price: PRICE_USD,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: CHECKOUT_URL,
  },
  publisher: { '@type': 'Organization', name: 'You Name It', url: SITE },
};

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
        <Features />
        <Demo />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
