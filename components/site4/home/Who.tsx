'use client';
/* 03 만드는 사람 — 레퍼런스 43% 자리. 예산 ≈150단어.
   🔴 "안 합니다" 목록(BOUNDARIES)은 장식이 아니다 — 안 하는 것을 말하는 게 하는 것을 말하는 것만큼 일한다. */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html, useT } from '@/components/site3p/lang';

export default function Who() {
  const { t, list } = useT();
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
            <p className="lab lc" style={{ marginTop: 18, opacity: 0.65 }}>{t('home.who.mythcap')}</p>
          </div>
          <div>
            <Html k="home.who.p1" as="p" className="plain" />
            <Html k="home.who.p2" as="p" className="plain" style={{ marginTop: 14 }} />
            <p className="lab" style={{ marginTop: 28, color: 'var(--typeink)' }}>{t('home.who.nots.h')}</p>
            <ul className="nots">
              {list('home.who.nots').map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
