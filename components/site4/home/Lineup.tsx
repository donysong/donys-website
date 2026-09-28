'use client';
/* 01 만든 것 — 🔴 5% 지점. **철학보다 먼저 제품이 온다.** 이 페이지의 유일한 비율 판정이다.
   행 메타는 넷만: 이름 · 호스트 칩 · 가격 · 배지. (버전·기능 수·평점은 레퍼런스도 안 넣는다)
   🔴 제품명 조판 = 작은 쪽이 브랜드(`.brandpart`) · 큰 쪽이 구분자(잉크 판). 같은 크기로 쓰지 마라.
   구 행 2(`아직 무제`)는 2026-09-28 에 뺐다(재인 *"이거 빼고 처음 소개 부분에 내용 합치기"*) — 그 문장은
   이 절 머리의 태그(`home.lineup.tag` 셋째 줄)로 들어갔다. 제품이 둘이 되면 행을 여기 더한다. */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html, useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { rePress } from './Hero';

export default function Lineup() {
  const { t } = useT();
  const href = useHref();
  return (
    <section id="lineup" data-plate="01" data-name="home.nav.lineup">
      <div className="sec" style={{ paddingBottom: 0 }}>
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-4.webp" alt="" /> <span className="lab">01</span></div>
          <h2 className="disp"><Plate3 k="home.nav.lineup" boil={false} /></h2>
          <Html k="home.lineup.tag" as="p" className="tag" />
        </div>
      </div>

      <ul className="lineup sweep">
        {/* 행 1 — 출고본. 행 전체가 제품 페이지로 간다(클릭 1회) */}
        <li className="row open">
          <a className="hit" href={href('/ae')} aria-label={t('home.row1.aria')} data-cur />
          <figure className="spot-fig row-fig">
            <i
              className="spot"
              role="img"
              aria-label={t('home.row1.spot')}
              style={{ backgroundImage: 'url(/riso/spots/bentoGrid.webp)' }}
            />
          </figure>
          <div className="row-body">
            <div className="row-name">
              <span className="disp">
                <span className="brandpart">{t('home.row1.brand')}</span>
                <Plate3 k="home.row1.name" />
              </span>
              <span className="stamp red badge" onClick={rePress}><span className="dot" />{t('home.row1.badge')}</span>
            </div>
            <p className="one">{t('home.row1.one')}</p>
            <div className="lmeta">
              <span className="chips"><span className="chip">{t('home.row1.chip')}</span></span>
              <span className="dash" />
              <Html k="home.row1.price" as="span" className="price" />
              <span className="go">{t('home.row1.go')} <span className="arrow">→</span></span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
