'use client';
/* 04 — 업데이트 로그. 🔴 정본은 `lib/releases.ts` 다(=`/update` 페이지와 **같은 배열**).
   프로토는 4건만 실었는데 잘라 둘 이유가 생성기 편의밖에 없었다 — 여기는 읽는 면이므로 **전부** 싣고,
   최신만 펼쳐 둔다. 노트를 이 레인이 복사해 오지 않는 이유도 같다: 정본이 둘이 되면 갈라진다.

   🔴 노트 본문은 **EN/KO 두 벌**이다(`lib/releases.ts` 의 `items.ko` · `items.en`, 항목이 1:1).
   전에는 한국어밖에 없어서 EN 면에 한글 4,200자가 깔렸고, 그걸 접어 두는 회피책과 국문 페이지로
   보내는 안내문이 여기 있었다 — 2026-09-19 EN 이 생기면서 셋 다 걷어냈다.
   이제 **양쪽 언어 모두 최신 항목을 펼친다**. */
import { useT } from '@/components/site3p/lang';
import { RELEASES } from '@/lib/releases';
import SecHead from './SecHead';

export default function ReleaseLog() {
  const { t, lang } = useT();
  return (
    <section id="log" className="sec" data-plate="04" data-name="docs.nav.log">
      <SecHead no="04" stone={3} k="docs.log.h" tag="docs.log.tag" />
      {RELEASES.map((r, i) => {
        const items = r.items[lang];
        return (
          <details className="rel" key={r.version} open={i === 0}>
            <summary data-cur>
              <span className="v">v{r.version}</span>
              <span className="d">{r.date}</span>
              <span className="cnt">{t('docs.log.n').replace('{n}', String(items.length))}</span>
            </summary>
            <ul>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </details>
        );
      })}
    </section>
  );
}
