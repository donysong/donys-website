'use client';
/* 04 Free · Pro — 두 칸 장부. 왼쪽 = Free(무료 다운로드 폼), 오른쪽 = Pro(구매 버튼 하나). 2026-10-15 오너: v2.10.0 부터 Free/Pro.
   Free = Library · Curves · Expressions · Support + Toolbox 툴 26개 · Pro = 거기에 Chat · Custom + Toolbox 툴 13개(`lib/proTools.ts`).
   Pro 한 줄 = *"말로 AE 에게 시킨다(Chat) + 다른 데선 보기 힘든 툴"*.

   🔴 **결제 버튼은 하나**(2026-09-30 오너 *"buy it once 여기에 구매 버튼 하나 달아"*)이고 그대로다. 그 버튼이 화면에 있는 동안 스티키 레일은 숨는다
      (Shell `BuyRail` 이 `data-price-cta` 를 본다) — 한 화면에 결제 CTA 하나. deployCheck `[price]` 는 이 판의 **바깥 링크(https://…)가 결제 하나뿐**인지 본다.
      Free 칸의 폼은 약관·개인정보 링크(사이트 안)를 갖는다 — 결제 CTA 가 아니라서 허용한다.
   🔴 Free 칸에 다운로드 **링크**를 두지 마라 — 이메일을 받고 확인 메일의 버튼을 누른 뒤에 건넨다(`functions/_lib/download.ts`).
   2026-09-29 오너 1-8 *"CTA 파트 정보가 너무 많고 레이아웃도 뭔가 정형적이지 않음"* — 덜어낸 판의 규칙은 그대로다:
   · 가격 크게 → 풀이 한 줄 → 끝. 체크 목록은 줄이고, 환불·설치 순서는 가격 판 **밖**(FAQ · Docs).
   · 구 `.pvow`(약속 셋 크게)는 칸이 둘이 되면서 걷었다 — 약속 셋 + 포함 셋은 판 밑 캡션 한 줄(`.incl`)로 합쳤다.
   · 🔴 `lifetime`·평생 금지(약관 §4).
   판 = 노트(`.onnote`) — 자리 = 04(AePage 머리 주석). DOM 순서 = Free → Pro → 캡션(폰·스크린리더도 같은 순서로 읽는다). CSS = `app/plans.css`. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import FreeDownloadForm from '@/components/site4/FreeDownloadForm';
import { CHECKOUT_URL } from '@/lib/product';
import { PRO_TOOLS } from '@/lib/proTools';

export default function Price() {
  const { t, list, lang } = useT();
  return (
    <section id="price" className="onnote" data-plate="04" data-name="ae.plate.price">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-3.webp" alt="" /> <span className="lab">04</span></div>
          <h2 className="disp"><Plate3 k="ae.price.h" boil={false} /></h2>
        </div>
        <div className="pricing plans">
          <div className="plan plan-free" id="free">
            <p className="lab plan-l">{t('ae.price.free.l')}</p>
            <Plate3 k="ae.price.free.amount" boil={false} className="big disp" />
            <Html k="ae.price.free.keep" as="p" className="pkeep" />
            <ul className="plan-list">
              {list('ae.price.free.list').map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="plan-form">
              <FreeDownloadForm lang={lang} />
            </div>
          </div>
          <div className="plan plan-pro">
            <p className="lab plan-l">{t('ae.price.pro.l')}</p>
            <Plate3 k="ae.price.amount" boil={false} className="big disp" />
            <a className="btn-fill pbuy" href={CHECKOUT_URL} data-cur data-price-cta>{t('s.buy')} <span aria-hidden="true">→</span></a>
            <Html k="ae.price.keep" as="p" className="pkeep" />
            <p className="plan-lead">{t('ae.price.pro.lead')}</p>
            <ul className="plan-list plan-list-pro">
              {list('ae.price.pro.list').map((s, i) => (
                <li key={s}>
                  <span dangerouslySetInnerHTML={{ __html: s }} />
                  {/* 마지막 줄(Toolbox 툴 13개) 밑에 이름 목록 — 이름은 패널 버튼 문자열이라 로케일 무관(영문) */}
                  {i === 2 ? <span className="plan-tools">{PRO_TOOLS.map((p) => p.name).join(' · ')}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="incl">
          {[...list('ae.price.vow'), ...list('ae.price.incl')].map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}
