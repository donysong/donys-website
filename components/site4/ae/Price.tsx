'use client';
/* 05 가격 — 🔴 **여기엔 버튼이 없다.** 스티키 구매 레일이 CTA 를 독점한다(레퍼런스 원리 7).
   이 섹션에 `<a>` 를 넣지 마라 — 링크도 안 된다(deployCheck `[price]` 가 `<a` 를 센다).

   §16 (2026-09-28 오너 판정 1·7·15·16) — 조판이 바뀌었다:
   · 가격 + 체크리스트 묶음이 **오른쪽**(구 "왜 구독이 아닌가" 카드 자리)으로 갔다. 카드는 걷었고, 그 결론 한 줄
     (`ae.price.keep`)만 가격 옆에 남는다.
   · *일회 구매 · 구독 없음 · 마이너 무료* 가 체크리스트 한 줄이 아니라 **크게** 읽힌다(`ae.price.vow`).
     🔴 `lifetime`·평생 업데이트라고 쓰지 마라 — 약관 §4(메이저는 유료일 수 있다).
   · 판 = **검정 종이**(`.onblack`, 01 과 둘뿐) — 파란 인쇄물 중간의 간지다.
   🔴 DOM 순서 = 가격 먼저(폰·스크린리더는 가격부터 읽는다). 데스크톱에서만 격자가 가격을 오른쪽 칸에 앉힌다.
   `결제한 뒤` 3단계 = 구매 뒤 경로(키 → 설치 → 활성화). 설치 안내 링크는 히어로 원 · FAQ · 사양표가 갖는다(여긴 텍스트만). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Price() {
  const { t, list } = useT();
  return (
    <section id="price" className="onblack" data-plate="05" data-name="ae.plate.price">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-3.webp" alt="" /> <span className="lab">05</span></div>
          <h2 className="disp"><Plate3 k="ae.price.h" boil={false} /></h2>
          {/* 머리 태그 없음 — 이 판의 한 줄 약속은 바로 밑 `vow` 가 크게 한다(구 `Not a subscription.` 과 겹쳤다). */}
        </div>
        <div className="pricing">
          <div className="pbox">
            <div className="pbox-top">
              <Plate3 k="ae.price.amount" boil={false} className="big disp" />
              <Html k="ae.price.keep" as="p" className="pkeep" />
            </div>
            <ul className="pvow disp">
              {list('ae.price.vow').map((s) => <li key={s}>{s}</li>)}
            </ul>
            <ul className="incl">
              {list('ae.price.incl').map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="afterpay">
            <h4 className="lab">{t('ae.after.h')}</h4>
            <ol>{list('ae.after.s').map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}
