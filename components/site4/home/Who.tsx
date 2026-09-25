'use client';
/* 03 만드는 사람 — 레퍼런스 43% 자리. **예산 ≈150단어.**

   🔴 2026-09-19 오너 판정 — **내부 브랜딩 문서를 그대로 싣지 않는다.** 걷어낸 것 둘:
     ⑴ `— 우리가 성공했을 때의 그림` 캡션 — **KPI 캡션**이다. 좋은 문장(*이번 주에 창작한 것으로
        자신을 소개하는 사람들*)을 독자를 향한 초대장에서 **사내 목표**로 바꿔 버린다.
        문장은 그대로 두고 캡션만 뗐다.
     ⑵ `안 합니다` + 칩 5개(강의 채널·튜토리얼·자기계발·툴 리뷰·시행착오 포르노) — 자기를
        **부정 5개로 정의**하면 방에 없는 사람과 싸우는 것처럼 보인다. 그리고 `시행착오 포르노`
        (EN `Struggle porn`)는 **내부 은어**다 — 문서에선 웃기지만 공개 면에선 그냥 거칠다.
        🟢 경계 자체는 안 죽었다 — `home.who.p2` 의 *"우리가 먼저 겪고, 먼저 쓰고, 그다음에 팝니다"*
        가 같은 일을 **긍정문으로** 한다. 목록이 필요하면 칩이 아니라 한 문장으로 돌려라.

   ⚠️ 사전 키(`home.who.mythcap` · `nots.h` · `nots`)는 **아직 안 지웠다** — 되돌릴 수 있게 둔 것이다.
   판정이 굳으면 지워라. `.nots` CSS 도 같이 죽는다. */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html, useT } from '@/components/site3p/lang';
import { RELEASES } from '@/lib/releases';
import { useHref } from '@/components/site4/Shell';

/* 릴리스 노트 첫 항목의 머리 — 첫 ` — ` 또는 첫 마침표까지. 노트는 한 줄 요약이 아니라 문단이라
   통째로 싣으면 표제 밑이 설명서가 된다. 🔴 문장을 여기서 새로 쓰지 마라 — 정본은 `lib/releases.ts`. */
function head(s: string) {
  const cut = s.split(/\s—\s|\.\s/)[0].trim();
  return cut.endsWith('.') ? cut : cut + '.';
}

export default function Who() {
  const { t, lang } = useT();
  const href = useHref();
  const r = RELEASES[0];
  return (
    <section id="who" data-plate="03" data-name="home.nav.who">
      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-2.webp" alt="" /> <span className="lab">03</span></div>
          <h2 className="disp"><Plate3 k="home.nav.who" boil={false} /></h2>
          <p className="tag">{t('home.who.tag')}</p>
        </div>

        <div className="posi">
          <div>
            <Html k="home.who.myth" as="p" className="myth" />
            {/* 표제의 증거 — *"이번 주에 창작한 것으로 자신을 소개하는 사람들"* 을 우리가 먼저 한다.
                국문 면에선 `/ko/update` 로 간다(`useHref`). */}
            <p className="latest">
              <span className="lab">{t('home.who.latest')}</span>
              <b>v{r.version} · {r.date}</b> {head(r.items[lang][0])}{' '}
              <a href={href('/update')} data-cur>{t('home.who.latest.go')}</a>
            </p>
          </div>
          <div>
            <Html k="home.who.p1" as="p" className="plain" />
            <Html k="home.who.p2" as="p" className="plain" style={{ marginTop: 14 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
