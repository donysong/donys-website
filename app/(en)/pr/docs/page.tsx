import type { Metadata } from 'next';
import PrDocs from '@/components/site4/pr/Docs';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

const DESCRIPTION = t('en', 'pr.docs.desc');

export const metadata: Metadata = {
  alternates: { canonical: '/pr/docs', languages: { en: '/pr/docs', ko: '/ko/pr/docs', 'x-default': '/pr/docs' } },
  /* `absolute` — the product name is already in the title; the layout template must not add the brand twice (same as `/ae/docs`). */
  title: { absolute: 'Docs — You Name It PR Plugin' },
  description: DESCRIPTION,
  ...share({ path: '/pr/docs', title: 'Docs — You Name It PR Plugin', description: DESCRIPTION, lang: 'en' }),
};

/* `/pr/docs` — the detail behind the `/pr` feature blocks (EN). KO = `app/(ko)/ko/pr/docs/page.tsx`. */
export default function PrDocsPage() {
  return <PrDocs lang="en" />;
}
