'use client';
/* `/pr` — You Name It PR Plugin 판매 면. 원문 = PR repo `gtm/site/pr-page.full.md`(판 A) · `pr-page.preorder.md`(판 B).
   판 순서 = 원문 순서(`/ae` 와 같은 뼈대 — 두 제품 면이 한 사이트로 읽히게):
     표지 → 01 누구를 → 02 무엇인가 → 03 기능 → 04 무료와 Pro → [판 B: 사전예약] → 가격 → FAQ + 사양(한 장) → 설치.
   종이 = 파랑 ↔ 노트 교대, 01 이 파랑이다(`/ae` 와 같다). 판 B 는 사전예약 판이 하나 끼어 뒤쪽 종이가 한 칸씩 밀린다 —
   그래서 번호·종이를 손으로 적지 않고 `ORDER` 에서 센다.

   🔴 판 스위치 = `lib/product.ts` `PR.launchMode`(빌드 때 `NEXT_PUBLIC_PR_MODE` 로 덮어 미리 볼 수 있다). 한 번에 한 판만 굽는다.
   🔴 이 면의 결제 CTA 는 전부 **PR Pro 결제**다(네비 외곽선 · 히어로 원 · 가격 판 버튼 · 레일 · 푸터). AE 결제(`CHECKOUT_URL`)를 걸지 마라 —
      셸이 AE 를 기본값으로 갖고 있어서 `buy` 를 빠뜨리면 PR 면에서 AE 를 판다. 무료판(외곽선 원)과 번들(외곽선)은 다른 상품이라 채움이 아니다.
   🔴 본문에 브랜드 서사 0단어(`/ae` 규칙 ①) — 브랜드로 가는 길은 푸터뿐이다. */
import Page4, { type NavLink } from '@/components/site4/Shell';
import { useT } from '@/components/site3p/lang';
import { PR, PR_MODE } from '@/lib/product';
import Hero from './Hero';
import Who from './Who';
import Posi from './Posi';
import Features from './Features';
import Tiers from './Tiers';
import Preorder from './Preorder';
import Price from './Price';
import Faq, { Specs } from './Faq';
import Install from './Install';
import { usePr } from './state';

const PRE = PR_MODE === 'preorder';
const ORDER = ['who', 'posi', 'what', 'tiers', ...(PRE ? ['preorder'] : []), 'price', 'faq', 'install'];

const LINKS: NavLink[] = [
  { href: '#who', k: 'pr.nav.who' },
  { href: '#what', k: 'pr.nav.what' },
  { href: '#price', k: 'pr.nav.price' },
  { href: '#faq', k: 'pr.nav.faq' },
  { href: '#install', k: 'pr.nav.install' },
];

export default function PrPage() {
  const { t } = useT();
  const { early, checkout } = usePr();
  const plate = (id: string) => {
    const i = ORDER.indexOf(id);
    return { no: String(i + 1).padStart(2, '0'), note: i % 2 === 1 };
  };
  const href = checkout('pro');
  const label = early ? 'pr.hero.buy.early' : 'pr.hero.buy';
  const buy = { href, label: t(label), big: PRE ? t('pr.buy.pre') : t('s.buy'), small: early ? PR.earlyPrice : PR.price };
  const faq = plate('faq');
  return (
    <Page4 page="pr" plateTotal={ORDER.length} links={LINKS} cta={{ href, k: label }} buy={buy} rail>
      <Hero />
      <Who {...plate('who')} />
      <Posi {...plate('posi')} />
      <Features {...plate('what')} />
      <Tiers {...plate('tiers')} />
      {PRE ? <Preorder {...plate('preorder')} /> : null}
      <Price {...plate('price')} />
      {/* FAQ + 사양 = 종이 한 장(`/ae` 와 같다 — 사양은 윗여백 없이 FAQ 를 잇는 부록이라 따로 칠하면 경계에서 모눈이 끊긴다). */}
      <section className={faq.note ? 'onnote' : undefined}>
        <Faq no={faq.no} />
        <Specs />
      </section>
      <Install {...plate('install')} />
    </Page4>
  );
}
