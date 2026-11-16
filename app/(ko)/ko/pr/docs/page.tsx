import type { Metadata } from 'next';
import PrDocs from '@/components/site4/pr/Docs';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

const DESCRIPTION = t('ko', 'pr.docs.desc');

export const metadata: Metadata = {
  alternates: { canonical: '/ko/pr/docs', languages: { en: '/pr/docs', ko: '/ko/pr/docs', 'x-default': '/pr/docs' } },
  title: { absolute: 'Docs — You Name It PR Plugin' },
  description: DESCRIPTION,
  ...share({ path: '/ko/pr/docs', title: 'Docs — You Name It PR Plugin', description: DESCRIPTION, lang: 'ko' }),
};

/* `/ko/pr/docs` — `/pr` 기능 블록이 가리키는 자세한 설명(국문). EN = `app/(en)/pr/docs/page.tsx`. */
export default function PrDocsKoPage() {
  return <PrDocs lang="ko" />;
}
