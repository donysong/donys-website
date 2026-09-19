'use client';
/* 03 — 라이브러리. 카탈로그 8행 + 출고 이펙트 썸네일 5장.
   🔴 숫자는 전부 자리표시자다(`{motion}` 등) — `lib/copy.ts` 가 `lib/product.ts` 에서 채운다.
   여기 숫자를 박은 적이 있어서 사이트가 없는 모션 프리셋 112개를 두 달간 광고했다.
   이펙트 슬러그는 `lib/docsData.ts`(= `seed-presets/effects/` 실측)가 준다. */
import { useT } from '@/components/site3p/lang';
import { DOCS_FX } from '@/lib/docsData';
import SecHead from './SecHead';

const ROWS = ['motion', 'text', 'grad', 'curve', 'expr', 'fx', 'mine', 'lang'] as const;

export default function Library() {
  const { t } = useT();
  return (
    <section id="library" className="sec" data-plate="03" data-name="docs.nav.library">
      <SecHead no="03" stone={2} k="docs.lib.h" tag="docs.lib.tag" />
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
            <img src={`/riso/spots/fx-${slug}.jpg`} alt={t(`docs.fx.${slug}`)} />
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
