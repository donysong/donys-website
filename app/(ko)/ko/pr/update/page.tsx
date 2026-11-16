import type { Metadata } from 'next';
import PrUpdate from '@/components/site4/pr/Update';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

const DESCRIPTION = t('ko', 'pr.upd.desc');

/* `/pr/update` 의 국문판. 🔴 패널이 여는 주소는 영문 `/pr/update` 하나다(`version.json` 한 벌) — 한국어 사용자도 영문 면에 먼저 떨어지므로 전환 링크가 첫 화면에 있다.
   이 페이지를 계약 경로로 바꾸지 마라. 본문 = `components/site4/pr/Update.tsx` 를 영문판과 공유한다. */
export const metadata: Metadata = {
  alternates: { canonical: '/ko/pr/update', languages: { en: '/pr/update', ko: '/ko/pr/update', 'x-default': '/pr/update' } },
  title: { absolute: '업데이트 — You Name It PR Plugin' },
  description: DESCRIPTION,
  ...share({ path: '/ko/pr/update', title: '업데이트 — You Name It PR Plugin', description: DESCRIPTION, lang: 'ko' }),
};

export default function PrUpdateKoPage() {
  return <PrUpdate lang="ko" />;
}
