'use client';
/* 03 — 카탈로그. 숫자 칸 6개 + 출고 이펙트 썸네일 5장 + 끝의 따로 선 판 하나("이제 당신 것").
   🔴 절 이름이 `Library` 였는데 Curves·Expressions 는 **별도 패널**이다 — 패널 이름을 절 제목으로 쓰면
   패널 경계를 거짓으로 그린다. 그래서 `Catalog` 이고, 칸마다 **어느 패널 어느 탭에 있는지** 적는다
   (`Library ▸ Motion` · `Curves panel`). Library 의 에셋 탭은 세는 카탈로그가 아니라 패널 표(01)에 적었다.
   `2 Languages` 칸은 절 태그로 옮겼다(사양표와 같은 사실).
   🔴 "내 것" 은 숫자 칸이 아니다(§16-18, 2026-09-28 오너) — 셀 수 있는 카탈로그 옆에 두면 7번째 숫자처럼 읽힌다.
   절 끝에 따로 선 판으로 뺐고 문구는 오너 원문 *"Now go build your own."* 이다. 칸은 6개 = 3열 두 줄로 고르게 찬다.
   🔴 숫자는 전부 자리표시자다(`{motion}` 등) — `lib/copy.ts` 가 `lib/product.ts` 에서 채운다.
   여기 숫자를 박은 적이 있어서 사이트가 없는 모션 프리셋 112개를 두 달간 광고했다.
   이펙트 슬러그는 `lib/docsData.ts`(= 출고 태그 `seed-presets/effects/` 실측)가 준다. */
import { useT } from '@/components/site3p/lang';
import { DOCS_FX } from '@/lib/docsData';
import SecHead from './SecHead';
import { Usage, useUsage } from './Usage';

const ROWS = ['motion', 'text', 'grad', 'fx', 'curve', 'expr'] as const;
type Row = (typeof ROWS)[number];

/* 칸 → 사용법 id(`catalog-<kind>`, 플러그인 repo `donys/usage/`). 칸 키는 사전(`docs.lib.<row>.*`)의 것이고 kind 는 라이브러리 탭의 것이다. */
const KIND: Record<Row, string> = { motion: 'motionPresets', text: 'textPresets', grad: 'gradients', fx: 'effects', curve: 'curves', expr: 'expressions' };

function Cell({ row }: { row: Row }) {
  const { t } = useT();
  const anchor = `catalog-${KIND[row]}`;
  const { entry, open, setOpen } = useUsage(anchor, anchor);
  return (
    /* 펼치면 칸이 전폭 행이 된다(`.is-open`). 앵커는 사용법이 있을 때만 단다 — 없는 칸에 빈 앵커를 두지 않는다. */
    <div className={`c${open ? ' is-open' : ''}`} id={entry ? anchor : undefined}>
      <b>{t(`docs.lib.${row}.n`)}</b>
      <span>{t(`docs.lib.${row}.t`)}</span>
      <small>{t(`docs.lib.${row}.d`)}</small>
      {entry ? <Usage entry={entry} open={open} onOpen={setOpen} /> : null}
    </div>
  );
}

export default function Catalog() {
  const { t } = useT();
  return (
    <section id="catalog" className="sec onnote" data-plate="03" data-name="docs.nav.catalog">
      <SecHead no="03" stone={2} k="docs.catalog.h" tag="docs.catalog.tag" />
      <div className="cat-nums sweep">
        {ROWS.map((r) => <Cell key={r} row={r} />)}
      </div>
      <div className="fxrow sweep">
        {DOCS_FX.map((slug) => (
          <figure key={slug}>
            <img src={`/riso/spots/fx-${slug}.webp`} alt={t(`docs.fx.${slug}`)} />
            <figcaption>
              {t(`docs.fx.${slug}`)}
              <small>{t(`docs.fx.${slug}.d`)}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <aside className="mine-call">
        <b className="mk disp" aria-hidden="true">{t('docs.lib.mine.n')}</b>
        <div>
          <p className="h disp">{t('docs.lib.mine.h')}</p>
          <p className="d">{t('docs.lib.mine.d')}</p>
        </div>
      </aside>
    </section>
  );
}
