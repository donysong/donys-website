'use client';
/* 제품 판 — 툴박스 호버 프리뷰 시트(4×4·16f) 그대로. 새로 그린 게 아니라 패널이 버튼 위에 띄우는 그 그림이다.
   재생·정지·밑판 규칙은 site3p.css 의 `.spot` 주석(패널 정본 24fps + 홀드 350ms). */
export function Spot({ id, name, or, desc, tabIndex }: { id: string; name: string; or?: string; desc?: string; tabIndex?: number }) {
  return (
    <figure className="spot-fig" tabIndex={tabIndex} data-cur>
      <i className="spot" role="img" aria-label={name} style={{ backgroundImage: `url(/riso/spots/${id}.webp)` }} />
      <figcaption>
        <span className="slug">{or ? <i>{or}</i> : null}{name}</span>
        {desc ? <span className="desc">{desc}</span> : null}
      </figcaption>
    </figure>
  );
}
