'use client';
/* 04 — 릴리스 노트. 🔴 **정본은 `/update` 다** — 패널 Support 의 `What's new · manual install` 링크가
   거기로 가고, 수동 다운로드도 거기 있다. 여기는 **최신 한 판**만 펼치고 나머지는 `/update` 로 넘긴다.
   전에는 같은 배열(`lib/releases.ts`)을 전량 실어서 로그가 두 면에 통째로 있었다 — 정본이 둘이면
   "어디가 최신인가" 를 독자가 판정해야 한다. 노트 본문은 복사하지 않고 같은 배열을 읽는다.
   이름은 한 가지: `Release notes` / `업데이트 노트` — 셸 푸터 · `/ae` · `/update` 와 같은 낱말이다
   (구 `Release log` · `업데이트 로그` 는 버렸다).

   🔴 노트 본문은 **EN/KO 두 벌**이다(`lib/releases.ts` 의 `items.ko` · `items.en`, 항목이 1:1).
   조판은 `/ae` 의 새로 들어온 것(News.tsx)과 같은 `.rel` + `.rel-head` — 같은 노트가 두 면에서 다른 모양이면
   다른 것처럼 읽힌다. */
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { RELEASES } from '@/lib/releases';
import SecHead from './SecHead';

export default function ReleaseLog() {
  const { t, lang } = useT();
  const href = useHref();
  const r = RELEASES[0];
  const items = r.items[lang];
  return (
    <section id="release-notes" className="sec" data-plate="04" data-name="docs.nav.notes">
      <SecHead no="04" stone={3} k="docs.notes.h" tag="docs.notes.tag" />
      <div className="rel">
        <div className="rel-head">
          <span className="v">v{r.version}</span>
          <span className="d">{r.date}</span>
          <span className="cnt">{t('docs.notes.n').replace('{n}', String(items.length))}</span>
        </div>
        <ul>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>
      </div>
      <p className="rel-all">
        <a href={href('/update')} data-cur>{t('docs.notes.all').replace('{n}', String(RELEASES.length))}</a>
      </p>
    </section>
  );
}
