'use client';
/* 03 — 카탈로그. 숫자 칸 7개 + 출고 이펙트 썸네일 5장.
   🔴 절 이름이 `Library` 였는데 Curves·Expressions 는 **별도 패널**이다 — 패널 이름을 절 제목으로 쓰면
   패널 경계를 거짓으로 그린다. 그래서 `Catalog` 이고, 칸마다 **어느 패널 어느 탭에 있는지** 적는다
   (`Library ▸ Motion` · `Curves panel`). Library 의 에셋 탭은 세는 카탈로그가 아니라 패널 표(01)에 적었다.
   `2 Languages` 칸은 사양표와 중복이라 뺐다 · `∞` 는 있어 보여서 `+` 로.
   🔴 숫자는 전부 자리표시자다(`{motion}` 등) — `lib/copy.ts` 가 `lib/product.ts` 에서 채운다.
   여기 숫자를 박은 적이 있어서 사이트가 없는 모션 프리셋 112개를 두 달간 광고했다.
   이펙트 슬러그는 `lib/docsData.ts`(= 출고 태그 `seed-presets/effects/` 실측)가 준다. */
import { useT } from '@/components/site3p/lang';
import { DOCS_FX } from '@/lib/docsData';
import SecHead from './SecHead';

const ROWS = ['motion', 'text', 'grad', 'fx', 'curve', 'expr', 'mine'] as const;

export default function Catalog() {
  const { t } = useT();
  return (
    <section id="catalog" className="sec" data-plate="03" data-name="docs.nav.catalog">
      <SecHead no="03" stone={2} k="docs.catalog.h" tag="docs.catalog.tag" />
      <div className="cat-nums sweep">
        {ROWS.map((r) => (
          <div className="c" key={r}>
            <b>{t(`docs.lib.${r}.n`)}</b>
            <span>{t(`docs.lib.${r}.t`)}</span>
            <small>{t(`docs.lib.${r}.d`)}</small>
          </div>
        ))}
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
    </section>
  );
}
