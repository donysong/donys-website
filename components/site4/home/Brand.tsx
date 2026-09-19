'use client';
/* 02 우리는 무엇인가 — 🔴 여기가 35% 지점이다. 위가 아니라 여기.
   레퍼런스의 `WHAT IS BATTLE AXE?` 자리. 예산 ≈120단어 + 풀쿼트 1개.
   이름 풀이 표 = 브랜드 가이드 ESSENCE 장 · 풀쿼트 = ENEMY 장 · 성격 3 = PERSONALITY 장. */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html, useT } from '@/components/site3p/lang';

/* 글자(YOU · NAME · IT)는 브랜드 이름 그 자체라 로케일 무관이다 — 사전에 넣지 않는다. */
const NAME_ROWS: [string, string, string][] = [
  ['YOU', 'home.brand.you.biz', 'home.brand.you.brd'],
  ['NAME', 'home.brand.name.biz', 'home.brand.name.brd'],
  ['IT', 'home.brand.it.biz', 'home.brand.it.brd'],
];

/* 🔴 병렬이 아니라 순서다 — 분해 → 의미 부여 → 지속. 카드를 섞지 마라. */
const TRAITS: { no: string; k: string; r: string }[] = [
  { no: '01', k: 'home.brand.p1', r: '-1.2deg' },
  { no: '02', k: 'home.brand.p2', r: '.8deg' },
  { no: '03', k: 'home.brand.p3', r: '-.6deg' },
];

export default function Brand() {
  const { t } = useT();
  return (
    <section id="brand" data-plate="02" data-name="home.nav.brand">
      <div className="sec">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-1.webp" alt="" /> <span className="lab">02</span></div>
          <h2 className="disp"><Plate3 k="home.brand.h2" boil={false} /></h2>
          <p className="tag">{t('home.brand.tag')}</p>
        </div>

        <div className="name-heads">
          <span />
          <span className="lab lc" style={{ opacity: 0.6 }}>{t('home.brand.col.biz')}</span>
          <span className="lab lc" style={{ opacity: 0.6 }}>{t('home.brand.col.brd')}</span>
        </div>
        <div className="name-table sweep">
          {NAME_ROWS.map(([ltr, biz, brd]) => (
            <div className="name-row" key={ltr}>
              <span className="ltr">{ltr}</span>
              <span className="biz">{t(biz)}</span>
              <span className="brd">{t(brd)}</span>
            </div>
          ))}
        </div>

        <blockquote className="pull">
          <Plate3 k="home.brand.pull.a" className="disp" />
          <Plate3 k="home.brand.pull.b" className="disp" />
          <span className="src">{t('home.brand.pull.src')}</span>
        </blockquote>

        <Html k="home.brand.lead" as="p" className="lead" />

        <div className="news sweep" style={{ marginTop: 8 }}>
          {TRAITS.map((x) => (
            <article className="clip item" key={x.no} style={{ '--r': x.r } as React.CSSProperties}>
              <span className="no">{x.no}</span>
              <h3>{t(`${x.k}.h`)}</h3>
              <p>{t(`${x.k}.p`)}</p>
            </article>
          ))}
        </div>
        <p className="lab lc" style={{ marginTop: 16, opacity: 0.6 }}>{t('home.brand.order')}</p>
      </div>
    </section>
  );
}
