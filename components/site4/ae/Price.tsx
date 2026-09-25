'use client';
/* 05 가격 — 🔴 **여기엔 버튼이 없다.** 스티키 구매 레일이 CTA 를 독점한다(레퍼런스 원리 7).
   이 섹션에 `<a>` 를 넣지 마라 — 링크도 안 된다(deployCheck `[price]` 가 `<a` 를 센다).
   🔴 `결제한 뒤` 3단계 = 구매 뒤 경로(키 → 설치 → 활성화)가 안 보이면 그 자체가 망설임이다.
   가격 바로 밑, "무엇을 받나"(✓ 목록) 다음 줄에 둔다 — 오른쪽 카드는 "왜 구독이 아닌가" 라는 **다른 질문**이다.
   설치 안내 링크는 히어로 원 · FAQ · 사양표가 갖는다(여긴 텍스트만). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Price() {
  const { t, list } = useT();
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
            <div className="afterpay">
              <h4 className="lab">{t('ae.after.h')}</h4>
              <ol>{list('ae.after.s').map((s) => <li key={s}>{s}</li>)}</ol>
            </div>
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
