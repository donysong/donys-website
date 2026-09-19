'use client';
/* 05 가격 — 🔴 **여기엔 버튼이 없다.** 스티키 구매 레일이 CTA 를 독점한다(레퍼런스 원리 7).
   이 섹션에 `<a>` 를 넣지 마라. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Price() {
  const { list } = useT();
  return (
    <section id="price" data-plate="05" data-name="ae.plate.price">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-3.webp" alt="" /> <span className="lab">05</span></div>
          <h2 className="disp"><Plate3 k="ae.price.h" boil={false} /></h2>
          <Html k="ae.price.tag" as="p" className="tag" />
        </div>
        <div className="pricing">
          <div>
            <Plate3 k="ae.price.amount" boil={false} className="big disp" />
            <ul className="incl">
              {list('ae.price.incl').map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="sheet argue" style={{ '--r': '-.7deg' } as React.CSSProperties}>
            <h4><Html k="ae.price.why.h" /></h4>
            <Html k="ae.price.why.p1" as="p" />
            <Html k="ae.price.why.p2" as="p" />
            <Html k="ae.price.why.p3" as="p" style={{ opacity: 0.75 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
