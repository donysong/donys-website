import type { Metadata } from 'next';
import PrNotices from '@/components/legal/PrNotices';
import { t } from '@/lib/copy';
import { share } from '@/lib/meta';

const DESCRIPTION = t('en', 'pr.notices.desc');

export const metadata: Metadata = {
  alternates: { canonical: '/pr/notices', languages: { en: '/pr/notices', ko: '/ko/pr/notices', 'x-default': '/pr/notices' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다. */
  title: t('en', 'pr.legal.notices'),
  description: DESCRIPTION,
  ...share({ path: '/pr/notices', title: `${t('en', 'pr.legal.notices')} — You Name It`, description: DESCRIPTION, lang: 'en' }),
};

/* 본문은 PR 플러그인이 싣는 `THIRD-PARTY-NOTICES.md` 의 사본이다 — 다시 복사하는 규칙은 `lib/notices.ts` 머리 주석. */
export default function PrNoticesPage() {
  return <PrNotices lang="en" />;
}
