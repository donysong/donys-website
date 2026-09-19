'use client';
/* 07 다음 것 — 제품 2번이 들어올 자리. 🔴 "coming soon" 배지를 붙이지 마라.
   없는 제품을 광고하는 게 아니라, **이름이 비어 있다는 게 내용**이다.
   🔴 브랜드로 돌아가는 링크는 푸터에만 둔다(제품 페이지 본문에 브랜드 서사 0단어). */
import { Html } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function More() {
  return (
    <section id="more" data-plate="07" data-name="ae.plate.more">
      <div className="sec tight" style={{ paddingBottom: 40 }}>
        <hr className="rule" />
        <div className="row blank" style={{ paddingLeft: 0, paddingRight: 0, border: 0 }}>
          <figure className="row-fig">
            <div className="plate-empty"><img src="/riso/stones/stone-7.webp" alt="" /></div>
          </figure>
          <div className="row-body">
            <div className="row-name">
              <Plate3 k="ae.more.name" black boil={false} className="disp" />
            </div>
            <Html k="ae.more.p" as="p" className="one" />
          </div>
        </div>
      </div>
    </section>
  );
}
