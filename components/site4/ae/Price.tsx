'use client';
/* 04 가격 — 🔴 **여기엔 버튼이 없다.** 스티키 구매 레일이 CTA 를 독점한다(레퍼런스 원리 7).
   이 섹션에 `<a>` 를 넣지 마라 — 링크도 안 된다(deployCheck `[price]` 가 `<a` 를 센다).

   2026-09-29 오너 1-8 *"CTA 파트 정보가 너무 많고 레이아웃도 뭔가 정형적이지 않음"* — 덜어내고 장부로 짰다:
   · 좌 = 가격 + 풀이 한 줄(`ae.price.keep`) | 우 = 약속 셋(`ae.price.vow`) **크게**(§16 오너 판정 — 🔴 `lifetime`·평생 금지, 약관 §4).
   · 포함 셋(`ae.price.incl`)은 체크리스트가 아니라 판 밑 캡션 한 줄.
   · 🔴 구 `결제한 뒤` 3단계는 뺐다 — 같은 세 단계를 Docs `#install` 이 더 자세히 갖는다(히어로 원 · FAQ · 사양표가 거기로 보낸다).
     단일 가격 랜딩 관례도 설치 순서를 가격 판에 두지 않는다(site4.css 가격 판 주석).
   판 = 노트(`.onnote`) — 구 검정 판을 걷었다(AePage 머리 주석). 자리 = 04(오너 2026-09-29 — 업데이트 로그 위로 올라왔다).
   DOM 순서 = 가격 → 약속 → 포함(폰·스크린리더도 같은 순서로 읽는다). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Price() {
  const { list } = useT();
  return (
    <section id="price" className="onnote" data-plate="04" data-name="ae.plate.price">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-3.webp" alt="" /> <span className="lab">04</span></div>
          <h2 className="disp"><Plate3 k="ae.price.h" boil={false} /></h2>
          {/* 머리 태그 없음 — 이 판의 약속은 밑 `vow` 가 크게 한다. */}
        </div>
        <div className="pricing">
          <div className="pamt">
            <Plate3 k="ae.price.amount" boil={false} className="big disp" />
            <Html k="ae.price.keep" as="p" className="pkeep" />
          </div>
          <ul className="pvow disp">
            {list('ae.price.vow').map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <ul className="incl">
          {list('ae.price.incl').map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}
