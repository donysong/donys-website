'use client';
/* 04 — 업데이트 로그. 🔴 정본은 `lib/releases.ts` 다(=`/update` 페이지와 **같은 배열**).
   프로토는 4건만 실었는데 잘라 둘 이유가 생성기 편의밖에 없었다 — 여기는 읽는 면이므로 **전부** 싣고,
   최신만 펼쳐 둔다. 노트를 이 레인이 복사해 오지 않는 이유도 같다: 정본이 둘이 되면 갈라진다.

   🔴 노트 본문은 **한국어로만** 존재한다(`lib/releases.ts` 에 EN 이 없다). 손으로 번역하지 마라 —
   제품 주장 60여 개를 새로 쓰는 일이다. 대신 EN 에서는 **최신 항목을 펼치지 않는다**:
   펼쳐 두면 영문 면에 한글 4,200자가 깔려서 구매자가 "내 언어가 아니다" 로 읽는다(실측).
   접어 두면 버전·날짜·건수는 그대로 읽히고, 본문은 알고서 펼치는 사람만 본다. */
import { useT } from '@/components/site3p/lang';
import { RELEASES } from '@/lib/releases';
import SecHead from './SecHead';

export default function ReleaseLog() {
  const { t, lang } = useT();
  return (
    <section id="log" className="sec" data-plate="04" data-name="docs.nav.log">
      <SecHead no="04" stone={3} k="docs.log.h" tag="docs.log.tag" />
      {lang === 'en' ? (
        <p className="lab lc">
          {t('docs.log.lang')} <a href="/ko/ae/docs#log" hrefLang="ko" data-cur>{t('docs.log.langLink')}</a>
        </p>
      ) : null}
      {RELEASES.map((r, i) => (
        <details className="rel" key={r.version} open={lang === 'ko' && i === 0}>
          <summary data-cur>
            <span className="v">v{r.version}</span>
            <span className="d">{r.date}</span>
            <span className="cnt">{t('docs.log.n').replace('{n}', String(r.items.length))}</span>
          </summary>
          <ul>{r.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
        </details>
      ))}
    </section>
  );
}
