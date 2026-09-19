'use client';
/* 02 — 툴박스 39. 카드 한 장 = 판 + 이름 + 한 줄.
   🔴 이름도 설명도 여기서 쓰지 않는다 — `lib/docsData.ts` 가 제품 코드(builtinScripts.ts + i18n)에서
   읽어 온 것이다. 사전에 손번역을 들이면 패널과 사이트가 다른 말을 하기 시작한다.

   판 = 패널이 버튼 위에 띄우는 16프레임 시트 그대로(`.spot` 재생 규약은 site3p.css 주석).
   ⚠️ `site3p/Spot` 을 그대로 못 쓴다 — 그 컴포넌트는 figcaption 에 `.slug` 이름표를 항상 그리는데
   여기 카드는 `.toolcard h4` 로 이름을 들고 있어서 이름이 두 번 나온다. 그래서 판만 쓴다.
   🔴 Depth Pass 는 유일하게 시트가 없다 — 컴프 화면에 결과가 안 드러나는 툴이라 제품이 도해를
   들고 있다. 도해는 `.noimg` 크림 판 안에 앉힌다(16:9 로 그려져 있어 그대로 맞는다). */
import { Fragment } from 'react';
import { useT } from '@/components/site3p/lang';
import { DOCS_CATS, DOCS_TOOLS, type DocsTool } from '@/lib/docsData';
import SecHead from './SecHead';

function ToolCard({ tool }: { tool: DocsTool }) {
  const { t, lang } = useT();
  return (
    <article className="toolcard" tabIndex={0} data-cur>
      {tool.preview === 'sheet' ? (
        <figure className="spot-fig">
          <i className="spot" role="img" aria-label={tool.name}
            style={{ backgroundImage: `url(/riso/spots/${tool.id}.webp)` }} />
        </figure>
      ) : tool.preview === 'svg' ? (
        <div className="noimg"><img src={`/riso/spots/${tool.id}.svg`} alt={tool.name} /></div>
      ) : (
        <div className="noimg">{t('docs.noimg')}</div>
      )}
      <h4>{tool.name}</h4>
      <p dangerouslySetInnerHTML={{ __html: lang === 'ko' ? tool.ko : tool.en }} />
    </article>
  );
}

export default function Tools() {
  const { t } = useT();
  return (
    <section id="tools" className="sec" data-plate="02" data-name="docs.nav.tools">
      <SecHead no="02" stone={6} k="docs.tools.h" tag="docs.tools.tag" />
      <p className="lead" dangerouslySetInnerHTML={{ __html: t('docs.tools.lead') }} />
      {DOCS_CATS.map((cat) => {
        const list = DOCS_TOOLS.filter((x) => x.cat === cat);
        return (
          <Fragment key={cat}>
            <div className="catbar">
              <h3>{t(`docs.cat.${cat}`)}</h3>
              <span className="n">
                {t('docs.tools.n').replace('{n}', String(list.length))} · {t(`docs.cat.${cat}.s`)}
              </span>
            </div>
            <div className="toolgrid sweep">
              {list.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </Fragment>
        );
      })}
      {/* 🔴 512 는 넓은 컴프에서의 숫자다 — 구매자가 밟을 자리라 적어 둔다. */}
      <p className="lab lc">{t('docs.note.patternLab')}</p>
    </section>
  );
}
