import type { Metadata } from 'next';
import PrUpdate from '@/components/site4/pr/Update';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

const DESCRIPTION = t('en', 'pr.upd.desc');

/* 🔴 This path is what the panel's `version.json` `url` points to (`https://younameit.works/pr/update`) — do not move or delete it. Why and what is on it: `components/site4/pr/Update.tsx`.
   KO = `app/(ko)/ko/pr/update/page.tsx` (the panel opens only this address, so the English page carries the switch). */
export const metadata: Metadata = {
  alternates: { canonical: '/pr/update', languages: { en: '/pr/update', ko: '/ko/pr/update', 'x-default': '/pr/update' } },
  /* `absolute` — the product name is already in the title; the layout template must not add the brand twice (same as `/pr/docs`). */
  title: { absolute: 'Update — You Name It PR Plugin' },
  description: DESCRIPTION,
  ...share({ path: '/pr/update', title: 'Update — You Name It PR Plugin', description: DESCRIPTION, lang: 'en' }),
};

export default function PrUpdatePage() {
  return <PrUpdate lang="en" />;
}
