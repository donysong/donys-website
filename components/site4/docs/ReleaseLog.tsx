'use client';
/* 04 — 릴리스 노트. **최신 3판은 펼치고, 그 앞은 "이전 버전" 접힘 하나 안에** 둔다(§16-6, 2026-09-28 오너 —
   *"최신 1~3개만 펼치고 접기"*). 지우는 판은 없다 — 로그는 역사다(§15.1-2).
   ⚠️ 이 절은 한때 최신 한 판만 싣고 나머지를 `/update` 로 넘겼다(2026-09-26 W2b "정본이 둘이면 안 된다").
   본문을 **복사하지 않고 같은 배열**(`lib/releases.ts`)을 읽으므로 두 면이 갈라질 수 없다 — 그 우려는 복사본의 것이었다.
   `/update` 는 그대로 계약 경로다: 패널 Support 의 `What's new · manual install` 이 거기로 가고, 수동 다운로드는 거기에만 있다.
   이름은 한 가지: `Release notes` / `업데이트 노트` — 셸 푸터 · `/ae` · `/update` 와 같은 낱말이다.

   🔴 노트 본문은 **EN/KO 두 벌**이다(`lib/releases.ts` 의 `items.ko` · `items.en`, 항목이 1:1).
   조판은 `/ae` 의 새로 들어온 것(News.tsx)과 같은 `.rel` + `.rel-head` — 같은 노트가 두 면에서 다른 모양이면
   다른 것처럼 읽힌다. */
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { RELEASES, type Release } from '@/lib/releases';
import SecHead from './SecHead';

const OPEN = 3;

function Rel({ r }: { r: Release }) {
  const { t, lang } = useT();
  const items = r.items[lang];
  return (
    <div className="rel">
      <div className="rel-head">
        <span className="v">v{r.version}</span>
        <span className="d">{r.date}</span>
        <span className="cnt">{t('docs.notes.n').replace('{n}', String(items.length))}</span>
      </div>
      <ul>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>
    </div>
  );
}

export default function ReleaseLog() {
  const { t } = useT();
  const href = useHref();
  const latest = RELEASES.slice(0, OPEN);
  const older = RELEASES.slice(OPEN);
  return (
    <section id="release-notes" className="sec" data-plate="04" data-name="docs.nav.notes">
      <SecHead no="04" stone={3} k="docs.notes.h" tag="docs.notes.tag" />
      {latest.map((r) => <Rel key={r.version} r={r} />)}
      {older.length ? (
        <details className="rel-older">
          <summary data-cur>
            <span className="h">{t('docs.notes.older')}</span>
            <span className="d">v{older[older.length - 1].version} — v{older[0].version}</span>
            <span className="cnt">{t('docs.notes.older.n').replace('{n}', String(older.length))}</span>
            <span className="pm" aria-hidden="true">+</span>
          </summary>
          {older.map((r) => <Rel key={r.version} r={r} />)}
        </details>
      ) : null}
      <p className="rel-all">
        <a href={href('/update')} data-cur>{t('docs.notes.all')}</a>
      </p>
    </section>
  );
}
