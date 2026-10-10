import PrPage from '@/components/site4/pr/PrPage';
import { PrProvider } from '@/components/site4/pr/state';
import { LangProvider } from '@/components/site3p/lang';
import { SITE } from '@/lib/product';
import { prJsonLd } from '@/lib/pr';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

/* `/pr` — You Name It PR Plugin 판매 면(영문). 국문 판본 = `app/(ko)/ko/pr/page.tsx`.
   🔴 메타 문장은 사전(`lib/copy/pr.ts` `pr.meta.*`)에서 읽는다 — 판 B 면 사전이 판 B 문장으로 덮여 있다.
   title 은 레이아웃 template(`%s — You Name It`)이 브랜드를 붙인다(원문 지시 — 여기서 브랜드를 또 쓰지 마라).
   🔴 공유 카드 = 브랜드 카드다(`og-brand.png`). `product` 카드는 AE 그림이라 PR 링크에 AE 가 뜬다 — PR 카드는 플러그인 repo
      `tools/promo/` 에서 구워서 `lib/meta.ts` CARDS 에 더한 뒤 바꾼다(이 repo 에서 그리지 마라).
   canonical 은 페이지마다 선언한다(루트에 두면 하위가 "홈의 중복" 이 된다). */
export const metadata = {
  title: t('en', 'pr.meta.title'),
  description: t('en', 'pr.meta.desc'),
  alternates: {
    canonical: '/pr',
    languages: { en: '/pr', ko: '/ko/pr', 'x-default': '/pr' },
  },
  ...share({
    path: '/pr',
    title: 'You Name It PR Plugin',
    description: t('en', 'pr.meta.desc'),
    card: 'brand',
    lang: 'en',
  }),
};

/* 빌드 시각 — 구운 HTML 의 얼리버드·쿠폰 상태가 이 순간 기준이다. 브라우저가 열리면 지금 시각으로 다시 정한다(`state.tsx`). */
const BUILT_AT = Date.now();

export default function Pr() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(prJsonLd(SITE, '/pr', t('en', 'pr.meta.desc'))) }} />
      <LangProvider initial="en">
        <PrProvider builtAt={BUILT_AT}>
          <PrPage />
        </PrProvider>
      </LangProvider>
    </>
  );
}
