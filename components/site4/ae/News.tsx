'use client';
/* 04 새로 들어온 것 + 도그푸드 증거.
   🔴 증언을 지어내지 않는다 — 인용할 사용자가 아직 없다. 대신 **검증 가능한 사실 하나**를 건다:
   이 페이지의 종이 결·잉크 알갱이가 제품에 들어 있는 Riso Print 이펙트의 그 텍스처다.
   🔴 프로토는 이 블록을 섹션 밖(전폭)에 뒀다 — `.sec` 안으로 들여서 좌우 여백과 레일 차선을 받는다.
   문서 순서(릴리스 → 증거 → 가격)는 그대로다. */
import { Html } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

/* 🔴 비율은 16/9 다 — 가운데 판(Pattern Lab)이 `.spot` 스프라이트(16/9 고정)라서,
   1·3번만 16/10 이면 판 높이가 235 vs 211.5 로 갈리고 제목줄이 14px 어긋난다(실측).
   나란한 3장은 판·제목·본문·버전칩이 전부 같은 줄에 앉아야 한다. 조판은 `app/compose.css` ④. */
const NEWS_IMG: React.CSSProperties = {
  width: '100%',
  aspectRatio: '16/9',
  objectFit: 'cover',
  boxShadow: 'calc(var(--rx)*var(--m,1)) calc(var(--ry)*var(--m,1)) 0 var(--white)',
};

export default function News() {
  return (
    <section id="news" data-plate="04" data-name="ae.plate.news">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-6.webp" alt="" /> <span className="lab">04</span></div>
          <h2 className="disp"><Plate3 k="ae.news.h" boil={false} /></h2>
          <Html k="ae.news.tag" as="p" className="tag" />
        </div>

        <div className="news sweep">
          <article className="item">
            <figure className="spot-fig">
              <img src="/riso/spots/depthPass.svg" alt="Depth Pass" style={{ ...NEWS_IMG, background: 'var(--cream)' }} />
            </figure>
            <h4>Depth Pass</h4>
            <Html k="ae.news1.p" as="p" />
            <Html k="ae.news.v" as="span" className="v" />
          </article>
          <article className="item">
            <figure className="spot-fig">
              <i className="spot" role="img" aria-label="Pattern Lab" style={{ backgroundImage: 'url(/riso/spots/patternLab.webp)' }} />
            </figure>
            <h4>Pattern Lab</h4>
            <Html k="ae.news2.p" as="p" />
            <Html k="ae.news.v" as="span" className="v" />
          </article>
          <article className="item">
            <figure className="spot-fig">
              <img src="/riso/spots/fx-riso-print.jpg" alt="Riso Print" style={NEWS_IMG} />
            </figure>
            <h4>Riso Print</h4>
            <Html k="ae.news3.p" as="p" />
            <Html k="ae.news.v" as="span" className="v" />
          </article>
        </div>

        <div className="dogfood sweep">
          <div>
            <Html k="ae.dog.lab" as="span" className="lab" />
            <Html k="ae.dog.p" as="p" />
          </div>
          <figure style={{ margin: 0 }}>
            <img src="/riso/spots/fx-riso-print.jpg" alt="Riso Print" />
            <figcaption className="lab lc" style={{ marginTop: 9, opacity: 0.7 }}>
              <Html k="ae.dog.cap" />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
