'use client';
/* 04 새로 들어온 것 — 🔴 **`lib/releases.ts` 에서 읽는다. 손으로 쓰지 마라.**
   구판은 손으로 쓴 카드 3장(Depth Pass · Pattern Lab · Riso Print)에 전부 `v2.7.1` 딱지를 붙였는데,
   그중 Depth Pass·Riso Print 는 v2.6.0 기능이었다(버전이 거짓) — 그리고 정작 2.7.1 의 새것
   (이펙터 이펙트 · Chat 의 ChatGPT · 패널 안 로그인)은 없었다. 손으로 쓰면 이렇게 된다.

   최근 두 버전 × 앞 항목 셋, 각 항목의 **첫 문장**만. 노트 항목의 순서가 곧 편집 우선순위다
   (`releases.ts` 가 중요한 것부터 적는다). 조판은 Docs 업데이트 로그의 `.rel` 을 그대로 쓴다 —
   같은 노트가 두 면에서 다른 모양이면 다른 것처럼 읽힌다. 전문은 `/update` 가 갖는다.
   🔴 도그푸드 블록은 여기 없다 — Library 판 바로 뒤로 이사했다(Features.tsx). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { RELEASES } from '@/lib/releases';
import { useHref } from '@/components/site4/Shell';

const VERSIONS = 2;
const ITEMS = 3;

/* 노트 항목은 문단이다 — 첫 문장까지만 싣는다(`. ` 에서 자른다). 문장을 여기서 새로 쓰지 마라. */
function firstSentence(s: string) {
  const i = s.indexOf('. ');
  return i < 0 ? s : s.slice(0, i + 1);
}

export default function News() {
  const { t, lang } = useT();
  const href = useHref();
  return (
    <section id="news" data-plate="04" data-name="ae.plate.news">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-6.webp" alt="" /> <span className="lab">04</span></div>
          <h2 className="disp"><Plate3 k="ae.news.h" boil={false} /></h2>
          <Html k="ae.news.tag" as="p" className="tag" />
        </div>

        {RELEASES.slice(0, VERSIONS).map((r) => (
          <div className="rel" key={r.version}>
            <div className="rel-head">
              <span className="v">v{r.version}</span>
              <span className="d">{r.date}</span>
            </div>
            <ul>{r.items[lang].slice(0, ITEMS).map((it, j) => <li key={j}>{firstSentence(it)}</li>)}</ul>
          </div>
        ))}
        <p className="rel-all">
          <a href={href('/update')} data-cur>{t('ae.news.all')}</a>
        </p>
      </div>
    </section>
  );
}
