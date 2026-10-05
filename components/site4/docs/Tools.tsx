'use client';
/* 02 — 툴박스. 카드 한 장 = 판 + 이름 + 한 줄 (+ 필요하면 한 줄 더).
   🔴 이름도 설명도 여기서 쓰지 않는다 — `lib/docsData.ts` 가 출고 태그의 제품 코드(builtinScripts.ts + i18n)에서
   읽어 온 것이다. 사전에 손번역을 들이면 패널과 사이트가 다른 말을 하기 시작한다.
   예외 하나 = `docs.note.<id>` — 툴팁에 없는 **돌아가는 환경·첫 다운로드·한계**(Depth Pass 의 OS 등).
   `/ae` 가 "무엇에서 도는지는 Docs 에" 라고 약속하므로 그 약속을 여기서 갚는다.

   🔴 카드마다 앵커 `#tool-<플러그인 id>` — 한 툴로 바로 보낼 수 있어야 참조다. 이름이 그 앵커로 가는 링크라
   주소를 복사할 수 있다. 🔴 id 는 태그의 id 그대로다(개명되면 앵커도 바뀐다 — 생성기가 개명을 잡는다).

   판 = 패널이 버튼 위에 띄우는 16프레임 시트 그대로(`.spot` 재생 규약은 site3p.css 주석).
   이름표(`.slug`)는 안 단다 — 카드가 `.toolcard h4` 로 이름을 들고 있어 두 번 나온다. 그래서 판만 쓴다.
   (구 `site3p/Spot` 컴포넌트는 마지막 소비자 `/ae` 히어로 몽타주와 같이 2026-10-05 에 지웠다.)
   시트가 없는 툴(`none`)은 빈 판이라고 적는다 — 지금은 39/39 가 시트를 갖는다. */
import { Fragment } from 'react';
import { useT } from '@/components/site3p/lang';
import { T } from '@/lib/copy';
import { DOCS_CATS, DOCS_TOOLS, type DocsTool } from '@/lib/docsData';
import SecHead from './SecHead';
import { Usage, useUsage } from './Usage';

/* 행이 고르게 차는 열 수 — 최대 4열에서 줄 수를 먼저 정하고 그 줄들에 고르게 나눈다.
   12 → 4·4·4 · 8 → 4·4 · 6 → 3·3 · 4 → 4 · 3 → 3. (구: 6 을 4+2 로 둬서 둘째 줄 반이 비었다.)
   좁은 폭(≤1080)은 site4.css 의 2열·1열 규칙이 이긴다. */
const MAX_COLS = 4;
function balancedCols(n: number) {
  return Math.ceil(n / Math.ceil(n / MAX_COLS));
}

function ToolCard({ tool }: { tool: DocsTool }) {
  const { t, lang } = useT();
  const noteKey = `docs.note.${tool.id}`;
  const anchor = `tool-${tool.id}`;
  const { entry, open, setOpen } = useUsage(tool.id, anchor);
  return (
    /* 펼치면 카드가 전폭 행이 된다(`.is-open` — site4.css). 판·이름·설명은 `.tc-main` 에 묶어 왼쪽 열로, 사용법이 오른쪽 열로 간다. */
    <article className={`toolcard${open ? ' is-open' : ''}`} id={anchor}>
      <div className="tc-main">
        {tool.preview === 'sheet' ? (
          <figure className="spot-fig">
            <i className="spot" role="img" aria-label={tool.name}
              style={{ backgroundImage: `url(/riso/spots/${tool.id}.webp)` }} />
          </figure>
        ) : (
          <div className="noimg">{t('docs.noimg')}</div>
        )}
        <h4><a href={`#${anchor}`} data-cur>{tool.name}</a></h4>
        <p dangerouslySetInnerHTML={{ __html: lang === 'ko' ? tool.ko : tool.en }} />
        {noteKey in T[lang] ? <p className="note">{t(noteKey)}</p> : null}
      </div>
      {entry ? <Usage entry={entry} open={open} onOpen={setOpen} /> : null}
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
            <div className="toolgrid sweep" style={{ '--cols': balancedCols(list.length) } as React.CSSProperties}>
              {list.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </Fragment>
        );
      })}
    </section>
  );
}
