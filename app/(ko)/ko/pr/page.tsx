import PrPage from '@/components/site4/pr/PrPage';
import { PrProvider } from '@/components/site4/pr/state';
import { LangProvider } from '@/components/site3p/lang';
import { SITE } from '@/lib/product';
import { prJsonLd } from '@/lib/pr';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

/* `/ko/pr` = PR 판매 면의 **국문 판본**(`initial="ko"`). 정적 export 라 로캘마다 HTML 이 따로 구워진다.
   🔴 국문 판본의 메타·JSON-LD 설명은 **국문이다**(`/ko/ae` 와 같은 이유 — 국문 검색 결과·카톡 미리보기에 영어가 뜨지 않게).
   공유 카드 · title template 규칙은 영문 판본(`app/(en)/pr/page.tsx`) 머리 주석과 같다. */
export const metadata = {
  title: t('ko', 'pr.meta.title'),
  description: t('ko', 'pr.meta.desc'),
  alternates: {
    canonical: '/ko/pr',
    languages: { en: '/pr', ko: '/ko/pr', 'x-default': '/pr' },
  },
  ...share({
    path: '/ko/pr',
    title: 'You Name It PR Plugin',
    description: t('ko', 'pr.meta.desc'),
    lang: 'ko',
  }),
};

const BUILT_AT = Date.now();

export default function Pr() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(prJsonLd(SITE, '/ko/pr', t('ko', 'pr.meta.desc'))) }} />
      <LangProvider initial="ko">
        <PrProvider builtAt={BUILT_AT}>
          <PrPage />
        </PrProvider>
      </LangProvider>
    </>
  );
}
