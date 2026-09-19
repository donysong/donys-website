'use client';
/* `/ae/docs` — 읽는 면. 레퍼런스(battleaxe.co)도 제품 페이지에서 설명을 끊고 `/docs` 로 넘긴다:
   제품 페이지는 **파는 면**이고 여기는 **읽는 면**이다.

   구성 = 표지 → 01 패널 → 02 툴박스 → 03 라이브러리 → 04 업데이트 로그 → 설치·사양 → 구매.
   셸(종이·그레인·네비·푸터·커서)은 `site4/Shell` 이 그린다 — 여기서 다시 만들지 마라.

   🔴 링크 배열 하나가 네비와 목차를 **같이** 먹인다. 네비는 `.on` 표시를 들고 desktop 을,
   목차 칩은 모바일을 덮는다(≤680px 에서 네비 링크가 CSS 로 숨는다). 둘을 따로 적으면 갈라진다. */
import Page4, { type NavLink } from '@/components/site4/Shell';
import { useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { DOCS_PANELS } from '@/lib/docsData';
import Panels from './Panels';
import Tools from './Tools';
import Library from './Library';
import ReleaseLog from './ReleaseLog';
import Install from './Install';

const LINKS: NavLink[] = [
  { href: '#panels', k: 'docs.nav.panels' },
  { href: '#tools', k: 'docs.nav.tools' },
  { href: '#library', k: 'docs.nav.library' },
  { href: '#log', k: 'docs.nav.log' },
  { href: '#install', k: 'docs.nav.install' },
];

export default function DocsPage() {
  const { t } = useT();
  /* 패널 수는 CEP manifest 실측(`DOCS_PANELS`)이다 — 사전에 박지 않는다.
     `{scripts}` 같은 건 `lib/copy.ts` 가 채우지만 `{n}` 은 여기서 채운다. */
  const lead = t('docs.lead').replace('{n}', String(DOCS_PANELS.length));
  return (
    <Page4 page="docs" plateTotal={4} links={LINKS} cta={{ href: '/ae', k: 's.toProduct' }}>
      <header className="sec">
        <span className="eyebrow">{t('docs.eyebrow')}</span>
        <h1 className="disp"><Plate3 k="docs.h1" /></h1>
        <p className="lead" dangerouslySetInnerHTML={{ __html: lead }} />
      </header>

      <div className="toc">
        {LINKS.map((l) => <a key={l.href} href={l.href} data-cur>{t(l.k)}</a>)}
      </div>

      <Panels />
      <Tools />
      <Library />
      <ReleaseLog />
      <Install />
    </Page4>
  );
}
